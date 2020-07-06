$(function(){
	var ieTest = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		imgURL = "http://img.khan.co.kr/spko/storytelling/2020/massmedia/",
		isMobile = screenWidth <= 800 && true || false,
		isNotebook = (screenWidth <= 1300 && screenHeight < 750) && true || false,
		isMobileLandscape = ( screenWidth > 400 && screenWidth <= 800 && screenHeight < 450 ) && true || false;
	window.onbeforeunload = function(){ window.scrollTo(0, 0) ;}
	var randomRange = function(n1, n2) {
		return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
	};
	$(window).resize(function() {
		screenWidth = $(window).width();
		screenHeight = $(window).height();
    });

	$(".close-ie-block").on("click", function(){
		$(".ie-block-9").hide();
	})

	/*


	var MakeChr = {};
	MakeChr.userChoice = [];
	MakeChr.userChoice.step1 = {};
	MakeChr.userChoice.step2 = {};
	MakeChr.userChoice.step3 = {};

	//사용자가 선택지 클릭할 때, 값을 데이터 배열에 넣는 역할.
	makeChr.putUserChoice = function(){
	
	};

	//사용자의 선택값에 따라 캐릭터 만드는 메소드
	makeChr.makingCustomChr = function(){
		
	};

	//대중매체 유사 캐릭터 반환
	makeChr.findSimilarChr = function(){
		
	};
	
	*/

		
	


	/******** 모바일 전용 조정 ********/
	if(isMobile==true){

	}
	/******** 모바일 전용 조정 ********/

	function init(){
	
	}

	$(".loading-page").fadeOut(200, function(){
		init();
	});


	var nowScroll;
	var videoPos = "before";
	//$(".fixed-slider-area .fixed-el").css({"padding-top": ((screenHeight-$(".map-holder").height())/2) +"px"});
	//$(".fixed-slider-area").css({"height": ($(".map-fixed-slider").height()+screenHeight)+"px"});
	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
		var nowScrollWithCon = nowScroll+screenHeight*0.6;
		var endPoint = $(".fixed-slider-area").offset().top + $(".fixed-slider-area").height()-screenHeight;

		if( nowScroll >= $(".fixed-slider-area").offset().top && nowScroll < endPoint ){
			if(videoPos !== "on"){
				videoPos = "on";
				$(".fixed-el").addClass("fixed-el-fixed");
				$(".fixed-el").removeClass("fixed-el-bottom");
				$(".fixed-slider-area").addClass("fixed-slider-area-bgBlack");
			}

		}else if( nowScroll < $(".fixed-slider-area").offset().top ){
			if(videoPos !== "before"){
				videoPos = "before";
				$(".fixed-el").removeClass("fixed-el-fixed");
				$(".fixed-el").removeClass("fixed-el-bottom");
				$(".map--layer").hide();
				$(".fixed-slider-area").removeClass("fixed-slider-area-bgBlack");

			}
		}else if( nowScroll >= endPoint){
			if(videoPos !== "after"){
				videoPos = "after";
				$(".fixed-el").removeClass("fixed-el-fixed");
				$(".fixed-el").addClass("fixed-el-bottom");
				$(".fixed-slider-area").removeClass("fixed-slider-area-bgBlack");
			}
		}
		console.log(videoPos);
	});
	

});

function sendSns(s) {
  var url = encodeURIComponent(location.href),
	  txt = encodeURIComponent($("title").html());
  switch (s) {
    case 'facebook':
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
      break;
    case 'twitter':
      window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
      break;
  }
}
