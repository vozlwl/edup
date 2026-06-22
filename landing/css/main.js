$(function (){
	scrolled();
	accordion();
	toggleActiveClass();
	if($(window).scrollTop() > 0){
		$(".header-wrap").addClass("active");
	}

	const sc = location.search;
	$("input[name=urlParams]").val(sc);
	
});

var didScroll;

var scrolled = function(){
	$(window).scroll(function(event){
		didScroll = true;
	});
}

var ifScrolled = function(){
	var windowTop = $(window).scrollTop();
	if(windowTop > 0){
		$(".header-wrap").addClass("active");
	}
	else{
		$(".header-wrap").removeClass("active");
	}
}

setInterval(function(){
	if(didScroll){
		ifScrolled();
		didScroll = false;
	}
}, 400);

$('.swap-item').on('mouseenter', function(){
    $(this).siblings('.swap-item').removeClass('active');
    $(this).addClass('active');
});

var accordion = function (){
	var $el = $('.accordion-list');
	var openTrigger = $el.find('.acc-trigger')
	openTrigger.on('click', function (){
		var par = $(this).closest('li')
		if (!par.hasClass('active')){
			par.siblings('').removeClass('active')
			par.siblings('').find('.acc-target').slideUp(150);
			par.addClass('active');
			par.find('.acc-target').slideDown(150);
		} else {
			par.removeClass('active');
			par.find('.acc-target').slideUp(150);
		}
	})
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

	var test = $.attr(this, 'href');
		test = test.split("#");
	var test = "."+test[1];

	if($(window).width() > 1100){
		$('html, body').animate({
			scrollTop: $(test).offset().top-100
		}, 500);
	} else{
		$('html, body').animate({
			scrollTop: $(test).offset().top-65
		}, 500);
	}
});

$(document).ready(function(){
    $('input[type="number"]').on('keyup',function(){
        v = parseInt($(this).val());
        min = parseInt($(this).attr('min'));
        max = parseInt($(this).attr('max'));

        if (v < min){
            $(this).val(min);
        } else if (v > max){
            $(this).val(max);
        }
    });

	$('.slider').slick({
		centerMode: true,
		infinite: true,
		variableWidth: true,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,	
		dots: true,
	})
});

var toggleActiveClass = function (){
	var $el = $('.togClass');
	$el.on('click', function (){
		$(this).toggleClass('active');
	})
}
function showPP(){
	window.open('https://hrd.edup.co.kr/bbs/register.php','_blank');
}