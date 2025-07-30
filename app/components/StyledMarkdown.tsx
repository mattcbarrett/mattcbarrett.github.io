import React from 'react'
import Markdown from 'react-markdown'

type Props = {
  children: string
  className: string
}

const StyledMarkdown = ({ children, className }: Props) => {
  return (
    <Markdown 
      className={className}
      components={{
        img: ({node,...props})=><img className="mx-auto h-auto md:max-w-[550px]" {...props}/>,
        h1: ({node,...props})=><h1 className="md:text-xl text-base" {...props}/>,
        h2: ({node,...props})=><h2 className="md:text-xl text-base" {...props}/>,
        h3: ({node,...props})=><h3 className="md:text-xl text-base" {...props}/>,
        a: ({node,...props})=><a className="hover:text-lime-400" {...props}/>
      }}
    >
      {children}
    </Markdown>
  )
}

export default StyledMarkdown