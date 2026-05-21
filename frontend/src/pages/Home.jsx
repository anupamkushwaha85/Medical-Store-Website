import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Icon from '../components/Icons';
import Seo from '../components/Seo';

const trustBadges = [
    { title: 'Licensed Pharmacy', icon: 'ShieldCheck' },
    { title: '100% Genuine Medicines', icon: 'BadgeCheck' },
    { title: 'Same-Day Delivery', icon: 'Truck' },
    { title: 'Expert Consultation', icon: 'Stethoscope' },
];

const collectionCards = [
    {
        title: 'Medicines',
        description: 'Comprehensive pharmaceutical care, sourced strictly from certified global manufacturers.',
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuD49expR2znvOL7qB6D50TlQBdUgtizsNudzj-6pxZGO_xZrwBSXCI1tLClB139tPjeUY_6-RSdQsD2yhhpf6tFZUFPtMIZcmQ3iUjYJeTAecFa620xx8QxFyaHHsMNNf3AonnjuGpd0y77rbEOkY7l7F50mTmls8pk6ZxEDa7fE9AnmeJB696HS79j8t4SKKfVK3E9iARcmCICR6Wg7twzL2tpHP2awMzcL4kiuvmSHTqft11KiDbtkgPbSfVIqFLIWaG7FLo1xN4',
        large: true,
    },
    {
        title: 'Vitamins',
        description: 'Daily nutritional support.',
        image: import.meta.env.BASE_URL + 'images/vitamins.webp',
    },
    {
        title: 'Personal Care',
        description: 'Premium hygiene essentials.',
        image: import.meta.env.BASE_URL + 'images/personalcare.webp',
    },
    {
        title: 'Baby Care',
        description: 'Gentle pediatric solutions.',
        image: import.meta.env.BASE_URL + 'images/babycare.webp',
    },
    {
        title: 'Diabetic Care',
        description: 'Monitoring and management.',
        image: import.meta.env.BASE_URL + 'images/diabeticcare.webp',
    },
    {
        title: 'Cough & Cold',
        description: 'Relief for coughs, colds, and respiratory discomfort.',
        image: import.meta.env.BASE_URL + 'images/coughandcold.webp',
    },
];

const processSteps = [
    {
        title: '1. Search & Select',
        description: 'Browse our curated inventory to find your prescribed or wellness items.',
        icon: 'Search',
        active: false,
    },
    {
        title: '2. Upload Prescription',
        description: 'Securely submit your medical documents for rapid pharmacist verification.',
        icon: 'Upload',
        active: true,
    },
    {
        title: '3. Direct Delivery',
        description: 'Receive your meticulously packaged order swiftly at your doorstep.',
        icon: 'Truck',
        active: false,
    },
];

export default function Home() {
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleSubscribe = (event) => {
        event.preventDefault();
        toast.success('Newsletter signup submitted.');
        setNewsletterEmail('');
    };

    return (
        <>
            <Seo
                title="Home"
                description="Jaya Medical Store is a curated medical store experience with medicines, prescription uploads, wellness products, and local delivery support."
            />

            <div className="bg-background text-on-background">
                <section
                    className="relative flex items-center overflow-hidden"
                    style={{ minHeight: 'calc(100vh - 72px)' }}
                >
                    <div className="absolute inset-0 z-0" style={{ backgroundColor: '#b2dfde' }}>
                        <div className="absolute right-0 top-0 bottom-0 w-[58%] overflow-hidden">
                            <img
                                className="h-full w-full object-cover object-right bg-transparent mix-blend-normal"
                                alt="Capsules and soft product composition"
                                src={import.meta.env.BASE_URL + 'images/heroimage.webp'}
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[#b2dfde] via-[#b2dfde]/85 to-transparent" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-b from-transparent via-[#b2dfde]/70 to-[#b2dfde]" />
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-[60px] md:grid-cols-12 md:px-8 lg:px-16">
                        <div className="flex flex-col items-start gap-9 md:col-span-12 lg:col-span-9">
                            <span className="inline-block rounded-full bg-secondary-container px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-on-secondary-container">
                                The Curated Sanctuary
                            </span>
                            <div className="space-y-5">
                                <h1
                                    className="max-w-[920px] font-display text-[68px] font-bold leading-[0.95] text-on-background lg:text-[76px]"
                                    style={{ letterSpacing: '0.03em', wordSpacing: '0.18em' }}
                                >
                                    <span className="block whitespace-nowrap">Your Health,</span>
                                    <span className="block whitespace-nowrap italic font-normal" style={{ color: '#00685f' }}>
                                        Our Priority.
                                    </span>
                                </h1>
                                <div className="max-w-[920px] text-[19px] leading-[1.6] text-on-surface-variant lg:text-[20px]">
                                    <p>Experience clinical excellence curated for your well-being.</p>
                                    <p>We blend rigorous medical standards with a sophisticated approach</p>
                                    <p>to personal care, delivering genuine remedies directly to your sanctuary.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                                <Link
                                    to="/products"
                                    className="inline-flex min-w-[208px] items-center justify-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-[14px] font-medium tracking-[0.05em] text-slate-950 transition hover:bg-gold-300"
                                >
                                    Browse Products
                                    <Icon name="ArrowRight" className="h-4 w-4" />
                                </Link>
                                <Link
                                    to="/prescription"
                                    className="glass-button min-w-[230px] px-8 py-4 text-[14px] font-medium tracking-[0.05em] text-teal-800"
                                >
                                    <Icon name="Upload" className="h-4 w-4" />
                                    Upload Prescription
                                </Link>
                            </div>

                            <form className="mt-6 w-full md:max-w-none md:mr-[-14%] lg:mr-[-18%]" style={{ minWidth: '100%' }} onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="hero-search" className="sr-only">Search</label>
                                <div className="flex items-center gap-3 w-full">
                                    <input
                                        id="hero-search"
                                        placeholder="🔍  Search for medicines, vitamins, baby care and personal care..."
                                        className="flex-1 min-w-0 glass-pill rounded-full px-6 py-3 text-[15px] outline-none"
                                    />
                                    <button type="submit" className="rounded-full bg-gold-400 px-6 py-3 text-sm font-medium tracking-[0.05em] text-slate-950 transition hover:bg-gold-300">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* removed extra right-column rounded image — using single right-aligned hero image instead */}
                    </div>
                </section>

                <section className="border-y border-outline-variant/20 bg-surface">
                    <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 lg:px-16">
                        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                            {trustBadges.map((badge) => (
                                <div key={badge.title} className="group flex flex-col items-center gap-4 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-highest text-primary transition-colors duration-300 group-hover:bg-primary/10">
                                        <Icon name={badge.icon} className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-[18px] font-medium text-on-surface">{badge.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-5 py-[60px] md:px-8 lg:px-16">
                    <div className="mb-12 flex items-end justify-between gap-6">
                        <div>
                            <h2 className="mb-4 font-display text-[48px] font-semibold leading-[1.2] text-on-background">Curated Collections</h2>
                            <p className="max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                                Explore our meticulously selected categories, designed to address your specific health and wellness needs with unparalleled quality.
                            </p>
                        </div>
                        <Link
                            to="/products"
                            className="hidden items-center gap-2 text-[14px] font-medium tracking-[0.05em] text-primary underline-offset-4 transition hover:underline md:flex"
                        >
                            View All Categories
                            <Icon name="ArrowRight" className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid auto-rows-[240px] grid-cols-1 gap-6 md:grid-cols-12">
                        {collectionCards.map((card) =>
                            card.large ? (
                                <Link
                                    key={card.title}
                                    to="/products"
                                    className="group relative overflow-hidden rounded-[12px] border border-surface-variant shadow-[0_4px_20px_rgba(0,104,95,0.03)] md:col-span-8 md:row-span-2"
                                >
                                    <img
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        alt="A beautifully styled flat lay of essential medicines and pharmaceutical packaging arranged geometrically on a pristine white marble background. The lighting is bright and clinical but luxurious, with soft shadows. The overall tone is calm, featuring deep teal and muted sage green elements that convey a sense of modern, high-end healthcare and organized wellness."
                                        src={card.image}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-8">
                                        <h3 className="mb-2 font-display text-[32px] font-semibold text-on-primary">{card.title}</h3>
                                        <p className="max-w-md text-[16px] leading-[1.6] text-surface-container-highest">{card.description}</p>
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    key={card.title}
                                    to="/products"
                                    className="group relative flex flex-col justify-end overflow-hidden rounded-[12px] border border-surface-variant bg-surface-container-lowest p-6 shadow-[0_4px_20px_rgba(0,104,95,0.03)] md:col-span-4"
                                >
                                    {card.image ? (
                                        <>
                                            <img
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                alt={card.title}
                                                src={card.image}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/70 via-inverse-surface/20 to-transparent" />
                                            <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                                                {card.title}
                                            </span>
                                        </>
                                    ) : null}

                                    <div className="absolute right-6 top-6 rounded-full bg-primary/5 p-2 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                                        <Icon name={card.icon || 'Pill'} className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-display text-[24px] font-medium text-white">{card.title}</h3>
                                    <p className="mt-1 text-sm text-white/80">{card.description}</p>
                                </Link>
                            ),
                        )}
                    </div>
                </section>

                <section className="border-y border-outline-variant/20 bg-surface py-[60px]">
                    <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-16">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 font-display text-[48px] font-semibold leading-[1.2] text-on-background">A Seamless Process</h2>
                            <p className="mx-auto max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                                Acquiring your essential medications should be as calming as the cure itself. Follow our streamlined three-step approach.
                            </p>
                        </div>

                        <div className="relative flex flex-col gap-12 md:flex-row md:items-center md:justify-between md:gap-4">
                            <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-outline-variant/30 md:block" />
                            {processSteps.map((step) => (
                                <div key={step.title} className="z-10 flex w-full flex-col items-center bg-surface px-4 text-center md:w-1/3">
                                    <div
                                        className={`mb-6 flex h-16 w-16 items-center justify-center rounded-full border shadow-[0_4px_20px_rgba(0,104,95,0.03)] ${step.active
                                            ? 'border-primary bg-primary text-on-primary'
                                            : step.title.startsWith('3')
                                                ? 'border-secondary-container bg-surface-container-lowest text-secondary'
                                                : 'border-primary bg-surface-container-lowest text-primary'
                                            }`}
                                    >
                                        <Icon name={step.icon} className="h-6 w-6" />
                                    </div>
                                    <h4 className="mb-2 font-display text-[24px] font-medium text-on-background">{step.title}</h4>
                                    <p className="text-sm leading-[1.6] text-on-surface-variant">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-[1280px] px-5 py-[60px] md:px-8 lg:px-16">
                    <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] shadow-[0_4px_20px_rgba(0,104,95,0.03)] md:aspect-square">
                            <img
                                className="h-full w-full object-cover"
                                alt="A distinguished editorial portrait of a senior medical professional, Madan Mohan Mishra, standing in a brightly lit, high-end pharmacy setting. He wears a pristine white lab coat over tasteful attire. The lighting is soft, natural, and flattering, emphasizing wisdom and approachability. The background is slightly blurred, showing neatly organized, minimalist shelves of medicine with subtle deep teal branding accents, conveying clinical authority and warmth."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvLR3jdxYJOrAIhUGI00WIuVfHFtqPy3-XgSkwQLQHqugGoqmYpqsZecRw6mhaUfUy71UpewC33x5BM_9ICyj2bK9yHfckn5uAn8wV7XSJDDhnFYIU62S9T-904OxYNG9SLYbLW4SgzbCCBitIPaKB3I6pIaJVlnuZ3nYLzgkmSV4cr70WEfsaxWHNJ-bOPvkjSfn5-8XdRuIN2sGao0AKiWPqInpq6OhlEcYVEPHhoNSC5k86ktriB55v4mmYhpg8nW6pefT14Mw"
                            />
                        </div>

                        <div className="flex flex-col items-start gap-8">
                            <span className="text-[14px] font-medium uppercase tracking-[0.05em] text-tertiary">The Visionary</span>
                            <h2 className="font-display text-[40px] leading-[1.2] text-on-background">
                                &quot;True care requires a synthesis of unyielding precision and profound empathy.&quot;
                            </h2>
                            <div className="h-px w-12 bg-primary" />
                            <p className="text-[18px] leading-[1.6] text-on-surface-variant">
                                Founded by Madan Mohan Mishra, Jaya Medical Store was established to elevate the standard of pharmaceutical provision. We view every prescription not merely as a transaction, but as a critical component of your personal health journey, deserving of the utmost respect and rigorous attention to detail.
                            </p>
                            <div className="mt-4">
                                <p className="mb-1 font-display text-[20px] text-on-background">Madan Mohan Mishra</p>
                                <p className="text-[16px] italic text-on-surface-variant">Founder &amp; Owner</p>
                            </div>
                            <Link
                                to="/about"
                                className="border-b border-tertiary pb-1 text-[14px] font-medium tracking-[0.05em] text-tertiary transition-opacity hover:opacity-70"
                            >
                                Read Our Full Story
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="border-t border-outline-variant/20 bg-surface-container-highest py-[40px]">
                    <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
                        <Icon name="Mail" className="mx-auto mb-6 h-8 w-8 text-primary" />
                        <h2 className="mb-4 font-display text-[32px] text-on-background">Join The Curated Sanctuary</h2>
                        <p className="mb-10 text-[16px] leading-[1.6] text-on-surface-variant">
                            Subscribe to receive sophisticated insights on wellness, exclusive product curations, and priority medical updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="mx-auto flex max-w-md flex-col gap-6">
                            <div className="relative w-full text-left">
                                <label className="absolute -top-5 left-0 text-[12px] font-bold uppercase tracking-[0.08em] text-primary" htmlFor="newsletter-email">
                                    Email Address
                                </label>
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    required
                                    value={newsletterEmail}
                                    onChange={(event) => setNewsletterEmail(event.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full border-0 border-b border-outline-variant bg-transparent px-0 py-3 text-[18px] text-on-background outline-none transition placeholder:text-outline/50 focus:border-primary focus:ring-0"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-full bg-primary px-8 py-3 text-[14px] font-medium tracking-[0.05em] text-on-primary transition-colors duration-300 hover:bg-primary-container hover:text-on-primary-container"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}