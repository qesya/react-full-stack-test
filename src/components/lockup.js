import * as React from "react";
import Title from "./title";
import Paragraph from "./paragraph";
import styled from "styled-components";

export const LockupContainer = styled.div`
  display: block;
  color: inherit;
`;

export const TitleWrapper = styled.div`
  top: 0;
  position: sticky;
  padding-top: 20px;
  padding-bottom: 1px;
  background-color: #f6f7f7;
`;

const Lockup = (props) => {
  return (
    <LockupContainer>
      <TitleWrapper>
        <Title {...props} />
      </TitleWrapper>
      <Paragraph {...props} />
    </LockupContainer>
  );
};

export default Lockup;
