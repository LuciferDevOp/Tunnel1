
const express = require('express');
const router = express.Router();

const databaseLink = "https://mybot-md2-default-rtdb.firebaseio.com";

router.get('/', async (req, res) => {
  const { key } = req.query;

  if (!key) {
    res.status(400).json({ Error: 'Key is required'});
  }

  try {
    const databaseUrl = `${databaseLink}/${key}/token.json`;
    const response1 = await fetch(databaseUrl);
    const data = await response1.json();
    const response2 = await fetch(databaseUrl, {
        method: 'PUT',
        body: `${data + 1}`,
        headers: { 'Content-Type': 'application/json' }
    });

    if (response2) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(404).json({ message: 'Error Adding Token' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error Fetching Data'});
  }
});

module.exports = router;
