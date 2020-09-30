- 

*In order to publish the changes, please do the following*
- After PR merge, run `npm run build-prod` which generates prod code of the library
- Increase the library version in `package.json`
- Run `npm i` to regenerate the `package-lock.json` file
- Commit and Push changes
- Run `npm publish`