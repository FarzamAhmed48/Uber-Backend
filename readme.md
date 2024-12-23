# Backend API Documentation

## Endpoints

### POST /user/add-user

This endpoint is used to register a new user.

#### Request

- **URL**: `/user/add-user`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }
  ```

#### Response

- **Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "hashed_password"
    }
  }
  ```

#### Error Response

- **Body**:
  ```json
  {
    "error": [
      {
        "msg": "Invalid Message",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First Name Should atleast contain 3 letters",
        "param": "fullName.firstName",
        "location": "body"
      },
      {
        "msg": "Password Should atleast contain",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```


### POST /user/add-user

This endpoint is used to register a new user.

#### Request

- **URL**: `/user/add-user`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }

#### Response

- **Body**:
```json
{
  "token": "jwt_token",
  "user": {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password"
  }
}
``