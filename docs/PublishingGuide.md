*In order to publish the changes, please do the following*
- After PR merge, make a new build and generates prod code of the library

```static
npm run build-prod
```

- Increase the library version in `package.json`

- Regenerate the `package-lock.json` file

```static
npm i
```

```static
git add . 
```

- Commit and Push changes
```static
git commit -m "bump version"
```

- Publish the package to npm
```static
npm publish 
```