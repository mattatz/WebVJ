
uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    uv.y = mod(uv.y, 1.0);
    vec4 sample = texture2D(tDiffuse, uv);
    gl_FragColor = sample;
}
