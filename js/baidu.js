
$(function(){
	//LocalStorage皮肤
	checkLocalStorage();
	//返回顶部
	isToTop();
	$("#to-top").on("mouseover",function(){
		$(".to-top-text").show();
		$(".to-top").css("background","#eee");
		$(".to-top-icon").hide();
	}).on("mouseout",function(){
		$(".to-top-text").hide();
		$(".to-top").css("background","#fff");
		$(".to-top-icon").show();
	}).on("click",function(){
        $('body,html').animate({scrollTop:0},500);
	});
	//更多产品侧边栏隐藏和显示
	$("#hidemp,#moreproduct").on("mouseover",function(){
		$("#moreproduct").show();
	}).on("mouseout",function(){
		$("#moreproduct").hide();
	});
	//标签切换
	$(".s-main-menu li").each(function(index){
		var tab=$(this);
		$(this).on("click",function(){	
			$(".s-main-menu .tabin").addClass("tab").removeClass("tabin");
			tab.removeClass("tab").addClass("tabin");
			$(".s-main-content .content-show").removeClass("content-show");
			$(".s-main-content .s-main-item").eq(index).addClass("content-show");
			if($(".s-more-bar").is(':hidden')){
			showMainContent();	
		}
		});
	});
	//我的导航展开合上
	$("#mine-nav").on("click",function(){
		if($("#mine-nav .nav-hide").length>0){
			$("#mine-nav .nav-hide").removeClass("nav-hide");
		}else{
			$("#mine-nav i").addClass("nav-hide");
		}	
		$("#mine-nav-content").toggle();
		

	});
	//箭头动画
	var animateArrow=function(){
		$("#animate-arrow").animate({top:"13px"},500).animate({top:"7px"},500);
	};
	setInterval(animateArrow);
	//箭头展开
	$("#animate-arrow").click(function(){
		showMainContent();		
		$(".s-more-bar").hide();
	});
	//反回顶部
	window.onscroll = function(){
		isToTop();
	}		
	//换肤切换风格
	$(".s-skin-nav li").each(function(index){
		var skinNav=$(this);
		skinNav.on("click",function(){
			$(".s-skin-nav .choose-nav").removeClass("choose-nav");
			skinNav.addClass("choose-nav");
			$(".show-skin-type-content").removeClass("show-skin-type-content");
			$(".skin-type-content").eq(index).addClass("show-skin-type-content");
		});
	});
	$("#skin-change").on("click",function(){
		$(".s-skin-layer").slideDown()
		
	});
	$("#skin-up").on("click",function(){
		$(".s-skin-layer").slideUp();
	});
	//换肤更换背景
	$(".skin-img-item").each(function(){
		$(this).on("click",function(){
			 var imgurl=$(this).find('img').attr('src');
			 imgurl=imgurl.replace(/skin_plus/,"skin");
			 skinChange(imgurl);
		});
	});
	//不使用皮肤
	$("#skin-remove").on("click",function(){
		skinChange("");
	});

})
//展开主要内容
function showMainContent(){
	if($(".s-main-content .content-show").eq(0).height()>$(".s-main-content").eq(0).height()){
			$(".s-main-content").css({
				"overflow":"visible",
				"height":"auto",
				"min-height":"363px"
			});
		}
}
//判断是否出现反回顶部
function isToTop(){
	var scrollHeight=$(window).scrollTop();
	if(scrollHeight>0){
		$("#to-top").show();
	}else{
		$("#to-top").hide();
	}

}
//
function skinChange(url){
	if(url==""){
		$(".s-skin-container").css({
		"background-color":"#fff",
		"background-image":""
		});
		$(".baidulogo").attr("src","images/bd_logo1.png");
		setLocalStorage("skin-image","");
	}else{
		$(".s-skin-container").css({
		"background-image":"url("+url+")"
		});
		$(".baidulogo").attr("src","images/logo_white.png");
		setLocalStorage("skin-image",url);
	}
	
}
//设置LocalStorage
function setLocalStorage(lname,lvalue){
	localStorage.setItem(lname,lvalue);
}
//获得LocalStorage
function getLocalStorage(lname){
	var value = localStorage.getItem(lname);
	if(value==null){
		return "";
	}else{
	return value;		
	}

}
//检查LocalStorage
function checkLocalStorage(){
	var skinImage=getLocalStorage("skin-image");
	if (skinImage==""){
		skinChange("");
	}
	else {
		skinChange(skinImage);
	}
}