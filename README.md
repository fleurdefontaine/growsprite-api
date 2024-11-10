![GitHub repo size](https://img.shields.io/github/repo-size/fleurdefontaine/growsprite-api)
![GitHub issues](https://img.shields.io/github/issues/fleurdefontaine/growsprite-api)
![GitHub stars](https://img.shields.io/github/stars/fleurdefontaine/growsprite-api?style=social)
![GitHub license](https://img.shields.io/github/license/fleurdefontaine/growsprite-api)

# Growtopia Sprite Search API

Welcome to the **Growtopia Sprite Search API**! This API allows you to search for item sprites in the game **Growtopia** by item name and retrieve their images.

## 🌟 Features

- 🔍 **Search for Growtopia sprites** by item name
- 📦 **Fast and efficient** response in JSON format
- 🖼️ **Retrieve item images** directly via URL
- 🚀 **Proxied image URLs** for consistent access

## 🛠️ Technologies Used

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.2.0-blue?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-16.13.1-green?logo=node.js)

## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/fleurdefontaine/growsprite-api.git
cd growsprite-api
```

2. Install dependencies
```bash
npm i .
```

3. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Building for Production

1. Create a production build
```bash
npm run build
```

2. Start the production server
```bash
npm start
```

## 📜 API Documentation

### Endpoint

`GET /api/search`

| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| `item`    | string | Yes      | The name of the item to search for |

### Example Request

```bash
GET https://growsprite.vercel.app/api/search?item=magplant
```

### Example Response

```json
{
  "sprites": [
    {
      "title": "MAGPLANT 5000",
      "spriteUrl": "https://static.wikia.nocookie.net/growtopia/images/..."
    },
    {
      "title": "MAGPLANT 5000 Remote",
      "spriteUrl": "https://static.wikia.nocookie.net/growtopia/images/..."
    }
  ]
}
```

## 📞 Connect with Us

Join our Discord community for discussions, support, and updates!
[![Discord Server](https://img.shields.io/discord/1280493760870088764?color=7289da&label=Discord&logo=discord&logoColor=white)](https://discord.gg/FKKUAsFWMt)

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

👨‍💻 **Contributions** are welcome! Feel free to open issues or submit pull requests. Let's make this project better together.