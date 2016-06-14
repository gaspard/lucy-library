# `update` function

This function is called from the parent's `update` functions either directly or by using [children.all](meta.md#children). The parameters and return values must match those declared in [meta](meta.md#update). For example:

```ascii
[ parent        ]
[ value ][ ease ]
```

**ease**

This could be the child's update implementing an easing function:

```Javascript
const HALF_PI = Math.PI / 2
const PI = Math.PI

export const update =
( v: number, pcent: number ): number => {
  return Math.sin ( pcent * PI - HALF_PI ) * v
}
export const meta =
{ description: 'Ease value with Math.sin'
, tags: [ 'ease', 'sin' ]
, update: '(v:number, pcent:number): number'
}
```

And this could be a parent using it:

**parent**

```Javascript
let value, ease
export const init =
( { children } ) => {
  value = children [ 0 ]
  ease  = children [ 1 ]
}

const scale = 128
export const update =
(): number => {
  const v = value ()
  // note that v/scale could be something where we ease with time or by some other
  // means.
  return ease ( v, v / scale )
}

export const meta =
{ update: '(): number'
, children: [ '(): number'
            , '(v:number, pcent:number): number'
            ]
}
```

## No update function

When a block does not have an update function, it's children's update can still be reached if an ancestor calls `children.all`. In this case the graph is parsed (once during compilation) to gather the update functions of the children and they are all called, from left to right, depth-first.

See [animation.Loop](../components/animation.Loop.ts) for such an example. Note that the gathering of children functions stops whenever a block has `children` type declarations (see [meta.children](meta.md#children)) in which case we consider that this block handles the calls to it's children by itself.

For example (all blocks with an `update` function have a `*`):

```ascii
[ animation.Loop *          ]
[ three.Scene             ]
[ some obj   ][ some obj  ]
[ rotate1 *  ][ rotate2 * ]
[ position * ]
```

When animation.Loop calls `children.all ()`, this will run the following functions:

* position, rotate1, rotate2

# Children `stealing`

When a grand-parent expects a child in the first slot and this child has no `update` type, the grand-parent looks further down until it finds a first child with an `update` type. It then uses this as if it where it's own child.

This might seem complicated but it simply lets you stack actions depending on the same values like this:

```lucidity
[ three.WebGLRenderer ]
[ animation.Loop   ]
[ three.Scene    ]
[ three.Mesh     ]
[ three.Rotate.y ]
[ three.Rotate.x ]
[ time.Now       ]
```

In this example, `time.Now` is used for both `three.Rotate.y` and `three.Rotate.x`.
