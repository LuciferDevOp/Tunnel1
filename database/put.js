
const express = require('express');
const router = express.Router();

const databaseLink = "https://mybot-md2-default-rtdb.firebaseio.com";

router.get('/', async (req, res) => {

  const { key, path, data } = req.query;
  const _path = path || "";

  try {
    const processedData = processData(data);
    if (!processedData) {
      res.status(404).json({ message: 'Invalid Data Type' });
      return;
    }
    const databaseUrl = `${databaseLink}/${key}/${_path}.json`;
    const response = await fetch(databaseUrl, {
        method: 'PUT',
        body: processedData,
        headers: { 'Content-Type': 'application/json' }
    });

    if (response) {
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404).json({ message: 'Error Putting data' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error Putting Data' });
  }
});

function processData(data) {
  switch (typeof data) {
    case 'object':
      if (Array.isArray(data)) {
        return JSON.stringify(data);
      } else if (data === null) {
        return null;
      } else {
        return JSON.stringify(data);
      }
    case 'string':
      return data;
    case 'number':
      return data.toString();
    case 'boolean':
      return data.toString();
    default:
      console.error('Unexpected data type:', typeof data);
      return null;
  }
}

module.exports = router;
