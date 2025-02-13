# Notes App API Documentation

## Overview

The Notes App API provides a set of endpoints to manage notes and user management in a system. It allows users to create, retrieve, update, and delete notes records efficiently. 

## Base URL

The base URL for the API is: https://notes-app-be-psi.vercel.app/
<br>

## Endpoints

### 1. User Register

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Response:**
  - **Status Code:** 201 Created
  - **Response Body:** JSON object of the user id.

#### Example Request
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Example Response
```json
{
  "user_id": "dSVrHUEejd7MfjX4zhzv"
}
```

### 2. User Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON object of the user token.

#### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

#### Example Response
```json
{
  "token": "jwt_token"
}
```

### 3. Create Note

- **Endpoint:** `/notes`
- **Method:** `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 201
  - **Response Body:** JSON object of the note id.

#### Example Request
```json
{
  "title": "My First Note",
  "content": "This is the content of my first note.",
  "tags": ["personal", "important"],
  "folder": "Personal",
  "is_pinned": true
}
```

#### Example Response
```json
{
  "note_id": "oiOTbbr9zuhLQQUx3XoC"
}
```

### 4. Get All Notes

- **Endpoint:** `/notes`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON array of notes.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/notes'
```

#### Example Response
```json
[
  {
    "id": "oiOTbbr9zuhLQQUx3XoC",
    "title": "My First Note",
    "content": "This is the content of my first note.",
    "tags": ["personal", "important"],
    "folder": "Personal",
    "is_pinned": true,
    "created_at": "2023-10-01T12:00:00Z",
    "updated_at": "2023-10-01T12:00:00Z"
  }
]
```

### 5. Get Note By ID

- **Endpoint:** `/notes/{id}`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON object of note.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/notes/oiOTbbr9zuhLQQUx3XoC'
```

#### Example Response
```json
{
  "id": "oiOTbbr9zuhLQQUx3XoC",
  "title": "My First Note",
  "content": "This is the content of my first note.",
  "tags": ["personal", "important"],
  "folder": "Personal",
  "is_pinned": true,
  "created_at": "2023-10-01T12:00:00Z",
  "updated_at": "2023-10-01T12:00:00Z"
}
```

### 6. Update Note

- **Endpoint:** `/notes/{id}`
- **Method:** `PUT`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON object of the updated note.

#### Example Request
```json
{
  "title": "My First Note",
  "content": "This is the content of my first note.",
  "tags": ["personal", "important"],
  "folder": "Personal",
  "is_pinned": true,
}
```

#### Example Response
```json
{
  "id": "oiOTbbr9zuhLQQUx3XoC",
  "title": "Updated Note Title",
  "content": "Updated content for my note.",
  "tags": ["work"],
  "folder": "Work",
  "is_pinned": false,
  "created_at": "2023-10-01T12:00:00Z",
  "updated_at": "2023-10-01T12:00:00Z"
}
```

### 7. Delete Note

- **Endpoint:** `/notes/{id}`
- **Method:** `DELETE`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** Confirmation message.

#### Example Request
```curl
curl --location --request DELETE 'https://notes-app-be-psi.vercel.app/notes/oiOTbbr9zuhLQQUx3XoC'
```

#### Example Response
```json
{
  "message": "Note deleted successfully."
}
```

### 8. Not Found Note

- **Endpoint:** `/notes/{id}`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 404 Not Found
  - **Response Body:** Error message with required fields.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/notes/oiOTbbr9zuhLQQUx3XoC'
```

#### Example Response
```json
{
  "error": "Note not found"
}
```

### 9. User Profile

- **Endpoint:** `/profile`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON object of user data.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/profile'
```

#### Example Response
```json
{
    "id": "dSVrHUEejd7MfjX4zhzv",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "created_at": {
        "_seconds": 1738317899,
        "_nanoseconds": 253000000
    }
}
```

### 10. Share Note (not yet implemented)

- **Endpoint:** `/notes/{id}/share`
- **Method:** `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 201
  - **Response Body:** JSON object of the share id.

#### Example Request
```json
  {
    "shared_with_email": "magnus@gmail.com",
    "permission_level": "view"
  }
```

#### Example Response
```json
{
  "share_id": "b9pr23r72ur23"
}
```

### 11. Shared Note (not yet implemented)

- **Endpoint:** `/notes/shared`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON array of the shared notes.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/notes/shared'
```

#### Example Response
```json
[
  {
    "id": "b9pr23r72ur23",
    "title": "My First Note",
    "content": "This is the content of my first note.",
    "shared_with": "magnus@gmail.com",
    "permission_level": "view"
    "shared_at": "2023-10-01T12:00:00Z"
  }
]
```

### 12. Revoke Note Sharing (not yet implemented)

- **Endpoint:** `/notes/{id}/share/{share_id}`
- **Method:** `DELETE`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 204
  - **Response Body:** No content.

#### Example Request
```curl
curl --location --request DELETE 'https://notes-app-be-psi.vercel.app/notes/oiOTbbr9zuhLQQUx3XoC/share/b9pr23r72ur23'
```
