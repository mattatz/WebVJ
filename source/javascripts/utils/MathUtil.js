
var MathUtil = {

    TWO_PI : Math.PI * 2,
    HALF_PI : Math.PI * 0.5,
    QUARTER_PI : Math.PI * 0.25,

    randomRange: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    randomCircle: function(min, max) {
        var r = Math.random() * MathUtil.TWO_PI;
        var len = MathUtil.randomRange(min, max);
        return {
            x: Math.cos(r) * len,
            y: Math.sin(r) * len
        };
    }

};

export default MathUtil;

