import Checkbox from '../Checkbox';
import Button from '../Button';
// import Icon from '../Icon';
import { Input } from '../Input';
import TextEllipsis from '../TextEllipsis';

export const config2 = {
  columns: [
    // {
    //   id: 'active', name: 'Active', type: Icon, sortable: true,
    // },
    {
      id: 'name', name: 'Policy Name', type: 'string', sortable: true,
    },
    { id: 'access_rights', name: 'Access Rights', type: TextEllipsis },
    {
      id: 'auth_type', name: 'Auth Type', type: 'string', sortable: true,
    },
    {
      id: 'date', name: 'Date Created', type: 'string', sortable: true,
    },
    {
      id: 'delete_btn', name: 'Delete', type: Button, sortable: true,
    },
    {
      id: 'input_test', name: 'Input Test', type: Input,
    },
  ],
  rows: [
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: 'Freemium Policy',
        access_rights: {
          text:
            'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
          limit: 10,
        },
        auth_type: 'tag1, tag2, tag3, tag4',
        date: '01/01/2019',
        delete_btn: {
          theme: 'danger',
          value: 'Delete',
          size: 'sm',
        },
        input_test: {
          type: 'number',
          value: 1,
          noChild: true,
        },
      },
      selected: false,
    },
  ],
  selectable: {
    position: 'RIGHT',
    // type: Button,
    // type: 'default',
    type: Checkbox,
    style: 'dummy-style',
    allowSelectAll: false,
    // name: 'Select'
    // values: {
    //   theme: 'primary',
    //   value: 'Select All',
    //   size: 'sm'
    // },
  },
  pagination: {
    totalPages: 40,
    perPage: 5,
    current: 1,
  },
};
