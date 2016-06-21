import { Init, Update, Meta, Screen, Time } from 'lucidity'
let time: Time
let uniforms

export const init: Init =
( { context, require, asset, cache, detached } ) => {
  const THREE = require ( 'THREE' )
  if ( !cache.material ) {
    const uniforms: any = cache.uniforms = {}
    uniforms.time = { value: 0.0 }
    uniforms.screen = { value: new THREE.Vector2 ( 0, 0 ) }
    cache.material = new THREE.ShaderMaterial
    ( { uniforms
      , vertexShader: ''
      , fragmentShader: ''
      }
    )

    cache.prevmat = context.object3d.material
    context.object3d.material = cache.material
  }
  // Captured for update loop
  time = context.time
  uniforms = cache.uniforms

  const material = cache.material

  asset.source ( 'vert.glsl', ( s ) => {
    material.vertexShader = s
    material.needsUpdate = true
  })

  asset.source ( 'frag.glsl', ( s ) => {
    material.fragmentShader = s
    material.needsUpdate = true
  })

  const screen: Screen = context.screen
  uniforms.screen.value = new THREE.Vector2 ( screen.width, screen.height )

  if ( detached ) {
    context.object3d.material = cache.prevmat
  }
}

export const update: Update =
() => {
  uniforms.time.value = time.now
}

export const meta: Meta =
{ description: "Set a shader material on the current object3d."
, tags: [ '3D' , 'three.js', 'material', 'shader' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Material'
, version: '1.0'
, expect:
  { object3d: 'THREE.Object3D'
  , time: 'lucidity.Time'
  , screen: 'lucidity.Screen'
  }
}

const VERT = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const FRAG = `
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  gl_FragColor = color;
}
`
