# SimpleLogin

This login was written to be used with Netlify's [gotrue-js](https://github.com/netlify/gotrue-js) library, although it could be modified for use with any login service with some effort.

Make sure to change `USER_API_URL` in the `login.ts/js` file to match your domain. And, if you want to compile this yourself, you must add the `gotrue-js` package by typing `yarn add gotrue-js`