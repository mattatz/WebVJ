
uniform sampler2D tCenter;
uniform sampler2D tBottom;

uniform float offset; // 0.0 ~ 1.0

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    if(uv.y <= offset) {
        gl_FragColor = texture2D(tBottom, uv);
    } else {
        gl_FragColor = texture2D(tCenter, uv);
    }
}
