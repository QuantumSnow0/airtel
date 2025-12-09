import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function PrivacyPolicyPage() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 text-white ${poppins.variable}`}
      style={{ fontFamily: "var(--font-poppins), sans-serif" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              This website is operated by an authorized Airtel Kenya agent ("we," "our," or "us"). 
              We are committed to protecting your privacy. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our lead capture 
              form and services.
            </p>
            <p className="text-neutral-300 leading-relaxed mb-4">
              <strong className="text-yellow-400">Important:</strong> Your information is collected 
              by us as an authorized agent and forwarded to Airtel Networks Kenya Limited for 
              service processing. Airtel Networks Kenya Limited has its own privacy practices 
              which apply to the services they provide.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              2. Information We Collect
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We collect information that you provide directly to us when you
              fill out our lead capture form, including:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">
              <li>Full name</li>
              <li>Phone numbers (Airtel number and alternative number)</li>
              <li>Email address</li>
              <li>Installation town and location</li>
              <li>Delivery location (nearest landmark)</li>
              <li>Preferred date and time for installation</li>
              <li>Selected service package</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              3. How We Use Your Information
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">
              <li>Process and fulfill your service requests</li>
              <li>Schedule installation appointments</li>
              <li>Communicate with you about your account and services</li>
              <li>Send you service-related updates and notifications</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              4. Information Sharing and Disclosure
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              As an authorized Airtel agent, we share your information with Airtel Networks 
              Kenya Limited to facilitate service requests and installations. We do not sell, 
              trade, or rent your personal information to third parties. We may share your 
              information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">
              <li>
                <strong className="text-yellow-400">With Airtel Networks Kenya Limited:</strong> 
                Your information is shared with Airtel to process your service request, 
                schedule installation, and provide customer support
              </li>
              <li>
                With service providers who assist us in operating our business
                and serving you
              </li>
              <li>When required by law or to protect our rights</li>
              <li>
                In connection with a business transfer or merger (with notice to
                you)
              </li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              5. Data Security
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. However, no method
              of transmission over the internet or electronic storage is 100%
              secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              6. Data Retention
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              7. Your Rights
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-4 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mb-4">
              To exercise these rights, please contact us using the information
              provided in the Contact section below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              8. Cookies and Tracking Technologies
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may use cookies and similar tracking technologies to enhance
              your experience on our website. You can set your browser to refuse
              cookies, but this may limit some functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              9. Third-Party Services
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our website may contain links to third-party websites or services.
              We are not responsible for the privacy practices of these third
              parties. We encourage you to read their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              10. Children's Privacy
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              12. Contact Us
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us (the authorized agent):
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
                For privacy inquiries related to Airtel services, please contact Airtel directly:
              </p>
              <p className="text-neutral-300 mb-2 mt-2">
                <strong className="text-yellow-400">Airtel Networks Kenya Limited</strong>
              </p>
              <p className="text-neutral-300 mb-2">
                Email: <a href="mailto:privacy@airtelkenya.com" className="text-yellow-400 hover:text-yellow-300">privacy@airtelkenya.com</a>
              </p>
              <p className="text-neutral-300 mb-2">
                Phone: <a href="tel:100" className="text-yellow-400 hover:text-yellow-300">100</a> (Customer Care)
              </p>
              <p className="text-neutral-300">
                Address: Airtel Centre, Waiyaki Way, Westlands, Nairobi, Kenya
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              13. Consent
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              By using our lead capture form and submitting your information, you
              consent to the collection and use of your information as described
              in this Privacy Policy.
            </p>
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


