//     Backbone.Model.State 0.2.0
//     (c) Artyom Trityak
//     Backbone.Model.State may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/artyomtrityak/backbone.model.state

(function(root, factory) {
  // Set up Backbone.Model.State appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone', 'exports'], function(_, Backbone, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      factory(root, exports, _, Backbone);
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'),
        Backbone = require('Backbone');
    factory(root, exports, _, Backbone);

  // Finally, as a browser global.
  } else {
    factory(root, {}, root._, root.Backbone);
  }
}(this, function(root, exports, _, Backbone) {
  function Store(name) {
    if (!this.__ext) {
      this.__ext = {};
    }
    if (!this.__ext.ModelState) {
      this.__ext.ModelState = {};
    }
    this.__ext.ModelState[name] = this.toJSON();
    return this;
  }

  function Restore(name) {
    if (!this.__ext ||
      !this.__ext.ModelState ||
      !this.__ext.ModelState[name]) {
      throw "There is no state with name " + name;
    }
    this.clear();
    this.set(this.__ext.ModelState[name]);
    return this;
  }

  _.extend(Backbone.Model.prototype, {
    store: Store,
    restore: Restore
  });
}));
