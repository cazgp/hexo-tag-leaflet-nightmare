var util = require('util');
var yaml = require('js-yaml');
var fs = require('hexo-fs');
var crypto = require('crypto');
var Promise = require('bluebird');
var ln = Promise.promisify(require('leaflet-nightmare'));

var leaflet = function(args, content) {
  return Promise.try(function() {
    return yaml.safeLoad(content);
  }).bind({
    static_dir: hexo.source_dir + (hexo.config.static_dir || 'static'),
    asset_dir: this.asset_dir
  }).then(function(options) {
    this.options = options;
    return fs.readFile(this.static_dir + '/' + this.options.file);
  }).then(function(script) {
    this.name = crypto.createHash('sha1')
      .update(content)
      .update(script)
      .digest('hex') + '.png';
    this.out = this.asset_dir + this.name;
    this.options.content = script.toString();
    return fs.exists(this.out);
  }).then(function(exists) {
    if(exists) return;
    this.options.static_dir = this.static_dir;
    return ln(this.out, this.options);
  }).then(function() {
    return hexo.render.render({ path: __dirname + '/img.ejs' }, {
      caption: args.join(' '),
      src: this.name
    });
  });
};

hexo.extend.tag.register('leafletstatic', leaflet, { async: true, ends: true });
