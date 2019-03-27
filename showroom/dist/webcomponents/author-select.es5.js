// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-select v1.0.7 available at github.com/author-elements/select
// Last Build: 3/16/2019, 11:05:58 PM
var AuthorSelectElement = (function () {
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
    console.error('[ERROR] <author-select> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  (function () {
    var missingDependencies = Array.from(new Set(['author-selected-options', 'author-options', 'author-option', 'author-optgroup', 'author-optgroup-label'])).filter(function (dep) {
      return !customElements.get(dep);
    });

    if (missingDependencies.length > 0) {
      console.error("[ERROR] <author-select> Required dependenc".concat(missingDependencies.length !== 1 ? 'ies' : 'y', " not found: ").concat(missingDependencies.map(function (d) {
        return "<".concat(d, ">");
      }).join(', ').replace(', ' + missingDependencies[missingDependencies.length - 1], ' and ' + missingDependencies[missingDependencies.length - 1])));
      missingDependencies.forEach(function (dep, i) {
        return console.info("".concat(i + 1, ". <").concat(dep, "> is available at ").concat('https://github.com/author-elements/select'.replace('select', dep.replace('author-', ''))));
      });
    }
  })();

  var AuthorSelectElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorSelectElement, _AuthorBaseElement);

    function AuthorSelectElement() {
      var _this;

      _classCallCheck(this, AuthorSelectElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorSelectElement).call(this, "<template><style>@charset \"UTF-8\"; :host{display:inline-block;max-width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-select{display:inline-block;max-width:100%}author-select *,author-select :after,author-select :before{box-sizing:border-box}</style><slot name=\"afterbegin\"></slot><slot name=\"beforeselectedoptions\"></slot><slot name=\"selectedoptions\"></slot><slot name=\"afterselectedoptions\"></slot><slot name=\"beforeoptions\"></slot><slot name=\"options\"></slot><slot name=\"afteroptions\"></slot><slot name=\"beforeend\"></slot></template>"));

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
        labels: {
          private: true
        },
        middleware: {
          private: true,
          default: {
            beforeChange: null,
            afterChange: null
          }
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
        selectedOptionsElement: {
          readonly: true,
          get: function get() {
            return _this.querySelector('author-selected-options');
          }
        },
        title: {
          private: true,
          default: ''
        },
        type: {
          readonly: true,
          get: function get() {
            return _this.multiple ? 'select-multiple' : 'select-one';
          }
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
        multiple: false,
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

            default:
              return;
          }
        },
        optionSelectionHandler: function optionSelectionHandler(evt) {
          evt.stopPropagation();
          var afterChange = _this.PRIVATE.middleware.afterChange;

          _this.dispatchEvent(new Event('change', {}));

          if (_this.open) {
            _this.removeAttribute('open');
          }

          _this.emit('options.selected', evt.detail.options, _this.selectedOptionsElement); // if (this.checkValidity()) {
          //   this.removeAttribute('invalid')
          // } else {
          //   this.setAttribute('invalid', '')
          // }


          if (afterChange && typeof afterChange === 'function') {
            afterChange(evt.detail.previous, _this.selectedOptions);
          }
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

          switch (name) {
            case 'open':
              if (!value) {
                return _this.PRIVATE.removeOpenListeners();
              }

              if (_this.multiple) {
                return _this.removeAttribute('open');
              }

              _this.optionsElement.unHoverAllOptions();

              return _this.PRIVATE.addOpenListeners();

            case 'multiple':
              if (value && _this.hasAttribute('open')) {
                _this.removeAttribute('open');
              }

              break;

            default:
              return;
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
            case 'multiple':
              return _this.emit('state.change', {
                name: 'multiple',
                value: _this.multiple
              });

            case 'open':
              return _this.emit('state.change', {
                name: 'open',
                value: _this.open
              });

            case 'placeholder':
              if (_this.selectedOptionsElement) {
                _this.selectedOptionsElement.update();
              }

              break;

            case 'size':
              return _this.PRIVATE.throwSizeAttributeWarning();

            default:
              return;
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

    _createClass(AuthorSelectElement, [{
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
        this.selectedOptionsElement.clear();
      }
    }, {
      key: "deselectAll",
      value: function deselectAll() {
        this.optionsElement.deselectAll();
      }
    }, {
      key: "inject",
      value: function inject(select, labels) {
        // Prevent re-injections
        if (this.PRIVATE.injected) {
          return;
        }

        this.UTIL.defineProperty('sourceElement', {
          readonly: true,
          default: select
        });
        var selectedOptionsElement = document.createElement('author-selected-options');
        selectedOptionsElement.slot = 'selectedoptions';
        var optionsElement = document.createElement('author-options');
        optionsElement.slot = 'options';
        this.PRIVATE.labels = labels;
        this.appendChild(selectedOptionsElement);
        this.appendChild(optionsElement);

        if (select.children.length > 0) {
          if (!this.multiple) {
            Array.from(select.children).forEach(function (option) {
              if (option.index !== select.selectedIndex) {
                option.removeAttribute('selected');
              }
            });
          }

          this.optionsElement.addOptions(select.children);

          if (!this.multiple) {
            this.selectedOptionsElement.add(this.optionsElement.options[this.selectedIndex]);
          }
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
        if (selector !== ':checked') {
          return _get(_getPrototypeOf(AuthorSelectElement.prototype), "querySelector", this).call(this, selector);
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
        if (selector !== ':checked') {
          return _get(_getPrototypeOf(AuthorSelectElement.prototype), "querySelectorAll", this).call(this, selector);
        }

        return this.optionsElement.querySelectorAll('[selected]');
      }
    }, {
      key: "remove",
      value: function remove() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (index === null) {
          return _get(_getPrototypeOf(AuthorSelectElement.prototype), "remove", this).call(this);
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
      key: "afterChange",
      get: function get() {
        return this.PRIVATE.middleware.afterChange;
      },
      set: function set(func) {
        this.PRIVATE.middleware.afterChange = func.bind(this);
      }
    }, {
      key: "beforeChange",
      get: function get() {
        return this.PRIVATE.middleware.beforeChange;
      },
      set: function set(func) {
        this.PRIVATE.middleware.beforeChange = func.bind(this);
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
        return ['autofocus', 'disabled', 'multiple', 'name', 'open', 'placeholder', 'tabindex', 'size'];
      }
    }]);

    return AuthorSelectElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-select', AuthorSelectElement);

  return AuthorSelectElement;

}());
//# sourceMappingURL=author-select.es5.js.map
