
uniform sampler2D tDiffuse;
uniform sampler2D tNoise;
uniform float t;
uniform float amplitude;
uniform float time;
uniform float speed;

varying vec2 vUv;

vec2 loop(vec2 p) {
    p.x = mod(p.x, 1.0);
    p.y = mod(p.y, 1.0);
    return p;
}

// https://www.shadertoy.com/view/4t23Rc
vec4 rgbShift(vec2 p, vec4 shift) {
    shift *= 2.0 * shift.w - 1.0;

    vec2 rs = vec2(shift.x, -shift.y);
    vec2 gs = vec2(shift.y, -shift.z);
    vec2 bs = vec2(shift.z, -shift.x);
    
    float r = texture2D(tDiffuse, loop(p + rs)).x;
    float g = texture2D(tDiffuse, loop(p + gs)).y;
    float b = texture2D(tDiffuse, loop(p + bs)).z;

    return vec4(r, g, b, 1.0);
}

vec4 noise(vec2 p) {
    return texture2D(tNoise, p);
}

vec4 vec4pow(vec4 v, float p) {
    return vec4(pow(v.x, p), pow(v.y, p), pow(v.z, p), v.w); 
}

void main() {
    vec2 uv = vUv;
    float amp = amplitude * t;
    vec4 shift = vec4pow(noise(vec2(speed * time, 2.0 * speed * time / 25.0)), 8.0) * vec4(amp, amp, amp, 1.0);
    gl_FragColor = rgbShift(uv, shift);
}

