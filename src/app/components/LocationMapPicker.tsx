"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Google Maps libraries
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

interface LocationMapPickerProps {
  locationMode: "current" | "different";
  onLocationSelect: (data: {
    town: string;
    landmark: string;
    installationLocation: string;
    isValid: boolean;
    error?: string;
  }) => void;
  townOptions: string[];
  onUseManualEntry: () => void;
  onError?: (message: string) => void;
  value?: string; // Current location value to display in input
  onBottomSheetChange?: (isOpen: boolean) => void; // Callback when bottom sheet opens/closes
  onLocationConfirmed?: (data: {
    town: string;
    landmark: string;
    installationLocation: string;
  }) => void; // Callback when user clicks "Done" to confirm location
}

export default function LocationMapPicker({
  locationMode,
  onLocationSelect,
  townOptions,
  onUseManualEntry,
  onError,
  value,
  onBottomSheetChange,
  onLocationConfirmed,
}: LocationMapPickerProps) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodedData, setGeocodedData] = useState<{
    town: string;
    landmark: string;
    fullAddress: string;
  } | null>(null);
  const [townValidationError, setTownValidationError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [locationDenied, setLocationDenied] = useState(false);
  const [showLocationInstructions, setShowLocationInstructions] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [sheetY, setSheetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [initialSheetY, setInitialSheetY] = useState(0);
  const locationRequestTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize geocoder when map is loaded
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      geocoderRef.current = new google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Center and zoom map when position is set
  useEffect(() => {
    if (position && mapRef.current) {
      mapRef.current.setCenter(position);
      mapRef.current.setZoom(17); // Zoom in closer when location is pinned
    }
  }, [position]);

  // Notify parent when bottom sheet opens/closes
  useEffect(() => {
    if (onBottomSheetChange) {
      onBottomSheetChange(showBottomSheet);
    }
  }, [showBottomSheet, onBottomSheetChange]);


  // Handle bottom sheet drag
  useEffect(() => {
    if (!showBottomSheet || !isDragging) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      // Calculate delta: positive when dragging down, negative when dragging up
      const deltaY = clientY - dragStartY;
      
      // Calculate new position
      // Positive Y moves sheet down (closes it), negative Y moves it up (expands it slightly)
      const newY = initialSheetY + deltaY;
      
      // Allow dragging up to -100px (slight expansion) and down to 70% of screen
      const maxUp = -100; // Allow slight upward expansion
      const maxDown = window.innerHeight * 0.7; // Can drag down to 70% of screen height
      
      // Constrain the Y position
      const constrainedY = Math.max(maxUp, Math.min(newY, maxDown));
      
      if (constrainedY >= maxDown) {
        // If dragged down too far, close the sheet
        setShowBottomSheet(false);
        setSheetY(0);
        setIsDragging(false);
        setInitialSheetY(0);
        return;
      }
      
      setSheetY(constrainedY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Snap logic: 
      // - If dragged down more than 150px, close it
      // - If dragged up (negative), snap back to 0
      // - Otherwise, snap back to fully open (0)
      if (sheetY > 150) {
        setShowBottomSheet(false);
        setSheetY(0);
        setInitialSheetY(0);
      } else {
        // Always snap back to fully open position
        setSheetY(0);
        setInitialSheetY(0);
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStartY, initialSheetY, sheetY, showBottomSheet]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setDragStartY(clientY);
    setInitialSheetY(sheetY || 0); // Store the current position when drag starts (default to 0)
  };

  // Check if device is mobile
  const isMobile = typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Check permission state before requesting (helps diagnose issues)
  const checkPermissionState = async (): Promise<string | null> => {
    if (typeof navigator !== "undefined" && "permissions" in navigator) {
      try {
        const result = await navigator.permissions.query({ name: "geolocation" as PermissionName });
        const state = result.state;
        console.log("Permission state:", state);
        
        // If already denied, show error immediately
        if (state === "denied") {
          setLocationDenied(true);
          if (isMobile) {
            const errorMsg = "Location permission is already blocked. To fix: 1) Go to your phone Settings → Apps → [Your Browser] → Permissions → Location → Allow, 2) Or clear browser data for this site, 3) Then refresh this page and try again.";
            setError(errorMsg);
            if (onError) {
              onError("I couldn't access your location. Please enable location permission in your phone settings and try again, or you can fill in your location manually.");
            }
          } else {
            const errorMsg = "Location permission is already blocked. Please enable it in your browser settings.";
            setError(errorMsg);
            if (onError) {
              onError("I need permission to access your location. Please allow location access in your browser settings, or you can fill in your location manually.");
            }
          }
          setIsLoading(false);
          return "denied";
        }
        
        return state;
      } catch (e) {
        console.log("Permission API not supported or error:", e);
        return null;
      }
    }
    return null;
  };

  // Function to get user's current location
  const getCurrentLocation = useCallback(async (useHighAccuracy: boolean = true) => {
    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by your browser";
      setError(errorMsg);
      setIsLoading(false);
      setLocationDenied(false);
      if (onError) {
        onError("Your browser doesn't support location access. Please use manual entry to select your location.");
      }
      return;
    }

    // Check permission state first (for debugging)
    const permissionState = await checkPermissionState();
    console.log("Current permission state:", permissionState);
    console.log("🔍 Requesting location...", {
      useHighAccuracy,
      isMobile,
      timestamp: new Date().toISOString(),
    });
    
    // If already denied, don't proceed
    if (permissionState === "denied") {
      return; // Error already set in checkPermissionState
    }
    
    // Check if HTTPS/localhost (required for geolocation)
    if (typeof window !== "undefined") {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const isHTTPS = window.location.protocol === "https:";
      const isIPAddress = /^\d+\.\d+\.\d+\.\d+/.test(window.location.hostname);
      
      // Geolocation requires HTTPS or localhost (IP addresses on HTTP are blocked)
      if (!isLocalhost && !isHTTPS) {
        setIsLoading(false);
        setLocationDenied(true);
        if (isIPAddress) {
          const errorMsg = "Location access is blocked on IP addresses (like 192.x.x.x) for security. Please use 'localhost' instead, or deploy with HTTPS. For development: use 'http://localhost:3000' instead of the IP address.";
          setError(errorMsg);
        if (onError) {
          onError("Location access is blocked. Please use localhost or HTTPS to access your location, or you can fill in your location manually.");
        }
        } else {
          const errorMsg = "Location access requires HTTPS. Please access this site via HTTPS (https://) instead of HTTP.";
          setError(errorMsg);
          if (onError) {
            onError("Location access requires a secure connection. Please use HTTPS to access your location, or you can fill in your location manually.");
          }
        }
        return;
      }
    }

    setIsLoading(true);
    setError(null);
    setLocationDenied(false);
    setShowLocationInstructions(false);

    // Clear any existing timeout
    if (locationRequestTimeoutRef.current) {
      clearTimeout(locationRequestTimeoutRef.current);
    }

    // Longer timeout for mobile devices
    const timeoutDuration = isMobile ? 20000 : 15000;

    // Set a timeout to prevent infinite loading
    locationRequestTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      if (isMobile) {
        const errorMsg = "Location request is taking too long. On mobile, please check: 1) Your phone's location is turned on, 2) Browser has location permission, 3) Try again or use manual entry.";
        setError(errorMsg);
        if (onError) {
          onError("Location request is taking too long. Please make sure your phone's GPS is turned on and try again, or you can fill in your location manually.");
        }
      } else {
        const errorMsg = "Location request is taking too long. Please check your browser permissions or try again.";
        setError(errorMsg);
        if (onError) {
          onError("Location request is taking too long. Please check your browser permissions or try again. You can also fill in your location manually.");
        }
      }
      setLocationDenied(true);
      locationRequestTimeoutRef.current = null;
    }, timeoutDuration);

    // For mobile, use watchPosition first to trigger permission, then getCurrentPosition
    // This sometimes works better on mobile browsers
    // Increased timeout for desktop - GPS can take time to get a fix
    const geolocationOptions = {
      enableHighAccuracy: useHighAccuracy,
      timeout: isMobile ? 20000 : 30000, // Increased desktop timeout to 30s
      maximumAge: 60000, // Allow cached position up to 1 minute old (faster)
    };

    navigator.geolocation.getCurrentPosition(
      (geoPosition) => {
        if (locationRequestTimeoutRef.current) {
          clearTimeout(locationRequestTimeoutRef.current);
          locationRequestTimeoutRef.current = null;
        }
        const { latitude, longitude } = geoPosition.coords;
        const newPosition = { lat: latitude, lng: longitude };
        console.log("📍 Location detected:", {
          latitude,
          longitude,
          accuracy: geoPosition.coords.accuracy,
          timestamp: new Date().toISOString(),
        });
        setPosition(newPosition);
        setIsLoading(false);
        setError(null);
        setLocationDenied(false);
        // Keep bottom sheet open to show success
        // Automatically geocode the initial location
        reverseGeocode(newPosition);
      },
      (geoError) => {
        if (locationRequestTimeoutRef.current) {
          clearTimeout(locationRequestTimeoutRef.current);
          locationRequestTimeoutRef.current = null;
        }
        console.error("Geolocation error:", geoError);
        console.error("Error code:", geoError.code);
        console.error("Error message:", geoError.message);
        console.error("Is mobile:", isMobile);
        setIsLoading(false);
        
        // Check the error code
        let errorMessage = "";
        let robotMessage = "";
        
        if (geoError.code === 1) {
          // PERMISSION_DENIED - Show error with instructions
          setLocationDenied(true);
          if (isMobile) {
            // Check if permission was already denied (didn't show dialog)
            const wasAlreadyDenied = permissionState === "denied";
            if (wasAlreadyDenied) {
              errorMessage = "Location permission is already blocked for this site. To fix: 1) Go to phone Settings → Apps → [Your Browser] → Permissions → Location → Allow, 2) Or in browser: Settings → Site Settings → Location → Allow, 3) Clear browser data for this site if needed, 4) Refresh page and try again.";
              robotMessage = "I couldn't access your location. Please enable location permission in your phone settings and try again.";
            } else {
              errorMessage = "Location access was denied without showing permission dialog. This means permission is blocked. To fix: 1) Go to phone Settings → Apps → [Your Browser] → Permissions → Location → Allow, 2) Or in browser: tap the lock/info icon → Site Settings → Location → Allow, 3) Refresh page and try again.";
              robotMessage = "Location permission was denied. Please enable it in your phone settings and try again.";
            }
          } else {
            errorMessage = "Location access was denied. The browser permission dialog should have appeared. Please check your browser settings or click 'Try Again' to request permission again.";
            robotMessage = "I need permission to access your location. Please allow location access in your browser settings.";
          }
        } else if (geoError.code === 2) {
          // POSITION_UNAVAILABLE - Often means location services are disabled at system level
          setLocationDenied(true);
          if (isMobile) {
            errorMessage = "Location information is unavailable. This usually means your phone's Location/GPS is turned OFF at the system level. Please go to your phone's Settings → Location and turn it ON, then try again.";
            robotMessage = "I can't find your location. Please turn on GPS in your phone settings first, then try again. Or you can fill in your location manually.";
          } else {
            errorMessage = "Location information is unavailable. Please try again or use manual entry.";
            robotMessage = "I couldn't determine your location. Please try again, or you can fill in your location manually.";
            setLocationDenied(false);
          }
        } else if (geoError.code === 3) {
          // TIMEOUT - Could mean GPS is off, location services disabled, or taking too long
          // On desktop, try retrying with lower accuracy if high accuracy was used
          if (!isMobile && useHighAccuracy) {
            console.log("⏱️ High accuracy timeout, retrying with lower accuracy...");
            // Retry with lower accuracy (faster, uses network location)
            setTimeout(() => {
              getCurrentLocation(false);
            }, 500);
            return; // Don't set error yet, let retry happen
          }
          
          setLocationDenied(true);
          if (isMobile) {
            errorMessage = "Location request timed out. On mobile, this usually means: 1) Your phone's Location/GPS is OFF (check phone Settings → Location), 2) Location permission is blocked, or 3) GPS signal is weak. Please enable location in your phone settings first.";
            robotMessage = "Location request is taking too long. Please make sure your phone's GPS is turned on and try again. Or you can fill in your location manually.";
          } else {
            errorMessage = "Location request timed out. This can happen if: 1) GPS is taking too long to get a fix, 2) Location services are disabled, or 3) Network location is unavailable. Try clicking 'Get My Location' again, or use manual entry to select your location on the map.";
            robotMessage = "Location request timed out. Please try again, or you can fill in your location manually.";
            setLocationDenied(false);
          }
        } else {
          errorMessage = `Unable to access your location: ${geoError.message || "Unknown error"}. ${isMobile ? "Make sure your phone's location is enabled first." : "Please try again or use manual entry."}`;
          robotMessage = "I couldn't access your location. Please try again, or you can fill in your location manually.";
          setLocationDenied(isMobile);
        }
        
        setError(errorMessage);
        if (onError && robotMessage) {
          onError(robotMessage);
        }
      },
      geolocationOptions
    );
  }, [isMobile, onError]);

  // Auto-trigger location when "current" mode is selected and bottom sheet opens
  useEffect(() => {
    if (showBottomSheet && locationMode === "current" && !position && !isLoading) {
      getCurrentLocation(true);
    }
  }, [showBottomSheet, locationMode, position, isLoading, getCurrentLocation]);

  // Don't auto-request location - let user click a button to trigger it
  // This ensures browser permission dialog can appear properly

  // Reverse geocode coordinates to get address using Google Maps
  const reverseGeocode = async (location: { lat: number; lng: number }) => {
    if (!geocoderRef.current) {
      const errorMsg = "Geocoding service not available. Please try again.";
      setError(errorMsg);
        if (onError) {
          onError("I couldn't get the address details. Please try again, or you can fill in your location manually.");
        }
      return;
    }

    setIsGeocoding(true);
    setTownValidationError(null);
    setGeocodedData(null);

    try {
      geocoderRef.current.geocode(
        { location: location },
        (results, status) => {
          setIsGeocoding(false);

          if (status === "OK" && results && results.length > 0) {
            const result = results[0];
            const address = result.address_components || [];

            console.log("🗺️ Geocoding result:", {
              formatted_address: result.formatted_address,
              address_components: address.map((c: any) => ({
                types: c.types,
                long_name: c.long_name,
                short_name: c.short_name,
              })),
            });

            // Extract town/city from address components
            let town = "";
            const townTypes = ["locality", "administrative_area_level_2", "administrative_area_level_1"];

            for (const component of address) {
              if (component.types.some((type) => townTypes.includes(type))) {
                town = component.long_name;
                break;
              }
            }

            // Extract landmark/area from address components
            // Priority: premise > sublocality > neighborhood > route
            // This gives more specific landmarks (like building names) over just street names
            let landmark = "";
            let premise = "";
            let sublocality = "";
            let neighborhood = "";
            let route = "";

            for (const component of address) {
              if (component.types.includes("premise")) {
                premise = component.long_name;
              } else if (component.types.includes("sublocality") || component.types.includes("sublocality_level_1")) {
                sublocality = component.long_name;
              } else if (component.types.includes("neighborhood")) {
                neighborhood = component.long_name;
              } else if (component.types.includes("route")) {
                route = component.long_name;
              }
            }

            // Build landmark with priority: premise > sublocality > neighborhood > route
            // If we have premise, use it. Otherwise combine area + route for better context
            if (premise) {
              landmark = premise;
            } else if (sublocality) {
              landmark = sublocality + (route ? `, ${route}` : "");
            } else if (neighborhood) {
              landmark = neighborhood + (route ? `, ${route}` : "");
            } else if (route) {
              landmark = route;
            }

            // If still no landmark, use street address or formatted address
            if (!landmark && result.formatted_address) {
              const parts = result.formatted_address.split(",");
              if (parts.length > 0) {
                landmark = parts[0].trim();
              }
            }

            console.log("🔍 Landmark extraction details:", {
              premise,
              sublocality,
              neighborhood,
              route,
              final_landmark: landmark,
            });

            console.log("📍 Extracted location details:", {
              raw_town: town,
              raw_landmark: landmark,
              formatted_address: result.formatted_address,
            });

            // Normalize town name to match our list
            const normalizedTown = normalizeTownName(town, townOptions);

            console.log("✅ Town validation:", {
              raw_town: town,
              normalized_town: normalizedTown,
              is_valid: !!normalizedTown,
              available_towns: townOptions.slice(0, 5), // Show first 5 for reference
            });

            // Validate town
            if (!normalizedTown) {
              console.warn("❌ Town not in service area:", {
                detected_town: town,
                available_towns: townOptions,
              });
              const validationError = `Sorry, we don't currently serve ${town || "this location"}. Please contact us for availability in your area.`;
              setTownValidationError(validationError);
              if (onError) {
                onError(`Sorry, we don't currently serve ${town || "this location"}. Please contact us for availability in your area, or select a different location.`);
              }
              setGeocodedData({
                town: "",
                landmark: landmark || "",
                fullAddress: result.formatted_address || "",
              });
              onLocationSelect({
                town: "",
                landmark: landmark || "",
                installationLocation: landmark || "",
                isValid: false,
                error: `Location not in service area: ${town || "Unknown"}`,
              });
            } else {
              console.log("✅ Location validated successfully:", {
                normalized_town: normalizedTown,
                landmark: landmark || "",
                installation_location: landmark || "",
                full_address: result.formatted_address,
              });
              setTownValidationError(null);
              setGeocodedData({
                town: normalizedTown,
                landmark: landmark || "",
                fullAddress: result.formatted_address || "",
              });

              // Installation location should be just the landmark (API will combine with normalized town)
              const installationLocation = landmark || "";

              const locationData = {
                town: normalizedTown,
                landmark: landmark || "",
                installationLocation: installationLocation,
                isValid: true,
              };

              console.log("📤 Sending location data to form:", {
                town: locationData.town,
                landmark: locationData.landmark,
                installationLocation: locationData.installationLocation,
                isValid: locationData.isValid,
                note: "This data will be sent to Microsoft Forms API",
              });

              onLocationSelect(locationData);
            }
          } else {
            const errorMsg = "Failed to get address details. Please try again or use manual entry.";
            setError(errorMsg);
              if (onError) {
                onError("I couldn't get the address details. Please try again, or you can fill in your location manually.");
              }
            onLocationSelect({
              town: "",
              landmark: "",
              installationLocation: "",
              isValid: false,
              error: "Geocoding failed",
            });
          }
        }
      );
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setIsGeocoding(false);
      setError("Failed to get address details. Please try again or use manual entry.");
      onLocationSelect({
        town: "",
        landmark: "",
        installationLocation: "",
        isValid: false,
        error: "Geocoding failed",
      });
    }
  };

  // Normalize town name to match our list
  const normalizeTownName = (geocodedTown: string, validTowns: string[]): string => {
    if (!geocodedTown) return "";

    // Try exact match (case-insensitive)
    const exactMatch = validTowns.find(
      (town) => town.toLowerCase() === geocodedTown.toLowerCase()
    );
    if (exactMatch) return exactMatch;

    // Try match after removing spaces and case
    const normalizedGeocoded = geocodedTown.replace(/\s+/g, "").toLowerCase();
    const match = validTowns.find(
      (town) => town.replace(/\s+/g, "").toLowerCase() === normalizedGeocoded
    );
    if (match) return match;

    // Try partial match (contains)
    const partialMatch = validTowns.find((town) =>
      geocodedTown.toLowerCase().includes(town.toLowerCase())
    );
    if (partialMatch) return partialMatch;

    // Try reverse partial match
    const reverseMatch = validTowns.find((town) =>
      town.toLowerCase().includes(geocodedTown.toLowerCase())
    );
    if (reverseMatch) return reverseMatch;

    return "";
  };

  // Handle map click
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      console.log("📍 Map clicked at location:", {
        latitude: newPosition.lat,
        longitude: newPosition.lng,
        timestamp: new Date().toISOString(),
      });
      setPosition(newPosition);
      reverseGeocode(newPosition);
    }
  };

  // Handle marker drag end
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      console.log("📍 Marker dragged to new location:", {
        latitude: newPosition.lat,
        longitude: newPosition.lng,
        timestamp: new Date().toISOString(),
      });
      setPosition(newPosition);
      reverseGeocode(newPosition);
    }
  };

  // Map options
  const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#242424" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#242424" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
    ],
  };

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-neutral-900/90 rounded-lg border-2 border-neutral-800/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
          <p className={`text-sm text-neutral-400 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Loading map...
          </p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full">
        <div className="bg-rose-900/50 border border-rose-500/50 rounded-lg p-4 mb-4">
          <p className={`text-sm text-rose-200 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Failed to load Google Maps. Please check your API key configuration.
          </p>
        </div>
        <button
          onClick={onUseManualEntry}
          className={`w-full px-4 py-3 rounded-lg bg-neutral-800/50 border-2 border-neutral-700/50 text-white hover:bg-neutral-700/50 transition-colors ${poppins.variable}`}
          style={{ fontFamily: "var(--font-poppins), sans-serif" }}
        >
          Use Manual Entry Instead
        </button>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-neutral-900/90 rounded-lg border-2 border-neutral-800/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
          <p className={`text-sm text-neutral-400 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Loading Google Maps...
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-neutral-900/90 rounded-lg border-2 border-neutral-800/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
          <p className={`text-sm text-neutral-400 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
            Getting your location...
          </p>
        </div>
      </div>
    );
  }

  const defaultCenter = position || { lat: -1.2921, lng: 36.8219 }; // Nairobi center as fallback
  const mapZoom = position ? 17 : 13; // Zoom in closer when user location is pinned

  // Get display value for input
  const displayValue = geocodedData && !townValidationError
    ? `${geocodedData.town}${geocodedData.landmark ? ` - ${geocodedData.landmark}` : ""}`
    : value || "";

  return (
    <div className="w-full relative">
      {/* Location Input Field */}
      <div
        onClick={() => {
          setShowBottomSheet(true);
          setSheetY(0); // Reset position when opening
          setInitialSheetY(0);
        }}
        className="relative w-full"
      >
        <div className="relative">
          <input
            type="text"
            readOnly
            value={displayValue}
            placeholder="Tap to select location on map"
            className={`w-full px-4 py-3 pr-12 rounded-xl bg-neutral-800/50 border-2 border-neutral-700/50 text-white placeholder:text-neutral-500 focus:border-yellow-400/50 focus:outline-none transition-colors cursor-pointer ${poppins.variable}`}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowBottomSheet(false);
              setSheetY(0);
              setInitialSheetY(0);
            }}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: "100%" }}
            animate={{ 
              y: isDragging ? sheetY : 0,
              transition: isDragging ? { duration: 0 } : { type: "spring", damping: 30, stiffness: 300 }
            }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900 rounded-t-3xl shadow-2xl overflow-hidden"
            style={{ maxHeight: '90vh', height: 'auto' }}
          >
            {/* Drag Handle - Entire top section is draggable */}
            <div 
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              className="relative flex flex-col items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing select-none"
              style={{ touchAction: 'none' }}
            >
              <div className="w-12 h-1.5 bg-neutral-600 rounded-full" />
            </div>

            <div className="px-5 pb-5 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 4rem)' }}>
              {/* Loading State */}
              {isLoading && (
                <div className="py-8 text-center">
                  <div className="relative mx-auto mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-3 border-yellow-400/20 border-t-yellow-400"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-4 w-4 bg-yellow-400/30 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <p className={`text-sm text-neutral-300 font-medium ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                    Getting your location...
                  </p>
                </div>
              )}

              {/* Error State */}
              {error && !isLoading && (
                <div className="py-4 mb-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-base font-bold text-rose-50 mb-2 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                        Location Error
                      </h3>
                      <p className={`text-sm text-rose-100 leading-relaxed ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                        {error}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {locationDenied && (
                      <button
                        onClick={() => getCurrentLocation(true)}
                        className={`group w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-neutral-900 font-bold shadow-lg shadow-yellow-500/25 active:scale-[0.97] transition-all duration-200 ${poppins.variable}`}
                        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Try Again
                        </span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setShowBottomSheet(false);
                        setSheetY(0);
                        setInitialSheetY(0);
                        onUseManualEntry();
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-gradient-to-r from-neutral-800/50 to-neutral-700/40 border border-neutral-600/30 text-neutral-300 hover:from-neutral-700/50 hover:to-neutral-600/40 hover:text-white hover:border-neutral-500/40 transition-all duration-200 text-sm font-medium shadow-sm ${poppins.variable}`}
                      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                    >
                      Use Manual Entry
                    </button>
                  </div>
                </div>
              )}

              {/* Town Validation Error */}
              {townValidationError && !isLoading && (
                <div className="mb-4 bg-gradient-to-br from-rose-900/40 via-rose-800/30 to-rose-900/40 border border-rose-500/40 rounded-xl p-3.5 shadow-lg backdrop-blur-sm">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className={`text-xs text-rose-50 leading-relaxed font-medium ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                      {townValidationError}
                    </p>
                  </div>
                </div>
              )}

              {/* Success State */}
              {geocodedData && !townValidationError && !isLoading && !error && (
                <div className="mb-4 bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border border-emerald-500/40 rounded-xl p-3.5 shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className={`text-xs font-bold text-emerald-50 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                      Location Confirmed
                    </p>
                  </div>
                  <div className="space-y-2 pl-1 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs text-emerald-300/80 font-medium min-w-[40px] ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                        Town:
                      </span>
                      <span className={`text-xs text-emerald-50 font-semibold ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                        {geocodedData.town}
                      </span>
                    </div>
                    {geocodedData.landmark && (
                      <div className="flex items-center gap-2.5">
                        <span className={`text-xs text-emerald-300/80 font-medium min-w-[40px] ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                          Area:
                        </span>
                        <span className={`text-xs text-emerald-50 font-semibold ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                          {geocodedData.landmark}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      // Call confirmation callback before closing
                      if (onLocationConfirmed && geocodedData) {
                        onLocationConfirmed({
                          town: geocodedData.town,
                          landmark: geocodedData.landmark,
                          installationLocation: geocodedData.landmark,
                        });
                      }
                      setShowBottomSheet(false);
                      setSheetY(0);
                      setInitialSheetY(0);
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg active:scale-[0.97] transition-all duration-200 ${poppins.variable}`}
                    style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Map */}
              {!isLoading && (
                <>

                  <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-neutral-700/40 shadow-xl shadow-black/20 mb-4">
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={defaultCenter}
                      zoom={mapZoom}
                      options={mapOptions}
                      onLoad={(map) => {
                        mapRef.current = map;
                      }}
                      onClick={handleMapClick}
                    >
                      {position && (
                        <Marker
                          position={position}
                          draggable={true}
                          onDragEnd={handleMarkerDragEnd}
                          icon={{
                            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                            scaledSize: new google.maps.Size(48, 48),
                            anchor: new google.maps.Point(24, 48),
                          }}
                          animation={google.maps.Animation.DROP}
                        />
                      )}
                    </GoogleMap>
                  </div>

                  {isGeocoding && (
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-neutral-800/60 to-neutral-700/50 rounded-full border border-neutral-600/30 backdrop-blur-sm">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-yellow-400/20 border-t-yellow-400"></div>
                        </div>
                        <span className={`text-xs text-neutral-300 font-medium ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                          Getting address...
                        </span>
                      </div>
                    </div>
                  )}

                  {townValidationError && (
                    <div className="mb-4 bg-gradient-to-br from-rose-900/40 via-rose-800/30 to-rose-900/40 border border-rose-500/40 rounded-xl p-3.5 shadow-lg backdrop-blur-sm">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <p className={`text-xs text-rose-50 leading-relaxed font-medium ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                          {townValidationError}
                        </p>
                      </div>
                    </div>
                  )}

                  {geocodedData && !townValidationError && (
                    <div className="mb-4 bg-gradient-to-br from-emerald-900/40 via-emerald-800/30 to-emerald-900/40 border border-emerald-500/40 rounded-xl p-3.5 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className={`text-xs font-bold text-emerald-50 ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                          Location Confirmed
                        </p>
                      </div>
                      <div className="space-y-2 pl-1 mb-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`text-xs text-emerald-300/80 font-medium min-w-[40px] ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                            Town:
                          </span>
                          <span className={`text-xs text-emerald-50 font-semibold ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                            {geocodedData.town}
                          </span>
                        </div>
                        {geocodedData.landmark && (
                          <div className="flex items-center gap-2.5">
                            <span className={`text-xs text-emerald-300/80 font-medium min-w-[40px] ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                              Area:
                            </span>
                            <span className={`text-xs text-emerald-50 font-semibold ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
                              {geocodedData.landmark}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          // Call confirmation callback before closing
                          if (onLocationConfirmed && geocodedData) {
                            onLocationConfirmed({
                              town: geocodedData.town,
                              landmark: geocodedData.landmark,
                              installationLocation: geocodedData.landmark,
                            });
                          }
                          setShowBottomSheet(false);
                          setSheetY(0);
                          setInitialSheetY(0);
                        }}
                        className={`w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold shadow-lg active:scale-[0.97] transition-all duration-200 ${poppins.variable}`}
                        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
