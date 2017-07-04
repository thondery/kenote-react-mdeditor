'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('font-awesome/css/font-awesome.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontAwesome = function (_Component) {
  _inherits(FontAwesome, _Component);

  function FontAwesome() {
    _classCallCheck(this, FontAwesome);

    return _possibleConstructorReturn(this, (FontAwesome.__proto__ || Object.getPrototypeOf(FontAwesome)).apply(this, arguments));
  }

  _createClass(FontAwesome, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          type = _props.type,
          larger = _props.larger,
          animated = _props.animated,
          style = _props.style,
          rotated = _props.rotated,
          onClick = _props.onClick;

      var classname = (0, _classnames2.default)('fa', 'fa-' + type, 'fa-' + larger, animated ? 'fa-' + animated : undefined, rotated > 0 ? 'fa-rotate-' + rotated : undefined, className);
      var opts = { style: style, onClick: onClick };
      return _react2.default.createElement('i', _extends({}, opts, {
        className: classname,
        'aria-hidden': true }));
    }
  }]);

  return FontAwesome;
}(_react.Component);

FontAwesome.propTypes = {
  className: _propTypes2.default.string,
  type: _propTypes2.default.string.isRequired,
  larger: _propTypes2.default.oneOf(['lg', '2x', '3x', '4x', '5x']),
  animated: _propTypes2.default.oneOf([undefined, 'spin', 'pulse']),
  rotated: _propTypes2.default.oneOf([0, 90, 180, 270]),
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};
FontAwesome.defaultProps = {
  className: undefined,
  larger: 'lg',
  animated: undefined,
  rotated: 0,
  style: null,
  onClick: null
};
exports.default = FontAwesome;