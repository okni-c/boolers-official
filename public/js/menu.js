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
					} else {
						$('.box-header').removeClass('is-visible is-fixed');

						$('.box-menu-text').removeClass('is-visible');
						$('.box-menu-icon').removeClass('is-visible');
						$('.big-booler img').removeClass('is-visible');
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
	$('.box-primary-nav-trigger').on('click', function () {
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
});