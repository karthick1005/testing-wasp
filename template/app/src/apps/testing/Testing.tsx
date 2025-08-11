import React from 'react';
import GenericRemoteApp from '../shared/GenericRemoteApp';

/**
 * Testing
 * dsfghh
 * 
 * Remote URL: http://localhost:3002/remoteEntry.js
 * Exposed Module: ./AppForHostUrlSync
 */
const Testing: React.FC = (props) => {
  return (
    <GenericRemoteApp 
      appId="testing"
      basePath="/testing"
      {...props}
    />
  );
};

export default Testing;