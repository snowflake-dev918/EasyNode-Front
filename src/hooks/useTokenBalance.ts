import useContract from "./useContract";
import tokenContractABI from '../abi/EasyToken.json';
import { useCall } from "@usedapp/core";

const useTokenBalance = (address: string) => {
    const contract = useContract(tokenContractABI.address, tokenContractABI.abi);

    const { value, error } =
      useCall(
        address && {
          contract: contract,
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

export default useTokenBalance