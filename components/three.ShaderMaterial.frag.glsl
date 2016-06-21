#define PI 3.1415926535

uniform float time;
float song = time;
float scale = (1.0 + sin(time/16.0) * 0.2) * 100.0;
float ratio = scale;// + (sin(time*4.0) * sin(song*2.0))/20.0;
float step = PI / ratio;

varying vec2 vuv;
varying vec3 vposition;


float fractal(vec2 pix) {
  float t = 0.;//mod( time * 2.0, PI * 2.);
  float ans = 0.;

  for (float idx = 0.; idx < 30.; idx++) {
      // Yes, this is because for loops are weird in GLSL and cannot use
      // a non-constant expression
      float value = idx * step;
      float s = sin( value );
      float c = cos( value );
    // if ( idx < ratio ) {
    //   ans += ( cos( c * pix.x + s * pix.y + t ) + 1. ) / 2.;
    // } else {
      ans += ( cos( c * pix.x + s * pix.y + t ) + 1. ) / (3.0 + abs(idx -
      ratio)/5.);
    //}
  }

  float v = mod(ans, 1.);
  float k = ans - v;

  ans = ( mod( abs( k ), 2. ) ) <= 0.0001 ? v : 1. - v;

  return ans;
}

void main(void) {
  vec2 pos = vec2(vposition.x + vposition.y, vposition.x + vposition.z) / 2.0;

  float r = fractal(87. * (pos - vec2(
      0.5 + sin(song/64.)/0.2,
      0.5 + sin(song/96. )/0.8
    )));
  float g = fractal(88. * (pos - vec2(
      0.5 + sin(song/32.)/0.12,
      0.5 + sin(song/48. )/0.7
    )));
  float b = fractal(86. * (pos - vec2(
      0.5 + sin(song/48.)/0.5,
      0.5 + sin(song/64. )/0.7
    )));

  gl_FragColor = vec4(r, g, b, 1.);
}
