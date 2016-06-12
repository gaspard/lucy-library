/* This block prepares a 3D rendering scene. Context:
 *
 *   * object3D     THREE.Scene
 */
let object3D, renderer, camera

export const init =
( ctx, { cache, require } ) => {
  renderer = ctx.renderer
  camera = ctx.camera

  const THREE = require ( 'THREE' )
  if ( !cache.object3D ) {
    cache.object3D = new THREE.Scene ()
  }
  object3D = cache.object3D
  return { object3D }
}

export const render =
( ctx, child ) => {
  child ()
  renderer.render ( object3D, camera )
}

export const meta =
{ init: [ { renderer: 'THREE.WebGLRenderer' }
        , { object3D: 'THREE.Object3D' }
        ]
}
