precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random) 

#define PI 3.1415926
#define QUATERNION_IDENTITY vec4(0, 0, 0, 1)

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureHeight;
uniform float height;
uniform float uvScale;

attribute vec3 position;
attribute vec2 uv;
attribute vec2 uv2;
attribute float flag;

varying vec3 vPosition;
varying vec2 vUv;
varying float vAlpha;

void main() {
    vec3 pos = position;

    vec4 p = texture2D(textureHeight, uv);
    float h = height * p.x;
    pos.z += h * flag;

    vec4 world = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * (viewMatrix * world);

    vPosition = world.xyz;
    vUv = uv2 * vec2(uvScale, 1.0);
    vAlpha = smoothstep(0.0, 0.1, p.x);
}

