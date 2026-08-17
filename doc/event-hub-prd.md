# EventHub — Backend Project Specification

A REST API project for event management and ticketing. Difficulty: ⭐⭐⭐⭐

## 1. Project Objective

Build a scalable REST API where users can discover events, organizers can create and manage events, and customers can purchase tickets and manage their bookings.

## 2. User Roles

### Admin

- Manage users
- Manage events
- View all bookings
- View all payments
- Delete and restore events

### Organizer

- Create events
- Update their own events
- Upload event banners
- Create and manage ticket types
- View attendees
- Cancel their events

### Customer

- Browse events
- Search and filter events
- View event details
- Purchase tickets
- View bookings
- Cancel bookings
- View tickets
- Review events

## 3. Models

| Model | Fields |
|-------|--------|
| **User** | `fullName`, `email`, `password`, `avatar`, `role`, `isVerified`, `createdAt` |
| **Event** | `title`, `description`, `banner`, `location`, `date`, `time`, `category`, `organizer`, `capacity`, `availableTickets`, `status`, `deletedAt`, `createdAt` |
| **Ticket** | `event`, `name`, `price`, `quantity`, `availableQuantity` |
| **Booking** | `user`, `event`, `ticket`, `quantity`, `totalAmount`, `status`, `bookingDate` |
| **Payment** | `user`, `booking`, `amount`, `reference`, `status`, `paymentDate` |
| **Review** | `user`, `event`, `rating`, `comment`, `createdAt` |

## 4. Database Relationships

- One User (Organizer) → Many Events
- One Event → Many Tickets
- One User → Many Bookings
- One Event → Many Bookings
- One Event → Many Reviews
- One Booking → One Payment

## 5. Authentication

- Register
- Login
- Verify email
- Forgot password
- Reset password
- Change password
- Logout

**Implementation details:**

- Use **bcrypt** for password hashing
- Use **JWT** for authentication
- Use **OTP** and **Nodemailer** for verification/reset flows

## 6. Event Management

- Create event
- Get all events
- Get one event
- Update event
- Delete event
- Restore event
- Upload event banner

**Rule:** Organizer can only modify their own events

## 7. Ticket Management

- Create ticket type for an event
- Get tickets for an event
- Update ticket type
- Delete ticket type
- Track total quantity
- Track available quantity

## 8. Booking System

**Example request:**

```json
{
  "event": "EVENT_ID",
  "ticket": "TICKET_ID",
  "quantity": 2
}
```

**Steps:**

1. Find the event
2. Find the ticket
3. Check whether enough tickets are available
4. Calculate total price
5. Create the booking
6. Reduce available ticket quantity
7. Create a payment record
8. Return booking information

**Example calculation:** VIP ticket = ₦50,000; quantity = 2; total = ₦100,000.

## 9. Search, Filter, Sort & Pagination

```
GET /events?search=concert
GET /events?category=Music
GET /events?location=Lagos
GET /events?sort=price
GET /events?sort=newest
GET /events?page=1&limit=10
```

Combine multiple query parameters when needed.

## 10. Reviews

- Customer can rate an event from 1–5
- Customer can leave a comment
- Only a customer who has booked the event should be allowed to review it
- Prevent duplicate reviews if you choose to enforce one review per customer per event

## 11. Authorization Rules

- Admin has administrative access
- Organizer can manage only their own events
- Customer can manage only their own bookings
- Users must be authenticated before protected actions
- Ownership checks must be separate from simple role checks

## 12. Suggested Folder Structure

```
eventhub/
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── event.controller.js
│   ├── ticket.controller.js
│   ├── booking.controller.js
│   ├── payment.controller.js
│   └── review.controller.js
├── models/
│   ├── user.model.js
│   ├── event.model.js
│   ├── ticket.model.js
│   ├── booking.model.js
│   ├── payment.model.js
│   └── review.model.js
├── routes/
│   ├── auth.route.js
│   ├── user.route.js
│   ├── event.route.js
│   ├── ticket.route.js
│   ├── booking.route.js
│   ├── payment.route.js
│   └── review.route.js
├── middleware/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── upload.middleware.js
│   └── error.middleware.js
├── config/
│   └── db.js
├── utils/
│   ├── sendEmail.js
│   └── generateToken.js
├── uploads/
├── app.js
├── server.js
├── .env
└── package.json
```

## 13. Security Requirements

- JWT authentication
- Role-based authorization
- Password hashing with bcrypt
- Helmet
- CORS
- Rate limiting
- Input validation
- Centralized error handling
- Do not expose sensitive values from `.env`

## 14. Recommended Build Order

1. Project setup and server
2. MongoDB connection
3. User model and authentication
4. Authentication middleware
5. Role authorization middleware
6. Event model and CRUD
7. Event search/filter/sort/pagination
8. Ticket model and ticket management
9. Booking system and ticket availability
10. Payment model and payment flow
11. Reviews
12. File upload
13. Admin features
14. Security and error handling
15. Complete Postman testing

## 15. Challenge Rules

- Do not copy a complete solution from the internet.
- Build each feature yourself and test it in Postman.
- Use `populate()` where relationships require referenced documents.
- Return appropriate HTTP status codes.
- Validate request data before saving to MongoDB.
- Keep controllers, routes, models, middleware, and utilities separated.
