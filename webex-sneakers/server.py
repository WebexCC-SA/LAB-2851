"""Webex Sneakers: shared MCP demo-order service for LAB-2851.

The service intentionally stays tenant-neutral. Journey Data Services decides
when a customer earns an offer; Webex Connect calls the protected discount API
and sends the returned code. An AI Agent uses the MCP tools to present the
static catalog, place a simulated order, and check its status.
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import UTC, datetime, timedelta
from pathlib import Path
from typing import Any, Iterator

from dotenv import load_dotenv
from fastmcp import FastMCP
from fastmcp.server.auth.providers.debug import DebugTokenVerifier
from starlette.requests import Request
from starlette.responses import JSONResponse, PlainTextResponse


load_dotenv()

HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8094"))
MCP_API_KEY = os.getenv("MCP_API_KEY", "")
DISCOUNT_API_KEY = os.getenv("DISCOUNT_API_KEY", "")
ORDER_STORE_SALT = os.getenv("ORDER_STORE_SALT", "")
STORE_DB_PATH = Path(os.getenv("STORE_DB_PATH", "store.db"))

if not MCP_API_KEY or not DISCOUNT_API_KEY or not ORDER_STORE_SALT:
    raise RuntimeError("MCP_API_KEY, DISCOUNT_API_KEY, and ORDER_STORE_SALT must be configured.")

PRODUCTS = (
    {
        "sku": "ORBIT",
        "name": "Orbit Runner",
        "category": "Daily running",
        "color": "Azure / Cloud",
        "priceCents": 13000,
        "description": "A lightweight everyday runner with responsive foam and a breathable knit upper.",
        "features": ["Responsive foam", "Breathable knit", "Everyday comfort"],
    },
    {
        "sku": "NOVA",
        "name": "Nova Street",
        "category": "Lifestyle",
        "color": "Coral / Sand",
        "priceCents": 13000,
        "description": "A clean street sneaker with soft cushioning and a durable rubber cupsole.",
        "features": ["Soft cushioning", "Rubber cupsole", "Street ready"],
    },
    {
        "sku": "PULSE",
        "name": "Pulse High Top",
        "category": "Court inspired",
        "color": "Graphite / Lime",
        "priceCents": 13000,
        "description": "A supportive high top with a padded collar and a grippy court outsole.",
        "features": ["Padded collar", "Court outsole", "Stable fit"],
    },
    {
        "sku": "FLOW",
        "name": "Flow Trail",
        "category": "Light trail",
        "color": "Moss / Stone",
        "priceCents": 13000,
        "description": "A versatile trail shoe with a protective toe cap and confident multi-surface traction.",
        "features": ["Protective toe cap", "Multi-surface grip", "Trail capable"],
    },
    {
        "sku": "ECHO",
        "name": "Echo Slip On",
        "category": "Easy comfort",
        "color": "Ink / Mist",
        "priceCents": 13000,
        "description": "A hands-free slip on with a stretch collar and plush cushioning for quick everyday wear.",
        "features": ["Hands-free entry", "Stretch collar", "Plush cushioning"],
    },
)
PRODUCTS_BY_SKU = {product["sku"]: product for product in PRODUCTS}
AVAILABLE_SIZES = (6, 7, 8, 9, 10, 11, 12)
E164_PHONE = re.compile(r"^\+[1-9]\d{7,14}$")

auth_provider = DebugTokenVerifier(validate=lambda token: bool(MCP_API_KEY) and token == MCP_API_KEY)
mcp = FastMCP(
    name="Webex Sneakers Demo Store",
    instructions=(
        "Use this fictional store for a simulated shoe order only. Present the five available products, "
        "collect only a product SKU and whole shoe size. Use the verified caller phone to retrieve and apply its linked discount, and use the tools to confirm "
        "an order. Never ask for a payment card, address, or other sensitive information."
    ),
    auth=auth_provider,
)


def now() -> datetime:
    return datetime.now(UTC)


def iso(value: datetime) -> str:
    return value.isoformat().replace("+00:00", "Z")


def money(cents: int) -> str:
    return f"${cents / 100:,.2f}"


def public_product(product: dict[str, Any]) -> dict[str, Any]:
    return {**product, "price": money(product["priceCents"]), "availableSizes": list(AVAILABLE_SIZES)}


def phone_hash(phone: str) -> str:
    return hashlib.sha256(f"{ORDER_STORE_SALT}:{phone}".encode()).hexdigest()


def discount_code() -> str:
    return f"JDS-{secrets.token_hex(4).upper()}"


def tracking_id() -> str:
    return f"WBX-{secrets.token_hex(4).upper()}"


def initialize_database() -> None:
    STORE_DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(STORE_DB_PATH) as connection:
        connection.execute(
            """CREATE TABLE IF NOT EXISTS discounts (
                code TEXT PRIMARY KEY,
                phone_hash TEXT NOT NULL,
                discount_percent INTEGER NOT NULL,
                issued_at TEXT NOT NULL,
                expires_at TEXT NOT NULL,
                redeemed_at TEXT,
                tracking_id TEXT
            )"""
        )
        connection.execute(
            """CREATE TABLE IF NOT EXISTS orders (
                tracking_id TEXT PRIMARY KEY,
                sku TEXT NOT NULL,
                product_name TEXT NOT NULL,
                shoe_size INTEGER NOT NULL,
                status TEXT NOT NULL,
                created_at TEXT NOT NULL,
                subtotal_cents INTEGER NOT NULL,
                discount_percent INTEGER NOT NULL,
                discount_cents INTEGER NOT NULL,
                total_cents INTEGER NOT NULL
            )"""
        )


@contextmanager
def database() -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(STORE_DB_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    finally:
        connection.close()


def issue_discount(phone: str, percent: int = 15, expires_in_hours: int = 24) -> dict[str, Any]:
    if not E164_PHONE.fullmatch(phone):
        raise ValueError("phone must be an E.164 number, for example +15551234567.")
    if not isinstance(percent, int) or not 1 <= percent <= 75:
        raise ValueError("percent must be a whole number from 1 to 75.")
    if not isinstance(expires_in_hours, int) or not 1 <= expires_in_hours <= 168:
        raise ValueError("expiresInHours must be a whole number from 1 to 168.")

    issued_at = now()
    expires_at = issued_at + timedelta(hours=expires_in_hours)
    code = discount_code()
    with database() as connection:
        connection.execute(
            "INSERT INTO discounts (code, phone_hash, discount_percent, issued_at, expires_at) VALUES (?, ?, ?, ?, ?)",
            (code, phone_hash(phone), percent, iso(issued_at), iso(expires_at)),
        )
    return {
        "code": code,
        "percent": percent,
        "expiresAt": iso(expires_at),
        "smsMessage": f"Your Webex Sneakers {percent}% offer code is {code}. It expires in {expires_in_hours} hours.",
    }


def active_discount_for_phone(phone: str) -> sqlite3.Row | None:
    if not E164_PHONE.fullmatch(phone):
        raise ValueError("phone must be an E.164 number, for example +15551234567.")
    with database() as connection:
        discount = connection.execute(
            """SELECT * FROM discounts
               WHERE phone_hash = ? AND redeemed_at IS NULL
               ORDER BY issued_at DESC LIMIT 1""",
            (phone_hash(phone),),
        ).fetchone()
    if not discount:
        return None
    if datetime.fromisoformat(discount["expires_at"].replace("Z", "+00:00")) <= now():
        return None
    return discount


def present_discount(discount: sqlite3.Row) -> dict[str, Any]:
    return {
        "code": discount["code"],
        "percent": discount["discount_percent"],
        "expiresAt": discount["expires_at"],
        "note": "This code is linked to the caller phone number and can be redeemed once.",
    }


def place_order(sku: str, size: int, phone: str) -> dict[str, Any]:
    product = PRODUCTS_BY_SKU.get(sku.strip().upper())
    if not product:
        raise ValueError("sku must identify a product in the Webex Sneakers catalog.")
    if size not in AVAILABLE_SIZES:
        raise ValueError(f"size must be one of: {', '.join(map(str, AVAILABLE_SIZES))}.")
    discount = active_discount_for_phone(phone)
    if not discount:
        raise ValueError("No active Webex Sneakers discount was found for this caller phone number.")
    code = discount["code"]

    with database() as connection:
        discount = connection.execute(
            "SELECT * FROM discounts WHERE code = ? AND phone_hash = ?",
            (code, phone_hash(phone)),
        ).fetchone()
        if not discount:
            raise ValueError("The discount code was not found.")
        if discount["redeemed_at"]:
            raise ValueError("The discount code has already been redeemed.")
        if datetime.fromisoformat(discount["expires_at"].replace("Z", "+00:00")) <= now():
            raise ValueError("The discount code has expired.")

        subtotal = product["priceCents"]
        discount_cents = round(subtotal * (discount["discount_percent"] / 100))
        total = subtotal - discount_cents
        order = {
            "trackingId": tracking_id(),
            "sku": product["sku"],
            "productName": product["name"],
            "size": size,
            "status": "Order confirmed",
            "createdAt": iso(now()),
            "subtotalCents": subtotal,
            "discountPercent": discount["discount_percent"],
            "discountCents": discount_cents,
            "totalCents": total,
        }
        connection.execute(
            """INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (order["trackingId"], order["sku"], order["productName"], order["size"], order["status"], order["createdAt"], subtotal, order["discountPercent"], discount_cents, total),
        )
        connection.execute("UPDATE discounts SET redeemed_at = ?, tracking_id = ? WHERE code = ?", (order["createdAt"], order["trackingId"], code))

    return present_order(order)


def present_order(order: dict[str, Any] | sqlite3.Row) -> dict[str, Any]:
    source = dict(order)
    def value(camel: str, snake: str) -> Any:
        return source[camel] if camel in source else source[snake]

    result = {
        "trackingId": value("trackingId", "tracking_id"),
        "sku": source["sku"],
        "productName": value("productName", "product_name"),
        "size": value("size", "shoe_size"),
        "status": source["status"],
        "createdAt": value("createdAt", "created_at"),
        "subtotalCents": value("subtotalCents", "subtotal_cents"),
        "discountPercent": value("discountPercent", "discount_percent"),
        "discountCents": value("discountCents", "discount_cents"),
        "totalCents": value("totalCents", "total_cents"),
    }
    result["subtotal"] = money(result["subtotalCents"])
    result["discount"] = f"-{money(result['discountCents'])}"
    result["total"] = money(result["totalCents"])
    result["note"] = "This is a simulated lab order. No payment or shipment is created."
    return result


def check_order(tracking_id_value: str) -> dict[str, Any]:
    tracking_id_value = tracking_id_value.strip().upper()
    if not tracking_id_value:
        raise ValueError("trackingId is required.")
    with database() as connection:
        order = connection.execute("SELECT * FROM orders WHERE tracking_id = ?", (tracking_id_value,)).fetchone()
    if not order:
        raise ValueError("No demo order was found for that tracking ID.")
    return present_order(order)


@mcp.tool()
def list_products() -> dict[str, Any]:
    """List the five Webex Sneakers products, including SKU, price, and available sizes."""
    return {"products": [public_product(product) for product in PRODUCTS]}


@mcp.tool()
def get_active_discount(phone: str) -> dict[str, Any]:
    """Find the active Webex Sneakers discount linked to one caller phone number.

    Use the verified caller phone passed to the AI agent by the voice flow. Do not
    ask the caller to read an SMS discount code aloud.
    """
    try:
        discount = active_discount_for_phone(phone)
        if not discount:
            return {"error": "No active Webex Sneakers discount was found for this caller phone number."}
        return present_discount(discount)
    except ValueError as exc:
        return {"error": str(exc)}


@mcp.tool()
def place_demo_order(sku: str, size: int, phone: str) -> dict[str, Any]:
    """Create a simulated shoe order using the active discount for the caller phone.

    Do not collect a payment card, address, or other sensitive information. Confirm
    a purchase only after this tool returns an Order confirmed result. The phone
    must come from the verified caller context, not from a caller-provided value.
    """
    try:
        return place_order(sku, size, phone)
    except ValueError as exc:
        return {"error": str(exc)}


@mcp.tool()
def check_demo_order(tracking_id: str) -> dict[str, Any]:
    """Look up one simulated Webex Sneakers order using its tracking ID."""
    try:
        return check_order(tracking_id)
    except ValueError as exc:
        return {"error": str(exc)}


@mcp.custom_route("/healthz", methods=["GET"], include_in_schema=False)
async def health_check(_request: Request) -> PlainTextResponse:
    return PlainTextResponse("ok")


@mcp.custom_route("/api/catalog", methods=["GET"], include_in_schema=False)
async def api_catalog(_request: Request) -> JSONResponse:
    return JSONResponse({"products": [public_product(product) for product in PRODUCTS]})


@mcp.custom_route("/api/discounts", methods=["POST"], include_in_schema=False)
async def api_issue_discount(request: Request) -> JSONResponse:
    if request.headers.get("authorization") != f"Bearer {DISCOUNT_API_KEY}":
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    try:
        body = await request.json()
        result = issue_discount(
            phone=str(body.get("phone", "")),
            percent=body.get("percent", 15),
            expires_in_hours=body.get("expiresInHours", 24),
        )
        return JSONResponse(result, status_code=201)
    except (AttributeError, ValueError, json.JSONDecodeError) as exc:
        return JSONResponse({"error": str(exc) or "Invalid JSON request."}, status_code=400)


if __name__ == "__main__":
    initialize_database()
    mcp.run(transport="streamable-http", host=HOST, port=PORT)
