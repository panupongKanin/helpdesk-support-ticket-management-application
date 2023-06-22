# helpdesk-support-ticket-management-application

- ### [Diagram ต่าง ๆ ที่ใช้ในการออกแบบระบบ](https://github.com/panupongKanin/helpdesk-support-ticket-management-application/tree/main/image/diagram)

Sure! Here's an example of API documentation based on the provided code:

## API Documentation

### 1. Understand the API's users

The API is designed to serve as a support ticket management application. The users of this API are administrators or support staff who need to create, manage, and track support tickets. They can also manage ticket information, contact information, ticket statuses, and user accounts.

### 2. Map out the user journey

The typical user journey using this API involves the following steps:

1. Creating a ticket: Users can create a new support ticket by providing the ticket title, description, contact information, and selecting the ticket information and status.
2. Retrieving tickets: Users can list all tickets or retrieve a specific ticket by its ID.
3. Updating a ticket: Users can update the details of a ticket, such as the title, description, contact information, ticket information, and status.
4. Managing ticket information: Users can create, retrieve, and update ticket information related to events, dates, venue, ticket prices, sales, restrictions, and terms and conditions.
5. Managing contact information: Users can create, retrieve, and update contact information associated with tickets, including email, phone number, and address.
6. Managing ticket status: Users can create, retrieve, and update ticket statuses, such as ("pending", "accepted", "resolved", "rejected").
7. Managing users: Users can list all users, retrieve user details, create new users, update user information, and delete users.

### 3. Start with the fundamentals

The API endpoints and their respective functionalities are as follows:

- **CreateTicket** (`POST /CreateTicket`): Create a new support ticket.
- **GetTicket** (`GET /GetTicket/:id`): Retrieve a specific ticket by its ID.
- **ListTickets** (`GET /ListTickets`): List all tickets.
- **UpdateTicket** (`PATCH /updateTicket`): Update the details of a ticket.
- **CreatTicketInformation** (`POST /CreatTicketInformation`): Create new ticket information.
- **ListTicketInformations** (`GET /ticketInformations`): List all ticket information.
- **GetLastTicketInformationID** (`GET /getLastTicketInformationID`): Get the last ticket information ID.
- **UpdateTicketInformation** (`PATCH /updateTicketInformation`): Update ticket information.
- **CreatContactInformation** (`POST /CreatContactInformation`): Create new contact information.
- **ListContactInformations** (`GET /contactInformations`): List all contact information.
- **GetLastContactInformationID** (`GET /getLastContactInformationID`): Get the last contact information ID.
- **UpdateContactInformation** (`PATCH /updateContactInformation`): Update contact information.
- **CreatStatus** (`POST /CreatStatus`): Create new ticket status.
- **ListStatuses** (`GET /statuses`): List all ticket statuses.
- **GetStatus** (`GET /status/:id`): Retrieve a specific ticket status by its ID.
- **ListUsers** (`GET /users`): List all users.
- **GetUser** (`GET /user/:id`): Retrieve a specific user by their ID.
- **CreateUser** (`POST /users`): Create a new user.
- **UpdateUser** (`PATCH /users`): Update user information.
- **DeleteUser** (`DELETE /users/:id`): Delete a user by their ID.

### 4. Code examples

Here are a few code examples demonstrating the usage of the API endpoints:

### CreateTicket (POST /CreateTicket)

Create a new support ticket.

**Request Body:**
```json
{
  "Title": "Support Ticket Title",
  "Description": "Support ticket description",
  "TicketInformationID": 1,
  "ContactInformationID": 1,
  "StatusID": 1
}
```

### GetTicket (GET /GetTicket/:id)

Retrieve a specific ticket by its ID.

**Parameters:**
- `id` (integer): The ID of the ticket.

### ListTickets (GET /ListTickets)

List all tickets.

### UpdateTicket (PATCH /updateTicket)

Update the details of a ticket.

**Request Body:**
```json
{
  "ID": 1,
  "Title": "Updated Ticket Title",
  "Description": "Updated ticket description",
  "TicketInformationID": 1,
  "ContactInformationID": 1,
  "StatusID": 2
}
```

### CreatTicketInformation (POST /CreatTicketInformation)

Create new ticket information.

**Request Body:**
```json
{
  "EventDate": "2023-06-23",
  "EventTime": "19:00",
  "Venue": "Ticket Venue",
  "TicketPrice": 29.99,
  "Sales": "Ticket Sales Information",
  "Restrictions": "Ticket Restrictions",
  "TermsConditions": "Ticket Terms and Conditions"
}
```

### ListTicketInformations (GET /ticketInformations)

List all ticket information.

### GetLastTicketInformationID (GET /getLastTicketInformationID)

Get the last ticket information ID.

### UpdateTicketInformation (PATCH /updateTicketInformation)

Update ticket information.

**Request Body:**
```json
{
  "ID": 1,
  "EventDate": "2023-06-23",
  "EventTime": "20:00",
  "Venue": "Updated Ticket Venue",
  "TicketPrice": 39.99,
  "Sales": "Updated Ticket Sales Information",
  "Restrictions": "Updated Ticket Restrictions",
  "TermsConditions": "Updated Ticket Terms and Conditions"
}
```

### CreatContactInformation (POST /CreatContactInformation)

Create new contact information.

**Request Body:**
```json
{
  "Email": "contact@example.com",
  "Phone": "+1-123-456-7890",
  "Address": "Contact Address"
}
```

### ListContactInformations (GET /contactInformations)

List all contact information.

### GetLastContactInformationID (GET /getLastContactInformationID)

Get the last contact information ID.

### UpdateContactInformation (PATCH /updateContactInformation)

Update contact information.

**Request Body:**
```json
{
  "ID": 1,
  "Email": "updated_contact@example.com",
  "Phone": "+1-987-654-3210",
  "Address": "Updated Contact Address"
}
```

### CreatStatus (POST /CreatStatus)

Create new ticket status.

**Request Body:**
```json
{
  "StatusName": "New Status"
}
```

### ListStatuses (GET /statuses)

List all ticket statuses.

### GetStatus (GET /status/:id)

Retrieve a specific ticket status by its ID.

**Parameters:**
- `id` (integer): The ID of the ticket status.


These are the available endpoints and their corresponding functionalities. You can interact with the API using the provided methods and parameters to perform the desired operations.
## 5. List your status codes and error messages

The API follows standard HTTP status codes and includes appropriate error messages in the response body when an error occurs. Here are some common status codes:

- 200 OK: The request was successful.
- 201 Created: The resource was successfully created.
- 400 Bad Request: The request was invalid or malformed.
- 401 Unauthorized: Authentication failed or the API key is missing or invalid.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

The response body for error messages may include additional details about the error to assist developers in troubleshooting.


