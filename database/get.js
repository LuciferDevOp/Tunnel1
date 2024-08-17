
const express = require('express');
const router = express.Router();

const databaseLink = "https://mybot-md2-default-rtdb.firebaseio.com";

router.get('/', async (req, res) => {
  const { key, path } = req.query;
  const _path = path || "";

  try {
    const databaseUrl = `${databaseLink}/${key}/${_path}.json`;
    const response = await fetch(databaseUrl);
    const data = await response.json();

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ Error: 'Data not found'}); 
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error Fetching Data'});
  }
});

module.exports = router;
