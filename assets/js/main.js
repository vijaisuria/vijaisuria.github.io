(function($) {

	// Settings.
		var settings = {

			// Keyboard shortcuts.
				keyboardShortcuts: {

					// If true, enables scrolling via keyboard shortcuts.
						enabled: true,

					// Sets the distance to scroll when using the left/right arrow keys.
						distance: 50

				},

			// Scroll wheel.
				scrollWheel: {

					// If true, enables scrolling via the scroll wheel.
						enabled: true,

					// Sets the scroll wheel factor. (Ideally) a value between 0 and 1 (lower = slower scroll, higher = faster scroll).
						factor: 1

				},

			// Scroll zones.
				scrollZones: {

					// If true, enables scrolling via scroll zones on the left/right edges of the scren.
						enabled: true,

					// Sets the speed at which the page scrolls when a scroll zone is active (higher = faster scroll, lower = slower scroll).
						speed: 15

				},

			// Dragging.
				dragging: {

					// If true, enables scrolling by dragging the main wrapper with the mouse.
						enabled: true,

					// Sets the momentum factor. Must be a value between 0 and 1 (lower = less momentum, higher = more momentum, 0 = disable momentum scrolling).
						momentum: 0.875,

					// Sets the drag threshold (in pixels).
						threshold: 10

				},

			// If set to a valid selector , prevents key/mouse events from bubbling from these elements.
				excludeSelector: 'input:focus, select:focus, textarea:focus, audio, video, iframe',

			// Link scroll speed.
				linkScrollSpeed: 1000

		};

	// Skel.
		skel.breakpoints({
			xlarge: '(max-width: 1680px)',
			large: '(max-width: 1280px)',
			medium: '(max-width: 980px)',
			small: '(max-width: 736px)',
			xsmall: '(max-width: 480px)',
			xxsmall: '(max-width: 360px)',
			short: '(min-aspect-ratio: 16/7)',
			xshort: '(min-aspect-ratio: 16/6)'
		});

	// Ready event.
		$(function() {

			// Vars.
				var	$window = $(window),
					$document = $(document),
					$body = $('body'),
					$html = $('html'),
					$bodyHtml = $('body,html'),
					$wrapper = $('#wrapper');

			// Disable animations/transitions until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// Tweaks/fixes.

				// Mobile: Revert to native scrolling.
					if (skel.vars.mobile) {

						// Disable all scroll-assist features.
							settings.keyboardShortcuts.enabled = false;
							settings.scrollWheel.enabled = false;
							settings.scrollZones.enabled = false;
							settings.dragging.enabled = false;

						// Re-enable overflow on body.
							$body.css('overflow-x', 'auto');

					}

				// IE: Various fixes.
					if (skel.vars.browser == 'ie') {

						// Enable IE mode.
							$body.addClass('is-ie');

						// Page widths.
							$window
								.on('load resize', function() {

									// Calculate wrapper width.
										var w = 0;

										$wrapper.children().each(function() {
											w += $(this).width();
										});

									// Apply to page.
										$html.css('width', w + 'px');

								});

					}

				// Polyfill: Object fit.
					if (!skel.canUse('object-fit')) {

						$('.image[data-position]').each(function() {

							var $this = $(this),
								$img = $this.children('img');

							// Apply img as background.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-position', $this.data('position'))
									.css('background-size', 'cover')
									.css('background-repeat', 'no-repeat');

							// Hide img.
								$img
									.css('opacity', '0');

						});

					}

			// Keyboard shortcuts.
				if (settings.keyboardShortcuts.enabled)
					(function() {

						$wrapper

							// Prevent keystrokes inside excluded elements from bubbling.
								.on('keypress keyup keydown', settings.excludeSelector, function(event) {

									// Stop propagation.
										event.stopPropagation();

								});

						$window

							// Keypress event.
								.on('keydown', function(event) {

									var scrolled = false;

									switch (event.keyCode) {

										// Left arrow.
											case 37:
												$document.scrollLeft($document.scrollLeft() - settings.keyboardShortcuts.distance);
												scrolled = true;
												break;

										// Right arrow.
											case 39:
												$document.scrollLeft($document.scrollLeft() + settings.keyboardShortcuts.distance);
												scrolled = true;
												break;

										// Page Up.
											case 33:
												$document.scrollLeft($document.scrollLeft() - $window.width() + 100);
												scrolled = true;
												break;

										// Page Down, Space.
											case 34:
											case 32:
												$document.scrollLeft($document.scrollLeft() + $window.width() - 100);
												scrolled = true;
												break;

										// Home.
											case 36:
												$document.scrollLeft(0);
												scrolled = true;
												break;

										// End.
											case 35:
												$document.scrollLeft($document.width());
												scrolled = true;
												break;

									}

									// Scrolled?
										if (scrolled) {

											// Prevent default.
												event.preventDefault();
												event.stopPropagation();

											// Stop link scroll.
												$bodyHtml.stop();

										}

								});

					})();

			// Scroll wheel.
				if (settings.scrollWheel.enabled)
					(function() {

						// Based on code by @miorel + @pieterv of Facebook (thanks guys :)
						// github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js
							var normalizeWheel = function(event) {

								var	pixelStep = 10,
									lineHeight = 40,
									pageHeight = 800,
									sX = 0,
									sY = 0,
									pX = 0,
									pY = 0;

								// Legacy.
									if ('detail' in event)
										sY = event.detail;
									else if ('wheelDelta' in event)
										sY = event.wheelDelta / -120;
									else if ('wheelDeltaY' in event)
										sY = event.wheelDeltaY / -120;

									if ('wheelDeltaX' in event)
										sX = event.wheelDeltaX / -120;

								// Side scrolling on FF with DOMMouseScroll.
									if ('axis' in event
									&&	event.axis === event.HORIZONTAL_AXIS) {
										sX = sY;
										sY = 0;
									}

								// Calculate.
									pX = sX * pixelStep;
									pY = sY * pixelStep;

									if ('deltaY' in event)
										pY = event.deltaY;

									if ('deltaX' in event)
										pX = event.deltaX;

									if ((pX || pY)
									&&	event.deltaMode) {

										if (event.deltaMode == 1) {
											pX *= lineHeight;
											pY *= lineHeight;
										}
										else {
											pX *= pageHeight;
											pY *= pageHeight;
										}

									}

								// Fallback if spin cannot be determined.
									if (pX && !sX)
										sX = (pX < 1) ? -1 : 1;

									if (pY && !sY)
										sY = (pY < 1) ? -1 : 1;

								// Return.
									return {
										spinX: sX,
										spinY: sY,
										pixelX: pX,
										pixelY: pY
									};

							};

						// Wheel event.
							$body.on('wheel', function(event) {

								// Disable on <=small.
									if (skel.breakpoint('small').active)
										return;

								// Prevent default.
									event.preventDefault();
									event.stopPropagation();

								// Stop link scroll.
									$bodyHtml.stop();

								// Calculate delta, direction.
									var	n = normalizeWheel(event.originalEvent),
										x = (n.pixelX != 0 ? n.pixelX : n.pixelY),
										delta = Math.min(Math.abs(x), 150) * settings.scrollWheel.factor,
										direction = x > 0 ? 1 : -1;

								// Scroll page.
									$document.scrollLeft($document.scrollLeft() + (delta * direction));

							});

					})();

			// Scroll zones.
				if (settings.scrollZones.enabled)
					(function() {

						var	$left = $('<div class="scrollZone left"></div>'),
							$right = $('<div class="scrollZone right"></div>'),
							$zones = $left.add($right),
							paused = false,
							intervalId = null,
							direction,
							activate = function(d) {

								// Disable on <=small.
									if (skel.breakpoint('small').active)
										return;

								// Paused? Bail.
									if (paused)
										return;

								// Stop link scroll.
									$bodyHtml.stop();

								// Set direction.
									direction = d;

								// Initialize interval.
									clearInterval(intervalId);

									intervalId = setInterval(function() {
										$document.scrollLeft($document.scrollLeft() + (settings.scrollZones.speed * direction));
									}, 25);

							},
							deactivate = function() {

								// Unpause.
									paused = false;

								// Clear interval.
									clearInterval(intervalId);

							};

						$zones
							.appendTo($wrapper)
							.on('mouseleave mousedown', function(event) {
								deactivate();
							});

						$left
							.css('left', '0')
							.on('mouseenter', function(event) {
								activate(-1);
							});

						$right
							.css('right', '0')
							.on('mouseenter', function(event) {
								activate(1);
							});

						$wrapper
							.on('---pauseScrollZone', function(event) {

								// Pause.
									paused = true;

								// Unpause after delay.
									setTimeout(function() {
										paused = false;
									}, 500);

							});

					})();

			// Dragging.
				if (settings.dragging.enabled)
					(function() {

						var dragging = false,
							dragged = false,
							distance = 0,
							startScroll,
							momentumIntervalId, velocityIntervalId,
							startX, currentX, previousX,
							velocity, direction;

						$wrapper

							// Prevent image drag and drop.
								.on('mouseup mousemove mousedown', '.image, img', function(event) {
									event.preventDefault();
								})

							// Prevent mouse events inside excluded elements from bubbling.
								.on('mouseup mousemove mousedown', settings.excludeSelector, function(event) {

									// Prevent event from bubbling.
										event.stopPropagation();

									// End drag.
										dragging = false;
										$wrapper.removeClass('is-dragging');
										clearInterval(velocityIntervalId);
										clearInterval(momentumIntervalId);

									// Pause scroll zone.
										$wrapper.triggerHandler('---pauseScrollZone');

								})

							// Mousedown event.
								.on('mousedown', function(event) {

									// Disable on <=small.
										if (skel.breakpoint('small').active)
											return;

									// Clear momentum interval.
										clearInterval(momentumIntervalId);

									// Stop link scroll.
										$bodyHtml.stop();

									// Start drag.
										dragging = true;
										$wrapper.addClass('is-dragging');

									// Initialize and reset vars.
										startScroll = $document.scrollLeft();
										startX = event.clientX;
										previousX = startX;
										currentX = startX;
										distance = 0;
										direction = 0;

									// Initialize velocity interval.
										clearInterval(velocityIntervalId);

										velocityIntervalId = setInterval(function() {

											// Calculate velocity, direction.
												velocity = Math.abs(currentX - previousX);
												direction = (currentX > previousX ? -1 : 1);

											// Update previous X.
												previousX = currentX;

										}, 50);

								})

							// Mousemove event.
								.on('mousemove', function(event) {

									// Not dragging? Bail.
										if (!dragging)
											return;

									// Velocity.
										currentX = event.clientX;

									// Scroll page.
										$document.scrollLeft(startScroll + (startX - currentX));

									// Update distance.
										distance = Math.abs(startScroll - $document.scrollLeft());

									// Distance exceeds threshold? Disable pointer events on all descendents.
										if (!dragged
										&&	distance > settings.dragging.threshold) {

											$wrapper.addClass('is-dragged');

											dragged = true;

										}

								})

							// Mouseup/mouseleave event.
								.on('mouseup mouseleave', function(event) {

									var m;

									// Not dragging? Bail.
										if (!dragging)
											return;

									// Dragged? Re-enable pointer events on all descendents.
										if (dragged) {

											setTimeout(function() {
												$wrapper.removeClass('is-dragged');
											}, 100);

											dragged = false;

										}

									// Distance exceeds threshold? Prevent default.
										if (distance > settings.dragging.threshold)
											event.preventDefault();

									// End drag.
										dragging = false;
										$wrapper.removeClass('is-dragging');
										clearInterval(velocityIntervalId);
										clearInterval(momentumIntervalId);

									// Pause scroll zone.
										$wrapper.triggerHandler('---pauseScrollZone');

									// Initialize momentum interval.
										if (settings.dragging.momentum > 0) {

											m = velocity;

											momentumIntervalId = setInterval(function() {

												// Scroll page.
													$document.scrollLeft($document.scrollLeft() + (m * direction));

												// Decrease momentum.
													m = m * settings.dragging.momentum;

												// Negligible momentum? Clear interval and end.
													if (Math.abs(m) < 1)
														clearInterval(momentumIntervalId);

											}, 15);

										}

								});

					})();

			// Link scroll.
				$wrapper
					.on('mousedown mouseup', 'a[href^="#"]', function(event) {

						// Stop propagation.
							event.stopPropagation();

					})
					.on('click', 'a[href^="#"]', function(event) {

						var	$this = $(this),
							href = $this.attr('href'),
							$target, x, y;

						// Get target.
							if (href == '#'
							||	($target = $(href)).length == 0)
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Calculate x, y.
							if (skel.breakpoint('small').active) {

								x = $target.offset().top - (Math.max(0, $window.height() - $target.outerHeight()) / 2);
								y = { scrollTop: x };

							}
							else {

								x = $target.offset().left - (Math.max(0, $window.width() - $target.outerWidth()) / 2);
								y = { scrollLeft: x };

							}

						// Scroll.
							$bodyHtml
								.stop()
								.animate(
									y,
									settings.linkScrollSpeed,
									'swing'
								);

					});

			// Gallery.
				$('.gallery')
					.on('click', 'a', function(event) {

						var $a = $(this),
							$gallery = $a.parents('.gallery'),
							$modal = $gallery.children('.modal'),
							$modalImg = $modal.find('img'),
							href = $a.attr('href');

						// Not an image? Bail.
							if (!href.match(/\.(jpg|gif|png|mp4)$/))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Lock.
							$modal[0]._locked = true;

						// Set src.
							$modalImg.attr('src', href);

						// Set visible.
							$modal.addClass('visible');

						// Focus.
							$modal.focus();

						// Delay.
							setTimeout(function() {

								// Unlock.
									$modal[0]._locked = false;

							}, 600);

					})
					.on('click', '.modal', function(event) {

						var $modal = $(this),
							$modalImg = $modal.find('img');

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Already hidden? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Stop propagation.
							event.stopPropagation();

						// Lock.
							$modal[0]._locked = true;

						// Clear visible, loaded.
							$modal
								.removeClass('loaded')

						// Delay.
							setTimeout(function() {

								$modal
									.removeClass('visible')

								// Pause scroll zone.
									$wrapper.triggerHandler('---pauseScrollZone');

								setTimeout(function() {

									// Clear src.
										$modalImg.attr('src', '');

									// Unlock.
										$modal[0]._locked = false;

									// Focus.
										$body.focus();

								}, 475);

							}, 125);

					})
					.on('keypress', '.modal', function(event) {

						var $modal = $(this);

						// Escape? Hide modal.
							if (event.keyCode == 27)
								$modal.trigger('click');

					})
					.on('mouseup mousedown mousemove', '.modal', function(event) {

						// Stop propagation.
							event.stopPropagation();

					})
					.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
						.find('img')
							.on('load', function(event) {

								var $modalImg = $(this),
									$modal = $modalImg.parents('.modal');

								setTimeout(function() {

									// No longer visible? Bail.
										if (!$modal.hasClass('visible'))
											return;

									// Set loaded.
										$modal.addClass('loaded');

								}, 275);

							});

		});

})(jQuery);

if (window.CSS && CSS.supports("color", "var(--primary)")) {
  var toggleColorMode = function toggleColorMode(e) {
    // Switch to Light Mode
    if (e.currentTarget.classList.contains("light--hidden")) {
      // Sets the custom html attribute
      document.documentElement.setAttribute("color-mode", "light"); // Sets the user's preference in local storage

      localStorage.setItem("color-mode", "light");
      return;
    }
    /* Switch to Dark Mode
    Sets the custom html attribute */
    document.documentElement.setAttribute("color-mode", "dark"); // Sets the user's preference in local storage

    localStorage.setItem("color-mode", "dark");
  }; // Get the buttons in the DOM

  var toggleColorButtons = document.querySelectorAll(".color-mode__btn"); // Set up event listeners

  toggleColorButtons.forEach(function(btn) {
    btn.addEventListener("click", toggleColorMode);
  });
} else {
  // If the feature isn't supported, then we hide the toggle buttons
  var btnContainer = document.querySelector(".color-mode__header");
  btnContainer.style.display = "none";
}

window.onload = init();
function init(){
	canvaslight = document.getElementById('canvas-light');
	ctxlight = canvaslight.getContext('2d');
	canvaslight.width = window.innerWidth;
	canvaslight.height = window.innerHeight;
	canvaslight.addEventListener('mousemove',MouseMove,false);
	/*mouse = {x:0,y:0}*/
	let mouse = {
	    x: null,
	    y: null,
	}

	window.addEventListener("mousemove", function (event) {
	    mouse.x = event.x;
	    mouse.y = event.y;

	});
	/*window.addEventListener("mouseout", function (event) {
	    mouse.x = undefined;
	    mouse.y = undefined;

	});*/
	window.addEventListener("resize", function (event) {
	    canvaslight.width = innerWidth;
	    canvaslight.height = innerHeight;

	});
	particleHolder = [];
	x = 100;
	y = 100;
	angle = 0.2;
	radius = canvaslight.width * canvaslight.height / 9000; //80
	particleCount = 1000;
	color = [
	'rgba(106, 210, 231, 0.5)',
	'rgba(250, 104, 0, 0.5)',
	'rgba(243, 132, 48, 0.5)',
	'rgba(198, 244, 98, 0.5)',
	'rgba(255, 107, 107, 0.5)',
	'rgba(250, 204, 0, 0.5)',
	 'rgba(232, 125, 2, 0.5)',
	'rgba(202, 232, 105, 0.5)',
	'rgba(0, 169, 199, 0.5)',
	'rgba(63, 191, 202, 0.5)',
	'rgba(174, 225, 55, 0.5)',
	 'rgba(208, 231, 80, 0.5)',
	'rgba(78, 189, 233, 0.5)',
	'rgba(37, 174, 228, 0.5)',
	'rgba(249, 214, 36, 0.5)',
	'rgba(240, 122, 25, 0.5)',
	'rgba(239, 169, 46, 0.5)',
	'rgba(136, 197, 38, 0.5)',
	'rgba(190, 242, 2, 0.5)',
	'rgba(250, 42, 0, 0.5)',
	'rgba(0, 178, 255, 0.5)',
	'rgba(127, 255, 36, 0.5)',
	'rgba(194, 255, 102, 0.5)',
	'rgba(200, 255, 0, 0.5)',
	'rgba(19, 205, 75, 0.5)',
	'rgba(126, 112, 215, 0.5)',
	'rgba(187, 233, 7, 0.5)',
	'rgba(192, 250, 56, 0.5)',
	'rgba(170, 255, 0, 0.5)',
	'rgba(255, 170, 0, 0.5)',
	'rgba(255, 0, 170, 0.5)',
	'rgba(170, 0, 255, 0.5)',
	'rgba(0, 170, 255, 0.5)',
	'rgba(255, 255, 0, 0.5)'
	];


	function MouseMove(event)
	{
		mouse.x = event.pageX - canvaslight.offsetLeft;
		mouse.y = event.pageY - canvaslight.offsetLeft;
	}
	for(i = 0; i < particleCount ; i++)
	{particleHolder.push(new generateParticles());}
	function generateParticles()
	{
		this.x = Math.random()*canvaslight.width;
		this.y = Math.random()*canvaslight.height;
		this.color = color[Math.floor(Math.random()*color.length)];
		this.rad = Math.floor(Math.random()*8);
	}
	function vibrate()
	{
		/*if (localStorage.getItem("color-mode") === "dark" ||
	        (window.matchMedia("(prefers-color-scheme: dark)").matches &&
	          !localStorage.getItem("color-mode"))) {
	    	ctxlight.fillStyle = '#34292e';
	    } /*else {
	      	ctxlight.fillStyle = '#f1becb';*/
	    ctxlight.fillStyle = '#f1becb';
		ctxlight.fillRect(0, 0, canvaslight.width, canvaslight.height);
		for(var j = 0; j < particleHolder.length; j++)
		{
		var p = particleHolder[j];
		var distanceX = p.x - mouse.x;
		var distanceY = p.y - mouse.y;
		particleDistance =  Math.sqrt(distanceX*distanceX + distanceY*distanceY);

		particleMouse = Math.max( Math.min( 75 / ( particleDistance /p.rad ), 10 ), 0.1 );
		ctxlight.beginPath();
		ctxlight.fillStyle = p.color;
		ctxlight.arc(p.x + Math.sin(angle++*Math.cos(radius++)), 
		p.y - Math.cos(angle++*Math.sin(radius++)), 
		p.rad*particleMouse, Math.PI*2, false);
		ctxlight.fill();
		}
	}
	setInterval(vibrate, 30);
};

window.onload = initdark();
function initdark(){
	canvasdark = document.getElementById('canvas-dark');
	ctxdark = canvasdark.getContext('2d');
	canvasdark.width = window.innerWidth;
	canvasdark.height = window.innerHeight;
	canvasdark.addEventListener('mousemove',MouseMovedark,false);
	/*mousedark = {x:0,y:0}*/
	let mousedark = {
	    x: null,
	    y: null,
	}

	window.addEventListener("mousemove", function (eventdark) {
	    mousedark.x = eventdark.x;
	    mousedark.y = eventdark.y;

	});
	/*window.addEventListener("mouseout", function (eventdark) {
	    mousedark.x = undefined;
	    mousedark.y = undefined;

	});*/
	window.addEventListener("resize", function (eventdark) {
	    canvasdark.width = innerWidth;
	    canvasdark.height = innerHeight;

	});
	particleHolderdark = [];
	x = 100;
	y = 100;
	angledark = 0.2;
	radiusdark = canvasdark.width * canvasdark.height / 9000; //80
	particleCountdark = 1000;
	colordark = [
	'rgba(149, 45, 24, 0.5)',
	'rgba(5, 151, 255, 0.5)',
	'rgba(12, 123, 207, 0.5)',
	'rgba(57, 11, 157, 0.5)',
	'rgba(0, 148, 148, 0.5)',
	'rgba(5, 51, 0, 0.5)',
	 'rgba(23, 130, 157, 0.5)',
	'rgba(53, 23, 150, 0.5)',
	'rgba(255, 86, 56, 0.5)',
	'rgba(192, 64, 53, 0.5)',
	'rgba(81, 31, 200, 0.5)',
	 'rgba(47, 24, 175, 0.5)',
	'rgba(177, 66, 22, 0.5)',
	'rgba(218, 81, 27, 0.5)',
	'rgba(6, 41, 219, 0.5)',
	'rgba(15, 133, 230, 0.5)',
	'rgba(16, 86, 209, 0.5)',
	'rgba(119, 58, 217, 0.5)',
	'rgba(65, 13, 253, 0.5)',
	'rgba(5, 213, 255, 0.5)',
	'rgba(255, 77, 0, 0.5)',
	'rgba(128, 0, 219, 0.5)',
	'rgba(61, 0, 153, 0.5)',
	'rgba(55, 0, 255, 0.5)',
	'rgba(236, 50, 180, 0.5)',
	'rgba(129, 143, 40, 0.5)',
	'rgba(68, 22, 248, 0.5)',
	'rgba(63, 5, 199, 0.5)',
	'rgba(85, 0, 255, 0.5)',
	'rgba(0, 85, 255, 0.5)',
	'rgba(0, 255, 85, 0.5)',
	'rgba(85, 255, 0, 0.5)',
	'rgba(255, 85, 0, 0.5)',
	'rgba(0, 0, 255, 0.5)'
	];


	function MouseMovedark(eventdark)
	{
		mousedark.x = eventdark.pageX - canvasdark.offsetLeft;
		mousedark.y = eventdark.pageY - canvasdark.offsetLeft;
	}
	for(i = 0; i < particleCountdark ; i++)
	{particleHolderdark.push(new generateParticlesdark());}
	function generateParticlesdark()
	{
		this.x = Math.random()*canvasdark.width;
		this.y = Math.random()*canvasdark.height;
		this.colordark = colordark[Math.floor(Math.random()*colordark.length)];
		this.raddark = Math.floor(Math.random()*8);
	}
	function vibratedark()
	{
		/*if (localStorage.getItem("colordark-mode") === "dark" ||
	        (window.matchMedia("(prefers-colordark-scheme: dark)").matches &&
	          !localStorage.getItem("colordark-mode"))) {
	    	ctxdark.fillStyle = '#34292e';
	    } /*else {
	      	ctxdark.fillStyle = '#f1becb';*/
	    ctxdark.fillStyle = '#34292e';
		ctxdark.fillRect(0, 0, canvasdark.width, canvasdark.height);
		for(var j = 0; j < particleHolderdark.length; j++)
		{
		var pdark = particleHolderdark[j];
		var distanceXdark = pdark.x - mousedark.x;
		var distanceYdark = pdark.y - mousedark.y;
		particleDistancedark =  Math.sqrt(distanceXdark*distanceXdark + distanceYdark*distanceYdark);

		particleMousedark = Math.max( Math.min( 75 / ( particleDistancedark /pdark.raddark ), 10 ), 0.1 );
		ctxdark.beginPath();
		ctxdark.fillStyle = pdark.colordark;
		ctxdark.arc(pdark.x + Math.sin(angledark++*Math.cos(radiusdark++)), 
		pdark.y - Math.cos(angledark++*Math.sin(radiusdark++)), 
		pdark.raddark*particleMousedark, Math.PI*2, false);
		ctxdark.fill();
		}
	}
	setInterval(vibratedark, 30);
};