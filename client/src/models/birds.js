import { HEIGHT, CANVAS_REF, BIRD_START_X, BIRD_WITH, BIRD_HEIGHT } from '../utils/constants';


export default class Birds {
    constructor(birdsCostume) {
        this.context = CANVAS_REF.current.getContext('2d');
        this.x = BIRD_START_X;
        this.y = HEIGHT / 2;
        this.gravity = 0;
        Birds.velocity = 0.25;
        this.birdsCostume = birdsCostume;
        this.animationCounter = 1;
        this.score = 0;
    }
    static velocity = 0.25;

    jump() {
        this.gravity = Birds.velocity - 5;
    }

    update() {
        this.gravity += Birds.velocity;
        this.gravity = Math.min(5, this.gravity);
        this.y += this.gravity;
    }

    draw(jumpState) {

        this.context.save();
        this.context.translate(this.x + (BIRD_HEIGHT * 0.5), this.y + (BIRD_WITH * 0.5));
        this.context.rotate((Math.PI / 180) * jumpState);
        this.context.translate(-(this.x + (BIRD_HEIGHT * 0.5)), -(this.y + (BIRD_WITH * 0.5)));

        const flapCycle = Math.floor(this.animationCounter / 25) % 4;
        let birdImage;

        switch (flapCycle) {
            case 0:
                birdImage = this.birdsCostume.birdUpFlap;
                break;
            case 1:
                birdImage = this.birdsCostume.birdMidFlap;
                break;
            case 2:
                birdImage = this.birdsCostume.birdDownFlap;
                break;
            default:
                birdImage = this.birdsCostume.birdMidFlap;
                break;
        }

        this.context.drawImage(birdImage, this.x, this.y);

        this.animationCounter++;
        this.context.restore();
    }
}