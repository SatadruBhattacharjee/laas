import { SchemaNode, Schema } from './types';

export interface TestFunc {
  (
    path: string,
    schema?: Schema,
    resolveRenderer?: (
      path: string,
      schema?: Schema,
      props?: any
    ) => null | RendererConfig
  ): boolean;
}

export interface RendererBasicConfig {
  test: RegExp | TestFunc;
  name?: string;
  storeType?: string;
  storeExtendsData?: boolean; // Do you need to inherit the upper-level data
  weight?: number; // Weight, the lower the value, the higher the priority.
  isolateScope?: boolean;
  isFormItem?: boolean;
  // [propName:string]:any;
}

export interface RendererEnv {
  fetcher: (api: Api, data?: any, options?: object) => Promise<Payload>;
  isCancel: (val: any) => boolean;
  notify: (type: 'error' | 'success', msg: string) => void;
  jumpTo: (to: string, action?: Action, ctx?: object) => void;
  alert: (msg: string) => void;
  confirm: (msg: string, title?: string) => Promise<boolean>;
  updateLocation: (location: any, replace?: boolean) => void;
  isCurrentUrl: (link: string) => boolean;
  rendererResolver?: (
    path: string,
    schema: Schema,
    props: any
  ) => null | RendererConfig;
  copy?: (contents: string) => void;
  getModalContainer?: () => HTMLElement;
  theme: ThemeInstance;
  affixOffsetTop: number;
  affixOffsetBottom: number;
  richTextToken: string;
  loadRenderer: (
    schema: Schema,
    path: string,
    reRender: Function
  ) => Promise<React.ReactType> | React.ReactType | JSX.Element | void;
  [propName: string]: any;
}

export interface RendererProps {
  render: (region: string, node: SchemaNode, props?: any) => JSX.Element;
  env: RendererEnv;
  classPrefix: string;
  classnames: ClassNamesFn;
  $path: string; // The hierarchy information of the current component
  store?: IIRendererStore;
  data: {
    [propName: string]: any;
  };
  defaultData?: object;
  className?: string;
  [propName: string]: any;
}

export type RendererComponent = React.ComponentType<RendererProps> & {
  propsList?: Array<string>;
};

export interface RendererConfig extends RendererBasicConfig {
  component: RendererComponent;
  Renderer?: RendererComponent; // Original component
}
