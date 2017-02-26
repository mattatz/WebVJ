precision mediump float;
precision mediump int;

uniform sampler2D texturePressure;
uniform sampler2D textureVelocity;

varying vec2 vUv;

void main(){
    vec4 pressure = texture2D(texturePressure, vUv);
    vec4 velocity = texture2D(textureVelocity, vUv);
    // gl_FragColor = vec4(pressure.rgb * velocity.xyz, 1);
    gl_FragColor = vec4(abs(velocity.xyz), 1);
}

