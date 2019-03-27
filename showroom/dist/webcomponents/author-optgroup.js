// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-optgroup v1.0.1 available at github.com/author-elements/optgroup
// Last Build: 3/9/2019, 11:19:56 PM
var AuthorOptgroupElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-optgroup> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorOptgroupElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{contain:content;display:flex;flex-direction:column;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-optgroup{contain:content;display:flex;flex-direction:column;max-width:100%}author-optgroup *,author-optgroup :after,author-optgroup :before{box-sizing:border-box}</style><slot name="afterbegin"></slot><slot name="beforeoptgroup"></slot><slot></slot><slot name="afteroptgroup"></slot><slot name="beforeend"></slot></template>`);

      this.UTIL.definePrivateMethods({
        optionSelectionHandler: evt => this.emit('option.selected', evt.detail, this.parentNode),
        parentStateChangeHandler: evt => this.emit('state.change', evt.detail)
      });

      this.UTIL.registerListeners(this, {
        connected: () => {
          this.parentNode.on('state.change', this.PRIVATE.parentStateChangeHandler);
        },

        disconnected: () => {
          this.parentNode.off('state.change', this.PRIVATE.parentStateChangeHandler);
        },

        'option.selected': this.PRIVATE.optionSelectionHandler
      });
    }

    get options () {
      return this.parentNode.options
    }

    get multiple () {
      return this.parentNode.multiple
    }
  }

  customElements.define('author-optgroup', AuthorOptgroupElement);

  return AuthorOptgroupElement;

}());
//# sourceMappingURL=author-optgroup.js.map
