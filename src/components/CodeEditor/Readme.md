```js
<CodeEditor
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
  value=""
/>
```
```js
<CodeEditor
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
<CodeEditor
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
<CodeEditor
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
/>
```
