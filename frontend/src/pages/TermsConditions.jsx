import { motion } from 'framer-motion';
import Seo from '../components/Seo';

export default function TermsConditions() {
    return (
        <>
            <Seo title="Terms and Conditions" description="Terms and Conditions for Jaya Medical Store." />

            <main className="mx-auto max-w-[1000px] px-5 pt-16 pb-24 sm:px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className="font-display text-[44px] font-bold leading-[1.15] text-on-background sm:text-[56px] tracking-tight">
                        Terms & Conditions
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
                        <h2 className="font-display text-[28px] font-semibold text-on-background">1. Acceptance of Terms</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            By accessing and using the Jaya Medical Store website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">2. Prescription Requirements</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            Certain medications listed on our platform require a valid prescription from a registered medical practitioner. We reserve the right to cancel any order if a valid, legible prescription is not provided or if our pharmacists determine the prescription to be invalid.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">3. Product Information and Pricing</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            While we strive to provide accurate product information and pricing, errors may occur. In the event that a product is listed at an incorrect price, we reserve the right to refuse or cancel any orders placed for that product. Prices and availability are subject to change without notice.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">4. Limitation of Liability</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            Jaya Medical Store acts as a dispensing pharmacy. We are not liable for any adverse reactions, allergies, or side effects caused by the medications. Always consult your healthcare provider before starting any new medication.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-display text-[28px] font-semibold text-on-background">5. Changes to Terms</h2>
                        <p className="text-[16px] leading-[1.7] text-on-surface-variant">
                            We reserve the right to update or modify these Terms and Conditions at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the new terms.
                        </p>
                    </section>
                </motion.div>
            </main>
        </>
    );
}
