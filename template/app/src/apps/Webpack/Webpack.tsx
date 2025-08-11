import React from 'react';
import GenericRemoteApp from '../shared/GenericRemoteApp';

/**
 * Webpack
 * sADSFGS
 * 
 * Remote URL: http://localhost:3002/remoteEntry.js
 * Exposed Module: ./DemoAppForHostUrlSync
 */
const Webpack: React.FC = (props) => {
  return (
    <GenericRemoteApp 
      appId="Webpack"
      basePath="/webpack"
      {...props}
    />
  );
};

export default Webpack;