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
      root.BackboneModelState = factory(root, exports, _, Backbone);
      return root.BackboneModelState;
    });

  // Next for Node.js or CommonJS.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'),
        Backbone = require('Backbone');
    module.exports = factory(root, exports, _, Backbone);

  // Finally, as a browser global.
  } else {
    root.BackboneModelState = factory(root, {}, root._, root.Backbone);
  }
}(this, function(root, exports, _, Backbone) {
  function Store(name) {
    if (!this.__ext) this.__ext = {};
    if (!this.__ext.ModelState) this.__ext.ModelState = {};

    this.__ext.ModelState[name] = this.toJSON();
    return this;
  }

  function Restore(name, params) {
    params = params || {};

    var opt = {
      silent: params.silent ? params.silent : false
    };

    if (!this.__ext ||
      !this.__ext.ModelState ||
      !this.__ext.ModelState[name]) {
      return this;
    }

    this.clear(opt);
    this.set(this.__ext.ModelState[name], opt);
    return this;
  }

  function ClearState(name) {
    if (!this.__ext || !this.__ext.ModelState) {
      return this;
    }
    if (name) {
      delete this.__ext.ModelState[name];
    } else {
      delete this.__ext.ModelState;
    }
    return this;
  }

  return {store: Store, restore: Restore, clearState: ClearState};
}));
