// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-option v1.0.4 available at github.com/author-elements/option
// Last Build: 3/27/2019, 6:23:33 AM
var AuthorOptionElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-option> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorOptionElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{contain:content;display:flex;flex-direction:column;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}:host([hidden]){display:none!important}author-option{contain:content;display:flex;flex-direction:column;max-width:100%}author-option *,author-option :after,author-option :before{box-sizing:border-box}author-option[hidden]{display:none!important}</style><slot name="afterbegin"></slot><slot name="beforeoption"></slot><slot></slot><slot name="afteroption"></slot><slot name="beforeend"></slot></template>`);

      this.UTIL.defineAttributes({
        disabled: false,
        hidden: false,
        hover: false,
        id: '',
        label: '',
        selected: false,
        value: ''
      });

      this.UTIL.defineProperties({
        defaultSelected: false,

        form: {
          readonly: true,
          private: true
        },

        index: {
          readonly: true,
          get: () => this.parentNode.options.findIndex(option => option.displayElement === this)
        }
      });

      this.UTIL.definePrivateMethods({
        mouseButtonIsDown: evt => {
          let code = evt.buttons !== undefined ? evt.buttons : evt.nativeEvent.which;
          return code >= 1
        },

        mousemoveHandler: evt => this.emit('option.hovered', this.index),

        mouseoutHandler: evt => this.hover = false,

        mouseoverHandler: evt => {
          let mousedown = this.PRIVATE.mouseButtonIsDown(evt);

          if (!(this.parentNode.multiple && mousedown)) {
            this.hover = true;
            return
          }

          this.PRIVATE.select(true, evt.metaKey, evt.ctrlKey, mousedown);
        },

        parentStateChangeHandler: evt => {
          let { name, value } = evt.detail;

          switch (name) {
            case 'multiple':
              return this.PRIVATE.setMode(value ? 'select-multiple' : 'select-one')
          }
        },

        setMode: mode => {
          switch (mode) {
            case 'select-multiple':
              this.off('mouseup', this.PRIVATE.selectionHandler);
              return this.on('mousedown', this.PRIVATE.selectionHandler)

            case 'select-one':
              this.on('mouseup', this.PRIVATE.selectionHandler);
              return this.off('mousedown', this.PRIVATE.selectionHandler)
          }
        },

        select: (shiftKey = false, metaKey = false, ctrlKey = false, mousedown = false) => {
          let { index } = this;
          this.emit('option.selected', {index, shiftKey, metaKey, ctrlKey, mousedown}, this.parentNode);
        },

        selectionHandler: evt => {
          let { shiftKey, metaKey, ctrlKey } = evt;
          this.PRIVATE.select(shiftKey, metaKey, ctrlKey);
        }
      });

      this.UTIL.registerListeners(this, {
        connected: () => {
          this.parentNode.on('state.change', this.PRIVATE.parentStateChangeHandler);
          this.parentNode.multiple && this.PRIVATE.setMode('select-multiple');
        },

        disconnected: () => {
          this.off('mousedown', this.PRIVATE.selectionHandler);
          this.parentNode.off('state.change', this.PRIVATE.parentStateChangeHandler);
        },

        mouseover: this.PRIVATE.mouseoverHandler,
        mousemove: this.PRIVATE.mousemoveHandler,
        mouseout: this.PRIVATE.mouseoutHandler,
        mouseup: this.PRIVATE.selectionHandler
      });
    }

    static get observedAttributes () {
      return ['disabled', 'hidden', 'hover', 'label', 'selected', 'value']
    }

    get text () {
      return this.innerHTML
    }

    set text (content) {
      this.innerHTML = content;
    }

    /**
     * @method remove
     * Remove this option from the DOM.
     * @override
     */
    remove () {
      this.parentNode.options.splice(this.index, 1);
      super.remove();
    }
  }

  customElements.define('author-option', AuthorOptionElement);

  return AuthorOptionElement;

}());
//# sourceMappingURL=author-option.js.map
