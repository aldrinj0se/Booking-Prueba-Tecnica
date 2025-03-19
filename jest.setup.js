import { TextEncoder, TextDecoder } from "text-encoding";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
