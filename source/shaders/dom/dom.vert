precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random) 
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

#pragma glslify: easeQuadraticOut = require(glsl-easings/quadratic-out)
#pragma glslify: easeCubicOut = require(glsl-easings/cubic-out)
#pragma glslify: easeExponentialOut = require(glsl-easings/exponential-out)

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform int mode;
uniform float t;
uniform float c;
uniform float seed;

uniform int from;
uniform int to;

uniform float time;
uniform vec2 scale;
uniform float intensity;

uniform vec3 pa;
uniform vec3 pb;
uniform vec3 pc;
uniform vec3 pd;

uniform sampler2D texturePressure;
uniform sampler2D textureVelocity;

attribute vec3 position;
attribute vec3 center;
attribute vec2 uv;
attribute vec2 uv2; // [0.0 ~ 1.0, 0.0 ~ 1.0]
attribute vec2 uv3;
attribute vec2 uv4;
attribute vec2 nuv4; // normalized uv4
attribute vec2 uv5;
attribute vec2 nuv5; // normalized uv5

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;

vec3 pallete(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

// mode
// 0 = default
// 1 = order keep ratio
// 2 = order squares 
// 3 = order text only
// 
vec3 get(int m) {
    vec3 pos = position;
    if(m == 0) {
        // pos = vec3(pos.xy - velocity, -abs(pressure));
    } else if(m == 1) {
        vec2 velocity = texture2D(textureVelocity, nuv4).xy;
        float pressure = min(texture2D(texturePressure, nuv4).x * 10.0, 100.0);
        pos = vec3(uv3.xy - velocity, -abs(pressure));
    } else if(m == 2) {
        vec2 velocity = texture2D(textureVelocity, nuv4).xy;
        float pressure = min(texture2D(texturePressure, nuv4).x * 10.0, 100.0);
        pos = vec3(uv4.xy - velocity, -abs(pressure));
    } else if(m == 3) {
        vec2 velocity = texture2D(textureVelocity, nuv5).xy;
        float pressure = min(texture2D(texturePressure, nuv5).x * 10.0, 100.0);
        pos = vec3(uv5.xy - velocity, -abs(pressure));
    }
    return pos;
}

vec3 noise(vec3 pos) {
    pos.xy += vec2(
        snoise3(pos.xyz * vec3(scale, 0.0) + vec3(0.0, 0.0, time)),
        snoise3(pos.yxz * vec3(scale.yx, 0.0) + vec3(0.0, 0.0, time))
    ) * intensity;
    return pos;
}

void main() {
    vec3 pos = position;

    pos.xyz = mix(get(from), get(to), t);
    pos.xyz = noise(pos.xyz);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * (viewMatrix * world);

    vPosition = world.xyz;
    vUv = uv;

    float r = random(center.xy);
    vColor = pallete(r, pa, pb, pc, pd);
}

