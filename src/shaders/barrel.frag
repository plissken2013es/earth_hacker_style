precision highp float;
uniform sampler2D t;
varying vec2 uv;

void main()
{
  vec2 pos = uv;
  float distortion = 0.2; 
  pos -= vec2(0.5, 0.5);
  pos *= vec2(pow(length(pos), distortion));
  pos += vec2(0.5, 0.5);
  gl_FragColor = texture2D(t, pos);
}