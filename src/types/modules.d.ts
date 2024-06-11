import 'ramda';

declare module 'ramda' {
  interface Static {
    composeWith: (fn: (a: any, b: any) => any) => any;
  }
}
