```css
.right-align {
  text-align: end !important;
}

.left-align {
  text-align: start !important;
}

.center-align {
  text-align: center !important;
}

.left {
  float: inline-start !important;
}

.right {
  float: inline-end !important;
}

.hide {
  display: none !important;
}

.no-margin {
  margin: 0 !important;
}

.no-margin-bottom {
  margin-block-end: 0 !important;
}

.no-margin-top {
  margin-block-start: 0 !important;
}

.no-margin-right {
  margin-inline-end: 0 !important;
}

.no-margin-left {
  margin-inline-start: 0 !important;
}

.disabled-section {
  color: var(--color-text-light);
}

.top-buffer-large {
  margin-block-start: var(--top-buffer-large) !important;
}

.top-buffer-small {
  margin-block-start: var(--top-buffer-small) !important;
}

.top-buffer-medium {
  margin-block-start: var(--top-buffer-medium) !important;
}

.bottom-buffer-large {
  margin-block-end: var(--bottom-buffer-large) !important;
}

.bottom-buffer-small {
  margin-block-end: var(--bottom-buffer-small) !important;
}

.bottom-buffer-medium {
  margin-block-end: var(--bottom-buffer-medium) !important;
}

.right-buffer-large {
  margin-inline-end: var(--right-buffer-large) !important;
}

.right-buffer-small {
  margin-inline-end: var(--right-buffer-small) !important;
}

.right-buffer-medium {
  margin-inline-end: var(--right-buffer-medium) !important;
}

.left-buffer-large {
  margin-inline-start: var(--left-buffer-large) !important;
}

.left-buffer-small {
  margin-inline-start: var(--left-buffer-small) !important;
}

.left-buffer-medium {
  margin-inline-start: var(--left-buffer-medium) !important;
}

.word-wrap {
  word-wrap: break-word;
  word-break: break-all;
}

.clear-left {
  clear: inline-start;
}

.flex-container {
  display: flex;
}

.vertical-center-align {
  align-items: center;
}


.right-align-controls {
  align-items: center;
  display: flex;
  margin-inline-start: auto;
}

.inline-label {
  margin-inline-end: 15px;
}

.nowrap {
  white-space: nowrap;
}

```

### Examples


- Adding buttom buffer

```jsx
<p className="bottom-buffer-medium">Hello World</p>
```