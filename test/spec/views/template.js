/*global describe, it */
define(['http://localhost:8000/scripts/views/template.js'], function(template) {
	'use strict';

	describe('Template', function () {
		describe('fn regexer', function () {
			it('should parse a function to a template', function () {
				function test() {/***
					<h2>This is my template</h2>
				***/}

				var result = template(test);
				expect( result ).to.be.a.function
				expect( result() ).to.equal('<h2>This is my template</h2>');
			});
		});
	});
});

