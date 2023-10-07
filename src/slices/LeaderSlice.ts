import { ethers } from "ethers";
import { STAKING_ADDRESS } from "src/constants/const";
import { multicall } from "src/helpers/multicall";
import { StakingContract__factory } from "src/typechain";
import { IBaseAsyncThunk } from "./interfaces";

export const loadAccountDetails = async ({ provider }: IBaseAsyncThunk) => {
  const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract__factory.abi, provider);
  const stakerList = await stakingContract.getStakerList();

    let calls_stakers = [];

    for (let i = 0; i < stakerList.length; i++) {
        calls_stakers.push({
            address: STAKING_ADDRESS,
            name: 'stakerAmounts',
            params: [stakerList[i]]
        })
    }

    const stakerAmounts = await multicall(StakingContract__factory.abi as any, calls_stakers, provider);

  return {
    stakerList,
    stakerAmounts
  };
};