"use client";

import { useState, useEffect } from "react";

export default function PauseTogglePage() {
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string>("");

  // Fetch current status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/pause-toggle");
      const data = await response.json();

      if (response.ok) {
        setIsPaused(data.is_paused);
      } else {
        setMessage(`Error: ${data.error || "Failed to fetch status"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const togglePause = async (newStatus: boolean) => {
    try {
      setUpdating(true);
      setMessage("");

      const response = await fetch("/api/pause-toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_paused: newStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsPaused(data.is_paused);
        setMessage(data.message || "Status updated successfully");
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(`Error: ${data.error || "Failed to update status"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin - Pause Toggle</h1>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading status...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Current Status</h2>
              <div className="flex items-center gap-4">
                <div
                  className={`w-4 h-4 rounded-full ${
                    isPaused ? "bg-yellow-500" : "bg-green-500"
                  }`}
                />
                <p className="text-lg">
                  {isPaused
                    ? "⏸️ PAUSED - Submissions going to leads_paused"
                    : "▶️ ACTIVE - Submissions going to leads"}
                </p>
              </div>
            </div>

            {/* Toggle Buttons */}
            <div className="bg-neutral-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => togglePause(true)}
                  disabled={isPaused === true || updating}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isPaused === true || updating
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-yellow-600 hover:bg-yellow-700 text-white"
                  }`}
                >
                  {updating ? "Updating..." : "⏸️ Enable Pause"}
                </button>
                <button
                  onClick={() => togglePause(false)}
                  disabled={isPaused === false || updating}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isPaused === false || updating
                      ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {updating ? "Updating..." : "▶️ Resume"}
                </button>
                <button
                  onClick={fetchStatus}
                  disabled={updating}
                  className="px-6 py-3 rounded-lg font-semibold bg-neutral-700 hover:bg-neutral-600 text-white transition-all disabled:opacity-50"
                >
                  🔄 Refresh
                </button>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.includes("Error")
                    ? "bg-red-900/50 text-red-200"
                    : "bg-green-900/50 text-green-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
              <h3 className="font-semibold mb-2">ℹ️ How it works:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-300">
                <li>
                  <strong>Paused:</strong> New submissions save to{" "}
                  <code className="bg-neutral-800 px-2 py-1 rounded">leads_paused</code>{" "}
                  (admin dashboard won't see them)
                </li>
                <li>
                  <strong>Active:</strong> New submissions save to{" "}
                  <code className="bg-neutral-800 px-2 py-1 rounded">leads</code>{" "}
                  (admin dashboard will see them)
                </li>
                <li>MS Forms submissions continue to work in both modes</li>
                <li>
                  To migrate paused data back, run SQL:{" "}
                  <code className="bg-neutral-800 px-2 py-1 rounded text-xs">
                    INSERT INTO leads SELECT * FROM leads_paused WHERE id NOT IN (SELECT id FROM
                    leads);
                  </code>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

