var url = "http://q.tgbus.com/rank/xnzfzj2016126Handler.ashx";
function show_wish()
{
	$('#wish').wish();
    $('.wish').draggable({containment: "#wish", scroll: false});
    var aLi=document.getElementById('wish').getElementsByTagName('li')
}
function gotocj_a(){
	if($("#inputreason").val().replace(/[ ]/g, "") == ''){
		alert('新年祝福不能为空!!');
		return false;
	}
	if($("#inputQname").val().replace(/[ ]/g, "") == ''){
		alert('想发送给人不能为空!!');
		return false;
	}
	if($("#inputname").val().replace(/[ ]/g, "") == ''){
		alert('署名不能为空!!');
		return false;
	}

	return true;
}
function zan(){
	if(gotocj_a()){
		$.get(url,{type:1,nickname:escape($("#inputname").val()),q:escape($("#inputQname").val()),note:escape($("#inputreason").val())},function(data){
		    if(data==-1){
				alert('您今天次数已经用尽，请明天再来o(>﹏<)o');
			}else if(data==-55){
				alert('活动结束了 少年!!!');
			}else{
				$("#inputname,#inputQname,#inputreason").val('');
				alert("祝福已成功，审核成功会显示在上面的黄哦！");
			}		
		},'jsonp');
	}
}
function get_zf(){
	$.get(url, { type: 4 }, function(data) {
		var txt_zf='';
		for (var y = 0; y < data.length; y++) {
		    txt_zf=txt_zf+'<li><span>'+data[y].q_name+'</span><p>'+data[y].note+'</p><i>'+data[y].nickname+'</i></li>';
		}
		$("#wish").html(txt_zf);
		show_wish();
	}, 'jsonp')
}
// 评论
(function(){
    get_zf();
})();
