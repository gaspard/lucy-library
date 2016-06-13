"use strict";
let render, camera, childrenUpdate, object3D;
exports.init = ({ context, cache, require, children }) => {
    render = context.renderer.render;
    camera = context.camera;
    childrenUpdate = children.all;
    const THREE = require('THREE');
    if (!cache.object3D) {
        cache.object3D = new THREE.Scene();
    }
    object3D = cache.object3D;
    return { object3D };
};
exports.update = () => {
    childrenUpdate();
    render(object3D, camera);
};
exports.meta = { description: "Prepare and render a 3D rendering scene.",
    tags: ['3D', 'three.js', 'object3D', 'scene'],
    version: '1.0',
    expect: { renderer: 'THREE.WebGLRenderer' },
    provide: { object3D: 'THREE.Object3D' }
};
//# sourceMappingURL=three.Scene.js.map