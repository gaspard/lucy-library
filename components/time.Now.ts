import { Init, Update, Meta } from '../types/lucidity'
let time

export const init: Init =
( { context } ) => {
  time = context.time
}

export const update: Update =
(): number => {
  return time.now
}

export const meta: Meta =
{ description: "Return the current animation time in seconds."
, tags: [ 'animation', 'time', 'now' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/time.Now'
, version: '1.0'
, expect: { time: 'animation.Time' }
, update: '(): number'
}
