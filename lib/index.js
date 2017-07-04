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

require('../node_modules/highlight.js/styles/arduino-light.css');

require('./style.scss');

var _options = require('./options');

var _toolbar = require('./components/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _writer = require('./components/writer');

var _writer2 = _interopRequireDefault(_writer);

var _preview = require('./components/preview');

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optionsShape = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  border: _propTypes2.default.bool,
  radius: _propTypes2.default.number,
  mode: _propTypes2.default.oneOf(['edit', 'split', 'preview'])
};

var MdEditor = function (_Component) {
  _inherits(MdEditor, _Component);

  function MdEditor(props) {
    _classCallCheck(this, MdEditor);

    var _this = _possibleConstructorReturn(this, (MdEditor.__proto__ || Object.getPrototypeOf(MdEditor)).call(this, props));

    _this.state = {
      expand: null,
      shrink: null,
      mode: 'split',
      fullscreen: false,
      contentText: '',
      help: false,
      helpContent: '# Help'
    };
    return _this;
  }

  _createClass(MdEditor, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.textControl = null;
      this.previewControl = null;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var options = nextProps.options;

      if (options.mode !== this.props.options.mode) {
        this.setState({ mode: options.mode });
        this.handleSelectType(options.mode);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;

      var styleOpts = {
        width: options.width,
        height: options.height,
        borderWidth: options.border ? 1 : 0,
        borderRadius: options.radius
      };
      var contentText = this.state.help ? this.state.helpContent : this.state.contentText;

      var viewStyleOpts = {
        borderBottomLeftRadius: options.border ? options.radius : 0,
        borderBottomRightRadius: options.border ? options.radius : 0
      };
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('mdeditor-wrapper', this.state.fullscreen && 'fullscreen'),
          style: this.state.fullscreen ? { border: 0 } : styleOpts },
        _react2.default.createElement(_toolbar2.default, {
          radius: options.border ? options.radius : 0,
          modbar: _options.Modbar,
          topbar: _options.Topbar,
          mode: this.state.mode,
          fullscreen: this.state.fullscreen,
          help: this.state.help,
          onSelectType: this.handleSelectType.bind(this)
        }),
        _react2.default.createElement(
          'div',
          { className: 'mdeditor-views',
            style: this.state.fullscreen ? viewStyleOpts : _extends({}, viewStyleOpts, { height: options.height - 44 }) },
          _react2.default.createElement(_writer2.default, {
            ref: function ref(_ref) {
              return _this2.textControl = _ref;
            },
            content: contentText,
            expand: this.state.expand === 'edit',
            disabled: this.state.help,
            onChange: this.handleEditorByChange.bind(this)
          }),
          _react2.default.createElement(_preview2.default, {
            ref: function ref(_ref2) {
              return _this2.previewControl = _ref2;
            },
            expand: this.state.expand === 'preview',
            shrink: this.state.shrink === 'preview',
            content: contentText
          })
        )
      );
    }
  }, {
    key: 'handleEditorByChange',
    value: function handleEditorByChange(value) {
      this.setState({ contentText: value });
    }
  }, {
    key: 'handleSelectType',
    value: function handleSelectType(type) {
      switch (type) {
        case 'edit':
          this.setState({
            expand: 'edit',
            shrink: 'preview',
            mode: type
          });
          break;
        case 'preview':
          this.setState({
            expand: 'preview',
            shrink: null,
            mode: type
          });
          break;
        case 'split':
          this.setState({
            expand: null,
            shrink: null,
            mode: type
          });
          break;
        case 'fullscreen':
          this.setState({
            fullscreen: !this.state.fullscreen
          });
          break;
        case 'bold':
          this.preInputText('**加粗文字**', 2, 6);
          break;
        case 'italic':
          this.preInputText('_斜体文字_', 1, 5);
          break;
        case 'link':
          this.preInputText('[链接文本](http://www.yourlink.com)', 1, 5);
          break;
        case 'blockquote':
          this.preInputText('> 引用', 2, 4);
          break;
        case 'code':
          this.preInputText('```\ncode block\n```', 4, 14);
          break;
        case 'picture':
          this.preInputText('![alt](http://www.yourlink.com)', 2, 5);
          break;
        case 'list-ol':
          this.preInputText('1. 有序列表项0\n2. 有序列表项1', 3, 9);
          break;
        case 'list-ul':
          this.preInputText('- 无序列表项0\n- 无序列表项1', 2, 8);
          break;
        case 'header':
          this.preInputText('## 标题', 3, 5);
          break;
        case 'help':
          this.setState({ help: !this.state.help });
          break;
        default:
          break;
      }
      if (['edit', 'split', 'preview'].indexOf(type) > -1) {
        this.props.onChangeMoode(type);
      }
    }
  }, {
    key: 'preInputText',
    value: function preInputText(text, preStart, preEnd) {
      if (this.state.help) return;
      var textControl = this.textControl.textControl;
      var start = textControl.selectionStart;
      var end = textControl.selectionEnd;
      var origin = textControl.value;
      if (start !== end) {
        var exist = origin.slice(start, end);
        text = text.slice(0, preStart) + exist + text.slice(preEnd);
        preEnd = preStart + exist.length;
      }
      textControl.value = origin.slice(0, start) + text + origin.slice(end);
      textControl.setSelectionRange(start + preStart, start + preEnd);
      this.setState({ contentText: textControl.value });
    }
  }]);

  return MdEditor;
}(_react.Component);

MdEditor.propTypes = {
  options: _propTypes2.default.shape(optionsShape),
  onChangeMoode: _propTypes2.default.func
};
MdEditor.defaultProps = {
  options: {
    width: 800,
    height: 600,
    border: false,
    radius: 0,
    mode: 'split'
  },
  onChangeMoode: function onChangeMoode() {
    return null;
  }
};
exports.default = MdEditor;