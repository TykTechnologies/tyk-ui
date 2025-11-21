**Basic Example - Show 2 items by default**
```js
import Button from '../Button';
const [isOpen, setIsOpen] = React.useState(false);

<>
  <Button onClick={() => setIsOpen(!isOpen)} theme="primary">
    {isOpen ? 'Collapse' : 'Expand'}
  </Button>
  <CollapsibleList open={isOpen} visibleCount={2}>
    <CollapsibleList.Item>Item 1 (always visible)</CollapsibleList.Item>
    <CollapsibleList.Item>Item 2 (always visible)</CollapsibleList.Item>
    <CollapsibleList.Item>Item 3 (hidden by default)</CollapsibleList.Item>
    <CollapsibleList.Item>Item 4 (hidden by default)</CollapsibleList.Item>
  </CollapsibleList>
</>
```

**Show All Items Initially**
```js
<CollapsibleList open={true} visibleCount={0}>
  <CollapsibleList.Item>All items visible</CollapsibleList.Item>
  <CollapsibleList.Item>From the start</CollapsibleList.Item>
</CollapsibleList>
```

**Hide All Items by Default**
```js
<CollapsibleList open={false} visibleCount={0}>
  <CollapsibleList.Item>Hidden until expanded</CollapsibleList.Item>
  <CollapsibleList.Item>Hidden until expanded</CollapsibleList.Item>
</CollapsibleList>
```

## Props

### CollapsibleList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | required | The list items (should be `CollapsibleList.Item` components) |
| `open` | `bool` | `false` | Controls whether the list is expanded or collapsed |
| `visibleCount` | `number` | `0` | Number of items visible by default (0 shows none) |
| `className` | `string` | `''` | Additional CSS class for the container |

### CollapsibleList.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `node` | - | Content of the list item |
| `className` | `string` | `''` | Additional CSS class for the item |

## Animation

- Items fade in with opacity transition (0.3s)
- Items slide down with transform animation
- Each item has a staggered delay (50ms) for cascading effect
- Only items beyond `visibleCount` are animated

## Notes

- The component uses CSS transitions for smooth animations
- Items are rendered as `<ul>` with `<li>` elements
- The `open` prop fully controls visibility - when true, all items show regardless of `visibleCount`
- When `open` is false, only the first `visibleCount` items are visible
