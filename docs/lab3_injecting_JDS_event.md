# Using Flow Designer to Inject JDS Events

We will now push events to JDS from Flow Designer. 

1. In the WX1JDSLabFlow, add a Set Variable node after the "Refund" node. Change the name of the node to Refund_Request, select the variable Customer_Resolution and set the value to "Refund". 

    <figure markdown>
    ![Refund Request](./assets/Refund.png)
    </figure>

2. Add another "Set Variable" node after the "Replacement" node. Change the name of the node to Replacement_Request, select the variable Customer_Resolution and set the value to "Replacement".

    <figure markdown>
    ![Replacement Request](./assets/Replacement.png)
    </figure>

3. Insert a new HTTP Request node AFTER the "Refund_Request" and "Replacement_Request" nodes. This new node will push an event to the JDS service.

    - Rename the new HTTP Request node to JDS_Post.
    - On the Connector drop down select the CJDS Connector.
    - Set the Request URL to:

            /publish/v1/api/event

    - Set the Method to: **POST**
        - Add one Query Parameter and set the value to the following:
            - Key = **workspaceId** 
            - Value **{{CHJDS_ProjectID}}**
    - Set the Content Type to **Application/JSON**
    - Copy the following JSON into the Request Body: 

  {
    "id": "{{NewPhoneContact.interactionId}}",
    "specversion": "1.0",
    "type": "task:new",
    "source": "IVR",
    "identity": "{{NewPhoneContact.ANI}}",
    "identitytype": "phone",
    "datacontenttype": "application/json",
    "data": {
        "origin":"IVR",
        "firstName": "{{FirstName}}",
        "lastName": "{{LastName}}",
        "phone": "{{NewPhoneContact.ANI}}",
        "channelType": "Sales",
        "uiData": {
            "title": "Product_Dispute",
            "iconType": "task",
            "subTitle": "{{Customer_Resolution}}"
        }
    }
}
    <figure markdown>
    ![JDS Post](./assets/JDS_Post.gif)
    </figure>

    