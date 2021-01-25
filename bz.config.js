const { existsSync } = require('fs');
const { resolve } = require('path');
const assert = require('assert');
const shell = require('shelljs');

{{#if_compare source '!==' 'not use'}}
const publicPath = '';
const projectPath = '';
// exp: publicPath = '/wiki/' projectPath = '/activity/wiki/'
{{else}}
const publicPath = './';
// exp: publicPath = '/wiki/'
{{/if_compare}}
{{#if_compare source '===' 'source'}}
const sourcePath = process.env.npm_config_source;
{{/if_compare}}
{{#if_compare source '===' 'poco'}}
const sourcePath = process.env.npm_config_poco_source;
{{/if_compare}}

assert(publicPath, 'publicPath 填写项目发布地址的路径');
{{#if_compare source '!==' 'not use'}}
assert(projectPath, 'projectPath 填写项目打包输出的路径');
if (typeof sourcePath === 'undefined') {
  {{#if_compare source '===' 'source'}}
  console.log('请先配置打包输出的source根目录');
  console.log('Example: npm config set source "D:\\source"');
  {{/if_compare}}
  {{#if_compare source '===' 'poco'}}
  console.log('请先配置打包输出的poco_source根目录');
  console.log('Example: npm config set poco_source "D:\\poco_source"');
  {{/if_compare}}

  throw new Error('没有配置模块路径');
} else if (!existsSync(sourcePath)) {
  throw new Error('source根目录不存在，请检查配置的 source 根目录是否正确');
}
{{/if_compare}}

{{#if_compare source '===' 'not use'}}
const outputPath = resolve(process.cwd(), `dist`);
{{else}}
const outputPath = resolve(sourcePath, `.${projectPath}`);
{{/if_compare}}
/**
 * 将分享图复制到输出目录
 */
class CopyShareImg {
  apply(compiler) {
    compiler.plugin('done', (compilation, callback) => {
      console.log('开始将分享图复制到输出目录');
      const shareExists = existsSync(
        resolve(__dirname, './src/assets/img/share')
      );
      if (!shareExists) {
        return console.log('分享源图目录不存在', './src/assets/img/share/');
      }
      shell.cp(
        '-R',
        resolve(__dirname, './src/assets/img/share'),
        resolve(outputPath)
      );
      console.log(`分享图已复制到${resolve(outputPath, './share')}`);
      return callback && callback;
    });
  }
}
module.exports = {
  {{#if_compare source '!==' 'not use'}}
  projectPath,
  {{/if_compare}}
  publicPath,
  CopyShareImg,
  outputPath,
};
