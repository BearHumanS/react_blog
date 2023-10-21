import styled from 'styled-components';

const Loading = () => {
  return <LoadingUI />;
};

const LoadingUI = styled.div`
  width: 3rem;
  height: 3rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 0.3125rem solid #2563eb;
  border-radius: 50%;
  z-index: 9999;
  animation: rotation 1s linear infinite;
`;

export default Loading;
