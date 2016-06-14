import { lucy } from '../types/lucy'
let rotation, value

export const init: lucy.Init =
( { context, cache, children } ) => {
  value = children [ 0 ]
  rotation = context.object3d.rotation
}

const PI2 = Math.PI * 2

export const update: lucy.Update =
() => {
  rotation.x = value () * PI2
}

export const meta: lucy.Meta =
{ description: "Rotate the current 3D object along x (right) axis."
, tags: [ '3D' , 'three.js', 'rotation', 'x' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Rotation.x'
, version: '1.0'
, expect: { object3d: 'THREE.Object3D' }
, children: [ '(): number' ]
}
