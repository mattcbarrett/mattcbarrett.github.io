import React from 'react'

type Props = {}

const AboutPage = (props: Props) => {
  return (
    <div className="flex space-x-8 items-center justify-center bg-zinc-900">
      <div className="w-4/5 mx-auto min-h-screen">
        <p>
          self description
        </p>
      </div>
    </div>
  )
}

export default AboutPage