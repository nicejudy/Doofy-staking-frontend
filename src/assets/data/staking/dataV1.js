import stakeIcon1 from "src/assets/images/icons/tier_icon3.png";
import stakeIcon2 from "src/assets/images/icons/tier_icon6.png";
import stakeIcon3 from "src/assets/images/icons/tier_icon5.png";
import stakeIcon4 from "src/assets/images/icons/tier_icon1.png"; // Add the Diamond tier icon

const data = [
  {
    id: 0,
    title: "Bronze",
    icon: stakeIcon1,
    end: "15",
    apy: "15%",
    tvl: "191707.58",
    minimumLocked: "50.00",
    stake: "0.00",
    Rewards: "0.00",
    amountStaked: "268.00",
    balance: "50.00",
  },
  {
    id: 1,
    title: "Silver",
    icon: stakeIcon2,
    end: "30",
    apy: "20%",
    tvl: "171707.58",
    minimumLocked: "20.00",
    stake: "0.00",
    Rewards: "0.00",
    amountStaked: "268.00",
    balance: "50.00",
  },
  {
    id: 2,
    title: "Gold",
    icon: stakeIcon3,
    end: "50",
    apy: "50%",
    tvl: "5008963.60",
    minimumLocked: "200.00",
    stake: "369.00",
    Rewards: "0.00",
    amountStaked: "268.00",
    balance: "50.00",
  },
  {
    id: 3,
    title: "Diamond", // Added the Diamond tier
    icon: stakeIcon4, // Added the Diamond tier icon
    end: "60", // Adjust the details as needed
    apy: "75%", // Adjust the details as needed
    tvl: "7500000.00", // Adjust the details as needed
    minimumLocked: "500.00", // Adjust the details as needed
    stake: "500.00", // Adjust the details as needed
    Rewards: "0.00", // Adjust the details as needed
    amountStaked: "1000.00", // Adjust the details as needed
    balance: "100.00", // Adjust the details as needed
  },
];

export default data;
