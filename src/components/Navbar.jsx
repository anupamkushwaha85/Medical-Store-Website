import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { footerLinks } from '../data/products';
import Icon from './Icons';

const navLinks = footerLinks.filter((link) => link.label !== 'Home');

export default function Navbar() {
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="sticky top-0 z-50 border-b border-brand-100/80 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
                        <Icon name="ShieldCheck" className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-display text-xl text-slate-900">Yashi Medical Store</p>
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-700">Madan Mohan Mishra</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
                    <NavLink to="/" className={({ isActive }) => navLinkClass(isActive)}>
                        Home
                    </NavLink>
                    {navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} className={({ isActive }) => navLinkClass(isActive)}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <Link
                        to="/cart"
                        className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:-translate-y-0.5 hover:bg-brand-100"
                    >
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                        Cart
                        <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs text-white">{cartCount}</span>
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-gold-300"
                    >
                        Browse Products
                        <Icon name="ArrowRight" className="h-4 w-4" />
                    </Link>
                </div>

                <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-100 bg-white text-slate-900 shadow-soft lg:hidden"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((value) => !value)}
                >
                    <Icon name={menuOpen ? 'X' : 'Menu'} className="h-5 w-5" />
                </button>
            </div>

            {menuOpen ? (
                <div className="border-t border-brand-100 bg-white lg:hidden">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                        <div className="flex flex-col gap-3">
                            <NavLink to="/" className={({ isActive }) => mobileNavClass(isActive)}>
                                Home
                            </NavLink>
                            {navLinks.map((link) => (
                                <NavLink key={link.to} to={link.to} className={({ isActive }) => mobileNavClass(isActive)}>
                                    {link.label}
                                </NavLink>
                            ))}
                            <NavLink to="/cart" className={({ isActive }) => mobileNavClass(isActive)}>
                                Cart <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-800">{cartCount}</span>
                            </NavLink>
                            <Link to="/products" className="rounded-2xl bg-gold-400 px-4 py-3 text-center font-semibold text-slate-950">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}

const navLinkClass = (isActive) =>
    [
        'text-sm font-medium transition',
        isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900',
    ].join(' ');

const mobileNavClass = (isActive) =>
    [
        'rounded-2xl border px-4 py-3 text-sm font-medium transition',
        isActive ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-slate-200 text-slate-700 hover:bg-slate-50',
    ].join(' ');