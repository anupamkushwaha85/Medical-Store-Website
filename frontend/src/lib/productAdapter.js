/**
 * Normalizes backend product schema (MongoDB ObjectId, image_url, selling_price, marked_price)
 * to frontend consistent format (id, image, price, mrp, category name, badge, discount).
 */
export const normalizeProduct = (product) => {
    if (!product) return null;

    const id = product._id || product.id || String(Math.random());
    const name = product.name || 'Unnamed Product';
    const brand = product.brand || 'Generic';
    const image = product.image_url || product.image || 'https://placehold.co/600x600/e2e8f0/1e293b?text=Medicine';
    
    const price = Number(product.selling_price ?? product.price ?? 0);
    const mrp = Number(product.marked_price ?? product.mrp ?? price);
    
    const discount = mrp > price && mrp > 0
        ? Math.max(0, Math.round(((mrp - price) / mrp) * 100))
        : Number(product.discount_percentage ?? 0);

    const requiresPrescription = Boolean(product.requires_prescription ?? product.requiresPrescription);
    const categoryObj = product.category;
    const category = typeof categoryObj === 'object' && categoryObj !== null
        ? (categoryObj.name || categoryObj.slug || 'Medicines')
        : (categoryObj || 'Medicines');

    const badge = requiresPrescription ? 'Rx' : discount >= 10 ? 'Sale' : 'OTC';

    return {
        ...product,
        id,
        _id: id,
        name,
        brand,
        image,
        image_url: image,
        price,
        selling_price: price,
        mrp,
        marked_price: mrp,
        discount,
        requiresPrescription,
        requires_prescription: requiresPrescription,
        category,
        badge,
        description: product.description || 'Quality pharmaceutical product from Jaya Medical Store.',
        composition: product.composition || product.brand || '',
        stock: product.stock ?? 0,
        is_active: product.is_active ?? true,
    };
};

export const normalizeProducts = (productsList = []) => {
    if (!Array.isArray(productsList)) return [];
    return productsList.map(normalizeProduct).filter(Boolean);
};
