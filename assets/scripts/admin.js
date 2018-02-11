/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, plugin) {
	$(function () {
		var $delete = $('#pwpDeleteDevice');

		$delete.on('click', function () {

			var $e = $(this);
			var $container = $e.parents('.pwp-devicestable__container');
			var subscription_id = $e.attr('data-deviceid');
			var action = 'pwp_ajax_handle_device_id';

			$container.addClass('pwp-devicestable__container--loading');

			$.ajax({
				url: plugin['AjaxURL'],
				type: 'POST',
				dataType: 'json',
				data: {
					action: action,
					user_id: subscription_id,
					handle: 'remove',
					clientData: {}
				}
			}).done(function (data) {
				$e.parents('tr').remove();
			}).fail(function () {
				console.log('remove failed');
			}).always(function () {
				$container.removeClass('pwp-devicestable__container--loading');
			});
		});
	});
})(jQuery, PwpJsVars);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, plugin, wp) {

	$(function () {

		$('input[name=pwp-push-image]').each(function () {

			var $e = $(this);
			var $container = $e.parent().find('.pwpmodal-uploader');
			var $upload = $container.find('#uploadImage');
			var $delete = $container.find('#removeImage');
			var $preview = $container.find('.pwpmodal-uploader__image');

			var frame = void 0;

			$e.addClass('pwpmodal-input');

			$upload.on('click', function () {
				frame = wp.media({
					title: 'Select or Upload a file',
					button: {
						text: 'Select file'
					},
					multiple: false,
					filters: {
						type: 'jpg'
					}
				});

				frame.on('select', function () {

					var attachment = frame.state().get('selection').first().toJSON();

					var preview = '';

					if (attachment.type === 'image') {
						preview = '<img src=\'' + attachment.sizes.thumbnail.url + '\' />';
					} else {
						preview = '<a target="_blank" href="' + attachment.url + '">' + attachment.title + '</a> (' + attachment.mime + ')';
					}

					$preview.html(preview);
					$e.val(attachment.id);
				});

				frame.open();
			});

			$delete.on('click', function () {
				$e.val(0);
				$preview.html('');
			});
		});

		$('.pwp-pushmodal').each(function () {

			var $container = $(this);
			var $loader = $container.find('.loader');
			var $button = $container.find('#send');

			$button.on('click', function () {

				$loader.fadeIn();

				var data = {};
				data['action'] = $container.find('input[name=pwp-push-action]').val();
				$container.find('input, select').each(function () {
					data[$(this).attr('name')] = $(this).val();
				});

				$.ajax({
					url: plugin['AjaxURL'],
					type: 'POST',
					dataType: 'json',
					data: data
				}).always(function (data) {

					if (data['type'] === null || data['type'] !== 'success') {

						var msg_content = data['message'];
						if (msg_content === '' || typeof msg_content === 'undefined') {
							msg_content = plugin['GeneralError'];
						}
						alert(msg_content);
					}
					$loader.fadeOut();
				});
			});
		});
	});
})(jQuery, PwpJsVars, wp);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, theme, wp) {
	$(function () {

		var $container = $('.pwp-wrap');
		var $fileuploader = $container.find('.settings--fileuploader');

		$fileuploader.each(function () {

			var $e = $(this);
			var $input = $e.find('input[type=hidden]');
			var $upload = $e.find('.select-file');
			var $delete = $e.find('.delete-file');
			var $preview = $e.find('.fileuploader__preview');

			var checkMime = $e.attr('data-mimes');
			var checkMaxWidth = $e.attr('data-max-width');
			var checkMinWidth = $e.attr('data-min-width');
			var checkMaxHeight = $e.attr('data-max-height');
			var checkMinHeight = $e.attr('data-min-height');

			var frame = void 0;

			$delete.on('click', function () {
				$e.attr('data-fileid', 0);
				$preview.html('');
				$input.val(0);
			});

			$upload.on('click', function () {
				frame = wp.media({
					title: 'Select or Upload a file',
					button: {
						text: 'Select file'
					},
					multiple: false,
					filters: {
						type: 'jpg'
					}
				});

				frame.on('select', function () {

					var attachment = frame.state().get('selection').first().toJSON();
					var errors = [];

					if (checkMime !== '') {
						var mimesArray = checkMime.split(', ');
						var fileMime = attachment.subtype;
						if ($.inArray(fileMime, mimesArray) === -1) {
							errors.push("This file should be one of the following file types:\n" + checkMime);
						}
					}

					if (checkMaxHeight !== '' && attachment.height > checkMaxHeight) {
						errors.push('Image can\'t be higher than ' + checkMaxHeight + 'px.');
					}

					if (checkMinHeight !== '' && attachment.height < checkMinHeight) {
						errors.push('Image should be at least ' + checkMinHeight + 'px high.');
					}

					if (checkMaxWidth !== '' && attachment.width > checkMaxWidth) {
						errors.push('Image can\'t be wider than ' + checkMaxWidth + 'px.');
					}

					if (checkMinWidth !== '' && attachment.width < checkMinWidth) {
						errors.push('Image should be at least ' + checkMinHeight + 'px wide.');
					}

					if (errors.length) {
						alert(errors.join("\n\n"));
						return;
					}

					var preview = '';

					if (attachment.type === 'image') {
						preview = '<img src=\'' + attachment.sizes.thumbnail.url + '\' />';
					} else {
						preview = '<a target="_blank" href="' + attachment.url + '">' + attachment.title + '</a> (' + attachment.mime + ')';
					}

					$e.attr('data-fileid', attachment.id);
					$preview.html(preview);
					$input.val(attachment.id);
				});

				frame.open();
			});
		});
	});
})(jQuery, PwpJsVars, wp);

/***/ })
/******/ ]);