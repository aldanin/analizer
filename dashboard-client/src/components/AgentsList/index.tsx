import * as React from 'react'
import { Link } from 'react-router'

export interface AgentsListProps {
  agents: Array< {
    name: string;
    id: string;
    resourceId: string;
  }>;
}

const AgentsList: React.SFC<AgentsListProps> = ( { agents }: AgentsListProps ) => {
// const AgentsList = ( { agents }) => {
  let children
  if (agents.length > 0) {
    children = (
      <ul>
        {agents.map(agent => (
          <li key={agent.resourceId}>
            <Link to={`/agenasdasdt/${agent.resourceId}`}>{agent.name}</Link>
          </li>
        ))}
      </ul>
    )
  } else {
    children = <p>No items found.</p>
  }
  return (
    <div>
        {children}
    </div>
  )
}

export default AgentsList
