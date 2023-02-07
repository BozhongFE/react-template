declare namespace Test2ModuleLessNamespace {
  export interface ITest2ModuleLess {
    test: string;
  }
}

declare const Test2ModuleLessModule: Test2ModuleLessNamespace.ITest2ModuleLess & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: Test2ModuleLessNamespace.ITest2ModuleLess;
};

export = Test2ModuleLessModule;
