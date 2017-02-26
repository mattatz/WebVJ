#extension GL_OES_standard_derivatives : enable

precision mediump float;
precision mediump int;

uniform sampler2D capture;
uniform vec3 lightDirection;

varying vec3 vPosition;
varying vec2 vUv;
varying float vAlpha;

void main() {
    vec3 dx = dFdx(vPosition.xyz);
    vec3 dy = dFdy(vPosition.xyz);
    vec3 normal = normalize(cross(normalize(dx), normalize(dy)));
    normal = abs(normal);

    vec3 light = normalize(lightDirection);
    float d = clamp(dot(normal, light), 0.14, 1.0);

    vec3 color = texture2D(capture, vUv).rgb;
    gl_FragColor = vec4(color * d, vAlpha);
}

