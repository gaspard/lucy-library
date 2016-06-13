# `init` function

This function is called whenever the structure of the graph or the source code of a [block](block.md) changes. It takes one argument a helpers object and must return either nothing or some new elements provided for the children's context. For example:

```Javascript
export const init =
( { context, cache, require, detached } ) => {
  // ...
  return { mynewthing }
}
```

The [helpers](helpers.md) object contains the current node's context and elements to help with initialization and setup. Please see follow the link for a complete list of helpers and details on how they work.
