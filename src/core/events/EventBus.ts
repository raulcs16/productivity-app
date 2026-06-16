// src/core/events/EventBus.ts

export type AppEventPayloads = {
  "explorer:nodeCreated": {
    id: number;
    title: string;
    type: "Container" | "Item";
    parentId: number;
  };
  "explorer:nodeRenamed": {
    id: number;
    type: "Container" | "Item";
    title: string;
  };
  "explorer:nodeDeleted": { id: number };
  "explorer:nodeSelected": { id: number };
  "todo:listCreated": { id: number; title: string; workspaceId: number };
};

class EventBus {
  private bus = new EventTarget();

  // 💡 Publish an event out into the app airwaves
  emit<K extends keyof AppEventPayloads>(
    topic: K,
    payload: AppEventPayloads[K]
  ) {
    const event = new CustomEvent(topic, { detail: payload });
    this.bus.dispatchEvent(event);
  }

  // 💡 Listen to a specific event topic station
  on<K extends keyof AppEventPayloads>(
    topic: K,
    callback: (payload: AppEventPayloads[K]) => void
  ) {
    const handler = (e: Event) => callback((e as CustomEvent).detail);
    this.bus.addEventListener(topic, handler);

    // Return a clean teardown function for React useEffect cleanups
    return () => this.bus.removeEventListener(topic, handler);
  }
}

// Export a single global instance
export const appEventBus = new EventBus();
