# /users/register Endpoint Documentation

## Description

This endpoint registers a new user into the Uber backend system. It accepts user data, validates the input, creates a new user entry, and returns the user object along with an authentication token upon successful registration.

## Endpoint

**POST** `/users/register`

## Request Body

The request body must be in JSON format with the following structure:

- `fullname`: An object containing:
  - `firstname` (string, **required**, minimum 3 characters)
  - `lastname` (string, optional)
- `email` (string, **required**, must be a valid email address)
- `password` (string, **required**, minimum 6 characters)

### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname` (string): User's first name (minimum 3 characters).
    - `lastname` (string): User's last name (minimum 3 characters).
  - `email` (string): User's email address (must be a valid email).
  - `password` (string): User's password (minimum 6 characters).
- `token` (String): JWT Token

