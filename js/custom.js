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
		checkIfProgressOverflow(screenWidth);
    });


	$(".close-ie-block").on("click", function(){
		$(".ie-block-9").hide();
	})

	function addUniqueId(){
		chrData.forEach(function(v,i,a){
			a[i].idN = i+1;
		})
	};
	addUniqueId();

	function checkIfProgressOverflow(sw){
		if(sw<1200){
			$(".fixed-navi").stop().animate({"opacity":"0.2", "z-index":"-1"}, 300);

		}else{
			$(".fixed-navi").stop().animate({"opacity":"1","z-index":"1"}, 300);
		}	
	}

	/*************make speach card***************/
	var speachCard = {
		data : s_card_data,
		cardListHolder : $(".speach-list ul"),
		printTemplate : function(i){
			var d = this.data[i];
			var n = randomRange(1, 7);
			var template = ("<li class='spc-card hideme'><div class='spc-card-wrap'><div class='card-index'><p>"+ ((i+1<10)? ("0"+(i+1)) : i+1) +"</p></div><div class='card-body card-body-0"+n+"'><div class='card-bg'><img src='img/s-c-"+((i+1<10)? ("0"+(i+1)): i+1)+".jpg' alt=''></div><div class='spc-text'><div class='quoto quoto-start'><img src='img/quoto-start.png' alt=''></div><div class='text-holder'><p>"+ d.spc +"</p></div><div class='quoto quoto-end'><img src='img/quoto-end.png' alt=''></div></div></div></div><div class='media-info'><p><span class='cont-name'>" + d.contName + "</span><span class='slash'>I</span><span class='maker'>"+ d.maker + "</span><span class='slash'>I</span><span class='year'>"+ d.year +"</span></p></div></li>");
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
	/*************make speach card***************/


	/********tag********/
	var chrTag = {
		tagList : [{"name":"반사회적인격장애","idx":"1"}, {"name":"범죄","idx":"2"}, {"name":"불륜","idx":"3"}, {"name":"배신과 음모","idx":"4"},{"name":"복수","idx":"5"},{"name":"누명","idx":"6"},{"name":"범죄나 폭력 피해","idx":"7"},{"name":"주변에 헌신","idx":"8"}],
		getTagIdx : function(name){
			var idx;
			for(c=0;c<this.tagList.length;c++){
				if(this.tagList[c].name == name){
					idx = this.tagList[c].idx;
					break;
				}
			}		
			return idx;
		},
		adjustTagFilter : function(filterTag){
			this.resolveTagFilter();
			$(".each-chr-box").addClass("off");
			$(".each-chr-box").each(function(index,item){
				var dIdx =( $(item).attr("data-chr-id") * 1 )-1;
				if(chrData[dIdx].tag.indexOf(filterTag)!= -1){
					if(filterTag == "범죄" && chrData[dIdx].tag.indexOf("피해")!= -1){
					}else{
						$(item).addClass("on");
					}
				}else{
				}
			});
		},
		resolveTagFilter: function(){
			$(".each-chr-box").removeClass("off on");
		},
		resolveTagOn : function(){
			$(".graphic-tag ul li").removeClass("on");
		}
	}
	/********tag********/

	/*************make character list***************/
	var chrGraph = {
		data : chrData,
		chrListHolder : $(".chr-list"),
		printTagSpot : function(tagStr){
			var tempTagStr = ""; 
			var tagArr = tagStr.split(",");
			for(ti=0;ti<tagArr.length;ti++){
				var t = tagArr[ti].replace(/^ /gi, "");
				t = t.trim();
				var tag = "<span class='tagSpot tagSpot0"+chrTag.getTagIdx(t)+"'></span>";
				tempTagStr = tempTagStr += tag;
			}
			return tempTagStr;
		},
		printTemplate : function(i){
			var d = this.data[i];
			var template = "<li><div class='each-chr-box' data-chr-id='"+d.idN+"'><div class='thumb'><img src='img/" + d.thumb +".jpg' alt='섬네일'></div><div class='chr-name'>"+d.chrName +"</div><div class='tag-holder'>"+ this.printTagSpot(d.tag) +"</div></div></li>";
			return template; 
		},
		makeChrList : function(){
			this.chrListHolder.find("ul").html("");
			for(i=0;i<this.data.length;i++){
				var chrHolder = this.chrListHolder.find("ul").eq(this.data[i].chrType-1);
				chrHolder.append(this.printTemplate(i));
			}
		},
		showChrList : function(){
			/*
			var listCol = this.chrListHolder.find("ul");
			for(lc=0;lc<listCol.length;l++){
				var $li = listCol.eq(lc).find("li");
				for(l=0;l<$li.length;l++){
					$li.eq(l).delay(l*100).animate({"left":"0px","opacity":"1"},700, "easeOutCubic");
				}
			}*/
			var $li = $(".chr-list .each-col ul li");
			var delayTimeTick = 100;
			for(l=0;l<$li.length;l++){
				$li.eq(l).delay(l*delayTimeTick).animate({"left":"0px","opacity":"1"}, 400, "easeOutCubic");
			}
			setTimeout(function(){
				$li.find(".chr-name").animate({"opacity":"1"},500, function(){
					$(".axis--top").animate({"opacity":"1"}, 1000);
					$(".divide-line").animate({"opacity":"1"}, 1000);
					$(".chr-list").removeClass("blocked");
					$(".graphic-tag ul").removeClass("blocked");
				});
			}, $li.length*delayTimeTick );
			

		},
		resolveChrBox : function(){
			$(".chr-list .each-chr-box").removeClass("clicked");
		}
	};
	/*************make speach card***************/
	
	
	/*****popUp card*****/
	var popUpCard = {
		data : chrData,
		popUpStatus: false,
		onChrArea: false,
		chrGraphicBody: $(".media-graphic-area"),
		checkChridx : function(idx){
			var i = Number(idx*1)-1;
			this.setCard(i);
			return i;
		},
		printTag: function(tagStr){
			$(".chrPopUp .tag-list").html("");
			var tagItem = tagStr.split(","); 
			for(i=0;i<tagItem.length;i++){
				var tagText = tagItem[i].replace(/^ /gi, "");
				tagText = tagText.trim();
				var tagClass = "popUpTag--"+chrTag.getTagIdx(tagText);
				$(".chrPopUp .tag-list").append("<span class='"+tagClass+"'>#"+tagText+"</span>");
			}
		},
		setCard: function(i){
			var d = this.data[i];
			$(".chrPopUp .popUp-thumb img").attr("src", "img/"+ d.thumb +".jpg");
			$(".chrPopUp .cont-name").html(d.conName);
			$(".chrPopUp .maker").html(d.maker);
			$(".chrPopUp .year").html(d.year);
			$(".chrPopUp .chr-name").html(d.chrName);
			$(".chrPopUp .chr-occu").html(d.chrOccu);
			$(".chrPopUp .chr-concept").html(d.chrConcept);
			$(".chrPopUp .chr-desc .chr-desc-scroll p").html(d.chrDesc);
			if(typeof(d.tag) == "string" && d.tag.length>1){
				this.printTag(d.tag);
			}
			this.openCard();
		},
		closeCard: function(){
			this.popUpStatus = false;
			$(".popUpBack").hide();
			$(".chrPopUp").stop().animate({"bottom":"-500px"}, 500, "easeOutCubic", function(){
				$(".chrPopUp").hide();
			});
		
		},
		openCard: function(){
			this.popUpStatus = true;
			var bottomPos = (isMobile==true)? "0px" : "60px"
			$(".popUpBack").show();
			$(".chrPopUp").fadeIn(100, function(){
				$(".chrPopUp .chr-desc .chr-desc-scroll").scrollTop(0);
				$(".chrPopUp").stop().animate({"bottom":bottomPos}, 500, "easeOutCubic");
			});
		},
		setDefault: function(){
			this.closeCard();
		},
		checkIfChrArea: function(sc){
			if( sc >= this.chrGraphicBody.offset().top-screenHeight && sc < (this.chrGraphicBody.offset().top + this.chrGraphicBody.height())){
				return true;
			}else{
				return false;	
			}
		},
		adjustCardStatus: function(){
			if(this.onChrArea == false && this.popUpStatus == true){
				this.closeCard();
				chrGraph.resolveChrBox();
			}else{
			
			}
		}
	};
	
	/*****popUp card*****/

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
	/********progress********/

	/********network graph********/

	var networkGraph = {
		createGraph : function(){
			var links = NETWORK_DATA.links.map(function(d){
							return Object.create(d)
						});
			var nodes = NETWORK_DATA.nodes.map(function(d){
							return Object.create(d)
						});
			var color = function(d){
				var scale = d3.scaleOrdinal(d3.schemeCategory10);
				return (scale(d.group));
			};
			var fillCircle = function(g){
				if(g == "bad"){
					return "#ff3c00";
				}else if(g=="act"){
					return "#386cff";
				}else if(g=="media"){
					return "#6fbc5b";
				}else{
					return "#555";
				}
			};

			var width = 500;
			var height = 500;
		
			var simulation = d3.forceSimulation(nodes)
					  .force("link", d3.forceLink(links).id( function(d){ return d.id }))
					  .force("charge", d3.forceManyBody().strength(-100))
					  .force("center", d3.forceCenter(width / 2, height / 2));

			var svg = d3.select("#NETWORK_GRAPH")
						.attr("viewBox", [0, 0, width, height]);
			var gHolder = svg.append("g")
								.attr("class", "g-holder")
			var link = gHolder.append("g")
							.attr("stroke", "#999")
							.attr("stroke-opacity", 0.6)
						.selectAll("line")
							.data(links)
							.join("line")
								.attr("stroke-width", function(d){ return Math.sqrt(d.value*5)} );
			
			/*
			var node = svg.append("g")
						.selectAll("circle")
							.data(nodes)
							.enter()
							.append("circle")
								.attr("r", 8)
								.attr("fill", color)
								.call(drag(simulation));  // text 라벨 추가를 위해 g로 그룹핑
			
			node.append("text")
			  .text(function(d){ return d.id })
			  .style("font-size", "12px") */

			
			var node = gHolder.append("g")
						.attr("class", "circle-node-holder")
					.selectAll("g")
						.data(nodes)
						.enter()
						.append("g")
						.each(function(d){
							d3.select(this)
								.append("circle")
								.attr("r", d.value*5)
								.attr("fill", fillCircle(d.group));
							d3.select(this)
								.append("text").text(d.id)
								.attr("dy",6)
								.style("text-anchor","middle")
								.attr("class", "node-label")
						}).call(networkGraph.drag(simulation));

			simulation.on("tick", function(){
				link.attr("x1", function(d){ return d.source.x; })
					.attr("y1", function(d){ return d.source.y; })
					.attr("x2", function(d){ return d.target.x; })
					.attr("y2", function(d){ return d.target.y; });

				/*node	
					.attr("cx", function(d){ return d.x; })
					.attr("cy", function(d){ return d.y; });*/

				//circle 노드에서 g 노드로 변경
				node.attr("transform", function(d) { return "translate("+d.x+","+ d.y+")"; });
			});

			//invalidation.then(() => simulation.stop());

			return svg.node();
		},
		drag : function(simulation){
			function dragstarted(d) {
				if (!d3.event.active) simulation.alphaTarget(0.3).restart();
				d.fx = d.x;
				d.fy = d.y;
			}

			function dragged(d) {
				d.fx = d3.event.x;
				d.fy = d3.event.y;
			}

			function dragended(d) {
				if (!d3.event.active) simulation.alphaTarget(0);
				d.fx = null;
				d.fy = null;
			}

			return d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended);
		}
	}

	/********network graph********/


	function showUpImgAni(){
		showupAniDone = true;
		$(".sw--01").find("img").animate({"top":"0px"}, 1000, "easeOutBack", function(){
			$(".sw--02").find("img").animate({"bottom":"0px"}, 1000, "easeOutBack");
		});
	}

	$(".chr-list").delegate(".each-chr-box","click", function(){
		var idx = $(this).attr("data-chr-id");
		popUpCard.checkChridx(idx);
		chrGraph.resolveChrBox();
		$(this).addClass("clicked");
		if($(this).hasClass("on") == false){
			chrTag.resolveTagOn();
			chrTag.resolveTagFilter();
		}
		
	});
	$(".popUpBack, .popUp-close").on("click", function(){
		chrGraph.resolveChrBox();
		popUpCard.closeCard();
	});

	$(".graphic-tag ul li").on("click", function(){
		if($(this).hasClass("on")){
			chrTag.resolveTagOn();
			chrTag.resolveTagFilter();
		}else{
			chrTag.resolveTagOn();
			$(this).addClass("on");
			chrTag.adjustTagFilter( $(this).find(".value").html().replace("#","") );
		}
	});

	
	function avoid100vh(){
		$(".spacer").height(screenHeight);
		$(".fixed-slider-area .fixed-el").height(screenHeight);
	}

	/******** 모바일 전용 조정 ********/
	if(isMobile==true){
		$(".graph-img-rep").find("img").attr("src", "img/s01-graph-m.png");
		$(".img-holder-s2-01 .cover").find("img").attr("src", "img/photo_media_01-m.jpg");
		avoid100vh();
	}
	/******** 모바일 전용 조정 ********/

	function init(){
		speachCard.makeCard();
		chrGraph.makeChrList();
		popUpCard.setDefault();
		networkGraph.createGraph();
	}

	$(".loading-page").fadeOut(200, function(){
		init();
	});

	
	$("#NETWORK_GRAPH").on("touchstart", function(event){
		if(event.cancelable) { 
			event.preventDefault();
		}
	});

	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();
		var nowScrollWithCon = nowScroll+screenHeight*0.6;
		var showupAniDone = false; 
		var chrListAniDone = false; 

		progressBar.setProgress(nowScroll);

		if( videoSlider.videoStatus !== videoSlider.checkVideoStatus(nowScroll)){
			videoSlider.videoStatus = videoSlider.checkVideoStatus(nowScroll);
			videoSlider.adjustVideoHolder();
		}
		if( nowScrollWithCon > $("#IMG_HOLDER_SHOWUP_ANI").offset().top && showupAniDone == false){
			showUpImgAni();
		}
		
		if( popUpCard.onChrArea !== popUpCard.checkIfChrArea(nowScroll) ){
			popUpCard.onChrArea = popUpCard.checkIfChrArea(nowScroll);
			popUpCard.adjustCardStatus();
		}

		if( nowScrollWithCon > $(".media-graphic-area").offset().top && chrListAniDone == false){
			 chrListAniDone = true;
			chrGraph.showChrList();
		}

		$(".hideme").each(function(i){
			if( nowScroll + screenHeight > $(this).offset().top + $(this).outerHeight()*0.5 ){
				$(this).stop().animate({"opacity":"1"},500);
			}
		});


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
