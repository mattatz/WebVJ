
uniform sampler2D tDiffuse;
uniform float t;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 sample = texture2D(tDiffuse, uv);

    float grayscale = dot(sample.rgb, vec3(0.299, 0.587, 0.114));
    sample.rgb = mix(sample.rgb, vec3(grayscale, grayscale, grayscale), t);

    gl_FragColor = sample;
}
