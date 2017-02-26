
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
    vec2 seed = vec2(random(uv), random(uv.yx));
    vec4 vel = texture2D(textureVelocity, uv);
    float t = time * 0.1;
    vel.xyz += vec3(snoise3(vec3(seed.x, seed.y, t)), snoise3(vec3(t, seed.y, seed.x)), abs(snoise3(vec3(seed.y, t, seed.x))));
    vel.xyz *= vel.w;
    gl_FragColor = vel;
}

void main() {
    if(mode == 0) {
        init();
    } else {
        update();
    }
}

