import styled from "styled-components";

const Row = ({children, gap, width, verticalAlign, horizontalAlign}: PropsType) => {
    return (
        <Div gap={gap} width={width} verticalAlign={verticalAlign} horizontalAlign={horizontalAlign}>{children}</Div>
    )
}

interface PropsType {
    children?: any,
    gap?: string,
    width?: string,
    verticalAlign?: string,
    horizontalAlign?: string
}

const Div = styled.div`
    display: flex;
    width: ${({width}: PropsType) => width || '100%'};
    gap: ${({gap}: PropsType) => gap || '20px'};
    align-items: ${({verticalAlign}: PropsType) => verticalAlign || 'flex-start'};
    justify-content: ${({horizontalAlign}: PropsType) => horizontalAlign || 'flex-start'};
    flex-wrap: wrap;
`;

export default Row