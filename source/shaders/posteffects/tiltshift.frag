
const float steps = 3.0;
const float minOffs = (float(steps-1.0)) / -2.0;
const float maxOffs = (float(steps-1.0)) / +2.0;

uniform sampler2D tDiffuse;
uniform float blurAmount;
uniform float center;
uniform float stepSize;

varying vec2 vUv;

// https://gist.github.com/underscorediscovery/10324388
void main() {
    float amount = pow((vUv.y * center) * 2.0 - 1.0, 2.0) * blurAmount;

    vec4 blurred = vec4(0.0, 0.0, 0.0, 1.0);

    for (float offsY = minOffs; offsY <= maxOffs; ++offsY) {
        for (float offsX = minOffs; offsX <= maxOffs; ++offsX) {
            vec2 temp_vUv = vUv.xy;

            temp_vUv.x += offsX * amount * stepSize;
            temp_vUv.y += offsY * amount * stepSize;

            blurred += texture2D(tDiffuse, temp_vUv);
        }
    } 

    gl_FragColor = blurred / float(steps * steps);
} 

