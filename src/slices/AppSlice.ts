import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { STAKING_ADDRESS, TOKEN_DECIMALS } from "src/constants/const";
import { setAll } from "src/helpers";
import { multicall } from "src/helpers/multicall";
import { IBaseAsyncThunk } from "src/slices/interfaces";
import { RootState } from "src/store";
import { StakingContract__factory } from "src/typechain";

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ provider }: IBaseAsyncThunk, { dispatch }) => {
    const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, provider);

    const totalStaked = Math.round(Number(await stakingContract.totalStaked()) / Math.pow(10, TOKEN_DECIMALS));

    let calls_staked = [];

    for (let i = 0; i < 4; i++) {
      calls_staked.push({
            address: STAKING_ADDRESS,
            name: 'stakedBalance',
            params: [i]
        })
    }

    const [[stakedBalance0], [stakedBalance1], [stakedBalance2], [stakedBalance3]] = await multicall(StakingContract__factory.abi as any, calls_staked, provider);
    const stakedBalance = [
      Math.round(Number(stakedBalance0) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance1) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance2) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakedBalance3) / Math.pow(10, TOKEN_DECIMALS)),
    ];

    let calls_minimum = [];

    for (let i = 0; i < 4; i++) {
      calls_minimum.push({
            address: STAKING_ADDRESS,
            name: 'stakingThresholds',
            params: [i]
        })
    }

    const [[stakingThresholds0], [stakingThresholds1], [stakingThresholds2], [stakingThresholds3]] = await multicall(StakingContract__factory.abi as any, calls_minimum, provider);
    const stakingThresholds = [
      Math.round(Number(stakingThresholds0) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakingThresholds1) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakingThresholds2) / Math.pow(10, TOKEN_DECIMALS)),
      Math.round(Number(stakingThresholds3) / Math.pow(10, TOKEN_DECIMALS)),
    ];

    let calls_percent = [];

    for (let i = 0; i < 4; i++) {
      calls_percent.push({
            address: STAKING_ADDRESS,
            name: 'rewardPercentages',
            params: [i]
        })
    }

    const [[rewardPercentages0], [rewardPercentages1], [rewardPercentages2], [rewardPercentages3]] = await multicall(StakingContract__factory.abi as any, calls_percent, provider);
    const rewardPercentages = [
      Math.round(Number(rewardPercentages0)),
      Math.round(Number(rewardPercentages1)),
      Math.round(Number(rewardPercentages2)),
      Math.round(Number(rewardPercentages3)),
    ];

    let calls_locks = [];

    for (let i = 0; i < 4; i++) {
            calls_locks.push({
            address: STAKING_ADDRESS,
            name: 'lockTimestamp',
            params: [i]
        })
    }

    const [[lockTimestamp0], [lockTimestamp1], [lockTimestamp2], [lockTimestamp3]] = await multicall(StakingContract__factory.abi as any, calls_locks, provider);
    const lockTimestamp = [
      Math.round(Number(lockTimestamp0)),
      Math.round(Number(lockTimestamp1)),
      Math.round(Number(lockTimestamp2)),
      Math.round(Number(lockTimestamp3)),
    ];

    return {
      totalStaked,
      stakedBalance,
      stakingThresholds,
      lockTimestamp,
      rewardPercentages
    };
  },
);

export interface IAppData {
  loading: boolean;
  totalStaked?: number;
  stakedBalance?: number[];
  stakingThresholds?: number[];
  lockTimestamp?: number[];
  rewardPercentages?: number[];
}

const initialState: IAppData = {
  loading: false
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
