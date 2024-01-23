Basic Drodpown2:
It has an onChange method that returns the value of the selected item.


```js
<Dropdown2 maxWidth="450px" title="Dropdown" theme="primary" onChange={(value) => console.log(value)}>
  <Dropdown2.Item value="1">Item 1 Item 1 Item 1 Item 1</Dropdown2.Item>
  <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
</Dropdown2>
```

Split Dropdown2
It displays the Dropdown2 trigger as 2 buttons, one for the title and the other for the caret. It has an onChange method that returns the value of the selected item.

```js
<Dropdown2 title="Dropdown" theme="primary" splitTrigger onChange={(value) => console.log(value)}>
  <Dropdown2.Item value="1">Item 1</Dropdown2.Item>
  <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
</Dropdown2>
```

Split Dropdown2
It calls onTriggerClick function in case splitTrigger is true, by sending the dropdown value as parameter.

```js
<Dropdown2 title="Dropdown" theme="primary" value="2" splitTrigger onTriggerClick={(value) => console.log(value)} onChange={(value) => console.log(value)}>
  <Dropdown2.Item value="1">Item 1</Dropdown2.Item>
  <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
</Dropdown2>
```