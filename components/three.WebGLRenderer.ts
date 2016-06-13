import { lucy } from '../types/lucy'
import { lucy as ls } from '../types/lucy.Screen'

export const init: lucy.Init =
( { cache, require, detached } ) => {
  const THREE = require ( 'THREE' )
  const container = document.getElementById ( 'screen' )
  const screen: ls.Screen = container.getBoundingClientRect ()

  if ( !cache.renderer ) {
    const renderer = new THREE.WebGLRenderer ()
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

export const meta: lucy.Meta =
{ description: "Prepare the rendering context for THREE.js."
, tags: [ '3D', 'three.js', 'webgl' ]
, version: '1.0'
, provide: { renderer: 'THREE.WebGLRenderer'
           , camera: 'THREE.Camera'
           , screen: 'lucy.Screen'
           }
}
