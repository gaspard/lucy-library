# Block

The 'block' is the smallest processing unit available. It consists of a main source file written in Javascript or Typescript. The blocks in the official library are in the public domain. There is no `author` field on the meta information of a block because these small scripts are meant to be modified by the users and we do not want the original author to be linked to all these derivative works. To know the original author of a block, please consult the documentation for each object, like this [lucy.Animate](../components/lucy.Animate.md).

A block is considered like a small module and can export the following:

* [init](init.md) An initialization function used for processing context setup. The init function handles the structural part of the processing. For example, it is in this function that you create and attach a 3D object in a scene graph.

* [update](update.md) A function called by the parent. This can be used to handles dynamic transformations such as 3D object position updates, user interaction, etc. By passing arguments and using the return value, this can also be used for more functional programming operations (such as easing, mapping, etc).

* [meta](meta.md) An object containing information such as description, tags, version and type information. The type information is used to help end users create valid and bug-free graphs.
