declare namespace Test1ModuleLessNamespace {
  export interface ITest1ModuleLess {
    test: string;
  }
}

declare const Test1ModuleLessModule: Test1ModuleLessNamespace.ITest1ModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Test1ModuleLessNamespace.ITest1ModuleLess;
};

export = Test1ModuleLessModule;
