// backend/server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
  res.json(data);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
