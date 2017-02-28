precision highp float;
uniform sampler2D t;
uniform float Resolution;
varying vec2 uv;

void main()
{
    //float Resolution = 2.0;
  // New resolution of (nx / ny)
  float nx = 500.0;
  float ny = floor(nx / Resolution);

  vec2 pos;
  pos.x = floor(uv.x * nx) / nx;
  pos.y = floor(uv.y * ny) / ny;
  gl_FragColor = texture2D(t, pos);
}