import { Init, Update, Meta } from '../types/lucidity'
import { State } from '../types/midi'
let velocities
const channel = 1
const note = 60

export const init: Init =
( { context } ) => {
  const midi: State = context.midi
  velocities = midi.note [ channel ]
}


export const update: Update =
(): number => {
  return velocities [ note ] / 127
}

export const meta: Meta =
{ description: "Return the current velocity from 0-1 of a midi note."
, tags: [ 'midi', 'note', 'velocity' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/mid.Note'
, version: '1.0'
, expect: { time: 'midi.State' }
, update: '(): number'
}
