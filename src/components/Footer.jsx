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
        <footer className="border-t border-brand-100 bg-slate-950 text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
                <div className="space-y-5">
                    <div>
                        <p className="font-display text-3xl text-white">Yashi Medical Store</p>
                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                            A neighborhood pharmacy experience shaped for clarity, care, and dependable service.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-300">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-brand-100">
                            <Icon name="UserRound" className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-white">{ownerProfile.name}</p>
                            <p>{ownerProfile.title}</p>
                        </div>
                    </div>
                    <p className="max-w-md text-sm leading-6 text-slate-300">{storeInfo.address}</p>
                </div>

                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">Quick links</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                        {footerLinks.map((link) => (
                            <Link key={link.to} to={link.to} className="text-sm text-slate-300 transition hover:text-white">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-brand-300 hover:text-white"
                                aria-label={social.name}
                            >
                                <Icon name={social.name === 'WhatsApp' ? 'MessageCircle' : social.name} className="h-4 w-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">Newsletter</p>
                    <p className="max-w-sm text-sm leading-6 text-slate-300">
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
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-brand-300 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-2xl bg-gold-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-gold-300"
                        >
                            Subscribe
                        </button>
                    </form>
                    <div className="mt-6 grid gap-3 text-sm text-slate-300">
                        <p>{storeInfo.phone}</p>
                        <p>{storeInfo.email}</p>
                        <p>{storeInfo.hours}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© {year} Yashi Medical Store. All rights reserved.</p>
                    <p>Built for reliable pharmacy ordering and prescription support.</p>
                </div>
            </div>
        </footer>
    );
}