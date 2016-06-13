import { lucy } from '../types/lucy'

export const init: lucy.Init =
( { context, require, cache, detached } ) => {
  if ( !cache.object3D ) {
    const THREE = require ( 'THREE' )
    const geometry = new THREE.BoxGeometry
    ( 200, 200, 200 )
    const material = new THREE.MeshBasicMaterial
    ( { color: 0xff0000, wireframe: true } )

    cache.object3D = new THREE.Mesh ( geometry, material )
    context.object3D.add ( cache.object3D )
  }

  const object3D = cache.object3D
  if ( detached ) {
    if ( object3D.parent ) {
      object3D.parent.remove ( object3D )
    }
  }
  return { object3D }
}

export const meta: lucy.Meta =
{ description: "Create a 3D cube."
, tags: [ '3D', 'three.js', 'object3D', 'mesh', 'cube' ]
, version: '1.0'
, expect:  { object3D: 'THREE.Object3D' }
, provide: { object3D: 'THREE.Object3D' }
}
