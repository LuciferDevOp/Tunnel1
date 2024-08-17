
const express = require('express');
const router = express.Router();

const databaseLink = "https://mybot-md2-default-rtdb.firebaseio.com";

router.get('/', async (req, res) => {
  const { key, path } = req.query;
  const _path = path || "";

  try {
    const databaseUrl = `${databaseLink}/${key}/${_path}.json`;
    const response = await fetch(databaseUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404).json({ message: 'Error Deleting Data' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error Deleting Data' });
  }
});

module.exports = router;
