/* This block prepares the rendering context for
 * THREE.js based projects. Context changes:
 *
 *   * renderer  WebGLRenderer
 *   * camera    default camera at (0,0,500)
 *   * screen    screen position, width and height
 */
export const init =
( ctx, { cache, require, detached } ) => {
  const THREE = require ( 'THREE' )
  const container = document.getElementById ( 'screen' )
  const screen = container.getBoundingClientRect ()

  if (!cache.renderer) {
    renderer = new THREE.WebGLRenderer ()
    renderer.setSize ( screen.width, screen.height )
    container.appendChild ( renderer.domElement )
    cache.renderer = renderer
  }
  const renderer = cache.renderer

  if ( detached ) {
    container.removeChild ( renderer.domElement )
  }

  renderer.setSize ( screen.width, screen.height )
  const camera = new THREE.PerspectiveCamera
  ( 75, screen.width / screen.height, 1, 10000 )
  camera.position.z = 500

  return { renderer, camera, screen }
}

export const meta =
{ init: [ {}
        , { renderer: 'THREE.WebGLRenderer'
          , camera: 'THREE.Camera'
          , screen: 'screen.size'
          }
        ]
}