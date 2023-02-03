module.exports = {
  dll: {
    entry: {
      vendor: ['react', 'react-dom'],
    },
    cache: {
      base: '.cache/dll',
      dev: '.cache/dll/dev',
      prod: '.cache/dll/prod',
    }
  },
};