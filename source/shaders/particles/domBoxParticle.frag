#extension GL_OES_standard_derivatives : enable

precision mediump float;
precision mediump int;

// equals to TownStage.js pages length
uniform sampler2D captures[6];
uniform vec3 lightDirection;

varying vec2 vUv;
varying float vUnit;
varying vec3 vPosition;

void main() {
    vec3 dx = dFdx(vPosition.xyz);
    vec3 dy = dFdy(vPosition.xyz);
    vec3 normal = normalize(cross(normalize(dx), normalize(dy)));
    normal = abs(normal);

    vec3 light = normalize(lightDirection);
    float diff = clamp(dot(normal, light), 0.14, 1.0);

    vec4 color = vec4(0, 0, 0, 0);
    if(vUnit < 0.5) {
        color = texture2D(captures[0], vUv);
    } else if(vUnit < 1.5) {
        color = texture2D(captures[1], vUv);
    } else if(vUnit < 2.5) {
        color = texture2D(captures[2], vUv);
    } else if(vUnit < 3.5) {
        color = texture2D(captures[3], vUv);
    } else if(vUnit < 4.5) {
        color = texture2D(captures[4], vUv);
    } else if(vUnit < 5.5) {
        color = texture2D(captures[5], vUv);
    }
    color.rgb *= diff;
    gl_FragColor = color;
}
