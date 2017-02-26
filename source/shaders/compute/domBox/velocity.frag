
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require(glsl-random) 

#define PI 3.14159265359
#define PI2 6.28318530718

uniform float time;
uniform float dt;
uniform int mode;

uniform float speed;

uniform float noiseSpeed;
uniform vec3 noiseScale;
uniform vec3 noiseIntensity;

uniform vec4 sphere;

uniform float decay;

uniform sampler2D textureModel;
uniform vec3 model;

void init(vec2 uv) {
    float r = random(uv * 33.15 + vec2(time, dt)) * 0.25 + 0.75;
    gl_FragColor = vec4(0.0, 0.0, 0.0, r);
}

vec3 uUp(vec4 pos, vec4 vel, vec2 uv) {
    vec3 seed = pos.xyz * noiseScale;
    float t = time * noiseSpeed;
    vec3 force = vec3(
        snoise3(seed + vec3(t, 0, 0)), 
        snoise3(seed + vec3(t, t, 0)), 
        abs(snoise3(seed + vec3(0, 0, t)))
    ) * noiseIntensity;
    return force * dt * vel.w;
}

vec3 uSphere(vec4 pos, vec4 vel, vec2 uv) {
    vec3 seed = pos.xyz * noiseScale;
    float t = time * noiseSpeed;
    vec3 force = vec3(
        snoise3(seed + vec3(t, 0, 0)), 
        snoise3(seed + vec3(t, t, 0)), 
        snoise3(seed + vec3(0, 0, t))
    ) * sphere.z;
    force.z += sphere.w * (1.0 - pos.w);

    return force * dt * vel.w;
}

vec3 eModel(vec2 uv) {
    vec3 p = texture2D(textureModel, uv).xyz;
    p.y = 1.0 - p.y;
    p -= 0.5;
    p *= model.x;
    return p.xzy + vec3(0.0, 0.0, model.y);
}

vec3 uModel(vec4 pos, vec4 vel, vec2 uv) {
    vec3 to = eModel(uv);
    vec3 dir = (to.xyz - pos.xyz);
    if(length(dir) < 100.0) {
        return dir * dt * vel.w * 0.1;
    }
    return vel.xyz + dir * dt * vel.w;
}

void update(vec2 uv) {
    vec4 pos = texture2D(texturePosition, uv);
    if(pos.a < 0.0) {
        init(uv);
    } else {
        vec4 vel = texture2D(textureVelocity, uv);

        if(mode == 1) {
            vel.xyz += uUp(pos, vel, uv);
        } else if(mode == 2) {
            vel.xyz += uSphere(pos, vel, uv);
        } else if(mode == 3) {
            vel.xyz += uSphere(pos, vel, uv);
            // vel.xyz = uModel(pos, vel, uv);
        }
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

