# Helpers

The helper object is available in the [init](init.md) function inside a [block](block.md). It contains functions and flags to help with initialization. Here is a complete (alphabetically ordered) list of the available helpers:

As convention, the fields in `helpers` destructuring should match the order listed here.

## context

The current node's context, with everything from the main context and what the ancestors have added by returning objects in their [init](init.md) functions. For example:

```ascii
[ main                ]
[ three.WebGLRenderer ]
[ animation.Loop ]
[ three.Scene ]
[ three.Mesh ]
```

In the graph above, if [three.WebGLRenderer](../components/three.WebGLRenderer.ts) init returns the renderer, like this:

```Javascript
export const init =
( { require, cache, detached } ) => {
  // ...
  return { renderer: cache.renderer }
}
```

The [three.Scene](../components/three.Scene.ts) will have access to it in its `init` function like this:

```Javascript
let renderer, camera, object3d
export const init =
( { context, require, cache } ) => {
  renderer = context.renderer
  camera = context.camera
  // ...
}
```

We use [meta.expect](meta.md#expect) and [meta.provide](meta.md#provide) to ensure that what a child node needs in his context is actually present when the `init` function is run.

## require

This works the same as Node.js `require` function and lets you load external libraries. If the library is not available in memory, this function call will interrupt the init function and ask the user for the missing library.

Example: [3D.renderer](../components/3D.renderer.ts#L3)

## children

An array with the update functions of the connected children.

Make sure to declare all required children in [meta](meta.md#children) to ensure this array contains the correct functions. Note that these functions should not be called from within the `init` function because initialization goes from top to bottom and this might call an uninitialized child's update function.

### children.all

This returns a function that calls all the update functions of descendants whose parents do not manage the updates themselves. A parent manages his children updates when he has a `children` meta field. See [animation.Loop][../components/animation.Loop.ts] for an example.

## cache

An object specific to this node to store data between code reloads. This must be used to avoid re-creating objects on every init call.

Example: [three.Mesh](../components/three.Mesh.ts)

## detached

A boolean value that is set to `true` when the node is being detached (removed) from the graph. This is what we use to cleanup before leaving. For example, a 3D object can use this information to remove itself from the parent. On 'detach', nodes are called from the bottom to top (child then parent).

Example: [three.Mesh](../components/three.Mesh.ts)
