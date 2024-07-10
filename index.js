const express = require('express');
const si = require('systeminformation');

const app = express();
const port = 3000;

// Endpoint to get CPU information
app.get('/cpu', async (req, res) => {
  try {
    const cpu = await si.cpu();
    res.json(cpu);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch CPU information' });
  }
});

// Endpoint to get memory information
app.get('/memory', async (req, res) => {
  try {
    const memory = await si.mem();
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memory information' });
  }
});

// Endpoint to get system information
app.get('/system', async (req, res) => {
  try {
    const system = await si.system();
    res.json(system);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch system information' });
  }
});

// Endpoint to get all hardware information
app.get('/all', async (req, res) => {
  try {
    const [cpu, memory, system] = await Promise.all([
      si.cpu(),
      si.mem(),
      si.system()
    ]);
    res.json({ cpu, memory, system });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hardware information' });
  }
});

app.listen(port, () => {
  console.log(`Hardware info API listening at http://localhost:${port}`);
});
