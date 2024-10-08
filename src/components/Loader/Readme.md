**Circular loader**
```js
<Loader />
```
**Circular loader size small**
```js
<Loader size="small" />
```
**Circular loader custom size**
```js
<Loader size="100px" />
```
A custom size can also be added from css. Just add a css class to the component (e.g. `<Loader className="my-loader" />`) and overwrite the `--loader-size` variable for that class.
```css
.loader-type-circular.my-loader {
  --loader-size: 100px;
}
```
**Loader with background**
```js
<div style={{ position: 'relative' }}>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <Loader withbackground />
</div>
```

**Linear loader**
```js
<Loader type="linear" />
```
**Linear loader in the loaded state**
```js
<Loader type="linear" isLoaded />
```
