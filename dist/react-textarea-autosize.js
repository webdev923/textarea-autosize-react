(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global.TextareaAutosize = factory(global.React,global.PropTypes));
}(this, (function (React,PropTypes) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

var browser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE = browser ? !!document.documentElement.currentStyle : false;

var HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  'height': '0',
  'visibility': 'hidden',
  'overflow': 'hidden',
  'position': 'absolute',
  'z-index': '-1000',
  'top': '0',
  'right': '0'
};

var SIZING_STYLE = ['letter-spacing', 'line-height', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'box-sizing'];

var computedStyleCache = {};
var hiddenTextarea = void 0;

function calculateNodeHeight(uiTextNode, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var minRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var maxRows = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (typeof hiddenTextarea === 'undefined') {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  } else if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox

  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      sizingStyle = _calculateNodeStyling.sizingStyle;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content


  Object.keys(sizingStyle).forEach(function (key) {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function (key) {
    hiddenTextarea.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], 'important');
  });
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || 'x';

  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = 'x';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
  }
  return { height: height, minHeight: minHeight, maxHeight: maxHeight };
}

function calculateNodeStyling(node, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  // TODO: generate id in constructor + clear cache in componentWillUnmount
  if (useCache && computedStyleCache[uid]) {
    return computedStyleCache[uid];
  }

  var style = window.getComputedStyle(node);

  var sizingStyle = SIZING_STYLE.reduce(function (obj, name) {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});

  var boxSizing = sizingStyle['box-sizing'];

  // IE (Edge has already correct behaviour) returns content width as computed width
  // so we need to add manually padding and border widths
  if (isIE && boxSizing === 'border-box') {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(style['border-right-width']) + parseFloat(style['border-left-width']) + parseFloat(style['padding-right']) + parseFloat(style['padding-left']) + 'px';
  }

  var paddingSize = parseFloat(sizingStyle['padding-bottom']) + parseFloat(sizingStyle['padding-top']);

  var borderSize = parseFloat(sizingStyle['border-bottom-width']) + parseFloat(sizingStyle['border-top-width']);

  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache) {
    computedStyleCache[uid] = nodeInfo;
  }

  return nodeInfo;
}

var purgeCache = function purgeCache(uid) {
  return delete computedStyleCache[uid];
};

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * <TextareaAutosize />
 */

var noop = function noop() {};

var _ref = window.requestAnimationFrame ? [window.requestAnimationFrame, window.cancelAnimationFrame] : [setTimeout, clearTimeout];
var onNextFrame = _ref[0];
var clearNextFrameAction = _ref[1];

var TextareaAutosize = function (_React$Component) {
  inherits(TextareaAutosize, _React$Component);

  function TextareaAutosize(props) {
    classCallCheck(this, TextareaAutosize);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._onRootDOMNode = function (node) {
      _this._rootDOMNode = node;

      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      }
    };

    _this._onChange = function (event) {
      if (!_this._controlled) {
        _this._resizeComponent();
      }
      var _this$props = _this.props,
          valueLink = _this$props.valueLink,
          onChange = _this$props.onChange;

      if (valueLink) {
        valueLink.requestChange(event.target.value);
      } else {
        onChange(event);
      }
    };

    _this._resizeComponent = function () {
      if (typeof _this._rootDOMNode === 'undefined') {
        return;
      }

      var _calculateNodeHeight = calculateNodeHeight(_this._rootDOMNode, _this._uid, _this.props.useCacheForDOMMeasurements, _this.props.minRows, _this.props.maxRows),
          height = _calculateNodeHeight.height,
          minHeight = _calculateNodeHeight.minHeight,
          maxHeight = _calculateNodeHeight.maxHeight;

      if (_this.state.height !== height || _this.state.minHeight !== minHeight || _this.state.maxHeight !== maxHeight) {
        _this.setState({ height: height, minHeight: minHeight, maxHeight: maxHeight });
      }
    };

    _this.state = {
      height: props.style && props.style.height || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };

    _this._uid = uid();
    _this._controlled = typeof props.value === 'string';
    return _this;
  }

  TextareaAutosize.prototype.render = function render() {
    var _props = this.props,
        valueLink = _props.valueLink,
        _minRows = _props.minRows,
        _maxRows = _props.maxRows,
        _onHeightChange = _props.onHeightChange,
        _useCacheForDOMMeasurements = _props.useCacheForDOMMeasurements,
        _inputRef = _props.inputRef,
        props = objectWithoutProperties(_props, ['valueLink', 'minRows', 'maxRows', 'onHeightChange', 'useCacheForDOMMeasurements', 'inputRef']);


    if ((typeof valueLink === 'undefined' ? 'undefined' : _typeof(valueLink)) === 'object') {
      props.value = valueLink.value;
    }

    props.style = _extends({}, props.style, {
      height: this.state.height
    });

    var maxHeight = Math.max(props.style.maxHeight || Infinity, this.state.maxHeight);

    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }

    return React.createElement('textarea', _extends({}, props, {
      onChange: this._onChange,
      ref: this._onRootDOMNode
    }));
  };

  TextareaAutosize.prototype.componentDidMount = function componentDidMount() {
    this._resizeComponent();
    window.addEventListener('resize', this._resizeComponent);
  };

  TextareaAutosize.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this._clearNextFrame();
    this._onNextFrameActionId = onNextFrame(this._resizeComponent);
  };

  TextareaAutosize.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  };

  TextareaAutosize.prototype.componentWillUnmount = function componentWillUnmount() {
    this._clearNextFrame();
    window.removeEventListener('resize', this._resizeComponent);
    purgeCache(this._uid);
  };

  TextareaAutosize.prototype._clearNextFrame = function _clearNextFrame() {
    clearNextFrameAction(this._onNextFrameActionId);
  };

  return TextareaAutosize;
}(React.Component);

TextareaAutosize.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onHeightChange: PropTypes.func,
  useCacheForDOMMeasurements: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  inputRef: PropTypes.func
};
TextareaAutosize.defaultProps = {
  onChange: noop,
  onHeightChange: noop,
  useCacheForDOMMeasurements: false
};

return TextareaAutosize;

})));
