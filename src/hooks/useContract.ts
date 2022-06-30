import { Contract, ContractInterface } from "ethers"
import { Signer } from "ethers";

const useContract = (address: string, abi: ContractInterface, signer?: Signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
}

export default useContract;