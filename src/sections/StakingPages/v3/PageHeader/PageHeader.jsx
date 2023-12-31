import Counter from "src/components/counter";
import titleShape from "src/assets/images/icons/steps.png";
import { useAppSelector } from "src/hooks";
import PageHeaderStyleWrapper from "./PageHeader.style";

const PageHeader = ({ currentPage, pageTitle }) => {

  const totalStaked = useAppSelector(state => state.app.totalStaked);
  const totalStakedAmount = useAppSelector(state => state.account.totalStakedAmount);

  return (
    <PageHeaderStyleWrapper>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="breadcrumb_area">
              <div className="breadcrumb_menu">
                <>
                  <a href="# ">Home</a> <span>.</span> {currentPage && currentPage}
                </>
                <img
                  className="heading_shape"
                  src={titleShape}
                  alt="bithu nft heading shape"
                />
              </div>
              <h2 className="breadcrumb_title text-uppercase">{pageTitle && pageTitle}</h2>
            </div>
          </div>

          <div className="col-lg-5 offset-lg-2">
            <div className="stake_counter">
              <h6>
                Total Stake {" "}
                <Counter
                  end={totalStaked ? totalStaked : 0}
                  decimal="."
                  decimals={(totalStaked ? totalStaked : 0) % 1 !== 0 ? "2" : "0"}
                  suffix=" DOF"
                />
              </h6>
              <h6>
                My Stake {" "}
                <Counter
                  end={totalStakedAmount ? totalStakedAmount : 0}
                  decimal="."
                  decimals={(totalStakedAmount ? totalStakedAmount : 0) % 1 !== 0 ? "2" : "0"}
                  suffix=" DOF"
                /> </h6>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderStyleWrapper>
  );
};

export default PageHeader;
