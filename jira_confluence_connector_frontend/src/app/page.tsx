"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // Backend URL (fixed in your environment)
  const BACKEND_URL = "https://vscode-internal-21108-beta.beta01.cloud.kavia.ai:3001";

  const handleConnect = async (type: "jira" | "confluence") => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/${type}`);
      if (!res.ok) throw new Error("Failed to get auth URL");

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Atlassian OAuth
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-10">Atlassian Connector</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        {/* Jira */}
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-3">Jira</h2>
          <p className="text-gray-500 mb-5">Connect your Jira Cloud account</p>
          <button
            disabled={loading}
            onClick={() => handleConnect("jira")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Redirecting..." : "Connect Now"}
          </button>
        </div>

        {/* Confluence */}
        <div className="bg-white shadow-lg p-6 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-3">Confluence</h2>
          <p className="text-gray-500 mb-5">Connect your Confluence Cloud account</p>
          <button
            disabled={loading}
            onClick={() => handleConnect("confluence")}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Redirecting..." : "Connect Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
