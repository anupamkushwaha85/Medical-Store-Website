import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Icon from '../components/Icons';
import { storeInfo } from '../data/products';

export default function CancelOrder() {
    return (
        <>
            <Seo title="Cancellation & Refund Policy" description="Order cancellation and refund policy for Jaya Medical Store." />

            <main className="mx-auto max-w-[1000px] px-5 pt-16 pb-24 sm:px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <h1 className="font-display text-[44px] font-bold leading-[1.15] text-on-background sm:text-[56px] tracking-tight">
                        Cancellation Policy
                    </h1>
                    <p className="mt-4 max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
                        We understand that plans change. Review our policy below to understand how and when you can cancel your order.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                    className="mt-12 space-y-10"
                >
                    {/* Highlighted Policy Box */}
                    <div className="rounded-[24px] border border-tertiary/20 bg-tertiary/5 p-8 shadow-sm md:p-10">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-tertiary text-on-tertiary">
                                <Icon name="Clock" className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="font-display text-[28px] font-semibold text-on-background">
                                    The 2-Hour Cancellation Window
                               </h2>
                                <p className="mt-3 text-[16px] leading-[1.7] text-on-surface-variant">
                                    Orders can be cancelled free of charge <strong>within 2 hours</strong> of placement. Since we process and dispatch medical supplies quickly to ensure timely delivery, we cannot accept cancellations once an order has left our pharmacy.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* How to Cancel */}
                        <div className="rounded-[24px] border border-white/40 bg-white/35 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                            <h3 className="font-display text-[24px] font-semibold text-on-background">
                                How to Cancel
                            </h3>
                            <p className="mt-4 text-[16px] leading-[1.7] text-on-surface-variant">
                                To cancel your order, you must provide your order details directly to our support team within the 2-hour window. Please share your Name and Order ID using one of the methods below:
                            </p>
                            
                            <div className="mt-6 space-y-4">
                                <a 
                                    href={storeInfo.whatsapp} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex w-full items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary">
                                        <Icon name="MessageCircle" className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-on-background">WhatsApp Us</p>
                                        <p className="text-[13px] text-on-surface-variant">Fastest response time</p>
                                    </div>
                                </a>

                                <a 
                                    href={`tel:${storeInfo.phone.replace(/\s/g, '')}`}
                                    className="flex w-full items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container-low"
                                >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-variant text-on-surface">
                                        <Icon name="Phone" className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-on-background">Call Support</p>
                                        <p className="text-[13px] text-on-surface-variant">{storeInfo.phone}</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Refunds & Exceptions */}
                        <div className="rounded-[24px] border border-white/40 bg-white/35 p-8 shadow-[0_14px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl">
                            <h3 className="font-display text-[24px] font-semibold text-on-background">
                                Refunds & Exceptions
                            </h3>
                            <ul className="mt-4 space-y-4 text-[16px] leading-[1.7] text-on-surface-variant">
                                <li className="flex items-start gap-3">
                                    <Icon name="CheckCircle2" className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                    <span>If you cancel within 2 hours, 95% of your pre-paid amount will be refunded to your original payment method within 3-5 business days (a 5% deduction applies due to payment gateway processing charges).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon name="AlertCircle" className="mt-1 h-5 w-5 flex-shrink-0 text-tertiary" />
                                    <span>Temperature-sensitive medicines (like insulin) cannot be returned or cancelled once dispatched under any circumstances due to strict safety regulations.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Icon name="Ban" className="mt-1 h-5 w-5 flex-shrink-0 text-error" />
                                    <span>Orders cancelled after the 2-hour window, or orders refused at the time of delivery, may be subject to a nominal delivery cancellation fee.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </main>
        </>
    );
}
