
#pragma glslify: random = require(glsl-random) 

uniform int mode;
uniform float speed;
uniform float time;
uniform float dt;

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 seed = vec3(random(uv.xy), random(uv.yx), random(vec2(time, uv.x)));
    gl_FragColor = vec4(0, 0, 0, 1.0);
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 pos = texture2D(texturePosition, uv);
    vec4 vel = texture2D(textureVelocity, uv);
    pos.w -= dt * speed * vel.w;
    if(pos.w < 0.0)  {
        init();
    } else {
        pos.xyz += vel.xyz;
        gl_FragColor = pos;
    }
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}


