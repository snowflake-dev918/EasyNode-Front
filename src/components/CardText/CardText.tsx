import styled from "styled-components"

const CardText = ({text, size, color}: PropsType) => {
    return (
        <Text size={size} color={color}>{text}</Text>
    )
}

const Text = styled.span`
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({color}:PropsType) => color || 'white'};
    font-size: ${({size}: PropsType) => size || '1.5rem'};
`

interface PropsType {
    text?: string | number,
    size?: string,
    color?: string
}


export default CardText