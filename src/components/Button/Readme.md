The `Button` component is used to trigger actions, navigate between pages, or wrap custom elements with Tyk UI button styles. It supports standard HTML button behaviors, hyperlink rendering when `href` is provided, and integration with client-side routers via `customButton`.

### Installation & Import

```js static
import { Button } from '@tyk-technologies/tyk-ui';
// or direct component import:
import Button from '@tyk-technologies/tyk-ui/src/components/Button';
```

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

### Best Practices & Accessibility

1. **Visual Hierarchy:** Use only one `primary` button per view or form to clearly guide users toward the principal action. Secondary and outline variants should be used for supporting or cancel actions.
2. **Destructive Actions:** Use `danger` or `danger-outline` for destructive operations such as deleting resources, typically accompanied by a confirmation prompt.
3. **Icon-only Buttons:** Always include an accessible label via `title` or `aria-label` when using `iconOnly`, so screen readers can describe the button's action.
4. **Semantics:** Use standard `Button` (with `onClick`) for page actions that mutate state or trigger dialogs. Use `href` (or `customButton` with router links) for navigational transitions.
