import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import iconBg from "src/assets/images/icons/icon-image.png";

const modalAnimation = keyframes`${fadeIn}`;

const ShareModalStyleWrapper = styled.div`
  &.modal_overlay {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    display: flex;
    justify-content: center;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #000;
      content: "";
      opacity: 0.92;
      backdrop-filter: blur(33px);
    }
  }

  .mint_modal_box {
    position: relative;
    width: 440px;
    margin: auto;
    animation: 1s ${modalAnimation};

    &::before {
      backdrop-filter: blur(5px);
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #171c21;
      content: "";
      border-radius: 10px;
    }
  }

  .mint_modal_content {
    height: 100%;
    width: 100%;
    background: #1e1f35;
    padding: 30px 35px;
    padding-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  .modal_header {
    h2 {
      font-size: 22px;
      text-transform: uppercase;
      color: #FF0000; /* Bright Red Color */
      max-width: 280px;
      margin-bottom: 26px;
    }

    button {
      background: transparent;
      border: none;
      outline: none;
      height: 45px;
      width: 45px;
      position: absolute;
      right: 0px;
      top: 0px;
      overflow: hidden;
      display: flex;
      justify-content: end;
      align-items: baseline;

      svg {
        margin-top: 5px;
        color: #FF0000; /* Bright Red Color */
      }

      &:before {
        content: "";
        background: rgba(255, 255, 255, 0.1);
        height: 150%;
        width: 150%;
        position: absolute;
        right: -35px;
        top: -35px;
        transform: rotate(45deg);
      }
    }
  }

  .social_profiles {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 25px;
    row-gap: 33px;
    column-gap: 33px;

    a {
      position: relative;
      max-width: 60px;
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;

      &::before {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: url(${iconBg}) no-repeat;
        background-position: center;
        background-size: cover;
        content: "";
        transition: all 0.3s;
      }

      svg,
      img {
        color: #FF0000; /* Bright Red Color */
        font-size: 20px;
        transition: all 0.3s;
      }

      &:hover {
        svg,
        img {
          opacity: 0.7;
        }

        &::before {
          opacity: 0.8;
        }
      }
    }
  }

  .modal_bottom_shape {
    position: absolute;
    bottom: 10px;

    &.shape_left {
      left: 10px;
      transform: rotate(-90deg);
    }
    &.shape_right {
      right: 10px;
      transform: rotate(180deg);
    }
  }
  @media (max-width: 480px) {
    .social_profiles {
      justify-content: center;
      row-gap: 25px;
      column-gap: 25px;
    }
  }
`;

export default ShareModalStyleWrapper;
