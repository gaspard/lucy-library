import { Init, Update, Meta, Screen } from 'lucidity'

export const init: Init =
( { require, cache, detached } ) => {
  const THREE = require ( 'THREE' )
  const container = document.getElementById ( 'screen' )
  const screen: Screen = container.getBoundingClientRect ()

  if ( !cache.renderer ) {
    const renderer = new THREE.WebGLRenderer ( { antialias: true } )
    renderer.setPixelRatio ( window.devicePixelRatio )
    renderer.setSize ( screen.width, screen.height )
    container.appendChild ( renderer.domElement )
    cache.renderer = renderer

    cache.camera = new THREE.PerspectiveCamera
    ( 60, screen.width / screen.height, 0.1, 100 )
  }

  const renderer = cache.renderer
  const camera   = cache.camera

  if ( detached ) {
    container.removeChild ( renderer.domElement )
  }

  camera.position.z = 2
  camera.aspect = screen.width / screen.height
  camera.updateProjectionMatrix ()

  renderer.setSize ( screen.width, screen.height )

  return { renderer, camera, screen }
}

export const meta: Meta =
{ description: "Prepare the rendering context for THREE.js."
, tags: [ '3D', 'three.js', 'webgl' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.WebGLRenderer'
, version: '1.0'
, provide:
  { renderer: 'THREE.WebGLRenderer'
  , camera: 'THREE.Camera'
  , screen: 'lucidity.Screen'
  }
}
