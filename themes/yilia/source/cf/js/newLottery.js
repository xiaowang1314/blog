function EasyLottery(options){
	this.game = "";
	this.isUpload = false;
	for(var i in options){
		this[i] = options[i];
	}
	this._init();
}

EasyLottery.prototype = {
	_init : function(){
		this._loadFile("css/ymPrompt.css", "css");
		this._loadFile("js/ymPrompt.js", "javascript");
	},
	
	//抽奖请求后台
	_submit: function(){
		var that = this;
		var data = that._getUploadMsg();
		if(!data){
			return;
		}
		$.ajax({
			type: "GET",
			dataType: 'jsonp',
			data : data,
			url: "http://db.mmo2.tgbus.com/api/index.do?finder=ol&prefix=lottery&method=lottery&game="+that.game,
			success: function(msg) {
				that._action(msg);
				that.$uploadContainer.hide();
			}
		})
	},
	//获取上传信息
	_getUploadMsg : function(){
		var qq = $("#qq").val(),
			name = $("#name").val();
		if(this._checkUploadMsg(qq,name))
			return {
				qq:qq,
				name:name
			}
	},
	//检查上传信息
	_checkUploadMsg : function(qq,name){
		if(qq=="" || name==""){
			alert('亲，您输入的信息不完整，请重新输入');
			return false;
		}
		var qqReg = new RegExp("^[1-9]{1}[0-9]{4,9}$");
		
		if(!qqReg.test(qq)){
			alert('亲，您输入的QQ号码不正确，请重新输入');
			return false;}
		else{
			return true;
		}
		
	},
	//请求后台获取之后的表现形式，此处表现是转盘抽奖，亦可改为其他形式
	_action : function(msg){
		var callBack = msg.yes.grade>0 ? this._win : this._lose;
		callBack();
	},
	
	//成功
	win:function(msg){
		alert('win'+msg.yes.grade)
	},
	//失败
	lose:function(msg){
		alert('lose'+msg.yes.grade)
	},
	//加载文件
	_loadFile : function(filename, filetype){
		var oHead = document.getElementsByTagName('HEAD').item(0);
		if(filetype=="css"){
			var oScript= document.createElement("link");
			oScript.href = filename;
			oScript.rel = "stylesheet";
		}
		else if(filetype=="javascript"){
			var oScript= document.createElement("script");
			oScript.src = filename;
		}
		oScript.type = "text/"+filetype;
		oHead.appendChild(oScript);
	}
}

function Lottery(options){
	this.$container = $("#lottery"); //容器
	this.itemsCount = 8; //奖品个数
	this.hasCondition = true;	 //是否有前置条件
	this.spacing = 15; // 奖品之间间隔
	this.$submitBtn = $("#submit"); //确认按钮，点击开始出上传框，确认上传开始请求后台
	this.$uploadContainer = $(".pop"); //上传框容器
	//抽奖奖品信息，
	/*[
		{
			img : "",
			tit : ""
		}
	]*/
	this.lotMsg = [];
	//奖品可设定位置，可自动义何处开始启动
	this.pos = [0,3,5,6,7,4,2,1];
	//设置抽奖前置条件
	this.callBack = function(s){
		s.hasCondition = false;
	}
	
	for(var i in options){
		this[i] = options[i];
	}
	this._init()
}

Lottery.prototype = EasyLottery.prototype;

Lottery.prototype._init = function(){
	this._loadFile("css/ymPrompt.css", "css");
	this._loadFile("js/ymPrompt.js", "javascript");
	this._setHtml();
}

Lottery.prototype._getPos = function(){
	var len = Math.sqrt(this.itemsCount+1),
	sW = this.$container.width(),
	sH = this.$container.height(),
	w = (sW-(len-1)*this.spacing)/len-4,
	h = (sH-(len-1)*this.spacing)/len;
	var po = [],startPo={};	
	for(var i=0,l=0;i<len;i++,l+=(w+this.spacing)){
		for(var j=0,t=0;j<len;j++,t+=(h+this.spacing)){
			if(i==1 && j==1){
				startPo = {"left":l+"px","top":t+"px","height":5+h+"px"};
				continue;
			}
			po.push({"left":l+"px","top":t+"px"})
		}
	}
	var pos=[],htm="";
	
	for(var i=0;i<this.pos.length;i++){
		pos.push(po[this.pos[i]])
	}
	return {
		pos:pos,
		w:w,
		h:h,
		startPo:startPo
	}
};
//设置容器内奖品列表
Lottery.prototype._setHtml = function(){
	var po 	= this._getPos(),
		pos = po.pos,
		w 	= po.w,
		h 	= po.h,
		startPo = po.startPo,
		htm = "";
	for(var i=0;i<this.itemsCount;i++){
		var styles = 'left:'+pos[i].left+';top:'+pos[i].top+";width:"+w+"px;height:"+h+"px";
		if(this.lotMsg.length>0){
			htm+='<div class="item drawprod'+i+'" style="'+styles+'"><div class="inner"><div class="img"><img src="'+this.lotMsg[i].img+'"/></div><div class="tit">'+this.lotMsg[i].tit+'</div></div></div>'
		}else{
			htm+='<div class="item drawprod'+i+'" style="'+styles+'"><div class="inner"><div class="img"></div><div class="tit"></div></div></div>'
		}
	}
	this.$container.html(htm);
	$('<div class="startBtn"></div>').css(startPo).appendTo(this.$container);
	this._start();
};

//点击开始抽奖按钮
Lottery.prototype._start =function(){
	var that = this;
	this.$container.find(".startBtn").on("click",function(){
		//有条件限制则进入条件设置方法
		if(that.hasCondition){
			that.callBack(that);
			return;
		}
		// 若之前填写过上传框，则直接抽奖
		if(that.isUpload){
			//开始按钮解绑，以免重复绑定
			that.$container.find(".startBtn").off("click");
			that._submit();
			return;
		}
		//首次点击出上传框并绑定提交按钮事件
		that.$uploadContainer.show();
		that.$submitBtn.on("click",function(){
			$(this).off("click");
			that._submit();
		})
	})
}


//请求后台获取之后的表现形式，此处表现是转盘抽奖，亦可改为其他形式
Lottery.prototype._action = function(msg){
	var grade = msg.yes.grade>0 ? msg.yes.grade : 0;
	var callBack = grade>0 ? this._win : this._lose;
	var $items = this.$container.find(".item");
	var index=0,count=0;
	var that = this;
	
	var sc = setInterval(function(){
		if(index==that.itemsCount){
			count++;
			index=0;
		}
		$items.removeClass("cur").eq(index).addClass("cur");
		if(index==grade&&count>3){
			clearInterval(sc);
			callBack(msg);
		}
		index++
	},50)
}