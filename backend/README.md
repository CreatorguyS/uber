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

# /captains/register Endpoint Documentation

## Description
This endpoint registers a new captain in the Uber backend system. It validates input data, creates a new captain entry, and returns the captain object along with an authentication token upon successful registration.

## Endpoint
**POST** `/captains/register`

## Request Body
The request body must be in JSON format with the following structure:

| Field        | Type   | Required | Description |
|-------------|--------|----------|-------------|
| fullname    | Object | Yes      | Contains the captain's full name. |
| firstname   | String | Yes      | Must be at least 3 characters long. |
| lastname    | String | No       | Optional field for last name. |
| email       | String | Yes      | Must be a valid email address. |
| password    | String | Yes      | Must be at least 6 characters long. |
| vehicle     | Object | Yes      | Contains vehicle details of the captain. |
| color       | String | Yes      | Must be at least 3 characters long. |
| plate       | String | Yes      | Must be at least 3 characters long. |
| capacity    | Number | Yes      | Must be at least 1. |
| vehicleType | String | Yes      | Must be one of: `car`, `motorcycle`, `auto`. |

### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "plate": "MP 04 XY 6204",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

### Example Response (Success)
```json
{
  "captain": {
    "_id": "62e9e3b3c1f5b91234567890",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "MP 04 XY 6204",
      "capacity": 3,
      "vehicleType": "car"
    }
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
    { "type": "field", "msg": "Password must be at least 6 characters", "path": "password", "location": "body" },
    { "type": "field", "msg": "Color must be at least 3 characters", "path": "vehicle.color", "location": "body" },
    { "type": "field", "msg": "Plate must be at least 3 characters", "path": "vehicle.plate", "location": "body" }
  ]
}
```

### Example Response (Captain Already Exists)
```json
{
  "message": "Captain already exists"
}
```

---

### Notes
- Ensure that the `Content-Type` is set to `application/json` when sending requests.
- The JWT token should be stored securely and used for authentication in protected routes.
- The password is **not returned** in the response for security reasons.

