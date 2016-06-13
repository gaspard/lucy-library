# `meta` export

You can (and should) export a meta object [blocks](block.md) to add type checking, a description and revision/author information. Here is an example of a `meta` export (from [three.Scene](../components/three.Scene.ts#L22)):

```Javascript
export const meta: lucy.Meta =
{ description: "Prepare and render a 3D rendering scene."
, tags: [ '3D' , 'three.js', 'object3D', 'scene' ]
, version: '1.0'
, expect:  { renderer: 'THREE.WebGLRenderer' }
, provide: { object3D: 'THREE.Object3D' }
}
```

## Mandatory fields when added to the library

* **description**: This is shown while searching the library.

* **tags**: This helps users find components in the library along with the description and provided context. All tags should be in lowercase.

* **version**: A [semver](http://semver.org) version number to help trace a block's version in case of bugs. This is important to help trace bugs in complex script.

## Type checking

This is the most important feature to help produce valid and bug-free code when composing a graph. These fields help assert that the required types are available before calling the [init](init.md) or [render](render.md) functions.

Note that these type definitions could be used to create Typescript interface definitions so that exported code can be statically type checked.

The fields for type definition are **expect**, **provide**, **render** and **children**:

### expect, provide

The optional **expect** field defines the requirements concerning the context of the block. If one of these requirements is not fulfilled by a parent node, the `init` function is not called.

The optional **provide** field defines what the `init` function returns and how this augments the context for children.

```Javascript
export const meta =
{ expect:  { renderer: 'THREE.WebGLRenderer' }
, provide: { object3D: 'THREE.Object3D' }
}
```

### update

For the render function, the **render** field informs on the type of the render function's arguments and return value by providing a string with the same notation as the one used in Typescript for function interface.

Here are some examples:

A function with no return value: `(a: number)`

A function with a return value but no argument: `(): number`

A function to add two numbers: `(a: number, b: number): number`

```Javascript
export const render = ( a, b ) => {
  return a + b
}
export const meta =
{ render: '(a: number, b: number ): number'
}
```

### children

This sets the type of the block's children update functions in the same way as **update**, but with one string per child. The children's functions are accessed through the [children](helper.md#children) helper in the [init](init.md) function.

Calls to the `update` function is done in two ways:

1. Parent is in charge: the parent has a `children` meta field. In this case, we use the type definition to properly connect children and it is up to the parent to call the children's functions when required. If this field has the special value `'all'` (a string), we do not check the types of the children and the parent is expected to call the special helper function `all`.

2. Parent is not in charge: the parent does not have a `children` meta field. In this case the children's update function is collected and passed to the first parent with a `children: 'all'` meta setting.

Note that the `all` function only works on `update` with the void signature `()`. With any other signature, a child would be considered invalid because incompatible with its parent and would not be called.


### children and slot count

The existence of `children` type information in a block changes the way a node behaves in a graph regarding slots. Without children typing in the corresponding block, a node can have any number of slots and free slots are automatically added. With type definition, the node has exactly `children.length` slots.
