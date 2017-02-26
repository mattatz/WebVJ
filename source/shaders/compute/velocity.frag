
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: random = require(glsl-random) 

uniform float time;
uniform float dt;
uniform int mode;

void init() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float r = random(uv) * 0.5 + 0.5;
    gl_FragColor = vec4(0.0, 0.0, 0.0, r);
}

void update() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;

    vec4 pos = texture2D(texturePosition, uv);
    if(pos.a < 0.0) {
        init();
    } else {
        vec4 vel = texture2D(textureVelocity, uv);
        vel.xyz *= vel.w;
        gl_FragColor = vel;
    }
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}

