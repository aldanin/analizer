import * as React from 'react';

export interface AgentProps {
  agent: {
    name: string;
    id: string;
  };
}

const Agent = ({ agent }: AgentProps) => {
  return (
    <div>
      agent
    </div>
  )
}

export default Agent
