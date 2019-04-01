// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-option v1.0.4 available at github.com/author-elements/option
// Last Build: 3/27/2019, 6:23:33 AM
var AuthorOptionElement = (function () {
  'use strict';

  if (!window.hasOwnProperty('AuthorBaseElement')) {
              console.error('[ERROR] <author-option> Required dependency "AuthorBaseElement" not found.');
              console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
            }
          var AuthorOptionElement = /*@__PURE__*/(function (superclass) {
              function AuthorOptionElement () {
      var this$1 = this;

      superclass.call(this, "<template><style>@charset \"UTF-8\"; :host{contain:content;display:flex;flex-direction:column;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}:host([hidden]){display:none!important}author-option{contain:content;display:flex;flex-direction:column;max-width:100%}author-option *,author-option :after,author-option :before{box-sizing:border-box}author-option[hidden]{display:none!important}</style><slot name=\"afterbegin\"></slot><slot name=\"beforeoption\"></slot><slot></slot><slot name=\"afteroption\"></slot><slot name=\"beforeend\"></slot></template>");

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
          get: function () { return this$1.parentNode.options.findIndex(function (option) { return option.displayElement === this$1; }); }
        }
      });

      this.UTIL.definePrivateMethods({
        mouseButtonIsDown: function (evt) {
          var code = evt.buttons !== undefined ? evt.buttons : evt.nativeEvent.which;
          return code >= 1
        },

        mousemoveHandler: function (evt) { return this$1.emit('option.hovered', this$1.index); },

        mouseoutHandler: function (evt) { return this$1.hover = false; },

        mouseoverHandler: function (evt) {
          var mousedown = this$1.PRIVATE.mouseButtonIsDown(evt);

          if (!(this$1.parentNode.multiple && mousedown)) {
            this$1.hover = true;
            return
          }

          this$1.PRIVATE.select(true, evt.metaKey, evt.ctrlKey, mousedown);
        },

        parentStateChangeHandler: function (evt) {
          var ref = evt.detail;
          var name = ref.name;
          var value = ref.value;

          switch (name) {
            case 'multiple':
              return this$1.PRIVATE.setMode(value ? 'select-multiple' : 'select-one')
          }
        },

        setMode: function (mode) {
          switch (mode) {
            case 'select-multiple':
              this$1.off('mouseup', this$1.PRIVATE.selectionHandler);
              return this$1.on('mousedown', this$1.PRIVATE.selectionHandler)

            case 'select-one':
              this$1.on('mouseup', this$1.PRIVATE.selectionHandler);
              return this$1.off('mousedown', this$1.PRIVATE.selectionHandler)
          }
        },

        select: function (shiftKey, metaKey, ctrlKey, mousedown) {
          if ( shiftKey === void 0 ) shiftKey = false;
          if ( metaKey === void 0 ) metaKey = false;
          if ( ctrlKey === void 0 ) ctrlKey = false;
          if ( mousedown === void 0 ) mousedown = false;

          var ref = this$1;
          var index = ref.index;
          this$1.emit('option.selected', {index: index, shiftKey: shiftKey, metaKey: metaKey, ctrlKey: ctrlKey, mousedown: mousedown}, this$1.parentNode);
        },

        selectionHandler: function (evt) {
          var shiftKey = evt.shiftKey;
          var metaKey = evt.metaKey;
          var ctrlKey = evt.ctrlKey;
          this$1.PRIVATE.select(shiftKey, metaKey, ctrlKey);
        }
      });

      this.UTIL.registerListeners(this, {
        connected: function () {
          this$1.parentNode.on('state.change', this$1.PRIVATE.parentStateChangeHandler);
          this$1.parentNode.multiple && this$1.PRIVATE.setMode('select-multiple');
        },

        disconnected: function () {
          this$1.off('mousedown', this$1.PRIVATE.selectionHandler);
          this$1.parentNode.off('state.change', this$1.PRIVATE.parentStateChangeHandler);
        },

        mouseover: this.PRIVATE.mouseoverHandler,
        mousemove: this.PRIVATE.mousemoveHandler,
        mouseout: this.PRIVATE.mouseoutHandler,
        mouseup: this.PRIVATE.selectionHandler
      });
    }

              if ( superclass ) AuthorOptionElement.__proto__ = superclass;
              AuthorOptionElement.prototype = Object.create( superclass && superclass.prototype );
              AuthorOptionElement.prototype.constructor = AuthorOptionElement;

              var prototypeAccessors = { text: { configurable: true } };
              var staticAccessors = { observedAttributes: { configurable: true } };

    staticAccessors.observedAttributes.get = function () {
      return ['disabled', 'hidden', 'hover', 'label', 'selected', 'value']
    };

    prototypeAccessors.text.get = function () {
      return this.innerHTML
    };

    prototypeAccessors.text.set = function (content) {
      this.innerHTML = content;
    };

    /**
     * @method remove
     * Remove this option from the DOM.
     * @override
     */
    AuthorOptionElement.prototype.remove = function remove () {
      this.parentNode.options.splice(this.index, 1);
      superclass.prototype.remove.call(this);
    };

              Object.defineProperties( AuthorOptionElement.prototype, prototypeAccessors );
              Object.defineProperties( AuthorOptionElement, staticAccessors );

              return AuthorOptionElement;
            }(AuthorBaseElement(HTMLElement)));

  customElements.define('author-option', AuthorOptionElement);

  return AuthorOptionElement;

}());
//# sourceMappingURL=author-option.es5.js.map
