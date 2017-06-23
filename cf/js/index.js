var local = eval('('+(localStorage.lpllottery || '{}')+')'),
	count = local.count || 0,
	starTime = new Date().getTime(),
	clickTime = local.clickTime ||0;
	spTime = 1000*60*20;
var now = new Date().getTime(),
	isInTime = (now>new Date(2016,6,7,17,0,0).getTime()&& now<new Date(2018,6,7,20,0,0).getTime()) ||
	(now>new Date(2016,6,8,17,0,0).getTime()&& now<new Date(2018,6,8,20,0,0).getTime()) ||
	(now>new Date(2016,6,9,13,0,0).getTime()&& now<new Date(2018,6,9,20,0,0).getTime()) ||
	(now>new Date(2016,6,10,15,0,0).getTime()&& now<new Date(2018,6,10,20,0,0).getTime()) ;


$(function(){
	
	if(isInTime){
		timeStamp();
	}
	
	var lottery = new Lottery({
		game:'lol_panda_skin',
		pos : [1,0,3,5,6,7,4,2],
		spacing : 10,
		$uploadContainer:$('.inforBox'),
		callBack:function(){
			if(count<1){
				if(clickTime){
					
					ymPrompt.errorInfo({title:"抽奖次数提示",message:"<h1 style="+"color:#FF0707;font-size:16px;line-height:26px;margin-bottom:10px;"+">您现在暂无抽奖机会<br/>您可通过下方提示获取抽奖机会<br/></h1><span style="+"color:#000;font-size:14px;padding-left:5px;"+">在直播期间打开此页面和直播页面，并且不关闭，每停留20分钟即可获取1次抽奖机会，活动时间如下：<br/></h1><span style="+"color:#000;font-size:14px;padding-left:5px; padding-right: 10px;   text-align: center;"+">2016-7-7：17:00-20:00 </span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-8：17:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-9：13:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-left:5px;padding-right: 10px;"+">2016-7-10：15:00-20:00</span></span>",width:470,height:270,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
					return;
				}
				ymPrompt.errorInfo({title:"抽奖次数提示",message:"<h1 style="+"color:#FF0707;font-size:16px;line-height:26px;margin-bottom:10px;"+">您现在暂无抽奖机会<br/>您可通过下方提示获取抽奖机会<br/></h1><span style="+"color:#000;font-size:14px;padding-left:5px;"+">1.请您先点击上方熊猫TV直播按钮进入直播房间，或点击此按钮进入<a  class='zbjoin' href='javascript:void(0)' onclick='ymPrompt.doHandler(\"close\")'><img  border='0' src='images/zb.jpg' ></a>，即可获取1次抽奖机会</span><br/><span style="+"color:#000;font-size:14px;padding-left:5px;"+">2.在直播期间打开此页面和直播页面，并且不关闭，每停留20分钟即可获取1次抽奖机会</span>",width:450,height:240,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true,handler:toPanda});
				
			}
		},
		_start:function(){
			var that = this;
			this.$container.find(".startBtn").on("click",function(){
				//有条件限制则进入条件设置方法
				if(that.hasCondition || count<1){
					that.callBack(that);
					return;
				}
				
				// 若之前填写过上传框，则直接抽奖
				if(that.isUpload){
					//开始按钮解绑，以免重复绑定
					that._submit();
					return;
				}
				//首次点击出上传框并绑定提交按钮事件
				that.$uploadContainer.show();
				that.$submitBtn.on("click",function(){
					that._submit();
				})
			})
		},
		_action:function(msg){
			count = count - 1;
			
			if(count<0){ count=0;}
			setCountHtml();
			var callBack = msg.yes.grade>0 ? this.win : this.lose,
				$items = this.$container.find(".inner"),
				index=0,round=0,
				that = this;
				that.$submitBtn.off('click')
			var x = msg.yes.grade<=0 ? 0 : msg.yes.grade;
			if(msg.yes.grade<0){
				$('#myform').submit();
			}
			
			
			var sc = setInterval(function(){
				if(index == that.itemsCount){
					round++;
					index=0;
				}
				$items.removeClass("cur").eq(index).addClass("cur");
				if(index==x&&round>3){
					clearInterval(sc);
					callBack(msg);
					setCountHtml();
				}
				index++
			},100)
			
			
		},
		hasCondition : false,
		win:function(msg){
			ymPrompt.succeedInfo({title:"中奖信息提示",message:"恭喜!你获得了<font style='color:#f00; font-weight:bold;'>"+msg.yes.prize+"</font><br />请第一时间加群联系管理员<br /><a class='qqjoin' href='http://shang.qq.com/wpa/qunwpa?idkey=84b9f89b67c354699b318fe8275759b6b3c61a336a68a0df5c2a285a033a4f70' target='_blank'><img border='0' src='images/tc/q2.png' alt='星游活动群2' title='星游活动群2'></a><a class='qqjoin' href='http://shang.qq.com/wpa/qunwpa?idkey=5cd057de19f4e250f0450bf3116a92e1acd10fc1654b1a0f5b9c558bd3537daa' target='_blank'><img border='0' src='images/tc/q3.png' alt='星游活动群3' title='星游活动群3'></a>",width:350,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
		},
		lose:function(){
			ymPrompt.succeedInfo({title:"中奖信息提示",message:"很遗憾你<font style='color:#f00; font-weight:bold;'>没有中奖</font><br />如有疑问请加群联系管理员<br /><a class='qqjoin' href='http://shang.qq.com/wpa/qunwpa?idkey=84b9f89b67c354699b318fe8275759b6b3c61a336a68a0df5c2a285a033a4f70' target='_blank'><img border='0' src='images/tc/q2.png' alt='星游活动群2' title='星游活动群2'></a><a class='qqjoin' href='http://shang.qq.com/wpa/qunwpa?idkey=5cd057de19f4e250f0450bf3116a92e1acd10fc1654b1a0f5b9c558bd3537daa' target='_blank'><img border='0' src='images/tc/q3.png' alt='星游活动群3' title='星游活动群3'></a>",width:350,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
		}
	})
	setCountHtml();
	
	
	$('#link').on('click',function(e){
		if(!isInTime){
			ymPrompt.errorInfo({title:"温馨提示",message:"<h1 style="+"color:#FF0707;font-size:16px;line-height:26px;margin-bottom:10px;"+">活动尚未开启，活动时间如下：<br/></h1><span style="+"color:#000;font-size:14px;padding-left:5px; padding-right: 10px;   text-align: center;"+">2016-7-7：17:00-20:00 </span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-8：17:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-9：13:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-left:5px;padding-right: 10px;"+">2016-7-10：15:00-20:00</span>",width:380,height:200,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
			/*alert('不在活动时间,活动时间如下： \n 　　 2016-7-7：17:00-20:00 \n 　　 2016-7-8：17:00-20:00 \n 　　 2016-7-9：13:00-20:00 \n 　　 2016-7-10：15:00-20:00');*/
			return;
		}
		if(!clickTime){
			ymPrompt.succeedInfo({title:"抽奖次数提示",message:"获得了<font style='color:#f00; font-weight:bold;'>1次</font>抽奖次数。赶快去抽奖吧，保持本页和直播页20分钟可以获取更多次数哦！",width:350,height:150,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
			lottery.hasCondition = false;
			count++;
			clickTime++;
			setCountHtml();
		}else{
			alert('您已经获得过了~请等待20分钟，获得再次抽奖的机会~');
		}
	})	
})




	function toPanda(){
		if(!isInTime){
			ymPrompt.errorInfo({title:"温馨提示",message:"<h1 style="+"color:#FF0707;font-size:16px;line-height:26px;margin-bottom:10px;"+">活动尚未开启，活动时间如下：<br/></h1><span style="+"color:#000;font-size:14px;padding-left:5px; padding-right: 10px;   text-align: center;"+">2016-7-7：17:00-20:00 </span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-8：17:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-right: 10px;"+">2016-7-9：13:00-20:00</span><br/><span style="+"color:#000;font-size:14px;padding-left:5px;padding-right: 10px;"+">2016-7-10：15:00-20:00</span>",width:380,height:200,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
			return;
		}
		if(!clickTime){
			ymPrompt.succeedInfo({title:"抽奖次数提示",message:"获得了<font style='color:#f00; font-weight:bold;'>1次</font>抽奖次数。赶快去抽奖吧，保持本页和直播页20分钟可以获取更多次数哦！",width:350,height:150,maskAlpha:0.4,btn:null,useSlide:true,slideCfg:{increment:0.3,interval:80},allowSelect:true,allowRightMenu:true});
			lottery.hasCondition = false;
			count++;
			clickTime++;
			setCountHtml();
			window.open("http://lol.178.com/zt/lpl/xjj0705/");
		}else{
			alert('您已经获得过了~请等待20分钟，获得再次抽奖的机会~');
		}

		
	}
function setCountHtml(){
	var c = {
		count: count,
		starTime : starTime,
		clickTime: clickTime
	}
	localStorage.lpllottery = obj2str(c)
	$('.startBtn').html('<span id="bg">开始抽奖</span><br><span id="count">剩余'+count+'次抽奖机会</span>')
}


function timeStamp(){
	var c = setTimeout(function(){
		var d = new Date().getTime();
		if(d - starTime >=spTime){
			count++;
			starTime = d;
			setCountHtml();
		}
		timeStamp();
	},1000)
}

function obj2str(o){
   var r = [];
   if(typeof o == "string" || o == null) {
     return o;
   }
   if(typeof o == "object"){
     if(!o.sort){
       r[0]="{"
       for(var i in o){
         r[r.length]=i;
         r[r.length]=":";
         r[r.length]=obj2str(o[i]);
         r[r.length]=",";
       }
       r[r.length-1]="}"
     }else{
       r[0]="["
       for(var i =0;i<o.length;i++){
         r[r.length]=obj2str(o[i]);
         r[r.length]=",";
       }
       r[r.length-1]="]"
     }
     return r.join("");
   }
   return o.toString();
}


