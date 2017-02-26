
uniform sampler2D pressure;
varying vec2 texcoord;

void main() {
    texcoord = uv;
    float p = texture2D(pressure, texcoord).x;

    // rift up
    vec3 pos = position;
    pos.z += p;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

