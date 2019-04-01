// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-menu v1.0.7 available at github.com/author-elements/menu
// Last Build: 3/28/2019, 1:29:32 AM
var AuthorMenuElement = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  if (!window.hasOwnProperty('AuthorBaseElement')) {
    console.error('[ERROR] <author-menu> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  (function () {
    var missingDependencies = Array.from(new Set([])).filter(function (dep) {
      return !customElements.get(dep);
    });

    if (missingDependencies.length > 0) {
      console.error("[ERROR] <author-menu> Required dependenc".concat(missingDependencies.length !== 1 ? 'ies' : 'y', " not found: ").concat(missingDependencies.map(function (d) {
        return "<".concat(d, ">");
      }).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])));
      missingDependencies.forEach(function (dep, i) {
        return console.info("".concat(i + 1, ". <").concat(dep, "> is available at ").concat('https://github.com/author-elements/menu'.replace('menu', dep.replace('author-', ''))));
      });
    }
  })();

  var AuthorMenuElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorMenuElement, _AuthorBaseElement);

    function AuthorMenuElement() {
      var _this;

      var templateString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classCallCheck(this, AuthorMenuElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorMenuElement).call(this, templateString || "<template><style>@charset \"UTF-8\"; :host *,:host :after,:host :before{box-sizing:border-box}author-menu *,author-menu :after,author-menu :before{box-sizing:border-box}</style><slot></slot></template>"));

      _this.UTIL.defineProperties({
        form: {
          readonly: true
        },
        hoveredIndex: {
          readonly: true,
          get: function get() {
            return _this.optionsElement.hoveredIndex;
          }
        },
        injected: {
          private: true,
          default: false
        },
        options: {
          readonly: true,
          get: function get() {
            return _this.optionsElement.displayOptions;
          }
        },
        optionsElement: {
          readonly: true,
          get: function get() {
            return _this.querySelector('author-options');
          }
        },
        selectedOptions: {
          readonly: true,
          get: function get() {
            return _this.optionsElement ? _this.optionsElement.selectedOptions : null;
          }
        },
        title: {
          private: true,
          default: ''
        },
        willValidate: {
          readonly: true,
          get: function get() {
            return _this.sourceElement.willValidate;
          }
        },
        validationMessage: {
          readonly: true,
          get: function get() {
            return _this.sourceElement.validationMessage;
          }
        },
        validity: {
          readonly: true,
          get: function get() {
            return _this.sourceElement.validity;
          }
        }
      });

      _this.UTIL.defineAttributes({
        name: '',
        placeholder: '',
        autofocus: false,
        disabled: false,
        open: false,
        required: false,
        size: {
          get: function get() {
            return _this.PRIVATE.throwSizeAttributeWarning();
          },
          set: function set() {
            return _this.PRIVATE.throwSizeAttributeWarning();
          }
        }
      });

      _this.UTIL.definePrivateMethods({
        addOpenListeners: function addOpenListeners() {
          document.addEventListener('mousedown', _this.PRIVATE.bodyMousedownHandler);
          document.addEventListener('touchcancel', _this.PRIVATE.bodyMousedownHandler);
          document.addEventListener('touchend', _this.PRIVATE.bodyMousedownHandler);
        },
        blurHandler: function blurHandler(evt) {
          return _this.off('keydown', _this.PRIVATE.keydownHandler);
        },
        bodyMousedownHandler: function bodyMousedownHandler(evt) {
          if (evt.target === _assertThisInitialized(_this) || _this.contains(evt.target)) {
            return;
          }

          _this.open = false;
        },
        focusHandler: function focusHandler(evt) {
          return _this.on('keydown', _this.PRIVATE.keydownHandler);
        },
        keydownHandler: function keydownHandler(evt) {
          var startIndex = _this.hoveredIndex > -1 ? _this.hoveredIndex : _this.selectedIndex > -1 ? _this.selectedIndex : -1;

          switch (evt[_this.keySource]) {
            case 27:
            case 'Escape':
              _this.open = false;
              return;

            case 13:
            case 'Enter':
            case 32:
            case ' ':
              evt.preventDefault();

              if (!_this.multiple) {
                if (!_this.open && (evt[_this.keySource] === 32 || evt[_this.keySource] === ' ')) {
                  _this.open = true;
                  return;
                }

                if (_this.hoveredIndex === _this.selectedIndex || _this.hoveredIndex === -1) {
                  _this.open = false;
                  return;
                }

                _this.selectedIndex = _this.hoveredIndex;
              }

              break;

            case 38:
            case 'ArrowUp':
              evt.preventDefault();

              if (!_this.multiple && !_this.open) {
                _this.open = true;
                return;
              }

              return _this.emit('keydown.arrowUp', {
                shiftKey: evt.shiftKey,
                startIndex: startIndex
              }, _this.optionsElement);

            case 40:
            case 'ArrowDown':
              evt.preventDefault();

              if (!_this.multiple && !_this.open) {
                _this.open = true;
                return;
              }

              return _this.emit('keydown.arrowDown', {
                shiftKey: evt.shiftKey,
                startIndex: startIndex
              }, _this.optionsElement);

            case 9:
            case 'Tab':
              _this.open = false;
              break;
          }
        },
        optionSelectionHandler: function optionSelectionHandler(evt) {
          evt.stopPropagation(); // let { afterChange } = this.PRIVATE.middleware

          _this.dispatchEvent(new Event('change', {}));

          if (_this.open) {
            _this.removeAttribute('open');
          } // if (this.checkValidity()) {
          //   this.removeAttribute('invalid')
          // } else {
          //   this.setAttribute('invalid', '')
          // }
          // if (afterChange && typeof afterChange === 'function') {
          //   afterChange(evt.detail.previous, this.selectedOptions)
          // }

        },
        removeOpenListeners: function removeOpenListeners() {
          document.removeEventListener('mousedown', _this.PRIVATE.bodyMousedownHandler);
          document.removeEventListener('touchcancel', _this.PRIVATE.bodyMousedownHandler);
          document.removeEventListener('touchend', _this.PRIVATE.bodyMousedownHandler);
        },
        stateChangeHandler: function stateChangeHandler(evt) {
          var _evt$detail = evt.detail,
              name = _evt$detail.name,
              value = _evt$detail.value;

          if (name === 'multiple' && value && _this.hasAttribute('open')) {
            _this.removeAttribute('open');
          }

          if (name === 'open') {
            if (!value) {
              return _this.PRIVATE.removeOpenListeners();
            }

            if (_this.multiple) {
              return _this.removeAttribute('open');
            }

            _this.optionsElement.unHoverAllOptions();

            return _this.PRIVATE.addOpenListeners();
          }
        },
        throwSizeAttributeWarning: function throwSizeAttributeWarning() {
          _this.UTIL.printToConsole("\"size\" attribute is not supported. Please use CSS to set the height of the options panel instead.", 'warning');
        },
        toggleHandler: function toggleHandler(evt) {
          return _this.open = !_this.open;
        } //,
        // validationHandler: evt => this.emit('invalid')

      });

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        'attribute.change': function attributeChange(evt) {
          var _evt$detail2 = evt.detail,
              attribute = _evt$detail2.attribute,
              oldValue = _evt$detail2.oldValue,
              newValue = _evt$detail2.newValue;

          if (newValue === oldValue) {
            return;
          }

          switch (attribute) {
            case 'open':
              return _this.emit('state.change', {
                name: 'open',
                value: _this.open
              });

            case 'size':
              return _this.PRIVATE.throwSizeAttributeWarning();
          }
        },
        // connected: () => {
        //   this.sourceElement.addEventListener('invalid', this.PRIVATE.validationHandler)
        //
        //   if (!this.checkValidity()) {
        //     this.setAttribute('invalid', '')
        //   }
        // },
        // disconnected: () => {
        //   this.sourceElement.removeEventListener('invalid', this.PRIVATE.validationHandler)
        // },
        blur: _this.PRIVATE.blurHandler,
        focus: _this.PRIVATE.focusHandler,
        'options.selected': _this.PRIVATE.optionSelectionHandler,
        'state.change': _this.PRIVATE.stateChangeHandler,
        toggle: _this.PRIVATE.toggleHandler,
        rendered: function rendered() {
          if (!_this.hasAttribute('tabindex')) {
            _this.setAttribute('tabindex', 0);
          }

          _this.autofocus && _this.focus();
        }
      });

      return _this;
    }

    _createClass(AuthorMenuElement, [{
      key: "add",
      value: function add(option, index) {
        this.optionsElement.addOption(option, index);
      }
    }, {
      key: "checkValidity",
      value: function checkValidity() {
        return this.sourceElement.checkValidity();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.optionsElement.clear();
      }
    }, {
      key: "deselectAll",
      value: function deselectAll() {
        this.optionsElement.deselectAll();
      }
    }, {
      key: "inject",
      value: function inject(sourceElement) {
        var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        // Prevent re-injections
        if (this.PRIVATE.injected) {
          return;
        }

        this.UTIL.defineProperty('sourceElement', {
          readonly: true,
          default: sourceElement
        });
        var optionsElement = document.createElement('author-options');
        optionsElement.slot = 'options';

        if (labels) {
          this.UTIL.defineProperty('labels', {
            private: true,
            default: labels
          });
        }

        this.appendChild(optionsElement);

        if (sourceElement.children.length > 0) {
          if (!this.multiple) {
            Array.from(sourceElement.children).forEach(function (option) {
              if (option.index !== sourceElement.selectedIndex) {
                option.removeAttribute('selected');
              }
            });
          }

          this.optionsElement.addOptions(sourceElement.children);
        }

        this.PRIVATE.injected = true;
      }
    }, {
      key: "item",
      value: function item(index) {
        return this.optionsElement.item(index);
      }
    }, {
      key: "namedItem",
      value: function namedItem(id) {
        return this.optionsElement.namedItem(id);
      }
      /**
       * method querySelector
       * @param  {string} selector
       * @return {HTMLElement}
       * @override
       */

    }, {
      key: "querySelector",
      value: function querySelector(selector) {
        if (!selector.includes(':checked')) {
          return _get(_getPrototypeOf(AuthorMenuElement.prototype), "querySelector", this).call(this, selector);
        }

        return this.selectedOptions.length > 0 ? this.selectedOptions[0] : null;
      }
      /**
       * method querySelectorAll
       * @param  {string} selector
       * @return {NodeList}
       * @override
       */

    }, {
      key: "querySelectorAll",
      value: function querySelectorAll(selector) {
        if (!selector.includes(':checked')) {
          return _get(_getPrototypeOf(AuthorMenuElement.prototype), "querySelectorAll", this).call(this, selector);
        }

        return this.optionsElement.querySelectorAll('[selected]');
      }
    }, {
      key: "remove",
      value: function remove() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (index === null) {
          return _get(_getPrototypeOf(AuthorMenuElement.prototype), "remove", this).call(this);
        }

        this.optionsElement.removeOptionByIndex(index);
      }
    }, {
      key: "reportValidity",
      value: function reportValidity() {
        var isValid = this.sourceElement.checkValidity();

        if (isValid) {
          this.removeAttribute('invalid');
        } else {
          this.setAttribute('invalid', '');
        }
      }
    }, {
      key: "setCustomValidity",
      value: function setCustomValidity(string) {
        this.sourceElement.setCustomValidity(string);
      }
    }, {
      key: "length",
      get: function get() {
        return this.options.length;
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return this.optionsElement ? this.optionsElement.selectedIndex : -1;
      },
      set: function set(index) {
        if (index < 0) {
          return this.deselectAll();
        }

        this.optionsElement.selectedIndex = index;
      }
    }, {
      key: "value",
      get: function get() {
        if (this.selectedOptions.length === 0) {
          return null;
        }

        var selectedOption = this.selectedOptions.item(0);
        return selectedOption ? selectedOption.value || selectedOption.text : null;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['autofocus', 'disabled', 'name', 'open', 'placeholder', 'tabindex', 'size'];
      }
    }]);

    return AuthorMenuElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-menu', AuthorMenuElement);

  return AuthorMenuElement;

}());
//# sourceMappingURL=author-menu.es5.js.map
