const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Fetches search suggestions from Growtopia Wiki API
 * @param {string} input - Search term
 * @returns {Promise<Array<string>>} - Array of suggested titles
 */
async function getFullName(input) {
  try {
    if (!input) return [];

    const searchUrl = `https://growtopia.fandom.com/api.php?action=query&srlimit=20&list=search&srsearch=${encodeURIComponent(input)}&format=json`;
    const response = await axios.get(searchUrl);
    
    if (response.data && response.data.query && response.data.query.search) {
      return response.data.query.search.map(item => item.title);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
}

/**
 * Fetches the sprite image URL from the Growtopia Wiki
 * @param {string} input - The search term (e.g., "Diamond Lock Seed")
 * @returns {Promise<string | undefined>} - The image URL in PNG format if found
 */
async function getSpriteUrl(input) {
  try {
    if (!input) return undefined;

    const encodedInput = encodeURIComponent(input);
    const link = `https://growtopia.wikia.com/wiki/${encodedInput}`;
    const response = await axios.get(link);
    
    const $ = cheerio.load(response.data);
    const selector = ".growsprite > img";
    const spriteUrl = $(selector).attr("src");
    
    if (!spriteUrl) return undefined;

    return spriteUrl.replace("webp", "png");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Error fetching page: ${error.response.status}`);
      throw new Error(`Request failed with status code ${error.response.status}`);
    } else {
      throw error;
    }
  }
}

module.exports = {
  getSpriteItem: (itemName) => getSpriteUrl(itemName),
  getFullName: (input) => getFullName(input)
};