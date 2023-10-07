import { NetworkId } from "src/constants";

export type AddressMap = Partial<Record<NetworkId, string>>;

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const STAKING_ADDRESS = "0xfB6CCC111C14b7A8323AA7804D06ce4D8dD2D566";
// export const STAKING_ADDRESS = "0x41E84ec7Bd97CcDA0De84494B4EC75E8734334dd";
export const TOKEN_ADDRESS = "0xc4b9e806858b1085939a259657e51f8e50196a0a";
export const MULTICALL_ADDRESS = "0x53e5228054875Ecd43e5B9ecDDA0E992A169c89e";

export const RPC_URL = "https://mainnet.base.org";
export const EXPLORER_URL = "https://basescan.org/address/";

export const DEFAULT_NETWORK = 8453;
export const TOKEN_DECIMALS = 15;

