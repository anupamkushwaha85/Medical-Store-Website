import { useState } from 'react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Icon from './Icons';

const initialForm = {
    patient_name: '',
    phone: '',
    address: '',
    notes: '',
};

const emailConfigured =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_PRESCRIPTION_TEMPLATE &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function PrescriptionUpload() {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [sending, setSending] = useState(false);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const setPrescriptionFile = (event) => {
        const selected = event.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

    const removeFile = () => setFile(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            toast.error('Please add a prescription file.');
            return;
        }

        setSending(true);
        try {
            if (emailConfigured) {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_PRESCRIPTION_TEMPLATE,
                    {
                        ...form,
                        file_name: file.name,
                    },
                    { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
                );
            }

            toast.success('Prescription submitted successfully.');
            setForm(initialForm);
            setFile(null);
            event.currentTarget.reset();
        } catch (error) {
            console.error(error);
            toast.error('Prescription submission failed. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const inputBaseClass =
        'w-full rounded-[14px] border border-outline-variant/40 bg-surface-container-lowest px-4 py-3.5 text-[15px] text-on-background outline-none transition-all duration-200 placeholder:text-outline/50 focus:border-primary focus:ring-2 focus:ring-primary/10';

    return (
        <div className="rounded-[32px] border border-outline-variant/30 bg-surface-container-lowest p-7 shadow-[0_20px_60px_rgba(0,104,95,0.06)] sm:p-9">
            {/* Header */}
            <div className="mb-8">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-primary">
                    <Icon name="ClipboardList" className="h-3.5 w-3.5" />
                    Prescription Form
                </span>
                <h2 className="mt-3 font-display text-[28px] font-semibold leading-[1.2] text-on-background sm:text-[32px]">
                    Share your prescription securely
                </h2>
                <p className="mt-3 max-w-lg text-[14px] leading-[1.7] text-on-surface-variant">
                    Upload a JPG, PNG, or PDF and provide details so the pharmacy can prepare your order with care.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File drop zone */}
                <div
                    onDragOver={(event) => {
                        event.preventDefault();
                        setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    className={`group relative rounded-[22px] border-2 border-dashed p-8 transition-all duration-300 ${
                        dragActive
                            ? 'border-primary bg-primary/[0.06] shadow-[0_0_0_4px_rgba(0,104,95,0.08)]'
                            : file
                              ? 'border-primary/30 bg-primary/[0.03]'
                              : 'border-outline-variant/50 bg-surface-container-low hover:border-primary/30 hover:bg-primary/[0.02]'
                    }`}
                >
                    {!file ? (
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-4 text-center">
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                                <Icon name="Upload" className="h-7 w-7" />
                            </span>
                            <div>
                                <span className="text-[16px] font-semibold text-on-background">
                                    Drop your prescription here
                                </span>
                                <span className="mt-1 block text-[13px] text-on-surface-variant">
                                    or <span className="font-medium text-primary underline underline-offset-2">browse files</span> to upload
                                </span>
                            </div>
                            <div className="flex gap-2">
                                {['JPG', 'PNG', 'PDF'].map((fmt) => (
                                    <span
                                        key={fmt}
                                        className="rounded-full border border-outline-variant/30 bg-surface-container-lowest px-2.5 py-0.5 text-[11px] font-semibold text-on-surface-variant"
                                    >
                                        {fmt}
                                    </span>
                                ))}
                            </div>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                className="hidden"
                                onChange={setPrescriptionFile}
                            />
                        </label>
                    ) : (
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                                    <Icon name="FileText" className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[14px] font-semibold text-on-background">{file.name}</p>
                                    <p className="text-[12px] text-on-surface-variant">
                                        {(file.size / 1024).toFixed(1)} KB · Ready to upload
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/40 text-on-surface-variant transition-colors duration-200 hover:border-error/40 hover:bg-error/8 hover:text-error"
                            >
                                <Icon name="X" className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Name & Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                        <span className="text-[13px] font-semibold text-on-surface-variant">Patient Name</span>
                        <input
                            name="patient_name"
                            value={form.patient_name}
                            onChange={onChange}
                            required
                            placeholder="Full name"
                            className={inputBaseClass}
                        />
                    </label>
                    <label className="space-y-2">
                        <span className="text-[13px] font-semibold text-on-surface-variant">Phone Number</span>
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            required
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className={inputBaseClass}
                        />
                    </label>
                </div>

                {/* Address */}
                <label className="block space-y-2">
                    <span className="text-[13px] font-semibold text-on-surface-variant">Delivery Address</span>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        rows="3"
                        required
                        placeholder="House no., street, locality, city, pincode"
                        className={inputBaseClass + ' resize-none'}
                    />
                </label>

                {/* Notes */}
                <label className="block space-y-2">
                    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-on-surface-variant">
                        Notes
                        <span className="text-[11px] font-normal text-outline">(optional)</span>
                    </span>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={onChange}
                        rows="3"
                        placeholder="Mention dosage timing, brand preference, or any delivery note."
                        className={inputBaseClass + ' resize-none'}
                    />
                </label>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold tracking-[0.03em] text-on-primary shadow-[0_10px_30px_rgba(0,104,95,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_16px_40px_rgba(0,104,95,0.22)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                >
                    {sending ? (
                        <>
                            <Icon name="RefreshCw" className="h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            Submit Prescription
                            <Icon name="ArrowRight" className="h-4 w-4" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}