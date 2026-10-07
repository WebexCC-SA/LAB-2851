# LAB-2851 Revision Tracker

This file records the intended guide changes while the JDS Actions, MCP, and AI Memory revision is in progress.

## Lab 2: preserve the existing guide

The following original material remains in the attendee path:

* Lab 2.1 screenshots for the empty identity and merged identity.
* Lab 2.2, including the navigation-pane Desktop Layout build, JSON, and confirmation screenshot.
* Lab 2.3 screenshot and both Desktop Layout `template-id` examples.
* The JDS Page Visit event type: `task:new`.

## Lab 2: approved changes

| Area | Change |
| --- | --- |
| Lab 2.1 | Do not run the original purchase-event step 3. Continue from Merge Identity in step 2 to the existing step 4 history query, using the phone number to prove that the original email Page Visit belongs to the merged person. |
| Lab 2.3 | Change only the Page Visit lookback from 120 minutes to 48 hours. Preserve `task:new`, `channelType`, and the existing Page Visit rule. |
| Lab 2.4 | Add one Journey Action extension to the existing Page Visit profile. The Bruno and Postman collections provide the create and retrieval requests; attendees supply their profile-template ID and the shared Webex Connect webhook URL. |

## Other guide changes in this working revision

| Area | Change |
| --- | --- |
| Lab 1 | Remove the obsolete account-number and address setup instructions associated with the MockAPI order workflow. |
| Lab 3 | Keep the JDS query and `task:new` interaction event flow. The Virtual Agent V2 node becomes the call entry point for the Lab 4 Lace agent. |
| Lab 4 | Replace the obsolete JDS identity action, MockAPI order lookup, and per-POD SMS deflection fulfillment flows with the shared MCP service and Lace AI Agent path. The downloadable Lace knowledge base mirrors the storefront's five products, price, colors, features, supported sizes, and simulated-order policy. |
| AI Memory | Add an observation step after conversations; do not add tenant configuration steps. |
| MCP access | The active EC2 MCP service uses its configured API key. That key is stored only inside the encrypted POD credential file and is revealed with the assigned POD after passcode unlock. |

## Guide audit: 7 October 2026

| Guide | Audit result |
| --- | --- |
| Lab 1 | Contains only the account/address cleanup recorded above. The Bruno and Postman collections now use the phone number as the person `customerId` and no longer include the retired MockAPI purchase, order-status, or SMS-deflection requests. |
| Lab 2 | Original screenshots, identity merge, Desktop Layout configuration, Page Visit event semantics, and profile-template content are retained. The attendee path skips only the original purchase step. |
| Lab 3 | Its JDS query and `task:new` event remain the original material. Two cross-references now point accurately to Lab 1 and the Lab 4 Lace replacement. |
| Lab 4 | The removed instructions and images belong to the retired JDS identity, MockAPI order lookup, and per-POD SMS-deflection flows. The retained knowledge-base processing image is restored. The Page Visit test now explicitly uses the phone identity established in Lab 2.4. |

## Not yet represented as a validated attendee build

The shared Webex Connect webhook, phone mapping, and SMS sender for the JDS Action still need live validation in a lab POD. The collection request is ready for that validation and intentionally keeps the shared webhook URL as a collection variable.
