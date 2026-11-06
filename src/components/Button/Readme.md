The `Button` component is used to trigger actions, navigate between pages, or wrap custom elements with Tyk UI button styles. It supports standard HTML button behaviors, hyperlink rendering when `href` is provided, and integration with client-side routers via `customButton`.

### Installation & Import

```js static
import { Button } from '@tyk-technologies/tyk-ui';
// or direct component import:
import Button from '@tyk-technologies/tyk-ui/src/components/Button';
```

---

### Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `node` | — | Content of the button (text, elements, or icons). |
| `theme` | `string` | `''` | Theme style variant (see Themes below). |
| `size` | `'sm' \| 'md' \| 'lg' \| 'fit'` | `'md'` | Size of the button. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type attribute (ignored when `href` is passed). |
| `disabled` | `boolean` | `false` | Disables the button and prevents interaction. |
| `href` | `string` | — | When provided, renders the component as an `<a>` tag with navigation. |
| `onClick` | `function` | — | Callback invoked when the button is clicked: `(event) => void`. |
| `iconType` | `string` | — | Icon name passed to the internal `Icon` component. |
| `iconFamily` | `string` | — | Icon family for the icon component (`'tykon'` or FontAwesome). |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Placement of the icon relative to the label. |
| `iconOnly` | `boolean` | `false` | Applies icon-only padding and styling when no label is present. |
| `display` | `string` | `''` | Layout display mode (e.g., `'block'` or `'inline'`). |
| `noStyle` | `boolean` | `false` | Strips default button styling while preserving behavior. |
| `customButton` | `element` | — | Clones and renders a custom React element with button classes and state applied. |
| `className` | `string` | `''` | Additional custom CSS classes. |
| `id` | `string` | — | HTML `id` attribute. |
| `ref` | `ref` | — | Forwarded ref to the underlying DOM node (`<button>` or `<a>`). |
| `...rest` | `any` | — | Any other standard HTML attributes passed to the element. |

---

### Themes & Variants

Buttons support three visual styles across six semantic themes, plus a `noStyle` bare variant:

- **Solid (Default):** High visual emphasis. Use `primary` for the main call to action on a screen.
- **Outline:** Medium visual emphasis. Best for secondary actions, cancellations, or filters.
- **Link:** Low visual emphasis. Renders with link aesthetics while keeping button behaviors and padding.
- **No Style (`noStyle`):** Strips all background and border styling, allowing custom styling or embedding into clean interfaces.

#### Solid Themes

```js
<>
  <Button theme="primary">Primary</Button>
  <Button theme="secondary">Secondary</Button>
  <Button theme="success">Success</Button>
  <Button theme="danger">Danger</Button>
  <Button theme="warning">Warning</Button>
  <Button theme="info">Info</Button>
</>
```

#### Outline Themes

```js
<>
  <Button theme="primary-outline">Primary Outline</Button>
  <Button theme="secondary-outline">Secondary Outline</Button>
  <Button theme="success-outline">Success Outline</Button>
  <Button theme="danger-outline">Danger Outline</Button>
  <Button theme="warning-outline">Warning Outline</Button>
  <Button theme="info-outline">Info Outline</Button>
</>
```

#### Link Themes

```js
<>
  <Button theme="primary-link">Primary Link</Button>
  <Button theme="secondary-link">Secondary Link</Button>
  <Button theme="success-link">Success Link</Button>
  <Button theme="danger-link">Danger Link</Button>
  <Button theme="warning-link">Warning Link</Button>
  <Button theme="info-link">Info Link</Button>
  <Button>Default (No Theme)</Button>
</>
```

#### No-Style Variant

Use `noStyle` to remove standard button borders, backgrounds, and shadows.

```js
<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <Button noStyle onClick={() => alert('No-style button clicked')}>
    Custom No-Style Action
  </Button>
  <Button noStyle iconOnly iconType="gear" title="Settings" />
</div>
```

---

### Sizes

`Button` comes in three standard sizes: `sm` (small), `md` (medium, default), and `lg` (large).
You can also use `size="fit"` to fit the button dimensions strictly to its content.

```js
<>
  <Button size="sm" theme="primary">Small (sm)</Button>
  <Button size="md" theme="primary">Medium (md - default)</Button>
  <Button size="lg" theme="primary">Large (lg)</Button>
  <Button size="fit" theme="secondary-outline">Fit Content</Button>
</>
```

---

### Icons

Buttons can include icons alongside text labels or function as standalone icon-only buttons.
Icons are rendered using Tyk UI's `Icon` component. By default, icons use the FontAwesome library; you can also switch to the `tykon` icon family.

#### Icon Positions

Icons can be aligned to the left (default) or right of the button label using `iconPosition`.

```js
<>
  <Button theme="primary" iconType="plus" iconPosition="left">
    Add Item
  </Button>
  <Button theme="secondary" iconType="chevron-right" iconPosition="right">
    Continue
  </Button>
  <Button theme="success" iconType="check">
    Save Changes
  </Button>
  <Button theme="danger-outline" iconType="trash">
    Delete
  </Button>
</>
```

#### Icon-Only Buttons

Use `iconOnly={true}` to create compact, square buttons suitable for toolbars, action columns in tables, or header actions.
Always provide an accessible label (`title` or `aria-label`) when using `iconOnly`.

```js
<>
  <Button theme="primary" iconOnly iconType="plus" title="Add item" />
  <Button theme="secondary" iconOnly iconType="pencil" title="Edit" />
  <Button theme="danger-outline" iconOnly iconType="trash" title="Delete" />
  <Button theme="secondary-link" iconOnly iconType="copy" title="Copy to clipboard" />
</>
```

#### Tykon Icon Family

To use Tyk's custom Tykon icon font, set `iconFamily="tykon"`.

```js
<>
  <Button theme="primary" iconFamily="tykon" iconType="reload">
    Refresh
  </Button>
  <Button theme="secondary" iconFamily="tykon" iconType="settings">
    Configure
  </Button>
  <Button theme="secondary-outline" iconFamily="tykon" iconOnly iconType="download" title="Download" />
</>
```

---

### States

#### Disabled State

Setting `disabled={true}` disables user interaction, prevents `onClick` callbacks, and applies dimmed styling.

```js
<>
  <Button theme="primary" disabled>Solid Disabled</Button>
  <Button theme="secondary-outline" disabled>Outline Disabled</Button>
  <Button theme="primary-link" disabled>Link Disabled</Button>
  <Button theme="primary" disabled iconType="lock">Disabled with Icon</Button>
  <Button theme="secondary" disabled iconOnly iconType="gear" title="Disabled settings" />
</>
```

#### Interactive Click Handling

Pass an `onClick` callback to handle user click events.

```jsx
import React, { useState } from 'react';

const ClickCounterExample = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Button
        theme="primary"
        iconType="plus"
        onClick={() => setCount((c) => c + 1)}
      >
        Increment
      </Button>
      <Button
        theme="secondary-outline"
        iconType="arrow-rotate-left"
        onClick={() => setCount(0)}
        disabled={count === 0}
      >
        Reset
      </Button>
      <span>Clicks: <strong>{count}</strong></span>
    </div>
  );
};

<ClickCounterExample />
```

---

### Navigation & Links (`href`)

When the `href` prop is provided, `Button` renders a semantic HTML `<a>` anchor tag styled as a button. This is ideal for external links or document downloads while preserving button aesthetics.

```js
<>
  <Button
    theme="primary"
    href="https://tyk.io/docs/"
    target="_blank"
    rel="noopener noreferrer"
    iconType="arrow-up-right-from-square"
    iconPosition="right"
  >
    Visit Documentation
  </Button>
  <Button
    theme="secondary-outline"
    href="https://github.com/TykTechnologies/tyk"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub Repo
  </Button>
</>
```

---

### Custom Button Component (`customButton`)

When working with client-side routing libraries such as React Router (`<Link>` / `<NavLink>`), use the `customButton` prop. `Button` clones the passed element and injects the computed button classes and `disabled` state.

```jsx
import React from 'react';

// Example custom link component simulating React Router's Link
const CustomLink = ({ className, children, ...rest }) => (
  <a className={className} href="/dashboard" {...rest}>
    {children}
  </a>
);

<Button
  theme="primary"
  iconType="house"
  customButton={<CustomLink />}
>
  Go to Dashboard
</Button>
```

---

### Display & Layout

By default, buttons render as `inline-block` elements. To render a full-width block button, set `display="block"`.

```js
<div style={{ maxWidth: '320px' }}>
  <Button theme="primary" display="block">
    Full Width Action
  </Button>
</div>
```

---

### UX Guidelines & Best Practices

To ensure consistent user experiences and accessible interfaces across all Tyk applications, adhere to the following design and interaction guidelines when using `Button`.

#### 1. Hierarchy & Visual Prominence

Buttons must establish a clear visual hierarchy that guides users toward the intended action:

- **Primary (`theme="primary"`):**
  - **Single Primary Rule:** Use at most **one primary button per view, page header, form, or dialog**. The primary button represents the dominant, decisive action (e.g., "Create API", "Save Changes", "Deploy").
  - Multiple primary buttons create visual noise, cause decision fatigue, and dilute the prominence of key workflows.
- **Secondary / Outline (`theme="secondary"` or `*-outline`):**
  - Use for secondary or alternative actions supporting the primary goal (e.g., "Cancel", "Back", "Save as Draft", "Export").
  - Outline buttons provide clear interaction boundaries without competing visually with the primary action.
- **Link (`theme="*-link"`):**
  - Use for tertiary, low-emphasis actions or non-critical secondary utilities (e.g., "View Details", "Learn More", "Reset to Default").
  - Ideal for dense lists, table cells, or inline card actions where filled or bordered buttons produce excessive clutter.
- **No-Style (`noStyle`):**
  - Reserved for custom interactive wrappers, embedded toolbar icons, or specialized layout controls that require native button accessibility without Tyk UI default button chrome.

#### 2. Action Semantics vs. Navigation Semantics

Selecting the correct semantic element ensures accessibility, keyboard navigability, and native browser behavior:

- **Triggering an Action (Use standard `<Button>` with `onClick`):**
  - Use when the interaction executes logic, alters application state, submits form data (`type="submit"`), or toggles an interface element (opening a modal, drawer, or dropdown).
  - Screen readers identify this as a "button", and keyboard users can trigger it with both `Enter` and `Space`.
- **Navigating to a URL (Use `href` or `customButton`):**
  - Use `href` when navigating to an external website, document, or non-SPA page.
  - Use `customButton` (e.g., wrapping React Router's `<Link>` or `<NavLink>`) for single-page application client-side route transitions.
  - Screen readers announce this as a "link", keyboard users activate it using `Enter`, and browser behaviors such as "Open in new tab" (middle-click / Cmd-click) function as expected.
  - **Rule:** Never use a button with an `onClick` handler that calls `window.location` or history methods when a link is semantically appropriate.

#### 3. Destructive Actions

Destructive operations permanently alter or delete data and require deliberate visual signaling:

- **Visual Variant:**
  - Use `theme="danger"` for irreversible, critical actions (e.g., "Delete API", "Revoke Certificate", "Drop Database").
  - Use `theme="danger-outline"` for low-risk, reversible removals (e.g., "Remove Tag", "Clear Filter").
- **Confirmation Patterns:**
  - Critical destructive operations should **never** execute immediately on a single click without confirmation.
  - Pair destructive buttons with a confirmation prompt (such as Tyk UI's `Confirm` or `Modal` component) requiring the user to verify their intent.
  - In confirmation dialogs, style the final confirmation action with `theme="danger"` and the abort action with `theme="secondary-outline"` or `theme="secondary-link"`.
- **Layout Placement:**
  - In form footers or dialog action bars, physically separate destructive buttons from positive confirmation buttons (e.g., placing the destructive button on the left edge and the save/cancel actions on the right edge) to prevent accidental misclicks.

#### 4. Sizing & Layout Spacing

- **Size Variants:**
  - **`size="md"` (Default):** Standard sizing for most UI contexts: page forms, modal dialog footers, cards, and page toolbars.
  - **`size="sm"`:** Compact sizing designed for dense tables, table row action menus, filter bars, and card headers where space is limited.
  - **`size="lg"`:** Large sizing intended for high-impact landing areas, hero banners, setup wizards, or primary onboarding flows.
  - **`size="fit"`:** Shrinks the button padding strictly to fit its content, useful inside constrained controls or embedded widgets.
- **Consistency & Alignment:**
  - Keep button sizes uniform within the same container or action bar. Never mix `sm` and `lg` buttons in the same button group or form footer.
  - Provide adequate spacing between adjacent buttons (recommended `8px` or `12px` gap) to avoid accidental misclicks, particularly on touch devices. Group cohesive actions with `ButtonGroup`.
  - For mobile views or narrow modal sidebars, set `display="block"` so buttons expand full-width and provide comfortable touch targets.

#### 5. Icon Usage & Accessibility

- **Icon Placement:**
  - **`iconPosition="left"` (Default):** Recommended for action buttons where the icon reinforces the verb or object (e.g., `plus` for "Add Endpoint", `trash` for "Delete", `check` for "Save"). Icons on the left aid quick visual scanning.
  - **`iconPosition="right"`:** Recommended for directional navigation or continuation actions (e.g., `chevron-right` for "Next Step", `arrow-up-right-from-square` for external links).
- **Icon-Only Buttons (`iconOnly`):**
  - **Mandatory Accessible Label:** Whenever `iconOnly` is enabled, you **must** supply a descriptive label via `title` or `aria-label` (e.g., `<Button iconOnly iconType="trash" title="Delete API" aria-label="Delete API" />`). Screen readers cannot interpret an icon without text, leading to unannounced, inaccessible buttons.
  - **Clarity:** Only use `iconOnly` for well-established, unambiguous conventions (e.g., search, edit, delete, copy, settings, close). For complex or proprietary actions, always pair the icon with visible text.
  - **Tooltips:** In desktop interfaces, wrapping `iconOnly` buttons with a `Tooltip` enhances usability by providing visible hover and focus context.

#### 6. States & Feedback

- **Interactive Feedback:**
  - Tyk UI buttons include built-in hover, active, and focus styles. Always preserve focus rings for keyboard navigation to comply with WCAG 2.1 (Focus Visible).
- **Disabled State (`disabled`):**
  - Indicates that an action cannot currently be performed (e.g., required form fields are missing, or user lacks role permissions).
  - **UX Caution:** Disabled buttons suppress pointer events and keyboard focus, preventing screen reader users from discovering the button or understanding why it is inactive.
  - **Best Practice:** When disabling an action, pair the button with an explanation (such as a `Tooltip`, `InfoNote`, or helper text) clarifying the prerequisite needed to enable it. Alternatively, keep the button interactive and display inline validation messages when clicked if the prerequisite is non-obvious.
- **Loading & Asynchronous Tasks:**
  - Disable buttons during in-flight asynchronous operations to prevent duplicate submissions or duplicate API requests.
  - Provide immediate feedback during async tasks, such as showing an inline loading spinner or updating button text (e.g., "Saving...") so users know their action is being processed.

#### 7. Do's and Don'ts

| Do | Don't |
| :--- | :--- |
| **Do** limit each screen or dialog to a single `primary` button. | **Don't** use multiple `primary` buttons on the same screen, which creates visual noise. |
| **Do** write action-oriented button labels starting with a verb (e.g., "Create API", "Save Changes", "Delete User"). | **Don't** use ambiguous or generic labels like "OK", "Click Here", or "Yes". |
| **Do** always provide `title` or `aria-label` when using `iconOnly` buttons. | **Don't** render `iconOnly` buttons without accessible text for screen readers. |
| **Do** require explicit confirmation (modal or prompt) for irreversible destructive actions using `theme="danger"`. | **Don't** perform permanent deletions immediately on click without confirmation. |
| **Do** use `href` or `customButton` (React Router `<Link>`) for page transitions and external URLs. | **Don't** trigger page navigation via `onClick` handlers on standard buttons. |
| **Do** maintain consistent button sizes (`sm`, `md`, or `lg`) across related action groups. | **Don't** mix disparate button sizes within the same toolbar or form footer. |
| **Do** explain why an action is disabled via helper text or tooltips. | **Don't** leave users guessing why a button is disabled without contextual guidance. |

---

### References & Related Components

- [ButtonGroup](#/Components/ButtonGroup) - Component for grouping related action buttons horizontally.
- [Icon](#/Components/Icon) - Icon component utilized by Button for rendering icons.
- [Confirm](#/Components/Confirm) - Confirmation dialog component recommended for destructive button actions.
- [Modal](#/Components/Modal) - Modal dialog component for confirmations and multi-step workflows.
- [Tooltip](#/Components/Tooltip) - Contextual hover tooltip recommended for `iconOnly` and disabled buttons.
- [WAI-ARIA Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) - W3C ARIA accessibility guidelines for button widgets.

