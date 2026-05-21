import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import PrescriptionUpload from '../components/PrescriptionUpload';
import Icon from '../components/Icons';

const steps = [
    {
        icon: 'Upload',
        title: 'Upload Prescription',
        description: 'Share a clear photo or PDF of your valid medical prescription through our secure portal.',
    },
    {
        icon: 'ShieldCheck',
        title: 'Pharmacist Verification',
        description: 'Our licensed pharmacist carefully reviews every detail for accuracy and compliance.',
    },
    {
        icon: 'Truck',
        title: 'Doorstep Delivery',
        description: 'Your verified medicines are meticulously packed and delivered right to your doorstep.',
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

const lineVariantsMobile = {
    hidden: { scaleY: 0 },
    visible: {
        scaleY: 1,
        transition: { duration: 0.7, ease: 'easeOut' },
    },
};

export default function Prescription() {
    return (
        <>
            <Seo
                title="Upload Prescription"
                description="Upload a prescription for medicines that require pharmacist review before dispatch."
            />

            {/* ─── Hero: Minimal centered header ─── */}
            <section className="border-b border-outline-variant/20 bg-surface-container-lowest">
                <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-12 lg:py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <h1
                            className="font-display text-[36px] font-bold leading-[1.15] text-on-background sm:text-[44px] lg:text-[50px]"
                            style={{ letterSpacing: '0.01em' }}
                        >
                            <span style={{ color: '#00685f' }}>Secure</span> Prescription Upload
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.75] text-on-surface-variant sm:text-[16px]">
                            Upload your valid medical prescription for swift processing by our clinical pharmacists. We ensure the highest standards of data privacy and medical accuracy.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Form section ─── */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12"
                >
                    {/* Left: Form */}
                    <PrescriptionUpload />

                    {/* Right: Info sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-28">
                        {/* Pharmacist review card */}
                        <div className="rounded-[28px] border border-primary/15 bg-primary/[0.04] p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon name="ShieldCheck" className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-display text-[18px] font-semibold text-on-background">Pharmacist Reviewed</p>
                                    <p className="mt-2 text-[14px] leading-[1.7] text-on-surface-variant">
                                        Every prescription is personally verified by our licensed pharmacist before dispatch. If anything needs clarification, we'll contact you directly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Accepted files card */}
                        <div className="rounded-[28px] border border-outline-variant/30 bg-surface-container-lowest p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tertiary/10 text-tertiary">
                                    <Icon name="FileText" className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-display text-[18px] font-semibold text-on-background">Accepted Files</p>
                                    <p className="mt-2 text-[14px] leading-[1.7] text-on-surface-variant">
                                        JPG, PNG, and PDF are supported. Keep the file readable and include a clear patient name on the prescription.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {['JPG', 'PNG', 'PDF'].map((fmt) => (
                                            <span
                                                key={fmt}
                                                className="inline-flex items-center rounded-full border border-outline-variant/40 bg-surface-container-low px-3 py-1 text-[12px] font-semibold tracking-wide text-on-surface-variant"
                                            >
                                                .{fmt}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fast support card */}
                        <div className="rounded-[28px] border border-outline-variant/30 bg-surface-container-lowest p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                                    <Icon name="MessageCircle" className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-display text-[18px] font-semibold text-on-background">Need Help?</p>
                                    <p className="mt-2 text-[14px] leading-[1.7] text-on-surface-variant">
                                        Use the contact page or WhatsApp if you need help before uploading your prescription.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust badge */}
                        <div className="flex items-center gap-3 rounded-[20px] bg-surface-container-high/50 px-5 py-4">
                            <Icon name="BadgeCheck" className="h-5 w-5 text-primary" />
                            <p className="text-[13px] font-medium text-on-surface-variant">
                                100% secure — your data is never shared with third parties.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ─── How It Works: 3-step process with connected lines ─── */}
            <section className="border-t border-outline-variant/20 bg-surface py-12 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="mb-10 text-center"
                    >
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                            <Icon name="Sparkles" className="h-3.5 w-3.5" />
                            How It Works
                        </span>
                        <h2 className="mt-4 font-display text-[34px] font-semibold leading-[1.2] text-on-background sm:text-[40px]">
                            Three simple steps to your medicines
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.7] text-on-surface-variant">
                            Our streamlined process ensures your prescriptions are handled with clinical precision from upload to delivery.
                        </p>
                    </motion.div>

                    {/* Steps with connected lines */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative flex flex-col items-center gap-0 md:flex-row md:items-start md:justify-between"
                    >
                        {steps.map((step, index) => (
                            <div key={step.title} className="flex flex-col items-center md:flex-1">
                                {/* Step card */}
                                <motion.div
                                    variants={stepVariants}
                                    className="relative z-10 flex w-full max-w-[280px] flex-col items-center text-center"
                                >
                                    {/* Number circle */}
                                    <div className="relative mb-6">
                                        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-primary/20 bg-surface-container-lowest shadow-[0_8px_30px_rgba(0,104,95,0.1)]">
                                            <span
                                                className="font-display text-[28px] font-bold"
                                                style={{ color: '#00685f' }}
                                            >
                                                {index + 1}
                                            </span>
                                        </div>
                                        {/* Icon badge */}
                                        <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md">
                                            <Icon name={step.icon} className="h-4 w-4" />
                                        </div>
                                    </div>

                                    {/* Text */}
                                    <h3 className="mb-2 font-display text-[20px] font-semibold text-on-background">
                                        {step.title}
                                    </h3>
                                    <p className="text-[14px] leading-[1.65] text-on-surface-variant">
                                        {step.description}
                                    </p>
                                </motion.div>

                                {/* Connecting line (not after the last step) */}
                                {index < steps.length - 1 && (
                                    <>
                                        {/* Desktop: horizontal line */}
                                        <motion.div
                                            variants={lineVariants}
                                            className="absolute top-[36px] hidden md:block"
                                            style={{
                                                left: `${((index + 1) * 100) / steps.length - 100 / steps.length / 2 + 4}%`,
                                                width: `${100 / steps.length - 8}%`,
                                                transformOrigin: 'left center',
                                            }}
                                        >
                                            <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 via-primary/25 to-primary/40" />
                                            {/* Arrow dot at end */}
                                            <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/40" />
                                        </motion.div>

                                        {/* Mobile: vertical line */}
                                        <motion.div
                                            variants={lineVariantsMobile}
                                            className="my-4 block md:hidden"
                                            style={{ transformOrigin: 'top center' }}
                                        >
                                            <div className="mx-auto h-12 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}