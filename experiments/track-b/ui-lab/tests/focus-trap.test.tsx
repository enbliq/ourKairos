import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, Tabs } from '../src/components';

it('traps focus inside the modal', async () => {
    const user = userEvent.setup();
    render(
        <div>
            <button id="outside">Outside</button>
            <Modal isOpen={true} title="Test Modal" onClose={() => { }}>
                <button id="inside1">Inside 1</button>
                <button id="inside2">Inside 2</button>
            </Modal>
        </div>
    );

    const inside1 = screen.getByText('Inside 1');
    const inside2 = screen.getByText('Inside 2');
    const close = screen.getByText('Close');

    inside1.focus();
    expect(document.activeElement).toBe(inside1);

    await user.tab();
    expect(document.activeElement).toBe(inside2);

    await user.tab();
    expect(document.activeElement).toBe(close);

    // Tab again should loop back to first interactive element
    await user.tab();
    expect(document.activeElement).toBe(inside1);

    // Shift + Tab should loop back to last element
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(close);
});

it('Tabs can be navigated with keyboard arrows', async () => {
    const user = userEvent.setup();
    render(
        <Tabs tabs={[
            { id: 't1', label: 'Tab 1', content: 'Content 1' },
            { id: 't2', label: 'Tab 2', content: 'Content 2' }
        ]} />
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

    tab1.focus();
    expect(document.activeElement).toBe(tab1);

    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(tab2);
    expect(tab2.getAttribute('aria-selected')).toBe('true');
});