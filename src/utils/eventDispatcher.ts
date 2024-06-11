import { Event } from '../types/ui';

export default ({ name, detail }: Event) => {
  const customEvent = new CustomEvent(name, { detail });
  setTimeout(() => document.dispatchEvent(customEvent));
};
