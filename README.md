# oneCompare

Clean runnable version of the oneCompare web application.

## Run the backend

```powershell
cd "C:\Users\vinee\OneDrive\Desktop\one compare\one compare1\backend"
python -m uvicorn app.main:app --reload
```

Backend docs:

```text
http://127.0.0.1:8000/docs
```

## Run the frontend

Open another PowerShell window:

```powershell
cd "C:\Users\vinee\OneDrive\Desktop\one compare\one compare1"
npm install
npm run dev
```

Open the app:

```text
http://127.0.0.1:3000
```

## Notes

- The backend works with mock fallback data if MongoDB is not configured.
- To use MongoDB, update `backend\.env.example` values in a real `backend\.env` file.
