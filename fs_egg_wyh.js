var isBegin = false;
var isBegintoo = false;
var goodsIds="";
var u="";
var timelong = parseInt($('.timeitem').val());
var bottonLc = document.getElementsByClassName("bottonLc")[0];//锤子
var bg = document.getElementsByClassName("dan")[0];
bg.addEventListener("mousemove",moveHammer);
bg.addEventListener("mouseover",movein);
bg.addEventListener("mouseout",moveout);
bg.addEventListener("mousedown",hammerDown);
bg.addEventListener("mouseup",hammerUp);
window.onload=function(){
	followShow();
};

$(function() {
	setDrainage();
	timer(timelong);
	
	$(".dan img").click(
		function (e) {
			var cdan = $(e.target).attr('id');
			if(isBegintoo) return false;
			isBegintoo = true;
			if(check_login()){
				var taeapp_sellerId=$('.taeapp-sellerId').val();
				var nick=$('.zs_nick').val();
				var d={"userNick":nick,"sellerId":taeapp_sellerId,"goodsIds":goodsIds};
				$.post('/MarketingDrawInfo.json',d,function(rspda){
					if(rspda.rlt==0){
						  var dra_num=rspda.drawNum;
					      prizeLevel=rspda.prizeLevel;
					      /*
							 * var dra_num=rspda.drawNum; var drawNum=g('draw_Num');
							 * sit(drawNum,"您还有"+dra_num+"次抽奖机会。");
							 */
					    var prizeL=rspda.prizeL;
					    StartGame(cdan);
						if(prizeLevel==57){
							EndIndex=2;
							$('.jack_from_info').html(rspda.txt);
							setTimeout(function(){
								$(".fade").show();
								popup($(".jjjj")); 
								prizeLevel=6;
							},500);
							
						}else{
							EndIndex=prizeLevel;
							EndIndex=2;
							var prizetype=rspda.prizetype;
							if(prizetype=='优惠券'){
								$('.coupon_p_l').html(rspda.prizeInfo);
								// var coupon_p_l=g('coupon_p_l');
								// sit(coupon_p_l,rspda.prizeInfo);
								// $('.coupon_p_l').val(rspda.prizeInfo);
								$('.coupon_draw_num').html(dra_num);
								if(rspda.txt!=''){
								var url_val="<a href='"+rspda.txt+"' target='_blank' class='eject-an1'>立即领取</a>";
								$('.url_val_p').html(url_val);
								}
								setTimeout(function(){
									$(".fade").show();
									popup($(".eeee")); 
							},500);
							}else{
								$('.prize_name').html(rspda.prizeName);
								EndIndex=2;
								setTimeout(function(){
									var award_info=rspda.award_info;
									if(award_info!=null&&award_info.length>0){
										po_openwindisplay("tnick_show");
										po_openwindisplay("mobile_show");
										po_openwindisplay("zfb_show");
										po_openwindisplay("in_address_show");
										po_openwindisplay("real_name_show");
										award_info.map(function(item,idx){
											if(award_info[idx]==1){
												// po_openwindisplay("tnick_show");
												$(".tnick_show").show();
											}if(award_info[idx]==2){
												// po_openwindisplay("mobile_show");
												$(".mobile_show").show();
											}if(award_info[idx]==3){
												// po_openwindisplay("zfb_show");
												$(".zfb_show").show();
											}if(award_info[idx]==4){
												// po_openwindisplay("in_address_show");
												$(".in_address_show").show();
											}if(award_info[idx]==5){
												// po_openwindisplay("real_name_show");
												$(".real_name_show").show();
											}
										});
									}
									$(".fade-fff").show();
									// $(".oooo").show();
									popup($(".oooo"));
								},500);
							}
						}
					}else if(rspda.rlt==1){
						EndIndex=2;
						$('.jack_from_info').html(rspda.txt);
						setTimeout(function(){
							$(".fade").show();
							popup($(".jjjj")); 
							prizeLevel=6;
						},500);
					}else if(rspda.rlt==9){
						po_openwin("hd_jie_shu");
					}else{
						$(".fade").show();
						popup($(".ffff")); 
					}
				},"json");
			}
		}
	);
	$('.my_draw_cjtj').click(function (){
		$(".fade").show();
		popup($(".cjtjzz")); 
	});
	
	$(".c_attention").click(function () {
		po_closewindisplay();
		var taeapp_sellerId=$('.taeapp-sellerId').val();
		var nick=$('.zs_nick').val();
		if(check_login()){
		Tida.follow({
		    pubAccountId:taeapp_sellerId // 店铺或达人ID
		}, function(data){
			var d={"sellerId":taeapp_sellerId,"nick":nick,"type":"2"};
			$.post('/MarketingDrawCollection.json',d,function(rspda){
			},"json");
		});
		}
		});
	
	$(".collection_iframe").click(function () {
		po_closewindisplay();
		var taeapp_sellerId=$('.taeapp-sellerId').val();
		var taeapp_shopId=$('.taeapp-shopId').val();
		var d={"sellerId":taeapp_sellerId,"nick":nick}
		$.post('/MarketingDrawCollection.json',d,function(isOK,rspda,msg){
			
		},"json");
//		setTimeout(function(){
//			popup($(".mmmm_success"));
//		},5000);
	});
	$(".quguanzhu").click(function () {
		var taeapp_sellerId=$('.taeapp-sellerId').val();
		/*	var nick=$('.zs_nick').val();
		var d={"sellerId":taeapp_sellerId,"nick":nick,"type":"2"};
		$.post('/MarketingDrawCollection.json',d,function(rspda){
			//log("MarketingDrawCollection....");
		},"json");
		*/
		alert(taeapp_sellerId);
		Tida.follow({
		    pubAccountId:taeapp_sellerId // 店铺或达人ID
		}, function(data){
        alert(JSON.stringify(data));
		});
	});
	

	
	$(".showyiqian").click(function () {
		showyiqiantoo();
		});
	$(".c_sign a").click(function () {
		po_closewindisplay();
		if(check_login()){
			var taeapp_sellerId=$(".taeapp-sellerId").val();
			var nick=$('.zs_nick').val();
			var d={"buyerNick":nick,"sellerId":taeapp_sellerId,"small":""};
			$.post('/DoSignDrawmobie.json',d,function(rspda){
				if(rspda.rlt==0){
					if(rspda.signday=="0"){
						$('.sign_day').html(1);
					}else{
						$('.sign_day').html(rspda.signday);
					}
					$('.sign_draw_num').html(rspda.signdaytoo);
					$(".fade").show();
					popup($(".cccc")); 
				}else{
					if(rspda.signday=="0"){
						$('.sign_day').html(1);
					}else{
						$('.sign_day').html(rspda.signday);
					}
					$('.sign_draw_num').html(rspda.signdaytoo);
					$(".fade").show();
					popup($(".cccctoo")); 
				}
			},"json");
		}
	});
	$(".c_share a").click(function () {
		po_closewindisplay();
		if(check_login()){
			$(".fade").show();
			popup($(".fxfx")); 
		}
	});
	$(".c_collection a").click(function () {
		po_closewindisplay();
		if(check_login()){
			$(".fade").show();
			popup($(".mmmm")); 
		}
	});
	$(".c_cart").click(function () {
		po_closewindisplay();
		if(check_login()){
			$(".fade").show();
			popup($(".nnnn")); 
			var height=$(".eject-gwc").width()+2;
			$(".eject-gwc").css("height",height);
		}
	});
//	$(".collection_iframe").click(function (){
//		po_closewindisplay();
//		c_attention_ckittx();
//	});
	$(".my_prize a").click(function (){
		po_closewindisplay();
		if(check_login()){
			pc_get_my_draw();
		}
	});
	$(".eject-close").click(function () {
		po_closewindisplay();
	});
	$(".goodsinfo").click(function () {
		if(check_login()) {
			var goodsId = this.href;
			var item_id = "";
			var len =goodsId.split("=").length-1;
			if(goodsId) {
				item_id = goodsId.split("=")[len];
			}
			var taeapp_sellerId=$('#sellerId').val();
			var d = {'sellerId' : taeapp_sellerId, 'userNick' :nick, 'itemId' : item_id + ''};
			$.post('/MarketingDrawcartFix.json', d, function(isOK, rspda, msg) {
				if(isOK.rlt == 0) {
					alert("加购成功！");
				} else {
					alert(isOK.txt);
				}
			},"json");
		}
	});
	//收藏宝贝
	$(".shougoodsinfo").click(function () {
		if(check_login()) {
			var goodsId = this.href;
			var item_id = "";
			var len =goodsId.split("=").length-1;
			if(goodsId) {
				item_id = goodsId.split("=")[len];
			}
			var taeapp_sellerId=$('.taeapp-sellerId').val();
			var nick=$(".zs_nick").val();
			var d = {'sellerId' : taeapp_sellerId, 'userNick' :nick, 'itemId' : item_id + ''};
			$.post('/MarketingDrawFavor.json', d, function(isOK, rspda, msg) {
				if(isOK.rlt == 0) {
					alert("收藏成功!");
				} else {
					alert(isOK.txt);
				}
			},"json");
		}
	});

}); 

var isauth=false;
Tida.ready({
//	    interactId:"",//互动实例ID type string 若无抽奖模块，次参数无须传入。传错会走错误流程。
//	    module : ["device", "media", "server", "social", "widget", "sensor", "share","buy","draw","im"] //应用所需要的模块。示例：[buy,]。默认只有基础API。其他模块需要重新引入：抽奖:draw ; 传感器:sensor ;交易:buy ; 基础设备:device ; 社交相关:social ; 客户端UI:widget。
},function(result){
});
function timer(timelong){
    window.setInterval(function(){
	    var day=0,
	        hour=0,
	        minute=0,
	        second=0,//时间默认值   
	    	millisecond=0;
	    if(timelong > 0){
	//        day = Math.floor(timelong / (1000 * 60 * 60 * 24));
	//        hour = Math.floor(timelong / (1000 * 60 * 60)) - (day * 24);
	    	hour = Math.floor(timelong / (1000 * 60 * 60));
	        minute = Math.floor(timelong / (1000 * 60)) - (day * 24 * 60) - (hour * 60);
	        second = Math.floor(timelong / 1000) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
	        millisecond = Math.floor(timelong) -(day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000) - (minute * 60 *1000)-(second * 1000);
	    }
	    if (minute <= 9) minute = '0' + minute;
	    if (second <= 9) second = '0' + second;
	    if (millisecond <= 99 && millisecond >9 ){
	    	millisecond = '0'+millisecond;
	    }else if(millisecond <= 9){
	    	millisecond = '00'+millisecond;
	    }
	    $('.hour').html(hour);
	    $('.minute').html(minute);
	    $('.second').html(second);
	    $('.millisecond').html(millisecond);
	    timelong-=9;
    }, 9);
} 
function toauth(){
	  Tida.doAuth({refresh:false},function(result){
	   if(result.finish){
	  	 isauth=true;
	   }else{
	  	 isauth=false;
	       // 授权失败或用户取消授权时的处理
	   }
  });
}
function po_closewin_close(name){
//	var nameclass=$("."+name);
//		nameclass.style.display='none';
//	$("."+name).hide();
	$("."+name).css('display','none'); 
}
function fx_sj(v) {
	var targets=0;
	var shopId=$("#shopId").val();
	var sellerId=$("#sellerId").val();
	var shareType=$("#shareType").val();
	var mix_nick=$(".taeapp_mix_UserNick").val();
	var goodId=$("#drainageSet1").val();
	if(shareType==""||shareType==null){
		shareType=0;
	}
	//var image="https://img.alicdn.com/imgextra/i2/749864544/TB2msDKipXXXXbdXpXXXXXXXXXX-749864544.png";
//"https://img.alicdn.com/imgextra/i2/749864544/TB2XjyWkFXXXXbhXpXXXXXXXXXX-749864544.png"
	var image="https://img.alicdn.com/imgextra/i2/749864544/TB2XjyWkFXXXXbhXpXXXXXXXXXX-749864544.png";
	var activity_url=$('.activityUrl').val();//这句注释用来做标记，万一以后手淘又出什么幺蛾子方便改。。。
	if(v==1){//微博
		targets=2;
	}else{//微信
		targets=3;
	}
    var tkllr=$("#tkllr").val();
    if(tkllr==""){
    	tkllr="快来参与抽奖吧";
    }
//	    alert(activity_url);
    Tida.share({
	    title:"抽奖！", // 分享标题 在来往和微信好友中有标题显示
	    content: tkllr, //分享的内容
	    url: activity_url, // 跳转地址，分享的内容跳转的url
	    image:image, // 图片地址,客户端可能需要根据url下载图片再分享
	    targets:[targets]
	}, function(data){
//			alert(JSON.stringify(data));
	});
}
function po_openwin(name){
	po_closewinc();
	var nameclass=$('.'+name);
		nameclass.css("visibility","visible");
		if(name!="cp_from_no_login"&&name!="prize_from"){
			$(".fade").css("visibility","visible");
	        }else{
	        	$(".fade-fff").css("visibility","visible");
	        }
}
function po_closewinc(name){
	var nameclass=$("."+name);
		nameclass.css("visibility","hidden");
}
function check_login(){
	nick=$(".zs_nick").val();
	var mix_nick=$(".taeapp_mix_UserNick").val();
	var taeapp_is_jies=$(".taeapp_is_jies").val();
	if(taeapp_is_jies=="false"){
		if(mix_nick==""||mix_nick==null){
			//没登陆
			$(".fade").show();
			popup($(".gggg")); 
			return false;
		}else if(nick==""||nick==null){
			$(".fade-fff").show();
			$(".pppp").show();
			return false;
		}else{
			var taeapp_mixUserNick=$('.taeapp_mixUserNick').val();
			var d={"user_nick":nick,"mix_user_nick":taeapp_mixUserNick};
			var zs_nick=$('.zs_nick').val();
			var mix_user=$(".taeapp_mix_UserNick").val();
			var aa = encodeURIComponent(zs_nick.substr(0, 1).toLowerCase());
		    var bb = encodeURIComponent(mix_user.substr(0, 1).toLowerCase());
		    if (aa.indexOf(bb) < 0) {
		    	$(".fade").show();
				popup($(".gggg")); 
		        return false;
		    }
		    var taeapp_sellerId=$('.taeapp-sellerId').val();
			var d2={"userNick":zs_nick,"sellerId":taeapp_sellerId,"ismobie":"1"};
			/*$.post('/MarketingGetPrizegenx.json',d2,function(rspda){
				if(rspda.rlt==0){
					console.log('进店送抽奖机会成功');
				}else{
					console.log('进店送抽奖机会失败');
					return false;
				}
				$(".my_prize_nick").html(nick);
			},"json");*/
		    $.post('/UpdateUserMixInfo.json?ts=' + (new Date()).valueOf() + "&tbUserMixNick=" + $('.tbUserMixNick').val(),d,function(rspda){
				if(rspda.rlt==0){
					buyerId=rspda.userId;
					return true;
				}else{
					return false;
				}
		    },"json");
			return true;
		}
	}else{
		$(".fade").show();
		popup($(".xxxxnotstartorended"));
		return false;
	}
}
function updateUser(){
	var buyer_nick=$("#buyer_nick_input").val();
	if(buyer_nick==""||buyer_nick==null){
		alert("请输入您登录的淘宝账号");
	}
	$('#tnick').val(buyer_nick);
	var mix_user=$(".taeapp_mix_UserNick").val();
	var aa = encodeURIComponent(buyer_nick.substr(0, 1).toLowerCase());
    var bb = encodeURIComponent(mix_user.substr(0, 1).toLowerCase());
    if (aa.indexOf(bb) < 0) {
        alert("请填写您正在登陆的淘宝用户名！");
        return false;
    }else{
		var d={"user_nick":buyer_nick,"mix_user_nick":mix_user};
		$.post('/UpdateUserMixInfo.json?ts=' + (new Date()).valueOf() + "&tbUserMixNick=" + $('.tbUserMixNick').val(),d,function(rspda){
			if(rspda.rlt == 0) {
				$('.zs_nick').val(buyer_nick);
				po_closewindisplay();
				location.reload(true);
			} else {
				alert(rspda.txt);
			}
		},"json");
    }
}
function updateUser2(){
	var buyer_nick=$("#buyer_nick_input").val();
		var nick=$(".zs_nick").val();
		var tnick=$("#tnick").val();
		var mobile=$("#mobile").val();
		var in_zfb=$("#in_zfb").val();
		var in_address=$("#address_show").val();
		var d={"user_nick":nick,"mobile":mobile,"address":in_zfb+" "+in_address+" " + $('#real_name').val(),"ts":(new Date()).valueOf()};
		$.post('/UpdateUserMixInfo.json' + "?tbUserMixNick=" + $('.tbUserMixNick').val(),d,function(rspda){
			//alert("保存信息成功!");
			po_closewindisplay();
			//$('.zs_nick').val(buyer_nick);
			
		},"json");
		
}
function c_attention_ckittx(){
	var nick=$(".zs_nick").val();
	var taeapp_sellerId=$(".taeapp-sellerId").val();
	var d={"sellerId":taeapp_sellerId,"nick":nick}
	$.post('/MarketingDrawCollection.json',d,function(isOK,rspda,msg){
		po_closewindisplay();
	},"json");
}

function po_openwindisplay(name){
	$("."+name).hide();
}
function po_closewindisplay(){
	$(".fade").hide();
	$(".eject").hide();
	$(".ejectnew").hide();
	$(".eject-pop").hide();
	$(".fade-fff").hide();
	for(var i=1;i<=5;i++){
		if(i%2==1){
			$("#dan"+i).attr("src","/newlottery/images/dan04.gif");
		}else{
			$("#dan"+i).attr("src","/newlottery/images/dan05.gif");
		}
		
	}
	isBegin = false;
	isBegintoo = false;
}
function pc_get_my_draw(){
	var taeapp_sellerId=$('.taeapp-sellerId').val();
	var nick=$('.zs_nick').val();
	var d={"userNick":nick,"sellerId":taeapp_sellerId,"ismobie":"1"};
	$(".fade").show();
		$.post('/MarketingGetPrizegenx.json',d,function(rspda){
			if(rspda.rlt==0){
				var dra_num=rspda.drawNum;
				$(".zp_draw_numwo").html(dra_num);
				$(".my_prize_info1").html(rspda.prizeName);
			}else{
				var dra_num=rspda.drawNum;
				$(".zp_draw_numwo").html(dra_num);
			}
			$(".my_prize_nick").html(nick);
			popup($(".iiii")); 
		},"json");
		
}
function opwangwang(){
	var user_name=$("#user_name").val();
	var shopId=$("#shopId").val();
	alert(user_name+"=="+shopId);
	var options = {
		    "sellerNick":user_name,
		    "shopId":shopId
		};
		Tida.wangwang(options,function(data){
		    alert(JSON.stringify(data));
		});
}
function setDrainage(){
	var sign=$(".c_sign_id").val();
	if(!sign){
		po_closewin_close("c_sign");
	}
	var share=$('.c_share_id').val();
	if(!share){
		po_closewin_close("c_share");
	}
	var collection=$('.c_collection_id').val();
	if(!collection){
		po_closewin_close("c_collection");
	}
	var attention=$('.c_attention_id').val();
	if(!attention){
		po_closewin_close("c_attention");
	}
	var cart=$('.c_cart_id').val();
	if(!cart){
		po_closewin_close("c_cart");
	}
	
}
function popup(popupName){ 
	var _scrollHeight = $(document).scrollTop();//获取当前窗口距离页面顶部高度 
	_windowHeight = $(window).height();//获取当前窗口高度 
	_windowWidth = $(window).width();//获取当前窗口宽度 
	_popupHeight = popupName.height();//获取弹出层高度 
	_popupWeight = popupName.width();//获取弹出层宽度 
	_posiTop = (_windowHeight - _popupHeight)/2;
	_posiLeft = (_windowWidth - _popupWeight)/2; 
	if(_windowHeight>_popupHeight){
		popupName.css({"left": _posiLeft + "px","top":_posiTop + "px","display":"block"});//设置position 
	}else{
		popupName.css({"left": _posiLeft + "px","top":"5px","bottom":"5px","display":"block","overflow":"auto"});//设置position 
	}
} 
function numRand() {
	var x = 9999; //上限
	var y = 1111; //下限
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}
function showyiqiantoo(){
	var taeapp_sellerId=$('.taeapp-sellerId').val();
	var d={"buyerNick":nick,"sellerId":taeapp_sellerId,"small":"","isign":"1"};
		$.post('/DoSignDrawmobie.json',d,function(rspda){
	},"json");
}
function followShow(){
	try {
		var flength=$(".prize_list a").length;
    	clearInterval(startCarousel),startCarousel=null;
    }catch (e){}
    void function () {
    	var index=0;
        window.startCarousel=setInterval(function(){
        	if(index>=flength){
        		index=0;
        	}
        	for(var i=0;i<flength;i++){
	        	if(i==index){
	        		$(".taeapp_im_gsi_"+i).show();
	        	}else{
	        		$(".taeapp_im_gsi_"+i).hide();
	        	}
        	}
        	index++;
        },3000);
    }();
}
function StartGame(cdan){
	$(".dan img").attr("src","/newlottery/images/dan02.png")
	$("#"+cdan).attr('src','/newlottery/images/dan01.png'); 
}

/*移动锤子*/
function moveHammer(e) {
    bottonLc.style.top = (e.pageY-20) + "px";
    bottonLc.style.left = (e.pageX+9) + "px";
    bg.style.cursor = "none";
}
function hammerDown() {
//	bottonLc.style.display = "block";
    //bottonLc.setAttribute("style","");
    bottonLc.style.transform = "rotate(-50deg)";

}
function hammerUp() {
    bottonLc.style.transform = "rotate(0deg)";
}
function movein(e){
	bottonLc.style.display = "block";
}
function moveout(e){
	bottonLc.style.display = "none";
}

