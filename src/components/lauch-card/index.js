import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { device } from "../../helpers";
import Image from "../image";
import Lockup from "../lockup";

const LaunchCardWrapper = styled.div`
  display: block;
  margin-bottom: 30px;
  width: calc((100% - 60px) / 3);
  ${props => !((props.index + 1) % 3 === 0) ? 
    `margin-right: 25px;` : ``
  }
`;

const LaunchCardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
`;

const ImagContainer = styled.div`
  padding: 40px 20px;
  background-color: #b3c7cc;
  position: relative;
  margin-top: auto;  

  img {
    height: 100px;
    width: auto;
    display: block;
    margin: 0 auto;
  }
`;

const Content = styled.div`
  height: 100%;
  padding: 0 20px 20px;
  background-color: #f6f7f7;
  flex: 1;  
  @media ${device.tablet} {
    overflow-y: auto;
    max-height: 200px;
  }
`;

function LaunchCard({index = 0, ...props}) {
  return (
    <LaunchCardWrapper index={index}>
      <LaunchCardContainer>
        <ImagContainer>
          <Image url={props.image} />
        </ImagContainer>

        <Content>
          <Lockup text={props.description} tag="h3" title={props.title} />
        </Content>
        {/* Youtube Link ? */}
      </LaunchCardContainer>
    </LaunchCardWrapper>
  );
}

LaunchCard.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default LaunchCard;
