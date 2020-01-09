const css = require('css');
const px2rem = require('./px2rem');

module.exports = function (content, file, conf) {
	// css 文件 /* wptpxtorem */ 开头的才 处理的文件
	if (!/^\s*\/\*\s*wptpxtorem\s*\*\//i.test(content)) {
		return content;
	}

	var styleSheet = css.parse(content);
	var rules = styleSheet.stylesheet.rules;

	function entry() {
		if (!rules.length) {
			// ignore file;
			return false;
		}
		return true;
	}

	if (!entry()) {
		return content;
	}

	var prefix = ['-webkit-', '-ms-', '-moz-', '-o-'];
	var styleExpr = new RegExp(
		'(' + prefix.join('|') + ')',
		'gi'
	);

	function prepare() {
		rules.forEach(function (item, index) {
			// ignore
			if (item.type !== 'rule') {
				return false;
			}

			var declarations = item.declarations;
			var exclude = conf.exclude;

			declarations.forEach(function (val, idx) {
				var value = val.value;
				var property = val.property && val.property.replace(styleExpr, '');
				var next = declarations[idx + 1] || '';

				// comments ： norem的 ，不是px的 ， 过滤的属性 
				if (/norem/g.test(next.comment)
                    || !/px/g.test(value)
                    || exclude.indexOf(property) >= 0) {
					return false;
				}

				try {
					rules[index].declarations[idx].value = px2rem(value, conf);
				}
				catch (e) {
					console.log('Error: ' + e.message);
				}
			});
		});

		return rules;
	}

	function post() {
		var styleResult = prepare() || [];

		var result = {
			type: 'stylesheet',
			stylesheet: {
				rules: styleResult
			}
		};


		return css.stringify(result);
	}

	return post();
};
