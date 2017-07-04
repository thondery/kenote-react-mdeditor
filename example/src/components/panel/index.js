import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Switch, InputNumber, Radio } from 'antd'
import './style.scss'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const optionsShape = {
  width      : PropTypes.number,
  height     : PropTypes.number,
  border     : PropTypes.bool,
  radius     : PropTypes.number,
  mode       : PropTypes.oneOf(['edit', 'split', 'preview'])
}

export default class Panel extends Component {
  static propTypes = {
    options    : PropTypes.shape(optionsShape),
    onChange   : PropTypes.func
  }

  static defaultProps = {
    options   : {
      width      : 800,
      height     : 600,
      border     : false,
      radius     : 0,
      mode       : 'split'
    },
    onChange  : () => null
  }

  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    const { options } = this.props
    const itemOpts = {
      style: { width: 180, },
      labelCol: { span: 8, offset: 2 }
    }
    const itemModeOpts = {
      style: { width: 360, },
      labelCol: { span: 4, offset: 1 }
    }
    return (
      <div className={'app-panel'}>
        <Form layout={'inline'}>
          <FormItem {...itemOpts} label={'宽度'}>
            <InputNumber 
              {...{ min: 800, max: 1200, size: 'default' }}
              value={this.state.width || options.width} 
              onChange={this.handleChange.bind(this, 'width')} />
          </FormItem>
          <FormItem {...itemOpts} label='高度'>
            <InputNumber 
              {...{ min: 600, max: 900, size: 'default' }}
              value={this.state.height || options.height} 
              onChange={this.handleChange.bind(this, 'height')} />
          </FormItem>
          <FormItem {...itemOpts} label='边框'>
            <Switch 
              checked={this.state.border === undefined ? options.border : this.state.border} 
              onChange={this.handleChange.bind(this, 'border')} />
          </FormItem>
          <FormItem {...itemOpts} label='圆角'>
            <InputNumber 
              {...{ min: 1, max: 16, size: 'default' }}
              value={this.state.radius || options.radius} 
              onChange={this.handleChange.bind(this, 'radius')} />
          </FormItem>
          <FormItem label="模式" {...itemModeOpts}>
            <RadioGroup 
              size={'default'} 
              value={options.mode} 
              onChange={this.handleChange.bind(this, 'mode')} >
              <RadioButton value='edit'>编辑</RadioButton>
              <RadioButton value='split'>分栏</RadioButton>
              <RadioButton value='preview'>预览</RadioButton>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
    )
  }

  handleChange (name, evt) {
    const value = evt.target ? evt.target.value : evt
    this.setState({ [name]: value }, () => 
      this.props.onChange({...this.props.options, ...this.state}) 
    )
  }
}