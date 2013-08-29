define([
	'Bind',
	'lodash',
	'./template'
], function(bind, _, template) {

	var a = document.createElement('div');
	var tmpl = template(function() {/***
		<table class="display">
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
		var t = tmpl(data);
		a.innerHTML = t;

		var d = {};
		var k = {};
		data.options.forEach(function(opt) {
			var t = opt.title.toLowerCase();
			d[t] = opt.value;
			k[t] = (opt.sync || sync).bind(opt, data.prefix);
		});

		data = bind(d, k);

		return {
			el: a.firstChild,
			data: data
		};
	}

	return {
		register: register
	};
});
