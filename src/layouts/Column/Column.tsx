import styled from "styled-components";

const Column = ({children, gap, width, minWidth, maxWidth, verticalAlign, horizontalAlign}: PropsType) => {
    return (
        <Div gap={gap} width={width} minWidth={minWidth} maxWidth={maxWidth} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}>{children}</Div>
    )
}

interface PropsType {
    width?: string,
    children?: any,
    gap?: string,
    minWidth?: string,
    maxWidth?: string,
    verticalAlign?: string,
    horizontalAlign?: string;
}

const Div = styled.div`
    gap: ${({gap}: PropsType) => gap || '20px'};
    flex-wrap: wrap;
    width: ${({width}: PropsType) => width || '50%'};
    max-width: ${({maxWidth}: PropsType) => maxWidth || 'auto'};
    min-width: ${({minWidth}: PropsType) => minWidth || 'auto'};
    flex: ${({width}: PropsType) => width === "0" ? 1 : ''};
    display: flex;
    flex-direction: column;
    justify-content: ${({verticalAlign}: PropsType) => verticalAlign || 'flex-start'};
    align-items: ${({horizontalAlign}: PropsType) => horizontalAlign || 'flex-start'};
    & > * {
        display: block;
    }
`;

export default Column