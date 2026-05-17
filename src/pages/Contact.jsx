import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Icon from '../components/Icons';
import { ownerProfile, storeInfo } from '../data/products';

const initialForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

const emailConfigured =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSending(true);
        try {
            if (emailConfigured) {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
                    form,
                    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
                );
            }
            toast.success('Message sent successfully.');
            setForm(initialForm);
        } catch (error) {
            console.error(error);
            toast.error('Message could not be sent. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const inputClass =
        'w-full bg-transparent border-0 border-b border-outline-variant pb-2 focus:ring-0 focus:border-primary transition-colors duration-300 text-[16px] leading-[1.6] text-on-surface px-0 outline-none';

    return (
        <>
            <Seo
                title="Contact"
                description="Contact Jaya Medical Store for orders, prescription support, and store information."
            />

            <main className="mx-auto max-w-[1280px] px-5 pt-16 pb-16 sm:px-6 md:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-14"
                >
                    <h1
                        className="font-display text-[52px] font-bold leading-[1.1] text-primary sm:text-[64px]"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Contact Us
                    </h1>
                    <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                        Experience clinical excellence and personalized care. Reach out to us for prescription inquiries, wellness advice, or general information.
                    </p>
                </motion.div>

                {/* Layout Grid: Form (7) + Info (5) */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-12"
                >
                    {/* ─── Left Column: Contact Form ─── */}
                    <div className="md:col-span-7">
                        <div className="h-full rounded-[8px] border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,104,95,0.03)] md:p-12">
                            <h2 className="mb-8 font-display text-[32px] font-semibold leading-[1.3] text-on-surface">
                                Send a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="flex h-[calc(100%-4rem)] flex-col justify-between space-y-8">
                                <div className="space-y-8">
                                    {/* Name + Email */}
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="contact-name"
                                                className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant"
                                            >
                                                Name
                                            </label>
                                            <input
                                                id="contact-name"
                                                name="name"
                                                value={form.name}
                                                onChange={onChange}
                                                required
                                                placeholder="Jane Doe"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contact-email"
                                                className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant"
                                            >
                                                Email
                                            </label>
                                            <input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={onChange}
                                                required
                                                placeholder="jane@example.com"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone + Subject */}
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="contact-phone"
                                                className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant"
                                            >
                                                Phone
                                            </label>
                                            <input
                                                id="contact-phone"
                                                name="phone"
                                                type="tel"
                                                value={form.phone}
                                                onChange={onChange}
                                                required
                                                placeholder="+91 00000 00000"
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="contact-subject"
                                                className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant"
                                            >
                                                Subject
                                            </label>
                                            <input
                                                id="contact-subject"
                                                name="subject"
                                                value={form.subject}
                                                onChange={onChange}
                                                required
                                                placeholder="Prescription Inquiry"
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="contact-message"
                                            className="mb-2 block text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            value={form.message}
                                            onChange={onChange}
                                            required
                                            rows="4"
                                            placeholder="How can we assist you today?"
                                            className={inputClass + ' resize-none'}
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-tertiary/90 px-8 py-4 text-[14px] font-medium tracking-[0.05em] text-on-tertiary shadow-[0_8px_32px_rgba(117,87,23,0.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-tertiary hover:shadow-[0_12px_40px_rgba(117,87,23,0.25)] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                                    >
                                        {sending ? 'Sending...' : 'Send Message'}
                                        <Icon name="ArrowRight" className="h-[18px] w-[18px]" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* ─── Right Column: Info + Owner ─── */}
                    <div className="flex flex-col gap-6 md:col-span-5">
                        {/* Store Details Card */}
                        <div className="flex-grow rounded-[8px] border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-[0_4px_20px_rgba(0,104,95,0.03)]">
                            <h3 className="mb-6 font-display text-[24px] font-medium leading-[1.4] text-primary">
                                Store Details
                            </h3>

                            <div className="space-y-6">
                                <InfoRow icon="MapPin" label="Address" value={storeInfo.address} />
                                <InfoRow icon="Clock3" label="Hours" value={storeInfo.hours} />
                                <InfoRow
                                    icon="Phone"
                                    label="Phone"
                                    value={storeInfo.phone}
                                    href={`tel:${storeInfo.phone.replace(/\s/g, '')}`}
                                />
                                <InfoRow
                                    icon="Mail"
                                    label="Email"
                                    value={storeInfo.email}
                                    href={`mailto:${storeInfo.email}`}
                                />
                            </div>

                            {/* WhatsApp Button */}
                            <div className="mt-8 border-t border-outline-variant/20 pt-8">
                                <a
                                    href={storeInfo.whatsapp}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/[0.06] px-6 py-3 text-[14px] font-medium tracking-[0.05em] text-primary shadow-[0_8px_32px_rgba(0,104,95,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-[0_12px_40px_rgba(0,104,95,0.14)]"
                                >
                                    <Icon name="MessageCircle" className="h-5 w-5" />
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Owner Card */}
                        <div className="rounded-[8px] border border-outline-variant/30 bg-secondary-fixed/30 p-6 shadow-[0_4px_20px_rgba(0,104,95,0.03)]">
                            <div className="flex items-center gap-6">
                                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-surface-container-lowest">
                                    <img
                                        src="/images/owner.jpg"
                                        alt={`Portrait of ${ownerProfile.name}`}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-display text-[24px] font-medium leading-[1.4] text-on-surface">
                                        {ownerProfile.name}
                                    </h4>
                                    <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.08em] text-primary">
                                        Proprietor
                                    </p>
                                    <p className="text-[16px] italic leading-[1.6] text-on-surface-variant">
                                        &quot;{ownerProfile.quote}&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Google Maps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative mt-16 h-[400px] w-full overflow-hidden rounded-[8px] border border-outline-variant/30 shadow-[0_4px_20px_rgba(0,104,95,0.03)]"
                >
                    <iframe
                        title="Jaya Medical Store location"
                        src={storeInfo.mapEmbedUrl}
                        className="h-full w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Map overlay for style */}
                    <div className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-multiply" />
                </motion.div>
            </main>
        </>
    );
}

function InfoRow({ icon, label, value, href }) {
    const content = href ? (
        <a href={href} className="text-[16px] leading-[1.6] text-on-surface transition-colors hover:text-primary">
            {value}
        </a>
    ) : (
        <p className="text-[16px] leading-[1.6] text-on-surface">{value}</p>
    );

    return (
        <div className="flex items-start gap-4">
            <span className="mt-1 text-tertiary">
                <Icon name={icon} className="h-6 w-6" />
            </span>
            <div>
                <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.08em] text-on-surface-variant">
                    {label}
                </p>
                {content}
            </div>
        </div>
    );
}