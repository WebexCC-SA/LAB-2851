# Webex Sneakers Demo Store

This service supports the LAB-2851 customer journey exercise. It hosts:

- a static public catalog at `https://cx-tme.com/webex-sneakers/`;
- a public catalog API at `GET /api/catalog`;
- a protected discount-issuance API at `POST /api/discounts`;
- a protected Streamable HTTP MCP endpoint at `POST /mcp`.

The service is tenant-neutral. It does not connect to JDS, Webex Contact Center, or a learner POD. A JDS Action calls the discount API through a shared Webex Connect webhook. Each learner's AI Agent adds the preapproved MCP tools to retrieve a phone-linked discount, place a simulated order, and check its status.

## MCP tools

| Tool | Purpose |
| --- | --- |
| `list_products` | Returns the five static shoe products and available sizes. |
| `get_active_discount` | Retrieves an unexpired discount linked to the verified caller phone. |
| `place_demo_order` | Uses the phone-linked single-use discount with a product SKU and size; creates a simulated order and returns a tracking ID. |
| `check_demo_order` | Retrieves the status and summary for a simulated order. |

No tool accepts payment or shipping information. The order is a demonstration only.

## Local run

1. Copy `.env.example` to `.env` and replace every value with a unique secret.
2. Load the environment variables into your shell.
3. Create a Python virtual environment and install `requirements.txt`.
4. Run `python server.py`.

The service listens on port `8094` unless `PORT` is set. The static website is
served separately by Nginx from `public/`.

## Discount API

`POST /api/discounts` requires this header:

```text
Authorization: Bearer <DISCOUNT_API_KEY>
```

Example request body:

```json
{
  "phone": "+15551234567",
  "percent": 15,
  "expiresInHours": 24
}
```

The response contains a one-time code, its expiry, and an SMS-ready message. Store the `DISCOUNT_API_KEY` only in the shared Webex Connect webhook configuration.

## MCP endpoint

The deployed MCP endpoint is `https://mcp.cx-tme.com/webex-sneakers/mcp` and requires:

```text
Authorization: Bearer <MCP_API_KEY>
```

In Control Hub, onboard and approve this server once for each lab tenant. The POD Customer Administrator enters the MCP key during onboarding; the attendee guide and source repository do not publish either API key.

## Deployment data

`store.db` is created on first use and holds only demo-order state, discount code state, expiry, and a salted hash of the recipient phone number. It must be stored on persistent EC2 storage and excluded from source control.
