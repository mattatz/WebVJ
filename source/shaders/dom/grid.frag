precision mediump float;
precision mediump int;

varying float vDistance;

void main() {
    gl_FragColor = vec4(0, 0, 0, (1.0 - vDistance));
}

