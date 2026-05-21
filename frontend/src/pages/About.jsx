import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Icon from '../components/Icons';
import { milestones, valueCards, ownerProfile } from '../data/products';

export default function About() {
    return (
        <>
            <Seo title="About Us" description="Learn the story, values, and owner profile behind Jaya Medical Store." />

            <main className="mx-auto max-w-[1280px] px-5 pt-16 pb-16 sm:px-6 md:px-16">
                {/* ─── Hero Section ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-16 max-w-3xl"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                        <Icon name="Info" className="h-4 w-4" />
                        Our Story
                    </span>
                    <h1
                        className="font-display text-[44px] font-bold leading-[1.15] text-on-background sm:text-[56px]"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        A pharmacy shaped around <span className="text-primary">trust</span> and attention.
                    </h1>
                    <p className="mt-6 text-[18px] leading-[1.6] text-on-surface-variant">
                        Jaya Medical Store is built to feel like a clean, welcoming pharmacy counter online. The goal is simple: genuine products, careful verification, and a service experience that helps people feel informed rather than rushed.
                    </p>
                </motion.div>

                <div className="space-y-12 sm:space-y-20">
                    {/* ─── Owner Section ─── */}
                    <Reveal>
                        <div className="overflow-hidden rounded-[24px] border border-white/40 bg-white/35 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                                <div className="relative h-[300px] w-full bg-surface-container-low md:h-auto">
                                    <img
                                        src="/images/owner.jpg"
                                        alt="Madan Mohan Mishra"
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                                    <div className="absolute bottom-6 left-6 md:hidden">
                                        <h3 className="font-display text-[24px] font-medium text-white">{ownerProfile.name}</h3>
                                        <p className="text-[13px] font-semibold tracking-wider text-white/80 uppercase">{ownerProfile.title}</p>
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 lg:p-16">
                                    <div className="hidden md:block">
                                        <h2 className="font-display text-[32px] font-bold leading-[1.2] text-on-background lg:text-[40px]">
                                            Madan Mohan Mishra
                                        </h2>
                                        <p className="mt-2 text-[14px] font-bold uppercase tracking-[0.1em] text-primary">
                                            {ownerProfile.title}
                                        </p>
                                    </div>
                                    <p className="mt-6 text-[16px] leading-[1.7] text-on-surface-variant md:mt-8">
                                        With over {new Date().getFullYear() - 2010} years of retail pharmacy experience, Madan Mohan Mishra has shaped the store around careful counseling, accurate product handling, and consistent follow-up.
                                    </p>
                                    <blockquote className="mt-6 border-l-2 border-primary pl-4 font-display text-[20px] italic leading-[1.5] text-on-surface">
                                        "{ownerProfile.quote}"
                                    </blockquote>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        {['Retail Experience', 'Prescription Review', 'Patient Support'].map((badge) => (
                                            <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[13px] font-semibold text-primary">
                                                <Icon name="CheckCircle2" className="h-4 w-4" />
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* ─── Values Section ─── */}
                    <Reveal>
                        <div className="mb-8 md:mb-12">
                            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-tertiary">Our Core Values</span>
                            <h2 className="mt-2 font-display text-[32px] font-bold leading-[1.2] text-on-background sm:text-[40px]">
                                What we're built to protect
                            </h2>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {valueCards.map((card, index) => (
                                <motion.div
                                    key={card.title}
                                    whileHover={{ y: -6 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="rounded-[20px] border border-white/40 bg-white/35 p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-colors hover:bg-white/50"
                                >
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                                        <Icon name={card.iconKey} className="h-6 w-6" />
                                    </div>
                                    <h3 className="font-display text-[22px] font-semibold leading-[1.3] text-on-background">
                                        {card.title}
                                    </h3>
                                    <p className="mt-3 text-[14px] leading-[1.6] text-on-surface-variant">
                                        {card.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </Reveal>

                    {/* ─── Milestones Section ─── */}
                    <Reveal>
                        <div className="rounded-[28px] border border-tertiary/20 bg-tertiary/5 p-8 md:p-12 lg:p-16">
                            <div className="mb-10 text-center">
                                <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-tertiary">Timeline</span>
                                <h2 className="mt-2 font-display text-[32px] font-bold leading-[1.2] text-on-background sm:text-[40px]">
                                    Our journey so far
                                </h2>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {milestones.map((milestone) => (
                                    <div key={milestone.year} className="relative rounded-[20px] border border-white/40 bg-white/50 p-6 shadow-sm backdrop-blur-md">
                                        <div className="mb-4 inline-flex rounded-full bg-tertiary px-3 py-1 text-[12px] font-bold tracking-widest text-on-tertiary">
                                            {milestone.year}
                                        </div>
                                        <h3 className="font-display text-[20px] font-semibold leading-[1.3] text-on-background">
                                            {milestone.title}
                                        </h3>
                                        <p className="mt-2 text-[14px] leading-[1.6] text-on-surface-variant">
                                            {milestone.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* ─── Certifications & Mission ─── */}
                    <Reveal className="grid gap-6 lg:grid-cols-2">
                        <div className="rounded-[24px] border border-white/40 bg-white/35 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-10">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon name="FileBadge" className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-[26px] font-semibold leading-[1.3] text-on-background">
                                Current Documentation
                            </h3>
                            <p className="mt-4 text-[15px] leading-[1.7] text-on-surface-variant">
                                Pharmacy compliance records, supplier paperwork, and proprietorship documentation are rigorously maintained. We believe transparency is the foundation of trust in healthcare.
                            </p>
                        </div>
                        <div className="rounded-[24px] border border-white/40 bg-white/35 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-10">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Icon name="Target" className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-[26px] font-semibold leading-[1.3] text-on-background">
                                Our Mission
                            </h3>
                            <p className="mt-4 text-[15px] leading-[1.7] text-on-surface-variant">
                                To make pharmacy ordering feel accurate, human, and reassuring. Every screen, form, and checkout path is designed to reduce friction for customers who want dependable care without clutter.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </main>
        </>
    );
}