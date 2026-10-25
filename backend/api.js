const express = require('express')
const dbConnect = require('./mongodb')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json({ limit: '2mb' }));
const port = Number(process.env.PORT || 5001)

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

app.get('/health', (_req, resp) => {
  resp.json({ ok: true, service: 'uehr-form-api' });
});

// Persist a submitted clinical form document (openEHR-shaped JSON + termBindings).
app.post('/', async (req, resp) => {
  try {
    if (!isPlainObject(req.body) || Object.keys(req.body).length === 0) {
      resp.status(400).json({ error: 'Empty or invalid form body' });
      return;
    }

    const data = await dbConnect();
    const doc = {
      ...req.body,
      receivedAt: new Date().toISOString(),
    };
    const result = await data.insertOne(doc);
    resp.status(201).json({
      insertedId: result.insertedId,
      acknowledged: result.acknowledged,
    });
  } catch (error) {
    console.error('POST / failed', error);
    resp.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`UEHR form API listening on port ${port}`);
});
