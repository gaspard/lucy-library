The 'block' is the smallest processing unit available. It consists of a main
source file written in Javascript or Typescript. This file is considered like a
small module and can export the following:

* **init** An initialization function used for processing context setup. The
  init function handles the structural part of the processing. For example, it
  is in this function that you create and attach a 3D object in a scene graph.

* **render** A rendering function called by the parent during processing. This
  function typically handles dynamic transformations such as 3D object position
  updates, user interaction, etc.

* **meta** An object containing information such as author, description and
  type information on `init` and `render`. The type information is used to
  help end users create valid and bug-free rendering graphs.

## `init` function

This function is called whenever the structure of the graph or the source code
of a block changes. It takes two arguments: a context and helpers:

```Javascript
export const init =
( ctx, { cache, require, detached } ) => {
  // ...
  return { mynewthing }
}
```

The **context** (`ctx` in the example) is an object containing the 'main'
context and everything that the ancestors of the current node have added (the
node is the position of the block in the processing graph). For example:

```ascii
[ main        ]
[ 3D.renderer ]
[ animate   ]
[ 3D.scene  ]
[ 3D.cuboid ]
```

In the graph above, if [3D.renderer](../components/3D.renderer) init returns the renderer, like this:

```Javascript
export const init =
( ctx, { cache, require, detached } ) => {
  const THREE = require ( 'three' )
  if ( !cache.renderer ) {
    cache.renderer = //... create some renderer
  }
  return { renderer: cache.renderer }
}
```

The [3D.scene](../components/3D.scene.ts#L9) will have access to it in its `init` function:

```Javascript
export const init =
( ctx, { cache, require } ) => {
  renderer = ctx.renderer
  camera = ctx.camera

  const THREE = require ( 'THREE' )
  if ( !cache.object3D ) {
    cache.object3D = new THREE.Scene ()
  }
  object3D = cache.object3D
  return { object3D }
}
```

As all this can create lots of errors if some missing element in the parent
hierarchy is used by a child, we have type checking with the **meta** exported
object (see bellow).

The **helpers** object contains the following elements:

* **cache** An object specific to this node to store data between code reloads.
  This must be used to avoid re-creating objects on every init call.

* **require** This works the same as node.js `require` function and lets you
  load external libraries. If the library is not available in memory, this
  function call will interrupt the init function and ask the user for the
  missing library.

* **detached** A boolean value that is set to `true` when the node is being
  detached (removed) from the graph. This is what we use to cleanup before
  leaving. For example, a 3D object can use this information to remove itself
  from the parent. On 'detach', nodes are called from the bottom to top (child
  then parent).

## `render` function

TODO
