const fs = require('fs');
const { url } = require('inspector');

function extractSubdomain(filePath) {
  const urlRegex = /https:\/\/([^.]+)\.trycloudflare\.com/;

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');

    for (const line of lines) {
      const match = line.match(urlRegex);
      if (match) {
        return match[1];
      }
    }

    return null;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

async function linkToDB(link) {
  const databaseUrl = "https://mybot-md2-default-rtdb.firebaseio.com/link.json";
  await fetch(databaseUrl, {
      method: 'PUT',
      body: JSON.stringify(link),
      headers: { 'Content-Type': 'application/json' }
  });
  console.log("TUNNEL LINK : ", link);
}

const filePath = 'output.txt';
const subdomain = extractSubdomain(filePath);
const link = `https://${subdomain}.trycloudflare.com`;
linkToDB(link);