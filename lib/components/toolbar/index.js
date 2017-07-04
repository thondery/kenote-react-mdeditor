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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fontAwesome = require('../font-awesome');

var _fontAwesome2 = _interopRequireDefault(_fontAwesome);

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dataShape = _propTypes2.default.shape({
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  type: _propTypes2.default.string,
  alt: _propTypes2.default.string
});

var ToolBar = function (_Component) {
  _inherits(ToolBar, _Component);

  function ToolBar() {
    _classCallCheck(this, ToolBar);

    return _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).apply(this, arguments));
  }

  _createClass(ToolBar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          modbar = _props.modbar,
          topbar = _props.topbar,
          radius = _props.radius,
          onSelectType = _props.onSelectType,
          mode = _props.mode,
          fullscreen = _props.fullscreen,
          help = _props.help;

      var styleOpts = {
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius
      };
      return _react2.default.createElement(
        'div',
        { className: 'mdeditor-toolbar', style: styleOpts },
        _react2.default.createElement(
          'ul',
          { className: 'mdeditor-toolbar-topbar' },
          topbar && topbar.map(function (item, i) {
            return _react2.default.createElement(
              'li',
              { key: i,
                className: (0, _classnames2.default)(item.type === 'help' && help && 'active'),
                onClick: onSelectType.bind(_this2, item.type),
                disabled: help && item.type !== 'help'
              },
              _react2.default.createElement(_fontAwesome2.default, { type: item.icon })
            );
          })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'mdeditor-toolbar-modbar' },
          modbar && modbar.map(function (item, i) {
            var icons = item.icon;
            var _Icon = icons;
            if (item.type === 'fullscreen' && _lodash2.default.isArray(icons)) {
              _Icon = fullscreen ? icons[1] : icons[0];
            }
            return _react2.default.createElement(
              'li',
              { key: i, className: (0, _classnames2.default)(mode === item.type && 'active'), onClick: onSelectType.bind(_this2, item.type) },
              _react2.default.createElement(_fontAwesome2.default, { type: _Icon.toString() })
            );
          })
        )
      );
    }
  }]);

  return ToolBar;
}(_react.Component);

ToolBar.propTypes = {
  modbar: _propTypes2.default.arrayOf(dataShape),
  topbar: _propTypes2.default.arrayOf(dataShape),
  radius: _propTypes2.default.number,
  onSelectType: _propTypes2.default.func
};
ToolBar.defaultProps = {
  modbar: null,
  topbar: null,
  radius: 0,
  onSelectType: function onSelectType() {
    return null;
  }
};
exports.default = ToolBar;