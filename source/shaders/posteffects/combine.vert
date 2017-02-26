
uniform vec3 zoom; // yz : -1.0 ~ 1.0, 0.0 means zoom to center

varying vec2 vUv;

void main() {
    float dz = (zoom.x - 1.0) / zoom.x;
    vUv = uv / zoom.x + vec2(dz * 0.5, dz * 0.5) * (zoom.yz + vec2(1.0, 1.0));
    gl_Position = vec4(position, 1.0);
}

