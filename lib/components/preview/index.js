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

require('./markdown.scss');

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownIt = (0, _markdownIt2.default)({
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-highlightjs')).use(require('markdown-it-sub')).use(require('markdown-it-sup')).use(require('markdown-it-footnote')).use(require('markdown-it-deflist')).use(require('markdown-it-abbr')).use(require('markdown-it-emoji')).use(require('markdown-it-container'), 'spoiler', {
  validate: function validate(params) {
    return params.trim().match(/^spoiler\s+(.*)$/);
  },
  render: function render(tokens, idx) {
    var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<details><summary>' + MarkdownIt.utils.escapeHtml(m[1]) + '</summary>\n';
    } else {
      // closing tag
      return '</details>\n';
    }
  }
}).use(require('markdown-it-ins')).use(require('markdown-it-mark')).use(require('markdown-it-toc'));

var Preview = function (_Component) {
  _inherits(Preview, _Component);

  function Preview() {
    _classCallCheck(this, Preview);

    return _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).apply(this, arguments));
  }

  _createClass(Preview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          expand = _props.expand,
          shrink = _props.shrink,
          content = _props.content;

      var contentHtml = MarkdownIt.render(content);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('mdeditor-views-preview', 'markdown', expand && 'expand', shrink && 'shrink')
          //style={{ height: height }}
          //dangerouslySetInnerHTML={{ __html: contentHtml }}
        },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: contentHtml } })
      );
    }
  }]);

  return Preview;
}(_react.Component);

exports.default = Preview;