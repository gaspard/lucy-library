import { Init, Update, Meta } from 'lucidity'
let renderer, camera, childrenUpdate, object3d

export const init: Init =
( { context, require, children, cache } ) => {
  renderer = context.renderer
  camera = context.camera
  childrenUpdate = children.all

  const THREE = require ( 'THREE' )
  if ( !cache.object3d ) {
    cache.object3d = new THREE.Scene ()
  }

  object3d = cache.object3d
  return { object3d }
}

export const update: Update =
() => {
  childrenUpdate ()
  renderer.render ( object3d, camera )
}

export const meta: Meta =
{ description: "Prepare and render a 3D rendering scene."
, tags: [ '3D' , 'three.js', 'object3d', 'scene' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Scene'
, version: '1.0'
, expect:
  { renderer: 'THREE.WebGLRenderer'
  , camera: 'THREE.Camera'
  }
, provide: { object3d: 'THREE.Object3D' }
, children: 'all'
}
