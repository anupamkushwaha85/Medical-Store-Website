import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import Icon from './Icons';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const discount = Math.max(0, Math.round(((product.mrp - product.price) / product.mrp) * 100));

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart.`);
    };

    return (
        <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        >
            <div className="group relative overflow-hidden rounded-[24px] border border-white/40 bg-white/35 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-white/60 hover:bg-white/50 hover:shadow-[0_20px_50px_rgba(0,104,95,0.12)]">
                <Link to={`/products/${product.id}`} className="block">
                    {/* Image */}
                    <div className="relative overflow-hidden bg-surface-container-low/50">
                        <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Badges */}
                        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                            {discount > 0 && (
                                <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-white shadow-md">
                                    {discount}% OFF
                                </span>
                            )}
                            {product.requiresPrescription && (
                                <span className="rounded-full bg-tertiary px-3 py-1 text-[11px] font-bold text-white shadow-md">
                                    Rx Required
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3 p-5">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                                {product.category}
                            </p>
                            <h3 className="mt-1.5 font-display text-[20px] font-semibold leading-tight text-on-background">
                                {product.name}
                            </h3>
                        </div>

                        <p className="line-clamp-2 text-[13px] leading-[1.6] text-on-surface-variant">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <p className="text-[22px] font-bold text-on-background">₹{product.price}</p>
                                <p className="text-[12px] text-on-surface-variant">
                                    MRP <span className="line-through">₹{product.mrp}</span>
                                </p>
                            </div>
                            <span className="rounded-full border border-outline-variant/30 bg-surface-container-low px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant">
                                {product.brand}
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Add to cart */}
                <div className="border-t border-white/30 p-4">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-[13px] font-semibold tracking-[0.03em] text-on-primary transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container"
                    >
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </motion.article>
    );
}