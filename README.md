Tyk-ui is our library of reusable presentational UI components. The full list of components and their documentation can be checked here:
https://tyktechnologies.github.io/tyk-ui-styleguide/

## Local setup

**Installing library with npm**
```javascript
npm install --save @tyk-technologies/tyk-ui
```

**Loading tyk-ui into the project**

*Loading SASS files*
```scss
$font-path: "~@tyk-technologies/tyk-ui/lib/fonts/";
$component-images-path: "~@tyk-technologies/tyk-ui/lib/images/";
@import '~@tyk-technologies/tyk-ui/lib/sass/index';
```
*NOTE*:
For projects that don't SASS but just pure css we are also exposing the compiled styles.
```html
<link rel="stylesheet" type="text/css" href="node_modules/@tyk-technologies/tyk-ui/tyk-ui.css">
```

*Loading React components*
```javascript
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

*Note*: for the projects that don't have React this is not usable, and we can use just the styling.
