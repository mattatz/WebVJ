
#pragma glslify: random = require(glsl-random)

#define PI 3.14159265359
#define PI2 6.28318530718

uniform int mode;
uniform float speed;
uniform float time;
uniform float step;
uniform float dt;
uniform float throttle;

uniform vec2 emitter; // x = distance, y = height
uniform vec4 sphere;

uniform sampler2D textureModel;
uniform vec3 model;

vec3 eBounds (vec2 uv) {
    vec2 seed = uv * 11.3 + vec2(dt, time);

    float r = random(seed.xy + vec2(time, 0.0)) * PI2;
    float r2 = random(seed.yx + vec2(time, dt));
    float r3 = random(seed.xy + vec2(dt, time));

    return vec3(
        cos(r) * emitter.x * r2,
        sin(r) * emitter.x * r2,
        r3 * emitter.y
    );
}

const vec3 center = vec3(0.0, 0.0, 750.0);

vec3 random_point_on_sphere(vec2 uv) {
    float u = random(uv) * 2.0 - 1.0;
    float theta = random(uv + 0.333) * PI * 2.0;
    float u2 = sqrt(1.0 - u * u);
    return vec3(u2 * cos(theta), u2 * sin(theta), u);
}

vec3 eSphere(vec2 uv) {
    float len = random(uv * 33.1);
    return vec3(0.0, 0.0, sphere.x) + random_point_on_sphere(uv) * (len * sphere.y);
}

vec3 eModel(vec2 px, vec2 uv) {
    vec3 p = texture2D(textureModel, uv + vec2(0.0, step * px.y)).xyz;
    p.y = 1.0 - p.y;
    p -= 0.5;
    p *= model.x;
    return p.xzy + vec3(0.0, 0.0, model.y);
}

// emit
void init(vec2 px, vec2 uv) {
    vec4 p = vec4(0.0, 0.0, 0.0, 1.0);

    if(mode <= 1) {
        p.xyz = eBounds(uv);
    } else if(mode == 2) {
        p.xyz = eSphere(uv);
    } else if(mode == 3) {
        p.xyz = eModel(px, uv);
    }

    // Throttling: discards particle emission by adding offset.
    if(uv.x > throttle) {
        p += vec4(1e8, 1e8, 1e8, -1);
    }
    gl_FragColor = p;
}

void update(vec2 px, vec2 uv) {
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    pos.w -= dt * speed * vel.w;
    if(pos.w < 0.0)  {
        init(px, uv);
    } else {
        if(mode == 3) {
            vec3 to = eModel(px, uv);
            pos.xyz = mix(pos.xyz, to, dt);
        } else {
            pos.xyz += vel.xyz * dt;
        }

        gl_FragColor = pos;
    }
}

void main() {
    vec2 px = 1.0 / resolution.xy;
    vec2 uv = gl_FragCoord.xy * px;
    if(mode == 0) {
        init(px, uv);
    } else {
        update(px, uv);
    }
}
