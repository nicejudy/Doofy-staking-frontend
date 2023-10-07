import { useState } from "react"
import Button from "src/components/button";
import CardHover from "src/components/cardHover";

import StakingItemStyleWrapper from "./StakingItem.style"
import backIcon from "src/assets/images/icons/x.svg"
import { useAppSelector } from "src/hooks";
import { onStake, onUnstake, onClaim, onRestake, onApprove } from "src/slices/StakeSlice";
import { isPendingTxn } from "src/slices/PendingTxnsSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { messages } from "src/constants/messages";
import { ethers } from "ethers";
import { Providers } from "src/helpers/providers/Providers/Providers";
import { DEFAULT_NETWORK } from "src/constants/const";
import { useAccount, useSigner } from "wagmi";

const StakingItem = ({
    id,
    title,
    icon,
    end,
    apy,
    tvl,
    minimumLocked,
    stake,
    Rewards,
    amountStaked,
    balance
}) => {

    const dispatch = useDispatch();

    const provider = Providers.getStaticProvider(DEFAULT_NETWORK);
    const { data: signer } = useSigner();
    const { address = "", isConnected, isReconnecting } = useAccount();

    const isAppLoading = useAppSelector(state => Boolean(state.app.loading));
    const lockTimestamp = useAppSelector(state => state.app.lockTimestamp);
    const isAccountLoading = useAppSelector(state => Boolean(state.account.loading));
    const stakedBalance = useAppSelector(state => state.app.stakedBalance);
    const stakingThresholds = useAppSelector(state => state.app.stakingThresholds);
    const rewardPercentages = useAppSelector(state => state.app.rewardPercentages);
    const stakedAmount = useAppSelector(state => state.account.stakedBalance);
    const tokenBalance = useAppSelector(state => state.account.tokenBalance);
    const approvedBalance = useAppSelector(state => state.account.approvedBalance);
    const lastClaimed = useAppSelector(state => state.account.lastClaimed);

    const timeUntil = lastClaimed && lockTimestamp ? Math.floor(lastClaimed[id] + lockTimestamp[id] - Date.now() / 1000) : 0;

    const pendingTransactions = useSelector(state => state.pendingTransactions);

    const [stakeAmount, setStakeAmount] = useState(0)

    const isInsufficientBalance = !!tokenBalance && tokenBalance < stakeAmount;
    const isLessThanThreshold = !!stakingThresholds && stakingThresholds[id] > stakeAmount;
    const buttonTextForStake = isInsufficientBalance ? 
        "Insufficient Balance" : isLessThanThreshold ? 
            "Less than Thresholds" : approvedBalance && stakeAmount <= approvedBalance ? 
                "Stake" : "Approve";

    const handleStake = async (action) => {
        console.log(stakingThresholds[id])
        console.log(stakeAmount)
        if (action === "stake") {
            if (approvedBalance !== undefined && approvedBalance < stakeAmount) {
                dispatch(
                    onApprove({
                        tier: 0,
                        value: stakeAmount,
                        provider,
                        signer,
                        address,
                        handleClose: () => {}
                    })
                );
            } else {
                dispatch(
                    onStake({
                        tier: id,
                        value: stakeAmount,
                        provider,
                        signer,
                        address,
                        handleClose: () => {setStakeAmount(0);}
                    })
                );
            }
        }

        if (action == "unstake") {
            dispatch(
                onUnstake({
                    tier: id,
                    value: 0,
                    provider,
                    signer,
                    address,
                    handleClose: () => {}
                })
            );
        }

        if (action == "claim") {
            dispatch(
                onClaim({
                    tier: id,
                    value: 0,
                    provider,
                    signer,
                    address,
                    handleClose: () => {}
                })
            );
        }

        if (action == "restake") {
            dispatch(
                onRestake({
                    tier: id,
                    value: 0,
                    provider,
                    signer,
                    address,
                    handleClose: () => {}
                })
            );
        }
    }

    const [isFlip, setFlip] = useState(false)

    const handleFlip = (e) => {
        e.preventDefault()
        setFlip(false)
        setFlip(true)
    }

    return (
        <StakingItemStyleWrapper>
            <div className={`staking_flip_card_inner ${isFlip === true ? 'active' : ''}`}>
                <div className="staking_flip_card_front">
                    <div className="staking_flip_card_front_headings">
                        <h2>{title}</h2>
                        <span><img src={icon} alt="icon" /></span>
                    </div>
                    <div className="staking_flip_card_front_body">
                        <div className="staking_flip_card_front_timebg">
                            <span>{end} days</span>
                        </div>
                        <div className="staking_apy">
                            <h3>{apy} APY</h3>
                        </div>
                        <ul className="staking_flip_card_front_list">
                            <li><span>TVL</span> <strong>{stakedBalance ? stakedBalance[id] : 0} DOF</strong></li>
                            <li><span>Minimum Locked</span> <strong>{stakingThresholds ? stakingThresholds[id] : 0} DOF</strong></li>
                            <li><span>You Staked</span> <strong>{stakedAmount ? stakedAmount[id] : 0} DOF</strong></li>
                        </ul>
                        <div className="staking_flip_card_front_buttons">
                            <Button variant="blue" onClick={handleFlip} disabled={isPendingTxn(pendingTransactions, "stake")}>
                                stake
                            </Button>
                            <Button variant="dark" onClick={() => handleStake("unstake")} disabled={isPendingTxn(pendingTransactions, "unstake")}>
                                unstake
                            </Button>
                        </div>
                        <div className="staking_flip_card_front_time">
                            <h6>Rewards</h6>
                            <h5>{stakedAmount && rewardPercentages ? Math.round(stakedAmount[id] * rewardPercentages[id] / 10000) : 0} DOF</h5>
                        </div>
                        <div className="staking_flip_card_front_reward">
                            <h6>Time Left until Claim</h6>
                            <h5>{timeUntil > 0 ? timeUntil : 0}s</h5>
                        </div>
                        <div className="staking_flip_card_front_buttons flip_card_btn">
                            <Button variant="dark" onClick={() => handleStake("restake")} disabled={isPendingTxn(pendingTransactions, "restake")}>
                                Restake
                            </Button>
                            <Button variant="dark" onClick={() => handleStake("claim")} disabled={isPendingTxn(pendingTransactions, "claim")}>
                                Withdraw
                            </Button>
                        </div>
                    </div>
                </div>

                {/* card back */}
                <div className="staking_flip_card_back">
                    <div className="staking_flip_card_back_content active-shape">
                        <div className="staking_flip_card_back_overlay"></div>
                        <div className="staking_flip_card_back_headings">
                            <h2>Stake</h2>
                            <button className="staking_flip_card_close_btn" onClick={() => setFlip(false)}><img src={backIcon} alt="icon" /></button>
                        </div>
                        <div className="staking_flip_card_back_body">
                            <div className="staking_flip_card_back_body_top">
                                <div className="staking_flip_card_front_list">
                                    <ul>
                                        <li><span>Amount staked</span> <strong>{stakedAmount ? stakedAmount[id] : 0} DOF</strong></li>
                                        <li><span>Balance</span> <strong>{tokenBalance ? tokenBalance : 0} DOF</strong></li>
                                    </ul>
                                </div>

                                <div className="staking_flip_card_back_form">
                                    <span>Stake Amount</span>
                                    <div className="staking_flip_card_back_form_input">
                                        <input 
                                            type="number"
                                            placeholder="0.00"
                                            value={stakeAmount ? stakeAmount : ""}
                                            onChange={e => setStakeAmount(e.target.value)}
                                        />
                                        <button
                                            disabled={isPendingTxn(pendingTransactions, "stake")}
                                            onClick={() => {setStakeAmount(tokenBalance ? tokenBalance : 0);}}
                                        >
                                            Max
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="staking_flip_card_back_approve_btn">
                                <Button
                                    variant="blue"
                                    disabled={isInsufficientBalance || isLessThanThreshold}
                                    onClick={() => {handleStake("stake")}}
                                >
                                    {buttonTextForStake}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <CardHover />
                </div>
            </div>
        </StakingItemStyleWrapper>
    )
}

export default StakingItem;