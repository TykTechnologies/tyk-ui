```jsx

<StringBuilder
  allowSearch
  // disabled
  // error="you have an error"
  label="URL Builder"
  // value="http://helloWorld.com/{{.object.name}}/{id}/asasd/{{.object.location}}"
  // value="http://helloWorld.com/{{.object.name}}/{name}/asdka/{id}"
  value="https://petstore.swagger.io/v2/pet/{{.arguments.id}}"
  placeholder="Please enter your url"
  onChange={(v) => console.log("Value", {v})}
  theme="default rounded-corners"
  dropdownTriggerKey="{"
  invalidTokenRegex={/({\w.*?\w})/g}
  options={[
  {
    "id": "{{.arguments.id}}",
    "name": "userId",
    "desc": "Argument userId",
    "className": "data_source_argument"
  },
  // {
  //   "id": "{{.object.name}}",
  //   "name": "name",
  //   "desc": "name of type User",
  //   "className": "data_source_object"
  // },
  // {
  //   "id": "{{.object.location}}",
  //   "name": "location",
  //   "desc": "location of type User",
  //   "className": "data_source_object"
  // },
  // {
  //   "id": "{{.object.pin}}",
  //   "name": "pin",
  //   "desc": "pin of type User",
  //   "className": "data_source_object"
  // }
]}
/>
```