## With ReactJS

*Themes*
```js
<Message theme="default">Default Message</Message>
<Message theme="success">Success Message</Message>
<Message theme="info">Info Message</Message>
<Message theme="warning">Warning Message</Message>
<Message theme="danger">Danger Message</Message>
```

## With HTML
To start with, `tyk-message` class must always be used, as it will give the element the main styling.
```html
<div class="tyk-message" </div>
```
 Then it is used as a "prefix" followed by double hyphen to apply:
```js
<div class="tyk-message tyk-message--default">Default Message</div>
```
All available theme colors are refered above.
