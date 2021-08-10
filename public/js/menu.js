jQuery(document).ready(function ($) {
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	var MQL = 0;

	//primary navigation slide-in effect
	if ($(window).width() > MQL) {
		var headerHeight = $('.box-header').height();
		$(window).on('scroll',
			{
				previousTop: 0
			},
			function () {
				var currentTop = $(window).scrollTop();
				//check if user is scrolling up
				if (currentTop < this.previousTop) {
					//if scrolling up...
					if (currentTop > 0 && $('.box-header').hasClass('is-fixed')) {
						$('.box-header').addClass('is-visible');
						$('.box-menu-text').addClass('is-visible');
						$('.box-menu-icon').addClass('is-visible');
						$('.big-booler img').addClass('is-visible');				
						$('.box-primary-nav-lg li a').addClass('is-black');

					} else {
						$('.box-header').removeClass('is-visible is-fixed');
						$('.box-menu-text').removeClass('is-visible');
						$('.box-menu-icon').removeClass('is-visible');
						$('.big-booler img').removeClass('is-visible');
					}
					if (currentTop === 0 && window.location.pathname === '/' || window.location.pathname === '/#0') {
						$('.box-primary-nav-lg li a').removeClass('is-black');
						$('.box-primary-nav-lg li a').addClass('is-white');
					}
					else {
						$('.box-primary-nav-lg li a').removeClass('is-white');
						$('.box-primary-nav-lg li a').addClass('is-black');
					}
				} else {
					//if scrolling down...
					$('.box-header').removeClass('is-visible');
					if (currentTop > headerHeight && !$('.box-header').hasClass('is-fixed')) $('.box-header').addClass('is-fixed');
				}
				this.previousTop = currentTop;



			});
	}

	//open/close primary navigation
	$('.box-primary-nav-trigger').on('click', function (event) {
		event.preventDefault();
		$('.box-menu-icon').toggleClass('is-clicked');
		$('.box-header').toggleClass('menu-is-open');

		$('.box-menu-text').toggleClass('menu-is-open');
		$('.box-menu-icon').toggleClass('menu-is-open');
		$('.big-booler img').toggleClass('menu-is-open');

		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if ($('.box-primary-nav').hasClass('is-visible')) {
			$('.box-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.box-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$('body').addClass('overflow-hidden');
			});
		}
	});

	// detect if on home screen, for white colors on top
	if (window.location.pathname !== '/' || window.location.pathname !== '/#0') {
		$('.box-menu-text').addClass('is-black');
		$('.box-menu-icon').addClass('is-black');
		$('.big-booler img').addClass('is-black');
		$('.box-primary-nav-lg li a').removeClass('is-white');
	} 
	if (window.location.pathname === '/' || window.location.pathname === '/#0'){
		$('.box-menu-text').removeClass('is-black');
		$('.box-menu-icon').removeClass('is-black');
		$('.big-booler img').removeClass('is-black');
		$('.box-primary-nav-lg li a').addClass('is-white');
	}

	//determine to show cart or not
	if (window.location.pathname.includes('/merch')) {
		$('.cart-btn').removeClass('is-hidden');
		$('.li-cart-btn').removeClass('.is-hidden');
	} else {
		$('.cart-btn').addClass('is-hidden');
		$('.li-cart-btn').addClass('is-hidden');
	}
});