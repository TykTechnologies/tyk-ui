```js
<SelectableList
  items={[
    { name: 'API ONE', id: '1'},
    { name: 'API TWO', id: '2'},
    { name: 'API THREE', id: '3'}
  ]}
  value={[
    '1', '2'
  ]}
  onChange={(selectedItems) => { console.log(selectedItems); }}
  style={{
    maxHeight: '100px'
  }}
  label="super cool list"
  labelWidth="25%"
/>
```

```js
<SelectableList
  checkboxalticon="chevron-right"
  items={[
    { name: 'API ONE', id: '1'},
    { name: 'API TWO', id: '2'},
    { name: 'API THREE', id: '3'}
  ]}
  value={[
    '1', '2'
  ]}
  onChange={(selectedItems) => { console.log(selectedItems); }}
  style={{
    maxHeight: '100px'
  }}
  label="super cool list"
  labelWidth="25%"
/>
```
