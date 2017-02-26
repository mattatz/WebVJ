precision mediump float;
precision mediump int;

uniform sampler2D textureVelocity;

uniform vec2 px;
uniform float force;
uniform vec2 point;
uniform float radius;
uniform float decay;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec4 result = texture2D(textureVelocity, uv - texture2D(textureVelocity, vUv).xy * px);

    vec2 dir = uv - point;
    float d = length(dir);
    if(d < radius) {
        float nd = 1.0 - min(d / radius, 1.0);
        result = (result + vec4(normalize(dir) * nd * force, 0, 1)) * 0.5; // blend
    }
    result.xy *= decay;
    gl_FragColor = result;
}
