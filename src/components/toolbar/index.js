import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import _ from 'lodash'
import FontAwesome from '../font-awesome'
import './style.scss'

const dataShape = PropTypes.shape({
  icon          : PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type          : PropTypes.string,
  alt           : PropTypes.string
})

export default class ToolBar extends Component {
  static propTypes = {
    modbar: PropTypes.arrayOf(dataShape),
    topbar: PropTypes.arrayOf(dataShape),
    radius: PropTypes.number,
    onSelectType: PropTypes.func
  }

  static defaultProps = {
    modbar: null,
    topbar: null,
    radius: 0,
    onSelectType: () => null
  }

  render () {
    const { modbar, topbar, radius, onSelectType, mode, fullscreen, help } = this.props
    const styleOpts = {
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    }
    return (
      <div className={'mdeditor-toolbar'} style={styleOpts}>
        <ul className={'mdeditor-toolbar-topbar'}>
          {topbar && topbar.map( (item, i) => {
            return (
              <li key={i} 
                className={classnames(item.type === 'help' && help && 'active')} 
                onClick={onSelectType.bind(this, item.type)} 
                disabled={help && item.type !== 'help'}
                >
                <FontAwesome type={item.icon} />
              </li>
            )
          })}
        </ul>
        <ul className={'mdeditor-toolbar-modbar'}>
          {modbar && modbar.map( (item, i) => {
            const icons = item.icon
            let _Icon = icons
            if (item.type === 'fullscreen' && _.isArray(icons)) {
              _Icon = fullscreen ? icons[1] : icons[0]
            }
            return (
              <li key={i} className={classnames(mode === item.type && 'active')} onClick={onSelectType.bind(this, item.type)}>
                <FontAwesome type={_Icon.toString()} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}