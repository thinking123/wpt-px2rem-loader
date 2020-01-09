/* disable eslint */
module.exports = function px2rem(str, conf , mode = 'development'){
	return str.replace(/\b([\d\.]+)px\b/g, function(s, px) {
		px = +px;
		if(mode == 'production'){
			return parseFloat((px / conf.rem).toFixed(4));
		}
		return parseFloat((px / conf.rem).toFixed(4)) + 'rem/* @source-size: ' + px + 'px; */';
	});
};