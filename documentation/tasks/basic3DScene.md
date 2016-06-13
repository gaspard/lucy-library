# Creating a basic 3D scene

This tutorial explains how to create a basic 3D scene with [three.js](http://threejs.org), a very powerful library for creating 3D in the with Javascript.

The first thing we need to do is configure `#screen`, the DOM element that we use for display with an OpenGL context by using three.WebGLRenderer:

```lucidity
[ three.WebGLRenderer ]
```

This simply adds a canvas inside the `#screen` element and creates a WebGL renderer with the proper screen size. This block also creates a default [perspective camera](http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera) with the following settings:

* 75° vertical field of view.
* aspect ratio synced to the screen dimension.
* frustum near plane set to 1.
* frustum far plane set to 10000.

Let us explain what these values mean.

## vertical field of view

This sets the amount of things the imaginary viewer located at the camera would see. A large value means that the viewer sees far up and far down. For example, a 180° value would let the viewer see his or her feet and eyebrows.

This setting must be carefully set depending on how the 3D scene will be watched. Ideally, this angle should match the angle from the viewer to the screen. So for a viewer close to a screen (watching on a PC or in a gallery), the value should be greater then for a concert or gaming console situation.

<html><svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
 <g>
  <ellipse ry="9.5" rx="9.5" id="svg_1" cy="166.5" cx="74.5" stroke-width="1.5" stroke="#fff" fill="#000"/>
  <path id="svg_3" d="m74,157l-22,12l25,7" stroke-width="1.5" stroke="#000" fill="none"/>
  <line stroke="#000" stroke-linecap="null" stroke-linejoin="null" id="svg_4" y2="30.999997" x2="194.000001" y1="160" x1="83" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
  <line stroke="#000" stroke-linecap="null" stroke-linejoin="null" id="svg_5" y2="170" x2="84" y1="310.000003" x1="192.999995" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none"/>
  <line stroke-linecap="null" stroke-linejoin="null" id="svg_7" y2="314.027776" x2="198" y1="26" x1="198" fill-opacity="null" stroke-width="6.5" stroke="#007f7f" fill="none"/>
  <line stroke-linecap="null" stroke-linejoin="null" id="svg_6" y2="314.027776" x2="319.066101" y1="26" x1="319.066101" fill-opacity="null" stroke-width="6.5" stroke="#7f3f00" fill="none"/>
  <line stroke-linecap="null" stroke-linejoin="null" id="svg_9" y2="25" x2="318" y1="162" x1="84" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="none"/>
  <line stroke-linecap="null" stroke-linejoin="null" id="svg_10" y2="165" x2="79" y1="311" x1="314" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" stroke="#000" fill="none"/>
 </g>
</svg></html>

For more information, here is a [wikipedia article](https://en.wikipedia.org/wiki/Field_of_view_in_video_games) on the subject.
