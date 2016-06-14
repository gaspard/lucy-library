# lucy-library
[![travis][travis-image]][travis-url]

[travis-image]: https://img.shields.io/travis/lucidogen/lucy-library/master.svg
[travis-url]: https://travis-ci.org/lucidogen/lucy-library

Official components and documentation for [Lucidity](http://lucidity.io) a JS/Typescript programming environment to create interactive applications for live arts (vj, mapping, etc).

* [block](./documentation/block.md) documentation.
* [components](./components) documentation.

## Vocabulary

A **block** is the simplest processing unit (think script). It contains functions and meta information such as types used to type check a graph before running it.

A **node** is the representation of a block inside a graph. It simply contains who the parent is and which children nodes are connected. The **node** contains a reference to a single block.

A **graph** is a combination of nodes.

A **component** is either what a user can save to the library. It can be a single **block** or a **graph** containing many blocks and nodes.

## Contributing

To make sure the blocks contributed to the library are as useful as possible, we ask that every block satisfies the following requirements:

* It is used in at least one markdown documentation file describing a task.
* It contains type annotations on all provided fields and exported methods. This helps us type check the library before releasing new versions.
* It has the mandatory [meta](documentation/meta.md) fields.

Some hints on choosing `tags`: start with the most generic tags (like '3D') and move to the more specific ones (like 'cube'). Tags for the provided context are automatically added.

For example, here are the tags for [three.Mesh](./components/three.Mesh.md):

```Javascript
[ '3D', 'three.js', 'object3d', 'mesh', 'cube' ]
```
