const loaderUtils = require('loader-utils');
const objectAssign = require('object-assign');
const px2rem = require('./main');
const defaultConfig = {
	rem: 10,
	exclude:[]
};

module.exports = function(content, map) {
	const options = loaderUtils.getOptions(this);
	const config = objectAssign({}, defaultConfig, options);

	return px2rem(content, map, config);
};
