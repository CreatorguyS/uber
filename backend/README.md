# /users/register Endpoint Documentation

## Description
This endpoint registers a new user in the Uber backend system. It validates input data, creates a new user entry, and returns the user object along with an authentication token upon successful registration.

## Endpoint
**POST** `/users/register`

## Request Body
The request body must be in JSON format with the following structure:

| Field        | Type   | Required | Description |
|-------------|--------|----------|-------------|
| fullname    | Object | Yes      | Contains the user's full name. |
| firstname   | String | Yes      | Must be at least 3 characters long. |
| lastname    | String | No       | Optional field for last name. |
| email       | String | Yes      | Must be a valid email address. |
| password    | String | Yes      | Must be at least 6 characters long. |

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
```

### Example Response (Success)
```json
{
  "user": {
    "_id": "62e9e3b3c1f5b91234567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example Response (Validation Errors)
```json
{
  "errors": [
    { "type": "field", "msg": "Invalid email", "path": "email", "location": "body" },
    { "type": "field", "msg": "Use longer name", "path": "fullname.firstname", "location": "body" },
    { "type": "field", "msg": "Password must be at least 6 characters", "path": "password", "location": "body" }
  ]
}
```

---

# /users/login Endpoint Documentation

## Description
This endpoint allows a registered user to log into the Uber backend system. It validates the provided email and password, checks for authentication, and returns a JWT token upon successful login.

## Endpoint
**POST** `/users/login`

## Request Body
The request body must be in JSON format with the following structure:

| Field     | Type   | Required | Description |
|----------|--------|----------|-------------|
| email    | String | Yes      | Must be a valid email address. |
| password | String | Yes      | Must be at least 6 characters long. |

### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

### Example Response (Success)
```json
{
  "user": {
    "_id": "62e9e3b3c1f5b91234567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example Response (Invalid Credentials)
```json
{
  "error": "Invalid email or password"
}
```

### Example Response (Validation Errors)
```json
{
  "errors": [
    { "type": "field", "msg": "Enter a valid email", "path": "email", "location": "body" },
    { "type": "field", "msg": "Password must be at least 6 characters", "path": "password", "location": "body" }
  ]
}
```

---

### Notes
- Ensure that the `Content-Type` is set to `application/json` when sending requests.
- The JWT token should be stored securely and used for authentication in protected routes.
- The password is **not returned** in the response for security reasons.

