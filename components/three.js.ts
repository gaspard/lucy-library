/* This block prepares the rendering context for
 * THREE.js based projects. Context changes:
 * 
 *   * renderer  WebGLRenderer
 *   * camera    default camera at (0,0,500)
 *   * screen    screen position, width and height
 */
let renderer
let camera
let screen

export const init =
( { cache, require } ) => {
  // External libraries are required like this.
  const THREE = require ( 'THREE' )
  const container = document.getElementById ( 'screen' )
  screen = container.getBoundingClientRect ()
  
  if (!cache.renderer) {
    renderer = new THREE.WebGLRenderer ()
    renderer.setSize ( screen.width, screen.height )
    container.appendChild ( renderer.domElement )
    cache.renderer = renderer
  }
  renderer = cache.renderer
  renderer.setSize ( screen.width, screen.height )
  camera = new THREE.PerspectiveCamera
  ( 75, size.width / size.height, 1, 10000 )
  camera.position.z = 500
  
  // We want notifications on screen changes
  return { screen: true }
}

export const render =
( ctx, child ) => {
  const c = ctx.set ( { renderer, camera, screen } )
  child ( c )
}
