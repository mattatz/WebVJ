#extension GL_OES_standard_derivatives : enable

precision mediump float;
precision mediump int;

uniform sampler2D capture;
uniform float c;
uniform float lighting;
uniform vec3 lightDirection;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;

const float spec = 1.7;

void main() {
    vec3 dx = dFdx(vPosition.xyz);
    vec3 dy = dFdy(vPosition.xyz);
    vec3 normal = cross(dx, dy);
    
    float highlight = clamp(dot(normal, normalize(lightDirection)), 0.34, 2.0);
    highlight = pow(highlight, spec);
    highlight = mix(1.0, highlight, lighting);

    vec4 color = texture2D(capture, vUv);

    gl_FragColor = vec4(mix(color.rgb, vColor, c) * highlight, 1.0);
}

