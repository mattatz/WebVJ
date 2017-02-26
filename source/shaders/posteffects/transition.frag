
uniform sampler2D tDiffuse;
uniform sampler2D tPrev;
uniform float t;

varying vec2 vUv;

void main() {
    vec4 color = vec4(0, 0, 0, 0);
    if(vUv.x < t) {
        color = texture2D(tPrev, vUv);
    } else {
        color = texture2D(tDiffuse, vec2(vUv.x - t, vUv.y));
    }
    gl_FragColor = color;
}

