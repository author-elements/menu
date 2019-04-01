class AuthorMenuElement extends AuthorBaseElement(HTMLElement) {
  constructor (templateString = null) {
    super(templateString || `{{TEMPLATE-STRING}}`)

    this.UTIL.defineProperties({
      sourceForm: {
        private: true,
        default: null
      },

      form: {
        readonly: true,
        get: () => this.PRIVATE.sourceForm
      },

      hoveredIndex: {
        readonly: true,
        get: () => this.optionsElement.hoveredIndex
      },

      injected: {
        private: true,
        default: false
      },

      options: {
        readonly: true,
        get: () => this.optionsElement.displayOptions
      },

      optionsElement: {
        readonly: true,
        get: () => this.querySelector('author-options')
      },

      selectedOptions: {
        readonly: true,
        get: () => this.optionsElement ? this.optionsElement.selectedOptions : null
      },

      title: {
        private: true,
        default: ''
      },

      willValidate: {
        readonly: true,
        get: () => this.sourceElement.willValidate
      },

      validationMessage: {
        readonly: true,
        get: () => this.sourceElement.validationMessage
      },

      validity: {
        readonly: true,
        get: () => this.sourceElement.validity
      }
    })

    this.UTIL.defineAttributes({
      name: '',
      placeholder: '',
      autofocus: false,
      disabled: false,
      'force-open': false,
      open: false,
      required: false,

      size: {
        get: () => this.PRIVATE.throwSizeAttributeWarning(),
        set: () => this.PRIVATE.throwSizeAttributeWarning()
      }
    })

    this.UTIL.definePrivateMethods({
      addOpenListeners: () => {
        document.addEventListener('mousedown', this.PRIVATE.bodyMousedownHandler)
        document.addEventListener('touchcancel', this.PRIVATE.bodyMousedownHandler)
        document.addEventListener('touchend', this.PRIVATE.bodyMousedownHandler)
      },

      blurHandler: evt => this.off('keydown', this.PRIVATE.keydownHandler),

      bodyMousedownHandler: evt => {
        if (evt.target === this || this.contains(evt.target)) {
          return
        }

        this.open = false
      },

      focusHandler: evt => this.on('keydown', this.PRIVATE.keydownHandler),

      keydownHandler: evt => {
        let startIndex = this.hoveredIndex > -1
          ? this.hoveredIndex
          : this.selectedIndex > -1
            ? this.selectedIndex
            : -1

        switch (evt[this.keySource]) {
          case 27:
          case 'Escape':
            this.open = false
            return

          case 13:
          case 'Enter':
          case 32:
          case ' ':
            evt.preventDefault()

            if (!this.multiple) {
              if (!this.open && (evt[this.keySource] === 32 || evt[this.keySource] === ' ')) {
                this.open = true
                return
              }

              if (this.hoveredIndex === this.selectedIndex || this.hoveredIndex === -1) {
                this.open = false
                return
              }

              this.selectedIndex = this.hoveredIndex
            }

            break

          case 38:
          case 'ArrowUp':
            evt.preventDefault()

            if (!this.multiple && !this.open) {
              this.open = true
              return
            }

            return this.emit('keydown.arrowUp', {
              shiftKey: evt.shiftKey,
              startIndex
            }, this.optionsElement)

          case 40:
          case 'ArrowDown':
            evt.preventDefault()

            if (!this.multiple && !this.open) {
              this.open = true
              return
            }

            return this.emit('keydown.arrowDown', {
              shiftKey: evt.shiftKey,
              startIndex
            }, this.optionsElement)

          case 9:
          case 'Tab':
            this.open = false
            break
        }
      },

      optionSelectionHandler: evt => {
        evt.stopPropagation()
        // let { afterChange } = this.PRIVATE.middleware

        this.dispatchEvent(new Event('change', {}))

        if (this.open) {
          this.removeAttribute('open')
        }

        // if (this.checkValidity()) {
        //   this.removeAttribute('invalid')
        // } else {
        //   this.setAttribute('invalid', '')
        // }

        // if (afterChange && typeof afterChange === 'function') {
        //   afterChange(evt.detail.previous, this.selectedOptions)
        // }
      },

      removeOpenListeners: () => {
        document.removeEventListener('mousedown', this.PRIVATE.bodyMousedownHandler)
        document.removeEventListener('touchcancel', this.PRIVATE.bodyMousedownHandler)
        document.removeEventListener('touchend', this.PRIVATE.bodyMousedownHandler)
      },

      stateChangeHandler: evt => {
        let { name, value } = evt.detail

        switch (name) {
          case 'multiple':
            value && this.removeAttribute('open')
            return

          case 'open':
            if (this.multiple) {
              this.optionsElement.unHoverAllOptions()
              return this.removeAttribute('open')
            }

            if (value) {
              if (!this.hasAttribute('open')) {
                this.setAttribute('open', '')
              }

              return this.PRIVATE.addOpenListeners()
            }

            this.PRIVATE.removeOpenListeners()
        }
      },

      throwSizeAttributeWarning: () => {
        this.UTIL.printToConsole(`"size" attribute is not supported. Please use CSS to set the height of the options panel instead.`, 'warning')
      },

      toggleHandler: evt => this.open = !this.open//,

      // validationHandler: evt => this.emit('invalid')
    })

    this.UTIL.registerListeners(this, {
      'attribute.change': evt => {
        let { attribute, oldValue, newValue } = evt.detail

        if (newValue === oldValue) {
          return
        }

        switch (attribute) {
          case 'force-open': return this.emit('state.change', {
            name: 'open',
            value: true
          })

          case 'open': return this.emit('state.change', {
            name: 'open',
            value: this.hasAttribute('open') || this.hasAttribute('force-open')
          })

          case 'size': return this.PRIVATE.throwSizeAttributeWarning()
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

      blur: this.PRIVATE.blurHandler,
      focus: this.PRIVATE.focusHandler,
      'options.selected': this.PRIVATE.optionSelectionHandler,
      'state.change': this.PRIVATE.stateChangeHandler,
      toggle: this.PRIVATE.toggleHandler,

      rendered: () => {
        if (!this.hasAttribute('tabindex')) {
          this.setAttribute('tabindex', 0)
        }

        this.autofocus && this.focus()
      }
    })
  }

  static get observedAttributes () {
    return ['autofocus', 'disabled', 'force-open', 'name', 'open', 'placeholder', 'tabindex', 'size']
  }

  get length () {
    return this.options.length
  }

  get selectedIndex () {
    return this.optionsElement ? this.optionsElement.selectedIndex : -1
  }

  set selectedIndex (index) {
    if (index < 0) {
      return this.deselectAll()
    }

    this.optionsElement.selectedIndex = index
  }

  get value () {
    if (this.selectedOptions.length === 0) {
      return null
    }

    let selectedOption = this.selectedOptions.item(0)
    return selectedOption ? selectedOption.value || selectedOption.text : null
  }

  add (option, index) {
    this.optionsElement.addOption(option, index)
  }

  checkValidity () {
    return this.sourceElement.checkValidity()
  }

  clear () {
    this.optionsElement.clear()
  }

  deselectAll () {
    this.optionsElement.deselectAll()
  }

  inject (sourceElement, labels = null) {
    // Prevent re-injections
    if (this.PRIVATE.injected) {
      return
    }

    this.PRIVATE.sourceForm = sourceElement.form

    this.UTIL.defineProperty('sourceElement', {
      readonly: true,
      default: sourceElement
    })

    let optionsElement = document.createElement('author-options')
    optionsElement.slot = 'options'

    if (labels) {
      this.UTIL.defineProperty('labels', {
        private: true,
        default: labels
      })
    }

    this.appendChild(optionsElement)

    if (sourceElement.children.length > 0) {
      if (!this.multiple) {
        Array.from(sourceElement.children).forEach(option => {
          if (option.index !== sourceElement.selectedIndex) {
            option.removeAttribute('selected')
          }
        })
      }

      this.optionsElement.addOptions(sourceElement.children)
    }

    this.PRIVATE.injected = true
  }

  item (index) {
    return this.optionsElement.item(index)
  }

  namedItem (id) {
    return this.optionsElement.namedItem(id)
  }

  /**
   * method querySelector
   * @param  {string} selector
   * @return {HTMLElement}
   * @override
   */
  querySelector (selector) {
    if (!selector.includes(':checked')) {
      return super.querySelector(selector)
    }

    return this.selectedOptions.length > 0 ? this.selectedOptions[0] : null
  }

  /**
   * method querySelectorAll
   * @param  {string} selector
   * @return {NodeList}
   * @override
   */
  querySelectorAll (selector) {
    if (!selector.includes(':checked')) {
      return super.querySelectorAll(selector)
    }

    return this.optionsElement.querySelectorAll('[selected]')
  }

  remove (index = null) {
    if (index === null) {
      return super.remove()
    }

    this.optionsElement.removeOptionByIndex(index)
  }

  reportValidity () {
    let isValid = this.sourceElement.checkValidity()

    if (isValid) {
      this.removeAttribute('invalid')
    } else {
      this.setAttribute('invalid', '')
    }
  }

  setCustomValidity (string) {
    this.sourceElement.setCustomValidity(string)
  }
}

customElements.define('author-menu', AuthorMenuElement)

export default AuthorMenuElement
