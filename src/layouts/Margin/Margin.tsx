import styled from "styled-components";

const Margin = ({top, right, bottom, left}: PropsType) => {
    return (
        <MarginView top={top} right={right} bottom={bottom} left={left}/>
    )
}

interface PropsType {
    top?: string,
    right?: string,
    bottom?: string,
    left?: string
}
const MarginView = styled.div`
    margin: ${({top, right, bottom, left}: PropsType) => `${top || 0} ${right || 0} ${bottom || 0} ${left || 0}`}
`;
export default Margin;