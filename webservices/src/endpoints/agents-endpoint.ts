import * as Promise from 'bluebird';

import Endpoint from './endpoint';
import AgentData from '../models/agent';

const ENDPOINT_IDENTIFIER = 'agents';

class AgentsEndpoint extends Endpoint implements WSFramework.Endpoint {
  constructor(logger: WSFramework.Logger) {
    super(logger);
  }

  protected _execute(request: any, response: any): Promise<object> {
    this.logger.audit('API REQUEST', `Attempting to fetch agents for user: ${request.user}`);

    let collectors = [];
    let resources = [];
    return Promise.resolve([this.api.fetchAgents(), this.api.fetchCollectors(), this.api.fetchResources()])
      .spread((agents, collectorsData, resourcesData) => {
        collectors = collectorsData;
        resources = resourcesData;

        return agents;
      })
      .map((agent) => {
        collectors.forEach((collector) => {
          if (agent.Collectors_id !== collector.id) return;

          agent.resourceId = collector.Resources_id;
        });

        resources.forEach((resource) => {
          if (agent.resourceId !== resource.id) return;

          agent.targetId = resource.Targets_id;

          agent.name = resource.name;
        });

        return agent;
      })
      .map((agent) => {
        return this.api.fetchProductsSummery({agentId: agent.id}).then((summery) => {
          let counters = (<any>Object).assign({}, summery.device_system, summery.sensors, summery.user_apps);

          agent.counters = counters;

          return agent;
        });
      })
      .map((agent) => {
        return AgentData.fromData(agent)
      })
      .then((agents) => {
        this.logger.audit('API REQUEST', `Successfully fetched agents for user: ${request.user}`);

        response.status(200).send(agents);
      })
      .catch((e) => {
        let error = `Failed to fetch agents with error. ${e}`;

        this.logger.audit('API REQUEST', error);

        // We want the error to propagate
        throw e;
      });
  }

  protected isProtected(): boolean {
    return true;
  }

  static getIdentifier() {
    return ENDPOINT_IDENTIFIER;
  }

  static isProtected() {
    return true;
  }

  static getRequestValidators() {
    return null;
  }

  static getResponseValidators() {
    return null;
  }
}

export default AgentsEndpoint;