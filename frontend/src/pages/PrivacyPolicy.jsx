import { motion } from 'framer-motion';
import Seo from '../components/Seo';

export default function PrivacyPolicy() {
    return (
        <>
            <Seo title="Privacy Policy" description="Privacy Policy for Jaya Medical Store." />

            <main className="mx-auto max-w-[1000px] px-5 pt-16 pb-24 sm:px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className="font-display text-[44px] font-bold leading-[1.15] text-on-background sm:text-[56px] tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-[16px] text-on-surface-variant">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    className="mt-12 space-y-10 rounded-[24px] border border-white/40 bg-white/35 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-12"
                >
                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">1. Information We Collect</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            At Jaya Medical Store, we collect information that you provide directly to us when you create an account, place an order, or contact us for support. This includes your name, email address, phone number, shipping address, and medical prescriptions (when required for ordering specific medicines).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">2. How We Use Your Information</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            We use the information we collect to fulfill your orders, provide customer support, communicate with you about your order status via SMS or WhatsApp, and ensure compliance with pharmacy laws regarding prescription medications. We do not sell or rent your personal information to third parties.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">3. Data Security and Confidentiality</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            We take the security of your medical and personal data seriously. Prescriptions uploaded to our platform are stored securely and are only accessed by our licensed pharmacists for the purpose of order verification and fulfillment. We implement standard security measures to protect against unauthorized access or data breaches.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">4. Third-Party Services</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            We may share your delivery address and phone number with our trusted delivery partners strictly for the purpose of delivering your orders. We ensure our partners adhere to strict confidentiality agreements.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">5. Contact Us</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            If you have any questions about this Privacy Policy, please contact us at support@jayamedicalstore.in or call our support line.
                        </p>
                    </section>
                </motion.div>
            </main>
        </>
    );
}
