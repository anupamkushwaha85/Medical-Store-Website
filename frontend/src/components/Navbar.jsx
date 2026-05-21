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
                    <p className="font-display text-xl text-primary">Jaya Medical Store</p>
                </Link>

                <div className="hidden sm:flex items-center gap-3 ml-2">
                    <div className="glass-pill">
                        <Icon name="MapPin" className="h-4 w-4 text-primary" />
                        <span className="font-medium">485001</span>
                    </div>
                </div>

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
                        className="glass-button px-4 py-2 text-sm text-brand-800"
                    >
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                        Cart
                        {cartCount > 0 ? <span className="rounded-full bg-brand-500 px-2 py-0.5 text-xs text-white">{cartCount}</span> : null}
                    </Link>
                </div>

                <button
                    type="button"
                    className="glass-icon-button h-11 w-11 lg:hidden"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((value) => !value)}
                >
                    <Icon name={menuOpen ? 'X' : 'Menu'} className="h-5 w-5" />
                </button>
            </div>

            {menuOpen ? (
                <div className="border-t border-brand-100 bg-white/80 backdrop-blur-xl lg:hidden">
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
                                Cart {cartCount > 0 ? <span className="ml-2 rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-800">{cartCount}</span> : null}
                            </NavLink>
                            <Link to="/products" className="glass-button w-full rounded-2xl px-4 py-3 text-center text-brand-800">
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
        'glass-button w-full rounded-2xl px-4 py-3 text-sm font-medium',
        isActive ? 'text-brand-800' : 'text-slate-700',
    ].join(' ');