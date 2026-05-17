import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icons';
import { productBrands, productCategories, products } from '../data/products';

const sortOptions = [
    { value: 'popular', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low → High' },
    { value: 'price-high', label: 'Price: High → Low' },
    { value: 'newest', label: 'Newest First' },
];

export default function Products() {
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [brand, setBrand] = useState('All');
    const [sortBy, setSortBy] = useState('popular');
    const [priceCap, setPriceCap] = useState(3000);
    const [rxOnly, setRxOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const perPage = 8;

    useEffect(() => {
        setLoading(true);
        const timer = window.setTimeout(() => setLoading(false), 450);
        return () => window.clearTimeout(timer);
    }, [searchParams]);

    useEffect(() => {
        setCategory(searchParams.get('category') || 'All');
        setCurrentPage(1);
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        const result = products
            .filter((product) => (category === 'All' ? true : product.category === category))
            .filter((product) => (brand === 'All' ? true : product.brand === brand))
            .filter((product) => (rxOnly ? product.requiresPrescription : true))
            .filter((product) => product.price <= priceCap)
            .filter((product) => {
                if (!query) {
                    return true;
                }

                return [product.name, product.brand, product.description, product.category, product.composition]
                    .join(' ')
                    .toLowerCase()
                    .includes(query);
            });

        switch (sortBy) {
            case 'price-low':
                return result.sort((left, right) => left.price - right.price);
            case 'price-high':
                return result.sort((left, right) => right.price - left.price);
            case 'newest':
                return result.sort((left, right) => right.id - left.id);
            default:
                return result;
        }
    }, [brand, category, priceCap, queryKey(search), rxOnly, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
    const pageItems = filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [category, brand, priceCap, rxOnly, search, sortBy]);

    const resetFilters = () => {
        setSearch('');
        setCategory('All');
        setBrand('All');
        setSortBy('popular');
        setPriceCap(3000);
        setRxOnly(false);
    };

    return (
        <>
            <Seo
                title="Products"
                description="Browse medicines, vitamins, baby care, personal care, diabetic care, and surgical supplies at Jaya Medical Store."
            />

            {/* Hero header */}
            <section className="border-b border-outline-variant/20 bg-surface-container-lowest">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
                    >
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                                <Icon name="Pill" className="h-3.5 w-3.5" />
                                Our Products
                            </span>
                            <h1
                                className="mt-3 font-display text-[36px] font-bold leading-[1.15] text-on-background sm:text-[44px]"
                                style={{ letterSpacing: '0.01em' }}
                            >
                                Browse our <span style={{ color: '#00685f' }}>curated</span> collection
                            </h1>
                            <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-on-surface-variant">
                                Filter by category, brand, prescription requirement, or price. Find exactly what you need with calm, clear navigation.
                            </p>
                        </div>

                        {/* Product count badge */}
                        <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/40 bg-white/50 px-5 py-2.5 text-[14px] font-semibold text-on-surface-variant shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl lg:self-auto">
                            <Icon name="PackageSearch" className="h-4 w-4 text-primary" />
                            {filteredProducts.length} products
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main content */}
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                    {/* ─── Filters sidebar ─── */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                        className="sticky top-24 h-fit rounded-[24px] border border-white/40 bg-white/35 p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-2xl"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Icon name="Filter" className="h-4 w-4 text-primary" />
                                <h2 className="font-display text-[18px] font-semibold text-on-background">Filters</h2>
                            </div>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="text-[12px] font-semibold text-primary transition-opacity hover:opacity-70"
                            >
                                Reset all
                            </button>
                        </div>

                        {/* Search */}
                        <label className="mt-4 block space-y-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">Search</span>
                            <div className="flex items-center gap-2 rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
                                <Icon name="Search" className="h-4 w-4 text-outline" />
                                <input
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                    placeholder="Search medicines..."
                                    className="w-full bg-transparent text-[13px] text-on-background outline-none placeholder:text-outline/50"
                                />
                            </div>
                        </label>

                        {/* Category */}
                        <label className="mt-3 block space-y-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">Category</span>
                            <select
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                                className="w-full rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-[13px] text-on-background outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            >
                                {productCategories.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Brand */}
                        <label className="mt-3 block space-y-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">Brand</span>
                            <select
                                value={brand}
                                onChange={(event) => setBrand(event.target.value)}
                                className="w-full rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-[13px] text-on-background outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            >
                                <option value="All">All Brands</option>
                                {productBrands.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Price range */}
                        <label className="mt-3 block space-y-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">Price Range</span>
                            <div className="rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest p-3">
                                <input
                                    type="range"
                                    min="50"
                                    max="3000"
                                    step="1"
                                    value={priceCap}
                                    onChange={(event) => setPriceCap(Number(event.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="mt-1 flex items-center justify-between text-[12px] text-on-surface-variant">
                                    <span>₹50</span>
                                    <span className="font-semibold text-primary">Up to ₹{priceCap}</span>
                                </div>
                            </div>
                        </label>

                        {/* Rx only */}
                        <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-[13px] font-medium text-on-surface-variant transition-colors hover:bg-surface-container-low">
                            <input
                                type="checkbox"
                                checked={rxOnly}
                                onChange={(event) => setRxOnly(event.target.checked)}
                                className="h-4 w-4 rounded accent-primary"
                            />
                            Prescription required only
                        </label>

                        {/* Sort */}
                        <label className="mt-3 block space-y-1">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-on-surface-variant">Sort By</span>
                            <select
                                value={sortBy}
                                onChange={(event) => setSortBy(event.target.value)}
                                className="w-full rounded-[10px] border border-outline-variant/40 bg-surface-container-lowest px-3 py-2 text-[13px] text-on-background outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </motion.aside>

                    {/* ─── Product grid ─── */}
                    <div className="space-y-8">
                        {loading ? (
                            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="animate-pulse overflow-hidden rounded-[24px] border border-white/30 bg-white/25 backdrop-blur-xl"
                                    >
                                        <div className="h-56 bg-surface-container-low/50" />
                                        <div className="space-y-3 p-5">
                                            <div className="h-3 w-20 rounded-full bg-surface-container-high" />
                                            <div className="h-5 w-3/4 rounded-full bg-surface-container-high" />
                                            <div className="h-3 w-full rounded-full bg-surface-container-high" />
                                            <div className="h-3 w-2/3 rounded-full bg-surface-container-high" />
                                            <div className="h-11 rounded-full bg-surface-container-high" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : pageItems.length ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4 }}
                                    className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                >
                                    {pageItems.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </motion.div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                                        {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                            <button
                                                key={pageIndex}
                                                type="button"
                                                onClick={() => setCurrentPage(pageIndex + 1)}
                                                className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full text-[14px] font-semibold transition-all duration-200 ${
                                                    pageIndex + 1 === currentPage
                                                        ? 'bg-primary text-on-primary shadow-md'
                                                        : 'border border-white/40 bg-white/35 text-on-surface-variant backdrop-blur-xl hover:bg-white/50'
                                                }`}
                                            >
                                                {pageIndex + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[28px] border border-white/40 bg-white/35 px-8 py-14 text-center backdrop-blur-2xl">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Icon name="PackageSearch" className="h-8 w-8" />
                                </div>
                                <h2 className="mt-5 font-display text-[26px] font-semibold text-on-background">
                                    No products match these filters
                                </h2>
                                <p className="mt-3 max-w-md text-[14px] leading-[1.7] text-on-surface-variant">
                                    Try widening the price range, clearing the prescription filter, or searching a shorter phrase.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-semibold text-on-primary transition-colors hover:bg-primary-container hover:text-on-primary-container"
                                >
                                    <Icon name="RefreshCw" className="h-4 w-4" />
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

function queryKey(search) {
    return search.trim().toLowerCase();
}