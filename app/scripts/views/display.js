define([
	'Bind',
	'lodash',
	'./template',
	'../lib/helpers',
], function(bind, _, template, helper) {

	var tmpl = template(function() {/***
		<table>
			{[ _.forEach(obj.options, function(opt) { ]}
			{[ if (opt.renderable === false) return ''; ]}
			<tr>
				<th scope="row">{{ opt.title }}</th>
				<td id="{{ obj.prefix }}-{{ opt.title }}">{{ opt.value }}</td>
			</tr>
			{[ }); ]}
	 </table>
	***/
	});

	function sync(prefix, value) {
		console.log('syncing %s-%s: %s', prefix, this.title, value);
		this.value = value;
		var t = document.getElementById(prefix + '-' + this.title);
		if (t)
			t.textContent = this.calculate(value) + this.format();
	}

	function register(data) {
		var el = helper.createDomNode(tmpl(data));
		var d = {};
		var k = {};
		data.options.forEach(function(opt) {
			var t = opt.title.toLowerCase();
			d[t] = opt.value;
			k[t] = (opt.sync || sync).bind(opt, data.prefix);
		});

		data = bind(d, k);

		return {
			el: el,
			data: data
		};
	}

	return {
		register: register
	};
});
