import styled, { css } from "styled-components";

const LinkStyle = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 17px;
  font-family: "Russo One", sans-serif;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  border: none;
  background: #FF0000; /* Bright Red Background */
  overflow: hidden;
  z-index: 1;
  color: #FFFFFF;     /* White Text Color */
  cursor: pointer;

  .hover_shape_wrapper {
    position: absolute;
    height: 100%;
    width: auto;
    left: 30%;
    top: 0;
    z-index: -1;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    .btn_hover_shape {
      display: block;
      height: 124%;
      width: 5px;
      opacity: 0;
      margin: 0 0 0 -10px;
      background: rgba(0, 0, 0, 0.1);
      transform: rotate(22deg);
      transition: all 0.4s;

      &-3 {
        width: 11px;
      }
    }
  }

  svg {
    font-size: 16px;
  }

  &:hover {
    .hover_shape_wrapper {
      left: 50%;
      .btn_hover_shape {
        opacity: 1;
        margin: 0 5px !important;
      }
    }
    color: #FFFFFF; /* White Text Color on Hover */
  }

  ${({ isCenter }) =>
    isCenter &&
    css`
      margin: 0 auto;
    `}
  ${({ variant }) =>
    variant === "mint" &&
    css`
      /* Mint variant styles (if needed) */
    `}
  ${({ variant }) =>
    variant === "outline" &&
    css`
      /* Outline variant styles (if needed) */
    `}
  ${({ variant }) =>
    variant === "dark" &&
    css`
      /* Dark variant styles (if needed) */
    `}
  ${({ variant }) =>
    variant === "white" &&
    css`
      /* White variant styles (if needed) */
    `}
  ${({ hovered }) =>
    hovered &&
    css`
      /* Hovered styles (if needed) */
    `}
  ${({ sm }) =>
    sm &&
    css`
      /* Small size styles (if needed) */
    `}
  ${({ md }) =>
    md &&
    css`
      /* Medium size styles (if needed) */
    `}
  ${({ lg }) =>
    lg &&
    css`
      /* Large size styles (if needed) */
    `}
  ${({ xl }) =>
    xl &&
    css`
      /* Extra Large size styles (if needed) */
    `}
  ${({ xxl }) =>
    xxl &&
    css`
      /* Extra Extra Large size styles (if needed) */
    `}
    
    @media only screen and (max-width: 768px) {
    font-size: 14px;
    column-gap: 14px;
  }
`;

export default LinkStyle;
