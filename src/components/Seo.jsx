import { useEffect } from 'react';

export default function Seo({ title, description }) {
    useEffect(() => {
        if (title) {
            document.title = `${title} | Yashi Medical Store`;
        }

        if (description) {
            let meta = document.querySelector('meta[name="description"]');
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = 'description';
                document.head.appendChild(meta);
            }
            meta.content = description;
        }

        const setMeta = (property, content) => {
            if (!content) {
                return;
            }

            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.content = content;
        };

        setMeta('og:title', title ? `${title} | Yashi Medical Store` : 'Yashi Medical Store');
        setMeta('og:description', description);
        setMeta('twitter:title', title ? `${title} | Yashi Medical Store` : 'Yashi Medical Store');
        setMeta('twitter:description', description);
    }, [title, description]);

    return null;
}