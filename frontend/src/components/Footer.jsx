import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { footerLinks, ownerProfile, socialLinks, storeInfo } from '../data/products';
import Icon from './Icons';

export default function Footer() {
    const year = new Date().getFullYear();

    const handleSubscribe = (event) => {
        event.preventDefault();
        toast.success('Thanks for subscribing.');
        event.currentTarget.reset();
    };

    return (
        <footer className="border-t border-outline-variant/30 bg-surface-container-lowest">
            {/* Main footer grid */}
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.6fr_0.6fr_1fr] lg:gap-16 lg:px-8">
                {/* Brand column */}
                <div className="space-y-6">
                    <div>
                        <p className="font-display text-[28px] font-semibold text-on-background">
                            Jaya Medical Store
                        </p>
                        <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-on-surface-variant">
                            A neighborhood pharmacy experience shaped for clarity, care, and dependable service.
                        </p>
                    </div>

                    {/* Owner badge */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Icon name="UserRound" className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[14px] font-semibold text-on-background">{ownerProfile.name}</p>
                            <p className="text-[13px] text-on-surface-variant">{ownerProfile.title}</p>
                        </div>
                    </div>

                    {/* Address */}
                    <p className="max-w-sm text-[14px] leading-[1.6] text-on-surface-variant">
                        {storeInfo.address}
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-2 pt-1">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-all duration-300 hover:border-primary/40 hover:bg-primary/8 hover:text-primary"
                                aria-label={social.name}
                            >
                                <Icon name={social.name === 'WhatsApp' ? 'MessageCircle' : social.name} className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
                        Quick Links
                    </p>
                    <div className="grid gap-[14px]">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="group flex items-center gap-2 text-[14px] text-on-surface-variant transition-colors duration-200 hover:text-primary"
                            >
                                <span className="inline-block h-[1px] w-3 bg-outline-variant/50 transition-all duration-200 group-hover:w-5 group-hover:bg-primary" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Legal links column */}
                <div>
                    <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
                        Legal
                    </p>
                    <div className="grid gap-[14px]">
                        {[
                            { label: 'Privacy Policy', to: '/privacy-policy' },
                            { label: 'Terms & Conditions', to: '/terms-conditions' },
                            { label: 'Cancellation Policy', to: '/cancel-order' },
                        ].map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="group flex items-center gap-2 text-[14px] text-on-surface-variant transition-colors duration-200 hover:text-primary"
                            >
                                <span className="inline-block h-[1px] w-3 bg-outline-variant/50 transition-all duration-200 group-hover:w-5 group-hover:bg-primary" />
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter + Contact column */}
                <div className="space-y-8">
                    <div>
                        <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
                            Stay Updated
                        </p>
                        <p className="max-w-sm text-[14px] leading-[1.6] text-on-surface-variant">
                            Get store updates, wellness notes, and product highlights without clutter.
                        </p>
                        <form onSubmit={handleSubscribe} className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <label className="sr-only" htmlFor="footer-email">
                                Email address
                            </label>
                            <input
                                id="footer-email"
                                type="email"
                                required
                                placeholder="Email address"
                                className="w-full rounded-full border border-outline-variant/50 bg-surface-container-low px-5 py-3 text-[14px] text-on-background placeholder:text-outline/60 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20"
                            />
                            <button
                                type="submit"
                                className="whitespace-nowrap rounded-full bg-primary px-6 py-3 text-[13px] font-semibold tracking-[0.04em] text-on-primary transition-colors duration-300 hover:bg-primary-container sm:w-auto"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-3">
                        <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
                            Contact
                        </p>
                        <div className="flex items-center gap-3 text-[14px] text-on-surface-variant">
                            <Icon name="Phone" className="h-4 w-4 text-primary/70" />
                            <span>{storeInfo.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[14px] text-on-surface-variant">
                            <Icon name="Mail" className="h-4 w-4 text-primary/70" />
                            <span>{storeInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[14px] text-on-surface-variant">
                            <Icon name="Clock" className="h-4 w-4 text-primary/70" />
                            <span>{storeInfo.hours}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-outline-variant/20">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-[13px] text-on-surface-variant/70 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© {year} Jaya Medical Store. All rights reserved.</p>
                    <p>Built for reliable pharmacy ordering and prescription support.</p>
                </div>
            </div>
        </footer>
    );
}