const express = require('express');
const { getSpriteItem, getFullName } = require('./Growsprite');
const path = require('path');
const cors = require("cors");
const axios = require("axios");
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../build')));
app.use(cors());
app.use(compression());

app.get('/api/proxy-image', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).send('URL parameter is required');
    }

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error('Error proxying image:', error.message);
    if (error.response) {
      console.error(`Response status: ${error.response.status}`);
    }
    res.status(500).send(`Error fetching image: ${error.message}`);
  }
});

app.get('/api/search', async (req, res) => {
  const itemName = req.query.item;
  if (!itemName) return res.status(400).json({ error: 'Item name is required' });

  try {
    const suggestions = await getFullName(itemName);
    const spritePromises = suggestions.map(async (suggestion) => {
      const spriteUrl = await getSpriteItem(suggestion);
      return spriteUrl ? { title: suggestion, spriteUrl } : null;
    });

    const spriteResults = await Promise.all(spritePromises);
    const validSprites = spriteResults.filter(sprite => sprite !== null);

    if (validSprites.length > 0) {
      res.json({ sprites: validSprites });
    } else {
      res.status(404).json({ error: 'No sprites found' });
    }
  } catch (error) {
    console.error('Error searching for sprite:', error);
    res.status(500).json({ error: 'An error occurred while searching for the sprite' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});