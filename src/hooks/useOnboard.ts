import Onboard from 'bnc-onboard';
import { API, Subscriptions } from 'bnc-onboard/dist/src/interfaces';
import {NETWORK_ID, RPC_URL} from '../configs/config';

const useOnboard = (subscribers: Subscriptions): API => {
    const onboard = Onboard({
        // dappId: BLOCKNATIVE_KEY,
        networkId: NETWORK_ID,
        subscriptions: {
          ...subscribers
        }
    });

    return onboard;
}

export default useOnboard;