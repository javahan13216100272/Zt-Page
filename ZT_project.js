var list='';
$(function(){
     console.log("init start");
	$.ajax({
		url:'https://rawgit.com/javahan13216100272/Zt-Page/master/itemList.json',
		data:'',
		dataType:'json',
		type:'POST',
		async:false,
		success:function(json){
			console.log('success:data=',json)
			list=json;
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			console.log('error:','XMLHttpRequest.status=',XMLHttpRequest.status,'	XMLHttpRequest.readyState=',XMLHttpRequest.readyStateb,'textStatus:',textStatus);
		}
	})
    document.getElementsByClassName("queryBtn")[0].onclick=function(){
        compare(document.getElementsByClassName("queryInput")[0].value);
    };
	console.log("init finish");
	

});
function replaceStr(str){
    var newStr=str.toUpperCase();
    newStr=newStr.replace("(","\\(");
    newStr=newStr.replace(")","\\)");
    newStr=newStr.replace("+","\\+");
    newStr=newStr.replace("*","\\*");
    newStr=newStr.replace("-","\\-");
    newStr=newStr.replace("?","\\?");
    newStr=newStr.replace(/\s+/g,"");
    newStr=newStr.replace(" ","");
    return newStr; 
}
function replaceValue(str){
    var newStr=str.toUpperCase();
    newStr=newStr.replace(/\s+/g,"");
    newStr=newStr.replace(" ","");
    return newStr; 
}
function compare(keyWord){
    document.getElementsByClassName("queryContent")[0].innerHTML="";
    var arr = [];
    var reg = new RegExp(replaceStr(keyWord));
    if(keyWord==""){
       alert("查询的字符串不能为空!");
       return; 
    }
    for(var i=0;i<list.length;i++){
        var person=new Object();  
        for(var item in list[i]){
            if(replaceValue(list[i][item]).match(reg)){
                person.name=list[i]["物料编码"];
                person.des=list[i]["物料描述"]; 
                person.oprize=list[i]["原开单价"]; 
                person.nprize=list[i]["新开单价"];
            }
        }
        if(person.name != undefined){
            arr.push(person);
        }
    }
    var oFrag=document.createDocumentFragment();
    for(var item in arr){
        var tr=document.createElement("tr");
        tr.className="tbodytr";
        var tdname=document.createElement("td");
        tdname.className="tdname";
        var tdnameN=document.createTextNode(arr[item].name);
        tdname.appendChild(tdnameN);
        var tddes=document.createElement("td");
        tddes.className="tddes";
        var tddesN=document.createTextNode(arr[item].des);
        tddes.appendChild(tddesN);
        var tdopriz=document.createElement("td");
        tdopriz.className="tdopriz";
        var tdoprizN=document.createTextNode(arr[item].oprize);
        tdopriz.appendChild(tdoprizN);
        var tdnpriz=document.createElement("td");
        tdnpriz.className="tdnpriz";
        var tdnprizN=document.createTextNode(arr[item].nprize);
        tdnpriz.appendChild(tdnprizN);
        tr.appendChild(tdname);
        tr.appendChild(tddes);
        tr.appendChild(tdopriz);
        tr.appendChild(tdnpriz);
        oFrag.appendChild(tr);
    }
    document.getElementsByClassName("queryContent")[0].appendChild(oFrag);
    if(arr.length==0){
        document.getElementsByClassName("queryInfo")[0].innerHTML="没有符合条件的记录!";
    }else{
        document.getElementsByClassName("queryInfo")[0].innerHTML="搜索完毕, 符合条件的记录一共有<b>"+arr.length+"</b>条";
    }
    return arr;
}

