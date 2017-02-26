
#pragma glslify: random = require(glsl-random) 

uniform float time;
uniform float dt;
uniform int mode;
uniform bool recovery;

uniform vec2 speedRange;

void init(vec2 uv) {
    float r = random(uv + vec2(time, dt));
    float speed = mix(speedRange.x, speedRange.y, r);
    float len = r;
    float direction = random(uv.yx + vec2(dt, time)) > 0.5 ? 1.0 : 0.0;
    gl_FragColor = vec4(1.0, speed, len, direction);
}

void update(vec2 uv) {
    vec4 lifetime = texture2D(textureLifetime, uv);
    if(recovery && lifetime.x < 0.0) {
        init(uv);
    } else {
        lifetime.x = clamp(0.0, 1.0, lifetime.x - lifetime.y * dt);
        gl_FragColor = lifetime;
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

