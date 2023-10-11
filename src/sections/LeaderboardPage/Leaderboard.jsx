import { useState } from "react";
import { TOKEN_DECIMALS } from "src/constants/const";
import { Pagination } from "@mui/material";
// import Pagination from "src/components/pagination/Pagination"
// import data from "src/assets/data/leaderboard/dataV1";
import { useAppSelector } from "src/hooks";
import LeaderboardStyleWrapper from "./Leaderboard.style.js"

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PaginationStyleWrapper from "src/components/pagination/Pagination.style";

const Leaderboard = () => {
    const stakerList = useAppSelector(state => state.app.stakerList);
    const stakerAmounts = useAppSelector(state => state.app.stakerAmounts);

    const pagination = 3;
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    
    let sortedData = []
    if (stakerList && stakerAmounts) {
        let stakerLeaderboard = []
        let tempStakerList = []
        for (let i = 0; i < stakerAmounts.length; i++) {
            const element = stakerAmounts[i][0] / 10 ** TOKEN_DECIMALS;
            if (element !== 0) {
                stakerLeaderboard.push({
                    address: stakerList[i],
                    amount: element
                })
                tempStakerList.push(stakerList[i])
            }
        }
        sortedData = stakerLeaderboard.slice().sort((a, b) => (a.amount > b.amount ? -1 : 1));
    }
    return (
        <LeaderboardStyleWrapper>
            <div className="container">
                <div className="leaderboard_list">
                    {sortedData?.map((data, i) => {
                        if (i >= (page - 1) * pagination && i < page * pagination) {
                        return <ul key={i} className="leaderboard_list_item">
                            <li data-title="Rank"> {i + 1} </li>
                            {/* <li data-title="Name">{lb.name}</li> */}
                            <li data-title="Address">{data.address}</li>
                            {/* <li data-title="Locked">{lb.locked}</li> */}
                            <li data-title="Balance">{Math.floor(data.amount * 100) / 100}</li>
                        </ul>
                        }
                    })}
                </div>
                <div className="leaderboard-pagination">
                    {sortedData.length > 0 && <Pagination count={Math.round(sortedData.length / pagination)} shape="rounded" onChange={handleChange} />}
                </div>
            </div>
        </LeaderboardStyleWrapper>
    )
}

export default Leaderboard;