// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-control v1.0.8 available at github.com/author-elements/control
// Last Build: 3/14/2019, 12:34:36 AM
var AuthorFormControlElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-control> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          class AuthorFormControlElement extends AuthorBaseElement(HTMLElement) {
    constructor () {
      super(`<template><style>@charset "UTF-8"; :host{display:flex;contain:style;max-width:100%}:host([type=field]){flex-direction:column}:host([type=select]){flex-direction:column}:host([type=toggle]){align-items:center}:host *,:host :after,:host :before{box-sizing:border-box}:host .hidden{display:none;visibility:hidden;opacity:0}:host .label-wrapper{flex:1 1 auto;display:flex}:host .input-wrapper{display:flex;align-items:center}:host([type=toggle]) .input-wrapper{order:-1;justify-content:center}author-control{display:flex;contain:style;max-width:100%}author-control[type=field]{flex-direction:column}author-control[type=select]{flex-direction:column}author-control[type=toggle]{align-items:center}author-control *,author-control :after,author-control :before{box-sizing:border-box}author-control .hidden{display:none;visibility:hidden;opacity:0}author-control .label-wrapper{flex:1 1 auto;display:flex}author-control .input-wrapper{display:flex;align-items:center}author-control[type=toggle] .input-wrapper{order:-1;justify-content:center}</style><slot name="afterbegin"></slot><slot name="beforelabelwrapper"></slot><div class="label-wrapper"><slot name="beforelabel"></slot><slot name="label"></slot><slot name="afterlabel"></slot></div><slot name="afterlabelwrapper"></slot><slot name="beforeinputwrapper"></slot><div class="input-wrapper"><slot name="beforeinput"></slot><slot name="input"></slot><slot name="afterinput"></slot></div><slot name="afterinputwrapper"></slot><slot name="beforeend"></slot></template>`);

      this.UTIL.defineAttributes({
        type: ''
      });

      this.UTIL.defineProperties({
        initialValue: {
          default: null
        },

        input: {
          private: true
        },

        fieldInputTypes: {
          readonly: true,
          private: true,
          default: [
            'color',
            'date',
            'datetime-local',
            'email',
            'file',
            'hidden',
            'image',
            'month',
            'number',
            'password',
            'range',
            'reset',
            'search',
            'submit',
            'tel',
            'text',
            'time',
            'url',
            'week',
            'textarea'
          ]
        },

        toggleInputTypes: {
          readonly: true,
          private: true,
          default: [
            'checkbox',
            'radio'
          ],
        },

        supportedTypes: {
          readonly: true,
          private: true,
          default: [
            'field',
            'toggle',
            'select'
          ]
        }
      });

      this.UTIL.definePrivateMethods({
        initDatalist: (input, datalist) => {
          this.type = 'select';

          if (!customElements.get('author-datalist')) {
            console.dir(input);
            input.id = this.PRIVATE.guid;
            datalist.id = `${input.id}_datalist`;
            input.setAttribute('list', datalist.id);
            input.slot = input.slot || 'input';
            // select.setAttribute('role', 'menu')
            this.PRIVATE.input = input;

            let titleEls = datalist.querySelectorAll('option[title]');
            titleEls.forEach(el => select.removeChild(el));

            Array.from(datalist.options).forEach(option => {
              if (option.hasAttribute('label') && option.getAttribute('label').trim() === '') {
                option.removeAttribute('label');
              }
            });

            return
          }

          let surrogate = document.createElement('author-datalist');
          surrogate.slot = 'input';

          Array.from(datalist.attributes).forEach(attr => {
            if (attr.specified) {
              surrogate.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                datalist.removeAttribute(attr.name);
              }
            }
          });

          this.removeChild(datalist);
          this.removeChild(input);

          surrogate.inject(input, datalist, this.PRIVATE.guid);
          this.appendChild(surrogate);
          this.PRIVATE.input = surrogate;
        },

        initInput: input => {
          input.slot = input.slot || 'input';
          this.PRIVATE.input = input;
          input.id = this.PRIVATE.guid;
          this.initialValue = input.value;

          if (this.PRIVATE.fieldInputTypes.indexOf(input.type) >= 0) {
            this.type = 'field';
          }

          if (this.PRIVATE.toggleInputTypes.indexOf(input.type) >= 0) {
            this.type = 'toggle';
          }
        },

        initLabel: label => {
          this.label = label;
          label.slot = label.slot || 'label';
          label.htmlFor = this.PRIVATE.guid;

          if (this.type === 'select') {
            this.label.addEventListener('click', (evt) => {
              this.input.focus();
            });
          }
        },

        initDefaultSelect: select => {
          select.id = this.PRIVATE.guid;
          select.slot = select.slot || 'input';
          select.setAttribute('role', 'menu');
          this.PRIVATE.input = select;

          // Purge incompatible attributes
          let titleEls = select.querySelectorAll('option[title]');
          titleEls.forEach(el => select.removeChild(el));

          Array.from(select.options).forEach(option => {
            if (option.hasAttribute('label') && option.getAttribute('label').trim() === '') {
              option.removeAttribute('label');
            }
          });
        },

        initMultipleSelectMenu: select => {
          this.type = 'select';
          this.initialValue = select.selectedOptions;

          if (!customElements.get('author-select')) {
            return this.PRIVATE.initDefaultSelect(select)
          }

          this.PRIVATE.initSelectSurrogate(select, document.createElement('author-select'));
        },

        initSelectSurrogate: (original, surrogate) => {
          surrogate.slot = 'input';
          surrogate.id = this.PRIVATE.guid;

          Array.from(original.attributes).forEach(attr => {
            if (attr.specified) {
              surrogate.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                original.removeAttribute(attr.name);
              }
            }
          });

          this.removeChild(original);
          surrogate.inject(original, this.querySelectorAll('label'));

          this.appendChild(surrogate);
          this.PRIVATE.input = surrogate;
        },

        initSelectMenu: select => {
          this.type = 'select';
          this.initialValue = select.selectedIndex;

          if (!customElements.get('author-select')) {
            return this.PRIVATE.initDefaultSelect(select)
          }

          this.PRIVATE.initSelectSurrogate(select, document.createElement('author-select'));
        },

        transformChild: (node, index, collection) => {
          switch (node.nodeName) {
            case 'LABEL':
              return this.PRIVATE.initLabel(node)

            case 'INPUT':
              // Check if there is an additional element adjacent to the input
              if (collection[index + 1] === void 0) {
                return this.PRIVATE.initInput(node)
              }

              let adjacentElement = collection[index + 1].addedNodes.item(0);

              if (!adjacentElement || adjacentElement.nodeName !== 'DATALIST') {
                return this.PRIVATE.initInput(node)
              }

              return this.PRIVATE.initDatalist(node, adjacentElement)

            case 'TEXTAREA':
              return this.PRIVATE.initInput(node)

            case 'SELECT':
              if (!node.multiple) {
                return this.PRIVATE.initSelectMenu(node)
              }

              return this.PRIVATE.initMultipleSelectMenu(node)

            default:
              this.initialValue = node.value;
              return
          }
        }
      });

      this.UTIL.monitorChildren((mutations, observer) => {
        let filtered = mutations.filter(record => {
          let node = record.addedNodes.item(0);

          if (!node) {
            return false
          }

          return node.nodeType !== 3
        });

        filtered.forEach((record, index, array) => {
          let node = record.addedNodes.item(0);

          if (!node) {
            return
          }

          this.PRIVATE.transformChild(node, index, array);
        });

        observer.disconnect();
      });

      this.UTIL.registerListeners(this, {
        connected: () => this.PRIVATE.guid = this.UTIL.generateGuid('control_'),
        rendered: () => Array.from(this.children).forEach((child, index, array) => this.PRIVATE.transformChild(child, index, array))
      });
    }

    static get observedAttributes () {
      return ['disabled']
    }

    get input () {
      return this.PRIVATE.input
    }

    set input (input) {
      if (this.input) {
        return console.warn(`Setting <${this.localName}> child input programmatically is not allowed.`)
      }

      this.PRIVATE.input = input;
    }
  }

  customElements.define('author-control', AuthorFormControlElement);

  return AuthorFormControlElement;

}());
//# sourceMappingURL=author-control.js.map
