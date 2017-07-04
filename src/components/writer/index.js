import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'

export default class Writer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentWillUnmount () {
    this.textControl = null
  }

  componentDidMount () {
    this.textControl.value = this.props.content || ''
  }

  componentWillReceiveProps (nextProps) {
    const { content } = nextProps
    if (content !== this.props.content) {
      this.textControl.value = content
    }
  }

  render () {
    const { expand, disabled } = this.props
    return (
      <div className={classnames('mdeditor-views-writer', expand && 'expand')}>

        <textarea 
          ref={ ref => this.textControl = ref }
          onChange={this.handlerByEditor.bind(this)} 
          disabled={disabled} />
      </div>
    )
  }

  handlerByEditor (e) {
    this.props.onChange(this.textControl.value)
  }
}