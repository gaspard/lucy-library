/* This block prepares a 3D rendering scene. Context:
 * 
 *   * scene     THREE.Scene
 */
let scene

export const init =
( { cache, require } ) => {
  if ( !cache.scene ) {
    const THREE = require ( 'THREE' )
    cache.scene = new THREE.Scene ()
  }
  scene = cache.scene
}

export const render =
( ctx, child ) => {
  child ( ctx.set ( { scene } ) )
}
