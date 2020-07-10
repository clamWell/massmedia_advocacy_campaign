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
	
	/*************make speach card***************/
	var speachCard = {
		data : s_card_data,
		cardListHolder : $(".speach-list ul"),
		printTemplate : function(i){
			var d = this.data[i];
			var n = randomRange(1, 7);
			var template = ("<li class='spc-card'><div class='spc-card-wrap'><div class='card-index'><p>"+ ((i+1<10)? ("0"+(i+1)) : i+1) +"</p></div><div class='card-body card-body-0"+n+"'><div class='card-bg'><img src='img/s-c-"+((i+1<10)? ("0"+(i+1)): i+1)+".jpg' alt=''></div><div class='spc-text'><div class='quoto quoto-start'><img src='img/quoto-start.png' alt=''></div><div class='text-holder'><p>"+ d.spc +"</p></div><div class='quoto quoto-end'><img src='img/quoto-end.png' alt=''></div></div></div></div><div class='media-info'><p><span class='cont-name'>" + d.contName + "</span><span class='slash'>I</span><span class='maker'>"+ d.maker + "</span><span class='slash'>I</span><span class='year'>"+ d.year +"</span></p></div></li>");
			return template;
		},
		makeCard : function(){
			//document.querySelector(".speach-list ul").innerHTML = "";
			this.cardListHolder.html("");
			for(i=0;i<this.data.length;i++){
				this.cardListHolder.append(this.printTemplate(i));
			}
		}


	};



	/*******Video Slider function******/
	var nowScroll;
	var videoSlider = {
		videoStatus : "before",
		sliderBody : $(".fixed-slider-area"),
		videoEndPoint : function(){
			return (this.sliderBody.offset().top + this.sliderBody.height()-screenHeight);
		},
		checkVideoStatus : function(sc){
			if( sc >= this.sliderBody.offset().top && sc < this.videoEndPoint() ){
				return "on";
			}else if( sc < this.sliderBody.offset().top ){
				return "before"
			}else if( sc >= this.videoEndPoint() ){
				return "after";
			}
		},
		adjustVideoHolder :  function(){
			console.log(this.videoStatus);
			var $fixedEl = $(".fixed-el");
			if(this.videoStatus == "on"){
				$fixedEl.addClass("fixed-el-fixed");
				$fixedEl.removeClass("fixed-el-bottom");
				this.sliderBody.addClass("sder-bck");
			}else if( this.videoStatus == "before"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.removeClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
			}else if( this.videoStatus == "after"){
				$fixedEl.removeClass("fixed-el-fixed");
				$fixedEl.addClass("fixed-el-bottom");
				this.sliderBody.removeClass("sder-bck");
			}
		}
	
	}
	/*******Video Slider function******/


	function showUpImgAni(){
		showupAniDone = true;
		$(".sw--01").find("img").animate({"top":"0px"}, 1000, "easeOutBack", function(){
			$(".sw--02").find("img").animate({"bottom":"0px"}, 1000, "easeOutBack");
		});
	}
	

	/********progress********/
	var progressBar = {
		progressStatus : false,
		showProgress : function(){
			$(".fixed-navi").stop().animate({"right":"10px"},500); 
		},
		hideProgress : function(){
			$(".fixed-navi").stop().animate({"right":"-200px"},500); 
		},
		setProgress : function(sc){
			var fullProgress = $(document).height()-$(window).height()-( $(".footer-area").height()+$(".digital-list").height() +$(".common-footer").height());	
			var ScrollPer = (sc/fullProgress)*100;
			if( (sc<$(".sec--01").offset().top || sc > fullProgress) && (this.progressStatus == true)){
				this.progressStatus = false;
				this.hideProgress();
			}else if((sc>=$(".sec--01").offset().top && sc <= fullProgress) && (this.progressStatus == false) ){
				this.progressStatus = true;
				this.showProgress();
			}

			if(isMobile==true){
				$(".progress").css({"width":ScrollPer+"%"});
			}else {
				$(".progress").css({"height":ScrollPer+"%"});
			}	
		
		}
	}

	/*
	var progressStatus = false;
	function showProgress(){
		$(".fixed-navi").stop().animate({"right":"10px"},500); 
	};
	function hideProgress(){
		$(".fixed-navi").stop().animate({"right":"-200px"},500); 
	};
	function setProgress(sc){
		var fullScroll = $(document).height()-$(window).height()-( $(".footer-area").height()+$(".digital-list").height() +$(".common-footer").height());	
		var ScrollPer = (sc/fullScroll)*100;
		if( (sc<$(".sec--01").offset().top || sc > fullScroll) && (progressStatus == true)){
			progressStatus = false;
			hideProgress();
		}else if((sc>=$(".sec--01").offset().top && sc <= fullScroll) && (progressStatus == false) ){
			progressStatus = true;
			showProgress();
		}
		if(isMobile==true){
			$(".progress").css({"width":ScrollPer+"%"});
		}else {
			$(".progress").css({"height":ScrollPer+"%"});
		}	

	}*/
	/********progress********/

	/******** 모바일 전용 조정 ********/
	if(isMobile==true){

	}
	/******** 모바일 전용 조정 ********/

	function init(){
		speachCard.makeCard();
		
	}

	$(".loading-page").fadeOut(200, function(){
		init();
	});


	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
		var nowScrollWithCon = nowScroll+screenHeight*0.6;

		if( videoSlider.videoStatus !== videoSlider.checkVideoStatus(nowScroll)){
			videoSlider.videoStatus = videoSlider.checkVideoStatus(nowScroll);
			videoSlider.adjustVideoHolder();
		}
		
		var showupAniDone = false; 
		if( nowScrollWithCon > $("#IMG_HOLDER_SHOWUP_ANI").offset().top && showupAniDone == false){
			showUpImgAni();
		}

		progressBar.setProgress(nowScroll);

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
