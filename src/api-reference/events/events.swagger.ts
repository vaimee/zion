import { ApiEndpoint } from './../../common/decorators';
import { EventType } from './../../common/models/events';

export function ApiSubscribeToAll() {
  return ApiEndpoint({
    operation: {
      summary: 'Subscribe to all events',
    },
    headers: [
      {
        name: 'Last-Event-ID',
        description: 'ID of the last event for reconnection',
        required: false,
      },
    ],
    queries: [
      {
        name: 'diff',
        type: 'boolean',
        description: 'Include changed TD attributes inside events payload',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'text/event-stream',
        description: 'Events stream',
      },
    ],
  });
}

export function ApiSubscribeTo() {
  return ApiEndpoint({
    operation: {
      summary: 'Subscribe to specific events',
    },
    headers: [
      {
        name: 'Last-Event-ID',
        description: 'ID of the last event for reconnection',
        required: false,
      },
    ],
    params: [
      {
        name: 'type',
        enum: EventType,
        description: 'Event type',
      },
    ],
    queries: [
      {
        name: 'diff',
        type: 'boolean',
        description: 'Include changed TD attributes inside events payload',
      },
    ],
    responses: [
      {
        status: 200,
        type: 'text/event-stream',
        description: 'Events stream',
      },
    ],
  });
}
