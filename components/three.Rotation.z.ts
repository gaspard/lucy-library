import { Init, Update, Meta } from 'lucidity'
let rotation, value

export const init: Init =
( { context, children, cache, detached } ) => {
  value = children [ 0 ]
  rotation = context.object3d.rotation
  if ( detached ) {
    rotation.z = 0
  }
}

const PI2 = Math.PI * 2

export const update: Update =
() => {
  rotation.z = value () * PI2
}

export const meta: Meta =
{ description: "Rotate the current 3D object along z (front) axis."
, tags: [ '3D' , 'three.js', 'rotation', 'z' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Rotation.z'
, version: '1.0'
, expect: { object3d: 'THREE.Object3D' }
, children: [ '(): number' ]
}
