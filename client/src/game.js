import { HEIGHT, BIRD_WITH, BIRD_HEIGHT, BIRD_START_X, WIDTH, CANVAS_REF, CANVAS_HEIGHT, CANVAS_WIDTH } from './utils/constants.js';
import Birds from './models/birds.js';
import Pipes from './models/pipes.js';


export class Game {
    constructor() {
        this.context = CANVAS_REF.current.getContext('2d');
        this.pipes = [];
        this.gameState = false;
        this.frame = 0;
        this.isHit = false;
        this.space = 100;
        this.winner = 'Player Name'
        this.jumpState = 0;
        this.birdsCostume = {
            blueBird: {
                birdUpFlap: 0,
                birdDownFlap: 0,
                birdMidFlap: 0,
            },
            redBird: {
                birdUpFlap: 0,
                birdDownFlap: 0,
                birdMidFlap: 0,
            }
        };
        this.bird = null;
        this.animationCounter = 1;
    }

    LoadImage = (src) => {
        let img = new Image();
        let prms = new Promise(function (resolve, reject) {
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject(src + " LoadImage error ");
            }
        });
        img.src = src;
        return prms;
    }

    LoadAudio = (src) => {
        let audio = new Audio();
        let prms = new Promise(function (resolve, reject) {
            audio.oncanplaythrough = function () {
                resolve(audio);
            };
            audio.onerror = function () {
                reject(src + " LoadAudio error ");
            }
        });
        audio.src = src;
        return prms;
    }

    init = async () => {

        this.pipes = [];
        this.bird = new Birds(this.birdsCostume.blueBird);
        this.gameState = true;
        this.isHit = false;

        //Load  Birds Image
        this.birdsCostume.blueBird.birdUpFlap = await this.LoadImage('./assets/bluebird-upflap.png');
        this.birdsCostume.blueBird.birdDownFlap = await this.LoadImage('./assets/bluebird-downflap.png');
        this.birdsCostume.blueBird.birdMidFlap = await this.LoadImage('./assets/bluebird-midflap.png');
        this.birdsCostume.redBird.birdUpFlap = await this.LoadImage('./assets/redbird-upflap.png');
        this.birdsCostume.redBird.birdDownFlap = await this.LoadImage('./assets/redbird-downflap.png');
        this.birdsCostume.redBird.birdMidFlap = await this.LoadImage('./assets/redbird-midflap.png');

        //Load  Pipes and other Images
        this.backGround = await this.LoadImage('./assets/background.png');
        this.bottomPipe = await this.LoadImage('./assets/pipe-green-bottom.png');
        this.topPipe = await this.LoadImage('./assets/pipe-green-top.png');
        this.base = await this.LoadImage('./assets/base.png');

        //Load Audio
        this.jumpAudio = await this.LoadAudio('./assets/wing.wav')
        this.pointAudio = await this.LoadAudio('./assets/point.wav')
        this.gameOverAudio = await this.LoadAudio('./assets/die.wav')
        this.hitAudio = await this.LoadAudio('./assets/hit.wav');


        window.addEventListener('keydown', this.onKeyPress.bind(this))

        this.context.drawImage(this.backGround, 0, 0, CANVAS_REF.current.width, CANVAS_REF.current.height);
        this.context.drawImage(this.base, 0, HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT - HEIGHT);
        this.context.drawImage(this.birdsCostume.blueBird.birdDownFlap, BIRD_START_X, HEIGHT / 2, BIRD_HEIGHT, BIRD_WITH);
    }

    onKeyPress = (e) => {
        if (e.keyCode === 32 && !this.isHit) {
            this.jumpAudio.currentTime = 0;
            this.jumpAudio.play();
            this.bird.jump();
            this.jumpState = -30;
        }
    }

    gameOver = () => {
        console.log('GameOver')
        this.context.fillStyle = "purple";
        this.context.font = '30px Arial';
        this.context.fillText("Winner: " + this.winner, HEIGHT / 2, WIDTH / 2);
    }

    isGameRunning = () => {

        // Top map control
        if (this.bird.y <= 0) {
            this.jumpState = 75;
            this.playGameOverAudio();
            this.isHit = true;
        }

        // Bottom map control
        if (this.bird.y >= HEIGHT - BIRD_WITH + 5) {
            this.playGameOverAudio();
            this.gameState = false
        }

        this.pipes.forEach(pipe => {

            // Top pipe control
            if (pipe.y === 0 && this.bird.x + BIRD_WITH > pipe.x && this.bird.x < pipe.x + pipe.width &&
                this.bird.y < pipe.y + pipe.height) {
                this.jumpState = 75;
                Pipes.pipeSpeed = 0;
                Birds.velocity = 5;
                this.playGameOverAudio();
                this.isHit = true;
            }

            // Bottom pipe control
            if (pipe.y > 0 && this.bird.x + BIRD_WITH >= pipe.x && this.bird.x <= pipe.x + pipe.width && this.bird.y + BIRD_HEIGHT >= pipe.y) {
                this.jumpState = 75;
                Pipes.pipeSpeed = 0;
                Birds.velocity = 5;
                this.playGameOverAudio();
                this.isHit = true;
            }

            // Score control
            if (this.bird.x === pipe.x + pipe.width && pipe.y === 0) {
                this.bird.score++;
                this.pointAudio.play();
            }
        });
        return this.gameState;
    }

    playGameOverAudio() {
        if (!this.isHit) {
            this.hitAudio.play();
            this.gameOverAudio.play();
        }
    }

    createPipes() {
        const firstPipe = new Pipes(null, this.space);
        const secondPipeHeigth = HEIGHT - firstPipe.height - this.space;
        const secondPipe = new Pipes(secondPipeHeigth, 40);
        return [firstPipe, secondPipe];
    }

    drawScore() {
        this.context.fillStyle = "white";
        this.context.font = '30px Arial';
        this.context.fillText("Score: " + this.bird.score, 10, HEIGHT / 10);
    }

    update = () => {
        if (!this.isGameRunning()) {
            this.gameOver();
            return;
        }

        this.pipes.forEach(pipe => pipe.update());
        this.bird.update();

        if (this.frame > 100) {
            const pipes = this.createPipes();
            this.pipes.push(...pipes);
            this.frame = 0;
        }
        this.frame++;

        if (this.jumpState < 50) this.jumpState += 2;

    }

    draw = () => {

        // game area
        this.context.clearRect(0, 0, CANVAS_REF.current.width, CANVAS_REF.current.height);
        this.context.drawImage(this.backGround, 0, 0, CANVAS_REF.current.width, CANVAS_REF.current.height);
        this.context.drawImage(this.base, 0, HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT - HEIGHT);

        // pipes
        this.pipes.forEach(pipe => pipe.draw(this.topPipe, this.bottomPipe));

        // birds
        this.bird.draw(this.jumpState);

        this.drawScore();
    }
}