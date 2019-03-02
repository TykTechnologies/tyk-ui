```js
<Input
  label="This is a demo Input"
  name="input"
  note="Some helpful message to be displayed on this Input"
  placeholder="Please type something"
  type="text"
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
/>

```
```js
<Input
  inputgroupaddonleft={
    <Icon type="search" />
  }
  label="Input with addon"
  name="input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
<Input
  inputgroupaddonright={
    <Icon type="search" />
  }
  name="input"
  placeholder="Please type something"
  type="text"
  onChange={ (e) => { console.log(e); }}
/>
```
