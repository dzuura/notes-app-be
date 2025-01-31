# Notes App API Documentation

## Overview

The Notes App API provides a set of endpoints to manage notes and user management in a system. It allows users to create, retrieve, update, and delete notes records efficiently. 

## Base URL

The base URL for the API is: https://notes-app-be-psi.vercel.app/
<br>

## Endpoints

### 1. User Register

- **Endpoint:** `/api/auth/register`
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

- **Endpoint:** `/api/auth/login`
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

- **Endpoint:** `/api/notes`
- **Method:** `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
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

- **Endpoint:** `/api/notes`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON array of notes.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/api/notes'
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

- **Endpoint:** `/api/notes/{id}`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON object of note.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/api/notes/oiOTbbr9zuhLQQUx3XoC'
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

- **Endpoint:** `/api/notes/{id}`
- **Method:** `PUT`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** Error message with required fields.

#### Example Request
```json
{
  "title": "Updated Note Title",
  "content": "Updated content for my note.",
  "tags": ["work"],
  "folder": "Work",
  "is_pinned": false
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

- **Endpoint:** `/api/notes/{id}`
- **Method:** `DELETE`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** Confirmation message.

#### Example Request
```curl
curl --location --request DELETE 'https://notes-app-be-psi.vercel.app/api/notes/oiOTbbr9zuhLQQUx3XoC'
```

#### Example Response
```json
{
  "message": "Note deleted successfully."
}
```

### 8. Not Found Note

- **Endpoint:** `/api/notes/{id}`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 404 Not Found
  - **Response Body:** Error message with required fields.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/api/notes/oiOTbbr9zuhLQQUx3XoC'
```

#### Example Response
```json
{
  "error": "Note not found"
}
```

### 9. Share Note (not yet implemented)

- **Endpoint:** `/api/notes/{id}/share`
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

### 10. Shared Note (not yet implemented)

- **Endpoint:** `/api/notes/shared`
- **Method:** `GET`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 200
  - **Response Body:** JSON array of the shared notes.

#### Example Request
```curl
curl --location --request GET 'https://notes-app-be-psi.vercel.app/api/notes/shared'
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

### 11. Shared Note (not yet implemented)

- **Endpoint:** `/api/notes/{id}/share/{share_id}`
- **Method:** `DELETE`
- **Headers**:
  - `Authorization: Bearer jwt_token`
- **Response:**
  - **Status Code:** 204
  - **Response Body:** No content.

#### Example Request
```curl
curl --location --request DELETE 'https://notes-app-be-psi.vercel.app/api/notes/oiOTbbr9zuhLQQUx3XoC/share/b9pr23r72ur23'
```
