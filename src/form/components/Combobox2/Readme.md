
```js
import { useState } from 'react';

const ITEMS_PAGE_SIZE = 10;
const [state, setState] = useState({
  currentPage: 1,
  values: getNewValues()
});
function getNewValues() {
  const vs = [];
  for (let i = 1; i <= ITEMS_PAGE_SIZE; i++) {
    const id = (state.currentPage || 0) * ITEMS_PAGE_SIZE + i;
    vs.push({ id: String(id), name: `Item ${id}` });
  }
  return vs;
}
function loadMore(p) {
  setState({
    currentPage: p,
    values: [
      ...state.values,
      ...getNewValues(),
    ]
  });
}

<Combobox2
  values={state.values}
  value={'apitwo'}
  label="Combobox (with infinite scroll enabled)"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
  floatingContainerConfig={{
    forceDisplay: 'bottom'
  }}
  infiniteScrollerConfig={{
    hasMore: state.currentPage < 10,
    loadMore,
    pageNumber: state.currentPage
  }}
/>
```

Search with tags 

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
  label="Combobox Search with tags"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
  multiple
  tags
  allowCustomValues={false}
  showSearch
  addTagOnBlur
  required
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
  placeholder="Please select a value"
  required
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
  label="Combobox with 'select all' item"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
  selectAll={{
    label: 'Select everything',
  }}
  max={20}
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
  label="Combobox with a custom renderer for the 'select all' item"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
  selectAll={{
    render: (isAllSelected, sendMessage) => (
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={() => sendMessage('value.select-all', !isAllSelected)}
      />
    )
  }}
  max={20}
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
  label="Combobox with a 'clear filter' like functionality"
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
  placeholder="Please select a value"
  selectAll={{
    label: 'Clear Filter',
    mode: 'unselect',
    show: 'notSameState',
  }}
  max={20}
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

  return (
    <div className={className} ref={ref}>
    {
      filteredValues.map((value, index) => (
        <a
          className={getListItemCssClasses(value, index)}
          onClick={handleListItemClick.bind(null, index)}
          key={value.id}
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
  name="combobox"
  onChange={ (e) => { console.log(e); }}
  note="Some note on the combobox"
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
import Icon from '../../../components/Icon';
<Combobox2
  renderValue={(value) => (
    <div key={value.id} style={{ marginRight: '15px', marginTop: '7px' }}>
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
import Icon from '../../../components/Icon';
<Combobox2
  renderListItem={(value, { sendMessage }) => (
    <li key={value.id} onClick={() => sendMessage('value.select', { item: value })}>
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
              key={item.id}
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
```js
<Combobox2
  values={[
   {id: 201, name: '201'}
  ]}
  label="Validate that a tag is a number before adding the value"
  tags={ true }
  tagSeparators={[' ', 'Enter', ':', '@']}
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```

```js
<Combobox2
  values={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  label="Validate that a tag is a number before adding the value"
  multiple
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```
```js
<Combobox2
  values={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  value={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  readOnly
  label="Read only mode multiple"
  multiple
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```
```js
<Combobox2
  values={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  value={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  readOnly
  label="Read only mode tags"
  tags
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```
```js
<Combobox2
  values={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  value={{id: 201, name: '201'}}
  readOnly
  label="Read only mode single"
  tags
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```
```js
<Combobox2
  values={[
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  readOnly
  label="Read only mode no value"
  tags
  name="combobox"
  placeholder="Please select a value"
  validateOnChange={(values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'}}
/>
```

#### Combobox with dynamic server side search using `onSearch`

```js
import { useState, useEffect } from 'react';

const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);
const [selectedPost, setSelectedPost] = useState(null);

// Load initial posts on mount
useEffect(() => {
  fetchPosts('');
}, []);

async function fetchPosts(searchTerm) {
  setLoading(true);
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${searchTerm}`);
    const data = await response.json();
    
    setPosts(data.map(post => ({
      id: post.id,
      name: post.title,
      body: post.body
    })));
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    setLoading(false);
  }
}

<Combobox2
  values={posts.length > 0 ? posts : [
   {id: 201, name: '201'},
   {id: 'aaa', name: 'AAA'}
  ]}
  value={selectedPost}
  label="Search Posts (Backend Search)"
  placeholder="Type to search posts..."
  onChange={(selected) => {
    console.log('Selected:', selected);
    setSelectedPost(selected);
  }}
  onSearch={fetchPosts}
  note={loading ? 'Loading...' : 'Search results will be fetched from the backend'}
  showSearch
/>
```
