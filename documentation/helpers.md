# Helpers

The helper object is available in the [init](init.md) function inside a [block](block.md). It contains functions and flags to help with initialization. Here is a complete (alphabetically ordered) list of the available helpers:

## context

The current node's context, with everything from the main context and what the ancestors have added by returning objects in their [init](init.md) functions. For example:

```ascii
[ main        ]
[ three.WebGLRenderer ]
[ animate   ]
[ three.Scene  ]
[ three.Mesh ]
```

In the graph above, if [three.WebGLRenderer](../components/three.WebGLRenderer) init returns the renderer, like this:

```Javascript
export const init =
( { cache, require, detached } ) => {
  const THREE = require ( 'three' )
  if ( !cache.renderer ) {
    cache.renderer = //... create some renderer
  }
  return { renderer: cache.renderer }
}
```

The [three.Scene](../components/three.Scene.ts#L5) will have access to it in its `init` function:

```Javascript
let renderer, camera, object3d
export const init =
( { context, cache, require } ) => {
  renderer = context.renderer
  camera = context.camera

  const THREE = require ( 'THREE' )
  if ( !cache.object3d ) {
    cache.object3d = new THREE.Scene ()
  }
  object3d = cache.object3d
  return { object3d }
}
```

We use special fields in [meta](meta.md) to ensure that what a child node needs in this context is actually present when the `init` function is run.

## cache

An object specific to this node to store data between code reloads. This must be used to avoid re-creating objects on every init call.

Example: [3D.cuboid](../components/3D.cuboid.ts#L3)

## detached

A boolean value that is set to `true` when the node is being detached (removed) from the graph. This is what we use to cleanup before leaving. For example, a 3D object can use this information to remove itself from the parent. On 'detach', nodes are called from the bottom to top (child then parent).

Example: [3D.cuboid](../components/3D.cuboid.ts#L15)

## children

An array with the update functions of the connected children.

Make sure to declare all required children in [meta](meta.md#children) to ensure this array contains the correct functions. Note that these functions should not be called from within the `init` function because initialization goes from top to bottom and this might call an uninitialized child's update function.

### children.all

This returns a function that calls all the update functions of descendants whose parents do not manage the updates themselves. A parent manages his children updates when he has a `children` meta field. See [animation.Loop][../components/animation.Loop.ts] for an example.

## require

This works the same as Node.js `require` function and lets you load external libraries. If the library is not available in memory, this function call will interrupt the init function and ask the user for the missing library.

Example: [3D.renderer](../components/3D.renderer.ts#L3)
