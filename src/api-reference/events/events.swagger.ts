import { ApiEndpoint } from './../../common/decorators';
import { EventType } from './../../common/models/td-lifecycle-event';

export function ApiSubscribeToAll() {
  return ApiEndpoint({
    operation: {
      summary: 'Subscribe to all events',
      description: `This API uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" target="_blank">Server-sent events (SSE)</a> protocol.`,
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
        description: 'Include changed Thing Description attributes inside events payload',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'OK',
        content: {
          'text/event-stream': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/EventPayload',
              },
            },
          },
        },
      },
    ],
  });
}

export function ApiSubscribeTo() {
  return ApiEndpoint({
    operation: {
      summary: 'Subscribe to specific events',
      description: `This API uses the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events" target="_blank">Server-sent events (SSE)</a> protocol.`,
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
        description: 'Include changed Thing Description attributes inside events payload',
        required: false,
      },
    ],
    responses: [
      {
        status: 200,
        description: 'OK',
        content: {
          'text/event-stream': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/EventPayload',
              },
            },
          },
        },
      },
    ],
  });
}
