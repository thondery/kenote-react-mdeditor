import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import '../node_modules/highlight.js/styles/arduino-light.css'
import './style.scss'
import { Modbar, Topbar } from './options'
import ToolBar from './components/toolbar'
import Writer from './components/writer'
import Preview from './components/preview'

const optionsShape = {
  width      : PropTypes.number,
  height     : PropTypes.number,
  border     : PropTypes.bool,
  radius     : PropTypes.number,
  mode       : PropTypes.oneOf(['edit', 'split', 'preview'])
}

export default class MdEditor extends Component {
  static propTypes = {
    options        : PropTypes.shape(optionsShape),
    onChangeMoode  : PropTypes.func
  }

  static defaultProps = {
    options        : {
      width      : 800,
      height     : 600,
      border     : false,
      radius     : 0,
      mode       : 'split'
    },
    onChangeMoode  : () => null
  }

  constructor(props) {
    super(props)
    this.state = {
      expand: null,
      shrink: null,
      mode: 'split',
      fullscreen: false,
      contentText: '',
      help: false,
      helpContent: '# Help'
    }
  }

  componentWillUnmount () {
    this.textControl = null
    this.previewControl = null
  }

  componentWillReceiveProps (nextProps) {
    const { options } = nextProps
    if (options.mode !== this.props.options.mode) {
      this.setState({ mode: options.mode })
      this.handleSelectType(options.mode)
    }
  }

  render () {
    const { options } = this.props
    const styleOpts = {
      width: options.width, 
      height: options.height,
      borderWidth: options.border ? 1 : 0,
      borderRadius: options.radius
    }
    const contentText = this.state.help ? this.state.helpContent : this.state.contentText

    const viewStyleOpts = {
      borderBottomLeftRadius: options.border ? options.radius : 0,
      borderBottomRightRadius: options.border ? options.radius : 0,
    }
    return (
      <div 
        className={classnames('mdeditor-wrapper', this.state.fullscreen && 'fullscreen')} 
        style={this.state.fullscreen ? { border: 0 } : styleOpts}>
        <ToolBar
          radius={options.border ? options.radius : 0}
          modbar={Modbar}
          topbar={Topbar}
          mode={this.state.mode}
          fullscreen={this.state.fullscreen}
          help={this.state.help}
          onSelectType={this.handleSelectType.bind(this)}
          />
        <div className={'mdeditor-views'} 
          style={this.state.fullscreen ? viewStyleOpts : { ...viewStyleOpts, height: options.height - 44 }}>
          <Writer
            ref={ ref => this.textControl = ref }
            content={contentText}
            expand={this.state.expand === 'edit'}
            disabled={this.state.help}
            onChange={this.handleEditorByChange.bind(this)}
            />
          <Preview
            ref={ ref => this.previewControl = ref }
            expand={this.state.expand === 'preview'}
            shrink={this.state.shrink === 'preview'}
            content={contentText}
            />
        </div>
      </div>
    )
  }

  handleEditorByChange (value) {
    this.setState({ contentText: value })
  }

  handleSelectType (type) {
    switch (type) {
      case 'edit': 
        this.setState({
          expand: 'edit',
          shrink: 'preview',
          mode: type
        })
        break
      case 'preview': 
        this.setState({
          expand: 'preview',
          shrink: null,
          mode: type
        })
        break
      case 'split':
        this.setState({
          expand: null,
          shrink: null,
          mode: type
        })
        break
      case 'fullscreen':
        this.setState({
          fullscreen: !this.state.fullscreen
        })
        break
      case 'bold':
        this.preInputText('**加粗文字**', 2, 6)
        break
      case 'italic':
        this.preInputText('_斜体文字_', 1, 5)
        break
      case 'link': 
        this.preInputText('[链接文本](http://www.yourlink.com)', 1, 5)
        break
      case 'blockquote':
        this.preInputText('> 引用', 2, 4)
        break
      case 'code':
        this.preInputText('```\ncode block\n```', 4, 14)
        break
      case 'picture': 
        this.preInputText('![alt](http://www.yourlink.com)', 2, 5)
        break
      case 'list-ol':
        this.preInputText('1. 有序列表项0\n2. 有序列表项1', 3, 9)
        break
      case 'list-ul':
        this.preInputText('- 无序列表项0\n- 无序列表项1', 2, 8)
        break
      case 'header':
        this.preInputText('## 标题', 3, 5)
        break
      case 'help':
        this.setState({ help: !this.state.help })
        break
      default:
        break
    }
    if (['edit', 'split', 'preview'].indexOf(type) > -1) {
      this.props.onChangeMoode(type)
    }
  }

  preInputText (text, preStart, preEnd) {
    if (this.state.help) return
    const textControl = this.textControl.textControl
    let start = textControl.selectionStart
    let end = textControl.selectionEnd
    let origin = textControl.value
    if (start !== end) {
      let exist = origin.slice(start, end)
      text = text.slice(0, preStart) + exist + text.slice(preEnd)
      preEnd = preStart + exist.length
    }
    textControl.value = origin.slice(0, start) + text + origin.slice(end)
    textControl.setSelectionRange(start + preStart, start + preEnd)
    this.setState({ contentText: textControl.value })
  }
}