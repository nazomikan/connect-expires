connect-expires
===============

expire middlewae for connext(express)

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

## option

* pattern
  * Patterns of files that adapt
* duration
  * Period to adapt the Expires
