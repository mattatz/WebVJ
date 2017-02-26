
uniform float offset;
uniform float darkness;
uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    // Eskil's vignette
	vec4 texel = texture2D(tDiffuse, vUv);
	vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
	gl_FragColor = vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a);
}

