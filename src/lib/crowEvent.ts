type Listener = () => void;
const listeners: Set<Listener> = new Set();
export const onCrowTrigger = (fn: Listener) => { listeners.add(fn); return () => listeners.delete(fn); };
export const triggerCrows = () => listeners.forEach((fn) => fn());
