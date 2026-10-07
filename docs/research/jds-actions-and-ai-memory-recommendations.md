# JDS Actions and AI Memory: Recommendation Brief

## Decision

Add **one Journey Action exercise** immediately after the existing progressive-profile work. It must reuse the lab's existing Page Visit scenario and the `PageVisits_PODXX` progressive profile; attendees should not create a second scenario or profile template.

Add a **15–20 minute AI Memory observation** to the existing Lab 4 testing path. The target lab tenants already expose AI Memory in the Journey widget. Attendees make several normal test calls, then open Agent Desktop and inspect the generated insights and AI Memory profile. They do not configure AI Memory.

This was the design brief used for the revised attendee path. The current implementation is documented in Labs 2 and 4. Its historical action-schema examples remain research evidence only; they are not a substitute for validating the shared Webex Connect webhook in a lab POD.

## Sources reviewed

| Source | What was reviewed | How it informs the recommendation |
| --- | --- | --- |
| [BRKCCT-2295 presentation](/Users/luisga/Downloads/BRKCCT-2295+-+003.pptx) | All 54 slides and 25 embedded speaker-note files. | Slides 39 and 42–48 show the intended model: aggregate events in a progressive profile, set a threshold, and deliver an action through a Webex Connect webhook. The two demonstration scenarios are repeated abandoned calls and low AutoCSAT. |
| [BRKCCT-2295 Postman collection](https://github.com/ctg-tme/BRKCCT-2295-Postman-Collection/blob/main/BRKCCT-2295.postman_collection.json) | Every file in the repository (one collection JSON) and all 18 requests. | The collection supplies two end-to-end patterns: repeated abandoned calls and low AutoCSAT. Each creates a profile template, posts test events, and creates an action with a webhook trigger. |
| [CJDS getting started](https://developer.webex.com/webex-contact-center/docs/journey-getting-started) | Current official CJDS guide. | Confirms CJDS is API-driven, describes Action APIs for business-rule workflows, and explains that the designated Customer-Journey-Widget project receives the default Contact Center event feed. |
| [Journey Actions API reference](https://developer.webex.com/webex-contact-center/docs/api/v1/trigger-actions) | Current official API reference index. | Confirms that Journey/Trigger Actions remain a documented, generally available CJDS capability. |
| [Webex Contact Center administrator release notes](https://help.webex.com/article/nv7abhz/What) | Public AI Memory release information. | The public release information does not establish the behavior of these prepared lab tenants. The lab owner confirms that AI Memory is already available in the target Journey widget. |

`developer.wire.com` is not the Cisco/Webex developer source for this work; it belongs to Wire, a separate collaboration product. The current Cisco sources are hosted on `developer.webex.com`; the supplied presentation itself points to the earlier `developer.webex-cx.com` documentation domain. This brief therefore relies on the current Cisco documentation above.

## What the source material establishes

The deck's lifecycle is **Listen → Identify → Analyze → Act**. It says that events, progressive-profile templates, and actions belong to a CJDS project/workspace (slides 17, 20, and 39–44). Its concrete action example posts a webhook after a profile measurement crosses a threshold. The repeated-abandon scenario is more than three abandoned calls in 24 hours; the low-AutoCSAT scenario begins a campaign when the measured score falls below three (slides 46 and 48). Those slides are marked as live-demo placeholders, so they are design evidence, not ready-to-publish lab instructions.

The deck's connector/subscription explanation (slides 20–22) is historical for this lab. Current Cisco guidance says that Contact Center events automatically flow to the designated `Customer-Journey-Widget` workspace; administrators do not activate or configure a Contact Center connector for that default feed. Keep only the workspace verification step. Create an additional journey project only for a custom data source, such as CRM events. This aligns with LAB-2851's current statement that the CJDS connector is already enabled, while avoiding an obsolete attendee setup task.

The collection mirrors that model:

1. It creates a progressive profile based on either `abandonCall` events or `LowCSAT` events.
2. It posts synthetic events to the CJDS publish endpoint.
3. It creates an active action beneath a profile-template ID, with a cooldown and a webhook trigger.
4. It contains retrieval and update requests for identity, profile-template, progressive-profile, and action objects.

The existing lab already supplies the early portions of this chain: its Bruno collection publishes Page Visit, purchase, and order-status events; Lab 2 creates a profile template; and Lab 4 creates Webex Connect fulfillment flows that use CJDS context. See [Lab 1](/Users/luisga/Documents/GitHub/LAB-2851/docs/lab1_bruno.md), [Lab 2](/Users/luisga/Documents/GitHub/LAB-2851/docs/lab2_query_JDS.md), and [Lab 4](/Users/luisga/Documents/GitHub/LAB-2851/docs/lab4_ai_agent_jds.md).

## Recommended four-hour design

### Core addition: one observable Journey Action

Add **Lab 2.4 - Trigger a Journey Action from the Page Visit Profile** immediately after Lab 2.3. It should extend the participant's existing synthetic web-event path.

| Element | Recommendation | Why it fits |
| --- | --- | --- |
| Signal | Reuse the existing `JDS PageVisit` event tied to the identity merged in Lab 2.1. | The attendee has already produced, inspected, and linked these records. |
| Profile measurement | Reuse the existing `PageVisits_PODXX` profile template created in Lab 2.3. | The action directly builds on a visible lab outcome. |
| Action | Create one inactive action first, review its rule and cooldown, then enable it. | This introduces the safety controls before it fires. |
| Trigger | Send an authenticated POST to a **pre-provisioned POD-specific Webex Connect webhook** that only records the event and returns success. | It makes the action testable and avoids an unsolicited customer communication during a lab. |
| Proof | Post the synthetic event enough times to cross the threshold, verify the webhook receipt, then inspect the profile and CJDS timeline. | The attendee can demonstrate all four stages: event, profile, action, outcome. |

The attendee flow should follow the lab's existing numbered `???+ webex "Instructions"` pattern:

1. Copy the ID of the existing `PageVisits_PODXX` profile template.
2. Create an inactive Journey Action under that profile with the supplied POD-specific Webex Connect webhook, rule, and cooldown value.
3. Review the action before enabling it.
4. Re-run the existing `JDS PageVisit` request enough times to meet the existing profile measurement threshold.
5. Confirm the action event in the prepared Webex Connect webhook receiver, then inspect the identity's timeline and progressive-profile value.

Target **25–30 minutes** for this addition. Keep the existing Lab 4 AI Agent work, but use its `JDS_Identity` fulfillment flow as an example of retrieving profile context. Webex Connect webhook delivery remains the required proof point because it is the smallest observable action boundary for a timed lab.

### Optional instructor demonstration: repeated abandoned calls

Use the deck/collection's repeated-abandon pattern as an instructor-led demonstration or an advanced appendix. It has a strong business story, but the lab needs reliable production-style Contact Center event delivery, a confirmed profile-rule syntax, and a configured outreach destination. It should only become hands-on after those prerequisites are prevalidated for every POD.

### Do not make AutoCSAT a core exercise

The AutoCSAT example has more tenant dependencies than it first appears: AutoCSAT availability, an eligible event source, and an applicable customer scenario. It is a useful architecture example, but it should remain a discussion or a prepared demo in a four-hour lab.

## AI Memory addition

Add **Lab 4.4 - Observe AI Memory in Agent Desktop** after the existing Lab 4 test call. This is an observation task, not a configuration exercise.

The attendee path should be:

1. Place at least two calls using the existing Lab 4 voice flow.
2. Have a normal conversation with the AI Agent during one call. If the call escalates, continue a normal conversation with the human agent.
3. Open Agent Desktop and search for the test phone number in the Journey widget.
4. Locate the generated insights and AI Memory profile in the widget.

Target **15–20 minutes**. The lab owner confirms that AI Memory is already available in the target tenants, so the guide should not include an enablement, entitlement, or configuration path. Before publishing the attendee instructions, verify the exact widget label and location in one POD so the steps use the current UI text.

## Time budget and recommended cut

The existing manual **SMS_Deflection** fulfillment-flow and AI Agent action build is the recommended cut from the required path. It asks attendees to create an outbound SMS flow, but the guide does not configure the inbound `GoToQueue` reply handling or an SMS queue handoff. Move this part to an advanced appendix or instructor demonstration.

That cut creates enough room for the 25–30 minute Journey Action exercise and the 15–20 minute AI Memory observation without expanding the four-hour lab. Keep the existing JDS identity, progressive profile, IVR, and core AI Agent exercises.

## Prerequisites and implementation gates

| Gate | Needed before lab instructions are written | Risk if omitted |
| --- | --- | --- |
| CJDS project | Confirm the project/workspace receiving the relevant events for each POD. Current official guidance says the designated Customer-Journey-Widget project receives the default Contact Center event feed. | The profile or action watches a different workspace from the event stream. |
| Identity | Use the same normalized phone identity across the web event, voice call, and profile lookup; verify merge behavior. | Separate person records prevent thresholds from being reached. |
| Current action schema | Validate the create/update payload, action condition grammar, and cooldown behavior in a disposable tenant using the current API reference. | The supplied deck and collection are examples, not a current schema contract. |
| Webhook receiver | Pre-provision a POD-specific endpoint, auth method, accepted body, response, timeout, retry policy, and audit location. | An action can fire with no observable result or leak data to the wrong destination. |
| Safety policy | Define consent, opt-out, re-entry, deduplication, rate limits, and teardown for any real outreach. | A lab test can cause repeated or unauthorized customer messaging. |
| Student access | Confirm the exact scopes and roles needed for profile/action creation. | Attendees reach a permission failure late in the lab. |

## Collection review: reuse carefully

The collection is valuable as an architectural reference, but it needs a cleanup and tenant validation pass before it becomes a LAB-2851 download:

- It includes two scenario families—repeated abandoned calls and low AutoCSAT—and 18 requests total. Several update/read requests hard-code person, template, and action IDs, so they cannot be safely reused across PODs.
- The webhook URL fields are blank. A receiving Webex Connect event flow is therefore implied, but not delivered by the collection.
- Authentication is mixed: creation requests set OAuth explicitly while several update/read/publish requests inherit authentication. A lab collection needs one documented auth model and a preflight request.
- The example action conditions compare values in ways that must be checked against the current action API and actual profile measurement. Do not copy their condition strings verbatim into attendee instructions before a live validation.
- The collection has no automated assertions, teardown, retry test, or proof of webhook delivery. Add these only after the action contract is confirmed.

## Recommended order of work

1. In one disposable tenant, validate a minimal profile-template → action → authenticated Webex Connect webhook path against the current APIs.
2. Pre-provision and test the webhook receiver for every POD; record only non-sensitive test metadata.
3. Build an importable, POD-neutral collection with variables for workspace, template, action, webhook, and identity. Do not store credentials or tenant-specific IDs in it.
4. Verify the exact Journey widget location and label for AI Memory in one POD.
5. Time the complete attendee path after moving SMS Deflection to the appendix.

## Open questions to resolve before implementation

1. Is a separate, POD-specific Connect webhook and service already available for all lab tenants?
2. Which identity format does each incoming channel produce, and how will the lab prove they resolve to the same CJDS person?
3. Are the required CJDS configuration scopes assigned to the student admin accounts in every POD?
