// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-optgroup-label v1.0.1 available at github.com/author-elements/optgroup-label
// Last Build: 3/9/2019, 11:19:34 PM
var AuthorOptgroupLabelElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-optgroup-label> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorOptgroupLabelElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{contain:content;display:flex;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-optgroup-label{contain:content;display:flex;max-width:100%}author-optgroup-label *,author-optgroup-label :after,author-optgroup-label :before{box-sizing:border-box}</style><slot name="afterbegin"></slot><slot name="beforelabel"></slot><slot></slot><slot name="afterlabel"></slot><slot name="beforeend"></slot></template>`);
    }
  }

  customElements.define('author-optgroup-label', AuthorOptgroupLabelElement);

  return AuthorOptgroupLabelElement;

}());
//# sourceMappingURL=author-optgroup-label.js.map
