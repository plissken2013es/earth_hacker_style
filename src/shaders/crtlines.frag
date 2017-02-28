precision highp float;
uniform sampler2D t;
uniform float frame;
varying vec2 uv;

void main()
{
  vec3 color = texture2D(t, uv).rgb;

  color -= abs(sin(UV.y * 100.0 + frame * 5.0)) * 0.08; // (1)
  color -= abs(sin(UV.y * 300.0 - frame * 10.0)) * 0.05; // (2)

  gl_FragColor = vec4(color, 1.0).rgba;
}
