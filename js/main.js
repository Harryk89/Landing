var widthWindow = document.documentElement.clientWidth  * 5 * 0.01;
var header = $('.layout-header');
var main = $('.main');
var ceo = $('.ceo');
var about = $('.about');
var profil = $('.profil');
var alumProfil = $('.alum-profil');
var block = $('.double-silver');
var system = $('.system');
var footer = $('.layout-footer');
var windowBottom, block2Bottom, oldWindowBottom, block2Down, show;

$(window).scroll(function() {
    if (MoveKvadrat2()) {
        Move();
    };

    show = $(window).scrollTop() + header[0].clientHeight
    if (show > ceo.offset().top) {
    	ShowGreen();
    } else {
    	ShowWhite();
    }

    if (show > about.offset().top & show < about.offset().top + (about[0].clientHeight )) {
    	WhiteFont();
    }

});

function MoveKvadrat2() {
    windowBottom = $(window).scrollTop() + $(window).height() - widthWindow * 4;
    block2Bottom = block.offset().top;
    return windowBottom >= block2Bottom;
}

function ShowGreen () {
	$('#biz_logo').hide();
	$('#logo_green').show();
	$('.navi').css('color', '#000000');	
	$('.bar').css('border-left-color', '#000000');	
}

function ShowWhite () {
	$('#biz_logo').show();
    $('#logo_green').hide();
    $('.navi').css('color', '#fff');
    $('.bar').css('border-left-color', '#fff');
}

function BlackFont() {
	$('.navi').css('color', '#000000');
}

function WhiteFont() {
	$('.navi').css('color', '#fff');
	$('.bar').css('border-left-color', '#fff');
}

function Move() {
	var duration = 1300; //'slow'
	$(".icon").each(function(index) {
	    $(this).delay(duration * index).fadeIn(duration);
	});
}

$(document).ready(function () {

	var l = $(window).width();
    if (l < 1024) $('.vid').get(0).pause();    	
    else $('.vid').get(0).play();

	$('#biz_logo').show();

	$(".toggle-icon").click(function() {
	    $('#nav-container').toggleClass("pushed");
	    $('#biz_logo').toggleClass("pushing");
	    $('#logo_green').toggleClass("pushing");
	    $('.main').toggleClass("push");
	    $('.mob_menu').toggleClass("go");
	    // $('.bar').toggleClass("go");
	});

	$(".mob_navi").click(function() {
	    $('#nav-container').toggleClass("pushed");
	    $('#biz_logo').toggleClass("pushing");
	    $('#logo_green').toggleClass("pushing");
	    $('.main').toggleClass("push");
	    $('.mob_menu').toggleClass("go");
	    // $('.bar').toggleClass("go");
	});

	$(document).bind('mousewheel DOMMouseScroll', function(event) {
	    scroll(event);
	});

	var num = 1;
	var scrolling = false;
	var up, top;

	function scroll(event) {
	    event.preventDefault();
	    if (!scrolling) {
		    scrolling = true;
		    console.log('event.originalEvent.wheelDelta ::::', event.originalEvent.wheelDelta)

		    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
		    	up = $(window).scrollTop() - document.documentElement.clientHeight;
		        $('html, body').animate({
			        scrollTop: up
			    }, 1000, "linear", function() {
			        scrolling = false;
			    });
		    } else {
		    	up = $(window).scrollTop() + document.documentElement.clientHeight;
		        $('html, body').animate({
			        scrollTop: up
			    }, 1000, "linear", function() {
			        scrolling = false;
		    	});
		    }
	    }
	}

	$("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });


	var startPoint={};
	var nowPoint;
	var ldelay;
	var posPage = $(window).scrollTop();
	document.addEventListener('touchstart', function(event) {
		event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].clientY ;
		ldelay=new Date(); 
	}, false);

	/*Ловим движение пальцем*/
	document.addEventListener('touchmove', function(event) {
		event.stopPropagation();
		var otk={};
		nowPoint=event.changedTouches[0];
		otk.y=nowPoint.clientY-startPoint.y;
		/*Обработайте данные*/
		/*Для примера*/
		
		if(Math.abs(otk.y)>150){
			if(otk.y<0){
				posPage = posPage + document.documentElement.clientHeight;
		        $('html, body').animate({
			        scrollTop: posPage
			    }, 1000, "linear", function() {
			        scrolling = false;
		    	});		    	
			}
			if(otk.y>0){
				posPage = posPage - document.documentElement.clientHeight;
		        $('html, body').animate({
			        scrollTop: posPage
			    }, 1000, "linear", function() {
			        scrolling = false;
		    	});
			}
			startPoint={x:nowPoint.pageX,y:nowPoint.clientY};
		}
		
	}, false);

	/*Ловим отпускание пальца*/
	document.addEventListener('touchend', function(event) {
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.clientY);
		if ((xAbs > 20 || yAbs > 20) && (pdelay.getTime()-ldelay.getTime())<200) {
			if (xAbs > yAbs) {
				if (nowPoint.pageX < startPoint.x){/*СВАЙП ВЛЕВО*/}
				else {/*СВАЙП ВПРАВО*/}
			} else {
				if (nowPoint.clientY < startPoint.y){
					posPage = posPage + document.documentElement.clientHeight;
			        $('html, body').animate({
				        scrollTop: posPage
				    }, 1000, "linear", function() {
				        scrolling = false;
			    	});
				} else {
					posPage = posPage - document.documentElement.clientHeight;
			        $('html, body').animate({
				        scrollTop: posPage
				    }, 1000, "linear", function() {
				        scrolling = false;
			    	});
				}
				startPoint={x:nowPoint.pageX,y:nowPoint.clientY};
			}
		} else {
			// $('html, body').animate({
		 //        scrollTop: posPage
		 //    }, 500, "linear", function() {
		 //        scrolling = false;
	  //   	});
		}
	}, false);

});

$(window).resize(function() {    
    var l = $(window).width();
    if (l < 1024) $('.vid').get(0).pause();    	
    else $('.vid').get(0).play();    
});
