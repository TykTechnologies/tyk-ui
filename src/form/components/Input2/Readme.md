```js
<Input2
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
  theme="default rounded-corners"
  onChange={ (e) => { console.log(e); }}
  value="prct"
/>
```
```js
<Input2
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

<Input2
  label="Inline default theme input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="default rounded-corners inline"
  onChange={ (e) => { console.log(e); }}
/>
<Input2
  label="Inline primary theme input"
  name="input"
  placeholder="Please type something"
  type="text"
  theme="primary inline rounded-corners"
  onChange={ (e) => { console.log(e); }}
/>

<Input2
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

<Input2
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

<Input2
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
<Input2
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
import Icon from '../../../components/Icon';
<div>
  <Input2
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
  <Input2
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
