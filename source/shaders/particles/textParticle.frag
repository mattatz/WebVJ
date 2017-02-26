precision mediump float;
precision mediump int;

uniform sampler2D capture;

varying vec2 vUv;
varying vec3 vColor;

void main() {
    vec4 color = texture2D(capture, vUv);
    vec3 drgb = color.rgb - vColor.rgb;
    color.a = smoothstep(0.0, 0.1, dot(drgb, drgb));
    gl_FragColor = color;
}

