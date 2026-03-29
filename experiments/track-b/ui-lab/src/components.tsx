import React, { useState, useEffect, useRef } from 'react';

export const Modal = ({ isOpen, onClose, title, children }: any) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const el = ref.current;
        if (!el) return;

        // Focus trap implementation
        const focusable = Array.from(el.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last?.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first?.focus();
                    }
                }
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        el.addEventListener('keydown', handleKeyDown);
        first?.focus();
        return () => el.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={ref}>
            <h2 id="modal-title">{title}</h2>
            {children}
            <button onClick={onClose} aria-label="Close modal">Close</button>
        </div>
    );
};

export const Dropdown = ({ options }: { options: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    return (
        <div>
            <button
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selected}
            </button>
            {isOpen && (
                <ul role="listbox" aria-activedescendant={selected}>
                    {options.map((opt) => (
                        <li
                            key={opt}
                            role="option"
                            id={opt}
                            aria-selected={selected === opt}
                            onClick={() => { setSelected(opt); setIsOpen(false); }}
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export const Tabs = ({ tabs }: { tabs: { id: string, label: string, content: React.ReactNode }[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        let newIndex = activeIndex;
        if (e.key === 'ArrowRight') {
            newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        } else {
            return;
        }
        setActiveIndex(newIndex);
        tabsRef.current[newIndex]?.focus();
    };

    return (
        <div>
            <div role="tablist" aria-label="Sample Tabs">
                {tabs.map((tab, i) => (
                    <button
                        key={tab.id}
                        role="tab"
                        aria-selected={activeIndex === i}
                        aria-controls={`panel-${tab.id}`}
                        id={`tab-${tab.id}`}
                        ref={(el) => { tabsRef.current[i] = el; }}
                        onClick={() => setActiveIndex(i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        tabIndex={activeIndex === i ? 0 : -1}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {tabs.map((tab, i) => (
                <div
                    key={tab.id}
                    role="tabpanel"
                    id={`panel-${tab.id}`}
                    aria-labelledby={`tab-${tab.id}`}
                    hidden={activeIndex !== i}
                    tabIndex={0}
                >
                    {tab.content}
                </div>
            ))}
        </div>
    );
};

export const Form = () => (
    <form noValidate onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" aria-required="true" required />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <button type="submit">Submit</button>
    </form>
);

export const Toast = ({ message, type = 'info' }: { message: string, type?: 'info' | 'error' }) => (
    <div role={type === 'error' ? 'alert' : 'status'} aria-live={type === 'error' ? 'assertive' : 'polite'}>
        {message}
    </div>
);