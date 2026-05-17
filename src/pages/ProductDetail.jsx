import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Icon from '../components/Icons';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const tabs = [
    { key: 'details', label: 'Details', icon: 'FileText' },
    { key: 'uses', label: 'Uses', icon: 'CheckCircle2' },
    { key: 'sideEffects', label: 'Side Effects', icon: 'ShieldCheck' },
    { key: 'directions', label: 'Directions', icon: 'ClipboardList' },
];

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');

    const product = products.find((item) => item.id === Number(id));
    const relatedProducts = useMemo(
        () => products.filter((item) => item.category === product?.category && item.id !== product?.id).slice(0, 4),
        [product],
    );

    if (!product) {
        return (
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <Seo title="Product not found" description="The requested product could not be found." />
                <div className="mx-auto max-w-2xl rounded-[28px] border border-white/40 bg-white/35 p-10 text-center backdrop-blur-2xl">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon name="PackageSearch" className="h-8 w-8" />
                    </div>
                    <h1 className="mt-5 font-display text-[32px] font-semibold text-on-background">Product not found</h1>
                    <p className="mt-3 text-[15px] text-on-surface-variant">This product is not in our catalog.</p>
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
                    >
                        <Icon name="ArrowRight" className="h-4 w-4 rotate-180" />
                        Back to Products
                    </button>
                </div>
            </section>
        );
    }

    const discount = Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${quantity} × ${product.name} added to cart.`);
    };

    return (
        <>
            <Seo
                title={product.name}
                description={`${product.name} by ${product.brand} — composition, pricing, uses, and directions.`}
            />

            {/* Breadcrumb */}
            <div className="border-b border-outline-variant/15 bg-surface-container-lowest">
                <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-[13px] text-on-surface-variant sm:px-6 lg:px-8">
                    <Link to="/products" className="transition-colors hover:text-primary">Products</Link>
                    <Icon name="ChevronRight" className="h-3.5 w-3.5" />
                    <span className="text-on-background font-medium">{product.name}</span>
                </div>
            </div>

            {/* Main product section */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
                    {/* Image */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="overflow-hidden rounded-[28px] border border-white/40 bg-white/35 shadow-[0_18px_50px_rgba(0,104,95,0.08)] backdrop-blur-2xl"
                    >
                        <div className="group relative overflow-hidden bg-surface-container-low/30">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[380px] w-full object-cover transition-transform duration-600 group-hover:scale-105 sm:h-[440px]"
                                loading="lazy"
                            />
                            {/* Badges */}
                            <div className="absolute left-4 top-4 flex flex-col gap-2">
                                {discount > 0 && (
                                    <span className="rounded-full bg-primary px-4 py-1.5 text-[12px] font-bold text-white shadow-lg">
                                        {discount}% OFF
                                    </span>
                                )}
                                {product.requiresPrescription && (
                                    <span className="rounded-full bg-tertiary px-4 py-1.5 text-[12px] font-bold text-white shadow-lg">
                                        Rx Required
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Details */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                                {product.category}
                            </span>
                            <h1
                                className="mt-2 font-display text-[32px] font-bold leading-[1.15] text-on-background sm:text-[38px]"
                                style={{ letterSpacing: '0.01em' }}
                            >
                                {product.name}
                            </h1>
                            <p className="mt-2 text-[14px] text-on-surface-variant">
                                by <span className="font-medium text-on-background">{product.manufacturer}</span>
                            </p>
                        </div>

                        {/* Meta badges */}
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 text-[12px] font-semibold text-on-surface-variant">
                                <Icon name="Pill" className="h-3.5 w-3.5 text-primary" />
                                {product.composition}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1.5 text-[12px] font-semibold text-on-surface-variant">
                                {product.brand}
                            </span>
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/[0.06] px-3 py-1.5 text-[12px] font-bold text-primary">
                                {product.badge}
                            </span>
                        </div>

                        {/* Price card */}
                        <div className="rounded-[24px] border border-white/40 bg-white/40 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                            <div className="flex flex-wrap items-end gap-6">
                                <div>
                                    <p className="text-[36px] font-bold text-on-background">₹{product.price}</p>
                                    <p className="mt-1 text-[14px] text-on-surface-variant">
                                        MRP <span className="line-through">₹{product.mrp}</span>
                                        {discount > 0 && (
                                            <span className="ml-2 font-semibold text-primary">{discount}% off</span>
                                        )}
                                    </p>
                                </div>

                                {/* Quantity */}
                                <div className="flex items-center rounded-full border border-outline-variant/40 bg-surface-container-lowest">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high"
                                        aria-label="Decrease quantity"
                                    >
                                        <Icon name="Minus" className="h-4 w-4" />
                                    </button>
                                    <span className="w-10 text-center text-[15px] font-bold text-on-background">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => current + 1)}
                                        className="flex h-11 w-11 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high"
                                        aria-label="Increase quantity"
                                    >
                                        <Icon name="Plus" className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[14px] font-semibold tracking-[0.03em] text-on-primary shadow-[0_10px_30px_rgba(0,104,95,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_16px_40px_rgba(0,104,95,0.22)]"
                                >
                                    <Icon name="ShoppingCart" className="h-4 w-4" />
                                    Add to Cart
                                </button>
                                {product.requiresPrescription && (
                                    <Link
                                        to="/prescription"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/35 px-7 py-3.5 text-[14px] font-semibold text-on-surface-variant shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/50"
                                    >
                                        <Icon name="Upload" className="h-4 w-4" />
                                        Upload Prescription
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Prescription notice */}
                        {product.requiresPrescription && (
                            <div className="flex items-start gap-3 rounded-[18px] border border-tertiary/20 bg-tertiary/[0.05] px-5 py-4">
                                <Icon name="ShieldCheck" className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                                <p className="text-[13px] leading-[1.7] text-on-surface-variant">
                                    This medicine requires a valid prescription before dispatch. Upload your prescription and the pharmacy will review it carefully.
                                </p>
                            </div>
                        )}

                        {/* Tabs */}
                        <div className="rounded-[24px] border border-white/40 bg-white/35 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-all duration-200 ${
                                            activeTab === tab.key
                                                ? 'bg-primary text-on-primary shadow-md'
                                                : 'border border-outline-variant/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
                                        }`}
                                    >
                                        <Icon name={tab.icon} className="h-3.5 w-3.5" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-5 text-[14px] leading-[1.75] text-on-surface-variant"
                            >
                                {activeTab === 'details' && <p>{product.details}</p>}
                                {activeTab === 'uses' && <ListBlock items={product.uses} />}
                                {activeTab === 'sideEffects' && <ListBlock items={product.sideEffects} />}
                                {activeTab === 'directions' && <ListBlock items={product.directions} />}
                            </motion.div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-outline-variant/20 bg-surface">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                        <Reveal className="space-y-8">
                            <div className="flex items-end justify-between gap-6">
                                <div>
                                    <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                                        Related Products
                                    </span>
                                    <h2
                                        className="mt-2 font-display text-[28px] font-semibold leading-[1.2] text-on-background sm:text-[32px]"
                                    >
                                        More from {product.category}
                                    </h2>
                                </div>
                                <Link
                                    to={`/products?category=${encodeURIComponent(product.category)}`}
                                    className="hidden items-center gap-1.5 text-[13px] font-semibold text-primary transition-opacity hover:opacity-70 md:inline-flex"
                                >
                                    View All
                                    <Icon name="ArrowRight" className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                                {relatedProducts.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}
        </>
    );
}

function ListBlock({ items }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon name="CheckCircle2" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}