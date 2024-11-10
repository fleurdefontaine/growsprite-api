import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

const DocPage = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState('');

  const endpoints = [
    {
      method: 'GET',
      path: '/api/search',
      description: 'Search for Growtopia sprites by item name',
      parameters: [
        {
          name: 'item',
          type: 'string',
          required: true,
          description: 'The name of the item to search for'
        }
      ],
      exampleRequest: 'https://growsprite.vercel.app/api/search?item=magplant',
      exampleResponse: {
        sprites: [
          {
            title: "MAGPLANT 5000",
            spriteUrl: "https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/192/y-offset/640/window-width/32/window-height/32?format=png&fill=cb-20241014124343"
          },
          {
            title: "MAGPLANT 5000 Remote",
            spriteUrl: "https://static.wikia.nocookie.net/growtopia/images/8/8f/ItemSprites.png/revision/latest/window-crop/width/32/x-offset/352/y-offset/544/window-width/32/window-height/32?format=png&fill=cb-20241014124343"
          }
        ]
      }
    }
  ];

  const copyToClipboard = async (text, endpoint) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEndpoint(endpoint);
      setTimeout(() => setCopiedEndpoint(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">API Documentation</h1>
            <p className="text-gray-600">
              Welcome to the Growtopia Sprite Search API documentation. This API allows you to search for Growtopia item sprites
              and retrieve their images.
            </p>
          </div>

          {endpoints.map((endpoint, index) => (
            <div key={index} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-mono">
                  {endpoint.method}
                </span>
                <code className="bg-gray-100 px-2 py-1 rounded flex-1 font-mono">
                  {endpoint.path}
                </code>
              </div>

              <p className="mb-4 text-gray-700">{endpoint.description}</p>

              <h3 className="font-semibold mb-2">Parameters</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Required</th>
                      <th className="pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endpoint.parameters.map((param, idx) => (
                      <tr key={idx} className="border-t border-gray-200">
                        <td className="py-2 font-mono text-sm">{param.name}</td>
                        <td className="py-2 text-sm">{param.type}</td>
                        <td className="py-2 text-sm">{param.required ? 'Yes' : 'No'}</td>
                        <td className="py-2 text-sm">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold mb-2">Example Request</h3>
              <div className="bg-gray-800 p-4 rounded-md mb-4 relative">
                <code className="text-green-400 font-mono text-sm break-all">
                  {endpoint.exampleRequest}
                </code>
                <button
                  onClick={() => copyToClipboard(endpoint.exampleRequest, 'request')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white"
                >
                  {copiedEndpoint === 'request' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>

              <h3 className="font-semibold mb-2">Example Response</h3>
              <div className="bg-gray-800 p-4 rounded-md relative">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                  {JSON.stringify(endpoint.exampleResponse, null, 2)}
                </pre>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(endpoint.exampleResponse, null, 2), 'response')}
                  className="absolute right-2 top-2 text-gray-400 hover:text-white"
                >
                  {copiedEndpoint === 'response' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DocPage;