import { Signer, ethers } from "ethers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { NetworkId } from "src/networkDetails";
import { IERC20__factory, StakingContract__factory } from "src/typechain";
import { STAKING_ADDRESS, TOKEN_ADDRESS, TOKEN_DECIMALS } from "src/constants/const";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";
import { loadAccountDetails } from "./AccountSlice";
import { loadAppDetails } from "./AppSlice";
import { messages } from "src/constants/messages";
import { toast } from "react-hot-toast";
import { sleep } from "src/helpers/sleep";
import { metamaskErrorWrap } from "src/helpers/metamask-error-wrap";

interface IStake {
  tier: number;
  value: number;
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  signer: Signer;
  address: string;
  handleClose: () => void;
}

export const onApprove = createAsyncThunk(
  "mint/onApprove",
  async ({ tier, value, provider, signer, address, handleClose }: IStake, { dispatch }) => {
    if (!provider || !signer) {
      toast.error(messages.please_connect_wallet);
      return;
    }

    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, IERC20__factory.abi, signer);

    let tx;

    try {
      tx = await tokenContract.approve(STAKING_ADDRESS, ethers.utils.parseUnits(value.toString(), TOKEN_DECIMALS));

      dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Approving", type: "stake" }));
      await tx.wait();
      handleClose();
      toast.success(messages.tx_successfully_send);
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (tx) {
        dispatch(clearPendingTxn(tx.hash));
      }
    }
    await sleep(2);
    toast.success(messages.your_data_update_soon);
    await dispatch(loadAccountDetails({ provider, address }));
    await dispatch(loadAppDetails({ provider }));
    toast.success(messages.your_data_updated);
    return;
  },
);

export const onStake = createAsyncThunk(
  "mint/onStake",
  async ({ tier, value, provider, signer, address, handleClose }: IStake, { dispatch }) => {
    if (!provider || !signer) {
      toast.error(messages.please_connect_wallet);
      return;
    }

    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, signer);

    let tx;

    try {
      tx = await stakingContract.stake(tier, ethers.utils.parseUnits(value.toString(), TOKEN_DECIMALS));

      dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Staking", type: "stake" }));
      await tx.wait();
      handleClose();
      toast.success(messages.tx_successfully_send);
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (tx) {
        dispatch(clearPendingTxn(tx.hash));
      }
    }
    await sleep(2);
    toast.success(messages.your_data_update_soon);
    await dispatch(loadAccountDetails({ provider, address }));
    await dispatch(loadAppDetails({ provider }));
    toast.success(messages.your_data_updated);
    return;
  },
);

export const onRestake = createAsyncThunk(
  "stake/onRestake",
  async ({ tier, value, provider, signer, address, handleClose }: IStake, { dispatch }) => {
    if (!provider || !signer) {
      toast.error(messages.please_connect_wallet);
      return;
    }

    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, signer);

    let tx;

    try {
      tx = await stakingContract.claimReward(tier, true);

      dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Restaking", type: "stake" }));
      await tx.wait();
      handleClose();
      toast.success(messages.tx_successfully_send);
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (tx) {
        dispatch(clearPendingTxn(tx.hash));
      }
    }
    await sleep(2);
    toast.success(messages.your_data_update_soon);
    await dispatch(loadAccountDetails({ provider, address }));
    await dispatch(loadAppDetails({ provider }));
    toast.success(messages.your_data_updated);
    return;
  },
);

export const onClaim = createAsyncThunk(
  "stake/onClaim",
  async ({ tier, value, provider, signer, address, handleClose }: IStake, { dispatch }) => {
    if (!provider || !signer) {
      toast.error(messages.please_connect_wallet);
      return;
    }

    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, signer);

    let tx;

    try {
      tx = await stakingContract.claimReward(tier, false);

      dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Claiming", type: "claim" }));
      await tx.wait();
      handleClose();
      toast.success(messages.tx_successfully_send);
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (tx) {
        dispatch(clearPendingTxn(tx.hash));
      }
    }
    await sleep(2);
    toast.success(messages.your_data_update_soon);
    await dispatch(loadAccountDetails({ provider, address }));
    await dispatch(loadAppDetails({ provider }));
    toast.success(messages.your_data_updated);
    return;
  },
);

export const onUnstake = createAsyncThunk(
  "stake/onUnstake",
  async ({ tier, value, provider, signer, address, handleClose }: IStake, { dispatch }) => {
    if (!provider || !signer) {
      toast.error(messages.please_connect_wallet);
      return;
    }

    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, signer);

    let tx;

    try {
      tx = await stakingContract.unstake(tier);

      dispatch(fetchPendingTxns({ txnHash: tx.hash, text: "Unstaking", type: "unstake" }));
      await tx.wait();
      handleClose();
      toast.success(messages.tx_successfully_send);
    } catch (err: any) {
      return metamaskErrorWrap(err, dispatch);
    } finally {
      if (tx) {
        dispatch(clearPendingTxn(tx.hash));
      }
    }
    await sleep(2);
    toast.success(messages.your_data_update_soon);
    await dispatch(loadAccountDetails({ provider, address }));
    await dispatch(loadAppDetails({ provider }));
    toast.success(messages.your_data_updated);
    return;
  },
);