import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import OwnerCard from '../components/OwnerCard';
import Icon from '../components/Icons';
import { milestones, valueCards } from '../data/products';

export default function About() {
    return (
        <>
            <Seo title="About" description="Learn the story, values, and owner profile behind Yashi Medical Store." />
            <section className="page-shell section-pad">
                <Reveal className="space-y-5">
                    <p className="kicker">About</p>
                    <h1 className="display-heading text-4xl sm:text-5xl">A pharmacy shaped around trust and attention</h1>
                    <p className="max-w-3xl text-sm leading-7 text-slate-600">
                        Yashi Medical Store is built to feel like a clean, welcoming pharmacy counter online. The goal is simple: genuine products, careful verification, and a service experience that helps people feel informed rather than rushed.
                    </p>
                </Reveal>
            </section>

            <section className="page-shell pb-16 sm:pb-20 lg:pb-24">
                <div className="space-y-10">
                    <Reveal className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <OwnerCard />
                        <div className="space-y-5">
                            <p className="kicker">Owner</p>
                            <h2 className="display-heading text-3xl sm:text-4xl">Madan Mohan Mishra keeps the counter calm and the guidance practical</h2>
                            <p className="text-sm leading-7 text-slate-600">
                                With {new Date().getFullYear() - 2010}+ years of retail pharmacy experience, Madan Mohan Mishra has shaped the store around careful counseling, accurate product handling, and consistent follow-up.
                            </p>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {['Retail pharmacy experience', 'Prescription review flow', 'Customer support by phone and WhatsApp'].map((item) => (
                                    <div key={item} className="rounded-[24px] border border-brand-100 bg-white p-4 text-sm font-medium text-slate-700 shadow-soft">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="space-y-6">
                        <div>
                            <p className="kicker">Values</p>
                            <h2 className="display-heading mt-3 text-3xl sm:text-4xl">What the store is built to protect</h2>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {valueCards.map((card) => (
                                <div key={card.title} className="glass-card p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                                        <Icon name={card.iconKey} className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 font-display text-2xl text-slate-900">{card.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal className="space-y-6">
                        <div>
                            <p className="kicker">Milestones</p>
                            <h2 className="display-heading mt-3 text-3xl sm:text-4xl">A short timeline of store growth</h2>
                        </div>
                        <div className="grid gap-4">
                            {milestones.map((milestone) => (
                                <div key={milestone.year} className="glass-card flex flex-col gap-4 p-6 md:flex-row md:items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 font-display text-2xl text-white">
                                        {milestone.year}
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl text-slate-900">{milestone.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal className="grid gap-6 lg:grid-cols-2">
                        <div className="glass-card p-6">
                            <p className="kicker">Certifications</p>
                            <h2 className="mt-3 font-display text-3xl text-slate-900">Documentation is kept current at the store</h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Pharmacy compliance records, supplier paperwork, and proprietorship documentation are maintained for review when needed.
                            </p>
                        </div>
                        <div className="glass-card p-6">
                            <p className="kicker">Mission</p>
                            <h2 className="mt-3 font-display text-3xl text-slate-900">Make pharmacy ordering feel accurate, human, and reassuring</h2>
                            <p className="mt-4 text-sm leading-7 text-slate-600">
                                Every screen, form, and checkout path is designed to reduce friction for customers who want dependable care without clutter.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}