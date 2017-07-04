import React, { Component } from 'react'
import '../styles/index.scss'
import options from './options'

import Panel from '../components/panel'
import MdEditor from '../../../'

export default class Root extends Component {

  constructor (props) {
    super(props)
    this.state = {
      options: options
    }
  }

  render () {
    const itemOpts = {
      style: { width: 180, },
      labelCol: { span: 8, offset: 2 }
    }
    return (
      <div style={{ width: 1200, margin: 'auto', paddingBottom: 20 }}>
        <Panel 
          {...{ options: this.state.options }}
          onChange={this.handlePanelChange.bind(this)} />
        <MdEditor 
          {...{ options: this.state.options }}
          onChangeMoode={this.handleChangeMode.bind(this)}
          />
      </div>
    )
  }

  handlePanelChange (opts) {
    this.setState({ options: opts })
  }

  handleChangeMode (type) {
    const opts = {
      ...this.state.options,
      mode: type
    }
    this.setState({ options: opts })
  }
}