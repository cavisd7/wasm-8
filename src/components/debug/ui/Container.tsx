import { h, FunctionComponent } from "preact";

interface Props {
    heading: string
};

export const Container: FunctionComponent<Props> = (props) => {
    return (
        <div className='de'>
            <h3 htmlFor='dt'>
                <span>{props.heading}</span>
            </h3>
            {props.children}
        </div>
    );
};