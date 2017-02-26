
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require(glsl-random) 

uniform float time;
uniform float dt;
uniform int mode;

uniform float speed;

uniform float noiseSpeed;
uniform vec3 noiseScale;
uniform vec3 noiseIntensity;

uniform float decay;

void init(vec2 uv) {
    float r = random(uv * 33.15 + vec2(time, dt)) * 0.25 + 0.75;
    gl_FragColor = vec4(0.0, 0.0, 0.0, r);
}

void update(vec2 uv) {
    vec4 pos = texture2D(texturePosition, uv);
    if(pos.a < 0.0) {
        init(uv);
    } else {
        vec4 vel = texture2D(textureVelocity, uv);

        vec3 seed = pos.xyz * noiseScale;
        float t = time * noiseSpeed;

        vel.xyz += vec3(
            snoise3(seed + vec3(t, 0, 0)), 
            -abs(snoise3(seed + vec3(t, t, 0))), 
            snoise3(seed + vec3(0, 0, t)) 
        ) * noiseIntensity * dt * vel.w;

        // vel.xyz *= vel.w * (1.0 - pos.w);
        vel.xyz *= decay;
        gl_FragColor = vel;
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    if(mode == 0) {
        init(uv);
    } else {
        update(uv);
    }
}

