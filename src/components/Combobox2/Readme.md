
```js
const newValues = [
  { id: '', name: "None" },
  { id: 'apione', name: 'API one!'},
  { id: 'apitwo', name: 'API two'},
  { id: 'apithree', name: 'APIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthreeAPIthree'},
  { id: 'apifour', name: 'API four'},
  { id: 'apifive', name: 'API five'},
  { id: 'apisix', name: 'API six'},
  { id: 'apiseven', name: 'API seven'},
  { id: 'apieight', name: 'API eight'},
];
for (let i = 0; i < 40; i++) {
  newValues.push({ id: '' + i, name: `Item ${i + 1}`});
}
setTimeout(() => setState({ values: newValues }));
<Combobox2
  values={state.values || []}
  value={'apitwo'}
  label="Combobox"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox2
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
<Combobox2
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
<Combobox2
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
<>
  <button onClick={() => setState({ value: [
    {id: 1, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'},
    {id: 2, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww2'},
    {id: 3, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww3'},
    {id: 35, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww3.5'},
    {id: 4, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww4'},
    {id: 5, name: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww5'},
    { id: 'apifive', name: 'API five'}
  ]}) }>Update value</button>
  <button onClick={() => setState({ value: []}) }>Clear value</button>
  <Combobox2
    value={state.value}
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
    tags={true}
    name="combobox"
    placeholder="Please select a value"
    expandMode={true}
  />
</>
```
```js
<Combobox2
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
  label="Combobox with custom tag separators [' ', 'Enter', ':', '@']"
  tags={ true }
  tagSeparators={[' ', 'Enter', ':', '@']}
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox2
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
import React from 'react';
const CustomComponent = React.forwardRef((props, ref) => {
  const {
    className,
    filteredValues,
    handleListItemClick,
    getListItemCssClasses,
  } = props;
  console.log(':::', props);

  return (
    <div className={className} ref={ref}>
    {
      filteredValues.map((value, index) => (
        <a
          className={getListItemCssClasses(value, index)}
          onClick={handleListItemClick.bind(null, index)}
          key={index} key={value.id}
        >
          {value.name}
        </a>
      ))
    }
    </div>
  );
});
<Combobox2
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
<Combobox2
  searchItem={(itemValue, inputValue) => {console.log(itemValue.name, inputValue); return itemValue.name.indexOf(inputValue) > -1;}}
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
  label="Custom Search Combobox"
  multiple={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox2
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
<Combobox2
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
  label="Combobox with error"
  multiple={ true }
  name="combobox"
  placeholder="Please select a value"
/>
```
```js
<Combobox2
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
  label="Combobox with error"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  theme="default inline rounded-corners"
  placeholder="Please select a value"
/>
```
```js
<Combobox2
  values={[
    { id: '', name: 'None' },
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

```js
import Icon from '../Icon';
<Combobox2
  renderValue={(value) => (
    <div style={{ marginRight: '15px', marginTop: '7px' }}>
      <Icon
        family="tykon"
        type={value.type}
      />
      <span style={{ marginLeft: '5px' }}>{ value.name }</span>
    </div>
  )}
  tags={true}
  values={[
    { id: '', name: 'None' },
    { id: 'apione', name: 'API one', type:'users'},
    { id: 'apitwo', name: 'API two', type:'team'},
    { id: 'apithree', name: 'API three', disabled: true},
    { id: 'apifour', name: 'API four', type:'overview'},
    { id: 'apifive', name: 'API five', disabled: true},
    { id: 'apisix', name: 'API six', type:'loadout'},
    { id: 'apiseven', name: 'API seven', type:'entitlement'},
    { id: 'api8', name: 'API 8', type:'users'},
    { id: 'api9', name: 'API 9', type:'users'},
    { id: 'api10', name: 'API 10', type:'users'},
    { id: 'api11', name: 'API 11', type:'users'},
    { id: 'api12', name: 'API 12', type:'users'},
    { id: 'api13', name: 'API 13', type:'users'}
  ]}
  label="Combobox with custom value renderer"
  placeholder="Please select a value"
/>
```

```js
import Icon from '../Icon';
<Combobox2
  renderListItem={(value, { sendMessage }) => (
    <li onClick={() => sendMessage('value.select', { item: value })}>
      { 'custom: ' + value.name + (value.selected ? ' (SELECTED)' : '') }
    </li>
  )}
  tags={true}
  values={[
    { id: '', name: 'None' },
    { id: 'apione', name: 'API one', type:'users'},
    { id: 'apitwo', name: 'API two', type:'team'},
    { id: 'apithree', name: 'API three', disabled: true},
    { id: 'apifour', name: 'API four', type:'overview'},
    { id: 'apifive', name: 'API five', disabled: true},
    { id: 'apisix', name: 'API six', type:'loadout'},
    { id: 'apiseven', name: 'API seven', type:'entitlement'},
    { id: 'api8', name: 'API 8', type:'users'},
    { id: 'api9', name: 'API 9', type:'users'},
    { id: 'api10', name: 'API 10', type:'users'},
    { id: 'api11', name: 'API 11', type:'users'},
    { id: 'api12', name: 'API 12', type:'users'},
    { id: 'api13', name: 'API 13', type:'users'}
  ]}
  label="Combobox with custom list item renderer"
  placeholder="Please select a value"
/>
```

```js
<Combobox2
  renderList={(values, { searchValue, activeItem, sendMessage }) => {
    return (
      <>
        <input
          autoFocus
          className="tyk-form-control"
          value={searchValue}
          onChange={e => sendMessage('search.change', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') sendMessage('search.escape');
            if (e.key === 'ArrowUp') sendMessage('search.arrowUp');
            if (e.key === 'ArrowDown') sendMessage('search.arrowDown');
            if (e.key === 'Enter') sendMessage('search.enter');
          }}
        />
        <ul>
          {values.map(item => (
            <li
              style={{
                fontWeight: item.selected ? 'bold' : 'normal',
              }}
              onClick={() => sendMessage('value.select', { item })}
            >
              { item.name + (activeItem && item.id === activeItem.id ? '-Active' : '') }
            </li>
          ))}
        </ul>
      </>
    );
  }}
  values={[
    { id: '', name: "None" },
    { id: 'apione', name: 'API one'},
    { id: 'apitwo', name: 'API two'},
    { id: 'apithree', name: 'API three', disabled: true},
    { id: 'apifour', name: 'API four'},
    { id: 'apifive', name: 'API five', disabled: true},
    { id: 'apisix', name: 'API six'},
    { id: 'apiseven', name: 'API seven'},
    { id: 'api8', name: 'API 8'},
    { id: 'api9', name: 'API 9'},
    { id: 'api10', name: 'API 10'},
    { id: 'api11', name: 'API 11'},
    { id: 'api12', name: 'API 12'},
    { id: 'api13', name: 'API 13'}
  ]}
  tags={true}
  tagSeparators={[' ', 'Enter', ':', '@']}
  label="Combobox with custom list renderer"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  placeholder="Please select a value"
/>
```