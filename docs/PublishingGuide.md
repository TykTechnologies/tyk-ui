*In order to publish the changes, please do the following*
- After PR merge, make a new build and generates prod code of the library

```shell static
npm run build-prod
```

- Increase the library version in `package.json`

- Regenerate the `package-lock.json` file

```shell static
npm i
```

```shell static
git add .
```

- Commit and Push changes
```shell static
git commit -m "bump version"
```

- Publish the package to npm
```shell static
npm publish
```