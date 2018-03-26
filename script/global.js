function addLoadEvent(func){
	var oldonload  = window.onload;
	if(typeof window.onload !='function'){
		window.onload = func;
	}else{
		window.onload =function(){
			oldonload();
			func();
		}
	}
}

/*
insertAfter方法
*/
function insertAfter(newElement,targetElement){

	var parent = targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextsibing);
	}
}

function addClass(element,value){
	if(!element.className){
		element.className=value;//设置ClassName
	}else{
		newClassName =element.className;
		newClassName+="";
		newClassName+=value;
		element.className=newClassName;
	}
}

/*
设置为每一个A标签添加class，
获取当前页面的href，和浏览器当前页面的href，
表示A标签高亮的是正在浏览的页面
*/
function highlightPage(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	var headers = document.getElementsByTagName("header");
	if(headers.length ==0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;

	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl = links[i].getAttribute("href");
	//查找A标签里的href是否包含在正在浏览的URL里，若包含，则可以进行最后一步
		if(window.location.href.indexOf(linkurl)!= -1){	
			
			links[i].className="here";
			//获得A标签的最后的子节点的值，例如这里是文本节点。
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);


/*
定义moveElement函数
*/
function moveElement(eId,final_x,final_y,interval){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	var elem=document.getElementById(eId);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left = "0px";
	}
	if(!elem.style.top){
		elem.style.top ="0px";
	}

	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);

	if(xpos==final_x&& ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist = Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		var dist = Math.ceil(-(final_x-xpos)/10);
		xpos = xpos-dist;
	}
	if(ypos<final_y){
		var dist = Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		var dist = Math.ceil(-(final_y-ypos)/10);
		ypos = ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top = ypos+"px";

	//创建移动函数
	var repeat = "moveElement('"+eId+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
} 

function prepareSlideshow(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;

	if (!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src","images/PPT.jpg");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	//
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0; i<links.length;i++){
		links[i].onmouseover=function(){
			//获取鼠标移动时的href值
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,50);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",0,-150,50);
			}if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",0,-300,50);
			}if(destination.indexOf("live.html")!=-1){
				moveElement("preview",0,-450,50);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",0,-600,50);
			}
			
		}
	}
}

addLoadEvent(prepareSlideshow);

/*
只显示一部分的section
传入参数id
*/

function showSection(id){

	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}
function hideSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="block";
		}else{
			sections[i].style.display="none";
		}
	}
}
/*
在article中的nav所包含的链接单击的时候调用showSection函数
创建prepareIntervalnav的函数
*/
function prepareIntervalnav(){
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links = navs[0].getElementsByTagName("a");
	if(links.length==0) return false;
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		//sectionId是一个局部变量，只在函数执行期间存在
		//因此每一个链接都应该创建一个自定义属性，这个属性的作用域是持久存在的
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
//
	}	
}
addLoadEvent(prepareIntervalnav);


function showPic(whichpic){
	if(!document.getElementById("placeholder")) return true;

	var source = whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	
	if(!document.getElementById("description")) return false;

	if(whichpic.getAttribute("title")){
		var text = whichpic.getAttribute("title");
	}else{
		var text="";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType==3){
		description.firstChild.nodeValue=text;
	}
	return false;
}
function preparePlaceholder(){
	if (!document.createElement) return false;
	if (!document.createTextNode) return false;

	if (!document.getElementById) return false;
	if (!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/photo/p1-min.jpg");
	placeholder.setAttribute("alt","my images");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var dex =document.createTextNode("Choose an image");
	description.appendChild(dex);
	var gallery =document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);

}

function prepaerGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if (!document.getElementById("imagegallery")) return false;
	var galley = document.getElementById("imagegallery");
	var links= galley.getElementsByTagName("a");
	for(var i=0 ;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepaerGallery);

/*
表格样式化
*/
function StripeTable(){
	if(!document.getElementsByTagName) return false;
	var tables= document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		var odd=false;
		var rows = tables[i].getElementsByTagName("tr");
		for(var i=0;i<rows.length;i++){
			if(odd==true){
				odd==false;
			}else{
				odd==true;

			}
		}
	}
}
function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}
 function displayAbbreviations(){
 	if(!document.getElementsByTagName|| !document.getElementById || !document.createTextNode|| !document.createElement) return false;
 	var abbreviations=document.getElementsByTagName("abbr");
 	if(abbreviations.length<1) return false;
 	var defs= new Array();
 	for(var i=0;i<abbreviations.length;i++){
 		var current_abbr = abbreviations[i];
 		if(current_abbr.childNodes.length<1) continue;
 		var definition = current_abbr.getAttribute("title");
 		var key = current_abbr.lastChild.nodeValue;
 		defs[key]=definition;
 	}

 	var dlist = document.createElement("dl");
 	for(key in defs){
 		var definition = defs[key];
 		var dtitle = document.createElement("dt");
 		var dtitle_text = document.createTextNode(key);
 		dtitle.appendChild(dtitle_text);

 		var ddesc= document.createElement("dd");
 		var ddesc_text = document.createTextNode(definition);
 		ddesc.appendChild(ddesc_text);
 		dlist.appendChild(dtitle);
 		dlist.appendChild(ddesc);
 	}
 	if(dlist.childNodes.length<1) return false;

 	var header = document.createElement("h3");
 	var header_text = document.createTextNode("Abbreviations");
 	header.appendChild(header_text);

 	var articles = document.getElementsByTagName("article");
 	if(articles.length==0) return false;
 	var container = articles[0];
 	container.appendChild(header);
 	container.appendChild(dlist);

 }

addLoadEvent(StripeTable);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
























