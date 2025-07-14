// backend/server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Generate Supabase client service
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// fetching people table 
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

// fetching vehicle table
app.get('/api/vehicle', async (req, res) => {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: 'Missing plate number' });
  }

  const { data, error } = await supabase
    .from('Vehicles')
    .select(`VehicleID, Make, Model, Colour, People(Name, LicenseNumber)`)
    .eq('VehicleID', plate);

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

// adding/inserting into table
app.post('/api/addVehicle', async (req, res) => {
  const { rego, make, model, colour, ownerID } = req.body;

  const { data, error } = await supabase.from('Vehicles').insert({
    VehicleID: rego,
    Make: make,
    Model: model,
    Colour: colour,
    OwnerID: ownerID
  }).select();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});

app.post('/api/addPeople', async (req, res) => {
  const { personid, name, address, dob, license, expire } = req.body;

  const { data, error } = await supabase.from('People').insert({
    PersonID: personid,
    Name: name,
    Address: address,
    DOB: dob,
    LicenseNumber: license,
    ExpiryDate: expire
  }).select();

  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
