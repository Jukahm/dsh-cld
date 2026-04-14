type Handler<T> = (payload: T) => void;

type EventMap = Record<string, unknown>;

/**
 * Typed pub/sub EventBus.
 *
 * @example
 * const bus = new EventBus<{ 'user:logout': void; 'data:refresh': { scope: string } }>();
 * bus.on('user:logout', () => redirectToLogin());
 * bus.emit('user:logout', undefined);
 */
export class EventBus<TEvents extends EventMap> {
  private readonly listeners = new Map<keyof TEvents, Set<Handler<unknown>>>();

  on<K extends keyof TEvents>(event: K, handler: Handler<TEvents[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler as Handler<unknown>);
    return () => this.off(event, handler);
  }

  off<K extends keyof TEvents>(event: K, handler: Handler<TEvents[K]>): void {
    this.listeners.get(event)?.delete(handler as Handler<unknown>);
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): void {
    this.listeners.get(event)?.forEach((handler) => handler(payload));
  }

  once<K extends keyof TEvents>(event: K, handler: Handler<TEvents[K]>): () => void {
    const wrapped: Handler<TEvents[K]> = (payload) => {
      handler(payload);
      this.off(event, wrapped);
    };
    return this.on(event, wrapped);
  }

  clear(event?: keyof TEvents): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// Global app event bus — typed per application needs
export type AppEvents = {
  "auth:logout": void;
  "auth:session-expired": void;
  "data:invalidate": { scope: string };
  "notification:show": { message: string; type: "success" | "error" | "info" | "warning" };
};

export const appEventBus = new EventBus<AppEvents>();
