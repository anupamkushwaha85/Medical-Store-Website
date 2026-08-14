import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Icon from '../components/Icons';
import { apiRequest, apiUrl } from '../lib/api';

const initialLogin = {
    username: '',
    password: '',
};

const initialCategory = '';

const initialProduct = {
    name: '',
    brand: '',
    marked_price: '',
    selling_price: '',
    requires_prescription: false,
    category: '',
    description: '',
    composition: '',
    stock: '0',
    image: null,
};

const orderStatusOptions = [
    'PROCESSING',
    'OUT_FOR_DELIVERY',
    'COMPLETED',
    'CANCELLED',
];

const statusLabels = {
    PROCESSING: 'Processing',
    OUT_FOR_DELIVERY: 'Out for delivery',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
};

const money = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
}).format(Number(value || 0));

const formatDate = (value) => new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

const resolveCategoryId = (category) => {
    if (!category) {
        return '';
    }

    if (typeof category === 'string') {
        return category;
    }

    return category._id || category.id || '';
};

export default function AdminOwnerAshutosh() {
    const [checkingSession, setCheckingSession] = useState(true);
    const [admin, setAdmin] = useState(null);
    const [loginForm, setLoginForm] = useState(initialLogin);
    const [loginLoading, setLoginLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const [categoryName, setCategoryName] = useState(initialCategory);
    const [savingCategory, setSavingCategory] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [productForm, setProductForm] = useState(initialProduct);
    const [savingProduct, setSavingProduct] = useState(false);
    const [savingOrderId, setSavingOrderId] = useState(null);

    const stats = useMemo(() => [
        { label: 'Products', value: products.length },
        { label: 'Categories', value: categories.length },
        { label: 'Orders', value: orders.length },
        { label: 'Active products', value: products.filter((product) => product.is_active).length },
    ], [categories.length, orders.length, products]);

    const loadData = async () => {
        setDataLoading(true);

        try {
            const [productResponse, categoryResponse, orderResponse] = await Promise.all([
                apiRequest('/api/products?limit=100'),
                apiRequest('/api/categories'),
                apiRequest('/api/admin/orders?limit=100'),
            ]);

            setProducts(productResponse.products || []);
            setCategories(categoryResponse.categories || []);
            setOrders(orderResponse.orders || []);

            if (!productForm.category && categoryResponse.categories?.length) {
                setProductForm((current) => ({
                    ...current,
                    category: resolveCategoryId(categoryResponse.categories[0]),
                }));
            }
        } catch (error) {
            toast.error(error.message || 'Failed to load dashboard data');
        } finally {
            setDataLoading(false);
        }
    };

    const loadSession = async () => {
        try {
            const response = await apiRequest('/api/admin/session');
            setAdmin(response.admin || null);
            await loadData();
        } catch {
            setAdmin(null);
        } finally {
            setCheckingSession(false);
        }
    };

    useEffect(() => {
        loadSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginForm((current) => ({ ...current, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoginLoading(true);

        try {
            const response = await apiRequest('/api/admin/session/login', {
                method: 'POST',
                body: JSON.stringify(loginForm),
            });

            setAdmin(response.admin || null);
            setLoginForm(initialLogin);
            toast.success('Admin session started');
            await loadData();
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setLoginLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await apiRequest('/api/admin/session/logout', {
                method: 'POST',
            });
            setAdmin(null);
            setProducts([]);
            setCategories([]);
            setOrders([]);
            setProductForm(initialProduct);
            setEditingProductId(null);
            toast.success('Signed out');
        } catch (error) {
            toast.error(error.message || 'Logout failed');
        }
    };

    const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1MB

    const [imagePreview, setImagePreview] = useState(null);
    const [imageSizeInfo, setImageSizeInfo] = useState('');

    const handleProductField = (event) => {
        const { name, value, type, checked, files } = event.target;

        if (name === 'image') {
            const file = files?.[0];
            if (file) {
                if (file.size > MAX_IMAGE_SIZE) {
                    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
                    toast.error(`Selected image (${sizeMb} MB) exceeds 1MB limit! Please choose an image smaller than 1MB.`);
                    event.target.value = '';
                    setImagePreview(null);
                    setImageSizeInfo('');
                    setProductForm((current) => ({ ...current, image: null }));
                    return;
                }

                const sizeKb = (file.size / 1024).toFixed(0);
                setImageSizeInfo(`${sizeKb} KB (Valid < 1MB limit)`);
                setImagePreview(URL.createObjectURL(file));
                setProductForm((current) => ({ ...current, image: file }));
            } else {
                setImagePreview(null);
                setImageSizeInfo('');
                setProductForm((current) => ({ ...current, image: null }));
            }
            return;
        }

        setProductForm((current) => ({
            ...current,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const resetProductForm = () => {
        setEditingProductId(null);
        setImagePreview(null);
        setImageSizeInfo('');
        setProductForm((current) => ({
            ...initialProduct,
            category: current.category || categories[0]?._id || '',
        }));
    };

    const editProduct = (product) => {
        setActiveTab('products');
        setEditingProductId(product._id);
        setImagePreview(product.image_url || null);
        setImageSizeInfo('Current active image');
        setProductForm({
            name: product.name || '',
            brand: product.brand || '',
            marked_price: String(product.marked_price ?? ''),
            selling_price: String(product.selling_price ?? ''),
            requires_prescription: Boolean(product.requires_prescription),
            category: resolveCategoryId(product.category),
            description: product.description || '',
            composition: product.composition || '',
            stock: String(product.stock ?? 0),
            image: null,
        });
    };

    const submitProduct = async (event) => {
        event.preventDefault();

        if (!productForm.category) {
            toast.error('Select a category first');
            return;
        }

        if (!editingProductId && !productForm.image) {
            toast.error('Choose a product image (< 1MB)');
            return;
        }

        if (productForm.image && productForm.image.size > MAX_IMAGE_SIZE) {
            toast.error('Image size must be less than 1MB.');
            return;
        }

        setSavingProduct(true);

        try {
            const formData = new FormData();
            formData.append('name', productForm.name);
            formData.append('brand', productForm.brand);
            formData.append('marked_price', productForm.marked_price);
            formData.append('selling_price', productForm.selling_price);
            formData.append('requires_prescription', String(productForm.requires_prescription));
            formData.append('category', productForm.category);
            formData.append('description', productForm.description);
            formData.append('composition', productForm.composition);
            formData.append('stock', productForm.stock);

            if (productForm.image) {
                formData.append('image', productForm.image);
            }

            const response = await apiRequest(editingProductId ? `/api/products/${editingProductId}` : '/api/products', {
                method: editingProductId ? 'PUT' : 'POST',
                body: formData,
            });

            toast.success(editingProductId ? 'Product updated successfully' : 'Product created successfully');
            setImagePreview(null);
            setImageSizeInfo('');
            setProductForm((current) => ({
                ...initialProduct,
                category: current.category || categories[0]?._id || '',
            }));
            setEditingProductId(null);
            setProducts((current) => editingProductId
                ? current.map((product) => (product._id === editingProductId ? response.product : product))
                : [response.product, ...current]);
        } catch (error) {
            toast.error(error.message || 'Failed to save product');
        } finally {
            setSavingProduct(false);
        }
    };

    const removeProduct = async (productId) => {
        if (!window.confirm('Delete this product?')) {
            return;
        }

        try {
            await apiRequest(`/api/products/${productId}`, { method: 'DELETE' });
            setProducts((current) => current.filter((product) => product._id !== productId));
            toast.success('Product deleted');
        } catch (error) {
            toast.error(error.message || 'Failed to delete product');
        }
    };

    const toggleProduct = async (productId) => {
        try {
            const response = await apiRequest(`/api/products/${productId}/toggle`, { method: 'PATCH' });
            setProducts((current) => current.map((product) => (product._id === productId ? response.product : product)));
            toast.success('Product status updated');
        } catch (error) {
            toast.error(error.message || 'Failed to update product status');
        }
    };

    const submitCategory = async (event) => {
        event.preventDefault();
        setSavingCategory(true);

        try {
            const response = await apiRequest('/api/categories', {
                method: 'POST',
                body: JSON.stringify({ name: categoryName }),
            });

            setCategories((current) => [...current, response.category].sort((left, right) => left.name.localeCompare(right.name)));
            setCategoryName('');
            if (!productForm.category) {
                setProductForm((current) => ({
                    ...current,
                    category: response.category._id,
                }));
            }
            toast.success('Category created');
        } catch (error) {
            toast.error(error.message || 'Failed to create category');
        } finally {
            setSavingCategory(false);
        }
    };

    const removeCategory = async (categoryId) => {
        if (!window.confirm('Delete this category?')) {
            return;
        }

        try {
            await apiRequest(`/api/categories/${categoryId}`, { method: 'DELETE' });
            setCategories((current) => current.filter((category) => category._id !== categoryId));
            setProductForm((current) => (current.category === categoryId ? { ...current, category: '' } : current));
            toast.success('Category deleted');
        } catch (error) {
            toast.error(error.message || 'Failed to delete category');
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        setSavingOrderId(orderId);

        try {
            const response = await apiRequest(`/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                body: JSON.stringify({ status }),
            });

            setOrders((current) => current.map((order) => (order._id === orderId ? response.order : order)));
            toast.success('Order status updated');
        } catch (error) {
            toast.error(error.message || 'Failed to update order');
        } finally {
            setSavingOrderId(null);
        }
    };

    if (checkingSession) {
        return (
            <div className="min-h-screen bg-[#f7f6f1] text-slate-900 font-sans">
                <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                    <div className="w-full max-w-sm border border-slate-200 bg-white p-8">
                        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Admin</p>
                        <h1 className="mt-3 text-2xl font-semibold tracking-tight font-sans">Checking session</h1>
                        <p className="mt-2 text-sm text-slate-600">Loading the admin workspace.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!admin) {
        return (
            <div className="min-h-screen bg-[#f7f6f1] text-slate-900 font-sans">
                <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="flex items-center border-b border-slate-200 px-6 py-12 lg:border-b-0 lg:border-r lg:px-10">
                        <div className="max-w-xl">
                            <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Admin workspace</p>
                            <h1 className="mt-4 text-4xl font-semibold tracking-tight font-sans sm:text-5xl">Jaya Medical Store</h1>
                            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
                                Private access for product, category, and order management.
                            </p>

                            <div className="mt-10 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                                <div className="border border-slate-200 bg-white p-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Route</p>
                                    <p className="mt-2 font-medium text-slate-900">/admin/owner/ashutosh</p>
                                </div>
                                <div className="border border-slate-200 bg-white p-4">
                                    <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Session</p>
                                    <p className="mt-2 font-medium text-slate-900">Cookie-based auth</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center px-6 py-12 lg:px-10">
                        <form onSubmit={handleLogin} className="w-full max-w-md border border-slate-200 bg-white p-8">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Sign in</p>
                            <h2 className="mt-3 text-2xl font-semibold tracking-tight font-sans">Admin login</h2>
                            <p className="mt-2 text-sm text-slate-600">Use the admin username and password from the backend env file.</p>

                            <div className="mt-8 space-y-4">
                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Username</span>
                                    <input
                                        name="username"
                                        value={loginForm.username}
                                        onChange={handleLoginChange}
                                        autoComplete="username"
                                        className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-slate-700">Password</span>
                                    <input
                                        name="password"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        type="password"
                                        autoComplete="current-password"
                                        className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900"
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="mt-6 inline-flex w-full items-center justify-center border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loginLoading ? 'Signing in' : 'Sign in'}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f7f6f1] text-slate-900 font-sans">
            <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                    <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Private dashboard</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight font-sans">Jaya Medical Store admin</h1>
                        <p className="mt-1 text-sm text-slate-600">Route /admin/owner/ashutosh</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Signed in as</p>
                            <p className="text-sm font-medium text-slate-900">{admin.username}</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.label} className="border border-slate-200 bg-white p-5">
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</p>
                            <p className="mt-3 text-3xl font-semibold tracking-tight font-sans">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                    {[
                        ['products', 'Products'],
                        ['categories', 'Categories'],
                        ['orders', 'Orders'],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setActiveTab(key)}
                            className={`border px-4 py-2 text-sm font-medium transition ${activeTab === key ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}
                        >
                            {label}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={loadData}
                        className="ml-auto inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                    >
                        <Icon name="RefreshCw" className="h-4 w-4" />
                        Refresh data
                    </button>
                </div>

                {dataLoading ? (
                    <div className="mt-8 border border-slate-200 bg-white p-6 text-sm text-slate-600">Loading dashboard data…</div>
                ) : null}

                <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
                    <section className="border border-slate-200 bg-white p-6">
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Catalog</p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight font-sans">{editingProductId ? 'Edit product' : 'Add product'}</h2>
                            </div>

                            {editingProductId ? (
                                <button
                                    type="button"
                                    onClick={resetProductForm}
                                    className="border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                                >
                                    Cancel edit
                                </button>
                            ) : null}
                        </div>

                        <form onSubmit={submitProduct} className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="block md:col-span-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700">Product Image (1 Image Per Product)</span>
                                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">Limit: &lt; 1MB</span>
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleProductField}
                                    className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 text-sm focus:border-slate-900"
                                />
                                <p className="mt-1 text-xs text-slate-500">Only 1 image accepted per product. Maximum size strictly less than 1MB (1,048,576 bytes).</p>

                                {imagePreview ? (
                                    <div className="mt-3 flex items-center gap-4 border border-slate-200 bg-[#fbfbf9] p-3">
                                        <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover border border-slate-300 bg-white" />
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">Image Preview</p>
                                            <p className="text-xs text-emerald-600 font-medium mt-0.5">{imageSizeInfo || 'Selected file valid'}</p>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {[
                                ['name', 'Product name'],
                                ['brand', 'Brand'],
                                ['marked_price', 'Marked price (₹)'],
                                ['selling_price', 'Selling price (₹)'],
                                ['stock', 'Stock quantity'],
                            ].map(([field, label]) => (
                                <label key={field} className="block">
                                    <span className="text-sm font-medium text-slate-700">{label}</span>
                                    <input
                                        name={field}
                                        value={productForm[field]}
                                        onChange={handleProductField}
                                        type={['marked_price', 'selling_price', 'stock'].includes(field) ? 'number' : 'text'}
                                        min={field === 'stock' ? '0' : undefined}
                                        className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900 text-sm"
                                    />
                                </label>
                            ))}

                            <label className="block md:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Category</span>
                                <select
                                    name="category"
                                    value={productForm.category}
                                    onChange={handleProductField}
                                    className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900 text-sm"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="block md:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Description</span>
                                <textarea
                                    name="description"
                                    value={productForm.description}
                                    onChange={handleProductField}
                                    rows="3"
                                    className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900 text-sm"
                                />
                            </label>

                            <label className="block md:col-span-2">
                                <span className="text-sm font-medium text-slate-700">Composition</span>
                                <textarea
                                    name="composition"
                                    value={productForm.composition}
                                    onChange={handleProductField}
                                    rows="2"
                                    className="mt-2 w-full border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900 text-sm"
                                />
                            </label>

                            <label className="flex items-center gap-3 md:col-span-2">
                                <input
                                    type="checkbox"
                                    name="requires_prescription"
                                    checked={productForm.requires_prescription}
                                    onChange={handleProductField}
                                    className="h-4 w-4 border-slate-300 text-slate-900 focus:ring-slate-900"
                                />
                                <span className="text-sm text-slate-700 font-medium">Prescription required (Rx)</span>
                            </label>

                            <div className="md:col-span-2 flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={savingProduct}
                                    className="border border-slate-900 bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {savingProduct ? 'Saving...' : editingProductId ? 'Update product' : 'Add product'}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetProductForm}
                                    className="border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="border border-slate-200 bg-white p-6">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Categories</p>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight font-sans">Manage categories</h2>
                            </div>
                        </div>

                        <form onSubmit={submitCategory} className="mt-6 flex gap-3">
                            <input
                                value={categoryName}
                                onChange={(event) => setCategoryName(event.target.value)}
                                placeholder="New category name"
                                className="flex-1 border border-slate-200 bg-[#fafaf8] px-4 py-3 outline-none transition focus:border-slate-900 text-sm"
                            />
                            <button
                                type="submit"
                                disabled={savingCategory}
                                className="border border-slate-900 bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Add
                            </button>
                        </form>

                        <div className="mt-6 space-y-3">
                            {categories.map((category) => (
                                <div key={category._id} className="flex items-center justify-between border border-slate-200 px-4 py-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{category.name}</p>
                                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{category.slug}</p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category._id)}
                                        className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}

                            {!categories.length ? (
                                <p className="border border-dashed border-slate-200 px-4 py-8 text-sm text-slate-500">No categories yet.</p>
                            ) : null}
                        </div>
                    </section>
                </div>

                <section className="mt-8 border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Products</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight font-sans">Inventory</h2>
                        </div>
                        <p className="text-sm text-slate-500">{products.length} items</p>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.22em] text-slate-400">
                                <tr>
                                    <th className="px-3 py-3 font-medium">Image</th>
                                    <th className="px-3 py-3 font-medium">Name</th>
                                    <th className="px-3 py-3 font-medium">Category</th>
                                    <th className="px-3 py-3 font-medium">Price</th>
                                    <th className="px-3 py-3 font-medium">Stock</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border-b border-slate-100 align-middle">
                                        <td className="px-3 py-4">
                                            <img
                                                src={product.image_url || 'https://placehold.co/100x100?text=No+Image'}
                                                alt={product.name}
                                                className="h-12 w-12 object-cover border border-slate-200 rounded"
                                            />
                                        </td>
                                        <td className="px-3 py-4">
                                            <p className="font-medium text-slate-900">{product.name}</p>
                                            <p className="mt-0.5 text-xs text-slate-500">{product.brand}</p>
                                        </td>
                                        <td className="px-3 py-4 text-slate-700">{product.category?.name || product.category?.slug || '—'}</td>
                                        <td className="px-3 py-4 text-slate-700">
                                            <div>{money(product.selling_price)}</div>
                                            <div className="text-xs text-slate-400">MRP {money(product.marked_price)}</div>
                                        </td>
                                        <td className="px-3 py-4 text-slate-700">{product.stock ?? 0}</td>
                                        <td className="px-3 py-4">
                                            <span className={`inline-flex border px-2 py-1 text-xs font-medium ${product.is_active ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}>
                                                {product.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => editProduct(product)}
                                                    className="border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => toggleProduct(product._id)}
                                                    className="border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
                                                >
                                                    Toggle
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => removeProduct(product._id)}
                                                    className="border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 transition hover:border-slate-900 hover:text-slate-900"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {!products.length ? (
                                    <tr>
                                        <td colSpan="6" className="px-3 py-8 text-sm text-slate-500">No products yet.</td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mt-8 border border-slate-200 bg-white p-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Orders</p>
                            <h2 className="mt-2 text-2xl font-semibold tracking-tight font-sans">Latest orders</h2>
                        </div>
                        <p className="text-sm text-slate-500">{orders.length} records</p>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.22em] text-slate-400">
                                <tr>
                                    <th className="px-3 py-3 font-medium">Order</th>
                                    <th className="px-3 py-3 font-medium">Customer</th>
                                    <th className="px-3 py-3 font-medium">Total</th>
                                    <th className="px-3 py-3 font-medium">Status</th>
                                    <th className="px-3 py-3 font-medium">Placed</th>
                                    <th className="px-3 py-3 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="border-b border-slate-100 align-top">
                                        <td className="px-3 py-4 text-slate-700">{order._id.slice(-8)}</td>
                                        <td className="px-3 py-4">
                                            <p className="font-medium text-slate-900">{order.user_name}</p>
                                            <p className="mt-1 text-xs text-slate-500">{order.user_phone}</p>
                                        </td>
                                        <td className="px-3 py-4 text-slate-700">{money(order.total_amount)}</td>
                                        <td className="px-3 py-4">
                                            <span className="inline-flex border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700">
                                                {statusLabels[order.order_status] || order.order_status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-slate-600">{formatDate(order.createdAt)}</td>
                                        <td className="px-3 py-4">
                                            <select
                                                value={order.order_status}
                                                onChange={(event) => updateOrderStatus(order._id, event.target.value)}
                                                className="border border-slate-200 bg-[#fafaf8] px-3 py-2 text-xs outline-none"
                                                disabled={savingOrderId === order._id}
                                            >
                                                {orderStatusOptions.map((status) => (
                                                    <option key={status} value={status}>{statusLabels[status]}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}

                                {!orders.length ? (
                                    <tr>
                                        <td colSpan="6" className="px-3 py-8 text-sm text-slate-500">No orders yet.</td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="mt-8 border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600">
                    Backend base URL: <span className="font-medium text-slate-900">{apiUrl('/api/health')}</span>
                </div>
            </main>
        </div>
    );
}