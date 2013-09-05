define([
	'Bind',
	'lodash',
	'./template',
	'../lib/helpers',
	'granger'
], function(bind, _, template, helper, Granger) {

	// TODO: this file is a terrible mess

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

	function createRange(options) {
		var range = document.createElement('input');

		range.setAttribute('type', 'range');
		range.setAttribute('min', options.min || 0);
		range.setAttribute('max', options.max || 100);
		range.setAttribute('step', options.step || 1);

		return range;
	}

	function create(options) {
		var el, h, range, bindings, granger;

		el = document.createElement('section');
		el.classList.add('display');

		h = document.createElement('h1');
		h.textContent = options.title;

		range = createRange(options);

		el.appendChild(h);
		el.appendChild(range);

		bindings = register(options.bindings);

		range.addEventListener('change', function(e) {
			// points to the data bindings
			bindings.data.range = this.value;
		}, false);

		granger = new Granger(range, { renderer: 'dom', type: 'x', height: 55 });

		el.appendChild(bindings.el);

		return {
			el: el,
			data: bindings.data,
			granger: granger
		};
	}

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
		register: register,
		create: create
	};
});
