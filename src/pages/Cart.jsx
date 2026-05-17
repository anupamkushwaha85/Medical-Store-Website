import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Icon from '../components/Icons';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function Cart() {
    const { items, setItemQuantity, removeFromCart, clearCart, subtotal } = useCart();

    const deliveryCharge = subtotal > 999 || subtotal === 0 ? 0 : 49;
    const taxes = Math.round(subtotal * 0.05);
    const [promoCode, setPromoCode] = useState('JAYA10');
    const discount = promoCode === 'JAYA10' ? Math.round(subtotal * 0.1) : 0;
    const total = Math.max(0, subtotal + deliveryCharge + taxes - discount);

    const applyPromo = () => {
        if (promoCode.trim().toUpperCase() === 'JAYA10') {
            toast.success('Promo code applied.');
        } else {
            toast.error('Promo code not recognized.');
        }
    };

    if (!items.length) {
        return (
            <>
                <Seo title="Cart" description="Review the items in your pharmacy cart." />
                <section className="page-shell section-pad">
                    <Reveal className="glass-card mx-auto max-w-3xl p-10 text-center">
                        <Icon name="ShoppingCart" className="mx-auto h-12 w-12 text-brand-500" />
                        <h1 className="mt-5 font-display text-4xl text-slate-900">Your cart is empty</h1>
                        <p className="mt-3 text-sm leading-7 text-slate-600">Browse products and add medicines or wellness essentials to start your order.</p>
                        <Link
                            to="/products"
                            className="glass-button mt-8 text-brand-800"
                        >
                            Browse products
                        </Link>
                    </Reveal>
                </section>
            </>
        );
    }

    return (
        <>
            <Seo title="Cart" description="Review items, apply a promo code, and proceed to checkout through the contact form." />
            <section className="page-shell section-pad">
                <Reveal className="space-y-5">
                    <p className="kicker">Cart</p>
                    <h1 className="display-heading text-4xl sm:text-5xl">Review your medicines before checkout</h1>
                </Reveal>
            </section>

            <section className="page-shell pb-16 sm:pb-20 lg:pb-24">
                <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                    <Reveal className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="glass-card flex flex-col gap-5 p-5 sm:flex-row">
                                <img src={item.image} alt={item.name} loading="lazy" className="h-36 w-full rounded-3xl object-cover sm:h-32 sm:w-32" />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-700">{item.category}</p>
                                            <h2 className="mt-2 font-display text-2xl text-slate-900">{item.name}</h2>
                                            <p className="mt-2 text-sm text-slate-500">{item.brand}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                removeFromCart(item.id);
                                                toast.success(`${item.name} removed from cart.`);
                                            }}
                                            className="glass-button px-3 py-2 text-sm text-slate-700"
                                        >
                                            <Icon name="Trash2" className="h-4 w-4" />
                                            Remove
                                        </button>
                                    </div>
                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xl font-semibold text-slate-900">₹{item.price}</p>
                                            <p className="text-sm text-slate-500">MRP ₹{item.mrp}</p>
                                        </div>
                                        <div className="flex items-center rounded-full border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => setItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                className="glass-button h-11 w-11 px-0 py-0"
                                                aria-label="Decrease quantity"
                                            >
                                                <Icon name="Minus" className="h-4 w-4" />
                                            </button>
                                            <span className="w-12 text-center text-sm font-semibold">{item.quantity}</span>
                                            <button
                                                type="button"
                                                onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                                                className="glass-button h-11 w-11 px-0 py-0"
                                                aria-label="Increase quantity"
                                            >
                                                <Icon name="Plus" className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Reveal>

                    <Reveal className="space-y-6">
                        <div className="glass-card p-6">
                            <div className="flex items-center justify-between">
                                <h2 className="font-display text-3xl text-slate-900">Order summary</h2>
                                <button type="button" onClick={clearCart} className="text-sm font-semibold text-brand-700">
                                    Clear cart
                                </button>
                            </div>

                            <div className="mt-6 space-y-3 text-sm text-slate-600">
                                <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
                                <SummaryRow label="Delivery charge" value={deliveryCharge ? `₹${deliveryCharge}` : 'Free'} />
                                <SummaryRow label="GST" value={`₹${taxes}`} />
                                <SummaryRow label="Promo discount" value={discount ? `-₹${discount}` : '₹0'} />
                                <div className="border-t border-brand-100 pt-4">
                                    <SummaryRow label="Total" value={`₹${total}`} highlight />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <label className="space-y-2 text-sm font-medium text-slate-700">
                                Promo code
                                <div className="flex gap-3">
                                    <input
                                        value={promoCode}
                                        onChange={(event) => setPromoCode(event.target.value.toUpperCase())}
                                        placeholder="Enter code"
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={applyPromo}
                                        className="glass-button px-5 py-3 text-sm text-slate-800"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </label>

                            <Link
                                to="/contact"
                                className="glass-button mt-5 w-full px-6 py-3.5 text-sm text-brand-800"
                            >
                                Proceed to checkout
                                <Icon name="ArrowRight" className="h-4 w-4" />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}

function SummaryRow({ label, value, highlight = false }) {
    return (
        <div className={`flex items-center justify-between ${highlight ? 'text-lg font-semibold text-slate-950' : ''}`}>
            <span>{label}</span>
            <span>{value}</span>
        </div>
    );
}
