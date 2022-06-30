import React, { useState } from 'react';
import styled from 'styled-components';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { API, Subscriptions, Wallet } from 'bnc-onboard/dist/src/interfaces';
import { ethers } from 'ethers';
import useOnboard from '../../hooks/useOnboard';
import { displayAddress } from '../../utils/helpers';
// import ethIcon from '../../assets/media/eth.png';

const ConnectButton = () => {
    const { account, deactivate, activate } = useEthers();

    const onboardSubscriber: Subscriptions = {
        wallet: async (wallet: Wallet) => {
            console.log('wallet: ', wallet)
            await onboard.walletCheck();
            if (wallet && wallet.provider) {
                await activate(wallet.provider);
            }
        }
    }

    const onboard = useOnboard(onboardSubscriber);
    const etherBalance = useEtherBalance(account)

    const connectWallet = async () => {
        await onboard.walletSelect();
    }

    const onBtnClick = () => {
        if (account) {
            deactivate();
        } else {
            connectWallet();
        }
    }


    return (
        <>
            <Button onClick={(e) => {e.stopPropagation(); onBtnClick()}}>{!account ? 'Connect' : displayAddress(account)}</Button>
        </>
    )
}

const Button = styled.button`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--highlight-color);
    padding: 20px;
    color: white;
    font-size: 18px;
    font-family: 'Poppins';
    position: relative;
    border: 2px solid transparent;
    border-radius: 16px;
    background-clip: padding-box;
    padding: 10px;
    cursor: pointer;
    transition: all;
    @media(max-width: 991px) {
        padding: 5px;
        width: 100px;
        font-size: 16px;
        border-radius: 12px;
    }
    &: hover {
        background: #df3f3d7a;
        content: "Disconnect";
    }
    &:after {
        position: absolute;
        top: -2px; bottom: -2px;
        left: -2px; right: -2px;
        background: linear-gradient(#6A4EE8, #FF9B63);
        content: '';
        z-index: -1;
        border-radius: 16px;
        @media(max-width: 991px) {
            border-radius: 12px;
        }
    }
`
const AccountView = styled.div`
    width: fit-content;
    display: flex;
    color: white;
    gap: 5px;
    border-radius: 12px;
    background: #444444;
    padding: 8px;
    cursor: pointer;
    &: hover {
        bordr-color: white;
    }
    img {
        width: 32px;
        padding: 5px;
        background: #333333;
        border-radius: 8px;
    }
    div {
        display: block;
    }
    span {
        display: block;
    }
    .account {
        font-size: 11px;
        color: #ccc;
    }
    .balance {
        font-size: 13px;
    }

`;
    export default ConnectButton;