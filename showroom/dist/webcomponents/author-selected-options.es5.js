// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-selected-options v1.0.1 available at github.com/author-elements/selected-options
// Last Build: 3/9/2019, 11:16:16 PM
var AuthorSelectedOptionsElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-selected-options> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          var AuthorSelectedOptionsElement = /*@__PURE__*/(function (superclass) {
              function AuthorSelectedOptionsElement () {
      var this$1 = this;

      superclass.call(this, "<template><style>@charset \"UTF-8\"; :host{contain:content;display:flex;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-selected-options{contain:content;display:flex;max-width:100%}author-selected-options *,author-selected-options :after,author-selected-options :before{box-sizing:border-box}</style><slot name=\"afterbegin\"></slot><slot name=\"beforecontents\"></slot><div class=\"contents\"><slot id=\"contents\"></slot></div><slot name=\"aftercontents\"></slot><div class=\"beforeend\"><slot name=\"beforeend\"></slot></div></template>");

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
        appendCaret: function () {
          var xmlns = 'http://www.w3.org/2000/svg';
          var width = 24;
          var height = 24;

          var caret = document.createElementNS(xmlns, 'svg');
          caret.slot = 'beforeend';
          caret.setAttributeNS(null, 'width', width);
          caret.setAttributeNS(null, 'height', height);
          caret.setAttributeNS(null, 'viewBox', ("0 0 " + width + " " + height));
          caret.setAttributeNS(null, 'fill', 'none');
          caret.setAttributeNS(null, 'stroke', 'currentColor');
          caret.setAttributeNS(null, 'stroke-width', '3');
          caret.setAttributeNS(null, 'stroke-linecap', 'square');
          caret.setAttributeNS(null, 'stroke-linejoin', 'miter');

          var shape = document.createElementNS(xmlns, 'polyline');
          shape.setAttributeNS(null, 'points', '6 9 12 15 18 9');

          caret.appendChild(shape);
          this$1.appendChild(caret);
        },

        optionSelectionHandler: function (evt) {
          evt.stopPropagation();

          this$1.clear(evt.detail.length === 0);
          evt.detail.forEach(function (option, index) { return this$1.add(option, index === evt.detail.length - 1); });
        },

        parentStateChangeHandler: function (evt) {
          var ref = evt.detail;
          var name = ref.name;
          var value = ref.value;

          switch (name) {
            case 'multiple':
              if (!value) {
                return this$1.on('mousedown', this$1.PRIVATE.mousedownHandler)
              }

              return this$1.off('mousedown', this$1.PRIVATE.mousedownHandler)

            default: return
          }
        },

        mousedownHandler: function (evt) { return this$1.emit('toggle', null, this$1.parentNode); }
      });

      this.UTIL.registerListeners(this, {
        connected: function () {
          this$1.PRIVATE.appendCaret();
          this$1.update();
          this$1.parentNode.on('state.change', this$1.PRIVATE.parentStateChangeHandler);
        },

        disconnected: function () {
          this$1.parentNode.off('state.change', this$1.PRIVATE.parentStateChangeHandler);
        },

        mousedown: this.PRIVATE.mousedownHandler,
        'options.selected': this.PRIVATE.optionSelectionHandler
      });
    }

              if ( superclass ) AuthorSelectedOptionsElement.__proto__ = superclass;
              AuthorSelectedOptionsElement.prototype = Object.create( superclass && superclass.prototype );
              AuthorSelectedOptionsElement.prototype.constructor = AuthorSelectedOptionsElement;

              var prototypeAccessors = { list: { configurable: true } };

    prototypeAccessors.list.get = function () {
      return this.PRIVATE.options.map(function (option) { return option.displayElement.text; }).join(', ')
    };

    AuthorSelectedOptionsElement.prototype.add = function add (option, update) {
      if ( update === void 0 ) update = true;

      this.PRIVATE.options.push(option);
      update && this.update();
    };

    AuthorSelectedOptionsElement.prototype.clear = function clear (update) {
      if ( update === void 0 ) update = true;

      this.PRIVATE.options = [];
      update && this.update();
    };

    AuthorSelectedOptionsElement.prototype.remove = function remove (option, update) {
      if ( update === void 0 ) update = true;

      this.PRIVATE.options.splice(this.PRIVATE.options.indexOf(option), 1);
      update && this.update();
    };

    AuthorSelectedOptionsElement.prototype.update = function update (options) {
      if ( options === void 0 ) options = this.PRIVATE.options;

      if (options !== this.PRIVATE.options) {
        this.PRIVATE.options = options;
      }

      this.PRIVATE.contentsElement.innerHTML = options.length > 0
        ? this.list
        : this.parentNode.placeholder || '';
    };

              Object.defineProperties( AuthorSelectedOptionsElement.prototype, prototypeAccessors );

              return AuthorSelectedOptionsElement;
            }(AuthorBaseElement(HTMLElement)));

  customElements.define('author-selected-options', AuthorSelectedOptionsElement);

  return AuthorSelectedOptionsElement;

}());
//# sourceMappingURL=author-selected-options.es5.js.map
