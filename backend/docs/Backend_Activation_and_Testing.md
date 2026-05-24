# Backend Activation and Testing Guide

## 1. Prerequisite: Obtain Public IP

If you need to access or demonstrate the backend from outside your local machine/network, first get your public IP address.

1. Open a browser and visit one of these sites:
   - https://ifconfig.me
   - https://api.ipify.org
2. Copy the displayed IP address and keep it for sharing or network configuration.

Note:
- For local development and Postman testing on the same machine, use `localhost`.
- Public IP testing may require router/firewall port forwarding to your local `3000` port.

## 2. Start the Backend

From the project root:

1. Change to backend folder:

```powershell
cd backend
```

2. Rename `.env.example` to `.env`:

```powershell
Rename-Item .env.example .env
```

3. Start backend in development mode:

```powershell
npm run dev
```

Expected result:
- Backend server starts successfully and listens on port `3000`.

## 3. Test Endpoints with Postman Collection

Collection file:
- `backend/docs/DOTE6685.postman_collection.json`

### 3.1 Import Collection

1. Open Postman.
2. Click **Import**.
3. Select `backend/docs/DOTE6685.postman_collection.json`.

### 3.2 Set Base URL Variable

This collection uses `{{BaseURL}}`.

Set collection variable:
- `BaseURL = http://localhost:3000/api`

How:
1. In Postman, open the imported collection.
2. Go to **Variables**.
3. Add or update:
   - Name: `BaseURL`
   - Initial Value: `http://localhost:3000/api`
   - Current Value: `http://localhost:3000/api`
4. Save the collection.

### 3.3 Run Basic Test Flow

1. Run `Authentication -> 2. Login User`.
   - This request stores `token` automatically from the response.
2. Run `Users -> 1. Get User id by Email`.
   - Example query is already included: `student@school.com`.
3. Confirm a successful response (for example `200 OK`) and valid JSON payload.

## 4. Quick Verification Checklist

- Backend process is running with `npm run dev`.
- Postman collection imported.
- `BaseURL` is set to `http://localhost:3000/api`.
- Login returns a token.
- Protected API requests succeed with the saved token.
