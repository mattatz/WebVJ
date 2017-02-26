
uniform sampler2D pressure;
varying vec2 texcoord;

float rest(vec4 v) {
  return dot(v, vec4(1.0, 1.0 / 255.0, 1.0 / (255.0 * 255.0), 1.0 / (255.0 * 255.0 * 255.0)));
}

void main(){
  float p = rest(texture2D(pressure, texcoord));
  // gl_FragColor = vec4(p, p, p, 1.);
  gl_FragColor = texture2D(pressure, texcoord);
  gl_FragColor.a = 1.0;
}

