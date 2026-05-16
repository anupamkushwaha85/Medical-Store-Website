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
    { key: 'details', label: 'Details' },
    { key: 'uses', label: 'Uses' },
    { key: 'sideEffects', label: 'Side Effects' },
    { key: 'directions', label: 'Directions' },
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
            <section className="page-shell section-pad">
                <Seo title="Product not found" description="The requested product could not be found." />
                <div className="glass-card mx-auto max-w-2xl p-8 text-center">
                    <p className="kicker">Not found</p>
                    <h1 className="mt-4 font-display text-4xl text-slate-900">This product is not in the catalog</h1>
                    <button
                        type="button"
                        onClick={() => navigate('/products')}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white"
                    >
                        Back to products
                    </button>
                </div>
            </section>
        );
    }

    const discount = Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${quantity} x ${product.name} added to cart.`);
    };

    return (
        <>
            <Seo
                title={product.name}
                description={`${product.name} by ${product.brand} with price, composition, directions, and related products.`}
            />
            <section className="page-shell section-pad">
                <Reveal className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                    <motion.div whileHover={{ scale: 1.01 }} className="overflow-hidden rounded-[36px] border border-brand-100 bg-white shadow-soft">
                        <div className="group relative bg-slate-50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            {product.requiresPrescription ? (
                                <span className="absolute left-5 top-5 rounded-full bg-brand-500 px-4 py-2 text-xs font-semibold text-white">
                                    Prescription required
                                </span>
                            ) : null}
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <div>
                            <p className="kicker">{product.category}</p>
                            <h1 className="display-heading mt-3 text-4xl sm:text-5xl">{product.name}</h1>
                            <p className="mt-3 text-sm text-slate-500">Manufacturer: {product.manufacturer}</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-sm font-semibold text-gold-600">
                                <Icon name="Star" className="h-4 w-4 fill-current" />
                                {product.rating} ({product.reviews} reviews)
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700">
                                {product.badge}
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                                Composition: {product.composition}
                            </div>
                        </div>

                        <div className="rounded-[30px] border border-brand-100 bg-white p-6 shadow-soft">
                            <div className="flex flex-wrap items-end gap-5">
                                <div>
                                    <p className="text-4xl font-semibold text-slate-950">₹{product.price}</p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        MRP <span className="line-through">₹{product.mrp}</span>
                                        {discount ? <span className="ml-2 text-brand-700">{discount}% off</span> : null}
                                    </p>
                                </div>
                                <div className="flex items-center rounded-full border border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        className="inline-flex h-11 w-11 items-center justify-center text-slate-700"
                                        aria-label="Decrease quantity"
                                    >
                                        <Icon name="Minus" className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-semibold text-slate-900">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => current + 1)}
                                        className="inline-flex h-11 w-11 items-center justify-center text-slate-700"
                                        aria-label="Increase quantity"
                                    >
                                        <Icon name="Plus" className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                                >
                                    Add to cart
                                    <Icon name="ShoppingCart" className="h-4 w-4" />
                                </button>
                                {product.requiresPrescription ? (
                                    <Link
                                        to="/prescription"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-6 py-3.5 text-sm font-semibold text-brand-800 transition hover:bg-brand-100"
                                    >
                                        Upload prescription
                                        <Icon name="Upload" className="h-4 w-4" />
                                    </Link>
                                ) : null}
                            </div>
                        </div>

                        {product.requiresPrescription ? (
                            <div className="rounded-[28px] border border-gold-200 bg-gold-50 px-5 py-4 text-sm leading-6 text-slate-700">
                                This item requires a prescription before dispatch. Upload your file and the pharmacy will review it carefully.
                            </div>
                        ) : null}

                        <div className="rounded-[30px] border border-brand-100 bg-white p-6 shadow-soft">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab.key ? 'bg-brand-500 text-white' : 'bg-brand-50 text-brand-800'}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
                                {activeTab === 'details' ? <p>{product.details}</p> : null}
                                {activeTab === 'uses' ? <ListBlock items={product.uses} /> : null}
                                {activeTab === 'sideEffects' ? <ListBlock items={product.sideEffects} /> : null}
                                {activeTab === 'directions' ? <ListBlock items={product.directions} /> : null}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section className="page-shell section-pad pt-0">
                <Reveal className="space-y-6">
                    <div>
                        <p className="kicker">Related products</p>
                        <h2 className="display-heading mt-3 text-3xl sm:text-4xl">More from the same care category</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {relatedProducts.map((item) => (
                            <ProductCard key={item.id} product={item} />
                        ))}
                    </div>
                </Reveal>
            </section>
        </>
    );
}

function ListBlock({ items }) {
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                    <Icon name="CheckCircle2" className="mt-1 h-4 w-4 flex-none text-brand-600" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}