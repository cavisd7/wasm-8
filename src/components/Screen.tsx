import { Component, h } from 'preact';

import { WasmCore } from '../types';

import "./styles/screen.css";

const keyMap = {
    Digit1: 0x1,
    Digit2: 0x2,
    Digit3: 0x3,
    Digit4: 0xc,
    KeyQ: 0x4,
    KeyW: 0x5,
    KeyE: 0x6,
    KeyR: 0xd,
    KeyA: 0x7,
    KeyS: 0x8,
    KeyD: 0x9,
    KeyF: 0xe,
    KeyZ: 0xa,
    KeyX: 0x0,
    KeyC: 0xb,
    KeyV: 0xf,
};

interface Props {
    wasm8Core: WasmCore;
    isROMLoaded: boolean;
    isWasm8Running: boolean;
};

interface State {};

let lastTick = 0;
let fps = 0;

export class Screen extends Component<Props, State> {
    private updateTimeout;

    constructor() {
        super();

        this.updateTimeout = null;
    };

    componentDidMount() {
        const { wasm8Core } = this.props;

        const canvas: HTMLCanvasElement = (this.base as Element).querySelector('#screen');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const update = () => {
            if (!lastTick) {
                lastTick = performance.now();
            } else {
                let timeElapsed = (performance.now() - lastTick) / 1000;
                lastTick = performance.now();
                fps = 1 / timeElapsed;
            };

            //console.log('fps: ', fps);

            if (this.props.isROMLoaded && this.props.isWasm8Running) {
                /**
                 * Run cpu at 500Hz
                 */
                for (let i = 0; i < 8; i++) {
                    wasm8Core.instance.exports.emulateCycle();
                };

                wasm8Core.instance.exports.decrementDeleyTimer();

                this.draw(ctx, imageData);
            };

            /**
             * Render at about 60 times a second 
             */
            window.requestAnimationFrame(update);
        };

        update();

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            //console.log('key down: ', keyMap[e.code]);

            if (keyMap[e.code]) {
                wasm8Core.instance.exports.key_down(keyMap[e.code]);
            };
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            //console.log('key up: ', keyMap[e.code]);

            if (keyMap[e.code]) {
                wasm8Core.instance.exports.key_up(keyMap[e.code]);
            }
        });
    };

    componentDidUpdate(prevProps: Props, _: State) {
        if (prevProps.isROMLoaded && !this.props.isROMLoaded) {
            const canvas: HTMLCanvasElement = (this.base as Element).querySelector('#screen');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    };

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    };

    draw(ctx: CanvasRenderingContext2D, imageData: ImageData) {
        const imageBuffer = this.props.wasm8Core.memory.subarray(4095, 6143);
        const imageDataArray = new Uint8ClampedArray(64 * 32 * 4);

        //console.log('imageBuffer: ', imageBuffer);

        for (let i = 0; i < imageBuffer.length; i++) {
            if (imageBuffer[i] == 255) {
                imageDataArray[i * 4] = 79;
                imageDataArray[i * 4 + 1] = 205;
                imageDataArray[i * 4 + 2] = 185;
                imageDataArray[i * 4 + 3] = 255;
            } else if (imageBuffer[i] == 0) {
                imageDataArray[i * 4] = 3;
                imageDataArray[i * 4 + 1] = 6;
                imageDataArray[i * 4 + 2] = 19;
                imageDataArray[i * 4 + 3] = 255;
            };
        };

        for (let i = 0; i < imageDataArray.length; i++) {
            imageData.data[i] = imageDataArray[i];
        };

        ctx.clearRect(0, 0, 64, 32);
        ctx.putImageData(imageData, 0, 0);
    };

    render() {
        return (
            <div>
                <canvas className='canvas' id='screen' width='64' height='32'/>
            </div>
        );
    };
};
