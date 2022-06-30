import styled from "styled-components";

const CustomInput = ({type, value, onChange, width, height, fontColor, fontSize, placeHolder }:PropsType) => {
    return (
        <InputGroup className="mb-3" width={width} height={height} fontSize={fontSize}>
            <FormControl
                placeholder={placeHolder || 'Enter Value'}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={onChange}
                value={value}
                type={type}
            />
        </InputGroup>
    )
}

const InputGroup = styled.div`
    display: flex;
    height: ${({height}: InputPropsType) => height || '40px'};
    align-items: center;
    width: ${({width}: InputPropsType) => width || '100%'};
    border-radius: 10px;
    overflow: hidden;
    font-size: ${({fontSize}: InputPropsType) => fontSize || '1rem'};
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

interface PropsType {
    type: string,
    value: any,
    onChange: (e: any) => void,
    width?: string,
    height?: string,
    addOnText?: string,
    fontSize?: string,
    fontColor?: string,
    placeHolder?: string
}

interface InputPropsType {
    width?: string,
    height?: string,
    addOnText?: string,
    fontSize?: string,
    fontColor?: string,
    placeHolder?: string
}


export default CustomInput