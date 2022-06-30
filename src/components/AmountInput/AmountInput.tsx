import styled from "styled-components"

const AmountInput = ({addOnText, width, height, fontSize, onAddonClick, placeHolder}: PropsType) => {
    return (
        <InputGroup className="mb-3" width={width} height={height} fontSize={fontSize}>
            <FormControl
                placeholder={placeHolder}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <AddOn id="basic-addon2" onClick={onAddonClick}>{addOnText || 'Max'}</AddOn>
        </InputGroup>
    )
}

const InputGroup = styled.div`
    display: flex;
    height: ${({height}: PropsType) => height || '40px'};
    align-items: center;
    width: ${({width}: PropsType) => width || '100%'};
    border-radius: 10px;
    overflow: hidden;
    font-size: ${({fontSize}: PropsType) => fontSize || '1rem'};
    --borderColor: #517c76;
    border: 1px solid var(--borderColor);
`

const FormControl = styled.input`
    flex: 1;
    height: 100%;
    color: white;
    background: transparent;
    outline: none;
    border: none;
    font-size: inherit;
    padding: 5px 10px;
`;

const AddOn = styled.div`
    padding: 5px 10px;
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-left: 1px solid var(--borderColor);
    cursor: pointer;
`

interface PropsType {
    width?: string,
    height?: string,
    addOnText?: string,
    fontSize?: string,
    fontColor?: string,
    onAddonClick?: () => void,
    placeHolder?: string
}


export default AmountInput