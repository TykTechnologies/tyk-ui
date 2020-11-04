```jsx

<StringBuilder
  allowSearch
  // error="you have an error"
  // note="you also have a note"
  label="URL Builder"
  // value="http://sample.com/{{.arguments.id}}"
  value="http://sample.com/{{.arguments.userId}}?id={{.arguments.userId}}"
  placeholder="Please enter your url"
  onChange={(v) => console.log("Value", v)}
  theme="default rounded-corners"
  options={[
  {
    id: '{{.arguments.id}}',
    name: 'id',
    desc: 'Argument Id',
    // className: 'data_source_argument',
  },
  {
    id: '{{.object.name}}',
    name: 'name',
    desc: 'name on type User',
    // className: 'data_source_object',
  },
  {
    id: '{{.arguments.userId}}',
    name: 'userId',
    desc: 'id on type User',
    // className: 'data_source_object',
  },
   {
    "id": "5fa10a723d2f88494052e80f",
    "name": "ENAUT",
    "desc": "Sit enim nisi nisi do aute velit commodo. Ullamco commodo proident fugiat labore consequat dolor pariatur occaecat aliquip ullamco nostrud. Ipsum occaecat tempor nisi nulla culpa et ad eu mollit non do velit consectetur ullamco."
  },
  {
    "id": "5fa10a72737bc8fd3d9fb0c6",
    "name": "AMTAS",
    "desc": "Nostrud proident ipsum culpa quis esse eiusmod. Laborum Lorem sint amet culpa officia Lorem est mollit esse tempor ipsum mollit pariatur. Duis consectetur tempor id ut ullamco aliquip reprehenderit culpa aute reprehenderit amet. Aliquip commodo exercitation commodo Lorem quis exercitation laboris in ex commodo sunt aliqua. Ipsum aliquip culpa eiusmod proident enim pariatur velit eu. Consectetur cupidatat aute est cupidatat esse fugiat mollit quis. Ullamco Lorem nulla culpa aliquip deserunt deserunt et eu laboris est."
  },
  {
    "id": "5fa10a722d12840cc73a8ed9",
    "name": "NIKUDA",
    "desc": "In est magna ea pariatur proident voluptate cupidatat. Commodo elit consequat ut commodo laboris exercitation ex eiusmod. Magna et laborum duis deserunt consectetur. Consectetur nulla anim labore velit mollit laboris culpa anim. Eiusmod minim occaecat ea dolor est adipisicing officia proident. Do consectetur ad proident mollit dolore eiusmod nisi irure dolore Lorem magna. Excepteur adipisicing magna laboris voluptate aliquip elit esse mollit nostrud ad irure."
  },
  {
    "id": "5fa10a729805bc9a4727aad0",
    "name": "NEXGENE",
    "desc": "Ea ipsum Lorem eu aute tempor consequat cillum. Irure irure irure eiusmod est magna. Dolor sunt do est exercitation dolore esse aliqua non ad laboris. Et consequat dolore enim ullamco excepteur consequat id excepteur do labore sunt do. Lorem dolor sint do sunt sit tempor consectetur."
  },
  {
    "id": "5fa10a72d1e61188482320ed",
    "name": "ZAPPIX",
    "desc": "Dolore veniam mollit consequat quis incididunt laborum commodo in veniam exercitation cillum quis. Ut ipsum enim minim enim incididunt adipisicing adipisicing ullamco ullamco id voluptate reprehenderit culpa. Culpa eu veniam consectetur anim quis minim proident magna excepteur fugiat. Consequat adipisicing cillum consequat est excepteur duis incididunt reprehenderit exercitation irure reprehenderit amet."
  },
  {
    "id": "5fa10a722296f55d95f2bf59",
    "name": "AMTAP",
    "desc": "Cupidatat pariatur ipsum aute cupidatat proident anim et nisi nisi sit ullamco. Ex adipisicing ipsum eu consectetur laborum. Ut ipsum proident mollit tempor consectetur in. Elit eiusmod cillum exercitation laboris in velit id. Excepteur qui deserunt mollit incididunt duis in ea. Amet nulla consequat qui ullamco. Ut laboris qui pariatur eiusmod."
  }
]}
/>
```