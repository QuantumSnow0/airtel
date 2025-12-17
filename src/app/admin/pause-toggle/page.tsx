"use client";

import { useState, useEffect } from "react";

interface PausedLead {
  id: string;
  customer_name: string;
  airtel_number: string;
  email: string;
  installation_town: string;
  preferred_package: string;
  created_at: string;
  submission_status: string;
}

export default function PauseTogglePage() {
  const [isPaused, setIsPaused] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [pausedLeads, setPausedLeads] = useState<PausedLead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [transferring, setTransferring] = useState(false);

  // Fetch current status on mount
  useEffect(() => {
    fetchStatus();
    fetchPausedLeads();
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

  const fetchPausedLeads = async () => {
    try {
      setLoadingLeads(true);
      const response = await fetch("/api/paused-leads");
      const data = await response.json();

      if (response.ok) {
        setPausedLeads(data.leads || []);
      } else {
        setMessage(`Error loading leads: ${data.error || "Failed to fetch"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoadingLeads(false);
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
        setTimeout(() => setMessage(""), 3000);
        // Refresh leads if resuming
        if (!newStatus) {
          fetchPausedLeads();
        }
      } else {
        setMessage(`Error: ${data.error || "Failed to update status"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setUpdating(false);
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    if (selectedIds.size === pausedLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(pausedLeads.map((lead) => lead.id)));
    }
  };

  const transferLeads = async (leadIds?: string[]) => {
    const idsToTransfer = leadIds || Array.from(selectedIds);
    
    if (idsToTransfer.length === 0) {
      setMessage("Please select at least one lead to transfer");
      return;
    }

    try {
      setTransferring(true);
      setMessage("");

      const response = await fetch("/api/paused-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadIds: idsToTransfer }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          `✅ ${data.message} (Transferred: ${data.transferred}, Skipped: ${data.skipped})`
        );
        setSelectedIds(new Set());
        setTimeout(() => {
          setMessage("");
          fetchPausedLeads();
        }, 2000);
      } else {
        setMessage(`Error: ${data.error || "Failed to transfer leads"}`);
      }
    } catch (error) {
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setTransferring(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Admin - Pause Toggle</h1>

        {loading ? (
          <div className="text-center py-8">
            <p>Loading status...</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Current Status - Compact */}
            <div className="bg-neutral-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isPaused ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  />
                  <p className="text-sm sm:text-base">
                    {isPaused
                      ? "⏸️ PAUSED"
                      : "▶️ ACTIVE"}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => togglePause(true)}
                    disabled={isPaused === true || updating}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all ${
                      isPaused === true || updating
                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        : "bg-yellow-600 hover:bg-yellow-700 text-white"
                    }`}
                  >
                    {updating ? "..." : "⏸️ Pause"}
                  </button>
                  <button
                    onClick={() => togglePause(false)}
                    disabled={isPaused === false || updating}
                    className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all ${
                      isPaused === false || updating
                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {updating ? "..." : "▶️ Resume"}
                  </button>
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.includes("Error")
                    ? "bg-red-900/50 text-red-200"
                    : message.includes("✅")
                    ? "bg-green-900/50 text-green-200"
                    : "bg-blue-900/50 text-blue-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Paused Leads Section */}
            <div className="bg-neutral-800 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Paused Leads ({pausedLeads.length})
                </h2>
                <button
                  onClick={fetchPausedLeads}
                  disabled={loadingLeads}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded bg-neutral-700 hover:bg-neutral-600 transition-all disabled:opacity-50"
                >
                  {loadingLeads ? "Loading..." : "🔄 Refresh"}
                </button>
              </div>

              {loadingLeads ? (
                <div className="text-center py-8 text-sm">Loading leads...</div>
              ) : pausedLeads.length === 0 ? (
                <div className="text-center py-8 text-sm text-neutral-400">
                  No paused leads found
                </div>
              ) : (
                <>
                  {/* Selection Controls */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-700 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === pausedLeads.length && pausedLeads.length > 0}
                        onChange={selectAll}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-xs sm:text-sm">
                        {selectedIds.size > 0
                          ? `${selectedIds.size} selected`
                          : "Select all"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => transferLeads()}
                        disabled={selectedIds.size === 0 || transferring}
                        className="px-3 py-1.5 text-xs sm:text-sm rounded bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {transferring ? "..." : `Transfer Selected (${selectedIds.size})`}
                      </button>
                      <button
                        onClick={() => transferLeads(pausedLeads.map((l) => l.id))}
                        disabled={transferring || pausedLeads.length === 0}
                        className="px-3 py-1.5 text-xs sm:text-sm rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      >
                        {transferring ? "..." : "Transfer All"}
                      </button>
                    </div>
                  </div>

                  {/* Leads List - Mobile Optimized */}
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {pausedLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-neutral-700/50 rounded-lg p-3 hover:bg-neutral-700 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(lead.id)}
                            onChange={() => toggleSelect(lead.id)}
                            className="mt-1 w-4 h-4 rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm sm:text-base truncate">
                                {lead.customer_name}
                              </p>
                              <span
                                className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                                  lead.submission_status === "submitted"
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-yellow-900/50 text-yellow-300"
                                }`}
                              >
                                {lead.submission_status}
                              </span>
                            </div>
                            <div className="space-y-1 text-xs sm:text-sm text-neutral-300">
                              <p className="truncate">
                                📞 {lead.airtel_number}
                              </p>
                              {lead.email && (
                                <p className="truncate">✉️ {lead.email}</p>
                              )}
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="truncate">
                                  📍 {lead.installation_town}
                                </span>
                                <span className="text-neutral-400">•</span>
                                <span className="truncate">
                                  📦 {lead.preferred_package}
                                </span>
                              </div>
                              <p className="text-neutral-400 text-xs">
                                {formatDate(lead.created_at)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
