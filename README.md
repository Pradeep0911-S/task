> **Note:** When First time starting the project, u need to run the fie `initDb.js` to seed the value in the database (or)
> when
> changing the users data,  ex : email "demo01110911@gmail.com" to "your-another-known-email" in `initDB.js` also run the `initDb.js` by
> `node initDb.js` in that database directory
> and go back to project directory and run the `npm start` command
## Environment Variables

```env
PORT=3000

EMAIL_USER=your-gmail-address
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=your-gmail-address
JWTSECRET=SECRET_KEY
```





---

## API Endpoints
> **Note:** This are for test, for a vaild email to test u can use the seeded info from `initDb.js` example
> {
        email : "demo01110911@gmail.com",
        password : "Demotest@123"
  }.
> change the email "demo01110911@gmail.com" to "your-another-known-email" in initDB.js

All API endpoints use the **POST** HTTP method.

### 1. Login

**Endpoint**

```http
POST http://localhost:3000/api/auth/login
```

**Request Body**

```json
{
  "email": "demo@example.com",
  "password": "Demotest@123"
}
```

---

### 2. Verify OTP

**Endpoint**

```http
POST http://localhost:3000/api/auth/otp/verify
```

**Request Body**

```json
{
  "referenceId": "a22b6932-3e25-4983-b9c3-00018208e6af",
  "otp": "329830"
}
```


---

### 3. Forgot Password

**Endpoint**

```http
POST http://localhost:3000/api/auth/forgot-password
```

**Request Body**

```json
{
  "email": "demo@example.com"
}
```


