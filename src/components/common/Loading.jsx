const Loading = () => {
  return (
    <div className="flex items-center justify-center absolute w-full h-full left-0 top-0 bg-slate-400">
      <div className="animate-pulse grid grid-cols-3 gap-3">
        <span className='h-10 w-10 rounded-full bg-slate-700'></span>
        <span className='h-10 w-10 rounded-full bg-slate-700'></span>
        <span className='h-10 w-10 rounded-full bg-slate-700'></span>
      </div>
    </div>
  )
}

export default Loading;