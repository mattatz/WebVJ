
export default class Noise {

    constructor(scale = new THREE.Vector2(0.05, 0.1), intensity = 5, speed = 1) {
        this.scale = scale;
        this.intensity = intensity;
        this.speed = speed;

        this.time = 0;
        this.sync = false;
        this.beat = 0;
    }

    update(dt, t) {
        this.time += dt * this.speed;
    }

    speedTo(duration, to) {
        return this.tweenSpeed(duration, this.speed, to);
    }

    tweenSpeed(duration, from, to, easing = TWEEN.Easing.Quadratic.Out) {
        var n = this;
        return new Promise((resolve, reject) => {
            TWEEN.remove(this.tw);
            this.tw = new TWEEN.Tween({ speed: from })
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ speed: to }, duration)
            .onUpdate(function() {
                n.speed = this.speed;
            })
            .onComplete(() => {
                resolve(this);
            })
            .start();
        });
    }

    intensityTo(duration, to) {
        return this.tweenIntensity(duration, this.intensity, to);
    }

    tweenIntensity(duration, from, to, easing = TWEEN.Easing.Quadratic.Out) {
        var n = this;
        return new Promise((resolve, reject) => {
            TWEEN.remove(this.tw);
            this.tw = new TWEEN.Tween({ intensity: from })
            .easing(TWEEN.Easing.Quadratic.Out)
            .to({ intensity: to }, duration)
            .onUpdate(function() {
                n.intensity = this.intensity;
            })
            .onComplete(() => {
                n.intensity = to;

                resolve(this);
            })
            .start();
        });
    }

    tween(duration, from, to, easing = TWEEN.Easing.Quadratic.Out) {
        var n = this;
        return new Promise((resolve, reject) => {
            TWEEN.remove(this.tw);
            this.tw = new TWEEN.Tween(from)
            .easing(easing)
            .to(to, duration)
            .onUpdate(function() {
                n.speed = this.speed;
                n.intensity = this.intensity;
            })
            .onComplete(() => {
                resolve(this);
            })
            .start();
        });
    }

    bang(duration, speed = 5, intensity = 6) {
        var fromSpeed = this.speed;
        var fromIntensity = this.intensity;
        var n = this;
        n.tween(
            duration * 0.5, 
            {
                speed: fromSpeed,
                intensity: fromIntensity
            },
            {
                speed: speed,
                intensity: intensity
            },
            TWEEN.Easing.Exponential.Out
        ).then(() => {
            n.tween(
                duration * 0.5,
                {
                    speed: speed,
                    intensity: intensity
                },
                {
                    speed: fromSpeed,
                    intensity: fromIntensity
                },
                TWEEN.Easing.Linear.None
            );
        });
    }

    activate(flag) {
        this.intensityTo(800, flag ? 4.0 : 0.0);
    }

    osc(data) {
        
        switch(data[0]) {
            case "bang":
                this.bang(400);
                break;

            case "sync":
                this.sync = (data[1] == 1);
                break;

            case "activate":
                this.activate((data[1] == 1));
                break;

        }

    }

}

