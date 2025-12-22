"use client";

import { useState, useEffect } from "react";

interface ResubmitLead {
  id: string;
  customer_name: string;
  airtel_number: string;
  alternate_number: string;
  email: string;
  preferred_package: string;
  installation_town: string;
  delivery_landmark: string;
  visit_date: string;
  visit_time: string;
  created_at: string;
  submission_status?: string;
  resubmit_count?: number | null;
  last_resubmitted_at?: string | null;
}

export default function ResubmitPage() {
  const [leads, setLeads] = useState<ResubmitLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [resubmitting, setResubmitting] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setMessage("");
      const response = await fetch("/api/resubmit-leads");
      const data = await response.json();

      if (response.ok) {
        setLeads(data.leads || []);
        if (data.count === 0) {
          setMessage("No leads found in resubmit queue");
          setMessageType("info");
        }
      } else {
        setMessage(`Error: ${data.error || "Failed to fetch leads"}`);
        setMessageType("error");
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResubmit = async (leadId: string) => {
    // Confirmation dialog
    if (
      !confirm(
        "Are you sure you want to resubmit this lead? This will submit it to Microsoft Forms and add it to the leads table."
      )
    ) {
      return;
    }

    try {
      setResubmitting((prev) => new Set(prev).add(leadId));
      setMessage("");

      const response = await fetch("/api/resubmit-leads/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadId }),
      });

      const data = await response.json();

      if (response.ok) {
        const countText =
          data.resubmitCount > 0
            ? ` (Resubmitted ${data.resubmitCount} time${data.resubmitCount > 1 ? "s" : ""})`
            : "";
        setMessage(
          `✅ Successfully resubmitted!${countText} MS Forms ID: ${data.msFormsResponseId || "N/A"}. Lead ID: ${data.leadId}`
        );
        setMessageType("success");
        // Refresh the list after a short delay
        setTimeout(() => {
          fetchLeads();
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to resubmit lead"}`);
        setMessageType("error");
        if (data.details) {
          console.error("Resubmit error details:", data.details);
        }
      }
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setMessageType("error");
    } finally {
      setResubmitting((prev) => {
        const next = new Set(prev);
        next.delete(leadId);
        return next;
      });
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage("");
      }, 5000);
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

  const formatDateOnly = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Admin - Resubmit Leads
          </h1>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-neutral-700 hover:bg-neutral-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Refresh
              </>
            )}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg text-sm ${
              messageType === "error"
                ? "bg-red-900/50 text-red-200 border border-red-700"
                : messageType === "success"
                ? "bg-green-900/50 text-green-200 border border-green-700"
                : "bg-blue-900/50 text-blue-200 border border-blue-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="bg-neutral-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <p className="text-neutral-400 text-sm">Total Leads</p>
              <p className="text-2xl font-bold">{leads.length}</p>
            </div>
            <div>
              <p className="text-neutral-400 text-sm">Pending Resubmission</p>
              <p className="text-2xl font-bold text-yellow-400">
                {leads.filter((l) => !resubmitting.has(l.id)).length}
              </p>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-neutral-800 rounded-lg p-8 text-center">
            <p className="text-neutral-400 text-lg">
              No leads found in resubmit queue
            </p>
            <p className="text-neutral-500 text-sm mt-2">
              All leads have been resubmitted, or the queue is empty.
            </p>
          </div>
        ) : (
          <div className="bg-neutral-800 rounded-lg overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Visit Date/Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Resubmits
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-neutral-700/30 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-semibold">{lead.customer_name}</div>
                        <div className="text-xs text-neutral-400 mt-1">
                          {lead.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">📞 {lead.airtel_number}</div>
                        {lead.alternate_number && (
                          <div className="text-xs text-neutral-400 mt-1">
                            📱 {lead.alternate_number}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm">{lead.preferred_package}</span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          📍 {lead.installation_town}
                        </div>
                        {lead.delivery_landmark && (
                          <div className="text-xs text-neutral-400 mt-1">
                            {lead.delivery_landmark}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          📅 {formatDateOnly(lead.visit_date)}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          🕐 {lead.visit_time}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-xs text-neutral-400">
                          {formatDate(lead.created_at)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {(lead.resubmit_count || 0) > 0 ? (
                            <>
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  (lead.resubmit_count || 0) === 1
                                    ? "bg-blue-900/50 text-blue-300"
                                    : (lead.resubmit_count || 0) === 2
                                    ? "bg-yellow-900/50 text-yellow-300"
                                    : "bg-orange-900/50 text-orange-300"
                                }`}
                              >
                                {lead.resubmit_count}x
                              </span>
                              {lead.last_resubmitted_at && (
                                <span className="text-xs text-neutral-500">
                                  {formatDate(lead.last_resubmitted_at)}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-xs text-neutral-500">0</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleResubmit(lead.id)}
                          disabled={resubmitting.has(lead.id)}
                          className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all ${
                            resubmitting.has(lead.id)
                              ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          {resubmitting.has(lead.id) ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Resubmitting...
                            </span>
                          ) : (
                            "Resubmit"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3 p-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-neutral-700/50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {lead.customer_name}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {lead.email}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-neutral-400">Phone: </span>
                      <span>{lead.airtel_number}</span>
                    </div>
                    {lead.alternate_number && (
                      <div>
                        <span className="text-neutral-400">Alt: </span>
                        <span>{lead.alternate_number}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-neutral-400">Package: </span>
                      <span>{lead.preferred_package}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Location: </span>
                      <span>
                        {lead.installation_town}
                        {lead.delivery_landmark &&
                          ` - ${lead.delivery_landmark}`}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Visit: </span>
                      <span>
                        {formatDateOnly(lead.visit_date)} at {lead.visit_time}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Created: </span>
                      <span className="text-xs">{formatDate(lead.created_at)}</span>
                    </div>
                    {(lead.resubmit_count || 0) > 0 && (
                      <div>
                        <span className="text-neutral-400">Resubmitted: </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            (lead.resubmit_count || 0) === 1
                              ? "bg-blue-900/50 text-blue-300"
                              : (lead.resubmit_count || 0) === 2
                              ? "bg-yellow-900/50 text-yellow-300"
                              : "bg-orange-900/50 text-orange-300"
                          }`}
                        >
                          {lead.resubmit_count} time
                          {(lead.resubmit_count || 0) > 1 ? "s" : ""}
                        </span>
                        {lead.last_resubmitted_at && (
                          <span className="text-xs text-neutral-500 ml-2">
                            ({formatDate(lead.last_resubmitted_at)})
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleResubmit(lead.id)}
                    disabled={resubmitting.has(lead.id)}
                    className={`w-full px-4 py-2 text-sm rounded-lg font-semibold transition-all ${
                      resubmitting.has(lead.id)
                        ? "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {resubmitting.has(lead.id) ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Resubmitting...
                      </span>
                    ) : (
                      "Resubmit"
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

