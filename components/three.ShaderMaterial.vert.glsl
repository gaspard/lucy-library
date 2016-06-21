varying vec2 vuv;
varying vec3 vposition;

void main() {
  vuv = uv;
  vposition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
