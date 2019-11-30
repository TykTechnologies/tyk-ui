```js
<Combobox
  values={[
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
  label="Combobox"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  values={[
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
  label="Combobox"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  theme="default inline rounded-corners"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  values={[
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
  label="Combobox with label width"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  theme="default inline rounded-corners"
  placeholder="Please select a value"
  labelwidth="40%"
/>
```
```js
<Combobox
  values={[
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
  label="Combobox multiple selections"
  multiple={ true }
  max={3}
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  allowCustomValues={ false }
  values={[
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
  label="Combobox don't allow custom tags"
  tags={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  values={[
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
  label="Combobox as tags"
  tags={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  values={[
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
  label="Combobox custom List element"
  tags={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```

```js
import React from 'react';
const CustomComponent = React.forwardRef((props, ref) => {
  const {
    className,
    filteredValues,
    handleListItemClick,
    getListItemCssClasses,
  } = props;

  return (
    <div className={className} ref={ref}>
    {
      filteredValues.map((value, index) => <a className={getListItemCssClasses(value, index)} onClick={handleListItemClick.bind(null, index)} key={index} key={value.id}>{value.name}</a>)
    }
    </div>
  );
});
<Combobox
  CustomListComponent={CustomComponent}
  values={[
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
  label="Combobox custom List element"
  tags={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  disabled={ true }
  values={[
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
  label="Disabled Combobox"
  multiple={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  error="Some strange error for Combobox"
  values={[
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
  label="Disabled Combobox"
  multiple={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  error="Some strange error for Combobox"
  values={[
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
  label="Combobox"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  theme="default inline rounded-corners"
  placeholder="Please select a value"
/>
```
```js
<Combobox
  values={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two', disabled: true},
    { id: 'apithree', name: 'API three'},
    { id: 'apifour', name: 'API four', disabled: true},
    { id: 'apifive', name: 'API five'},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'apieight', name: 'API eight'}
  ]}
  label="Combobox with disabled items"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
/>
```
