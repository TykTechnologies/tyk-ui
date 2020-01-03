### Confirm before console
```js
import Button from '../Button';
<Confirm 
  title="Console log"
  description="Are u sure u want to console log?"
>
  {
    (confirm) => (
      <Button
        onClick={confirm((event) => {console.log('Button clicked', event);})}
        theme="default"
      >
        Confirm console log
      </Button>
    )
  }
</Confirm>
```