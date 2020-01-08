import Checkbox from '../Checkbox';
import Button from '../Button';
// import Icon from '../Icon';
import { Input } from '../Input';
import TextEllipsis from '../TextEllipsis';

export const config = {
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
          props: {
            text:
              'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'alpha',
          },
        },
        auth_type: 'tag1, tag2, tag3, tag4',
        date: '01/01/2019',
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: false,
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'text-danger',
        },
        name: 'Silver Policy',
        access_rights: {
          props: {
            text:
              'api alpha, api bravo, api charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'bravo',
          },
        },
        auth_type: 'tag1, tag2, tag3, tag4',
        date: '15/01/2019',
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: false,
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'text-danger',
        },
        name: 'Golden Policy',
        access_rights: {
          props: {
            text: 'charlie, api delta, api eclair, api foxtrot',
            limit: 10,
          },
          styling: {
            className: 'charlie',
          },
        },
        auth_type: 'tag1, tag2, tag3, tag4',
        date: '01/01/2019',
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: false,
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'text-success',
        },
        name: 'Golden Policy',
        access_rights: {
          props: {
            text: 'api alpha, api bravo',
            limit: 10,
          },
          styling: {
            className: 'delta',
          },
        },
        auth_type: 'tag1, tag2, tag3, tag4',
        date: '10/01/2019',
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
          },
          children: 'Delete',
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
          },
        },
      },
      selected: true,
    },
  ],
  selectable: {
    position: 'LEFT',
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
  maxHeight: '200px',
};
