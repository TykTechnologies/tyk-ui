```js
  import React, {useState} from 'react';
  import Input2 from '../Input2';

  const [value, setValue] = useState([]);

  const withErrorMessage = fn => (errorMessage, ...args) => (value) => {
    const result = fn(value, ...args);
    return result ? null : errorMessage;
  };

  const formikRequired = withErrorMessage(Boolean);
  const isRequired = formikRequired('This field is required');

  <EditableList2
    hideOnEmpty={false}
    onChange={setValue}
    value={value}
    label="Map Client to Policy"
    addButtonName="Add Client"
    readOnly={false}
    error="An error occured"
    fields={[
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 4,
        props: {
          name: 'input',
          label: 'Claim name',
          theme: 'default rounded-corners',
          placeholder: 'Enter claim name',
          value: '',
          validate: isRequired
        } 
      },
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 8,
        props: {
          name: 'input',
          label: 'Policy',
          theme: 'default rounded-corners',
          placeholder: 'Add Policy',
          value: '',
          validate: isRequired
        } 
      }
    ]}
  />
```
```js
  import React, {useState, useEffect} from 'react';
  import Input2 from '../Input2';
  import Combobox2 from '../Combobox2';

  const [value, setValue] = useState([
    [
        "dasd",
        [
            {
                "id": 201,
                "name": "201",
                "selected": false
            }
        ]
    ],
    [
        "aaaaa",
        [
            {
                "id": "333",
                "name": "333"
            }
        ]
    ]
]);

  const withErrorMessage = fn => (errorMessage, ...args) => (value) => {
    const result = fn(value, ...args);
    return result ? null : errorMessage;
  };

  const formikRequired = withErrorMessage(Boolean);
  const [comboboxProps, setComboboxProps] = useState({
    values: [],
    label: "Validate that a tag is a number before adding the value",
    tags: true,
    tagSeparators: [' ', 'Enter', ':', '@'],
    name: "combobox",
    theme: "default rounded-corners",
    placeholder: "Please select a value",
    validateOnChange: (values, lastValue) => {console.log(lastValue, !isNaN(lastValue.id)); return !isNaN(lastValue.id) ? undefined : 'Added value is not a number'},
    validate: formikRequired('This field is required')
  });
  

  useEffect(() => {
    setTimeout(() => {
      setComboboxProps({
        ...comboboxProps,
        values: [
          {id: 201, name: '201'},
          {id: 401, name: '401'}
        ]
      })
    }, 5000);
  },[]);

  <EditableList2
    onChange={setValue}
    value={value}
    label="Update components props"
    addButtonName="Add Client"
    readOnly={false}
    error=""
    value={value}
    fields={[
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 4,
        props: {
          name: 'input',
          label: 'Claim name',
          theme: 'default rounded-corners',
          placeholder: 'Enter claim name',
          validate: formikRequired('This field is required')
        } 
      },
      {
        component: Combobox2,
        size: 8,
        props: comboboxProps
      }
    ]}
  />
```
```js
  import React, {useState} from 'react';
  import Input2 from '../Input2';

  const [value, setValue] = useState(null);

  <EditableList2
    onChange={setValue}
    value={value}
    label="Disabled Editbale list"
    addButtonName="Add Client"
    readOnly={false}
    disabled
    error=""
    fields={[
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 4,
        props: {
          name: 'input',
          label: 'Claim name',
          theme: 'default rounded-corners',
          placeholder: 'Enter claim name',
        } 
      },
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 8,
        props: {
          name: 'input',
          label: 'Policy',
          theme: 'default rounded-corners',
          placeholder: 'Add Policy',
        } 
      }
    ]}
  />
```
```js
  import React, {useState} from 'react';
  import Input2 from '../Input2';
  import Combobox2 from '../Combobox2';

  const [value, setValue] = useState([
    [
        "dasd",
        [
            {
                "id": 201,
                "name": "201",
                "selected": false
            }
        ]
    ],
    [
        "aaaaa",
        [
            {
                "id": "333",
                "name": "333"
            },{
                "id": "222",
                "name": "322233"
            }
        ]
    ]
]);

  <EditableList2
    onChange={setValue}
    value={value}
    label="Read only list"
    addButtonName="Add Client"
    readOnly={false}
    readOnly
    error=""
    fields={[
      {
        component: Input2,
        styles: {
          width: "200px",
        },
        size: 4,
        props: {
          name: 'input',
          label: 'Claim name',
          theme: 'default rounded-corners',
          placeholder: 'Enter claim name',
        } 
      },
      {
        component: Combobox2,
        size: 8,
        props: {
          values: [
            {id: 201, name: '201'}
          ],
          label: "Combobox read only",
          tags: true,
          tagSeparators: [' ', 'Enter', ':', '@'],
          name: "combobox",
          theme: "default rounded-corners",
        } 
      }
    ]}
  />
```