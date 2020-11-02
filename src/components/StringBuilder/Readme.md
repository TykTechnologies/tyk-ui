```jsx

<StringBuilder
  value="http://sample.com/{{.arguments.id}}"
  onChange={(v) => console.log("Value", v)}
  theme="default rounded-corners"
  options={[
  {
    id: '{{.arguments.id}}',
    name: 'arguments: id',
    desc: 'Argument Id',
    className: 'data_source_argument',
  },
  {
    id: '{{.object.name}}',
    name: 'User: name',
    desc: 'name on type User',
    className: 'data_source_object',
  },
]}
/>
```