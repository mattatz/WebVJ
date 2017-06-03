precision mediump float;
precision mediump int;

// Quaternion multiplication
// http://mathworld.wolfram.com/Quaternion.html
vec4 qmul(vec4 q1, vec4 q2) {
	return vec4(
		q2.xyz * q1.w + q1.xyz * q2.w + cross(q1.xyz, q2.xyz),
		q1.w * q2.w - dot(q1.xyz, q2.xyz)
	);
}

// Vector rotation with a quaternion
// http://mathworld.wolfram.com/Quaternion.html
vec3 rotate_vector(vec3 v, vec4 r) {
	vec4 r_c = r * vec4(-1, -1, -1, 1);
	return qmul(r, qmul(vec4(v, 0), r_c)).xyz;
}

uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureVelocity;
uniform sampler2D textureRotation;
uniform sampler2D texturePosition;

uniform float scale;

attribute vec3 position;
attribute vec3 voxel;
attribute vec2 uv;
attribute vec2 uv2;
attribute float unit;

varying vec2 vUv; // uv for capture
varying float vUnit;
varying vec3 vPosition;

void main() {
    vec4 pos = texture2D(texturePosition, uv2);
    vec4 rot = texture2D(textureRotation, uv2);

    float size = scale * smoothstep(0.0, 0.2, pos.w) * smoothstep(1.0, 0.8, pos.w);
    vec3 p = rotate_vector(position, rot) * size + pos.xyz;
    vec4 world = modelMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * (viewMatrix * world);

    vUv = uv;
    vUnit = unit;
    vPosition = world.xyz;
}
