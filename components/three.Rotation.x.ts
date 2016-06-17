import { Init, Update, Meta } from 'lucidity'
let rotation, value

export const init: Init =
( { context, children, cache, detached } ) => {
  value = children [ 0 ]
  rotation = context.object3d.rotation
  if ( detached ) {
    rotation.x = 0
  }
}

const PI2 = Math.PI * 2

export const update: Update =
() => {
  rotation.x = value () * PI2
}

export const meta: Meta =
{ description: "Rotate the current 3D object along x (right) axis."
, tags: [ '3D' , 'three.js', 'rotation', 'x' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Rotation.x'
, version: '1.0'
, expect: { object3d: 'THREE.Object3D' }
, children: [ '(): number' ]
}
