# Webex AI Agent Integration with CJDS

Webex AI Agents allow you to use the power of GenAI inside our Customer Experience flows. Our Autonomous agents are capable of helping customer in real-time based on a knowledge base using RAG techniques and execute actions by using Webex Connect flows. In this lab, we will focus in creating an AI Agent that can retrieve information and post events from/to CJDS while assisting a customer. 

##Lab 4.1 Create an AI Agent and a Knowledge Base

In order to start this lab, go back to Control Hub and select the AI Agents card on the left pane of the Contact Center Menu. The AI Agent studio should open in a separate tab, this is where you will configure your own AI Agent and Knowledge Base. 

???+ webex "Creating a Knowledge Base for Webex AI Agent"
    1. From the AI Agent Studio, select the notebook icon on the left navigation menu. This is where you will manage your Knowledge Bases. 
    2. Click **Create Knowledge Base**, provide Knowledge base name as **PODXX_AI_KB** (replace the XX with your POD number), then click **Create**.
    3. Download this generic KB:  <a href="https://github.com/WebexCC-SA/LAB-2851/blob/main/docs/assets/JDS_LAB_Flow_PODXX.json" target="_blank">Webex_Sneakers_KB</a>. 
    3. Go to the **Files** tab and select the option **Add File**.
    4. Upload the Webex Sneakers KB and select the option **Process Files**.
    <br>
    <br>
    ![Profiles](../assets/DrJames_KB.gif)

???+ webex "Create your own AI Agent"
    1. Navigate to **Dashboard** from the right-hand side menu panel and click **Create Agent**
    2. Select **Start from Scratch** and click **Next**
    3. On **Create an AI agent** page select the type of agent: **Autonomous**
    4. A new section called **Add the essential details** will appear. Provide the following information:
      > Agent Name: **PODXX_JDS_AI** (Replace the XX with the POD ID)
      >
      > System ID is created automatically
      >
      > AI engine: **Webex AI Pro-US 1.0**
    5. The **Agent's goal** section needs to contain the following:
      > Answer general questions about our online store, Webex Sneakers! Provide information about the customer orders and route to human agents when required.
    6. Once the agent is created, update the Welcome Message to say" 
      >Hey! Welcome to Webex Sneakers! How can I help you? 
    7. Switch to **Knowledge** tab and from **Knowledge base** drop-down list select the knowledge base you created. 
    8. Click **Save Changes**. 

    Now you need to add **Instructions** to orchestrate how the AI Agent will execute an action, but we first need to create the Webex Connect flows. Let's do that! 
    

##Lab 4.2 Build Connect AI Agent Fulfillment Flows. 
Webex Connect has a powerful and intuitive flow builder tool, with its low-code/no-code approach it makes it easy for administrators to build fulfillment flows for our AI Agents. 
In order to start this lab, go back to Control Hub and select the Overview card on the left pane. In the Quick Links section you will see the Webex Connect hyperlink, that will open in another tab of your browser. 

???+ webex "Create Fulfillment Flows in Webex Connect"
    1. Find the Service matching your POD ID and click it. 
    2. This will open the dashboard section of your service, click the flows tab to start building. 
    3. Select the option Create Flow and add the name **JDS_Identity**. Click the "Create" button. 
        - This opens the trigger category page, select the **AI Agent** integration trigger. 
        - Now you should see the **Configure AI Agent Event** window open up. In the sample JSON box, remove all of the default values and just leave an empty JSON, like this: 
        ``` JSON
        {}
        ```
        - Click the **Parse** blue button and hit save. 
        - From the Node Palette on the left, drag and drop an **Evaluate** node into the canvas. Connect the AI Agent node to the Evaluate node. Double click the **Evaluate** node and enter this code: 
        ```
        var ANItoTime = Date.now() + "";
        var lookbacktime = ANItoTime - 30000;
        var ANIfromTime = lookbacktime + "";
        1;
        ```
        - In the same node, enter the number 1 in the **Script Output** field and in the **Branch Name** enter the word Success. Hit Save. 
        - Let's add another node, look for a node called WxCC API and bring it to the canvas. Connect the **Evaluate** green output to this new node. Double Click the WxCC API node and enter the following information: 
        > From: $(ANIfromTime)
        >
        > To: $(ANItoTime)
        >
        > Corrid: $(corrid)
        - Hit Save. 
        

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








        There's a pre-configured action that will authenticate you via OTP to your mobile device (US numbers only), these are the instructions:
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


you need to add **Instructions** to orchestrate how the AI Agent will execute an action