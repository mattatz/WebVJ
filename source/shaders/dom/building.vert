precision mediump float;
precision mediump int;

#pragma glslify: random = require(glsl-random) 
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform vec2 uvScale;
uniform vec2 uvOffset;

uniform float height;
uniform float offset;

attribute vec3 position;
attribute vec2 uv;
attribute float flag;

varying vec3 vPosition;
varying vec2 vUv;
varying float vAlpha;

void main() {
    vec3 pos = position;
    pos.z += height * flag + offset;
    vec4 world = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * (viewMatrix * world);

    vPosition = world.xyz;
    vUv = vec2(uv.x * uvScale.x + uvOffset.x, 1.0 - (uv.y * uvScale.y + uvOffset.y));
    vAlpha = smoothstep(0.0, 10.0, abs(height));
}

