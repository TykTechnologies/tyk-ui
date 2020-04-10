```js
import Tooltip from '../Tooltip';
import Button from '../Button';
<NavBar
  pre={
    <a href="">Back to something</a>
  }
  title="Prct"
  styles={{
    left: 'my_class_for_left_element_container'
    right: 'my_class_for_right_element_container'
  }}
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
