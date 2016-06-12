# Helpers

The helper object is available in the [init](./init.md) function inside a
[block](./block.md). It contains functions and flags to help with
initialization. Here is a complete (alphabetically ordered) list of the
available helpers:

## cache

An object specific to this node to store data between code reloads. This must
be used to avoid re-creating objects on every init call.

Example: [3D.cuboid](../components/3D.cuboid.ts#L3)

## detached

A boolean value that is set to `true` when the node is being detached (removed)
from the graph. This is what we use to cleanup before leaving. For example, a
3D object can use this information to remove itself from the parent. On
'detach', nodes are called from the bottom to top (child then parent).

Example: [3D.cuboid](../components/3D.cuboid.ts#L15)

## require

This works the same as Node.js `require` function and lets you load external
libraries. If the library is not available in memory, this function call will
interrupt the init function and ask the user for the missing library.

Example: [3D.renderer](../components/3D.renderer.ts#L3)
