precision mediump float;
precision mediump int;

uniform float alpha;
uniform float beta;

varying float vThreshold;
varying float vTip;
varying float vLength;

void main() {
    float edge = vThreshold - vLength;
    if(vTip > vThreshold || edge > vTip) discard;
    float e = smoothstep(vThreshold, edge, vTip);
    vec3 c = vec3(0.3);
    gl_FragColor = vec4(c, mix(1.0, e, beta) * alpha);
}

