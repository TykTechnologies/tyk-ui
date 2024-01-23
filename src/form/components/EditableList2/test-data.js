import Input2 from '../Input2';
import Combobox2 from '../Combobox2';

export const editableListProps = {
  label: 'Editable List',
  addButtonName: 'Add Item',
  readOnly: false,
  disabled: false,
  error: '',
  fields: [
    {
      component: Input2,
      size: 6,
      props: {
        name: 'input1',
        label: 'Field 1',
        theme: 'default rounded-corners',
        placeholder: 'Enter Field 1',
        value: '',
      },
    },
    {
      component: Combobox2,
      size: 6,
      props: {
        name: 'combobox1',
        label: 'Field 2',
        theme: 'default rounded-corners',
        placeholder: 'Select Field 2',
        values: [],
      },
    },
  ],
  value: [
    [
      '123',
      { id: '456', name: '456' },
    ],
  ],
  hideOnEmpty: true,
  wrapperClassName: 'custom-wrapper-class',
};
