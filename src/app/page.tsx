"use client";

import { useMemo, useState, useRef, useEffect } from "react";

type CustomerFormState = {
  customerName: string;
  airtelNumber: string;
  alternateNumber: string;
  email: string;
  preferredPackage: string;
  installationTown: string;
  deliveryLandmark: string;
  visitDate: string;
  visitTime: string;
};

const initialCustomerState: CustomerFormState = {
  customerName: "",
  airtelNumber: "",
  alternateNumber: "",
  email: "",
  preferredPackage: "",
  installationTown: "",
  deliveryLandmark: "",
  visitDate: "",
  visitTime: "",
};

const internalDefaults = {
  agentType: "Enterprise",
  enterpriseCP: "WAM APPLICATIONS",
  agentName: "samson karau maingi",
  agentMobile: "0789457580",
  leadType: "Confirmed",
  connectionType: "SmartConnect (5G ODU)",
};

const packageOptions = [
  "5G_15Mbps_30days at Ksh.2999",
  "5G_30Mbps_30days at Ksh.3999",
];

const townOptions = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];

const visitSlots = ["09:00", "11:00", "13:00", "15:00", "17:00"];

type SubmitStatus =
  | { state: "idle" }
  | { state: "preview"; payload: unknown }
  | { state: "error"; message: string };

export default function Home() {
  const [formState, setFormState] =
    useState<CustomerFormState>(initialCustomerState);
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [townSearch, setTownSearch] = useState("");
  const [showTownDropdown, setShowTownDropdown] = useState(false);
  const townInputRef = useRef<HTMLInputElement>(null);
  const townDropdownRef = useRef<HTMLDivElement>(null);

  const filteredTowns = useMemo(() => {
    if (!townSearch.trim()) return townOptions;
    return townOptions.filter((town) =>
      town.toLowerCase().includes(townSearch.toLowerCase())
    );
  }, [townSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        townDropdownRef.current &&
        !townDropdownRef.current.contains(event.target as Node) &&
        townInputRef.current &&
        !townInputRef.current.contains(event.target as Node)
      ) {
        setShowTownDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFormValid = useMemo(() => {
    return (
      formState.customerName.trim() !== "" &&
      /^\d{9,12}$/.test(formState.airtelNumber.replace(/\D/g, "")) &&
      /^\d{9,12}$/.test(formState.alternateNumber.replace(/\D/g, "")) &&
      /\S+@\S+\.\S+/.test(formState.email) &&
      formState.preferredPackage !== "" &&
      formState.installationTown !== "" &&
      formState.deliveryLandmark.trim() !== "" &&
      formState.visitDate !== "" &&
      formState.visitTime !== ""
    );
  }, [formState]);

  const handleChange = (field: keyof CustomerFormState) => {
    return (value: string) =>
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      setStatus({
        state: "error",
        message: "Kindly complete all required fields before submitting.",
      });
      return;
    }

    const answers = [
      {
        questionId: "r0feee2e2bc7c44fb9af400709e7e6276",
        answer1: internalDefaults.agentType,
      },
      {
        questionId: "r52e9f6e788444e2a96d9e30de5d635d8",
        answer1: internalDefaults.enterpriseCP,
      },
      {
        questionId: "rcf88d2d33e8c4ed4b33ccc91fec1d771",
        answer1: internalDefaults.agentName,
      },
      {
        questionId: "r2855e7f8fcfb44c98a2c5797e8e9b087",
        answer1: `254${internalDefaults.agentMobile.replace(/^0/, "")}`,
      },
      {
        questionId: "rd897bb0eb8344bafaaf8db07a535a049",
        answer1: internalDefaults.leadType,
      },
      {
        questionId: "r4ceb180775c04d5a92a39fd687573090",
        answer1: internalDefaults.connectionType,
      },
      {
        questionId: "r3af4eebb47ff46b78eb4118311884f53",
        answer1: formState.customerName,
      },
      {
        questionId: "r8b0d2eb8e038433f8ce4888e07bed122",
        answer1: formState.airtelNumber,
      },
      {
        questionId: "r401284e3fee94602a39ed9a0a14890ea",
        answer1: formState.alternateNumber,
      },
      {
        questionId: "r5dbc62a93dc64f3d84a2442f5ea4a856",
        answer1: formState.email,
      },
      {
        questionId: "r819c212e954f4367acaba71082424415",
        answer1: formState.preferredPackage,
      },
      {
        questionId: "rc89257414e57426dac9a183c60a4b556",
        answer1: formState.installationTown,
      },
      {
        questionId: "r7a69684d43ec4bf1b6971b21a8b4dd18",
        answer1: formState.deliveryLandmark,
      },
      {
        questionId: "r68b858271107400189b8d681d1b19c38",
        answer1: formState.visitDate,
      },
      {
        questionId: "rae98a58cb06949c1a3222443368aa64e",
        answer1: formState.visitTime,
      },
    ];

    const payload = {
      startDate: new Date().toISOString(),
      submitDate: new Date().toISOString(),
      answers: JSON.stringify(answers),
    };

    // For now we only preview what will be sent.
    setStatus({ state: "preview", payload });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-slate-100 py-10">
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl backdrop-blur md:grid-cols-[2fr,1fr]">
        <section>
          <header className="mb-8 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              SmartConnect | Airtel Kenya
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Work Order Details
            </h1>
            <p className="text-base text-slate-500">
              Capture the customer&apos;s preferred package and installation
              schedule. Internal agent data is auto-filled for every submission.
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormGroup
              label="Customer Name"
              required
              helper="Enter first and last name"
            >
              <input
                type="text"
                className="input"
                value={formState.customerName}
                onChange={(event) =>
                  handleChange("customerName")(event.target.value)
                }
                placeholder="e.g. Jane Kamau"
              />
            </FormGroup>

            <div className="grid gap-6 md:grid-cols-2">
              <FormGroup
                label="Customer Phone (Airtel)"
                required
                helper="Format: 2547XXXXXXXX"
              >
                <input
                  type="tel"
                  className="input"
                  inputMode="numeric"
                  value={formState.airtelNumber}
                  onChange={(event) =>
                    handleChange("airtelNumber")(event.target.value)
                  }
                  placeholder="2547XXXXXXX"
                />
              </FormGroup>

              <FormGroup
                label="Alternative Number"
                required
                helper="Another reachable contact"
              >
                <input
                  type="tel"
                  className="input"
                  inputMode="numeric"
                  value={formState.alternateNumber}
                  onChange={(event) =>
                    handleChange("alternateNumber")(event.target.value)
                  }
                  placeholder="2547XXXXXXX"
                />
              </FormGroup>
            </div>

            <FormGroup label="Customer Email Address" required>
              <input
                type="email"
                className="input"
                value={formState.email}
                onChange={(event) => handleChange("email")(event.target.value)}
                placeholder="customer@email.com"
              />
            </FormGroup>

            <FormGroup label="Preferred Package" required>
              <div className="grid gap-4 md:grid-cols-2">
                {packageOptions.map((option) => {
                  const isSelected = formState.preferredPackage === option;
                  const [speed, price] = option.split(" at ");
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleChange("preferredPackage")(option)}
                      className={`group relative rounded-2xl border-2 p-5 text-left transition-all ${
                        isSelected
                          ? "border-rose-500 bg-rose-50 shadow-lg shadow-rose-200/50"
                          : "border-slate-200 bg-white/70 hover:border-rose-300 hover:bg-rose-50/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      )}
                      <div className="pr-8">
                        <p className="text-lg font-semibold text-slate-900">
                          {speed}
                        </p>
                        <p className="mt-1 text-sm font-medium text-rose-600">
                          {price}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </FormGroup>

            <FormGroup label="Installation Town" required>
              <div className="relative">
                <input
                  ref={townInputRef}
                  type="text"
                  className="input"
                  value={townSearch || formState.installationTown}
                  onChange={(event) => {
                    const value = event.target.value;
                    setTownSearch(value);
                    setShowTownDropdown(true);
                    if (townOptions.includes(value)) {
                      handleChange("installationTown")(value);
                      setTownSearch("");
                      setShowTownDropdown(false);
                      townInputRef.current?.blur();
                    } else {
                      handleChange("installationTown")("");
                    }
                  }}
                  onFocus={() => {
                    if (formState.installationTown) {
                      handleChange("installationTown")("");
                      setTownSearch("");
                    }
                    setShowTownDropdown(true);
                  }}
                  placeholder="Search or select a county..."
                />
                {showTownDropdown &&
                  !formState.installationTown &&
                  filteredTowns.length > 0 && (
                    <div
                      ref={townDropdownRef}
                      className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
                    >
                      {filteredTowns.map((town) => (
                        <button
                          key={town}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleChange("installationTown")(town);
                            setTownSearch("");
                            setShowTownDropdown(false);
                            setTimeout(() => {
                              townInputRef.current?.blur();
                            }, 0);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-slate-700 transition-colors hover:bg-rose-50 hover:text-rose-900"
                        >
                          {town}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
            </FormGroup>

            <FormGroup
              label="Specific Delivery Location (Nearest Landmark)"
              required
              helper="Provide estate, building or street information"
            >
              <textarea
                rows={3}
                className="input"
                value={formState.deliveryLandmark}
                onChange={(event) =>
                  handleChange("deliveryLandmark")(event.target.value)
                }
                placeholder="e.g. Uthiru, opposite XYZ Apartments"
              />
            </FormGroup>

            <div className="grid gap-6 md:grid-cols-2">
              <FormGroup label="Preferred Visit Date" required>
                <input
                  type="date"
                  className="input"
                  value={formState.visitDate}
                  onChange={(event) =>
                    handleChange("visitDate")(event.target.value)
                  }
                />
              </FormGroup>

              <FormGroup label="Preferred Visit Time" required>
                <button
                  type="button"
                  onClick={() => setShowTimeModal(true)}
                  className={`input flex items-center justify-between text-left ${
                    formState.visitTime ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  <span>{formState.visitTime || "Choose a time slot"}</span>
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </FormGroup>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {status.state === "error" && (
                <p className="text-sm font-medium text-rose-600">
                  {status.message}
                </p>
              )}
              {status.state === "preview" && (
                <p className="text-sm font-medium text-emerald-600">
                  Preview generated — check the payload summary on the right.
                </p>
              )}
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-rose-600/30 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:bg-rose-200"
                disabled={!isFormValid}
              >
                Preview Submission
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-rose-400">
              Auto-filled
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-rose-900">
              Agent context
            </h2>
            <p className="text-sm text-rose-500">
              These values accompany every submission and stay hidden from
              customers.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-rose-900">
            <InternalItem
              label="Agent Type"
              value={internalDefaults.agentType}
            />
            <InternalItem
              label="Enterprise CP"
              value={internalDefaults.enterpriseCP}
            />
            <InternalItem
              label="Agent Name"
              value={internalDefaults.agentName}
            />
            <InternalItem
              label="Agent Mobile"
              value={internalDefaults.agentMobile}
            />
            <InternalItem
              label="Type of Lead"
              value={internalDefaults.leadType}
            />
            <InternalItem
              label="Type of Connection"
              value={internalDefaults.connectionType}
            />
          </ul>

          <div className="rounded-xl bg-white/70 p-4 text-sm shadow-inner">
            <p className="font-semibold text-slate-900">Payload preview</p>
            {status.state === "preview" ? (
              <pre className="mt-3 max-h-64 overflow-x-auto rounded-lg bg-slate-900/90 p-3 text-xs text-slate-100">
                {JSON.stringify(status.payload, null, 2)}
              </pre>
            ) : (
              <p className="mt-3 text-slate-500">
                Fill in the form to preview the exact JSON we will forward to
                Microsoft Forms and Supabase.
              </p>
            )}
          </div>
        </aside>
      </main>

      {/* Time Picker Modal */}
      {showTimeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowTimeModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-slate-900">
                Select Visit Time
              </h3>
              <button
                type="button"
                onClick={() => setShowTimeModal(false)}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {visitSlots.map((slot) => {
                const isSelected = formState.visitTime === slot;
                const [hours, minutes] = slot.split(":");
                const time12h =
                  parseInt(hours) > 12
                    ? `${parseInt(hours) - 12}:${minutes} PM`
                    : `${parseInt(hours)}:${minutes} AM`;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      handleChange("visitTime")(slot);
                      setShowTimeModal(false);
                    }}
                    className={`rounded-2xl border-2 p-6 text-center transition-all ${
                      isSelected
                        ? "border-rose-500 bg-rose-50 shadow-lg shadow-rose-200/50"
                        : "border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/50"
                    }`}
                  >
                    <div className="text-2xl font-bold text-slate-900">
                      {time12h}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{slot}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type FormGroupProps = {
  label: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormGroup({ label, helper, required, children }: FormGroupProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
      <span className="flex items-center justify-between text-base font-semibold text-slate-900">
        {label}
        {required && (
          <span className="text-xs font-medium uppercase tracking-wide text-rose-500">
            Required
          </span>
        )}
      </span>
      {helper && <span className="text-xs text-slate-500">{helper}</span>}
      {children}
    </label>
  );
}

type InternalItemProps = {
  label: string;
  value: string;
};

function InternalItem({ label, value }: InternalItemProps) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.2em] text-rose-400">
        {label}
      </span>
      <span className="font-semibold text-rose-900">{value}</span>
    </li>
  );
}
