import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.scss'
import './markdown.scss'

import markdownIt from 'markdown-it'

const MarkdownIt = markdownIt({
    html: true,
    xhtmlOut: true,
    linkify: true,
    typographer: true
  })
  .use(require('markdown-it-highlightjs'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-container'), 'spoiler', {
    validate: (params) => {
      return params.trim().match(/^spoiler\s+(.*)$/)
    },
    render: (tokens, idx) => {
      var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<details><summary>' + MarkdownIt.utils.escapeHtml(m[1]) + '</summary>\n'
      } else {
        // closing tag
        return '</details>\n'
      }
    }
  })
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-toc'))

export default class Preview extends Component {


  render () {
    const { expand, shrink, content } = this.props
    const contentHtml = MarkdownIt.render(content)
    return (
      <div 
        className={classnames('mdeditor-views-preview', 'markdown', expand && 'expand', shrink && 'shrink')} 
        //style={{ height: height }}
        //dangerouslySetInnerHTML={{ __html: contentHtml }}
        >
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    )
  }
}