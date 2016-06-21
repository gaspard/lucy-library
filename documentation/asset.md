# Asset helper

During the init phase, blocks can query for assets. All methods provide a callback
that is called whenever the asset is updated.

Here is an example where a script imports the sources of a fragment shader:

```Javascript
export const init =
( { context, asset } ) => {
  // ...
  const object3d = cache.object3d

  asset.source ( 'frag.glsl', ( s ) => {
    object3d.material.fragmentShader = s
    object3d.material.needsUpdate  = true
  })
}
```

Available asset helpers:

### `asset.source ( name: string, clbk )`

Add a new source tab to the editor and get the content when it changes.
