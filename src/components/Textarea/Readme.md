```js
<Textarea
  label="This is a demo Textarea"
  name="input"
  note="Some helpful message to be displayed on this Textarea"
  placeholder="Please type something"
  type="text"
  rows="10"
  onChange={ (e) => { console.log(e); }}
/>
```
```js

<Textarea
  error="Please fix the error"
  label="This an Textarea with error"
  name="input"
  placeholder="Please type something"
  type="text"
  rows="10"
  onChange={ (e) => { console.log(e); }}
/>

```
```js
<Textarea
  disabled={ true }
  label="This a disabled Textarea"
  name="input"
  note="Some helpful message to be displayed on this Textarea"
  placeholder="Please type something"
  type="text"
  rows="10"
  onChange={ (e) => { console.log(e); }}
/>

```
