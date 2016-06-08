/* This block runs the currently selected scene.
 */
let scenes = {}

// Project scripts receive 'scenes' in init. When a 
// new scene is created we add the function in
// scenes and call init on all project blocks.
export const init =
( { sceneById } ) => {
  scenes = sceneById
  
  // We want notifications on scene add/remove.
  return { scenes: true }
}

export const render =
( ctx, child ) => {
  const scene = scenes [ ctx.project.sceneId ]
  if ( scene ) {
    scene ( ctx )
  }
}
