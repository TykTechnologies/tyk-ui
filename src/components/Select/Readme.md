```js
<Select
  options={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  label="Select"
  name="select"
  onChange={ (e) => {
    console.log(e);
  }}
  placeholder="Please select a value"
/>
```
```js
<Select
  options={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  label="Select"
  name="select"
  onChange={ (e) => {
    console.log(e);
  }}
  theme="default inline rounded-corners"
  placeholder="Please select a value"
/>
```
```js
<Select
  options={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  label="Select with note"
  name="select"
  note="A note about this special select"
  onChange={ (e) => {
    console.log(e);
  }}
  placeholder="Please select a value"
/>
```
```js
<Select
  error="There is something wrong with this select"
  options={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  label="Select with error"
  name="select"
  onChange={ (e) => {
    console.log(e);
  }}
  placeholder="Please select a value"
/>
```
```js
<Select
  options={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  disabled={ true }
  label="Disabled select"
  name="select"
  onChange={ (e) => {
    console.log(e);
  }}
  placeholder="Please select a value"
/>
```
