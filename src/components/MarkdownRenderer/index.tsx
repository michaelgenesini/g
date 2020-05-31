import React from 'react'
import ReactMarkdown from 'react-markdown'

type TProps = {
  source: string
}

export const MarkdownRenderer = ({ source }: TProps) => {

  return (
    <div className='markdown-body'>
      <ReactMarkdown source={source} rawSourcePos />
    </div>
  )
}
