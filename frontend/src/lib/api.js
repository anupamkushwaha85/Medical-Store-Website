const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

const parseResponse = async (response) => {
    const text = await response.text();

    if (!text) {
        return {};
    }

    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
};

export const apiUrl = (path) => `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

export const apiRequest = async (path, options = {}) => {
    const isFormData = options.body instanceof FormData;

    const response = await fetch(apiUrl(path), {
        credentials: 'include',
        ...options,
        headers: isFormData
            ? options.headers
            : {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
    });

    const data = await parseResponse(response);

    if (!response.ok) {
        throw new Error(data?.message || data?.error || 'Request failed');
    }

    return data;
};