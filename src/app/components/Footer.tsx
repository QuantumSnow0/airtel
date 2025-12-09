"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-2">
              Authorized Airtel Agent
            </h3>
            <p className="text-xs text-yellow-400/80 mb-4 italic">
              This website is operated by an authorized Airtel Kenya agent. 
              We facilitate lead generation for Airtel 5G Smart Connect services.
            </p>
            <p className="text-sm text-neutral-400 mb-4">
              Get high-speed 5G Smart Connect internet for your home. 
              Weather-resistant outdoor unit with reliable performance across all 47 counties in Kenya.
            </p>
            <div className="space-y-2 text-sm mb-4">
              <p className="text-neutral-400">
                <span className="font-medium text-white">Agent Contact:</span>{" "}
                <a
                  href="tel:+254789457580"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  0789 457 580
                </a>
              </p>
            </div>
            <div className="space-y-2 text-sm border-t border-neutral-800 pt-4 mt-4">
              <p className="text-xs text-neutral-500 mb-2">Official Airtel Support:</p>
              <p className="text-neutral-400">
                <span className="font-medium text-white">Customer Care:</span>{" "}
                <a
                  href="tel:100"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  100
                </a>
              </p>
              <p className="text-neutral-400">
                <span className="font-medium text-white">Website:</span>{" "}
                <a
                  href="https://www.airtelkenya.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  www.airtelkenya.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/request-installation"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Request Installation
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://www.airtelkenya.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-yellow-400 transition-colors"
                >
                  Official Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-400 text-center md:text-left">
              <p>© {currentYear} Authorized Airtel Agent. All rights reserved.</p>
              <p className="text-xs text-neutral-500 mt-1">
                Airtel and the Airtel logo are trademarks of Airtel Networks Kenya Limited.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-neutral-500">
              <Link
                href="/privacy-policy"
                className="hover:text-yellow-400 transition-colors"
              >
                Privacy
              </Link>
              <span>•</span>
              <Link
                href="/terms-of-service"
                className="hover:text-yellow-400 transition-colors"
              >
                Terms
              </Link>
              <span>•</span>
              <a
                href="https://www.airtelkenya.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors"
              >
                Official Airtel Site
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500 text-center">
            This website is operated by an authorized Airtel Kenya agent. 
            Services are provided by Airtel Networks Kenya Limited.
          </p>
        </div>
      </div>
    </footer>
  );
}

