# Creating a basic 3D scene

This tutorial explains how to create a basic 3D scene with [three.js](http://threejs.org), a very powerful library for creating 3D in the with Javascript.

The first thing we need to do is configure `#screen`, the DOM element that we use for display with an OpenGL context by using three.WebGLRenderer:

```lucidity
[ three.WebGLRenderer ]
```

This simply adds a canvas inside the `#screen` element and creates a WebGL renderer with the proper screen size. This block also creates a default [perspective camera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera) with the following settings:

* 60° vertical field of view.
* aspect ratio synced to the screen dimension.
* frustum near plane set to 10 cm.
* frustum far plane set to 100 m.
* camera set back 2 meters from origin.

Note that we use ISO units like meters and seconds to help get a good and coherent understanding of what we are doing although these values don't have any meaning, at least in 3D graphics (they usually have one in physical simulations).

Let us explain why we chose these particular values.

## vertical field of view

This sets the amount of things the imaginary viewer located at the camera would see. A large value means that the viewer sees far up and far down. For example, a 180° value would let the viewer see his or her feet and eyebrows.

This setting must be carefully set depending on how the 3D scene will be watched. Ideally, this angle should match the angle from the viewer to the screen. So for a viewer close to a screen (watching on a PC or in a gallery), the value should be greater then for a concert or gaming console situation.

![fov examples](fov.jpg)

We chose a value in between these two examples, something that looks natural in most situations. For gaming a common advice is to stay between 60°-75° to avoid making your viewers feel sick if they do not have their nose glued to the screen.

This [video](https://www.youtube.com/watch?v=p3AP8XLeRkI) can give you a feeling of the differences.

## aspect ratio

This is simply a way to make sure the image is not distorted (circles look like circles, not ellipses). Typical values are 4/3, 16/9, etc.

## frustum near and far plane

This is how close and how far to the user we draw objects. Anything closer then the near plane is not drawn and so is anything further then the far plane. Think of it as "how close and how far the viewer can see". To transform the 3D scene into a perspective view, the graphics engine divides by the distance to the viewer `z`. If this value becomes too close to zero, bad things happen.

In order to have precise depth buffer calculations and avoid things like zig-zagging effects when planes "fight" for which is in front, try to keep the far and near plane as close as possible to one another. We use values of `0.1` and `100`, representing a depth field of `10 cm` to `100 m`.
