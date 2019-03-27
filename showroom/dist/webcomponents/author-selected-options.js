// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-selected-options v1.0.1 available at github.com/author-elements/selected-options
// Last Build: 3/9/2019, 11:16:16 PM
var AuthorSelectedOptionsElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-selected-options> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorSelectedOptionsElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{contain:content;display:flex;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-selected-options{contain:content;display:flex;max-width:100%}author-selected-options *,author-selected-options :after,author-selected-options :before{box-sizing:border-box}</style><slot name="afterbegin"></slot><slot name="beforecontents"></slot><div class="contents"><slot id="contents"></slot></div><slot name="aftercontents"></slot><div class="beforeend"><slot name="beforeend"></slot></div></template>`);

      this.UTIL.defineProperties({
        contentsElement: {
          readonly: true,
          private: true,
          default: this.shadowRoot.getElementById('contents')
        },

        options: {
          private: true,
          default: []
        }
      });

      this.UTIL.definePrivateMethods({
        appendCaret: () => {
          let xmlns = 'http://www.w3.org/2000/svg';
          let width = 24;
          let height = 24;

          let caret = document.createElementNS(xmlns, 'svg');
          caret.slot = 'beforeend';
          caret.setAttributeNS(null, 'width', width);
          caret.setAttributeNS(null, 'height', height);
          caret.setAttributeNS(null, 'viewBox', `0 0 ${width} ${height}`);
          caret.setAttributeNS(null, 'fill', 'none');
          caret.setAttributeNS(null, 'stroke', 'currentColor');
          caret.setAttributeNS(null, 'stroke-width', '3');
          caret.setAttributeNS(null, 'stroke-linecap', 'square');
          caret.setAttributeNS(null, 'stroke-linejoin', 'miter');

          let shape = document.createElementNS(xmlns, 'polyline');
          shape.setAttributeNS(null, 'points', '6 9 12 15 18 9');

          caret.appendChild(shape);
          this.appendChild(caret);
        },

        optionSelectionHandler: evt => {
          evt.stopPropagation();

          this.clear(evt.detail.length === 0);
          evt.detail.forEach((option, index) => this.add(option, index === evt.detail.length - 1));
        },

        parentStateChangeHandler: evt => {
          let { name, value } = evt.detail;

          switch (name) {
            case 'multiple':
              if (!value) {
                return this.on('mousedown', this.PRIVATE.mousedownHandler)
              }

              return this.off('mousedown', this.PRIVATE.mousedownHandler)

            default: return
          }
        },

        mousedownHandler: evt => this.emit('toggle', null, this.parentNode)
      });

      this.UTIL.registerListeners(this, {
        connected: () => {
          this.PRIVATE.appendCaret();
          this.update();
          this.parentNode.on('state.change', this.PRIVATE.parentStateChangeHandler);
        },

        disconnected: () => {
          this.parentNode.off('state.change', this.PRIVATE.parentStateChangeHandler);
        },

        mousedown: this.PRIVATE.mousedownHandler,
        'options.selected': this.PRIVATE.optionSelectionHandler
      });
    }

    get list () {
      return this.PRIVATE.options.map(option => option.displayElement.text).join(', ')
    }

    add (option, update = true) {
      this.PRIVATE.options.push(option);
      update && this.update();
    }

    clear (update = true) {
      this.PRIVATE.options = [];
      update && this.update();
    }

    remove (option, update = true) {
      this.PRIVATE.options.splice(this.PRIVATE.options.indexOf(option), 1);
      update && this.update();
    }

    update (options = this.PRIVATE.options) {
      if (options !== this.PRIVATE.options) {
        this.PRIVATE.options = options;
      }

      this.PRIVATE.contentsElement.innerHTML = options.length > 0
        ? this.list
        : this.parentNode.placeholder || '';
    }
  }

  customElements.define('author-selected-options', AuthorSelectedOptionsElement);

  return AuthorSelectedOptionsElement;

}());
//# sourceMappingURL=author-selected-options.js.map
