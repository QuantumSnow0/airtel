import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function TermsOfServicePage() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-white ${poppins.variable}`}
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Terms of Service
        </h1>

        <div className="prose prose-invert max-w-none">
          <p className="text-neutral-400 mb-8 text-center">
            Last updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              1. Acceptance of Terms
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              By accessing and using this website and our services, you accept and
              agree to be bound by the terms and provision of this agreement. If you
              do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              2. Website Operator & Agent Relationship
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              This website is operated by an authorized Airtel Kenya agent. We facilitate 
              lead generation and customer inquiries for Airtel 5G Smart Connect internet 
              services. All services are ultimately provided by Airtel Networks Kenya Limited.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              By submitting your information through this form, you are requesting information 
              about Airtel services and expressing interest in installation. Submission of this 
              form does not guarantee service availability or installation. Final service 
              eligibility, pricing, and terms are determined by Airtel Networks Kenya Limited.
            </p>
            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 mt-4">
              <p className="text-neutral-300 text-sm leading-relaxed mb-2">
                <strong className="text-yellow-400">Agent Authorization:</strong> This agent is 
                authorized by Airtel Networks Kenya Limited to facilitate lead generation and 
                customer inquiries.
              </p>
              <a
                href="/agent.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
              >
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
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                View Agent Authorization Document (PDF)
              </a>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              3. Service Description
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              This website facilitates lead generation for Airtel 5G Smart Connect internet 
              services. We collect your information and forward it to Airtel Networks Kenya 
              Limited for processing. The actual service provision, installation, billing, 
              and support are handled by Airtel Networks Kenya Limited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              4. User Obligations
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You agree to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your information as necessary</li>
              <li>Not use the service for any unlawful purpose</li>
              <li>Not submit false or misleading information</li>
              <li>Not attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              5. Service Availability
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Service availability is subject to network coverage, technical
              feasibility, and our service terms. We reserve the right to determine
              service eligibility based on location, technical requirements, and
              other factors. We do not guarantee service availability in all areas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              6. Pricing and Payment
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              All prices displayed are in Kenyan Shillings (KES) and are for informational 
              purposes only. Prices are subject to change without notice and final pricing 
              is determined by Airtel Networks Kenya Limited. Payment terms and methods 
              will be communicated by Airtel during the installation process. Prices may 
              vary based on location, package selection, and promotional offers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              7. Installation
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Installation dates and times are subject to availability and scheduling.
              We will contact you to confirm installation details. You are responsible
              for ensuring access to the installation location and any necessary
              permissions or approvals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              8. Limitation of Liability
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              As an authorized agent, we act as an intermediary for lead generation. 
              We are not responsible for service delivery, network performance, or 
              service-related issues. Airtel Networks Kenya Limited is solely 
              responsible for service provision and any service-related liabilities.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of this 
              website or any delays in service provision. Our total liability, if any, 
              shall be limited to the amount of any commission we may receive for 
              facilitating your lead.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              9. Intellectual Property
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              All Airtel trademarks, logos, and brand elements displayed on this
              website are the property of Airtel Networks Kenya Limited. We use these 
              with authorization as an authorized agent. You may not use, reproduce, or 
              distribute any Airtel trademarks or content without prior written permission 
              from Airtel Networks Kenya Limited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              10. Privacy
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Your use of this service is also governed by our Privacy Policy. Please
              review our Privacy Policy to understand our practices regarding the
              collection and use of your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              11. Modifications to Terms
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Changes will be
              effective immediately upon posting. Your continued use of the service
              after changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              12. Governing Law
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              These terms shall be governed by and construed in accordance with the
              laws of Kenya. Any disputes arising from these terms shall be subject to
              the exclusive jurisdiction of the courts of Kenya.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              13. Contact Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service or this website, 
              please contact us (the authorized agent):
            </p>
            <div className="bg-neutral-800/50 rounded-lg p-6 mb-4">
              <p className="text-neutral-300 mb-2">
                <strong className="text-yellow-400">Authorized Airtel Agent</strong>
              </p>
              <p className="text-neutral-300 mb-2">
                Phone: <a href="tel:+254789457580" className="text-yellow-400 hover:text-yellow-300">0789 457 580</a>
              </p>
              <p className="text-neutral-300 mb-4">
                Enterprise CP: WAM APPLICATIONS
              </p>
              <p className="text-xs text-neutral-500 mt-4 pt-4 border-t border-neutral-700">
                For service-related inquiries, please contact Airtel directly:
              </p>
              <p className="text-neutral-300 mb-2 mt-2">
                <strong className="text-yellow-400">Airtel Networks Kenya Limited</strong>
              </p>
              <p className="text-neutral-300 mb-2">
                Customer Care: <a href="tel:100" className="text-yellow-400 hover:text-yellow-300">100</a>
              </p>
              <p className="text-neutral-300 mb-2">
                Email: <a href="mailto:customercare@airtelkenya.com" className="text-yellow-400 hover:text-yellow-300">customercare@airtelkenya.com</a>
              </p>
              <p className="text-neutral-300">
                Website: <a href="https://www.airtelkenya.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300">www.airtelkenya.com</a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-yellow-400 text-neutral-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}

