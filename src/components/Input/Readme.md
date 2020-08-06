```js
<Input
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  theme="default rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  inline={ true }
  theme="default rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<Input
  label="Inline default theme input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="default rounded-corners inline"
  onChange={ (e) => { console.log(e); }}
/>
<Input
  label="Inline primary theme input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="primary inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>

<Input
  label="Inline success theme input with label width of 60%"
  labelwidth="60%"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="success inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<Input
  error="Please fix the error"
  label="This an Input with error"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  theme="rounded-corners"
/>
```
```js

<Input
  error="Please fix the error"
  label="This an Input with error"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  theme="success inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>
```
```js
<Input
  disabled={ true }
  label="This a disabled Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
  theme="rounded-corners"
/>

```
```js
import Icon from '../Icon';
<div>
  <Input
    inputgroupaddonleft={
      <Icon type="search" />
    }
    label="Input with addon left"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
    theme="default rounded-corners"
  />
  <Input
    inputgroupaddonright={
      <Icon type="search" />
    }
    disabled
    label="Input with addon right and disabled"
    name="input"
    placeholder="Please type something"
    type="text"
    onChange={ (e) => { console.log(e); }}
    theme="default rounded-corners"
  />
</div>
```
