precision mediump float;
precision mediump int;

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureVelocity;
uniform sampler2D texturePressure;

attribute vec3 position;

varying float vDistance;

void main() {
    vec3 pos = position;
    vec2 uv = pos.xy + 0.5;
    vDistance = length(pos.xy) / 0.5;

    float pressure = texture2D(texturePressure, uv).x;
    pos.z -= clamp(pressure, -10.0, 10.0);

    vec4 world = modelMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * (viewMatrix * world);
}

