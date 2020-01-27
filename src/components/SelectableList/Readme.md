```js
<SelectableList
  items={[
    { name: 'API ONE', id: ['1', '4']},
    { name: 'API TWO', id: '2'},
    { name: 'API THREE', id: '3'}
  ]}
  value={[
    ['1', '4']
  ]}
  onChange={(selectedItems) => { console.log(selectedItems); }}
  style={{
    maxHeight: '100px'
  }}
  label="super cool list"
  labelwidth="25%"
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
  labelwidth="25%"
/>
```
