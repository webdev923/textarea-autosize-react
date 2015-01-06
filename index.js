'use strict';

var React = require('react');
var objectAssign = require('object-assign');

var TextareaAutosize = React.createClass({
  displayName: 'TextareaAutosize',

  render: function() {
    var props = objectAssign({}, this.props, {
      onChange: this.onChange,
      style: objectAssign({}, this.props.style, {overflow: 'hidden'})
    });

    return React.DOM.textarea(props, this.props.children);
  },

  componentDidMount: function() {
    this.recalculateSize();
  },

  componentDidUpdate: function(prevProps) {
    if (
      prevProps.style ||
      prevProps.value !== this.props.value ||
      this.props.value === undefined
    ) {
      this.recalculateSize();
    }
  },

  onChange: function(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.value === undefined) {
      // controlled mode
      this.recalculateSize();
    }
  },

  recalculateSize: function() {
    var diff;
    var node = this.getDOMNode();

    if (window.getComputedStyle) {
      var styles = window.getComputedStyle(node);

      // If the textarea is set to border-box, it's not necessary to
      // subtract the padding.
      if (styles.getPropertyValue('box-sizing') === "border-box" ||
          styles.getPropertyValue('-moz-box-sizing') === "border-box" ||
          styles.getPropertyValue('-webkit-box-sizing') === "border-box") {
        diff = 0;
      } else {
        diff = (
          parseInt(styles.getPropertyValue('padding-bottom') || 0, 10) +
          parseInt(styles.getPropertyValue('padding-top') || 0, 10)
        );
      }
    } else {
      diff = 0;
    }

    var node = this.getDOMNode();
    node.style.height = 'auto';
    node.style.height = (node.scrollHeight - diff) + 'px';
  }
});

module.exports = TextareaAutosize;
