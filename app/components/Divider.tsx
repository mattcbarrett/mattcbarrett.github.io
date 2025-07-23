interface Props {
  isVertical?: boolean
  xMargin?: number
  yMargin?: number
}

const Divider = (props: Props) => {
  const { 
    isVertical,
    xMargin, 
    yMargin
  } = props

  return (
    <>
    {isVertical ?
      <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-400 to-transparent mx-${xMargin}`}/>
    :
      <div className={`h-px bg-transparent bg-gradient-to-r from-transparent via-zinc-400 to-transparent my-${yMargin}`}/>
    }
    </>
  )
}

export default Divider