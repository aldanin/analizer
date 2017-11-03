import styled, { keyframes } from 'styled-components';

const Ellipsis = keyframes`
  to {
    width: 1.25em;
  }
`;

const LoadingThreeDots = styled.div`
  font-size: 30px;
  text-align: right;
  float: left;
  
  &:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ${Ellipsis} steps(4,end) 900ms infinite;
    animation: ${Ellipsis} steps(4,end) 900ms infinite;
    content: "...";
    width: 0px;
  }
`;

export default LoadingThreeDots;
