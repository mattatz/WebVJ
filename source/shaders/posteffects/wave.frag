
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

uniform sampler2D tDiffuse;
uniform float time;
uniform float t;

uniform vec2 scale;
uniform float intensity;
uniform float border;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;

    float d = t * intensity * smoothstep(0.0, border, uv.x) * smoothstep(1.0, 1.0 - border, uv.x) * smoothstep(0.0, border, uv.y) * smoothstep(1.0, 1.0 - border, uv.y);
    uv.x += (snoise3(vec3(uv * scale, time)) - 0.5) * d;
    uv.y += (snoise3(vec3(uv.yx * scale, time)) - 0.5) * d;

    gl_FragColor = texture2D(tDiffuse, uv);
} 

