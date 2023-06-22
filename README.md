# helpdesk-support-ticket-management-application

- ### [Diagram ต่าง ๆ ที่ใช้ในการออกแบบระบบ](https://github.com/panupongKanin/helpdesk-support-ticket-management-application/tree/main/image/diagram)

# API Documentation: Helpdesk Support Ticket Management

## 1. Understand the API’s users

The API is designed for developers and administrators of a helpdesk support ticket management application. Users of this API are expected to have knowledge of web development and RESTful API concepts.

## 2. Map out the user journey

The typical user journey using this API involves the following steps:

- Create a new ticket with these pieces of information; title, description, contact
information, created timestamp, latest ticket update timestamp.
- Retrieving tickets: Users can list all tickets or retrieve a specific ticket by its ID.
- Update a ticket’s information and status (pending, accepted, resolved, rejected).
- Managing ticket information: Users can create, retrieve, and update ticket information related to events, dates, venue, ticket prices, sales, restrictions, and terms and conditions.
- Managing contact information: Users can create, retrieve, and update contact information associated with tickets, including email, phone number, and address.
- Managing ticket status: Users can create, retrieve, and update ticket statuses, such as "open," "in progress," or "closed."
- Managing users: Users can list all users, retrieve user details, create new users, update user information, and delete users.

## 3. Start with the fundamentals

Base URL: `https://api.example.com`

Authentication: This API requires authentication using an API key. Include the API key in the `Authorization` header of each request:

```
Authorization: Bearer <API_KEY>
```

## 4. Add code examples

### Create a Ticket

**Request:**

```
POST /CreateTicket
Request Body:
{
  "title": "Example Ticket",
  "description": "This is an example ticket."
}

```

**Response:**

- HTTP Status Code: 201 Created
- Response Body:
  ```json
  {
    "id": 1,
    "title": "Example Ticket",
    "description": "This is an example ticket.",
    "ticketInformation": { ... },
    "contactInformation": { ... },
    "status": { ... }
  }
  
  ```

### List Tickets

**Request:**

```
GET /ListTickets
```

**Response:**

- HTTP Status Code: 200 OK
- Response Body:
  ```json
  {
    "tickets": [
      {
        "id": 1,
        "title": "Example Ticket",
        "description": "This is an example ticket.",
        "ticketInformation": { ... },
        "contactInformation": { ... },
        "status": { ... }
      },
      { ... }
    ]
  }
  
  ```

### Get Ticket by ID

**Request:**

```
GET /GetTicket/{id}
```

**Response:**

- HTTP Status Code: 200 OK
- Response Body:
  ```json
  {
    "id": 1,
    "title": "Example Ticket",
    "description": "This is an example ticket.",
    "ticketInformation": { ... },
    "contactInformation": { ... },
    "status": { ... }
  }
  
  ```

### Update a Ticket

**Request:**

```
PATCH /updateTicket
Request Body:
{
  "id": 1,
  "title": "Updated Ticket",
  "description": "This ticket has been updated."
}

```

**Response:**

- HTTP Status Code: 200 OK
- Response Body:
  ```json
  {
    "id": 1,
    "title": "Updated Ticket",
    "description": "This ticket has been updated.",
    "ticketInformation": { ... },
    "contactInformation": { ... },
    "status": { ... }
 

 }
 
  ```

*(Provide similar code examples for other endpoints)*

## 5. List your status codes and error messages

The API follows standard HTTP status codes and includes appropriate error messages in the response body when an error occurs. Here are some common status codes:

- 200 OK: The request was successful.
- 201 Created: The resource was successfully created.
- 400 Bad Request: The request was invalid or malformed.
- 401 Unauthorized: Authentication failed or the API key is missing or invalid.
- 404 Not Found: The requested resource was not found.
- 500 Internal Server Error: An unexpected error occurred on the server.

The response body for error messages may include additional details about the error to assist developers in troubleshooting.


