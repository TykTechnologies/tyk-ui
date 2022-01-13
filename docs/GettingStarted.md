Tyk-ui is library of reusable presentational UI components.

### **Installation**

```html
npm install --save @tyk-technologies/tyk-ui
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