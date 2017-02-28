precision highp float;
uniform sampler2D t;
uniform float frame;
varying vec2 uv;

void main()
{
  vec3 color = texture2D(t, uv).rgb;

  color -= abs(sin(uv.y * 100.0 + frame * 50.)) * 0.04; // (1)
  color -= abs(sin(uv.y * 300.0 - frame * 100.0)) * 0.025; // (2)

  gl_FragColor = vec4(color, 1.0);
}
