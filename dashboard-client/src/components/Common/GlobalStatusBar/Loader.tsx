import * as React from 'react';

export interface LoaderProps {
  seconds: number;
}

const Loader: React.SFC<LoaderProps> = ({ seconds }) => {
  return (
    <div className="global-loader">
        Loading :)
    </div>
  )
}

export default Loader
