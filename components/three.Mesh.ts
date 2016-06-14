import { Init, Update, Meta } from '../types/lucidity'

export const init: Init =
( { context, require, cache, detached } ) => {
  if ( !cache.object3d ) {
    const THREE = require ( 'THREE' )
    const dim = 1
    const geometry = new THREE.BoxGeometry ( dim, dim, dim )
    const material = new THREE.MeshPhongMaterial
    ( { color: 0x156289
      , emissive: 0x072534
      , side: THREE.DoubleSide
      , shading: THREE.FlatShading
      }
    )

    cache.object3d = new THREE.Mesh ( geometry, material )
    context.object3d.add ( cache.object3d )
  }

  const object3d = cache.object3d
  if ( detached ) {
    if ( object3d.parent ) {
      object3d.parent.remove ( object3d )
    }
  }
  return { object3d }
}

export const meta: Meta =
{ description: "Create a 3D cube."
, tags: [ '3D', 'three.js', 'object3d', 'mesh', 'cube' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Mesh'
, version: '1.0'
, expect:  { object3d: 'THREE.Object3D' }
, provide: { object3d: 'THREE.Object3D' }
}
