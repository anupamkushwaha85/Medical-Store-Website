import { useState } from 'react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Icon from '../components/Icons';
import { faqItems } from '../data/products';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <>
            <Seo title="FAQ" description="Frequently asked questions about delivery, prescriptions, returns, payment methods, and WhatsApp ordering." />
            <section className="page-shell section-pad">
                <Reveal className="space-y-5">
                    <p className="kicker">FAQ</p>
                    <h1 className="display-heading text-4xl sm:text-5xl">Quick answers to common store questions</h1>
                    <p className="max-w-2xl text-sm leading-7 text-slate-600">
                        The most common questions are grouped below so visitors can find the important details quickly.
                    </p>
                </Reveal>
            </section>

            <section className="page-shell pb-16 sm:pb-20 lg:pb-24">
                <Reveal className="mx-auto max-w-4xl space-y-4">
                    {faqItems.map((item, index) => {
                        const isOpen = index === openIndex;
                        return (
                            <article key={item.question} className="glass-card overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                                    aria-expanded={isOpen}
                                >
                                    <span className="font-display text-2xl text-slate-900">{item.question}</span>
                                    <Icon name="ChevronDown" className={`h-5 w-5 text-brand-700 transition ${isOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isOpen ? (
                                    <div className="px-6 pb-6 text-sm leading-7 text-slate-600">{item.answer}</div>
                                ) : null}
                            </article>
                        );
                    })}
                </Reveal>
            </section>
        </>
    );
}