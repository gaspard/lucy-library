# Block

The 'block' is the smallest processing unit available. It consists of a main
source file written in Javascript or Typescript. This file is considered like a
small module and can export the following:

* [init](./init.md) An initialization function used for processing context setup. The
  init function handles the structural part of the processing. For example, it
  is in this function that you create and attach a 3D object in a scene graph.

* [render](./render.md) A rendering function called by the parent during processing. This
  function typically handles dynamic transformations such as 3D object position
  updates, user interaction, etc.

* [meta](./meta.md) An object containing information such as author, description and
  type information on `init` and `render`. The type information is used to
  help end users create valid and bug-free rendering graphs.
