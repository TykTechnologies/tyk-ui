**Themes**
```js
<Message theme="info" title="Banner Title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum. </Message>
<Message theme="success" title="Banner Title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum. </Message>
<Message theme="warning"  title="Banner Title"onClose={() => { console.log('bar') }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum. </Message>
<Message theme="danger" title="Banner Title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum. </Message>
```

**Variation: Full options**
```js
import Button from '../Button';

<Message
  theme="info"
  title="Banner Title"
  onClose={() => console.log('close icon clicked')}
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam <a href="#">sollicitudin tempor</a> id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum.
  </p>
  <Button theme="secondary-outline" size="sm">Primary Action</Button>
  <Button theme="secondary-link" size="sm">Secondary link</Button>
</Message>
```

**Variation: Title and content and close icon**
```js
import Button from '../Button';

<Message
  theme="info"
  title="Banner Title"
  onClose={() => console.log('close icon clicked')}
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum.
  </p>
</Message>
```

**Variation: Content and close icon**
```js
import Button from '../Button';

<Message
  theme="info"
  onClose={() => console.log('close icon clicked')}
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum.
  </p>
</Message>
```

**Variation: Content only**
```js
import Button from '../Button';

<Message
  theme="info"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut magna aliqua. A diam sollicitudin tempor id eu nisl nunc mi. Auctor augue mauris augue neque gravida in fermentum.
  </p>
</Message>
```
