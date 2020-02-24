# PRIME Code Challenge

## Backend

- NodeJS (JavaScript)
- Express.js

## Frontend

- ReactJS (JavaScript)
- Semantic UI (css)
- Axios (HTTP client)

## REST API Endpoints

### Redirect user to OAuth Url

```
- GET /login
```

### Delete user's session data

```
- GET /logout
```

### Retrieve user's current session

```
- GET /session
- RESPONSE
    Status: 401
    Content: User is not authorized
- RESPONSE
    Status: 200
    Content<JSON; object>:
        {
            username: <username from OAuth>
        }
```