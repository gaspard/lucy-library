let loop

export const init =
( { cache } ) => {
  
  cache.animate = () => {
    requestAnimationFrame ( () => cache.animate () )
    if ( loop ) {
      loop ( Date.now () - cache.start )
    }
  }
  
  if ( !cache.start ) {
    cache.start = Date.now ()
    cache.animate ()
  }
}

export const render =
( ctx, child ) => {
  loop = ( time ) => {
    // TODO: this is where we would deal with play,
    // pause, stop, etc.
  	child ( ctx.set ( { time } )
  }
}