
#pragma glslify: random = require(glsl-random) 

uniform int mode;
uniform float speed;
uniform float time;
uniform float dt;
uniform float throttle;

uniform vec3 boundsMin;
uniform vec3 boundsMax;

// emit
void init(vec2 uv) {
    vec2 seed = uv * 33.3;
    vec3 v3 = vec3(random(seed.xy + vec2(time, 0.0)), random(seed.yx + vec2(time, dt)), random(seed.xy + vec2(dt, time)));
    vec4 p = vec4(
        (boundsMax - boundsMin) * v3 + boundsMin,
        1.0
    );

    // Throttling: discards particle emission by adding offset.
    if(uv.x > throttle) {
        p += vec4(1e8, 1e8, 1e8, -1);
    }
    gl_FragColor = p;
}

void update(vec2 uv) {
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    pos.w -= dt * speed * vel.w;
    if(pos.w < 0.0)  {
        init(uv);
    } else {
        pos.xyz += vel.xyz * dt;
        gl_FragColor = pos;
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


