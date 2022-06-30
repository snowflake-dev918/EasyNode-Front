import styled from "styled-components"

const RoundButton = ({children, disable, color, size, onClick, reverse, width, height}: PropsType) => {
    return (
        <Button color={color} disabled={disable} size={size} onClick={onClick} reverse={reverse} width={width} height={height}>
            {children}
        </Button>
    )
}

const Button = styled.button`
    width: ${(({width}: PropsType) => width || 'fit-content')};;
    height: ${(({height}: PropsType) => height || '35px')};;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(({color, reverse}: PropsType) => !reverse ? (color || 'white') : 'var(--highlight-color)')};
    font-size: ${(({size}: PropsType) => size || '1rem')};
    opacity: ${(({disable}: PropsType) => disable ? 0.65 : 1)};
    background: ${({reverse}: PropsType) => reverse ? 'transparent' :  'var(--highlight-color)'};
    border: 1px solid ${({reverse}: PropsType) => !reverse ? 'transparent' :  'var(--highlight-color)'};
    border-radius: 50rem;
    cursor: pointer;
    transition: all 0.5s;
    padding: 5px 15px;
    &:hover {
        background: ${(({reverse}: PropsType) => !reverse ? '#df3f3d7a' : '#df3f3d22')};
    }
`

interface PropsType {
    children?: any,
    disable?: boolean,
    color?: string,
    size?: string,
    onClick?: () => void,
    reverse?: boolean,
    width?: string,
    height?: string
}

export default RoundButton