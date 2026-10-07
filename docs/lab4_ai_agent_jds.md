# Webex AI Agent, MCP, and AI Memory :robot:

This lab completes the Webex Sneakers journey. The three Page Visit events and the JDS Action created in Lab 2 qualify a customer for a discount. The customer then calls an AI Agent, uses the discount code in a simulated shoe order, and sees the journey and AI Memory in the Agent Desktop.

The shared Webex Sneakers MCP service has no access to a POD's JDS data. It only exposes the product catalog and simulated-order tools. This keeps the same service safe to use from every lab POD.

???+ purpose "Lab objectives"
    By the end of this lab, you will:

    * Create a Webex Sneakers AI Agent and attach its knowledge base.
    * Register and provision the shared MCP service as an Agentic App for your organization.
    * Add the MCP tools to the agent as available actions.
    * Use an SMS discount code to place and check a simulated shoe order.
    * Review the customer's JDS journey and AI Memory from Agent Desktop.

## Before you begin

You need the following before starting this lab:

* A published JDS Action from Lab 2 that sends an SMS discount code after three Page Visit events within 48 hours.
* Access to the phone number used in your JDS identity. The phone must be in E.164 format in the collection, for example `+15551234567`.
* The **Webex Sneakers MCP API key** shown in the protected POD lookup on the Overview page. Do not add it to the knowledge base, agent instructions, collection, or any lab file.
* Your Lab 3 flow published with a Virtual Agent V2 node that can be updated to use the agent you create here.

## Lab 4.1 Create the Webex Sneakers AI Agent

???+ webex "Create the knowledge base and agent"
    1. In Control Hub, open **Contact Center** and select the **Webex AI Agent** quick link.
    2. Select the notebook icon and click **Create Knowledge Base**.
    3. Name it `PODXX_WebexSneakers_KB`, replacing `XX` with your POD number.
    4. Download [Webex Sneakers knowledge base](./assets/WebexSneakers.txt), upload it on the **Files** tab, and select **Process Files**.

    ???+ info "Knowledge Base with Files Processed"
        <figure markdown>
        ![Knowledge Base with Files Processed](./assets/Processed_KB.png)
        </figure>

    5. Return to the dashboard, select **Create agent**, **Start from scratch**, and **Autonomous**.
    6. Enter these essential details:

        | Field | Value |
        | --- | --- |
        | Agent name | `PODXX_Lace_WebexSneakers_AI` |
        | AI engine | Select an available Webex AI engine |
        | Agent goal | Help Webex Sneakers customers choose a shoe, apply a valid discount code, place a simulated order, and check a simulated order. |

    7. Create the agent. Set the welcome message to: `Hi, I'm Lace, your Webex Sneakers concierge. I can help you find a shoe, use your discount code, or check a demo order. What would you like to do?`
    8. On the **Knowledge** tab, select `PODXX_WebexSneakers_KB`, then select **Save changes**.

## Lab 4.2 Register the shared MCP service

The MCP service is already hosted for the lab. Each POD registers it as an Agentic App so that Webex can discover and govern its tools for that organization.

???+ important "Use a Customer Administrator account"
    The Developer Portal registration and **Apps > Agentic Apps** provisioning must be completed with a Customer Administrator account for the POD. A Partner account does not expose the required organization settings.

???+ webex "Register the Agentic App"
    1. Go to [Webex for Developers](https://developer.webex.com) and sign in with the POD Customer Administrator account.
    2. Select **Start Building Apps**, then **Create an Agentic App**.
    3. Use these values:

        | Field | Value |
        | --- | --- |
        | Agentic App Module | `MCP` |
        | Transport Type | `Streamable HTTP` |
        | Agentic App Name | `PODXX_WebexSneakers_MCP` |
        | Description | Shared lab MCP service for the Webex Sneakers catalog and simulated orders. |
        | Agentic App URL | `https://mcp.cx-tme.com/webex-sneakers/mcp` |
        | Authentication type | `API Key` |

    4. Add the Agentic App. Do not submit it to App Hub; it is only needed in this POD organization.

## Lab 4.3 Provision the Agentic App and enable its tools

???+ webex "Configure the Agentic App in Control Hub"
    1. In [Control Hub](https://admin.webex.com), open **Apps** > **Agentic Apps**, then select `PODXX_WebexSneakers_MCP`.
    2. On the **General** tab, set the app to **Allowed** and save.
    3. On the **Authentication** tab, enter the Webex Sneakers MCP API key from the protected POD lookup and save.
    4. On the **Tools** tab, enable these three tools and save:

        | Tool | Use in the lab |
        | --- | --- |
        | `list_products` | Lists the five shoes and available sizes. |
        | `place_demo_order` | Applies one valid discount code, confirms a simulated order, and returns a fake tracking ID. |
        | `check_demo_order` | Returns a simulated order from its tracking ID. |

    The service creates no payment, shipment, customer record, or JDS event. It stores only a salted phone hash for the SMS-code lifecycle and a simulated order record.

## Lab 4.4 Add the MCP actions and agent instructions

???+ webex "Add the available MCP actions"
    1. Return to **AI Agent Studio** and open `PODXX_Lace_WebexSneakers_AI`.
    2. Select the **Actions** tab.
    3. Select **Add Actions** > **Select Available**.
    4. Add `list_products`, `place_demo_order`, and `check_demo_order`.
    5. Verify that their input schemas come from the MCP service. Do not create Webex Connect fulfillment flows for these actions.
    6. On the **Profile** tab, add the following instructions and then select **Save changes**:

        ```text
        You are Lace, the Webex Sneakers concierge. Keep answers conversational and concise.

        Product discovery
        - Use [list_products] when a customer asks what shoes are available, needs a SKU, or needs sizes.
        - Offer only products and sizes returned by the tool.

        Simulated orders
        - Before using [place_demo_order], confirm the shoe SKU, shoe size, and the customer's SMS discount code.
        - Explain that the order is a lab simulation. Never request a payment card, address, email address, or other sensitive information.
        - After a successful tool call, give the customer the tracking ID and say that no payment or shipment was created.
        - A discount code can be used once. If the tool reports an invalid, expired, or used code, ask the customer to check the code and do not claim that an order was placed.

        Order lookup
        - Use [check_demo_order] only when the customer provides a tracking ID.
        - Summarize the order and its simulated status from the tool response.

        Escalation
        - For requests outside the catalog or simulated-order experience, offer to transfer to a human agent according to the contact center policy.
        ```

    7. Publish the agent.

## Lab 4.5 Connect the Lab 3 flow to your AI Agent

???+ webex "Replace the placeholder agent"
    1. In Control Hub, open **Contact Center** > **Flows** and open the published Lab 3 flow in Flow Designer.
    2. Enable **Edit** mode and select the **Virtual Agent V2** node.
    3. Keep **Contact Center AI Config** set to **Webex AI Agent (Autonomous)**.
    4. Select `PODXX_Lace_WebexSneakers_AI` as the Virtual Agent.
    5. Save, validate, and publish the flow.
    6. Confirm that the POD's existing channel still uses this routing flow.

## Lab 4.6 Test the discount-to-order journey

???+ webex "Create the qualifying Page Visits"
    1. In the Bruno collection, use the identity configuration from Lab 2.4: set the Page Visit identity to the caller's `phoneNumber` and `identitytype` to `phone`.
    2. Send **JDS PageVisit** three times. Use a different request ID for each event.
    3. Confirm the three Page Visit events with **Get History Stream by identity**, using that phone number.
    4. Wait for the JDS Action to invoke the shared webhook and for the Webex Connect SMS flow to deliver the discount code to the phone associated with the profile.

???+ webex "Browse and call"
    1. Open the [Webex Sneakers storefront](https://cx-tme.com/webex-sneakers/) and choose one of the five displayed shoes.
    2. Call the POD phone number, choose the Virtual Agent option, and ask about the shoe you selected.
    3. Give the AI Agent the SKU, a size from 6 through 12, and the SMS discount code.
    4. Record the fake tracking ID returned by the AI Agent.
    5. Ask the AI Agent to check that tracking ID. It should return the same simulated order.

???+ note "Expected result"
    A successful conversation proves that a JDS audience event can lead to a shared webhook, an SMS incentive, and an AI Agent action. The order is deliberately simulated: there is no payment, inventory reservation, fulfillment, or shipment.

## Lab 4.7 View AI Memory and the JDS journey

AI Memory does not require configuration in this lab. It becomes useful after you have conversations with the AI Agent and/or a human agent for the same customer.

???+ webex "Review the customer context"
    1. Complete at least two short conversations for the same caller. One can be the order conversation and another can be an order-status question or a transfer to a human agent.
    2. Sign in to Agent Desktop with the POD agent credentials and open the JDS widget.
    3. Search for the customer's phone number or merged identity.
    4. Review the Page Visit events, the profile metric, and the interaction history.
    5. During or after an eligible interaction, inspect the AI Memory content in the JDS widget. It is created from the conversation insights and may take a short time to appear.

Congratulations! You have completed the Webex Sneakers JDS, MCP, and AI Memory journey.
