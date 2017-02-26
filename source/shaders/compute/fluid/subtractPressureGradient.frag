precision mediump float;
precision mediump int;

uniform sampler2D texturePressure;
uniform sampler2D textureVelocity;
uniform vec2 px;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    float x0 = texture2D(texturePressure, uv - vec2(px.x, 0.0)).r;
    float x1 = texture2D(texturePressure, uv + vec2(px.x, 0.0)).r;
    float y0 = texture2D(texturePressure, uv - vec2(0.0, px.y)).r;
    float y1 = texture2D(texturePressure, uv + vec2(0.0, px.y)).r;

    vec2 v = texture2D(textureVelocity, uv).xy;

    // subtract gradient of texturePressure from textureVelocity
    vec2 nv = (v - vec2(x1 - x0, y1 - y0) * 0.5);
    gl_FragColor = vec4(nv, 1, 1);
}

