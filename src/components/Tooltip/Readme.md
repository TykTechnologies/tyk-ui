Using string as render props
```js
<Tooltip render="Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello" position="bottom">
  Hover Over Me 1
</Tooltip>
```

Using JSX as render props
```js
<Tooltip render={<div>Hello</div>}>
  Hover Over Me 2
</Tooltip>
```

Using JSX as children
```js
import Button from '../Button';
<Tooltip render="You Just Hovered Me !" position="bottom">
  <Button theme="primary" size="sm">Hover Me or Not </Button>
</Tooltip>
```

Long text in a tooltip
```js
import Button from '../Button';
<Tooltip render="Loremipsumdolorsitametconsectetur,adipisicingelit.Doloremquearchitectoveritatisveniamat,cumeosdoloreslaborumimpedit.Inventore,voluptate.Maximefacilisexplicaboquamassumendaaspernaturducimusofficiaminusomnis?"position="bottom">
  <Button theme="primary" size="sm">Hover Me or Not </Button>
</Tooltip>
```

Tooltip displayed with a "question mark" icon
```js
<Tooltip render="You Just Hovered Me !" icon>
  Hover Me Too
</Tooltip>
```

Tooltip displayed with a custom icon
```js
import Icon from '../Icon';
<Tooltip render="You Just Hovered Me !" icon={<Icon family="tykon" type="warning" />}>
  Hover Me Too
</Tooltip>
```

Tooltip displayed on click and with a closing "x" button
```js
<Tooltip render="You Just Hovered Me !" closable>
  Hover Me Too
</Tooltip>
```

Tooltips can be displayed on the left or on the right of the "trigger" element.
```js
<Tooltip render="You Just Hovered Me !" position="right">
  Hover Me Too
</Tooltip>
```

Tooltip opened by default through the `isOpened` prop
```js
<Tooltip render="This tooltip is opened without user interaction" position="bottom" isOpened>
  No user interaction needed
</Tooltip>
```