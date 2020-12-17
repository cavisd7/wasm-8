import { Component, h } from 'preact';

import { WasmCore } from '../types';

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
}

interface Props {
    wasm8Core: WasmCore;
    isROMLoaded: boolean;
};

interface State {};

export class Screen extends Component<Props, State> {
    updateTimeout;

    constructor() {
        super();

        this.updateTimeout = null;
    };

    componentDidMount() {
        const { wasm8Core } = this.props;

        const canvas: HTMLCanvasElement = (this.base as Element).querySelector('#screen');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaledCanvas: HTMLCanvasElement = (this.base as Element).querySelector('#scaledScreen');
        const scaledCtx = scaledCanvas.getContext('2d');
        scaledCtx.clearRect(0, 0, scaledCanvas.width, scaledCanvas.height);
        scaledCtx.scale(10, 10);

        const updateCallback = () => {
            this.updateCallback(canvas, ctx, scaledCtx, imageData);
            this.updateTimeout = setTimeout(updateCallback, 1000 / 60); //60 times per second
            
            if (this.props.isROMLoaded) {
                wasm8Core.instance.exports.execute();
                wasm8Core.instance.exports.decrementDeleyTimer();
            };
        };

        updateCallback();

        window.addEventListener('keydown', (e: KeyboardEvent) => {
            console.log('key down: ', keyMap[e.code]);

            if (keyMap[e.code]) {
                wasm8Core.instance.exports.key_down(keyMap[e.code]);
            };
        });

        window.addEventListener('keyup', (e: KeyboardEvent) => {
            console.log('key up: ', keyMap[e.code]);

            if (keyMap[e.code]) {
                wasm8Core.instance.exports.key_up(keyMap[e.code]);
            }
        });
    };

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    };

    updateCallback(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scaledCtx: CanvasRenderingContext2D, imageData: ImageData) {
        if (1) {
            const imageBuffer = this.props.wasm8Core.memory.subarray(4095, 6143);
            const imageDataArray = new Uint8ClampedArray(64 * 32 * 4);

            //console.log('imageBuffer: ', imageBuffer);

            for (let i = 0; i < imageBuffer.length; i++) {
                if (imageBuffer[i] == 1) {
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

            //ctx.beginPath();
            //ctx.clearRect(0, 0, 64, 32);
            ctx.putImageData(imageData, 0, 0);
            scaledCtx.drawImage(canvas, 0, 0);
        } else {
            const imageBuffer = this.props.wasm8Core.memory.subarray(3839, 4095);
            const imageDataArray = new Uint8ClampedArray(64 * 32 * 4);

            //console.log('imageBuffer: ', imageBuffer);

            for (let i = 0; i < imageBuffer.length; i++) {
                for (let j = 0; j < 8; j++) {
                    if (((imageBuffer[i] >> (7 - j)) & 0x01) == 1) {
                        imageDataArray[((i + j) + i * 7) * 4] = 79;
                        imageDataArray[((i + j) + i * 7) * 4 + 1] = 205;
                        imageDataArray[((i + j) + i * 7) * 4 + 2] = 185;
                        imageDataArray[((i + j) + i * 7) * 4 + 3] = 255;
                    } else if (((imageBuffer[i] >> (7 - j)) & 0x01) == 0) {
                        imageDataArray[((i + j) + i * 7) * 4] = 0;
                        imageDataArray[((i + j) + i * 7) * 4 + 1] = 0;
                        imageDataArray[((i + j) + i * 7) * 4 + 2] = 0;
                        imageDataArray[((i + j) + i * 7) * 4 + 3] = 255;
                    };
                };
            };

            for (let i = 0; i < imageDataArray.length; i++) {
                imageData.data[i] = imageDataArray[i];
            };

            ctx.beginPath();
            //ctx.clearRect(0, 0, 64, 32);
            ctx.putImageData(imageData, 0, 0);
            scaledCtx.drawImage(canvas, 0, 0);
        };
    };

    render() {
        return (
            <div className='screen'>
                <canvas style={{ display: 'none' }} id='screen' width='64' height='32'/>
                <canvas className='canvas' id='scaledScreen' width='640' height='320'/>
            </div>
        );
    };
};
