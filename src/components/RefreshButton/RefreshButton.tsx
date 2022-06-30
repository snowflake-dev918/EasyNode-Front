import { useState } from 'react';
import styled from 'styled-components';
import icon from '../../assets/image/refresh.svg';
import loadingIcon from '../../assets/image/loading.gif';

const RefreshButton = () => {
    const [loading, setloading] = useState(false);
    const onClick = () => {
        setloading(!loading);
    }

    return (
        <Button onClick={onClick} loading={loading}>
            <Image src={!loading ? icon: loadingIcon}/>
        </Button>
    )
}

const Button = styled.button`
    background: var(--active-color);
    border-color: var(--primary-color);
    color: #f2f2f2;
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.5;
    padding: ${({loading}: BTNType) => loading ? '0' : '0.75rem'};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-decoration: none;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    border: 1px solid transparent;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:hover {
        background: #222a3c;
    }
`;
interface BTNType {
    loading: boolean
}
const Image = styled.img`
    width: 100%;
    height: 100%;
`
export default RefreshButton