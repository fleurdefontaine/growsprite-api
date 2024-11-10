/* eslint-disable no-unused-vars */

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Copy,
  CheckCircle,
  Loader2,
  AlertCircle,
  X,
  Github,
} from "lucide-react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import DocPage from "./components/doc";
import NotFoundPage from "./components/404";

const randomQuotes = [
  "Patience is the key to all good things.",
  "Good things take time.",
  "Searching for your sprites... hang tight!",
  "Great things are coming soon!",
  "A little patience, a lot of rewards.",
];

const Alert = ({ children, variant = "default" }) => {
  const bgColor = variant === "destructive" ? "bg-red-100" : "bg-blue-100";
  const textColor =
    variant === "destructive" ? "text-red-800" : "text-blue-800";
  const iconColor =
    variant === "destructive" ? "text-red-400" : "text-blue-400";

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-md flex items-start`}>
      <AlertCircle
        className={`${iconColor} h-5 w-5 mr-2 mt-0.5 flex-shrink-0`}
      />
      <div>{children}</div>
    </div>
  );
};

const SpriteCard = ({ title, spriteUrl, onError }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const originalUrl = spriteUrl.includes('/api/proxy-image?url=')
        ? decodeURIComponent(spriteUrl.split('/api/proxy-image?url=')[1])
        : spriteUrl;
      
      await navigator.clipboard.writeText(originalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
        {title}
      </h3>
      <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden shadow-inner mb-3">
        <img
          src={spriteUrl}
          alt={`Sprite for ${title}`}
          className="max-w-full max-h-full object-contain"
          onError={onError}
        />
      </div>
      <button
        onClick={copyToClipboard}
        className="w-full flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
      >
        {copied ? (
          <span className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Copied!
          </span>
        ) : (
          <span className="flex items-center">
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </span>
        )}
      </button>
    </motion.div>
  );
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sprites, setSprites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState("");
  const [randomQuote, setRandomQuote] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError("");
    setSprites([]);
    setDebug("");
    setRandomQuote(
      randomQuotes[Math.floor(Math.random() * randomQuotes.length)]
    );

    try {
      const response = await fetch(
        `/api/search?item=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();

      if (data.sprites && data.sprites.length > 0) {
        setSprites(data.sprites);
      } else {
        setError("No sprites found");
      }
    } catch (error) {
      setError("An error occurred while searching");
      setDebug(`Error details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <nav className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Growtopia Sprite Search
            </Link>
            <Link
              to="/doc"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              API Docs
            </Link>
          </div>
        </nav>

        <div className="relative mb-6 max-w-2xl mx-auto">
          <form onSubmit={handleSearch}> {/* Event submit */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter item name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md pr-20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </button>
            </div>
          </form>
        </div>

        {error && <Alert variant="destructive">{error}</Alert>}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center bg-blue-50 p-6 rounded-lg shadow-lg mb-6"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-4" />
            <p className="text-lg font-semibold text-blue-800">{randomQuote}</p>
          </motion.div>
        )}
      </div>

      {sprites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sprites.map((sprite, index) => (
            <SpriteCard
              key={index}
              title={sprite.title}
              spriteUrl={`/api/proxy-image?url=${encodeURIComponent(
                sprite.spriteUrl
              )}`}
              onError={() => {
                setSprites((current) => current.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
      )}

      {debug && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-3 bg-white rounded-lg shadow"
        >
          <p className="text-xs text-gray-600 break-all">{debug}</p>
        </motion.div>
      )}

      <footer className="mt-8 text-center">
        <div className="flex justify-center items-center space-x-6">
          <a
            href="https://github.com/fleurdefontaine/API-Growtopia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>View API Source</span>
          </a>
          <a
            href="https://discord.gg/FKKUAsFWMt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-[#5865F2] transition-colors"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25-1.844-.277-3.68-.277-5.486 0-.174-.407-.418-.875-.629-1.25a.077.077 0 00-.078-.037A19.736 19.736 0 003.67 4.369a.07.07 0 00-.032.027C.533 9.313-.32 14.176.099 19.001a.083.083 0 00.031.056c2.06 1.516 4.045 2.438 5.992 3.028a.079.079 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104c-.652-.247-1.27-.549-1.866-.892a.077.077 0 01-.007-.128c.125-.094.25-.192.369-.291a.073.073 0 01.077-.01c3.927 1.79 8.18 1.79 12.062 0a.073.073 0 01.078.01c.12.099.244.197.369.291a.077.077 0 01-.006.128 12.299 12.299 0 01-1.868.891.076.076 0 00-.04.105c.36.699.773 1.364 1.225 1.993a.077.077 0 00.084.028c1.958-.59 3.943-1.512 6.003-3.028a.075.075 0 00.031-.055c.5-5.079-.838-9.916-3.576-14.605a.067.067 0 00-.033-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.085 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.953-2.418 2.157-2.418 1.21 0 2.175 1.085 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z"/>
            </svg>
            <span>Join Discord</span>
          </a>
        </div>
      </footer>
    </div>
  );
};


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/doc" element={<DocPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}