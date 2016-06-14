import { lucy } from '../types/lucy'
let time

export const init: lucy.Init =
( { context } ) => {
  time = context.time
}

export const update: lucy.Update =
(): number => {
  return time.now
}

export const meta: lucy.Meta =
{ description: "Return the current animation time in seconds."
, tags: [ 'animation', 'time', 'now' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/time.Now'
, version: '1.0'
, expect: { time: 'animation.Time' }
, update: '(): number'
}
