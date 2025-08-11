// Auto-generated type definitions for remote apps
// Generated on 2025-08-11T10:42:38.080Z

declare global {
  interface Window {
    demoReactApp?: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
    anotherApp?: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
    calculatorApp?: {
      init: (shared: any) => Promise<void>;
      get: (module: string) => () => Promise<{ default: React.ComponentType }>;
    };
  }
}

// Remote app module declarations
declare module 'demoReactApp/./DemoAppForHostUrlSync' {
  const component: React.ComponentType<any>;
  export default component;
}

declare module 'anotherApp/./App' {
  const component: React.ComponentType<any>;
  export default component;
}

declare module 'calculatorApp/./Calculator' {
  const component: React.ComponentType<any>;
  export default component;
}

export {};