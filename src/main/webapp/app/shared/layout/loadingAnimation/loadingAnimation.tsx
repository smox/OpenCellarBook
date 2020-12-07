import React from 'react';

interface ILoadingAnimation {
  message?: string
}

const LoadingAnimation = ({ message }: ILoadingAnimation ) => (
  <div style={{width: '100%', textAlign: 'center'}}>
    { message && <p>{ message }</p> }
    <div className={"dot-pulse"} style={{ margin: 'auto' }}/>
  </div>
);

export default LoadingAnimation;
