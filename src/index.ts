import { Hono } from 'hono';
import mongoose from 'mongoose';
import { ResultsModel } from './models/ResultsModel';

const app = new Hono();

// Connect to MongoDB
mongoose.connect(process.env.MONGOURI || '')
    .then(() => console.log('Database connected at '+ new Date()))
    .catch(err => console.log('Database connection Error: ' + err + ' at '+ new Date()));

// Route: Add new benchmark result
app.post('/results', async (c) => {
  const body = await c.req.json();

  try {
    const newResult = new ResultsModel(body);
    const saved = await newResult.save();
    return c.json({ message: 'Result saved', id: saved._id }, 201);
  } catch (err) {
    return c.json({ error: 'Failed to save result', details: err }, 400);
  }
});

// Route: Get all results
app.get('/results', async (c) => {
  const results = await ResultsModel.find().sort({ createdAt: -1 });
  return c.json(results);
});

// Route: Get result by ID
app.get('/results/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const result = await ResultsModel.findById(id);
    if (!result) return c.json({ error: 'Result not found' }, 404);
    return c.json(result);
  } catch {
    return c.json({ error: 'Invalid ID' }, 400);
  }
});

export default app;
