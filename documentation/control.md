# Control

Each block can have its own set of controls. These are declared in the init function with the `control` helper.

```Javascript
export const init =
( { context, control } ) => {
  // Create a slider
  const position = context.object3d.position
  let dim = 1
  control.Slider ( 'scale', ( v ) => {
    dim = Math.pow ( 10, 10 * v - 5 )
  })
  // Create a pad control
  control.Pad ( 'x', 'y', ( x, y ) => {
    position.x = ( x - 0.5 ) * dim
    position.y = ( y - 0.5 ) * dim
  })
}
```
The declaration order corresponds to the order of the controls in the UI. The string argument is used for labels. The current control values are saved in a scene 'preset'.

Available controls:

### `Slider ( label: string, clbk )`

Produces a single value between [0,1].

### `Pad ( xlabel: string, ylabel: string, clbk )`

Produces two values between [0,1] depending on the position of a single point on an surface.
