import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import {
  useCall,
  useContractCall,
  useContractFunction,
  useEthers,
} from '@usedapp/core';
import tokenContractJSON from '../abi/EasyToken.json';

const contractAddress = tokenContractJSON.address;
const contractABI = tokenContractJSON.abi;

const tokenContractInterface = new ethers.utils.Interface(contractABI);
const tokenContract = new Contract(contractAddress, tokenContractInterface);

export const useBalanceOf = (address: string) => {
  const { value, error } =
    useCall(
      address && {
        contract: tokenContract,
        method: 'balanceOf',
        args: [address],
      }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export const useGetNodesNames = () => {
  const { library, account } = useEthers();
  const [nodesNames, setNodesNames] = useState('');

  useEffect(() => {
    const getNodesNames = async () => {
      if (library && account) {
        const signer = library.getSigner();
        // signer.address = account;
        const easyToken = new ethers.Contract(
          contractAddress,
          tokenContractInterface,
          signer
        );

        try {
          const nodes = await easyToken.getNodesNames();
          setNodesNames(nodes);
        } catch (e) {
          setNodesNames('');
        }
      }
    };

    getNodesNames();
  });
  return nodesNames;
};

export const useGetNodesRewards = () => {
  const { library, account } = useEthers();
  const [nodesRewards, setNodesRewards] = useState('0');

  useEffect(() => {
    const getNodesRewards = async () => {
      if (library && account) {
        const signer = library.getSigner();
        // signer.address = account;
        const easyToken = new ethers.Contract(
          contractAddress,
          tokenContractInterface,
          signer
        );

        try {
          const rewards = await easyToken.getNodesRewards();
          setNodesRewards(rewards);
        } catch (e) {
          setNodesRewards('0');
        }
      }
    };

    getNodesRewards();
  });

  return nodesRewards;
};

export const useGetNodesCreatime = () => {
  const { library, account } = useEthers();
  const [nodesCreatime, setNodesCreatime] = useState('0');

  useEffect(() => {
    const getNodesCreatime = async () => {
      if (library && account) {
        var signer = library.getSigner();
        // signer.address = account;

        const easyToken = new ethers.Contract(
          contractAddress,
          tokenContractInterface,
          signer
        );

        try {
          const creatime = await easyToken.getNodesCreatime();
          setNodesCreatime(creatime);
        } catch (e) {
          setNodesCreatime('0');
        }
      }
    };

    getNodesCreatime();
  });

  return nodesCreatime;
};

export const useGetRewardAmount = () => {
  const { library, account } = useEthers();
  const [getAmount, setGetAmount] = useState(0);
  useEffect(() => {
    const getRewardAmount = async () => {
      if (library && account) {
        var signer = library.getSigner();
        // signer.address = account;

        const easyToken = new ethers.Contract(
          contractAddress,
          tokenContractInterface,
          signer
        );

        try {
          const amount = await easyToken.getRewardAmount();
          setGetAmount(amount);
        } catch (e) {
          setGetAmount(0);
        }
      }
    };
    getRewardAmount();
  });

  return getAmount;
};

export const useGetNodeNumberOf = (account: string | undefined | null) => {
  const { value, error } =
    useCall(
      account && {
        contract: tokenContract,
        method: 'getNodeNumberOf',
        args: [account],
      }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0] || BigNumber.from(0);
};

export const useGetNodePrice = () => {
  const { value, error } =
    useCall({
      contract: tokenContract,
      method: 'getNodePrice',
      args: [],
    }) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export const useGetTotalCreatedNodes = () => {
  const { value, error } =
    useCall({
      contract: tokenContract,
      method: 'getTotalCreatedNodes',
      args: [],
    }) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0] || BigNumber.from(0);
};

export const useGetRewardPerNode = () => {
  const { value, error } =
    useCall({
      contract: tokenContract,
      method: 'getRewardPerNode',
      args: [],
    }) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};

export const useCashoutAll = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'cashoutAll',
    {}
  );

  return { state, send };
};

export const useCashoutSpecificReward = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'cashoutSpecificReward',
    {}
  );

  return { state, send };
};

export const useApprove = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'approve',
    {}
  );

  return { state, send };
};

export const useCreateNodeWithTokens = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'createNodeWithTokens',
    {}
  );

  return { state, send };
};

export const useCompound = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'compound',
    {}
  );
  return { state, send };
};
export const useTransfer = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'transfer',
    {}
  );
  return { state, send };
};
export const useTransferNode = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'transferNode',
    {}
  );
  return { state, send };
};

export const useChangeNodeName = () => {
  const { state, send } = useContractFunction(
    tokenContract,
    'renameNode',
    {}
  );
  return { state, send };
}

export const useGetMyNodes = () => {
  const nodesNames = useGetNodesNames();
  const nodesCreatime = useGetNodesCreatime();
  const nodesRewards = useGetNodesRewards();

  const names = nodesNames.split('#');
  const times = nodesCreatime.split('#');
  const rewards = nodesRewards.split('#');
  const nodeList = names.map((name, index) => {
    return {
      name: name,
      time: times[index],
      reward: rewards[index] && parseFloat(ethers.utils.formatEther(BigNumber.from(rewards[index]))).toFixed(2),
    };
  });

  return nodeList;
}