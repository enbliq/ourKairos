import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import axe from 'axe-core';
import { Modal, Dropdown, Tabs, Form, Toast } from '../src/components';
import { auditResults } from './setup';

async function checkA11y(container: HTMLElement, componentName: string) {
    const results = await axe.run(container);
    auditResults.push({ componentName, violations: results.violations });
    expect(results.violations).toEqual([]);
}

describe('A11y Component Checks', () => {
    it('Modal is accessible', async () => {
        const { container } = render(
            <Modal isOpen={true} title="Test Modal" onClose={() => { }}>
                <p>Modal content</p>
            </Modal>
        );
        await checkA11y(container, 'Modal');
    });

    it('Dropdown is accessible', async () => {
        const { container } = render(<Dropdown options={['Option A', 'Option B']} />);
        await checkA11y(container, 'Dropdown');
    });

    it('Tabs are accessible', async () => {
        const { container } = render(
            <Tabs tabs={[
                { id: 't1', label: 'Tab 1', content: 'Content 1' },
                { id: 't2', label: 'Tab 2', content: 'Content 2' }
            ]} />
        );
        await checkA11y(container, 'Tabs');
    });

    it('Form is accessible', async () => {
        const { container } = render(<Form />);
        await checkA11y(container, 'Form');
    });

    it('Toast is accessible', async () => {
        const { container } = render(<Toast message="Lab toast rendered" type="info" />);
        await checkA11y(container, 'Toast');
    });
});