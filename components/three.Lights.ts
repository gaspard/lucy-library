import { Init, Update, Meta } from 'lucidity'

export const init: Init =
( { context, require, cache, detached } ) => {
  if ( !cache.object3d ) {
    const THREE = require ( 'THREE' )
    let lights = new THREE.Object3D ()
    cache.object3d = lights
    let l
    // Sky light
    l = new THREE.PointLight ( 0xffffff, 1, 0 )
    l.position.set ( 0, 20, 0 )
    lights.add ( l )
    // Sun light
    l = new THREE.PointLight ( 0xffffff, 1, 0 )
    l.position.set ( 10, 20, 10 )
    lights.add ( l )
    // Back light
    l = new THREE.PointLight ( 0xffffff, 1, 0 )
    l.position.set ( -10, -20, -10 )
    lights.add ( l )
    
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
{ description: "Add some nice default lights."
, tags: [ '3D', 'three.js', 'object3d', 'light', 'default' ]
, author: 'Gaspard Bucher <gaspard@lucidogen.io>'
, origin: 'lucidity.io/three.Lights'
, version: '1.0'
, expect:  { object3d: 'THREE.Object3D' }
, provide: { object3d: 'THREE.Object3D' }
}
