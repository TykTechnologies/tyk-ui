Tyk-ui is our private library of reusable presentational UI components. 

### **Installing library with npm**

- *Pre-installation steps*
Before installing the library, bear in mind that this is a private npm module, therefore in order to have access to it follow next steps:

  - Create an account on <a href="https://www.npmjs.com/signup">npm</a>
  - Give your username to any owner of the `tyk-ui` library, so that you can be added as a member of the project
  - Add npm user locally

  ```static
  npm adduser
  ```

  - Follow next steps

### **Installation**

```html
npm install --save @tyk-technologies/tyk-ui
```


```md
Note that this is a private package so you'll need to be added as a member to the tyk-technologies org and then run `npm adduser` which will ask you for your npm credentials
```

### **Loading tyk-ui into the project**


- *Loading React components*

```jsx static
import {
  Button,
  Column,
  Dropdown,
  Icon,
  InfoNote,
  Message,
  Modal,
  Panel,
  Row
} from '@tyk-technologies/tyk-ui';
```

```md
*Note*: for the projects that don't have React this is not usable, and we can use just the styling.
```


- *Loading SASS files*

```scss
$font-path: "~@tyk-technologies/tyk-ui/lib/fonts/";
$component-images-path: "~@tyk-technologies/tyk-ui/lib/images/";
@import '~@tyk-technologies/tyk-ui/lib/sass/index';
```

```html
<link rel="stylesheet" type="text/css" href="node_modules/@tyk-technologies/tyk-ui/tyk-ui.css">
```

```md
NOTE : For projects that don't SASS but just pure css we are also exposing the compiled styles.
```
### Testing on local 

- You can test the changes on your local dev environment by replacing the your `@tyk-technologies/tyk-ui/lib` with newly built lib 

eg 
```md
cp -a lib/. /Users/me/go/src/github.com/TykTechnologies/tyk-analytics/webclient/node_modules/@tyk-technologies/tyk-ui/lib
```