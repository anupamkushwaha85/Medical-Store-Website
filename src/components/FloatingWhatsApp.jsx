import { storeInfo } from '../data/products';
import Icon from './Icons';

export default function FloatingWhatsApp() {
    return (
        <a
            href={storeInfo.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-3 rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-1"
            aria-label="Chat on WhatsApp"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Icon name="MessageCircle" className="h-5 w-5" />
            </span>
            WhatsApp
        </a>
    );
}