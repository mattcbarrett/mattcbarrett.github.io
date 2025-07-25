interface Props {
  isVertical?: boolean
  xMargin?: string
  yMargin?: string
}

const Divider = ({ 
  isVertical,
  xMargin, 
  yMargin
}: Props) => {
  return (
    <>
    {isVertical ?
      <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-400 to-transparent ${xMargin ? xMargin : 'mx-0'}`}/>
    :
      <div className={`h-px bg-transparent bg-gradient-to-r from-transparent via-zinc-400 to-transparent ${yMargin ? yMargin : 'my-0'}`}/>
    }
    </>
  )
}

export default Divider