# Check your JDS tenant and Activate the WxCC Connector

1. Open Control Hub (admin.webex.com) using Chrome and login with your admin credentials.
2. Select the “Customer Journey Data” option from the Monitoring section in the left pane. You will find a preconfigured Journey Project for this lab.  

    <figure markdown>
    ![Control Hub](./assets/CJDS1.png)
    </figure>

3. Click your journey project and activate the Webex Contact Center connector:  
    
    <figure markdown>
    ![WxCC Connector](./assets/CJDS-1.gif)
    </figure>
    

4. Note that there’s a “Project ID” assigned to your Journey Project, copy this ID now as we will use it later in this lab.


# Create a Webex App Integration

1. Navigate to the following URL: https://developer.webex-cx.com
2. Login via the button on the top right and use your admin credentials. 
3. Once logged in navigate to “My Webex Apps” under your login avatar at the top right and then select “Create a New App”. 
4. Create a new App with these parameters:

    -Integration Name : JDS with POSTMAN

    -Description: JDS with POSTMAN  
    
    -Redirect URL(s): https://oauth.pstmn.io/v1/callback

    -Scopes: Check the top three check boxes.

         -cjp:config
         -cjp:config_write
         -cjp:config_read

    -Accept the terms check box.

    -Click Add Integration


    <figure markdown>
    ![Webex App Integration](./assets/Postman-1.gif)
    </figure>

5. Copy and save the Client ID and the Client Secret. 

# Configure Postman to send APIs to JDS

You should see the collection that was exported during the Getting Started section of the lab. Now let’s change some of the collection settings: 

1. Click on the collection name "Wx1 Simplified JDS Collection" in the left panel and you will see the settings. 

2. Click on the Variables tab and update the following fields, set the Initial and Current value to the same values described below:

    - client_idJDS – Set this to the Client ID for the Webex App you added earlier named JDS with POSTMAN
    - client_secretJDS – Set this to the Client Secret for the Webex App you added earlier named JDS with POSTMAN
    - org_idJDS – This is optional but set it to your Control Hub ORG ID
    - workspaceId – In Control Hub, open up the Customer Journey option under Monitoring and copy your project id of your “New Sandbox JDS” JDS project and place it in this field. Do not copy the old “sandbox” one!

    <figure markdown>
    ![Postman Variables](./assets/Postman1.png)
    </figure>

3. Make sure you now **SAVE** the Collection tab named “Wx1 Simplified JDS Collection”.

4. Now click on the Authorization sub tab to the left of the Variables tab and scroll to the bottom of the screen.

5. Click on the orange “Get New Access Token” button.

    <figure markdown>
    ![Postman Authorization](./assets/Postman2.png)
    </figure>

6. A Webex login window will pop up, enter the admin sandbox credentials that you used to create the Webex App integration. 

    <figure markdown>
    ![Postman Permission](./assets/Postman3.png)
    </figure>
    
7. You should see a window with the token, select the option "Use Token". This will provide POSTMAN the bearer Access Token and a Refresh Token to use with all your imported POSTMAN calls for JDS. POSTMAN will also manage the Access Token expiration by using the Refresh Token on your behalf.

    <figure markdown>
    ![Postman Token](./assets/Postman4.png)
    </figure>

# Sending API Calls to CJDS using POSTMAN

Let’s test one of the API calls from the POSTMAN collection to confirm it works.

1. Under the Wx1 Simplified JDS Collection on the left navigation pane, Click the green “GET” named “Get History Stream”. This will open the REST call in a tab on the right. Click the blue “Send” button and you should see a message of “No Historic Journey Events Found” at the bottom of screen in the response area of POSTMAN.

    <figure markdown>
    ![Postman GET-1](./assets/Postman5.png)
    </figure>

2. Now open the POST call named “Simplified Post” located on the left side under the Wx1 Simplified JDS Collection. Edit the Body of the call and change the identity to a fake email account. Once this is done hit the blue “Send” button on the top right side of the screen. You should get a response stating that the data was “Accepted for processing”.

    <figure markdown>
    ![Postman POST](./assets/Postman6.png)
    </figure>

3. Now run your “Get History Stream” call again and you should see your new event in the JDS tape!

    <figure markdown>
    ![Postman GET-2](./assets/Postman7.png)
    </figure>


This concludes the first section of our lab! 