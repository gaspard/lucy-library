# Block

The 'block' is the smallest processing unit available. It consists of a main source file written in Javascript or Typescript. The blocks in the official library are in the public domain.

A block is like a small module and can export the following:

* [init](init.md) An initialization function used for processing context setup. The init function handles the structural part of the processing. For example, it is in this function that you create and attach a 3D object in a scene graph.

* [update](update.md) A function called by some ancestor. This can be used to handle dynamic transformations such as 3D object position updates, user interaction, etc. By passing arguments and using the return value, this can also be used for more functional programming operations (such as easing, mapping, etc).

* [meta](meta.md) An object containing information such as description, tags, version and type information. The type information is used to help end users create valid and bug-free graphs.

# Writing a block

When creating a new block, here are some of the questions that help make the proper design decisions:

1. Will this block need to update something on every animation frame or does this only happen during setup ?

2. If this block changes the context, what does it expect from the ancestors ? What does it provide ? How can it behave well with multiple `init` calls ?

3. Should this block revert some state changes when `detached` ?

4. If this block produces a value, can this value be scaled to `[0,1]` in order to play nicely with others ?

5. If this block needs to explicitly call children, what is the simplest interface possible (in order to allow as many types of children) ?

Once these questions are clarified, the first step is to take a similar block (or your own default block) and start writing the required functions and meta information. Here is the detailed documentation on writing `three.Mesh`:

Regarding the questions above, our object:

1. The block does a fixed change to the scene graph. It does not need to `update`.

2. It changes the `THREE.Object3D` context by adding itself to the parent. It provides itself as new `THREE.Object3D` context. It should store the mesh in the `cache` so that it does not create new objects on every `init` call.

3. It should remove itself from the parent when `detached`.

So now that we know that most of the block definition happens in the `init` function, let's start writing code.

### Type annotations

If we intend to publish the block in the official library, we have to type check it. Note that this does not impact on performance since it is only done once when the object is added to the library and the source code is compiled to Javascript.

```Javascript
import { lucy } from '../types/lucy'
```

### Writing `init`

We declare the function as exported and const. We also add the `lucy.Init` type annotation. Note that we use ES2015 arrow function notation because `this` is meaningless in lucidity.

We also use parameter destructuring to clearly show in the function definition what we will be using.

```Javascript
export const init: lucy.Init =
( { context, require, cache, detached } ) => {
```

The next step is to check if the block is already initialized by looking at the cache.

```Javascript
  if ( !cache.object3d ) {
```

If the cache does not contain the key we chose for this task, we start building our mesh. We use the `require` provided by the helpers object to graph three.js:

```Javascript
    const THREE = require ( 'THREE' )
```

We then create our default mesh and write it to the cache:

```Javascript
    const dim = 1
    const geometry = new THREE.BoxGeometry ( dim, dim, dim )
    const material = new THREE.MeshPhongMaterial
    ( { color: 0x156289
      , emissive: 0x072534
      , side: THREE.DoubleSide
      , shading: THREE.FlatShading
      }
    )

    cache.object3d = new THREE.Mesh ( geometry, material )
```

The final step is to add our newly created mesh to the current `object3d` context. Note that contextual objects should be all lowercase as convention (same as tags). Once the object is added, we are done with the "execute only once" operation and we close the semicolon. We then capture the value in the cache in a variable for the next operations to make the code more readable.

```Javascript
    context.object3d.add ( cache.object3d )
  }
  // cache.object3D is now always set, either from a previous `init` call
  // or from what we have just done now. Let's save the value in a variable.
  const object3d = cache.object3d
```

### Hanlding detached

We want to revert what we just did in case the node representing this block is detached from the graph. When this happens the boolean value `detached` (that we got from the helpers in the function argument) is set to `true`:

```Javascript
  if ( detached ) {
    // three.js sets .parent in the child when the child is added.
    if ( object3d.parent ) {
      // remove ourself
      object3d.parent.remove ( object3d )
    }
  }
```

### Providing new elements in the context

We can now provide our `object3d` mesh by returning it in the context change object:

```Javascript
  return { object3d }
}
```

### Writing the `meta` information

We now need to provide some type information on our object as well as some tags that will help our users find and use it. For this object to work, the only required fields are `expect` and `provide`. The other fields are needed when/if this object is added to the library.

The fields in `provide` should match what our init function returns. The `expect` field should list all elements required in the context or the object could break when moved or when the context is changed.

```Javascript
export const meta: lucy.Meta =
{ description: "Create a 3D cube."
, tags: [ '3D', 'three.js', 'object3d', 'mesh', 'cube' ]
, author: 'Gaspard Bucher <gaspard@lucidity.io>'
, origin: 'lucidity.io/three.Mesh'
, version: '1.0'
, expect:  { object3d: 'THREE.Object3D' }
, provide: { object3d: 'THREE.Object3D' }
}
```
