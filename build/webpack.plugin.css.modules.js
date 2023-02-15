const { extname } = require('path');

module.exports = () => {
  const CSS_FILE_EXTENSIONS = ['.css', '.scss', '.sass', '.less'];
  return {
    visitor: {
      ImportDeclaration(path) {
        const { specifiers, source } = path.node;
        const { value } = source;
        // 动态加载css
        if (
          specifiers.length > 0
          && CSS_FILE_EXTENSIONS.includes(extname(value))
        ) {
          // 添加 css_modules 之后，交由 css-loader 处理 css modules
          // 例如：import style from './style.less' ==> import style from 'style.less?css_modules';
          // 区别：import style from './style.less' 和 import './style.less'，前者 import-style-from-file 自动使用 css modules，后者 import-file 直接引入 style 
          source.value = `${value}?css_modules`;
        }
      },
    },
  };
};