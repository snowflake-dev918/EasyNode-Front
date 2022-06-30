import styled from "styled-components"

const RoundCard = ({children, background, padding}: PropsType) => {
    return (
        <Container background={background} padding={padding}>
            {children}
        </Container>
    )
}

const Container = styled.section`
    background: ${(props:PropsType) => props.background || "var(--active-color)"};
    padding: ${(props:PropsType) => props.padding || ""};
    border-radius: 15px;
    width: 100%;
    border-color: var(--active-color);
    overflow: auto;
`;

interface PropsType {
    children: any,
    background?: string,
    padding?: string
}
export default RoundCard