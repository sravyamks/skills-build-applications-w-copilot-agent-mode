# Octofit Tracker presentation tier

The React 19 application uses React Router for navigation and Vite to build its
presentation tier.

## API URL configuration

The frontend calls the API on port `8000`. During Vite development, `/api` calls
are proxied through the frontend server to `localhost:8000`, so the browser does
not need direct access to the API port.

For production builds running in Codespaces, define `VITE_CODESPACE_NAME` as the
Codespace name so the frontend can construct the forwarded API URL. For example,
create `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads environment variables when its server starts; restart it after
changing `.env.local`. In a production build, `VITE_CODESPACE_NAME` is optional
for localhost use and requests fall back to `http://localhost:8000`.

Run the frontend with `npm run dev --prefix octofit-tracker/frontend`.
