// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-optgroup v1.0.1 available at github.com/author-elements/optgroup
// Last Build: 3/9/2019, 11:19:56 PM
var AuthorOptgroupElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-optgroup> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          var AuthorOptgroupElement = /*@__PURE__*/(function (superclass) {
              function AuthorOptgroupElement () {
      var this$1 = this;

      superclass.call(this, "<template><style>@charset \"UTF-8\"; :host{contain:content;display:flex;flex-direction:column;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-optgroup{contain:content;display:flex;flex-direction:column;max-width:100%}author-optgroup *,author-optgroup :after,author-optgroup :before{box-sizing:border-box}</style><slot name=\"afterbegin\"></slot><slot name=\"beforeoptgroup\"></slot><slot></slot><slot name=\"afteroptgroup\"></slot><slot name=\"beforeend\"></slot></template>");

      this.UTIL.definePrivateMethods({
        optionSelectionHandler: function (evt) { return this$1.emit('option.selected', evt.detail, this$1.parentNode); },
        parentStateChangeHandler: function (evt) { return this$1.emit('state.change', evt.detail); }
      });

      this.UTIL.registerListeners(this, {
        connected: function () {
          this$1.parentNode.on('state.change', this$1.PRIVATE.parentStateChangeHandler);
        },

        disconnected: function () {
          this$1.parentNode.off('state.change', this$1.PRIVATE.parentStateChangeHandler);
        },

        'option.selected': this.PRIVATE.optionSelectionHandler
      });
    }

              if ( superclass ) AuthorOptgroupElement.__proto__ = superclass;
              AuthorOptgroupElement.prototype = Object.create( superclass && superclass.prototype );
              AuthorOptgroupElement.prototype.constructor = AuthorOptgroupElement;

              var prototypeAccessors = { options: { configurable: true },multiple: { configurable: true } };

    prototypeAccessors.options.get = function () {
      return this.parentNode.options
    };

    prototypeAccessors.multiple.get = function () {
      return this.parentNode.multiple
    };

              Object.defineProperties( AuthorOptgroupElement.prototype, prototypeAccessors );

              return AuthorOptgroupElement;
            }(AuthorBaseElement(HTMLElement)));

  customElements.define('author-optgroup', AuthorOptgroupElement);

  return AuthorOptgroupElement;

}());
//# sourceMappingURL=author-optgroup.es5.js.map
