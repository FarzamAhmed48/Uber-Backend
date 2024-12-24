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

### GET /user/profile

This endpoint is used to retrieve the current user's profile.

#### Request

- **URL**: `/user/profile`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **Body**:

```json
{
  "_id": "user_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Error Response

```json
{
  "error": "Unauthorized"
}
```

### GET /user/logout

This endpoint is used to logout.

#### Request

- **URL**: `/user/logout`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <jwt_token>`

#### Response

- **Body**:

```json
{
  "message": "Logged Out Successfully"
}
```

### Error Response

```json
{
  "error": "Unauthorized"
}
```

### POST /user/add-captain

This endpoint is used to register a new Captain.

#### Request

- **URL**: `/user/add-captain`
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
    "password": "yourpassword",
    "vehicle":{
      "color":"red",
      "vehicleType":"car",
      "capacity":3,
      "numberPlateNo":"BHX-291"
    }
  }
  ```

#### Response

- **Body**:
  ```json
  {
    "token": "jwt_token",
    "cpatain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "hashed_password"
    },
    "vehicle":{
      "color":"red",
      "vehicleType":"car",
      "capacity":3,
      "numberPlateNo":"BHX-291"
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
### POST /captain/login

This endpoint is used to log in an existing captain.

#### Request

- **URL**: `/captain/login`
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }

  ```
#### Response
 ```json
{
  "token": "jwt_token",
  "captain": {
    "_id": "captain_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
#### Error Response
  ```json
  {
  "error": [
    {
      "msg": "Invalid Message",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password Should atleast contain 6 letters",
      "param": "password",
      "location": "body"
    }
  ]
}
```
```json
{
  "error": "Invalid Email or Password"
}
```




### POST /captain/login

This endpoint is used to log in an existing captain.

#### Response

```json
{
  "_id": "captain_id",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "numberPlateNo": "BHX-291",
    "capacity": 3,
    "vehicleType": "car"
  },
  "status": "active",
  "location": {
    "lat": 12.9716,
    "lng": 77.5946
  }
}
```

#### Error Response
```json
{
  "error": "Unauthorized"
}
```
