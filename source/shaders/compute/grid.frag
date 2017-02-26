
#pragma glslify: random = require(glsl-random) 
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d) 
#pragma glslify: easeQuadraticOut = require(glsl-easings/quadratic-out)

uniform float time;
uniform float dt;

// 0: Init
// 1: Force
// 2: Line
// 3: Noise
// 4: Circle
// 5: Update
uniform int mode;

uniform vec2 speedRange;
uniform vec4 force;
uniform vec4 line;
uniform float lineThickness;
uniform float circle;
uniform vec4 noise;

const vec2 center = vec2(0.5, 0.5);

void init(vec2 uv) {
    float r = random(uv + vec2(time, dt));
    float speed = mix(speedRange.x, speedRange.y, r);

    // vec4(height, time, to, speed)
    gl_FragColor = vec4(0.0, 0.0, 0.0, speed);
}

void eForce(vec2 uv) {
    vec4 height = texture2D(textureHeight, uv);

    vec2 dir = uv - force.xy;
    float d = length(dir);
    height.y += smoothstep(force.z, 0.0, d) * force.w;

    gl_FragColor = height;
}

// https://www.shadertoy.com/view/Xd2XWR
void eLine(vec2 uv) {
    vec4 height = texture2D(textureHeight, uv);

    gl_FragColor = height;
}

float fbm(vec2 P, float lacunarity, float gain) {
    float sum = 0.0;
    float amp = 1.0;
    vec2 pp = P;
    for(int i = 0; i < 6; i += 1) {
        amp *= gain; 
        sum += amp * cnoise2(pp);
        pp *= lacunarity;
    }
    return sum;
}
 
float pattern(vec2 p) {
    float l = 2.5;
    float g = 0.4;
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0), l, g), fbm(p + vec2(5.2, 1.3), l, g));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2), l, g), fbm(p + 4.0 * q + vec2(8.3, 2.8), l, g));
    return fbm(p + 4.0 * r, l, g);    
}

void eNoise(vec2 uv) {
    vec4 height = texture2D(textureHeight, uv);

    float d = distance(center, uv.xy);
    float h = smoothstep(0.5, 0.4, d);
    height.y += pattern(uv * noise.xy + vec2(dt, time)) * noise.z * h;

    gl_FragColor = height;
}

void eCircle(vec2 uv) {
    vec4 height = texture2D(textureHeight, uv);

    float d = distance(center, uv.xy);
    float h = smoothstep(-0.02, 0.35, d) * smoothstep(0.5, 0.4, d);
    float n = snoise2(uv * 10.0 + vec2(time, dt));

    height.y += (h * (0.75 + n * 0.25)) * circle;
    height.y = max(0.0, height.y);

    // height.y += pattern(uv * noise.xy + vec2(dt, time)) * noise.z;
    gl_FragColor = height;
}

void update(vec2 uv) {
    vec4 height = texture2D(textureHeight, uv);
    height.y = max(0.0, height.y - height.w * dt); // 0.0 ~ 1.0
    height.x = easeQuadraticOut(min(max(0.0, height.y), 1.0));
    gl_FragColor = height;
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    if(mode == 0) {
        init(uv);
    } else if(mode == 1) {
        eForce(uv);
    } else if(mode == 2) {
        eLine(uv);
    } else if(mode == 3) {
        eNoise(uv);
    } else if(mode == 4) {
        eCircle(uv);
    } else {
        update(uv);
    }
}

