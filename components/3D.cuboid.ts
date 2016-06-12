/* This block prepares a 3D rendering scene. Context:
 * 
 *   * mesh     THREE.BoxGeometry
 */
let mesh

export const init =
( { cache, require } ) => {
  if ( !cache.mesh ) {
    const THREE = require ( 'THREE' )
    const geometry = new THREE.BoxGeometry
    ( 200, 200, 200 )
    const material = new THREE.MeshBasicMaterial
    ( { color: 0xff0000, wireframe: true } )
    
    cache.mesh = new THREE.Mesh ( geometry, material )
  }
  mesh = cache.mesh
}

export const render =
( ctx, geom, mat ) => {
  if ( ctx.scene ) {
    // FIXME: how to prevent adding mesh more then
    // once ?
    ctx.scene.add ( mesh )
  }
  const g = geom ()
  comst m = mat ()
  if ( g ) {
    mesh.geometry = g
  }
  if ( m ) {
    mesh.material = m
  }
}
