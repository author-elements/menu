// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-control v1.0.8 available at github.com/author-elements/control
// Last Build: 3/14/2019, 12:34:36 AM
var AuthorFormControlElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-control> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          var AuthorFormControlElement = /*@__PURE__*/(function (superclass) {
              function AuthorFormControlElement () {
      var this$1 = this;

      superclass.call(this, "<template><style>@charset \"UTF-8\"; :host{display:flex;contain:style;max-width:100%}:host([type=field]){flex-direction:column}:host([type=select]){flex-direction:column}:host([type=toggle]){align-items:center}:host *,:host :after,:host :before{box-sizing:border-box}:host .hidden{display:none;visibility:hidden;opacity:0}:host .label-wrapper{flex:1 1 auto;display:flex}:host .input-wrapper{display:flex;align-items:center}:host([type=toggle]) .input-wrapper{order:-1;justify-content:center}author-control{display:flex;contain:style;max-width:100%}author-control[type=field]{flex-direction:column}author-control[type=select]{flex-direction:column}author-control[type=toggle]{align-items:center}author-control *,author-control :after,author-control :before{box-sizing:border-box}author-control .hidden{display:none;visibility:hidden;opacity:0}author-control .label-wrapper{flex:1 1 auto;display:flex}author-control .input-wrapper{display:flex;align-items:center}author-control[type=toggle] .input-wrapper{order:-1;justify-content:center}</style><slot name=\"afterbegin\"></slot><slot name=\"beforelabelwrapper\"></slot><div class=\"label-wrapper\"><slot name=\"beforelabel\"></slot><slot name=\"label\"></slot><slot name=\"afterlabel\"></slot></div><slot name=\"afterlabelwrapper\"></slot><slot name=\"beforeinputwrapper\"></slot><div class=\"input-wrapper\"><slot name=\"beforeinput\"></slot><slot name=\"input\"></slot><slot name=\"afterinput\"></slot></div><slot name=\"afterinputwrapper\"></slot><slot name=\"beforeend\"></slot></template>");

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
        initDatalist: function (input, datalist) {
          this$1.type = 'select';

          if (!customElements.get('author-datalist')) {
            console.dir(input);
            input.id = this$1.PRIVATE.guid;
            datalist.id = (input.id) + "_datalist";
            input.setAttribute('list', datalist.id);
            input.slot = input.slot || 'input';
            // select.setAttribute('role', 'menu')
            this$1.PRIVATE.input = input;

            var titleEls = datalist.querySelectorAll('option[title]');
            titleEls.forEach(function (el) { return select.removeChild(el); });

            Array.from(datalist.options).forEach(function (option) {
              if (option.hasAttribute('label') && option.getAttribute('label').trim() === '') {
                option.removeAttribute('label');
              }
            });

            return
          }

          var surrogate = document.createElement('author-datalist');
          surrogate.slot = 'input';

          Array.from(datalist.attributes).forEach(function (attr) {
            if (attr.specified) {
              surrogate.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                datalist.removeAttribute(attr.name);
              }
            }
          });

          this$1.removeChild(datalist);
          this$1.removeChild(input);

          surrogate.inject(input, datalist, this$1.PRIVATE.guid);
          this$1.appendChild(surrogate);
          this$1.PRIVATE.input = surrogate;
        },

        initInput: function (input) {
          input.slot = input.slot || 'input';
          this$1.PRIVATE.input = input;
          input.id = this$1.PRIVATE.guid;
          this$1.initialValue = input.value;

          if (this$1.PRIVATE.fieldInputTypes.indexOf(input.type) >= 0) {
            this$1.type = 'field';
          }

          if (this$1.PRIVATE.toggleInputTypes.indexOf(input.type) >= 0) {
            this$1.type = 'toggle';
          }
        },

        initLabel: function (label) {
          this$1.label = label;
          label.slot = label.slot || 'label';
          label.htmlFor = this$1.PRIVATE.guid;

          if (this$1.type === 'select') {
            this$1.label.addEventListener('click', function (evt) {
              this$1.input.focus();
            });
          }
        },

        initDefaultSelect: function (select) {
          select.id = this$1.PRIVATE.guid;
          select.slot = select.slot || 'input';
          select.setAttribute('role', 'menu');
          this$1.PRIVATE.input = select;

          // Purge incompatible attributes
          var titleEls = select.querySelectorAll('option[title]');
          titleEls.forEach(function (el) { return select.removeChild(el); });

          Array.from(select.options).forEach(function (option) {
            if (option.hasAttribute('label') && option.getAttribute('label').trim() === '') {
              option.removeAttribute('label');
            }
          });
        },

        initMultipleSelectMenu: function (select) {
          this$1.type = 'select';
          this$1.initialValue = select.selectedOptions;

          if (!customElements.get('author-select')) {
            return this$1.PRIVATE.initDefaultSelect(select)
          }

          this$1.PRIVATE.initSelectSurrogate(select, document.createElement('author-select'));
        },

        initSelectSurrogate: function (original, surrogate) {
          surrogate.slot = 'input';
          surrogate.id = this$1.PRIVATE.guid;

          Array.from(original.attributes).forEach(function (attr) {
            if (attr.specified) {
              surrogate.setAttribute(attr.name, attr.value);

              if (attr.name === 'autofocus') {
                original.removeAttribute(attr.name);
              }
            }
          });

          this$1.removeChild(original);
          surrogate.inject(original, this$1.querySelectorAll('label'));

          this$1.appendChild(surrogate);
          this$1.PRIVATE.input = surrogate;
        },

        initSelectMenu: function (select) {
          this$1.type = 'select';
          this$1.initialValue = select.selectedIndex;

          if (!customElements.get('author-select')) {
            return this$1.PRIVATE.initDefaultSelect(select)
          }

          this$1.PRIVATE.initSelectSurrogate(select, document.createElement('author-select'));
        },

        transformChild: function (node, index, collection) {
          switch (node.nodeName) {
            case 'LABEL':
              return this$1.PRIVATE.initLabel(node)

            case 'INPUT':
              // Check if there is an additional element adjacent to the input
              if (collection[index + 1] === void 0) {
                return this$1.PRIVATE.initInput(node)
              }

              var adjacentElement = collection[index + 1].addedNodes.item(0);

              if (!adjacentElement || adjacentElement.nodeName !== 'DATALIST') {
                return this$1.PRIVATE.initInput(node)
              }

              return this$1.PRIVATE.initDatalist(node, adjacentElement)

            case 'TEXTAREA':
              return this$1.PRIVATE.initInput(node)

            case 'SELECT':
              if (!node.multiple) {
                return this$1.PRIVATE.initSelectMenu(node)
              }

              return this$1.PRIVATE.initMultipleSelectMenu(node)

            default:
              this$1.initialValue = node.value;
              return
          }
        }
      });

      this.UTIL.monitorChildren(function (mutations, observer) {
        var filtered = mutations.filter(function (record) {
          var node = record.addedNodes.item(0);

          if (!node) {
            return false
          }

          return node.nodeType !== 3
        });

        filtered.forEach(function (record, index, array) {
          var node = record.addedNodes.item(0);

          if (!node) {
            return
          }

          this$1.PRIVATE.transformChild(node, index, array);
        });

        observer.disconnect();
      });

      this.UTIL.registerListeners(this, {
        connected: function () { return this$1.PRIVATE.guid = this$1.UTIL.generateGuid('control_'); },
        rendered: function () { return Array.from(this$1.children).forEach(function (child, index, array) { return this$1.PRIVATE.transformChild(child, index, array); }); }
      });
    }

              if ( superclass ) AuthorFormControlElement.__proto__ = superclass;
              AuthorFormControlElement.prototype = Object.create( superclass && superclass.prototype );
              AuthorFormControlElement.prototype.constructor = AuthorFormControlElement;

              var prototypeAccessors = { input: { configurable: true } };
              var staticAccessors = { observedAttributes: { configurable: true } };

    staticAccessors.observedAttributes.get = function () {
      return ['disabled']
    };

    prototypeAccessors.input.get = function () {
      return this.PRIVATE.input
    };

    prototypeAccessors.input.set = function (input) {
      if (this.input) {
        return console.warn(("Setting <" + (this.localName) + "> child input programmatically is not allowed."))
      }

      this.PRIVATE.input = input;
    };

              Object.defineProperties( AuthorFormControlElement.prototype, prototypeAccessors );
              Object.defineProperties( AuthorFormControlElement, staticAccessors );

              return AuthorFormControlElement;
            }(AuthorBaseElement(HTMLElement)));

  customElements.define('author-control', AuthorFormControlElement);

  return AuthorFormControlElement;

}());
//# sourceMappingURL=author-control.es5.js.map
