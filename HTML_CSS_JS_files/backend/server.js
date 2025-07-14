// backend/server.js
const express = require('express');
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

// Create supabase client with service role
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Generic search endpoint
app.get('/api/people', async (req, res) => {
  const { field, value } = req.query;

  if (!field || !value) {
    return res.status(400).json({ error: 'Missing search parameters' });
  }

  let query;
  if (field === 'Name') {
    query = supabase.from('People').select('*').ilike('Name', `%${value}%`);
  } else if (field === 'LicenseNumber') {
    query = supabase.from('People').select('*').eq('LicenseNumber', value);
  } else {
    return res.status(400).json({ error: 'Invalid search field' });
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
