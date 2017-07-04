'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Writer = function (_Component) {
  _inherits(Writer, _Component);

  function Writer(props) {
    _classCallCheck(this, Writer);

    var _this = _possibleConstructorReturn(this, (Writer.__proto__ || Object.getPrototypeOf(Writer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Writer, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.textControl = null;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.textControl.value = this.props.content || '';
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var content = nextProps.content;

      if (content !== this.props.content) {
        this.textControl.value = content;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          expand = _props.expand,
          disabled = _props.disabled;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('mdeditor-views-writer', expand && 'expand') },
        _react2.default.createElement('textarea', {
          ref: function ref(_ref) {
            return _this2.textControl = _ref;
          },
          onChange: this.handlerByEditor.bind(this),
          disabled: disabled })
      );
    }
  }, {
    key: 'handlerByEditor',
    value: function handlerByEditor(e) {
      this.props.onChange(this.textControl.value);
    }
  }]);

  return Writer;
}(_react.Component);

exports.default = Writer;