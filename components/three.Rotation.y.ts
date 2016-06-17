import { Init, Update, Meta } from 'lucidity'
let rotation, value

export const init: Init =
( { context, children, cache, detached } ) => {
  value = children [ 0 ]
  rotation = context.object3d.rotation
  if ( detached ) {
    rotation.y = 0
  }
}

const PI2 = Math.PI * 2

export const update: Update =
() => {
  rotation.y = value () * PI2
}

export const meta: Meta =
{ description: "Rotate the current 3D object along y (up) axis."
, tags: [ '3D' , 'three.js', 'rotation', 'z' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Rotation.y'
, version: '1.0'
, expect: { object3d: 'THREE.Object3D' }
, children: [ '(): number' ]
}
