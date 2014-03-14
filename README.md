connect-expires
===============

expire middlewae for connect(express)

## How to use

```js
var expires = require('/path/to/connect-expires')
  ;

// ...
app.use(expires({
  pattern: /^(?:\/dist\/combine|\/img\/)/,
  duration: 1000 * 60 * 60 * 24 * 15
}));
app.use(express.static(path.join(__dirname, 'public')));
// ...
```

install connect-expires via npm first:

```
npm install connect-expires
```

and then include it in your project with:

```javascript
var expires = require('connect-expires');
```

## option

* pattern
  * Patterns of files that adapt
  * Type: RegExp
* duration
  * Period to adapt the Expires
  * Type: Number (ms)
  * default: one day
