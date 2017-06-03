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
uniform mat4 modelViewMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;

uniform sampler2D textureVelocity;
uniform sampler2D textureRotation;
uniform sampler2D texturePosition;

attribute vec3 position;
attribute vec2 uv;
attribute vec2 uv2;
attribute vec2 uv3;
attribute vec3 color;

varying vec2 vUv; // uv for capture 
varying vec3 vColor; // bg color

void main() {
    vec4 pos = texture2D(texturePosition, uv3);
    vec4 rot = texture2D(textureRotation, uv3);

    float size = smoothstep(0.0, 0.2, pos.w) * smoothstep(1.0, 0.8, pos.w);
    vec3 p = rotate_vector(position, rot) * size;
    p += pos.xyz;
    gl_Position = projectionMatrix * (modelViewMatrix * vec4(p, 1.0));

    vUv = uv;
    vColor = color;
}

