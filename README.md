Tyk-ui is our library of reusable presentational UI components. The full list of components and their documentation can be checked here:
https://nifty-johnson-6002dd.netlify.app/

*Installation*
```javascript
npm install --save @tyk-technologies/tyk-ui
```

**Loading tyk-ui into the project**

*Import the css before any other styles from your main js file*
```javascript static
import '@tyk-technologies/tyk-ui/src/index.css';
```

*Loading SASS files (only if your project uses SASS)*
```scss
@import '~@tyk-technologies/tyk-ui/lib/sass/index';
```
*NOTE*:
For projects that don't use SASS but just pure css we are also exposing the compiled styles.
```html
<link rel="stylesheet" type="text/css" href="node_modules/@tyk-technologies/tyk-ui/tyk-ui.css">
```

*Loading React components*
```javascript static
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

## Build tyk-ui project
Contributions to the current library are welcome, so please follow these steps each time you want to make a change:

  - Create a GH issue, describing the necessary change
  - Raise a PR with the change

  *In order to publish the changes, please do the following*
  - After PR merge, run `npm run build-prod` which generates prod code of the library
  - Increase the library version in `package.json`
  - Run `npm i` to regenerate the `package-lock.json` file
  - Commit and Push changes
  - Run `npm publish`
