Backbone.Model.State
===================

[![Build Status](https://travis-ci.org/artyomtrityak/backbone.model.state.png)](https://travis-ci.org/artyomtrityak/backbone.model.state)
<a href="https://twitter.com/intent/tweet?hashtags=&original_referer=https://github.com/&text=Check+out+backbone.model.state to store and restore your model states&tw_p=tweetbutton&url=https://github.com/artyomtrityak/backbone.model.state" target="_blank">
  <img src="http://jpillora.com/github-twitter-button/img/tweet.png"></img>
</a>



## Dependencies loading

### Require.js AMD

```js
requirejs.config({
  baseUrl: 'static/',
  urlArgs: 'bust=' +  Date.now(),
  paths: {
    jquery: 'assets/js/jquery',
    underscore: 'assets/js/underscore',
    backbone: 'assets/js/backbone',
    ModelState: 'assets/js/backbone.model.state'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    ModelState: {
      deps: ['underscore', 'backbone']
    },
    app: ['ModelState']
  }
});
```

### CommonJS

```js
var Backbone = require('backbone');
require('ModelState');

```

### Old style

```html
<script src="assets/js/jquery.js" />
<script src="assets/js/underscore.js" />
<script src="assets/js/backbone.js" />
<script src="assets/js/backbone.model.state.js" />
```

### Bower

```sh
bower install backbone.model.state
```
