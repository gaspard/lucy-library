import { Init, Update, Meta, Time } from 'lucidity'
let time: Time
let loop, updateChildren

export const init: Init =
( { context, children, cache } ) => {
  updateChildren = children.all

  if ( !cache.time ) {
    const time: Time =
    { now: performance.now () / 1000, dt: 0 }
    cache.time = time
    requestAnimationFrame ( () => cache.animation () )
  }
  time = cache.time

  cache.animation = () => {
    requestAnimationFrame ( () => cache.animation () )
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

export const update: Update =
() => {
  loop = () => {
    // TODO: this is where we would could deal with play,
    // pause, stop, loop, etc.
    // Or should this be done elsewhere by interfering with time ?
    updateChildren ()
  }
}

export const meta: Meta =
{ description: 'Runs the children update functions on each frame.'
, tags: [ 'animation', 'time' ]
, author: 'Gaspard Bucher <gaspard@lucidogen.io>'
, origin: 'lucidity.io/animation.Loop'
, version: '1.0'
, provide: { time: 'lucy.Time' }
, children: 'all' // special case where we handle children ourselves but do not type them.
}
