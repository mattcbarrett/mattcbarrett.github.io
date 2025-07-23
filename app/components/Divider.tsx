interface Props {
  isVertical?: boolean
  xMargin?: number
  yMargin?: number
}

const marginClasses = {
  0: 'my-0 mx-0',
  1: 'my-1 mx-1',
  2: 'my-2 mx-2',
  3: 'my-3 mx-3',
  4: 'my-4 mx-4',
  5: 'my-5 mx-5',
  6: 'my-6 mx-6',
  7: 'my-7 mx-7',
  8: 'my-8 mx-8',
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
      <div className={`absolute top-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-400 to-transparent ${marginClasses[xMargin as keyof typeof marginClasses]?.split(' ')[1] || 'mx-0'}`}/>
    :
      <div className={`h-px bg-transparent bg-gradient-to-r from-transparent via-zinc-400 to-transparent ${marginClasses[yMargin as keyof typeof marginClasses]?.split(' ')[0] || 'my-0'}`}/>
    }
    </>
  )
}

export default Divider