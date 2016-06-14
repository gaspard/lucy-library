import { lucy } from '../types/lucy'

export const update: lucy.Update =
(): number => {
  return 1
}

export const meta: lucy.Meta =
{ description: "Return a number."
, tags: [ 'constant', 'value' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/value'
, version: '1.0'
, update: '(): number'
}
