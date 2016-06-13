# three.Scene

Creates a new [THREE.Scene](http://threejs.org/docs/#Reference/Objects/Scene) and renders it on every call to `update` using the current renderer and camera.

Typical usage:

    [ [three.WebGLRenderer](three.WebGLRenderer.md) ]
    [ [lucy.Animate](lucy.Animate.md) ]
    [ [three.Scene](lucy.Scene.md) ]
    [ [three.Mesh](three.Mesh) ]

[source](three.Scene.ts)

## Provide

* object3D: [THREE.Scene](http://threejs.org/docs/#Reference/Objects/Scene) as `THREE.Object3D`

## Expect

* renderer: [THREE.WebGLRenderer](http://threejs.org/docs/#Reference/Renderers/WebGLRenderer)
* camera: [THREE.Camera](http://threejs.org/docs/#Reference/Cameras/Camera)

## Meta

    author: Gaspard Bucher <gaspard@lucidogen.io>
    tags: 3D, three.js, object3D, scene
