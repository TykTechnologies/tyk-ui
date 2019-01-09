```js
<EditableList
  label="Editable list inline display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    displayType: 'inline',
    components: [
      {
        size: 6,
        name: Input,
        props: {
          label: 'Input',
          placeholder: 'Pleas type smth',
          name: "elInput",
          type: "text",
          value: ""
        }
      },
      {
        size: 6,
        name: Combobox,
        props: {
          label: "Main Combobox",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
<EditableList
  addValueOnFieldChange={ true }
  label="Editable list inline display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    displayType: 'inline',
    components: [
      {
        size: 12,
        name: Combobox,
        props: {
          label: "Main Combobox 2",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
<EditableList
  label="Editable list table display"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    components: [
      {
        size: 6,
        name: Input,
        props: {
          label: 'Input',
          placeholder: 'Pleas type smth',
          name: "elInput",
          type: "text",
          value: ""
        }
      },
      {
        size: 6,
        name: Combobox,
        props: {
          label: "Main Combobox",
          name: "mainElCombobox",
          placeholder: "Select a value",
          value: null,
          values: [
            { id: '', name: "None" },
            { id: 'apione', name: 'API one'},
            { id: 'apitwo', name: 'API two'},
            { id: 'apithree', name: 'API three'},
            { id: 'apifour', name: 'API four'},
            { id: 'apifive', name: 'API five'},
            { id: 'apisix', name: 'API six'},
            { id: 'apiseven', name: 'API seven'},
            { id: 'apieight', name: 'API eight'}
          ]
        }
      }
    ]
  }}
/>
```
```js
<EditableList
  label="Editable list append the results to another element"
  name="editableListInline"
  onChange={ (list, index, prevValue, nextValue) => {
    console.log('list:', list);
    console.log('index:', index);
    console.log('prevValue:', prevValue);
    console.log('nextValue:', nextValue);
  }}
  config={{
    appendTo: '#prct',
    components: [
      {
        size: 12,
        name: Input,
        props: {
          label: 'Input',
          placeholder: 'Pleas type smth',
          name: "elInput",
          type: "text",
          value: ""
        }
      }
    ]
  }}
/>
<div id="prct"></div>
```
