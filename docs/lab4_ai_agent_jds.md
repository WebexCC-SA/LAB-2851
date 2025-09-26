Lab 4.1 Create an AI Agent and a Knowledge Base 

???+ webex "Use a generic KB"
    1. From the AI Agent Studio, select the notebook icon on the left navigation menu. This is where you will manage your Knowledge Bases. 
    2. Click **Create Knowledge Base**, provide Knowledge base name as **<span id="attendee-id">---</span>_AI_KB**, then click **Create**.
    3. Go to the **Files** tab and select the option **Add File**. You will find a generic KBs in the Desktop folder, **DrJames_KB.txt**. 
    4. Upload the generic KB and select the option **Process Files**.
    <br>
    <br>
    ![Profiles](../assets/DrJames_KB.gif)

???+ webex "Create your own AI Agent"
    1. Navigate to **Dashboard** from the right-hand side menu panel and click **Create Agent**
    2. Select **Start from Scratch** and click **Next**
    3. On **Create an AI agent** page select the type of agent: **Autonomous**
    10. A new section called **Add the essential details** will appear. Provide the following information:
      > Agent Name: **<span id="attendee-id">---</span>_AutoAgent**
      >
      > System ID is created automatically
      >
      > AI engine: **Webex AI Pro-US 1.0**
    5. The **Agent's goal** section depends on what you want your AI Agent to do, but here's a recommended template:
      > You are a <Personality Prompt\> <Agent Type\> for <Company Name\> in the <Industry\> industry. You are especially skilled at <Agent Purpose\> for <Audience\>.
      >
      > Example: You are a professional FAQ and Knowledge Base Assistant for Webex in the Customer Experience industry. You are specially skilled at answering questions relevant to our Contact Center and CPaaS solutions for our customers.
    11. Once the agent is created, you need to add **Instructions** to orchestrate how the AI Agent will execute an action. There's a pre-configured action that will authenticate you via OTP to your mobile device (US numbers only), these are the instructions:
      ```
      ##Tasks
      ### Authenticate the user via OTP with the action \[generate_OTP\] and \[validate_OTP\]. 
      Execute the step \[validate_OTP\] a maximum of 3 times for every OTP generated. 
      ## Response Guidelines
      Formatting Rules:
      Provide clear, concise responses. Use bullet points or short paragraphs for clarity.
      Language Style: Keep a polite and professional tone.
      ##Completion:
      Ask if the user needs additional help before ending.
      ```
    12. Switch to **Knowledge** tab and from **Knowledge base** drop-down list select **<span id="attendee-id">---</span>_AI_KB**
    13. Click **Save Changes**, then click **Publish**. Provide any version name in popped up window (ex. "1.0").
    <br>
    <br>
    ![Profiles](../assets/create_your_own_Agent.gif)
    <br>
    <br>

Lab 4.2 Build Connect AI Agent Flows 

Lab 4.3 Integrate to JDS using Fulfillment Actions

???+ webex "Create Actions"
    14. Switch to the **Actions** tab and click the **New action** button. Proceed to name the action **generate_OTP**, add a description and select the action scope option called **Slot filling and fulfillment**. 
    15. Create new input entities for the data required to authenticate, these are the details for each entity:
    <br>
      > | Entity Name      | Type     | Value  | Description  |
      > | :--------:       | :-------:| :----: | :---------:  |
      > | name             | string   |    -   | Customer name |
      > | phone_number     | Phone    | **Use default regex**| A valid phone number with country code. 
    16. In the **Webex Connect Flow Builder Fulfillment** section, select the **CCW_Admin_Flows** service and the flow **generate_OTP**. Click the "Add" button. 
    14. click the **New action** button again, and proceed to name the action **validate_OTP**, add a description and select the action scope option called **Slot filling and fulfillment**. 
    15. Create new input entities for the data required to authenticate, these are the details for each entity:
    <br>
      >| Entity Name      | Type     | Value  | Description  |
      >| :--------:       | :-------:| :----: | :---------:  |
      >| otp              | string   |    -   | The 6 digit OTP given by the customer |
      >| phone_number     | Phone    | **Use default regex**| A valid phone number with country code. |
      >| transaction      | string   |    -   | transid received in the authenticate_generate_OTP response. Do not ask the user for this |
    16. In the **Webex Connect Flow Builder Fulfillment** section, select the **CCW_Admin_Flows** service and the flow **validate_OTP**. Click the "Add" button.  
    17. You are ready to test your AI Agent. 
    <br>
    <br>
    ![Profiles](../assets/create_your_own_Actions.gif)
    <br>
    <br>