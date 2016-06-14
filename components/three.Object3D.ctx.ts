import { Init, Update, Meta } from '../types/lucidity'
let object3d

export const init: Init =
( { context, children, cache } ) => {
  object3d = context.object3d
}

const PI2 = Math.PI * 2

export const update: Update =
() => {

}

export const meta: Meta =
{ description: "Starting object to act on three.Object3D context."
, tags: [ '3d' , 'three.js', 'object3d', 'ctx' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Object3D.ctx'
, version: '1.0'
, expect: { object3d: 'THREE.Object3D' }
}
