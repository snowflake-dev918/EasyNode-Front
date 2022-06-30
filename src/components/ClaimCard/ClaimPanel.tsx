import styled from "styled-components"
import Row from "../../layouts/Row/Row"
import CardText from "../CardText/CardText"
import feedImage from '../../assets/image/feed.svg';
import RoundButton from "../RoundButton/RoundButton";
import Margin from "../../layouts/Margin/Margin";

const ClaimPanel = () => {
    const estDailyFeed = 0;
    return (
        <Wrapper>
           
            <Row verticalAlign={'center'} gap={'5px'} horizontalAlign={'center'}>
                <CardText text={estDailyFeed.toFixed(3)} size={'35px'} color={'white'}/>
                <Image src={feedImage} />
            </Row>
            <CardText text={'YOUR CLAIMABLE FEED'} size={'15px'} color={'var(--highlight-color)'}/>
            <Margin top={'40px'}/>
           
            <RoundButton width={'100%'}>Claim</RoundButton>
            <Margin top={'10px'}/>
            <RoundButton reverse={true} width={'100%'}>Claim and Unstake All Egg</RoundButton>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
    padding: 2rem;
`
const Image = styled.img`
    width: 30px;
    height: 30px;
`;

export default ClaimPanel