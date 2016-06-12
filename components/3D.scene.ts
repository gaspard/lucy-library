let render, camera

export const init =
( ctx, { cache, require } ) => {
  render = ctx.renderer.render
  camera = ctx.camera

  const THREE = require ( 'THREE' )
  if ( !cache.object3D ) {
    cache.object3D = new THREE.Scene ()
  }
  const object3D = cache.object3D
  return { object3D }
}

export const render =
( ctx, child ) => {
  child ()
  renderer.render ( object3D, camera )
}

export const meta =
{ description: "Prepare and render a 3D rendering scene."
, init: [ { renderer: 'THREE.WebGLRenderer' }
        , { object3D: 'THREE.Object3D' }
        ]
}
