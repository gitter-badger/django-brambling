/**
 * jQuery Ajax Form
 * @author Harris Lapiroff
 * @requires jQuery
 * @description Fast AJAX form instantiation.
 *
 *
 * Copyright (c) 2015, Little Weaver Web Collective
 * All rights reserved.
 *
 * Licensed under the New BSD License
 * See: http://www.opensource.org/licenses/bsd-license.php
 *
 * HTML Usage:
 *
 *     <form method="post" action="/mysubmit/" data-submit="ajax">
 *         <input type="text" name="username" />
 *         <input type="password" name="password" />
 *         <button>I will submit this form over ajax!</button>
 *     </form>
 *
 * jQuery usage:
 *
 *     $('#myForm').ajaxForm({success: mySuccessFunction, errorcontainer: "#messages"})
 *
 */

;(function ($) {
	"use strict";

	// AjaxForm Object Definition
	// ==========================

	var AjaxForm = function (el, opts) {
		this.$el = $(el);
		this.opts = $.extend({}, AjaxForm.DEFAULTS, opts);
		this.init();
	}

	AjaxForm.DEFAULTS = {
		dataType: 'json',
		complete: null,
		success: null,
		error: null,
		errorelement: "<div class='alert alert-danger'></div>",
		errormessage: "An error occured while submitting the form: ",
		errorcontainer: "body"
	};

	AjaxForm.prototype.log = function (message) {
		if (window.console && console.log) console.log("[ajaxform]", message);
	};

	AjaxForm.prototype.init = function () {
		var that = this,
			$el = this.$el;

		if(!$el.is("form")) throw "AjaxForm element must be <form>.";


		// Rebind submit function to our own submit function:
		$el.on('submit.ajaxform', function (e) { that.submit(); e.preventDefault(); });
	};

	AjaxForm.prototype.submit = function () {
		var that = this,
			$el = this.$el,
			formData = $el.serialize();

		// Fire an ajax request with the form data:
		$.ajax({
			type: $el.attr('method'),
			url: $el.attr('action'),
			data: formData,
			dataType: this.opts.dataType,
			success: function (e, s) { that.successHandler(e, s, this) },
			error: function (e, s, err) { that.errorHandler(e, s, err, this) },
			complete: function (e, s) { that.completeHandler(e, s, this) },
		});
	};

	AjaxForm.prototype.completeHandler = function (ajaxEvent, ajaxStatus, ajaxElement) {
		// If a handler was passed to the options, do it instead:
		if (this.opts.complete) return this.opts.complete(ajaxEvent, ajaxStatus, ajaxElement);
	};

	AjaxForm.prototype.successHandler = function (ajaxEvent, ajaxStatus, ajaxElement) {
		// If a handler was passed to the options, do it instead:
		if (this.opts.success) return this.opts.success(ajaxEvent, ajaxStatus, ajaxElement);
	};

	AjaxForm.prototype.errorHandler = function (ajaxEvent, ajaxStatus, ajaxError, ajaxElement) {
		// If a handler was passed to the options, do it instead:
		if (this.opts.error) return this.opts.error(ajaxEvent, ajaxStatus, ajaxError, ajaxElement);

		// By default, create an error message and append it to the container.
		var $errWrap = $(this.opts.errorcontainer),
			$errEl = $(this.opts.errorelement);

		$errEl.append(this.opts.errormessage);
		$errEl.append(ajaxError);
		$errEl.prependTo($errWrap);
	};

	// jQuery Plugin Definition
	// ========================
	$.fn.ajaxform = function () {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('ajaxform'),
				options = $.extend({}, AjaxForm.DEFAULTS, $this.data(), typeof option == 'object' && option);

			// Initialize if it has never been initialized before:
			if (!data) $this.data('ajaxform', (data = new AjaxForm(this, options)));

			// If the plugin accepts commands, this will run them:
			if (typeof option == 'string') data[option]();

			return this;
		});
	};

	// HTML Data API Definition
	// ========================

	$(function () {
		$('[data-submit="ajax"]').ajaxform();
	});

}(jQuery));
