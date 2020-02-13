```js
import Tooltip from '../Tooltip';
import Button from '../Button';
<NavBar
  pre={
    <a href="">Back to something</a>
  }
  title="Prct"
  left={
    <Tooltip
      render="prct"
      position="bottom"
    >
      <Button
        iconType="question"
        iconPosition="left"
        iconOnly
        theme="default"
      />
    </Tooltip>
  }
  right={
    <>
      <Button
        theme="success"
      >
        Update
      </Button>
      <Button
        theme="danger"
        type="button"
      >
        Delete
      </Button>
    </>
  }
/>
```
