import { h, FunctionComponent } from "preact";

interface Props {
    title: string;
    val: string;
};

export const CpuStateItem: FunctionComponent<Props> = (props) => {
    return (
        <div className='debugger-cpu-state-item'>
            <span>{props.title}</span>
            <p>0x{props.val}</p>
        </div>
    );
};