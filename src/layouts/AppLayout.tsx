import styled from 'styled-components';
import Header from "../components/Header/Header";
import BG from '../assets/image/sky.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = ({children}: PropsType) => {

    return (
        <AppWrapper background={BG}>
            <Header />
            <ContentWrapper>
            {
                children
            }
            </ContentWrapper>
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              icon={true}
              theme={'colored'}
              pauseOnHover={false}
              rtl={false}
            />
        </AppWrapper>
    )
}

interface PropsType {
    children: any
}

interface AppPropsType {
    background: any
}

export default AppLayout;

const AppWrapper = styled.div`
    width: 100%;
    display: flex;
    background-image: url(${(props: AppPropsType) => props.background});
    flex-direction: column;
    align-items: center;
    height: fit-content;
    position: relative;
    background-size: contain;
    min-height: 100vh;
    background-size: cover;
`;

const ContentWrapper = styled.div`
    z-index: 1;
    width: 100%;
    padding: 100px 5% 100px 5%;
    max-width: var(--max-width);
    min-height: 100vh;
`

