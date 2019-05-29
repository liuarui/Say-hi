/**
 * author Solitary bamboo
 */

(function(window , factory){
	/*
	 * carousel  - carousel(carouselWrap, parameter)
	 * @param {HTMLElement} carouselWrap - carousel module
	 * @param {Object} parameter
	 * 		type: leftright / updown / fade 	Default value(type: 'leftright')
	 * 		autoplay: boolean (true / fasle)
	 *		time: number  Default value(3000)  -  time interval
	 * @example carousel( $('.bannerwrap'), {autoplay:3000 , time:1000})
	 */
	var carousel = function(carouselWrap, parameter){
		return new carousel.fn.init(carouselWrap , parameter);
	}
	carousel.fn = carousel.prototype = {
		constructor: carousel,
		ind: 0,
		prev: function(parameter, pb_carousel, pb_carousel_ind, len){
			if(parameter.type == 'fade'){
				pb_carousel.eq(this.ind).fadeOut(300);
				if(this.ind == 0) pb_carousel.eq(len - 1).fadeIn(300);
				else pb_carousel.eq(this.ind).prev().fadeIn(300);
				this.ind--;
				if(this.ind < 0) this.ind=len-1;
				this.carousel_ind(pb_carousel_ind);
			}else if(parameter.type == 'updown'){
				pb_carousel.eq(this.ind).animate({'top': "100%"},300);
				if(this.ind == 0) pb_carousel.eq(len - 1).css('top', '-100%').show().animate({'top':0},300);
				else pb_carousel.eq(this.ind).prev().css('top', '-100%').show().animate({'top':0},300);
				this.ind--;
				if(this.ind < 0) this.ind=len-1;
				this.carousel_ind(pb_carousel_ind);
			}else if(parameter.type == 'leftright' || parameter.type == undefined){
				pb_carousel.eq(this.ind).animate({'left': "100%"},300);
				if(this.ind == 0) pb_carousel.eq(len - 1).css('left', '-100%').show().animate({'left':0},300);
				else pb_carousel.eq(this.ind).prev().css('left', '-100%').show().animate({'left':0},300);
				this.ind--;
				if(this.ind < 0) this.ind=len-1;
				this.carousel_ind(pb_carousel_ind);
			}
		},
		next: function(parameter, pb_carousel, pb_carousel_ind, len){
			if(parameter.type == 'fade'){
				pb_carousel.eq(this.ind).fadeOut(300);
				if(this.ind == len-1) pb_carousel.eq(0).fadeIn(300);
				pb_carousel.eq(this.ind).next().fadeIn(300);
				this.ind++;
				if(this.ind > len-1) this.ind = 0;
				this.carousel_ind(pb_carousel_ind);
			}else if(parameter.type == 'updown'){
				pb_carousel.eq(this.ind).animate({'top': "-100%"},300);
				if(this.ind == len-1) pb_carousel.eq(0).css('top', '100%').show().animate({'top':0},300);
				pb_carousel.eq(this.ind).next().css('top', '100%').show().animate({'top':0},300);
				this.ind++;
				if(this.ind > len-1) this.ind = 0;
				this.carousel_ind(pb_carousel_ind);
			}else if(parameter.type == 'leftright' || parameter.type == undefined){
				pb_carousel.eq(this.ind).animate({'left': "-100%"},300);
				if(this.ind == len-1) pb_carousel.eq(0).css('left', '100%').show().animate({'left':0},300);
				pb_carousel.eq(this.ind).next().css('left', '100%').show().animate({'left':0},300);
				this.ind++;
				if(this.ind > len-1) this.ind = 0;
				this.carousel_ind(pb_carousel_ind);
			}
		},
		carousel_ind: function(pb_carousel_ind){
			pb_carousel_ind.each(function(){
				$(this).removeClass('pb-this');
			})
			pb_carousel_ind.eq(this.ind).addClass('pb-this');
		},
		click: function(carouselWrap, parameter){
			var _this = this,
				len = carouselWrap.children('.pb-carousel').children().length,
				pb_carousel = carouselWrap.children('.pb-carousel').children(),
				pb_carousel_ind = carouselWrap.children('.pb-carousel-ind').children();
			carouselWrap.children('.pb-arrow-prev').click(function(){
				_this.prev(parameter, pb_carousel, pb_carousel_ind, len);
			});
			carouselWrap.children('.pb-arrow-next').click(function(){
				_this.next(parameter, pb_carousel, pb_carousel_ind, len);
			});
			pb_carousel_ind.click(function(){
				if($(this).index() != _this.ind){
					if(parameter.type == 'fade'){
						pb_carousel.eq(_this.ind).fadeOut(300);
						_this.ind = $(this).index();
						pb_carousel.eq(_this.ind).fadeIn(300);
					}else if(parameter.type == 'updown'){
						pb_carousel.eq(_this.ind).animate({'top': "-100%"},300);
						_this.ind = $(this).index();
						pb_carousel.eq(_this.ind).css('top', '100%').show().animate({'top':0},300);
					}else if(parameter.type == 'leftright' || parameter.type == undefined){
						pb_carousel.eq(_this.ind).animate({'left': "-100%"},300);
						_this.ind = $(this).index();
						pb_carousel.eq(_this.ind).css('left', '100%').show().animate({'left':0},300);
					}
				}
				_this.carousel_ind(pb_carousel_ind);
			})
		},
		autoPlay: function(carouselWrap, parameter){	
			var _this = this,
				time = parameter.time || 3000,
				len = carouselWrap.children('.pb-carousel').children().length,
				pb_carousel = carouselWrap.children('.pb-carousel').children(),
				pb_carousel_ind = carouselWrap.children('.pb-carousel-ind').children(),
				timer = setInterval(function(){
					_this.next(parameter, pb_carousel, pb_carousel_ind, len);
			}, time);
			carouselWrap.on('mouseover', function(){
				clearInterval(timer)
			});
			carouselWrap.on('mouseout', function(){
				timer = setInterval(function(){
					_this.next(parameter, pb_carousel, pb_carousel_ind, len);
				}, time);
			});
		},
		arrow: function(carouselWrap, parameter){
			if(parameter.arrowtype == 'move'){
				carouselWrap.on('mouseenter', function(){
					$(this).children('.pb-arrow-prev').fadeIn();
				});
				carouselWrap.on('mouseleave', function(){
					$(this).children('.pb-arrow-prev').fadeOut();
				});
				carouselWrap.on('mouseenter', function(){
					$(this).children('.pb-arrow-next').fadeIn();
				});
				carouselWrap.on('mouseleave', function(){
					$(this).children('.pb-arrow-next').fadeOut();
				});
			}else if(parameter.arrowtype == 'none'){
				carouselWrap.children('.pb-arrow-prev').hide();
				carouselWrap.children('.pb-arrow-next').hide();
			}
		},
		init: function(carouselWrap , parameter){
			this.carouselWrap = carouselWrap;
			this.parameter = parameter;
			if(this.parameter.type == 'updown') this.carouselWrap.attr('type','updown');
			this.arrow(this.carouselWrap, this.parameter);
			var autoplay = (typeof this.parameter.autoplay === 'boolean') ? this.parameter.autoplay : true;
			this.click(this.carouselWrap, this.parameter);
			if(autoplay) this.autoPlay(this.carouselWrap, this.parameter);
		}
	}
	carousel.fn.init.prototype = carousel.fn;
	window.carousel = carousel;
}(typeof window !== 'undefined' ? window : this ,jQuery));

	
