import { h, FunctionComponent } from "preact";

import "../../styles/container.css";

interface Props {
    heading: string
};

export const Container: FunctionComponent<Props> = (props) => {
    return (
        <div className='outlined-container'>
            <h3>
                <span>{props.heading}</span>
            </h3>
            {props.children}
        </div>
    );
};