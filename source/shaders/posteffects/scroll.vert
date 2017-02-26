
varying vec2 vUv;

uniform vec2 uvOffset;
uniform vec2 uvScale;

void main() {
    vUv = uv * uvScale + uvOffset;
    gl_Position = vec4(position, 1.0);
}

