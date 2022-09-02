```js
<MonacoCodeEditor
  label="Standard code editor"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  disableValidation
  value={JSON.stringify({a: 2}, null, 2)}
  onChange={(value) => console.log(value)}
/>
```
```js
<MonacoCodeEditor
  label="Standard code editor"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  theme="default inline rounded-corners"
  value=""
/>
```
```js
<MonacoCodeEditor
  label="Standard code editor"
  labelwidth="50%"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  theme="default inline rounded-corners"
  value=""
/>
```
```js
<MonacoCodeEditor
  label="Code editor with error"
  error="some error about this code editor"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  value=""
/>
```
```js
<MonacoCodeEditor
  readOnly={ true }
  label="Code editor disabled"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  value=""
  readOnly={true}
/>
```

```js
<MonacoCodeEditor
  readOnly={ true }
  label="Code editor disabled"
  height={ "200px" }
  name="defaultPanelCode"
  mode="json"
  width="100%"
  showPrintMargin={true}
  showGutter={true}
  highlightActiveLine={true}
  editorProps={{$blockScrolling: Infinity}}
  setOptions={{
    showLineNumbers: true,
    tabSize: 2
  }}
  value=""
  readOnly={true}
/>
```
