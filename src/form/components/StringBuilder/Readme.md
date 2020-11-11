```jsx

<StringBuilder
  allowSearch
  // disabled
  // error="you have an error"
  label="URL Builder"
  value="http://helloWorld.com/{{.object.name}}"
  placeholder="Please enter your url"
  onChange={(v) => console.log("Value", {v})}
  theme="default rounded-corners"
  dropdownTriggerKey="{"
  invalidTokenRegex={/({.*?})/g}
  options={[
  {
    "id": "{{.arguments.userId}}",
    "name": "userId",
    "desc": "Argument userId",
    "className": "data_source_argument"
  },
  {
    "id": "{{.object.name}}",
    "name": "name",
    "desc": "name of type User",
    "className": "data_source_object"
  },
  {
    "id": "{{.object.location}}",
    "name": "location",
    "desc": "location of type User",
    "className": "data_source_object"
  },
  {
    "id": "{{.object.pin}}",
    "name": "pin",
    "desc": "pin of type User",
    "className": "data_source_object"
  }
]}
/>
```