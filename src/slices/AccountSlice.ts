import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { STAKING_ADDRESS, TOKEN_ADDRESS, TOKEN_DECIMALS } from "src/constants/const";
import { setAll } from "src/helpers";
import { multicall } from "src/helpers/multicall";
import { IBaseAddressAsyncThunk } from "src/slices/interfaces";
import { RootState } from "src/store";
import { IERC20__factory, StakingContract__factory } from "src/typechain";

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {

    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, provider);
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, IERC20__factory.abi, provider);

    const tokenBalance = Math.round(Number(await tokenContract.balanceOf(address)) / Math.pow(10, TOKEN_DECIMALS));
    const approvedBalance = Math.round(Number(await tokenContract.allowance(address, STAKING_ADDRESS)) / Math.pow(10, TOKEN_DECIMALS));

    let calls_staked = [];

    for (let i = 0; i < 4; i++) {
        calls_staked.push({
            address: STAKING_ADDRESS,
            name: 'balances',
            params: [i, address]
        })
    }

    const [[stakedBalance0], [stakedBalance1], [stakedBalance2], [stakedBalance3]] = await multicall(StakingContract__factory.abi as any, calls_staked, provider);
    const stakedBalance = [
      Math.round(Number(stakedBalance0) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance1) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance2) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance3) / Math.pow(10, TOKEN_DECIMALS)),
    ];

    let calls_times = [];

    for (let i = 0; i < 4; i++) {
        calls_times.push({
            address: STAKING_ADDRESS,
            name: 'lastClaimed',
            params: [i, address]
        })
    }

    const [[lastClaimed0], [lastClaimed1], [lastClaimed2], [lastClaimed3]] = await multicall(StakingContract__factory.abi as any, calls_times, provider);
    const lastClaimed = [
      Math.round(Number(lastClaimed0)),
      Math.round(Number(lastClaimed1)),
      Math.round(Number(lastClaimed2)),
      Math.round(Number(lastClaimed3)),
    ];

    const totalStakedAmount = Math.round(Number(await stakingContract.stakerAmounts(address)) / Math.pow(10, TOKEN_DECIMALS));

    return {
      tokenBalance,
      approvedBalance,
      stakedBalance,
      lastClaimed,
      totalStakedAmount
    };
  },
);

export interface IAccountSlice {
  loading: boolean;
  tokenBalance?: number;
  approvedBalance?: number;
  stakedBalance?: number[];
  lastClaimed?: number[];
  totalStakedAmount?: number;
}

const initialState: IAccountSlice = {
  loading: false
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
