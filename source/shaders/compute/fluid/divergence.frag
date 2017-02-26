precision mediump float;
precision mediump int;

uniform sampler2D textureVelocity;
uniform vec2 px;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    // gradient
    float x0 = texture2D(textureVelocity, uv - vec2(px.x, 0.0)).x;
    float x1 = texture2D(textureVelocity, uv + vec2(px.x, 0.0)).x;
    float y0 = texture2D(textureVelocity, uv - vec2(0.0, px.y)).y;
    float y1 = texture2D(textureVelocity, uv + vec2(0.0, px.y)).y;

    float divergence = (x1 - x0 + y1 - y0) * 0.5;
    gl_FragColor = vec4(divergence);
}

