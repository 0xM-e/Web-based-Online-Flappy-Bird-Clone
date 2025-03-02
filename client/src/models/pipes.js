import { WIDTH, HEIGHT, MIN_PIPE_HEIGHT, CANVAS_REF, PIPE_WIDTH } from '../utils/constants.js';

export default class Pipes {
    constructor(height, space) {
        this.context = CANVAS_REF.current.getContext('2d');
        this.x = WIDTH;
        this.y = height ? HEIGHT - height : 0;
        this.width = PIPE_WIDTH;
        Pipes.pipeSpeed = 2;
        this.height = height || MIN_PIPE_HEIGHT
            + Math.random() * (HEIGHT - space - MIN_PIPE_HEIGHT * 2);
        this.frame = 0;
    }

    static pipeSpeed = 2;

    update() {
        this.x -= Pipes.pipeSpeed;
    }

    draw(topPipe, bottomPipe) {

        if (this.y === 0) {
            this.context.drawImage(topPipe, 0, (320 - this.height), this.width + 17, this.height, this.x, this.y, this.width + 17, this.height);
        }
        else {
            this.context.drawImage(bottomPipe, 0, 0, this.width + 17, this.height, this.x, this.y, this.width + 17, this.height);
        }
    }
}
