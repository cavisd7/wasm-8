import { Component, h } from 'preact';

import { WasmCore } from '../types';

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
        const canvas: HTMLCanvasElement = (this.base as Element).querySelector('#screen');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        const scaledCanvas: HTMLCanvasElement = (this.base as Element).querySelector('#scaledScreen');
        const scaledCtx = scaledCanvas.getContext('2d');
        scaledCtx.clearRect(0, 0, scaledCanvas.width, scaledCanvas.height);
        scaledCtx.scale(3, 3);

        const updateCallback = () => {
            this.updateCallback(canvas, ctx, scaledCtx, imageData);
            this.updateTimeout = setTimeout(updateCallback, 100);
            
            if (this.props.isROMLoaded) {
                this.props.wasm8Core.instance.exports.execute();
            };
        };

        updateCallback();
    };

    componentWillUnmount() {
        clearTimeout(this.updateTimeout);
    };

    updateCallback(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, scaledCtx: CanvasRenderingContext2D, imageData: ImageData) {
        const imageBuffer = this.props.wasm8Core.memory.subarray(3839, 4095);
        const imageDataArray = new Uint8ClampedArray(64 * 32 * 4);

        //console.log('imageBuffer: ', imageBuffer);

        for (let i = 0; i < imageBuffer.length; i++) {
            for (let j = 0; j < 8; j++) {
                if (((imageBuffer[i] >> (7 - j)) & 0x01) == 1) {
                    imageDataArray[((i + j) + i * 7) * 4] = 253;
                    imageDataArray[((i + j) + i * 7) * 4 + 1] = 10;
                    imageDataArray[((i + j) + i * 7) * 4 + 2] = 10;
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

    render() {
        return (
            <div>
                <canvas style={{ display: 'none' }} id='screen' width='64' height='32'/>
                <canvas id='scaledScreen' width='192' height='96'/>
            </div>
        );
    };
};
