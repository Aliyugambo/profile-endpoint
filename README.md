(The file `/home/thinktwice/my-codes/profile-endpoint/README.md` exists, but is empty)
# Profile Endpoint

A tiny, minimal REST API that returns a small profile object plus a live cat fact.

This project exposes a single endpoint (`GET /me`) which returns user metadata sourced from environment variables, a timestamp, and a cat fact fetched from the public API at `catfact.ninja`.

## Features

- Single HTTP GET endpoint: `/me`.
- Fetches a live cat fact (external API: https://catfact.ninja/fact).
- Returns profile data read from environment variables (so it's easy to customize).
- Small, dependency-light Express server with CORS enabled.

## Contract (inputs / outputs)

- Inputs: none (just a GET request).
- Outputs: JSON object with fields:
	- `status`: { code: number, message: string }
	- `user`: { email?: string, name?: string, stack?: string }
	- `timestamp`: ISO-8601 timestamp string
	- `fact`: string (cat fact)
- Error mode: If the external cat-fact request fails, the server returns HTTP 500 with a short error JSON message.

## Dependencies

The project uses the following dependencies (from `package.json`):

- express
- axios
- cors
- dotenv

Dev dependency:

- nodemon (for development hot reload)

Installable with npm (instructions below).

## Environment

The server reads the following environment variables:

- `EMAIL` — optional, used in the `user.email` field in responses.
- `NAME` — optional, used in the `user.name` field in responses.
- `STACK` — optional, used in the `user.stack` field in responses.
- `PORT` — optional, port the server listens on (defaults to `5000`).

You can provide them either as shell environment variables or via a `.env` file at the project root (the project uses `dotenv`). Example `.env`:

EMAIL=you@example.com
NAME=Your Name
STACK=JavaScript,Node
PORT=5000

## Setup (locally)

1. Install Node.js (v16+ recommended).
2. Clone / open this repository.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file (optional) with the variables shown above or export them into your shell.

## Running

Start the server (production mode):

```bash
npm start
```

Start in development mode (auto-restarts on change):

```bash
npm run dev
```

Default server output:

```
✅ Server running on port 5000
```

## API: GET /me

Request:

```http
GET /me HTTP/1.1
Host: localhost:5000
```

Successful response (200):

```json
{
	"status": { "code": 200, "message": "success" },
	"user": {
		"email": "you@example.com",
		"name": "Your Name",
		"stack": "JavaScript,Node"
	},
	"timestamp": "2025-10-18T12:34:56.789Z",
	"fact": "Cats have five toes on their front paws, but only four toes on their back paws."
}
```

Error response (500) example when the external API fails:

```json
{
	"status": "error",
	"message": "Failed to fetch cat fact. Please try again later."
}
```

## Example curl

```bash
curl http://localhost:5000/me
```

## Troubleshooting

- If the server logs an error about fetching the cat fact, the external service (`catfact.ninja`) may be down or your environment has restricted outbound HTTP access.
- If `npm start` fails because of missing packages, run `npm install` first.
- If the port is already in use, set `PORT` in your `.env` or environment and restart.

## Tests

There are no automated tests included. You can manually verify by starting the server and curling the endpoint.

## License

This project uses the ISC license (see `package.json`).

---

