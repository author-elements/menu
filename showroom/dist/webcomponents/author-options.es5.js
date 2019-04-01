// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-options v1.0.17 available at github.com/author-elements/options
// Last Build: 3/28/2019, 1:18:11 AM
var AuthorOptionsElement = (function () {
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  if (!window.hasOwnProperty('AuthorBaseElement')) {
    console.error('[ERROR] <author-options> Required dependency "AuthorBaseElement" not found.');
    console.info('AuthorBaseElement is available at https://github.com/author-elements/base');
  }

  var AuthorOptionsElement =
  /*#__PURE__*/
  function (_AuthorBaseElement) {
    _inherits(AuthorOptionsElement, _AuthorBaseElement);

    function AuthorOptionsElement() {
      var _this;

      _classCallCheck(this, AuthorOptionsElement);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(AuthorOptionsElement).call(this, "<template><style>@charset \"UTF-8\"; :host{contain:content;display:block;width:100%}:host *,:host :after,:host :before{box-sizing:border-box}author-options{contain:content;display:block;width:100%}author-options *,author-options :after,author-options :before{box-sizing:border-box}</style><slot name=\"afterbegin\"></slot><slot name=\"beforeoptions\"></slot><slot></slot><slot name=\"afteroptions\"></slot><slot name=\"beforeend\"></slot></template>"));

      _this.UTIL.defineProperties({
        cherryPickedOptions: {
          private: true
        },
        filteredOptions: {
          readonly: true,
          get: function get() {
            var _assertThisInitialize = _assertThisInitialized(_this),
                options = _assertThisInitialize.options;

            for (var filter in _this.PRIVATE.filters) {
              options = _this.PRIVATE.filters[filter]();
            }

            return Array.isArray(options) ? options : [];
          }
        },
        filters: {
          private: true,
          default: {}
        },
        form: {
          readonly: true,
          get: function get() {
            return _this.parentNode.form;
          }
        },
        displayOptions: {
          readonly: true,
          get: function get() {
            var AuthorHTMLOptionsCollection = _this.PRIVATE.generateAuthorHTMLOptionsCollectionConstructor();

            var array = _this.options.map(function (option) {
              return option.displayElement;
            });

            var addFunction = function addFunction(element, before) {
              return _this.addOption(_this.PRIVATE.generateOptionObject(element), before);
            };

            var removeFunction = function removeFunction(index) {
              return _this.removeOptionByIndex(index);
            };

            return new AuthorHTMLOptionsCollection(array, _this.selectedIndex, addFunction, removeFunction);
          }
        },
        hoveredIndex: {
          readonly: true,
          get: function get() {
            return _this.options.findIndex(function (option) {
              return option.displayElement.hover;
            });
          }
        },
        isSlave: {
          private: true,
          readonly: true,
          get: function get() {
            return _this.parentNode.localName === 'author-select' || _this.parentNode.localName === 'author-datalist';
          }
        },
        lastSelectedIndex: {
          private: true
        },
        multiple: {
          readonly: true,
          get: function get() {
            return _this.parentNode.multiple;
          }
        },
        options: {
          readonly: true,
          default: []
        },
        selectedIndices: {
          readonly: true,
          get: function get() {
            return _toConsumableArray(_this.selectedOptions).map(function (option) {
              return option.index;
            });
          }
        },
        selectedOptions: {
          readonly: true,
          get: function get() {
            var nodes = _this.querySelectorAll('[selected]');

            var AuthorHTMLCollection = _this.PRIVATE.generateAuthorHTMLCollectionConstructor();

            return new AuthorHTMLCollection(nodes);
          }
        },
        Selection: {
          readonly: true,
          private: true,
          default:
          /*#__PURE__*/
          function () {
            function _default() {
              var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

              _classCallCheck(this, _default);

              this.options = options;
            }

            _createClass(_default, [{
              key: "append",
              value: function append(option) {
                this.options.push(option);
              }
            }, {
              key: "clear",
              value: function clear() {
                this.options = [];
              }
            }, {
              key: "includes",
              value: function includes(option) {
                return this.options.includes(option);
              }
            }, {
              key: "prepend",
              value: function prepend(option) {
                this.options.unshift(option);
              }
            }, {
              key: "selectAll",
              value: function selectAll() {
                this.options.forEach(function (option) {
                  return option.selected = true;
                });
              }
            }, {
              key: "displayElements",
              get: function get() {
                return this.options.map(function (option) {
                  return option.displayElement;
                });
              }
            }, {
              key: "length",
              get: function get() {
                return this.options.length;
              }
            }, {
              key: "first",
              get: function get() {
                return this.options[0];
              }
            }, {
              key: "last",
              get: function get() {
                return this.options[this.options.length - 1];
              }
            }]);

            return _default;
          }()
        },
        selectionStartIndex: {
          private: true
        },
        visibleOptions: {
          readonly: true,
          get: function get() {
            return _this.options.filter(function (option) {
              return !option.hidden;
            });
          }
        }
      });

      _this.UTIL.definePrivateMethods({
        arrowDownHandler: function arrowDownHandler(evt) {
          if (!_this.multiple) {
            var startIndex = evt.detail.startIndex;

            switch (startIndex) {
              case _this.options.length - 1:
                return;

              default:
                return _this.PRIVATE.hoverNextOption(startIndex);
            }

            return;
          }

          var lastSelectedIndex = _this.PRIVATE.lastSelectedIndex;

          if (lastSelectedIndex === _this.options.length - 1) {
            return;
          }

          return _this.emit('option.selected', {
            index: lastSelectedIndex === null ? 0 : lastSelectedIndex + 1,
            keyboard: true,
            shiftKey: evt.detail.shiftKey,
            ctrlKey: false,
            metaKey: false
          });
        },
        arrowUpHandler: function arrowUpHandler(evt) {
          if (!_this.multiple) {
            var startIndex = evt.detail.startIndex;

            switch (startIndex) {
              case -1:
              case 0:
                return;

              default:
                return _this.PRIVATE.hoverPreviousOption(startIndex);
            }

            return;
          }

          var lastSelectedIndex = _this.PRIVATE.lastSelectedIndex;

          if (lastSelectedIndex === 0) {
            return;
          }

          return _this.emit('option.selected', {
            index: lastSelectedIndex === null ? _this.options.length - 1 : lastSelectedIndex - 1,
            keyboard: true,
            shiftKey: evt.detail.shiftKey,
            ctrlKey: false,
            metaKey: false
          });
        },
        diffSelections: function diffSelections(comparator, comparable) {
          return comparator.filter(function (option) {
            return !comparable.includes(option);
          });
        },
        generateAuthorHTMLOptionsCollectionConstructor: function generateAuthorHTMLOptionsCollectionConstructor() {
          var _p = new WeakMap();

          var AuthorHTMLCollection = _this.PRIVATE.generateAuthorHTMLCollectionConstructor();

          var AuthorHTMLOptionsCollection =
          /*#__PURE__*/
          function (_AuthorHTMLCollection) {
            _inherits(AuthorHTMLOptionsCollection, _AuthorHTMLCollection);

            function AuthorHTMLOptionsCollection(arr) {
              var _this2;

              var selectedIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
              var add = arguments.length > 2 ? arguments[2] : undefined;
              var remove = arguments.length > 3 ? arguments[3] : undefined;

              _classCallCheck(this, AuthorHTMLOptionsCollection);

              _this2 = _possibleConstructorReturn(this, _getPrototypeOf(AuthorHTMLOptionsCollection).call(this, arr));
              _this2.selectedIndex = selectedIndex;
              _this2.add = add;
              _this2.remove = remove;

              _p.set(_assertThisInitialized(_this2), {
                arr: arr
              });

              return _this2;
            }

            _createClass(AuthorHTMLOptionsCollection, [{
              key: Symbol.toStringTag,
              value: function value() {
                return 'AuthorHTMLOptionsCollection';
              }
            }]);

            return AuthorHTMLOptionsCollection;
          }(AuthorHTMLCollection);

          return AuthorHTMLOptionsCollection;
        },
        generateOptgroup: function generateOptgroup(optgroup) {
          if (!customElements.get('author-optgroup')) {
            return _this.UTIL.throwError({
              type: 'dependency',
              vars: {
                name: 'author-optgroup'
              }
            });
          }

          var surrogate = document.createElement('author-optgroup');
          surrogate.id = _this.UTIL.generateGuid('optgroup');
          var label = optgroup.getAttribute('label');

          if (!label || label.trim() === '') {
            return _this.UTIL.throwError({
              message: '<optgroup> must have a label attribute!'
            });
          }

          surrogate.setAttribute('label', label);
          var options = optgroup.querySelectorAll('option');
          Array.from(options).forEach(function (option) {
            _this.addOption(_this.PRIVATE.generateOptionObject(option), null, surrogate);
          });
          return surrogate;
        },
        generateOptionObject: function generateOptionObject(sourceElement) {
          if (!customElements.get('author-option')) {
            return _this.UTIL.throwError({
              type: 'dependency',
              vars: {
                name: 'author-option'
              }
            });
          }

          var OptionConstructor = _this.PRIVATE.generateOptionConstructor();

          return new OptionConstructor(_assertThisInitialized(_this), _this.UTIL.generateGuid(), sourceElement, document.createElement('author-option'));
        },
        generateOptionConstructor: function generateOptionConstructor() {
          var _p = new WeakMap();

          return (
            /*#__PURE__*/
            function () {
              function AuthorOptionObject(parent, key, sourceElement, displayElement) {
                var _this3 = this;

                _classCallCheck(this, AuthorOptionObject);

                this.key = key;
                this.form = parent.form;
                this.defaultSelected = sourceElement.selected;
                this.sourceElement = sourceElement;
                this.displayElement = displayElement;
                this.displayElement.parent = parent;
                this.displayElement.selected = sourceElement.selected;
                this.displayElement.defaultSelected = sourceElement.selected;
                this.displayElement.innerHTML = sourceElement.innerHTML; // Add additional attributes

                Array.from(sourceElement.attributes).forEach(function (attr) {
                  if (typeof attr.value === 'boolean') {
                    return attr.value ? _this3.displayElement.setAttribute(attr.name, '') : _this3.displayElement.removeAttribute(attr.name);
                  }

                  _this3.displayElement.setAttribute(attr.name, attr.value);
                });

                _p.set(this, {
                  attributes: {
                    disabled: sourceElement.disabled,
                    id: sourceElement.getAttribute('id'),
                    label: sourceElement.getAttribute('label') || sourceElement.textContent.trim(),
                    selected: sourceElement.selected,
                    value: sourceElement.hasAttribute('value') ? sourceElement.getAttribute('value').trim() : null,
                    text: sourceElement.text.trim()
                  },
                  setAttr: function setAttr(name, value) {
                    _this3.sourceElement[name] = value;

                    if (typeof value === 'boolean') {
                      value ? _this3.displayElement.setAttribute(name, '') : _this3.displayElement.removeAttribute(name);
                    } else {
                      _this3.displayElement.setAttribute(name, value);
                    }

                    _p.get(_this3).attributes[name] = value;
                  }
                });
              }

              _createClass(AuthorOptionObject, [{
                key: "remove",
                value: function remove() {
                  this.sourceElement.remove();
                  this.displayElement.remove();
                }
              }, {
                key: "disabled",
                get: function get() {
                  return _p.get(this).attributes.disabled;
                },
                set: function set(bool) {
                  _p.get(this).setAttr('disabled', bool);
                }
              }, {
                key: "hidden",
                get: function get() {
                  return this.displayElement.hidden;
                },
                set: function set(bool) {
                  this.displayElement.hidden = bool;
                }
              }, {
                key: "index",
                get: function get() {
                  return this.sourceElement.index;
                }
              }, {
                key: "id",
                get: function get() {
                  return _p.get(this).attributes.id;
                },
                set: function set(id) {
                  _p.get(this).setAttr('id', id);
                }
              }, {
                key: "selected",
                get: function get() {
                  return _p.get(this).attributes.selected;
                },
                set: function set(bool) {
                  _p.get(this).setAttr('selected', bool);
                }
              }, {
                key: "label",
                get: function get() {
                  return _p.get(this).attributes.label;
                },
                set: function set(label) {
                  _p.get(this).setAttr('label', label);
                }
              }, {
                key: "text",
                get: function get() {
                  return _p.get(this).attributes.text;
                },
                set: function set(text) {
                  _p.get(this).setAttr('text', text);
                }
              }, {
                key: "value",
                get: function get() {
                  return _p.get(this).attributes.value;
                },
                set: function set(value) {
                  _p.get(this).setAttr('value', value);
                }
              }]);

              return AuthorOptionObject;
            }()
          );
        },
        getCurrentSelection: function getCurrentSelection() {
          return _this.options.filter(function (option) {
            return option.selected;
          });
        },
        getPreviousVisibleOption: function getPreviousVisibleOption(startIndex) {
          var index = startIndex - 1;
          var option = _this.options[index];

          if (!option) {
            return null;
          }

          if (option.hidden) {
            option = _this.PRIVATE.getPreviousVisibleOption(index);
          }

          return option;
        },
        getNextVisibleOption: function getNextVisibleOption(startIndex) {
          var index = startIndex + 1;
          var option = _this.options[index];

          if (!option) {
            return null;
          }

          if (option.hidden) {
            option = _this.PRIVATE.getNextVisibleOption(index);
          }

          return option;
        },
        handleClickSelection: function handleClickSelection(detail, cb) {
          var _this$PRIVATE = _this.PRIVATE,
              cherryPickedOptions = _this$PRIVATE.cherryPickedOptions,
              getCurrentSelection = _this$PRIVATE.getCurrentSelection,
              lastSelectedIndex = _this$PRIVATE.lastSelectedIndex,
              Selection = _this$PRIVATE.Selection,
              selectionStartIndex = _this$PRIVATE.selectionStartIndex;
          var index = detail.index,
              shiftKey = detail.shiftKey,
              ctrlKey = detail.ctrlKey,
              metaKey = detail.metaKey;
          var selectedOption = _this.options[index];

          if (shiftKey && lastSelectedIndex !== null) {
            _this.PRIVATE.lastSelectedIndex = index;

            _this.PRIVATE.cherryPickedOptions.clear();

            var bounds = [index, selectionStartIndex].sort(function (a, b) {
              return a - b;
            });
            return cb(new Selection(bounds[0] === bounds[1] ? [selectedOption] : _this.options.slice(bounds[0], bounds[1] + 1)));
          }

          var currentSelection = getCurrentSelection();

          if (ctrlKey || metaKey) {
            _this.PRIVATE.lastSelectedIndex = index;
            _this.PRIVATE.selectionStartIndex = index;
            _this.PRIVATE.cherryPickedOptions.options = selectedOption.selected ? currentSelection.filter(function (option) {
              return option !== selectedOption;
            }) : _this.options.filter(function (option) {
              return option === selectedOption || currentSelection.includes(option);
            });
            return cb(_this.PRIVATE.cherryPickedOptions);
          }

          if (currentSelection.length === 1 && index === lastSelectedIndex) {
            return;
          }

          _this.PRIVATE.lastSelectedIndex = index;
          _this.PRIVATE.selectionStartIndex = index;

          _this.PRIVATE.cherryPickedOptions.clear();

          return cb(new Selection([selectedOption]));
        },
        handleKeyboardSelection: function handleKeyboardSelection(detail, cb) {
          var _this$PRIVATE2 = _this.PRIVATE,
              cherryPickedOptions = _this$PRIVATE2.cherryPickedOptions,
              getCurrentSelection = _this$PRIVATE2.getCurrentSelection,
              Selection = _this$PRIVATE2.Selection,
              selectionStartIndex = _this$PRIVATE2.selectionStartIndex;
          var index = detail.index,
              shiftKey = detail.shiftKey;
          var selectedOption = _this.options[index];
          var currentSelection = getCurrentSelection();
          _this.PRIVATE.lastSelectedIndex = index;

          if (!shiftKey || currentSelection.length === 0) {
            _this.PRIVATE.selectionStartIndex = index;

            _this.PRIVATE.cherryPickedOptions.clear();

            return cb(new Selection([selectedOption]));
          } // 1 option or more selected


          if (currentSelection.length > 0) {
            var bounds = [index, selectionStartIndex].sort();
            var selection = new Selection(bounds[0] === bounds[1] ? [selectedOption] : _this.options.slice(bounds[0], bounds[1] + 1));

            if (cherryPickedOptions.length > 0) {
              selection.options = _this.options.filter(function (option) {
                return selection.includes(option) || cherryPickedOptions.includes(option);
              });
            }

            return cb(selection);
          }
        },
        hoverPreviousOption: function hoverPreviousOption(startIndex) {
          var option = _this.PRIVATE.getPreviousVisibleOption(startIndex);

          if (!option || option.index === startIndex) {
            return;
          }

          _this.hoverOption(option.index);
        },
        hoverNextOption: function hoverNextOption(startIndex) {
          var option = _this.PRIVATE.getNextVisibleOption(startIndex);

          if (!option || option.index === startIndex) {
            return;
          }

          _this.hoverOption(option.index);
        },
        optionSelectionHandler: function optionSelectionHandler(evt) {
          var _this$PRIVATE3 = _this.PRIVATE,
              cherryPickedOptions = _this$PRIVATE3.cherryPickedOptions,
              diffSelections = _this$PRIVATE3.diffSelections,
              getCurrentSelection = _this$PRIVATE3.getCurrentSelection,
              generateAuthorHTMLCollectionConstructor = _this$PRIVATE3.generateAuthorHTMLCollectionConstructor,
              handleClickSelection = _this$PRIVATE3.handleClickSelection,
              handleKeyboardSelection = _this$PRIVATE3.handleKeyboardSelection,
              Selection = _this$PRIVATE3.Selection;

          if (cherryPickedOptions === null) {
            _this.PRIVATE.cherryPickedOptions = new Selection([]);
          }

          var _evt$detail = evt.detail,
              index = _evt$detail.index,
              keyboard = _evt$detail.keyboard;

          var completeOperation = function completeOperation(selection) {
            var currentSelection = getCurrentSelection();
            var comparator = selection.length >= currentSelection.length ? selection.options : currentSelection;
            var diff = diffSelections(comparator, comparator === currentSelection ? selection.options : currentSelection);

            if (diff.length === 0 || !_this.PRIVATE.isSlave) {
              return;
            }

            _this.deselectAll();

            selection.selectAll();

            _this.emit('options.selected', {
              options: selection.options,
              previous: _this.selectedOptions,
              next: new (generateAuthorHTMLCollectionConstructor())(selection.displayElements)
            }, _this.parentNode); // let { beforeChange } = this.parentNode
            //
            // let detail = {
            //   options: selection.options,
            //   previous: this.selectedOptions,
            //   next: new (generateAuthorHTMLCollectionConstructor())(selection.displayElements)
            // }
            //
            // let cb = () => {
            //   this.deselectAll()
            //   selection.selectAll()
            //   return this.emit('options.selected', detail, this.parentNode)
            // }
            //
            // if (!(beforeChange && typeof beforeChange === 'function')) {
            //   return cb()
            // }
            //
            // beforeChange(this.selectedOptions, detail.next, cb)

          };

          if (!_this.multiple) {
            return completeOperation(new Selection([_this.options[index]]));
          }

          if (keyboard) {
            return _this.PRIVATE.handleKeyboardSelection(evt.detail, completeOperation);
          }

          return _this.PRIVATE.handleClickSelection(evt.detail, completeOperation);
        },
        parentStateChangeHandler: function parentStateChangeHandler(evt) {
          _this.emit('state.change', evt.detail);

          var _evt$detail2 = evt.detail,
              name = _evt$detail2.name,
              value = _evt$detail2.value;

          switch (name) {
            case 'multiple':
              if (!value && _this.selectedOptions.length > 0) {
                var index = _this.selectedIndex;

                _this.deselectAll();

                _this.emit('option.selected', {
                  index: index
                });
              }

              break;

            default:
              return;
          }
        }
      });

      _this.UTIL.registerListeners(_assertThisInitialized(_this), {
        connected: function connected() {
          _this.PRIVATE.selectionStartIndex = _this.selectedIndex >= 0 ? _this.selectedIndex : 0;

          if (_this.PRIVATE.isSlave) {
            _this.parentNode.on('state.change', _this.PRIVATE.parentStateChangeHandler);
          }
        },
        disconnected: function disconnected() {
          if (_this.PRIVATE.isSlave) {
            _this.parentNode.off('state.change', _this.PRIVATE.parentStateChangeHandler);
          }
        },
        'keydown.arrowUp': _this.PRIVATE.arrowUpHandler,
        'keydown.arrowDown': _this.PRIVATE.arrowDownHandler,
        'option.selected': _this.PRIVATE.optionSelectionHandler
      });

      return _this;
    }

    _createClass(AuthorOptionsElement, [{
      key: "addFilter",
      value: function addFilter() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.UTIL.generateGuid('filter_');
        var func = arguments.length > 1 ? arguments[1] : undefined;

        if (typeof func !== 'function') {
          this.UTIL.throwError({
            type: 'type',
            message: "Filter must be a function"
          });
        }

        if (this.PRIVATE.filters.hasOwnProperty(key)) {
          console.warn("Filter \"".concat(key, "\" alredy exists! Overwriting..."));
        }

        this.PRIVATE.filters[key] = func;
      }
    }, {
      key: "hasFilter",
      value: function hasFilter(filter) {
        return this.PRIVATE.filters.hasOwnProperty(filter);
      }
    }, {
      key: "removeFilter",
      value: function removeFilter(key) {
        if (!this.PRIVATE.filters.hasOwnProperty(key)) {
          return console.warn("Filter \"".concat(key, "\" not found."));
        }

        delete this.PRIVATE.filters[key];
      }
    }, {
      key: "removeAllFilters",
      value: function removeAllFilters() {
        this.PRIVATE.filters = {};
      }
    }, {
      key: "addOptgroup",
      value: function addOptgroup(optgroup) {
        var label = document.createElement('author-optgroup-label');
        label.innerHTML = optgroup.getAttribute('label');
        this.appendChild(label);
        this.appendChild(optgroup);
      }
    }, {
      key: "addOption",
      value: function addOption(option) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var dest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

        if (!customElements.get('author-option')) {
          return this.UTIL.throwError({
            type: 'dependency',
            vars: {
              name: 'author-option'
            }
          });
        }

        if (option instanceof Option) {
          option = this.PRIVATE.generateOptionObject(option);
        }

        if (this.PRIVATE.isSlave) {
          this.parentNode["".concat(option.index)] = option.displayElement;
        }

        if (index) {
          dest.insertBefore(option.displayElement, dest.children.item(index));
          this.options.splice(index, 0, option);

          if (this.PRIVATE.isSlave) {
            this.parentNode.sourceElement.add(option.sourceElement, index);
          }
        } else {
          dest.appendChild(option.displayElement);
          this.options.push(option);

          if (this.PRIVATE.isSlave && !this.parentNode.sourceElement[this.options.length - 1]) {
            this.parentNode.sourceElement.appendChild(option.sourceElement);
          }
        }

        if (option.selected) {
          if (!this.multiple) {
            this.selectedIndex = option.index;
            return;
          }
        }
      }
    }, {
      key: "addOptions",
      value: function addOptions(children) {
        var _this4 = this;

        Array.from(children).forEach(function (child) {
          var isElement = child instanceof HTMLElement;

          switch (child.nodeName) {
            case 'OPTION':
              return _this4.addOption(isElement ? _this4.PRIVATE.generateOptionObject(child) : child);

            case 'OPTGROUP':
              return _this4.addOptgroup(isElement ? _this4.PRIVATE.generateOptgroup(child) : child);

            default:
              return _this4.UTIL.printToConsole("".concat(child.nodeName.toLowerCase(), " is not a valid child element for <author-select>. Removing..."), 'warning');
          }
        });
      }
    }, {
      key: "clear",
      value: function clear() {
        while (this.lastChild) {
          this.removeChild(this.lastChild);
        }
      }
    }, {
      key: "deselect",
      value: function deselect(option) {
        var updateList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (typeof option === 'number') {
          option = this.options[option];
        }

        option.selected = false;

        if (this.PRIVATE.isSlave && this.selectedOptionsElement !== undefined) {
          this.parentNode.selectedOptionsElement.remove(option, updateList);
        }
      }
    }, {
      key: "deselectAll",
      value: function deselectAll() {
        var _this5 = this;

        var showPlaceholder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.options.filter(function (option) {
          return option.selected;
        }).forEach(function (option, index, options) {
          _this5.deselect(option, index = options.length - 1 && showPlaceholder);
        });
      }
    }, {
      key: "find",
      value: function find(query) {
        var caseSensitive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var results = Array.from(this.options).filter(function (option) {
          var value = caseSensitive ? option.value : option.value.toLowerCase();
          var text = caseSensitive ? option.text : option.text.toLowerCase();
          query = caseSensitive ? query : query.toLowerCase();
          return value.indexOf(query) >= 0 || text.indexOf(query) >= 0;
        });
        return Array.isArray(results) ? results : [];
      }
    }, {
      key: "hoverOption",
      value: function hoverOption(index) {
        this.unHoverAllOptions();
        this.options[index].displayElement.hover = true;
      }
    }, {
      key: "item",
      value: function item(index) {
        return this.options[index].displayElement;
      }
    }, {
      key: "namedItem",
      value: function namedItem(value) {
        var query = this.options.filter(function (option) {
          var id = option.sourceElement.attributes.getNamedItem('id');
          return id && id.value === value;
        });

        if (!query.length) {
          return null;
        }

        return query[query.length - 1].displayElement;
      }
      /**
       * @method removeOptionByIndex
       * @param  {Number}  [index=null]
       * Index of option to remove
       * @param  {Boolean} [destroy=true]
       */

    }, {
      key: "removeOptionByIndex",
      value: function removeOptionByIndex() {
        var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (index === null || index >= this.options.length) {
          return;
        }

        this.options[index].remove();
      }
    }, {
      key: "unHoverAllOptions",
      value: function unHoverAllOptions() {
        var _this6 = this;

        this.options.forEach(function (option, index) {
          return _this6.unHoverOption(index);
        });
      }
    }, {
      key: "unHoverOption",
      value: function unHoverOption(index) {
        this.options[index].displayElement.hover = false;
      }
    }, {
      key: "selectedIndex",
      get: function get() {
        return this.selectedOptions.length > 0 ? this.selectedOptions.item(0).index : -1;
      },
      set: function set(index) {
        this.emit('option.selected', {
          index: index
        });
      }
    }, {
      key: "selectionStartIndex",
      get: function get() {
        return this.PRIVATE.selectionStartIndex;
      },
      set: function set(value) {
        this.UTIL.throwError({
          type: 'readonly',
          message: "\"selectionStartIndex\" cannot be set manually."
        });
      }
    }]);

    return AuthorOptionsElement;
  }(AuthorBaseElement(HTMLElement));

  customElements.define('author-options', AuthorOptionsElement);

  return AuthorOptionsElement;

}());
//# sourceMappingURL=author-options.es5.js.map
