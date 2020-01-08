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
        name: {
          value: 'Freemium Policy',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
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
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
            onClick: () => console.log('Delete Btn Click'),
          },
          children: 'Delete',
          events: {
            onClick: () => console.log('Clicked the cell'),
          },
        },
        input_test: {
          props: {
            type: 'number',
            value: '1',
            onChange: v => console.log('changing input', v),
          },
        },
      },
      selected: false,
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: {
          value: 'Freemium Policy',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
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
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
            onClick: () => console.log('Delete Btn Click'),
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
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
    },
    {
      values: {
        active: {
          family: 'tykon',
          type: 'target',
          className: 'success',
        },
        name: {
          value: 'Freemium Policy',
          events: {
            onClick: () => console.log('Name Clicked'),
          },
        },
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
        auth_type: {
          value: 'tag1, tag2, tag3, tag4',
        },
        date: {
          value: '01/01/2019',
        },
        delete_btn: {
          props: {
            theme: 'danger',
            size: 'sm',
            onClick: () => console.log('Delete Btn Click'),
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
      events: {
        onClick: () => console.log('Row Clicked {config}'),
      },
    },
  ],
  selectable: {
    position: 'LEFT',
    // type: Button,
    // type: 'default',
    type: Checkbox,
    style: 'dummy-style',
    allowSelectAll: true,
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
