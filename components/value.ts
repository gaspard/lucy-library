import { Init, Update, Meta } from 'lucidity'

export const update: Update =
(): number => {
  return 1
}

export const meta: Meta =
{ description: "Return a number."
, tags: [ 'constant', 'value' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/value'
, version: '1.0'
, update: '(): number'
}
