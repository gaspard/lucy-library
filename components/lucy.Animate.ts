import { lucy } from '../types/lucy'
let time: lucy.Time
let loop, updateChildren

export const init: lucy.Init =
( { cache, children } ) => {
  updateChildren = children.all

  if ( !cache.time ) {
    const time: lucy.Time =
    { now: performance.now () / 1000, dt: 0 }
    cache.time = time
    requestAnimationFrame ( () => cache.animate () )
  }
  time = cache.time

  cache.animate = () => {
    requestAnimationFrame ( () => cache.animate () )
    if ( loop ) {
      // Monotonic clock in seconds
      const now = performance.now () / 1000
      time.dt = now - time.now
      time.now = now
      loop ()
    }
  }
  return { time }
}

export const update: lucy.Update =
() => {
  loop = () => {
    // TODO: this is where we would could deal with play,
    // pause, stop, loop, etc.
    // Or should this be done elsewhere by interfering with time ?
    updateChildren ()
  }
}

export const meta: lucy.Meta =
{ description: "Runs the children's update functions on each frame."
, tags: [ 'animation', 'time' ]
, version: '1.0'
, provide: { time: 'lucy.Time'
           }
, update: '()'
, children: 'any' // special case where we handle children ourselves but do not type them.
}
