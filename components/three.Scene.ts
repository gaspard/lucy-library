import { lucy } from '../types/lucy'
let render, camera, childrenUpdate, object3D

export const init: lucy.Init =
( { context, cache, require, children } ) => {
  render = context.renderer.render
  camera = context.camera
  childrenUpdate = children.all

  const THREE = require ( 'THREE' )
  if ( !cache.object3D ) {
    cache.object3D = new THREE.Scene ()
  }

  object3D = cache.object3D
  return { object3D }
}

export const update: lucy.Update = () => {
  childrenUpdate ()
  render ( object3D, camera )
}

export const meta: lucy.Meta =
{ description: "Prepare and render a 3D rendering scene."
, tags: [ '3D' , 'three.js', 'object3D', 'scene' ]
, version: '1.0'
, expect:  { renderer: 'THREE.WebGLRenderer'
           , camera: 'THREE.Camera'
           }
, provide: { object3D: 'THREE.Object3D' }
}
