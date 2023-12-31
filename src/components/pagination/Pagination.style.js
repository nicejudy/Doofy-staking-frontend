import styled from "styled-components";

const PaginationStyleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 8px;

  &.pagination_wrapper {
    margin-top: 50px;
  }

  div {
    display: flex;
    width: 50px;
    height: 50px;
    font-family: "Russo One", sans-serif;
    justify-content: center;
    align-items: center;
    color: #FF0000; /* Bright Red Color */
    font-weight: 500;
    border: 1px solid #2e2f3c;
    transition: all 0.4s;
    cursor: pointer;

    svg {
      font-size: 1.3rem;
    }

    &:hover,
    &.active {
      background-color: #2e2f3c;
      color: #FFFFFF; /* White Text Color */
    }

    &.active {
      &:hover {
        background-color: transparent;
      }
    }
  }
`;

export default PaginationStyleWrapper;
