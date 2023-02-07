declare namespace Test3LessNamespace {
  export interface ITest3Less {
    test: string;
  }
}

declare const Test3LessModule: Test3LessNamespace.ITest3Less & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Test3LessNamespace.ITest3Less;
};

export = Test3LessModule;
