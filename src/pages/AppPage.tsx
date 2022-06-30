import styled from 'styled-components';
import Column from '../layouts/Column/Column';
import RefreshButton from '../components/RefreshButton/RefreshButton';
import RoundCard from '../layouts/RoundCard/RoundCard';
import Row from '../layouts/Row/Row';
import SectionTitle from '../components/SectionTitle/SectionTitle';
import ClaimCard from '../components/ClaimCard/ClaimCard';
import CardText from '../components/CardText/CardText';
import { useEthers, useTokenBalance } from '@usedapp/core';
import { useCashoutAll, useCreateNodeWithTokens, useGetNodeNumberOf, useGetNodePrice, useGetNodesRewards, useGetRewardAmount, useGetRewardPerNode, useGetTotalCreatedNodes } from '../hooks';
import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import RoundButton from '../components/RoundButton/RoundButton';
import CustomInput from '../components/CustomInput/CustomInput';
import NodeListTable from '../components/NodeListTable/NodeListTable';
import { toast } from 'react-toastify';
import { NETWORK_ID } from '../configs/config';
import useMarketcap from '../hooks/useMarketcap';
import useTokenPrice from '../hooks/useTokenPrice';

import EasyABI from '../abi/EasyToken.json';

const AppPage = () => {
    const [newNodeName, setNewNodeName] = useState<string>('');

    const {account, chainId} = useEthers();
    const myNodeCount = useGetNodeNumberOf(account);
    const myRewardAmount = useGetRewardAmount();
    const totalNodeCount = useGetTotalCreatedNodes();
    const rewardPerNode = useGetRewardPerNode();

    const {state, send: createNodeWithToken} = useCreateNodeWithTokens();
    const { state: cashoutAllState, send: cashoutAll } = useCashoutAll();
    const marketCap = useMarketcap();
    const tokenPrice = useTokenPrice();
    const nodePrice = useGetNodePrice();
    const myEasyBalance = useTokenBalance(EasyABI.address, account);
    const nodeCountLimit = 1000;

    const [processing, setProcessing] = useState(false);
    const createNode = () => {
        createNodeWithToken(newNodeName);
    }

    const claimToken = async () => {
        if (!account) {
          toast.warning('Please Connect Wallet!');
          return;
        }
        if (NETWORK_ID !== chainId) {
          toast.warning('Please Select Correct Network!');
          return;
        }
    
        try {
          setProcessing(true);
          cashoutAll();
          
        } catch (e: any) {
          toast.warning(e.message);
          setProcessing(false);
        }
    };
    return (
        <Wrapper>
           <Row >
            <RoundCard padding="30px">
                <Row horizontalAlign="space-between" width="100%">
                    <Column width="0" horizontalAlign="center">
                        <CardText text="Total Nodes" size="28px" color="red"/>
                        <CardText text={totalNodeCount?.toNumber()} size="20px" color="white"/>
                    </Column>
                    <Column width="0" horizontalAlign="center">
                        <CardText text="Market Cap" size="28px" color="red"/>
                        <CardText text={new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(marketCap)} size="20px" color="white"/>
                    </Column>
                    <Column width="0" horizontalAlign="center">
                        <CardText text="$EASY Price" size="28px" color="red"/>
                        <CardText text={new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(tokenPrice.toNumber())} size="20px" color="white"/>
                    </Column>
                </Row>
            </RoundCard>
           </Row>
            <Row>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CardText text="Balance" />
                            <CardText text={ethers.utils.formatEther(myEasyBalance || BigNumber.from(0)) + "$EASY"} color={'red'}/>
                            <CardText text={`(${new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(parseFloat(ethers.utils.formatEther(tokenPrice.mul(myEasyBalance || BigNumber.from(0)))))})`} />
                            <RoundButton>Buy $EASY</RoundButton>                            
                        </FlexColumn>
                    </RoundCard>
                </Column>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CardText text="My Nodes" />
                            <CardText text={`${myNodeCount?.toNumber()} / ${nodeCountLimit}`} color={'red'}/>
                            <CardText text={`1 Node = ${ethers.utils.formatEther(nodePrice || BigNumber.from(0))} $EASY`} />
                            <RoundButton onClick={() => createNode()}>Create New Node</RoundButton>
                        </FlexColumn>
                    </RoundCard>
                </Column>
                <Column width={'0'} minWidth={'250px'} maxWidth={'500px'}>
                    <RoundCard padding="30px">
                        <FlexColumn>
                            <CardText text="My rewards" />
                            <CardText text={ `${ethers.utils.formatEther(myRewardAmount)} $EASY`} color={'red'}/>
                            <CardText text={`Daily/Node = ${ethers.utils.formatEther(rewardPerNode || BigNumber.from(0))}$EASY`} />
                            <RoundButton onClick={() => claimToken()}>Claim $EASY</RoundButton>
                        </FlexColumn>
                    </RoundCard>
                </Column>
            </Row>

            <Row>
                <RoundCard padding="30px">
                    <SectionTitle color={'red'} text={'My Nodes'} size={'1.8rem'}/>
                    <NodeListTable />
                </RoundCard>
            </Row>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

const SectinoHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export default AppPage;