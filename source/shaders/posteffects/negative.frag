
uniform sampler2D tDiffuse;
uniform float t;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 sample = texture2D(tDiffuse, uv);
    sample.rgb = mix(sample.rgb, 1.0 - sample.rgb, t);
    gl_FragColor = sample;
}
