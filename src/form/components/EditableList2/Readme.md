```js
  import React, {useState} from 'react';
  import Input2 from '../Input2';

  const [value, setValue] = useState(null);

  const withErrorMessage = fn => (errorMessage, ...args) => (value) => {
    const result = fn(value, ...args);
    return result ? null : errorMessage;
  };

  const formikRequired = withErrorMessage(Boolean);

  <EditableList2
    onChange={setValue}
    value={value}
    label="Map Client to Policy"
    addButtonName="Add Client"
    readOnly={false}
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
          validate: formikRequired('This field is required')
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
          validate: formikRequired('This field is required')
        } 
      }
    ]}
  />
```