precision mediump float;
precision mediump int;

uniform sampler2D texturePressure;
uniform sampler2D textureDivergence;

uniform float alpha;
uniform float beta;
uniform vec2 px;

varying vec2 vUv;

void main(){
    vec2 uv = vUv;
    float x0 = texture2D(texturePressure, uv - vec2(px.x, 0.0)).r;
    float x1 = texture2D(texturePressure, uv + vec2(px.x, 0.0)).r;
    float y0 = texture2D(texturePressure, uv - vec2(0.0, px.y)).r;
    float y1 = texture2D(texturePressure, uv + vec2(0.0, px.y)).r;
    float b = texture2D(textureDivergence, uv).r;

    // program representation for Equation 16
    float relaxed = (x0 + x1 + y0 + y1 + alpha * b) * beta;
    gl_FragColor = vec4(relaxed);
}
