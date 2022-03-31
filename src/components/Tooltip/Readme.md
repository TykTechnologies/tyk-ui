Using string as render props
```js
<Tooltip render="eyJvcmciOiI2MTNmM2E5Mzg2MzQxZjJmYzk0YjA1ODEiLCJpZCI6IjQyZTA0MTBjNjNjZDQ0YmZhM2IzYmEyMmJjMWQ0ZTJkIiwiaCI6Im11cm11cjY0In0=">
  Hover Over Me 1
</Tooltip>
```

Using string as render props
```js
<Tooltip render="Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello" position="bottom">
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

Tooltip inside a Modal component
```js
import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

const Example = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} theme="success">
        Open Modal
      </Button>
      <Modal opened={showModal} onClose={() => setShowModal(false)} theme="success">
        <Modal.Body>
          <Tooltip render="Tooltip component inside a modal component">
            Hover me
          </Tooltip>
        </Modal.Body>
        <Modal.Footer>
          <Button theme="primary-outline" onClick={() => setShowModal(false)}>Close</Button>
          <Button theme="success" onClick={() => setShowModal(false)}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
<Example />
```