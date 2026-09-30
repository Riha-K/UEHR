# UEHR Form Generator

Clinical form builder for an EHR. Forms can be created in more than one language, saved in MongoDB, bound to SNOMED CT through Snowstorm, and shaped with openEHR archetypes. The React UI stores submissions through an Express API.

## What runs here

| Part | Where | Default |
| --- | --- | --- |
| React UI | repo root | http://localhost:3000 |
| Express API | `backend/` | port 5001, stores submissions in MongoDB |
| SNOMED search | Snowstorm + Elasticsearch 7.1 | proxied by Nginx |

## Prerequisites

- Java 11 or newer, and Maven 3, for Snowstorm
- Elasticsearch 7.1.0
- MongoDB Community Server
- Node.js and npm
- Nginx, as the Snowstorm proxy

## App

Frontend, from the repo root:

```bash
npm install
npm start
```

Backend:

```bash
cd backend
npm install
npm start
```

Submissions show up in MongoDB Compass.

## Snowstorm

Snowstorm is not in this repo. Install it from the [Snowstorm getting started guide](https://github.com/IHTSDO/snowstorm/blob/master/docs/getting-started.md).

1. Start Elasticsearch 7.1.0.
2. Run the Snowstorm jar from that guide. Leave off `--snowstorm.rest-api.readonly=true` so the server can import data.
3. Request the International Edition from [MLDS](https://mlds.ihtsdotools.org/#/landing), then load it with the steps in the Snowstorm readme. Access usually takes a few days.
4. Point Nginx at Snowstorm using the config in that readme. Add `Access-Control-Allow-Origin: *` on the proxy if the browser blocks the UI.
