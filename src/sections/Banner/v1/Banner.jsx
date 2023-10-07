import Button from "src/components/button";
import BannerStyleWrapper from "./Banner.style";

import bannerIcon from "src/assets/images/icons/tothemoon.gif";

const Banner = () => {
  return (
    <>
      <BannerStyleWrapper>
        <div className="container">
          <div className="banner-content text-center">
            <img
              src={bannerIcon}
              className="banner-icon"
              alt="banner icon"
            />
            <h1 className="banner-title">
              Doofy Staking 
            </h1>
            <div className="description">
              The next generation meme token with real utility
            </div>

            <Button href="/register" variant="mint" md isCenter className="banner-btn">
              Join Today
            </Button>
          </div>
        </div>
      </BannerStyleWrapper>
    </>
  );
};

export default Banner;
