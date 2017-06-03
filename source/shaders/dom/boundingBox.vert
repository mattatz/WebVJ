precision mediump float;
precision mediump int;

#pragma glslify: easeQuadraticOut = require(glsl-easings/quadratic-out)
#pragma glslify: easeCubicOut = require(glsl-easings/cubic-out)
#pragma glslify: easeExponentialOut = require(glsl-easings/exponential-out)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureLifetime;

uniform float time;
uniform vec2 scale;
uniform float intensity;

uniform float t;
uniform int from;
uniform int to;

uniform float beta;

attribute vec3 position;
attribute float tip;
attribute float easing;
attribute vec2 uv;
attribute vec2 uv2;
attribute vec2 uv3;

varying float vThreshold;
varying float vTip;
varying float vLength;

vec3 noise(vec3 pos) {
    pos.xy += vec2(
        snoise3(pos.xyz * vec3(scale, 0.0) + vec3(0.0, 0.0, time)),
        snoise3(pos.yxz * vec3(scale.yx, 0.0) + vec3(0.0, 0.0, time))
    ) * intensity;
    return pos;
}

// mode
// 0 = default
// 1 = order keep ratio
// 2 = order squares 
// 3 = order text only
vec3 get(int m) {
    vec3 pos = position;
    if(m == 1 || m == 2) {
        pos.xy = uv2.xy;
    } else if(m == 3) {
        pos.xy = uv3.xy;
    }
    return pos;
}

void main() {
    vec3 pos = position;
    pos.xyz = mix(get(from), get(to), t);
    pos.xyz = noise(pos);
    gl_Position = projectionMatrix * (modelViewMatrix * vec4(pos, 1.0));
    vec4 lifetime = texture2D(textureLifetime, uv);

    float l = lifetime.x;
    float tt = l;
    if(easing < 1.0) {
        tt = easeQuadraticOut(l);
    } else if(easing < 2.0) {
        tt = easeCubicOut(l);
    } else if(easing < 3.0) {
        tt = easeExponentialOut(l);
    }

    if(lifetime.w > 0.5) {
        vTip = tip;
    } else {
        vTip = 1.0 - tip;
    }

    vThreshold = mix(0.0, 1.0 + lifetime.z, tt);
    vLength = lifetime.z;

    vThreshold = mix(1.0, vThreshold, beta);
    vLength = mix(1.0, vLength, beta);

}

