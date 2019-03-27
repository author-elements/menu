// Copyright (c) 2019 Author.io. MIT licensed.
// @author.io/element-base v1.1.1 available at github.com/author-elements/base
// Last Build: 3/16/2019, 10:45:53 PM
var AuthorBaseElement = (function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  var AuthorBaseElement = function AuthorBaseElement(superClass) {
    return (
      /*#__PURE__*/
      function (_superClass) {
        _inherits(_class, _superClass);

        function _class(templateString) {
          var _this;

          _classCallCheck(this, _class);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this));
          Object.defineProperties(_assertThisInitialized(_this), {
            /**
             * @property PRIVATE
             * Storage Object for private methods and properties. Used internally.
             * @type {object}
             */
            PRIVATE: {
              value: {}
            },

            /**
             * @property UTIL
             * Storage Object for utility methods and properties.
             * @type {object}
             */
            UTIL: {
              value: {}
            }
          });
          Object.defineProperties(_this.PRIVATE, {
            /**
             * @property attributes
             * Used internally to manage registered attributes.
             * @private
             */
            attributes: {
              value: {}
            },

            /**
             * @property booleanAttributes
             * Used internally to manage registered boolean attributes.
             * @private
             */
            booleanAttributes: {
              value: {}
            },

            /**
             * @property properties
             * Used internally to manage registered properties.
             * @private
             */
            properties: {
              value: {}
            },

            /**
             * @property privateProperties
             * Used internally to manage registered private properties.
             * @private
             */
            privateProperties: {
              value: []
            },

            /**
             * @property listeners
             * Used internally to manage registered event listeners.
             * @private
             */
            listeners: {
              value: []
            },

            /**
             * @property styleRules
             * Used internally to manage styling added to the component's internal stylesheet.
             * @private
             */
            styleRules: {
              value: {}
            },

            /**
             * @property initialize
             * Used internally to set up the element's Shadow Root and inject its template.
             * @private
             */
            initialize: {
              value: function value(templateString) {
                _this.keySource = 'key' in KeyboardEvent.prototype ? 'key' : 'keyIdentifier' in KeyboardEvent.prototype ? 'keyIdentifier' : 'keyCode';

                _this.attachShadow({
                  mode: 'open'
                });

                var container = document.createElement('div');
                container.insertAdjacentHTML('afterbegin', templateString);
                var template = container.querySelector('template');

                if ('content' in template) {
                  _this.shadowRoot.appendChild(template.content.cloneNode(true));
                } else {
                  template.childNodes.forEach(function (child) {
                    _this.shadowRoot.appendChild(child.cloneNode(true));
                  });
                }

                template = null;
                _this.crypto = null;

                try {
                  _this.crypto = crypto;
                } catch (e) {
                  _this.crypto = msCrypto;
                }
              }
            },

            /**
             * @method definePrivateProperty
             * Used internally to register new private properties on the element
             * @param  {string} name
             * @param  {CustomPropertyObject} data
             * @private
             */
            definePrivateProperty: {
              value: function value(name, data) {
                _this.PRIVATE.privateProperties[name] = null;
                Object.defineProperty(_this.PRIVATE, name, {
                  get: function get() {
                    if (data.hasOwnProperty('get')) {
                      if (typeof data.get !== 'function') {
                        return _this.UTIL.throwError({
                          type: 'type',
                          message: 'Property getter must be a function'
                        });
                      }

                      return data.get();
                    }

                    return _this.PRIVATE.privateProperties[name] === null ? data.default : _this.PRIVATE.privateProperties[name];
                  },
                  set: function set(value) {
                    if (data.readonly) {
                      return _this.UTIL.throwError({
                        type: 'readonly',
                        vars: {
                          prop: name
                        }
                      });
                    }

                    _this.PRIVATE.privateProperties[name] = value;
                  }
                });
              }
            },

            /**
             * @method defineReadOnlyProperty
             * Used internally to register new readonly properties on the element.
             * @param  {string} name
             * @param  {CustomPropertyObject} data
             * @private
             */
            defineReadOnlyProperty: {
              value: function value(name, data) {
                var cfg = {
                  set: function set(value) {
                    _this.UTIL.throwError({
                      type: 'readonly',
                      vars: {
                        prop: name
                      }
                    });
                  },
                  get: function get() {
                    if (data.hasOwnProperty('get')) {
                      if (typeof data.get !== 'function') {
                        return _this.UTIL.throwError({
                          type: 'type',
                          message: 'Property getter must be a function'
                        });
                      }

                      return data.get();
                    }

                    return data.hasOwnProperty('default') ? data.default : null;
                  }
                };
                Object.defineProperty(_assertThisInitialized(_this), name, cfg);
              }
            },

            /**
             * @method generateAuthorHTMLCollectionConstructor
             * Generates a class constructor for an AuthorHTMLCollection
             * @returns {AuthorHTMLCollection}
             * @private
             */
            generateAuthorHTMLCollectionConstructor: {
              value: function value() {
                var _p = new WeakMap();

                var AuthorHTMLCollection =
                /*#__PURE__*/
                function () {
                  function AuthorHTMLCollection(arr) {
                    var _this2 = this;

                    _classCallCheck(this, AuthorHTMLCollection);

                    _p.set(this, {
                      arr: arr
                    });

                    arr.forEach(function (node, index) {
                      _this2[index] = node;

                      if (node.id) {
                        _this2[node.id] = node;
                      }
                    });
                  }

                  _createClass(AuthorHTMLCollection, [{
                    key: "item",
                    value: function item(index) {
                      return _p.get(this).arr[index];
                    }
                  }, {
                    key: "namedItem",
                    value: function namedItem(name) {
                      var matches = _p.get(this).arr.filter(function (item) {
                        return item.id === name || item.name === name;
                      });

                      return matches.length > 0 ? matches[0] : null;
                    }
                  }, {
                    key: Symbol.iterator,
                    value: function value() {
                      var _this3 = this;

                      var index = 0;
                      return {
                        next: function next() {
                          var result = {
                            value: _p.get(_this3).arr[index],
                            done: !(index in _p.get(_this3).arr)
                          };
                          index++;
                          return result;
                        }
                      };
                    }
                  }, {
                    key: Symbol.toStringTag,
                    value: function value() {
                      return 'AuthorHTMLCollection';
                    }
                  }, {
                    key: "length",
                    get: function get() {
                      return _p.get(this).arr.length;
                    }
                  }]);

                  return AuthorHTMLCollection;
                }();

                return AuthorHTMLCollection;
              }
            },
            getStyleRule: {
              value: function value(name) {
                var rule = _this.PRIVATE.styleRules[name];

                if (!rule) {
                  return _this.UTIL.throwError({
                    message: "Style Rule \"".concat(name, "\" not found")
                  });
                }

                return rule;
              }
            },

            /**
             * @method getBooleanAttributeValue
             * Used internally. Returns a validated boolean attribute value.
             * @param  {string} name
             * @return {boolean}
             * @private
             */
            getBooleanAttributeValue: {
              value: function value(name) {
                return _this.hasAttribute(name) && _this.getAttribute(name) !== 'false';
              }
            },

            /**
             * @method setBooleanAttributeValue
             * Used internally. Ensures that a boolean attribute recieves a valid
             * boolean as a value.
             * @param  {string} name
             * @param  {any} value
             * @private
             */
            setBooleanAttributeValue: {
              value: function value(name, _value) {
                if (typeof _value === 'boolean') {
                  _value = _value.toString();
                }

                var acceptableValues = ['true', 'false', '', null];

                if (!acceptableValues.includes(_value)) {
                  _this.UTIL.printToConsole("\"".concat(name, "\" attribute expected boolean but received \"").concat(_value, "\""), 'error');

                  return _this.removeAttribute(name);
                }

                switch (_value) {
                  case 'false':
                  case null:
                    return _this.removeAttribute(name);

                  case 'true':
                  case '':
                    return _this.setAttribute(name, '');
                }
              }
            }
          });
          Object.defineProperties(_this.UTIL, {
            /**
             * @property childMonitor
             * The MutationObserver instance created upon calling this.UTIL.monitorChildren.
             * @type {MutationObserver}
             */
            childMonitor: {
              value: null
            },

            /**
             * @typedef {object} CustomAttributeObject shape: {
             *   get: {function} Custom getter
             *   set: {function} Custom setter
             *   default: {any} Default value
             * }
             */

            /**
             * @method defineAttribute
             * Registers a new attribute on the element and connects it to a new
             * property of the same name.
             * @param  {string} name
             * @param  {string|number|boolean|CustomAttributeObject} defaultValue
             * If a default value is passed, or if a CustomAttributeObject is passed
             * which includes a "default" property, getters will be applied that
             * return the default value if the actual value is null or undefined.
             */
            defineAttribute: {
              value: function value(name, defaultValue) {
                var customGetter = null;
                var customSetter = null;

                if (_typeof(defaultValue) === 'object') {
                  var cfg = defaultValue;

                  if (cfg.hasOwnProperty('get')) {
                    customGetter = cfg.get;
                  }

                  if (cfg.hasOwnProperty('set')) {
                    customSetter = cfg.set;
                  }

                  defaultValue = cfg.hasOwnProperty('default') ? cfg.default : null;
                }

                var isBool = typeof defaultValue === 'boolean';
                var privateKey = isBool ? 'booleanAttributes' : 'attributes';
                Object.defineProperty(_this.PRIVATE[privateKey], name, {
                  get: function get() {
                    if (customGetter) {
                      var result = customGetter();
                      return result === null ? defaultValue : result;
                    }

                    return defaultValue;
                  },
                  set: function set(value) {
                    return customSetter && customSetter(value);
                  }
                });
                Object.defineProperty(_assertThisInitialized(_this), name, {
                  get: function get() {
                    if (customGetter) {
                      var result = customGetter();
                      return result === null ? defaultValue : result;
                    }

                    if (isBool) {
                      return _this.PRIVATE.getBooleanAttributeValue(name);
                    }

                    return _this.hasAttribute(name) ? _this.getAttribute(name) : defaultValue;
                  },
                  set: function set(value) {
                    customSetter && customSetter(value);

                    if (customGetter) {
                      value = _this.PRIVATE[privateKey][name];
                    }

                    if (isBool) {
                      return _this.PRIVATE.setBooleanAttributeValue(name, value);
                    }

                    _this.setAttribute(name, value);
                  }
                });
              }
            },

            /**
             * @method defineAttributes
             * Define multiple attributes at once.
             * @param  {object} attrs
             * Example:
             * {
             *   booleanAttr: false,
             *   stringAttr: 'string',
             *   customAttr: {
             *     get: () => this.customAttribute,
             *     default: 'defaultValue'
             *   }
             * }
             *
             * Custom attributes are configured as CustomAttributeObject
             */
            defineAttributes: {
              value: function value(attrs) {
                for (var attr in attrs) {
                  _this.UTIL.defineAttribute(attr, attrs[attr]);
                }
              }
            },

            /**
             * @typedef {object} CustomPropertyObject shape: {
             *   readonly: {boolean} optional
             *   private: {boolean} optional,
             *   default: {any} Default property value,
             *   get: {function} Custom Getter,
             *   set: {function} Custom setter
             * }
             */

            /**
             * @method defineProperty
             * Registers a custom property on the element. If an attribute of the same
             * name already exists, its paired property will be overwritten.
             * @param  {string} name
             * @param  {string|boolean|number|CustomPropertyObject} value
             */
            defineProperty: {
              value: function value(name, _value2) {
                if (_typeof(_value2) !== 'object' || _value2 === null) {
                  _this.PRIVATE.properties[name] = _value2;
                  _this[name] = _value2;
                  return;
                }

                var data = {
                  readonly: _value2.hasOwnProperty('readonly') && _value2.readonly === true,
                  private: _value2.hasOwnProperty('private') && _value2.private === true,
                  default: _value2.hasOwnProperty('default') ? _value2.default : null
                };

                if (_value2.hasOwnProperty('get')) {
                  if (typeof _value2.get !== 'function') {
                    return _this.UTIL.throwError({
                      type: 'type',
                      message: 'Property getter must be a function'
                    });
                  }

                  data.get = _value2.get;
                }

                if (_value2.hasOwnProperty('set')) {
                  if (typeof _value2.set !== 'function') {
                    return _this.UTIL.throwError({
                      type: 'type',
                      message: 'Property setter must be a function'
                    });
                  }

                  data.set = _value2.set;
                }

                if (_value2.private) {
                  return _this.PRIVATE.definePrivateProperty(name, data);
                }

                if (_value2.readonly) {
                  return _this.PRIVATE.defineReadOnlyProperty(name, data);
                }

                _this.PRIVATE.properties[name] = data.default;
                Object.defineProperty(_assertThisInitialized(_this), name, {
                  get: function get() {
                    if (data.hasOwnProperty('get')) {
                      return data.get();
                    }

                    return _this.PRIVATE.properties[name] === null ? data.default : _this.PRIVATE.properties[name];
                  },
                  set: function set(value) {
                    if (data.hasOwnProperty('set')) {
                      return data.set(value);
                    }

                    _this.PRIVATE.properties[name] = value;
                  }
                });
              }
            },

            /**
             * @method defineProperties
             * Register multiple properties at once on the element.
             * @param  {object} properties
             * Example: {
             *   booleanProperty: false,
             *   stringProperty: 'string',
             *   customProperty: {
             *     readonly: true,
             *     private: true,
             *     get: () => {
             *       doSomething()
             *       return this.customProperty
             *     },
             *     default: 'default value'
             *   }
             * }
             */
            defineProperties: {
              value: function value(properties) {
                for (var property in properties) {
                  _this.UTIL.defineProperty(property, properties[property]);
                }
              }
            },

            /**
             * @method definePrivateMethods
             * Register multiple private methods on the element. These will be added
             * tp the element's "PRIVATE" object and can be accessed via this.PRIVATE.*
             * @param  {object} methods
             * Example {
             *   myPrivateMethod: () => doSomething()
             * }
             */
            definePrivateMethods: {
              value: function value(methods) {
                for (var method in methods) {
                  if (_this.PRIVATE.hasOwnProperty(method)) {
                    return _this.UTIL.throwError({
                      message: "Cannot create private method. Property name \"".concat(method, "\" is already in use.")
                    });
                  }

                  _this.PRIVATE[method] = methods[method];
                }
              }
            },

            /**
             * @method createEvent
             * Returns a new CustomEvent object.
             * @param  {[type]} name
             * Name of the event
             * @param  {object} detail
             * Properties to add to event.detail
             * @return {CustomEvent}
             */
            createEvent: {
              value: function value(name, detail) {
                return new CustomEvent(name, {
                  detail: detail
                });
              }
            },

            /**
             * @method generateGuid
             * @param  {string} [prefix=null]
             * String to prepend to the beginning of the id.
             * @param  {string} [postfix=null]
             * String to append to the end of the id.
             * @return {string}
             * New RFC-compliant GUID
             */
            generateGuid: {
              value: function value() {
                var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                var postfix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
                  // eslint-disable-line space-infix-ops
                  return (c ^ _this.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
                });

                if (prefix) {
                  id = "".concat(prefix).concat(id);
                }

                if (postfix) {
                  id = "".concat(id).concat(postfix);
                }

                return id;
              }
            },

            /**
             * @method insertStyleRule
             * Inserts a new CSS rule-set into the component's shadow root style sheet.
             * @param {string} name
             * Unique identifier to be used as an accessor for this rule-set
             * @param {string} selector
             * CSS selector string
             * @param {number} index [optional]
             * Index at which to add the new style rule
             */
            insertStyleRule: {
              value: function value(name, selector) {
                var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.PRIVATE.styleSheet.cssRules.length;

                _this.PRIVATE.styleSheet.insertRule(selector, index);

                _this.PRIVATE.styleRules[name] = {
                  default: _this.PRIVATE.styleSheet.cssRules[index]
                };

                if (selector.includes(':host(')) {
                  selector = "".concat(_this.localName).concat(/\(([^)]+)\)/.exec(selector)[1], " {}");
                  index += 1;

                  if (selector) {
                    _this.PRIVATE.styleSheet.insertRule(selector, index);

                    _this.PRIVATE.styleRules[name].legacy = _this.PRIVATE.styleSheet.cssRules[index];
                  }
                }
              }
            },

            /**
             * @method insertStyleRules
             * Inserts one or more new CSS rule-sets into the component's shadow root style sheet.
             * @param {object} rules
             * CSS selector string or definition object. If using a definition object, the key name
             * will be used as an accessor for this rule.
             * @param {string} rules.selector
             * CSS selector string
             * @param {string} rules.index [optional]
             * Index at which to insert the new rule into the style sheet.
             */
            insertStyleRules: {
              value: function value(rules) {
                for (var rule in rules) {
                  var input = rules[rule];

                  if (typeof input === 'string') {
                    _this.UTIL.insertStyleRule(rule, input);

                    continue;
                  }

                  if (Array.isArray(input) || _typeof(input) !== 'object') {
                    return _this.UTIL.throwError({
                      type: 'type',
                      message: "Invalid Style Rule definition \"".concat(JSON.stringify(input), "\". Definitions must either be a valid CSS selector string or an object")
                    });
                  }

                  if (!input.hasOwnProperty('selector')) {
                    return _this.UTIL.throwError({
                      message: 'Style Rule Definition must include a "selector" property'
                    });
                  }

                  _this.insertStyleRule(rule, input.selector, input.hasOwnProperty('index') ? input.index : null);
                }
              }
            },

            /**
             * @method removeStyleProperty
             * Removes a style property declaration from the specified rule in the component's shadow root style sheet.
             * @param {string} ruleName
             * Name of the rule
             * @param {string} propertyName
             * CSS property name
             */
            removeStyleProperty: {
              value: function value(ruleName, propertyName) {
                var rule = _this.PRIVATE.getStyleRule(ruleName);

                rule.default.style.removeProperty(propertyName);

                if (rule.hasOwnProperty('legacy')) {
                  rule.legacy.style.removeProperty(propertyName);
                }
              }
            },

            /**
             * @method removeStyleProperties
             * Removes a set of style property declarations from the specified rule in the component's shadow root style sheet.
             * @param {string} ruleName
             * Name of the rule
             * @param {array} propertyNames
             * Names of the CSS properties to remove
             */
            removeStyleProperties: {
              value: function value(ruleName, propertyNames) {
                if (!Array.isArray(propertyNames)) {
                  return _this.UTIL.throwError({
                    type: 'type',
                    message: "Style property names must be an array of strings"
                  });
                }

                propertyNames.forEach(function (propertyName) {
                  return _this.UTIL.removeStyleProperty(ruleName, propertyName);
                });
              }
            },

            /**
             * @method setStyleProperty
             * Adds a new style declaration to the component's shadow root style sheet, or updates an existing one.
             * @param {string} ruleName
             * String identifier for the style rule to add the declaration to.
             * @param {string} propertyName
             * CSS property
             * @param {string} propertyValue
             * CSS property value
             * @param {boolean} important [optional]
             * true sets the important flag on this property declaration.
             */
            setStyleProperty: {
              value: function value(ruleName, propertyName, propertyValue) {
                var important = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

                var rule = _this.PRIVATE.getStyleRule(ruleName);

                rule.default.style.setProperty(propertyName, propertyValue, important ? 'important' : undefined);

                if (rule.hasOwnProperty('legacy')) {
                  rule.legacy.style.setProperty(propertyName, propertyValue, important ? 'important' : undefined);
                }
              }
            },

            /**
             * @method setStyleProperties
             * Adds a set of new style declarations to the component's shadow root style sheet, or updates existing ones.
             * @param {string} ruleName
             * String identifier for the style rule to add the declaration to.
             * @param {array} properties
             * Array of objects of shape: {
             *   name: {string} CSS property name,
             *   value: {string} CSS property value,
             *   important: {boolean} Determines whether or not to set the !important flag [optional]
             * }
             */
            setStyleProperties: {
              value: function value(ruleName, properties) {
                if (!Array.isArray(properties)) {
                  return _this.UTIL.throwError({
                    type: 'type',
                    message: "Style properties must be an array of objects"
                  });
                }

                properties.forEach(function (property) {
                  var important = property.hasOwnProperty('important') && property.important === true;

                  _this.UTIL.setStyleProperty(ruleName, property.name, property.value, important);
                });
              }
            },

            /**
             * @typedef {string} ErrorType (custom, dependency, readonly, reference, type)
             * Indentifier for JavaScript built-in Error types including:
             * Error, TypeError, ReferenceError, or custom Error
             */

            /**
             * @method throwError
             * Throws a customizable new Error.
             * @param {object} properties
             * @property {ErrorType} type
             * Type of error to throw. For example, 'reference' will throw a
             * new ReferenceError() instance, while 'type' will throw a new TypeError()
             * instance. Other values will throw customizable new Error() instances.
             * @property {object} vars
             * Some error types have default messages which accept interpolated variables.
             * For example, 'dependency' errors accept an options 'name' variable, the
             * value of which should be the name of the missing dependency. They also
             * accept a 'url' variable, the value of which should be a url where the
             * dependency can be acquired.
             * @property {string} message
             * A custom message to append to the default error message.
             *
             * Example usage:
             * ```js
             * this.UTIL.throwError({
             *   type: 'dependency',
             *   vars: {
             *     name: 'NGN',
             *     url: 'https://github.com/ngnjs/NGN'
             *   },
             *   message: 'NGN makes development a breeze!'
             * })
             * ```
             */
            throwError: {
              value: function value(properties) {
                var finalMessage = "<".concat(_this.localName, "> ");
                var type = properties.hasOwnProperty('type') ? properties.type : 'custom';
                var error = new Error();
                var vars = properties.vars;

                if (type === 'dependency') {
                  finalMessage += 'Missing dependency';

                  if (vars) {
                    if (vars.hasOwnProperty('name')) {
                      finalMessage += ": ".concat(vars.name);
                    }

                    if (vars.hasOwnProperty('url')) {
                      finalMessage += " ".concat(vars.url);
                    }
                  }
                } else if (type === 'readonly') {
                  finalMessage += "Cannot set read-only property";

                  if (vars && vars.hasOwnProperty('prop')) {
                    finalMessage += " \"".concat(vars.prop, "\"");
                  }
                } else if (type === 'reference') {
                  error = new ReferenceError();
                } else if (type === 'type') {
                  error = new TypeError();
                } else {
                  return _this.UTIL.throwError({
                    message: "Unrecognized error type \"".concat(type, "\". Accepted types: \"custom\", \"dependency\", \"readonly\", \"reference\", \"type\"")
                  });
                }

                if (properties.hasOwnProperty('message')) {
                  finalMessage += " ".concat(properties.message);
                }

                error.message = finalMessage.trim();
                throw error;
              }
            },

            /**
              * @typedef {string} ConsoleLogType (warning, error, info, log)
              * Indentifier for window.console built-in methods including:
              * warn(), error(), info(), log()
              */

            /**
             * @method printToConsole
             * Prints a message to the console, along with the tag-name of the element.
             * Can print customizable warnings, errors, info, or default logs.
             * @param {string} message
             * Message to print.
             * @param {ConsoleLogType} [type = 'log']
             * Type of message to print to the console. This will determine which
             * method of the window.console object is used to print the message.
             */
            printToConsole: {
              value: function value(message) {
                var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
                var finalMessage = "<".concat(_this.localName, "> ").concat(message);

                switch (type) {
                  case 'warning':
                    return console.warn("[WARNING] ".concat(finalMessage));

                  case 'error':
                    return console.error("[ERROR] ".concat(finalMessage));

                  case 'info':
                    return console.info(finalMessage);

                  default:
                    return console.log(finalMessage);
                }
              }
            },

            /**
             * @method monitorChildren
             * Applies a MutationObserver to the element.
             * @param {function} callback
             * Runs when a mutation occurs
             * @param {Boolean} [subtree = false]
             * Determines whether or not to observe changes to the descendants of the target node
             */
            monitorChildren: {
              value: function value(callback) {
                var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                _this.childMonitor = new MutationObserver(callback);
                cfg = cfg || {
                  childList: true,
                  attributes: false,
                  characterData: false,
                  subtree: false
                };

                _this.childMonitor.observe(_assertThisInitialized(_this), cfg);
              }
            },

            /**
             * @method registerListener
             * Applies an event listener. This listener will be automatically cleaned up
             * upon element disconnect.
             * @param {DOMNode} element
             * Element to which to apply the event listener.
             * @param {string} evtName
             * Name of the event to listen to.
             * @param {function} callback
             * Function to call upon firing of the event.
             */
            registerListener: {
              value: function value(element, evtName, callback) {
                var listener = {
                  id: "listener_".concat(_this.UTIL.generateGuid()),
                  apply: function apply() {
                    return element.addEventListener(evtName, callback);
                  },
                  remove: function remove() {
                    return element.removeEventListener(evtName, callback);
                  }
                };

                _this.PRIVATE.listeners.push(listener);

                listener.apply();
              }
            },

            /**
             * @method registerListeners
             * Applies multiple event listeners at once. Each listener will be automatically cleaned up
             * upon element disconnect.
             * @param {DOMNode} element
             * Element to which to apply all the event listeners.
             * @param {{name: String, callback: Function}[]} listeners
             * Event Listeners to apply.
             */
            registerListeners: {
              value: function value(element, listeners) {
                for (var listener in listeners) {
                  _this.UTIL.registerListener(element, listener, listeners[listener]);
                }
              }
            }
          });

          _this.PRIVATE.initialize(templateString);

          return _this;
        }
        /**
         * @override
         * @method attributeChangedCallback
         * Synchronizes attribute/property updates.
         * @param  {string} attribute
         * @param  {string} oldValue
         * @param  {string} newValue
         * @fires attribute.change
         * Fires before change is applied to matching properties.
         * @fires attribute.changed
         * Fires after change has been applied to matching properties.
         */


        _createClass(_class, [{
          key: "attributeChangedCallback",
          value: function attributeChangedCallback(attribute, oldValue, newValue) {
            this.emit('attribute.change', {
              attribute: attribute,
              oldValue: oldValue,
              newValue: newValue
            });
            var _this$PRIVATE = this.PRIVATE,
                attributes = _this$PRIVATE.attributes,
                booleanAttributes = _this$PRIVATE.booleanAttributes;

            if (attributes.hasOwnProperty(attribute) && attributes[attribute] !== newValue) {
              this.PRIVATE.attributes[attribute] = newValue;
            } else if (booleanAttributes.hasOwnProperty(attribute) && newValue !== 'true' && newValue !== '') {
              this.PRIVATE.booleanAttributes[attribute] = newValue;
            }

            this.emit('attribute.changed', {
              attribute: attribute,
              oldValue: oldValue,
              newValue: newValue
            });
          }
          /**
           * @override
           * @method connectedCallback
           * Fires events upon element connection.
           * @fires 'connected'
           * @fires 'rendered'
           * Fires once the element's children have been rendered to the DOM.
           */

        }, {
          key: "connectedCallback",
          value: function connectedCallback() {
            var _this4 = this;

            Object.defineProperty(this.PRIVATE, 'styleSheet', {
              value: this.shadowRoot.querySelector('style').sheet
            });
            this.emit('connected');
            setTimeout(function () {
              return _this4.emit('rendered');
            }, 0);
          }
          /**
           * @override
           * @method disconnectedCallback
           * Removes all registered event listeners upon element disconnect.
           * @fires 'disconnected'
           */

        }, {
          key: "disconnectedCallback",
          value: function disconnectedCallback() {
            this.PRIVATE.listeners.forEach(function (listener) {
              return listener.remove();
            });
            this.emit('disconnected');
          }
          /**
           * @method emit
           * Dispatches a new CustomEvent()
           * @param  {string} name
           * Name of event to dispatch
           * @param  {object} detail
           * Data object to include in the event's payload
           * @param  {HTMLElement} [target=null]
           * DOM node to fire the event at.
           */

        }, {
          key: "emit",
          value: function emit(name, detail) {
            var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
            var event = this.UTIL.createEvent(name, detail);

            if (target) {
              return target.dispatchEvent(event);
            }

            this.dispatchEvent(event);
          }
          /**
           * @method off
           * Convenience method. Removes an event listener from the element.
           * @param  {string}   evtName
           * @param  {function} handler
           */

        }, {
          key: "off",
          value: function off(evtName, handler) {
            this.removeEventListener(evtName, handler);
          }
          /**
           * @method on
           * Convenience method. Attaches an event listener to the element.
           * @param  {string}   evtName
           * @param  {function} handler
           * Called when the event is fired.
           */

        }, {
          key: "on",
          value: function on(evtName, handler) {
            this.addEventListener(evtName, handler);
          }
        }]);

        return _class;
      }(superClass)
    );
  };

  return AuthorBaseElement;

}());
//# sourceMappingURL=author-base.es5.js.map
