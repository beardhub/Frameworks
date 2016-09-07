var Assets;
var Manager;
var canvas;
var mouse;
var Keys;
var Framework = new ZacksFramework();
window.onload = function(){Framework.init();};
/*
function superextend(sub,sup,th,args){
	//if (sup.prototype !== sub.prototype)
		//extend(sub,sup);
	alert(sub.prototype.constructor+"\n\n\n"+sub);
	if(sub.prototype.constructor !== sub)return;
	extend(sub,sup);
	//alert(" "+sub.prototype == Object.create(sup.prototype));
		//supr(th).constructor.apply(th,args);
		th.prototype.constructor.apply(th,args);
		//sub.prototype = Object.create(sup.prototype);
		//Object.getPrototypeOf(th).constructor.apply(th,args);//,args);
	//alert("sub\n\n"+sub.prototype.constructor);
	//alert("sup\n\n"+sup.prototype.constructor);
	//extend(sub,sup);
	//sub.prototype = new sup;
	//alert(sub+" "+sup);
	//sub.parent = Object.getPrototypeOf(sup)
	//supr(this).constructor.call(this,x,y,w,h);
}*/
function extend(sub, sup){sub.prototype = Object.create(sup.prototype);sub.prototype.constructor = sub;}
function supr(obj){return Object.getPrototypeOf(obj);}
function size(obj){
	var s = 0;
	for (var p in obj) s++;
	return s;}
function ZacksFramework(){
	var subframeworks = [];
	this.devtools = {wdebug:true,imgbox:false};
	this.initialized = false;
	this.registerframework = function(framework){
		if (subframeworks.indexOf(framework)==-1)
			subframeworks.push(framework);
		else console.log("Framework already registered.");}
	this.settitle = function(title){
		document.getElementById("title").innerHTML = title;}
	this.beginexecution = function(){
		Manager = new DBox(0,0,canvas.width, canvas.height);
		Manager.borders = false;
		Manager.systemname = "Manager";
		if (typeof start !== "undefined")		start();
		else console.log("No 'start' function defined. Beginning execution loop.");		
		Framework.gameloop();}
	this.setcanvas = function(c){
		canvas = c;}
	this.setcanvasbyid = function(id){
		canvas = document.getElementById(id);}
	this.createcanvas = function(w,h){
		if (typeof w == "number" && typeof h == "number")
				console.log("Creating new canvas of size "+w+" by "+h+".");
		else {	console.log("Creating new canvas of size 800 by 600.");		w = 800;h = 600;}
		canvas = document.createElement('canvas');
		canvas.width  = w;	canvas.height = h;
		document.body.appendChild(canvas);}
	this.gameloop = function(){
		Manager.update(1);
		var g = canvas.getContext("2d");
		g.clearRect(0,0,canvas.width,canvas.height);
		Manager.render(g);
		requestAnimationFrame(Framework.gameloop);}
	this.init = function(){
		document.head.innerHTML = "<title id='title'>Untitled</title><meta charset='utf-8'>" + document.head.innerHTML;
		Assets = new AssetsManager();
		loadImage("boxborder",		"../assets/BoxBorder.png");
		loadImage("boxcorner",		"../assets/BoxCorner.png");
		for (var i = 0; i < subframeworks.length; i++){
			if (typeof subframeworks[i].init == "function")
				subframeworks[i].init();
			else console.log("Framework does not have an init function. If it needs to be initialized do so at the top of your own init function.");}
		if (typeof init !== "undefined")
			init();		//user loads assets and others
		Assets.load();
		if (typeof canvas == "undefined"){	console.log("No canvas found.");	this.createcanvas();}
		mouse = {x : 0, y : 0, down : false,
			getvec : function(){
				return new b2Vec2(this.x,this.y);},
			relx : function(t){		if (t.systemname=="Manager") return this.x-t.x;return (this.x - t.container.screenx() - t.x)/t.container.camera.getzoom();},
			rely : function(t){		if (t.systemname=="Manager") return this.y-t.y;return (this.y - t.container.screeny() - t.y)/t.container.camera.getzoom();},
			upos : function(e){
				var rect = canvas.getBoundingClientRect();
				this.x = e.clientX - rect.left;
				this.y = e.clientY - rect.top;}}
		addListeners();
			Keys = {
				a : false,
				b : false,
				c : false,
				d : false,
				e : false,
				f : false,
				g : false,
				h : false,
				i : false,
				j : false,
				k : false,
				l : false,
				m : false,
				n : false,
				o : false,
				p : false,
				q : false,
				r : false,
				s : false,
				t : false,
				u : false,
				v : false,
				w : false,
				x : false,
				y : false,
				z : false,
				n0 : false,
				n1 : false,
				n2 : false,
				n3 : false,
				n4 : false,
				n5 : false,
				n6 : false,
				n7 : false,
				n8 : false,
				n9 : false,
				space : false,
				semicolon : false,
				squote : false,
				shift : false,
				ctrl : false,
				alt : false,
				enter : false,
				up : false,
				down : false,
				left : false,
				right : false,
				equal : false,
				dash : false,
				backspace : false,
				tab : false,
				esc : false,
				caps : false,
				del : false,
				comma : false,
				period : false,
				fslash : false,
				bslash : false,
				iskeycode : function(keycode){
					return this.getkey(keycode) !== "nak";},
				iskey : function(key){
					return this.getkeycode(key) !== 0;},
				getkeycode : function(key){
					for (var i = 0; i <= 222; i++)
						if (this.getkey(i) == key && key !== "nak")
							return i;
					return 0;},
				getkey : function(keyCode){
					switch (keyCode){
						case 8:		return "backspace";	
						case 9:		return "tab";		
						case 13:	return "enter";		
						case 16:	return "shift";		
						case 17:	return "ctrl";		
						case 18:	return "alt";		
						case 20:	return "caps";		
						case 27:	return "esc";		
						case 32:	return "space";
						case 37:	return "left";		
						case 38:	return "up";		
						case 39:	return "right";		
						case 40:	return "down";		
						case 46:	return "del";		
						case 48:	return "n0";		
						case 49:	return "n1";		
						case 50:	return "n2";		
						case 51:	return "n3";		
						case 52:	return "n4";		
						case 53:	return "n5";		
						case 54:	return "n6";		
						case 55:	return "n7";		
						case 56:	return "n8";		
						case 57:	return "n9";		
						case 65:case 97:	return "a";			
						case 66:case 98:	return "b";			
						case 67:case 99:	return "c";			
						case 68:case 100:	return "d";			
						case 69:case 101:	return "e";			
						case 70:case 102:	return "f";			
						case 71:case 103:	return "g";			
						case 72:case 104:	return "h";			
						case 73:case 105:	return "i";			
						case 74:case 106:	return "j";			
						case 75:case 107:	return "k";			
						case 76:case 108:	return "l";			
						case 77:case 109:	return "m";			
						case 78:case 110:	return "n";			
						case 79:case 111:	return "o";			
						case 80:case 112:	return "p";			
						case 81:case 113:	return "q";			
						case 82:case 114:	return "r";			
						case 83:case 115:	return "s";			
						case 84:case 116:	return "t";			
						case 85:case 117:	return "u";			
						case 86:case 118:	return "v";			
						case 87:case 119:	return "w";			
						case 88:case 120:	return "x";			
						case 89:case 121:	return "y";			
						case 90:case 122:	return "z";			
						case 186:	return "semicolon";	
						case 187:	return "equal"; 	
						case 188:	return "comma";		
						case 189:	return "dash"; 		
						case 190:	return "period"; 	
						case 191:	return "fslash"; 	
						case 219:	return "obracket"; 	
						case 220:	return "bslash";	
						case 221:	return "cbracket";	
						case 222:	return "squote";
						default: 	return "nak";}
				}
			}
		initialized = true;}
	function AssetsManager(){
		var imgs = {},
			audio = {};
		var iloadq = [],
			aloadq = [];
		var failed = 0;
		var loaded = false;
		this.loadImage = function(name, src){
			if (imgs[name]){
				console.log("Duplicate image name "+name+". Skipping load.");
				return;}
			imgs[name] = new Image();
			imgs[name].onload = function(){iloadq.splice(iloadq.indexOf(imgs[name]),1);
					console.log("Assets loading, "+getprogress()+"% complete.");};
			imgs[name].onerror = function(){
				console.log("File load failed: "+src);
				iloadq.splice(iloadq.indexOf(imgs[name]),1);
				delete imgs[name];
				failed++;
				return;}
			iloadq.push({img:imgs[name],source:src});}
		this.loadAudio = function(name, src){
			if (audio[name]){
				console.log("Duplicate audio name "+name+". Skipping load.");
				return;}
			audio[name] = new Howl({urls: [src], buffer :true, 
				onload: function(){
					aloadq.splice(aloadq.indexOf(audio[name]),1);
					console.log("Assets loading, "+getprogress()+"% complete.");
					}});
			aloadq.push(audio[name]);
			}
		this.load = function(){
			startload();}
		this.i = function(name){
			if (!imgs[name]){
				console.log("Invalid image reference.");
				return;}
			return imgs[name];}
		this.a = function(name){
			if (!audio[name]){
				console.log("Invalid audio reference.");
				return;}
			return audio[name];}
		function loading(){
			return !isloaded();}
		function isloaded(){
			return iloadq.length==0&&aloadq.length==0;}
		function getprogress(){
			var total = size(imgs)+size(audio);
			var loaded = total-iloadq.length-aloadq.length;
			return Math.floor(100*loaded/total);}
		function startload(){
			if (size(imgs)+size(audio) == 0){
				console.log("No assets loaded.");return;}
			for (var i = 0; i < iloadq.length; i++)
				iloadq[i].img.src = iloadq[i].source;
			var interval = setInterval(function(){
				if (isloaded()){	clearInterval(interval);loaded = true;doneLoading();}},0);}
		function doneLoading(){
			if (failed == 0) console.log("Asset loading complete. All files loaded successfully.");
			else if (failed == 1) console.log("Asset loading complete. 1 file failed to load.")
			else console.log("Asset loading complete. "+failed+" files failed to load.");
			Framework.beginexecution();}}
	function addListeners(){
		document.addEventListener("click", mouseclick);
		document.addEventListener("contextmenu", mouserclick);
		document.addEventListener("mousedown", mousedown);
		document.addEventListener("mouseup", mouseup);
		document.addEventListener("mousemove", mousemove);
		document.addEventListener("drag", mousemove);
		window.addEventListener("keydown", keydown);
		window.addEventListener("keyup", keyup);
		window.addEventListener("keypress", keyclick);}
		//eCatcher.scrollTop = 2000;
		//eCatcher.addEventListener("onwheel", escroll);
	{//**event listeners**
	function mouseclick(e){
		e.preventDefault();
		mouse.upos(e);
		Manager.mouseclick();}
	function mouserclick(e){
		//e.preventDefault();
		mouse.upos(e);
		Manager.mouserclick();}
	function mousedown(e){
		e.preventDefault();
		mouse.upos(e);
		Manager.mousedown();
		mouse.down = true;}
	function mouseup(e){
		e.preventDefault();
		mouse.upos(e);
		Manager.mouseup();
		mouse.down = false;}
	function mousemove(e){
		e.preventDefault();
		mouse.upos(e);}
	function keydown(e){
		var preventcodes = [8,9,37,38,39,40,46];
		for (var i = 0; i < preventcodes.length; i++)
			if (e.keyCode == preventcodes[i])
				e.preventDefault();
		Manager.keydown(e.keyCode);
		switch (e.keyCode){
			case 8:		Keys.backspace= true;	break;
			case 9:		Keys.tab =		true;	break;
			case 13:	Keys.enter =	true;	break;
			case 16:	Keys.shift =	true;	break;
			case 17:	Keys.ctrl =		true;	break;
			case 18:	Keys.alt =		true;	break;
			case 20:	Keys.caps =		true;	break;
			case 27:	Keys.esc =		true;	break;
			case 32:	Keys.space =	true;	break;
			case 37:	Keys.left =		true;	break;
			case 38:	Keys.up =		true;	break;
			case 39:	Keys.right =	true;	break;
			case 40:	Keys.down =		true;	break;
			case 46:	Keys.del =		true;	break;
			case 48:	Keys.n0 =		true;	break;
			case 49:	Keys.n1 =		true;	break;
			case 50:	Keys.n2 =		true;	break;
			case 51:	Keys.n3 =		true;	break;
			case 52:	Keys.n4 =		true;	break;
			case 53:	Keys.n5 =		true;	break;
			case 54:	Keys.n6 =		true;	break;
			case 55:	Keys.n7 =		true;	break;
			case 56:	Keys.n8 =		true;	break;
			case 57:	Keys.n9 =		true;	break;
			case 65:	Keys.a =		true;	break;
			case 66:	Keys.b =		true;	break;
			case 67:	Keys.c =		true;	break;
			case 68:	Keys.d =		true;	break;
			case 69:	Keys.e =		true;	break;
			case 70:	Keys.f =		true;	break;
			case 71:	Keys.g =		true;	break;
			case 72:	Keys.h =		true;	break;
			case 73:	Keys.i =		true;	break;
			case 74:	Keys.j =		true;	break;
			case 75:	Keys.k =		true;	break;
			case 76:	Keys.l =		true;	break;
			case 77:	Keys.m =		true;	break;
			case 78:	Keys.n =		true;	break;
			case 79:	Keys.o =		true;	break;
			case 80:	Keys.p =		true;	break;
			case 81:	Keys.q =		true;	break;
			case 82:	Keys.r =		true;	break;
			case 83:	Keys.s =		true;	break;
			case 84:	Keys.t =		true;	break;
			case 85:	Keys.u =		true;	break;
			case 86:	Keys.v =		true;	break;
			case 87:	Keys.w =		true;	break;
			case 88:	Keys.x =		true;	break;
			case 89:	Keys.y =		true;	break;
			case 90:	Keys.z =		true;	break;
			case 186:	Keys.semicolon= true;	break;
			case 187:	Keys.equal = 	true;	break;
			case 188:	Keys.comma =	true;	break;
			case 189:	Keys.dash = 	true;	break;
			case 190:	Keys.period = 	true;	break;
			case 191:	Keys.fslash = 	true;	break;
			case 219:	Keys.obracket = true;	break;
			case 220:	Keys.bslash =	true;	break;
			case 221:	Keys.cbracket =	true;	break;
			case 222:	Keys.squote =	true;	break;}}
	function keyup(e){
		var preventcodes = [8,9,37,38,39,40,46];
		for (var i = 0; i < preventcodes.length; i++)
			if (e.keyCode == preventcodes[i])
				e.preventDefault();
		Manager.keyup(e.keyCode);
		switch (e.keyCode){
			case 8:		Keys.backspace=	false;	break;
			case 9:		Keys.tab =		false;	break;
			case 13:	Keys.enter =	false;	break;
			case 16:	Keys.shift =	false;	break;
			case 17:	Keys.ctrl =		false;	break;
			case 18:	Keys.alt =		false;	break;
			case 20:	Keys.caps =		false;	break;
			case 27:	Keys.esc =		false;	break;
			case 32:	Keys.space =	false;	break;
			case 37:	Keys.left =		false;	break;
			case 38:	Keys.up =		false;	break;
			case 39:	Keys.right =	false;	break;
			case 40:	Keys.down =		false;	break;
			case 46:	Keys.del =		false;	break;
			case 48:	Keys.n0 =		false;	break;
			case 49:	Keys.n1 =		false;	break;
			case 50:	Keys.n2 =		false;	break;
			case 51:	Keys.n3 =		false;	break;
			case 52:	Keys.n4 =		false;	break;
			case 53:	Keys.n5 =		false;	break;
			case 54:	Keys.n6 =		false;	break;
			case 55:	Keys.n7 =		false;	break;
			case 56:	Keys.n8 =		false;	break;
			case 57:	Keys.n9 =		false;	break;
			case 65:	Keys.a =		false;	break;
			case 66:	Keys.b =		false;	break;
			case 67:	Keys.c =		false;	break;
			case 68:	Keys.d =		false;	break;
			case 69:	Keys.e =		false;	break;
			case 70:	Keys.f =		false;	break;
			case 71:	Keys.g =		false;	break;
			case 72:	Keys.h =		false;	break;
			case 73:	Keys.i =		false;	break;
			case 74:	Keys.j =		false;	break;
			case 75:	Keys.k =		false;	break;
			case 76:	Keys.l =		false;	break;
			case 77:	Keys.m =		false;	break;
			case 78:	Keys.n =		false;	break;
			case 79:	Keys.o =		false;	break;
			case 80:	Keys.p =		false;	break;
			case 81:	Keys.q =		false;	break;
			case 82:	Keys.r =		false;	break;
			case 83:	Keys.s =		false;	break;
			case 84:	Keys.t =		false;	break;
			case 85:	Keys.u =		false;	break;
			case 86:	Keys.v =		false;	break;
			case 87:	Keys.w =		false;	break;
			case 88:	Keys.x =		false;	break;
			case 89:	Keys.y =		false;	break;
			case 90:	Keys.z =		false;	break;
			case 186:	Keys.semicolon=	false;	break;
			case 187:	Keys.equal = 	false;	break;
			case 188:	Keys.comma =	false;	break;
			case 189:	Keys.dash = 	false;	break;
			case 190:	Keys.period = 	false;	break;
			case 191:	Keys.fslash = 	false;	break;
			case 219:	Keys.obracket = false;	break;
			case 220:	Keys.bslash =	false;	break;
			case 221:	Keys.cbracket =	false;	break;
			case 222:	Keys.squote =	false;	break;}}
	function keyclick(e){
		Manager.keyclick(e.keyCode);
	}//function escroll(e){}
	}//end event listeners
}
function Follow(f, t, x, y){
	this.follower = f;
	this.target = t;
	this.x = 0;
	this.y = 0;
	if (typeof x == "number" && typeof y == "number"){
		this.x = offx;
		this.y = offy;}
	this.following = true;
	/*this.start = function(){
		following = true;}
	this.stop = function(){
		following = false;}
	this.toggle = function(){
		following = !following;}*/
	Follow.prototype.init = function(){
		if (typeof this.target.x == "undefined")
			this.target.x = 0;
		if (typeof this.target.y == "undefined")
			this.target.y = 0;
		this.follower.x = this.target.x + this.x;
		this.follower.y = this.target.y + this.y;}
	Follow.prototype.update = function(){
		if (!this.following)		return;
		this.follower.x = this.target.x + this.x;
		this.follower.y = this.target.y + this.y;
	}
	/*this.update = function(){
		if (!following)		return;
		f.x = t.x + x;
		f.y = t.y + y;}*/
}
function DBox(x, y, w, h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	var border = new dynimage(Assets.i("boxborder")),
		corner = new dynimage(Assets.i("boxcorner"));
	this.borders = true;
	this.cropped = true;
	this.transparent = false;
	this.edges = false;
	this.color = "black";
	var systems = {};
	var q = [];
	var rrng = {min:0,max:0};
	this.getq = function(){return q;};
	this.camera = new Camera(this.w/2,this.h/2,this.w,this.h);
	this.camera.container = this;
	this.invisible = false;
	this.frozen = false;
	this.hidden = false;
	function Camera(cx, cy, width, height){
		var scale = 1;
		this.x = cx;
		this.y = cy;
		if (typeof width == "number" && typeof height == "number"){
			this.w = width;
			this.h = height;}
		this.reset = function(){
			this.x = this.container.w/2;
			this.y = this.container.h/2;
			this.w = this.container.w;
			this.h = this.container.h;
		}
		this.relx = function(){
			return this.x-this.w/2;}
		this.rely = function(){
			return this.y-this.h/2;}
		this.getzoom = function(){
			return scale;}
		this.zoom = function(scl){
			scale*=scl;}
		this.zoomto = function(scl){
			scale = scl;}
		this.step = function(g){
			g.translate(-(this.x*scale-this.w/2), -(this.y*scale-this.h/2));
			g.scale(scale, scale);}
		this.unstep = function(g){
			g.scale(1/scale, 1/scale);
			g.translate((this.x*scale-this.w/2), (this.y*scale-this.h/2));}}
	this.mouseevent = function(type){
		for (var j = rrng.max; j >= rrng.min; j--)
			for (var i = q.length-1; i >= 0; i--)
				if (q[i].rl==j)
					if (typeof q[i]["mouse"+type] !== "undefined")
						if (q[i]["mouse"+type]())
							return true;
	return this.mouseonbox()&&!this.transparent;}
	this.keyevent = function(type, c){
		for (var j = rrng.max; j >= rrng.min; j--)
			for (var i = 0; i < q.length; i++)
				if (q[i].rl==j)
					if (typeof q[i]["key"+type] !== "undefined")
						if (q[i]["key"+type](c))
							return;}
	this.add = function(system, name){
		if (typeof name !== "string"){
			console.log("Adding anonymous system."+name);
			q.push(system);
			system.container = this;
			system.systemname = name;
			if (typeof system.init == "function")	system.init();	return;}var sub = "";
		if (name.indexOf(".")!==-1){
			sub = name.substring(name.indexOf("."));
			name = name.substring(0,name.indexOf("."));
			if (typeof systems[name] !== "object"){	console.log("Parent system not found: "+name);	return;}}
		if (sub == ""){
			systems[name] = system;
			q.push(system);
			system.container = this;
			system.systemname = name;
			if (typeof system.init == "function")	system.init();}
		else systems[name].add(system, sub.substring(1));}
	this.remove = function(sorn){//system or name
		switch(typeof sorn){
			case "undefined":	console.log("Invalid removal.");	return;
			case "string": //name 
				sorn = this.get(sorn);
				if (typeof sorn.ondelete == "function")		sorn.ondelete();
				q.splice(q.indexOf(sorn),1);
				delete sorn;	return;		default: //system
				if (typeof sorn.ondelete == "function")		sorn.ondelete();
				q.splice(q.indexOf(sorn),1);	return;}}
	this.get = function(name){
		if (typeof name !== "string"){	console.log("Not a valid name: "+name);	return;}	var sub = "";
		if (name.indexOf(".")!==-1){sub = name.substring(name.indexOf(".")+1);name = name.substring(0,name.indexOf("."));}
		if (typeof systems[name] !== "object"){	console.log("System not found: "+name);		return;}
		if (sub == "") return systems[name];
		else return systems[name].get(sub);}
	this.has = function(name){
		return typeof systems[name] !== "undefined";}
	this.update = function(delta){
		if (this.frozen || this.hidden)	return;
		for (var i = 0; i < q.length; i++)
			if (!q[i].frozen && typeof q[i].update !== "undefined")
				q[i].update();}
	this.render = function(g){
		if (this.invisible || this.hidden)	return;
		renderprep.call(this, g);
		this.camera.step(g);
		for (var i = 0; i < q.length; i++){
			if (!q[i].rl)q[i].rl = 0;
			if (q[i].rl<rrng.min)rrng.min=q[i].rl;
			if (q[i].rl>rrng.max)rrng.max=q[i].rl;}
		for (var j = rrng.max; j >=rrng.min; j--)
			for (var i = 0; i < q.length; i++)
				if (q[i].rl==j && q[i].fullscreen){
					temprender(g,q[i]);
					for (var j2 = j; j2 <= rrng.max; j2++)
						for (var i = 0; i < q.length; i++)
							if (q[i].rl==j)
								temprender(g,q[i]);
					return;}
		for (var j = rrng.min; j <= rrng.max; j++)
			for (var i = 0; i < q.length; i++)
				if (q[i].rl==j)
					temprender(g,q[i]);
		this.camera.unstep(g);
		renderborders.call(this, g);
	}
	function renderprep(g){
		g.save()
		g.translate(this.x,this.y);
		if (!this.transparent){
			g.fillStyle = this.color;
			g.fillRect(0,0,this.w,this.h);}
		g.save();
		if (!this.cropped) return;
		g.beginPath();
		g.rect(0,0,this.w,this.h);
		g.clip();
		g.closePath();}
	function renderborders(g){
		g.restore();
		if (!this.borders){g.restore(); return;}
		border.rotateto(0);
		border.setwidth(this.w);
		idraw(g,border,this.w/2,0);
		idraw(g,border,this.w/2,this.h);
		border.rotateto(Math.PI/2);
		border.setwidth(this.h);
		idraw(g,border,0,this.h/2);
		idraw(g,border,this.w,this.h/2);
		idraw(g, corner, 0, 0);
		idraw(g, corner, 0, this.h);
		idraw(g, corner, this.w, 0);
		idraw(g, corner, this.w, this.h);
		if (!this.edges){g.restore(); return;}
		idraw(g, corner, 0, this.h/2);
		idraw(g, corner, this.w/2, 0);
		idraw(g, corner, this.w, this.h/2);
		idraw(g, corner, this.w/2, this.h);
		g.restore();}
	function temprender(g, renderobj){
		if (renderobj.invisible || renderobj.hidden)	return;
		g.save();
		if (typeof renderobj.render !== "undefined")
			renderobj.render(g);
		g.restore();}
}
//{DBox prototypes
DBox.prototype.getbounds = function(){
	var u, d, l, r;
	u = this.camera.y-this.camera.h/2*this.camera.getzoom();
	d = this.camera.y+this.camera.h/2*this.camera.getzoom();
	l = this.camera.x-this.camera.w/2*this.camera.getzoom();
	r = this.camera.x+this.camera.w/2*this.camera.getzoom();
	return {	u:u,	d:d,	l:l,	r:r};}
DBox.prototype.getarea = function(){
	var b = this.getbounds();
	return Math.abs((b.u-b.d)*(b.l-b.r));}
DBox.prototype.mouseonbox = function(){return mouse.relx(this)>0&&mouse.relx(this)<this.w&&mouse.rely(this)>0&&mouse.rely(this)<this.h;}
DBox.prototype.screenx = function(){
	var x = this.x - this.camera.relx();
	if (typeof this.container !== "undefined")
		if (typeof this.container.screenx !== "undefined")
			return x+this.container.screenx();
		else return x;
	else return x;}
DBox.prototype.screeny = function(){
	var y = this.y - this.camera.rely();
	if (typeof this.container !== "undefined")
		if (typeof this.container.screeny !== "undefined")
			return y+this.container.screeny();
		else return y;
	else return y;}
DBox.prototype.mousedown = function(){		return this.mouseevent.apply(this,["down"]);}
DBox.prototype.mouseup = function(){		return this.mouseevent.apply(this,["up"]);}
DBox.prototype.mouseclick = function(){		return this.mouseevent.apply(this,["click"]);}
DBox.prototype.mouserclick = function(){	return this.mouseevent.apply(this,["rclick"]);}
DBox.prototype.keydown = function(c){	this.keyevent("down",c);}
DBox.prototype.keyup = function(c){		this.keyevent("up",c);}
DBox.prototype.keyclick = function(c){	this.keyevent("click",c);}//}
extend(TBox,DBox);
function TBox(x, y, w, h, fit){
	DBox.call(this,x,y,w,h);
		//supr(this).constructor.apply(this,[x,y,w,h]);
		
		this.fit = fit;
		if (typeof fit !== "boolean")
			this.fit = true;
		//alert(q);
		var currenttab;
		var that = this;
		var render0 = this.render;
		//this.render = (function(){
		//	return function(g){
		//		render0.call(that,g);
		//	}
		//})();
		//alert(this.getq());
		var add0 = this.add;
		this.add = (function(){
			return function(s, n){
				if (s.constructor !== DBox && n.indexOf(".") == -1){
					console.log("Only DBoxs or TabGroups may be added to a TBox.");
					return;}
				if (n.indexOf(".") == -1 && that.fit){
					s.x = that.x;
					s.y = that.y;
					s.w = that.w;
					s.h = that.h;
					s.camera.reset();}
				add0.call(that,s,n);
				/*
		if (typeof name !== "string"){
			console.log("Adding anonymous system."+name);
			q.push(system);
			system.container = this;
			system.systemname = name;
			if (typeof system.init == "function")	system.init();	return;}var sub = "";
		if (name.indexOf(".")!==-1){
			sub = name.substring(name.indexOf("."));
			name = name.substring(0,name.indexOf("."));
			if (typeof systems[name] !== "object"){	console.log("Parent system not found: "+name);	return;}}
		if (sub == ""){
			systems[name] = system;
			q.push(system);
			system.container = this;
			system.systemname = name;
			if (typeof system.init == "function")	system.init();}
		else systems[name].add(system, sub.substring(1));
				
				
				
				
				
				
		if (typeof n !== "string"){
			console.log("All tabs must be named.");
			return;}
			//console.log("Adding anonymous system."+n);
			//q.push(s);
			//s.container = this;
			//s.systemname = n;
			//if (typeof s.init == "function")	s.init();	return;}
			var sub = "";
		if (n.indexOf(".")!==-1){
			sub = n.substring(n.indexOf("."));
			n = n.substring(0,n.indexOf("."));
			if (!that.has(n)){	console.log("Parent system not found: "+n);	return;}}
		if (sub == ""){
			if (s.constructor !== DBox){
				console.log("Only DBoxs or TabGroups may be added to a TBox.");
				return;}
			systems[n] = s;
			q.push(s);
			s.container = this;
			s.systemname = n;
			if (typeof s.init == "function")	s.init();}
		else systems[n].add(s, sub.substring(1));
				
				
				
				
				
				if (typeof n !== "string"){
					console.log("All tabs must be named.");
					return;}
				else if (s.constructor !== DBox && n.indexOf(".") == -1){
					console.log("Only DBoxs or TabGroups may be added to a TBox.");
					return;}
				else if (n.indexOf(".")==-1 && !that.has(n)){
					//s.x = that.x;
					//s.y = that.y;
					//s.w = that.w;
					//s.h = that.h;
					add0.call(that,s,n);
					that.switchtab(n);
				}
				else if (n.indexOf(".")!==-1 && that.has(n)){
					
				}
				*/
			}
		})();
		this.switchtab = function(n){
			if (!this.has(n) && typeof n !== "number"){
				console.log("Tab not found.");
				return;}
			var q = this.getq();
			console.log(q);
			if (typeof n == "number"){
				for (var i = 0; i < q.length; i++)
					if (!q[i].hidden){
						q[i].hidden = true;
						i+=n;
						if (i < 0)	i+=q.length;
						if (i >= q.length) i-=q.length;
						q[i].hidden=  false;
						//alert("break");
						break;
					}
					return;
			}
			for (var i = 0; i < q.length; i++)
				q[i].hidden = true;
			this.get(n).hidden = false;
		}
		/*
		this.update = function(){
			if (this.has(currenttab))
			this.get(currenttab).update();
		}
		this.render = function(g){
			if (this.has(currenttab))
			this.get(currenttab).render(g);
		}*/
}
function loadImage(name, src){	Assets.loadImage(name,src);}
function loadAudio(name, src){	Assets.loadAudio(name,src);}
function Counter(length){
	var paused = false, 
	running = false, 
	count = 0, 
	incr = 1, 
	len = length;
	this.loop = false;
	this.ready = false;
	this.inprog = false;
	this.getcount = function(){
		return count;}
	this.update = function(){
		if (paused) return;
		if (this.onupdate)	this.onupdate();
		if (count < len && running){
			this.ready = false;
			count+=incr;
			this.inprog = true;}
		else {this.inprog = false;this.ready = true;}}
	this.pause = function(){		paused = true;}
	this.unpause = function(){		paused = false;}
	this.progress = function(){		return count / len;}
	this.start = function(){		running = true;}
	this.reset = function(){		count = 0;}
	this.makeready = function(){	count = len;	this.start();}
	this.setlen = function(val){	len = val;}
	this.consume = function(){		this.ready = false;	this.reset();
									if (!this.loop)	running = false;}
	this.dispose = function(){		counters.splice(counters.indexOf(this),1);}
	//Manager.add(this);
}
function Button(x, y, w, h, slabel, sonclick, sonmiss){
	this.x = x;
	this.y = y; 
	this.w = w; 
	this.h = h;
	alpha = 1;
	var onclick, onmiss;
	var label = "";
	if (typeof slabel == "string"){
		label = slabel;
		if (typeof sonclick == "function")
			onclick = sonclick;
		if (typeof sonmiss == "function")
			onmiss = sonmiss;
	}
	else if (typeof slabel == "function"){
		onclick = slabel;
		if (typeof sonclick == "function")
			onmiss = sonclick;
	}
	var toggleable = false;
	var timed;
	var clickcounter = new Counter(7);
		clickcounter.loop = true;
		clickcounter.makeready();
	var counter;
	var consumeclick;
	var toggleable = false;
	this.invis = false;
	this.down = false;
	this.color = "grey";
	this.setlabel = function(txt){
		label = txt;}
	this.settoggleable = function(toggle){
		toggleable = toggle;}
	this.settimed = function(ms){
		timed = true;
		counter = new Counter(ms);
		counter.loop = true;
		counter.makeready();}
	this.setonclick = function(click){
		onclick = click;}
	this.setonmiss = function(miss){
		onmiss = miss;}
	this.ishover = function(){
		var mx = mouse.x-this.container.screenx(), my = mouse.y-this.container.screeny();
		return !(mx < this.x || mx > this.x + this.w || my < this.y || my > this.y + this.h);}
	var click =  function(){
		clickcounter.consume();
		if (timed && !this.down){
			this.down = true;
			counter.consume();}
		if (toggleable)
			this.down = !this.down;
		if (typeof onclick !== "undefined") return onclick();
		if (this.ishover()) return true;
		return false;}
	this.mousedown = function(){
		if (!this.ishover()){
			if (typeof onmiss == "function")return onmiss();return false;}
		else return click.call(this);
		return true;}
	this.mouseclick = function(){
		if (this.ishover()) return true;
	}
	/*this.mouseclick = function(){
		if (!this.ishover()){
			if (onmiss)return onmiss();}
		else return click.call(this);
		return false;}*/
	this.init = function(){
		this.container.add(clickcounter,"click");
	}
	this.update = function(){
		if (timed && typeof counter !== "undefined")
			if (counter.ready)
				this.down = false;}
	this.render = function(g){
		g.fillStyle = this.color;
		g.globalAlpha = alpha;
		g.fillRect(this.x,this.y,this.w,this.h);
		g.globalAlpha = 1;
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.font = "20px Arial";
		if (this.down || !clickcounter.ready){
			g.globalAlpha = 0.20;
			g.fillStyle = "black";
			g.fillRect(this.x+5,this.y+5,this.w-10,this.h-10);
				if (this.down && counter){
					if (!counter.ready){
						g.globalAlpha = 0.25;
						g.fillStyle = "white";
						var h2 = (this.h-10)*(counter.progress());
						g.fillRect(this.x+5,this.y+5,this.w-10,h2);}}}
		else {
			g.globalAlpha = 0.35;
			g.fillStyle = "white";
			g.fillRect(this.x+5,this.y+5,this.w-10,this.h-10);}
		if (this.ishover()){
			g.globalAlpha = 0.5;
			g.fillStyle = "black";
			g.strokeRect(this.x+2,this.y+2,this.w-4,this.h-4);}
		g.globalAlpha = 1;
		g.fillStyle = "black";
		g.fillText(label,this.x+this.w/2,this.y+this.h/2);
		g.strokeRect(this.x,this.y,this.w,this.h);}
}
function KeyListener(key, action, event, consume){
	this.key = key;
	if (!Keys.iskey(this.key)){
		console.log("invalid key");return;}
	var code = Keys.getkeycode(this.key);
	if (typeof action !== "function")
		console.log("invalid action");
	else this.action = action;
	if (typeof consume == "boolean")
		this.consume = consume;
	else this.consume = true;
	switch(event){
		case "onup":
		case "ondown":
		case "onclick":
		case "isup":
		case "isdown":
			this.event = event;
			break;
		default:
			this.event = "ondown";
			break;
	}
	this.keyup = function(c){
		if (c !== code || this.event !== "onup")	return false;
		return this.action() || this.consume;
	}
	this.keydown = function(c){
		if (c !== code || this.event !== "ondown")	return false;
		return this.action() || this.consume;
	}
	this.keyclick = function(c){
		if (c !== code || this.event !== "onclick")	return false;
		return this.action() || this.consume;
	}
	this.update = function(){
		if (!Keys.iskey(this.key))	return;
		if (Keys.getkeycode(this.key) !== code)
			code = Keys.getkeycode(this.key);
		switch(this.event){
			case "onup":
			case "ondown":
			case "onclick":
				break;
			case "isup":
				if (!Keys[this.key])
					this.action();
				break;
			case "isdown":
				if (Keys[this.key])
					this.action();
				break;
			default:
				this.event = "ondown";
				break;
		}
	}
}
//function dynobj(categ, )
function dynshape(shape, color, width, height, alpha, angle){
	var shape, color, alpha, angle, width, height, filled, stroke;
	if (typeof shape !== "string")
		shape = "square";
	if (typeof color !== "string")
		color = "red";
	if (typeof alpha !== "number")
		alpha = 1;
	if (typeof angle !== "number")
		angle = 0;
	if (typeof width !== "number")
		width = 20;
	if (typeof height !== "number")
		height = 20;
	var scalex = 1,
		scaley = 1;
	var centerx = width/2,
		centery = height/2;
	var filled = true, stroke = 2;
	this.setalpha = function(a){
		alpha = a;}
	this.setcolor = function(c){
		color = c;}
	this.setshape = function(s){
		shape = s;}
	this.setfilled = function(f){
		filled = f;}
	this.setstroke = function(t){
		stroke = t;}
	this.setcenter = function(x, y){
		centerx = x;
		centery = y;}
	this.rotate = function(da){
		angle+=da;}
	this.rotateto = function(a){
		angle=a;}
	this.setscale = function(x, y){
		scalex = x; scaley = y;}
	this.scale = function(x, y){
		scalex*= x;	scaley*= y;}
	this.setsize = function(w, h){
		this.setwidth(w);
		this.setheight(h);}
	this.setwidth = function(w){
		width = w;}
	this.setheight = function(h){
		height = h;}
	this.reset = function(){
		alpha = 1;
		filled = true;
		angle = 0;
		scalex = 1;
		scaley = 1;
		centerx = width/2;
		centery = height/2;
	}
	this.get = function(){
		return {
			s:shape,
			c:color,
			al:alpha,
			f:filled,
			st:stroke,
			w:width,
			h:height,
			a:angle,
			sx:scalex,
			sy:scaley,
			cx:centerx,
			cy:centery};}
}
function sdraw(g, basicorshape, x, y, color, width, height, angle, alpha, fill){
	if (typeof basicorshape == "string"){//shape
		var shape = basicorshape;
		if (typeof width !== "number")
			width = 20;
		if (typeof height !== "number")
			height = 20;
		if (typeof fill !== "boolean")
			fill = true;
		if (typeof alpha !== "number")
			alpha = 1;
		if (typeof angle !== "number")
			angle = 0;
		g.save();
		g.translate(x,y);
		g.rotate(angle);
		if (shape!=="line")
			g.translate(-width/2,-height/2);
		g.fillStyle = color;
		g.globalAlpha = alpha;
		switch(shape){
			case "rect":
			case "square":
				if (fill)	g.fillRect(0, 0, width, height);
				else 		g.strokeRect(0, 0, width, height);
				break;
			case "circle":
				g.beginPath();
				g.arc(0, 0, width/2, 0, 2*Math.PI);
				if (fill)	g.fill();
				else 		g.stroke();
				break;
			case "line":
				g.lineWidth = angle;
				g.lineTo(width-x,height-y);
				break;
		}
		g.restore();
	}
	else {//basic
		if (typeof basicorshape.x == "number")
			x = basicorshape.x;
		if (typeof basicorshape.y == "number")
			y = basicorshape.y;
		var d = basicorshape.get();
		g.save();
		g.translate(x,y);
		if (d.s!=="line")
		g.rotate(d.a);
		g.scale(d.sx,d.sy);
		if (d.s!=="line")
		g.translate(-d.cx,-d.cy);
		g.fillStyle = d.c;
		g.globalAlpha = d.al;
		g.lineWidth = d.st;
		switch(d.s){
			case "rect":
			case "square":
				if (d.f)	g.fillRect(0, 0, d.w, d.h);
				else 		g.strokeRect(0, 0, d.w, d.h);
				break;
			case "circle":
				g.beginPath();
				g.arc(d.cx,d.cy, d.w/2, 0, 2*Math.PI);
				if (d.f)	g.fill();
				else 		g.stroke();
				break;
			case "line":
				g.lineWidth = d.a;
				g.lineTo(d.w-x,d.h-y);
				break;
		}
		g.restore();
	}
}
function dynimage(imag){
	var img = imag;
	var width = img.width,
		height = img.height;
	var angle = 0;
	var scalex = 1,
		scaley = 1;
	var centerx = width/2,
		centery = height/2;
	this.setimg = function(imag){
		img = imag;}
	this.setcenter = function(x, y){
		centerx = x;
		centery = y;}
	this.rotate = function(da){
		angle+=da;}
	this.rotateto = function(a){
		angle=a;}
	this.setscale = function(x, y){
		scalex = x; scaley = y;}
	this.scale = function(x, y){
		scalex*= x;	scaley*= y;}
	this.setsize = function(w, h){
		this.setwidth(w);
		this.setheight(h);}
	this.setwidth = function(w){
		scalex = w/width;}
	this.setheight = function(h){
		scaley = h/height;}
	this.reset = function(){
		width = img.width;
		height = img.height;
		angle = 0;
		scalex = 1;
		scaley = 1;
		centerx = width/2;
		centery = height/2;
	}
	this.get = function(){
		return {
			i:img,
			w:width,
			h:height,
			a:angle,
			sx:scalex,
			sy:scaley,
			cx:centerx,
			cy:centery};}}
function idraw(g, d, x, y){
	d = d.get();
	g.save();
	g.translate(x,y);
	g.rotate(d.a);
	g.scale(d.sx,d.sy);
	g.translate(-d.cx,-d.cy);
	g.drawImage(d.i, 0, 0, d.w, d.h);
	if (Framework.devtools.imgbox){g.fillStyle = "white";g.globalAlpha = .3;
		g.fillRect(0, 0, d.w*d.sx, d.h*d.sy);}
	g.restore();
}
function dyntext(txt){
	var text = txt;
	//var width = img.width,
	//	height = img.height;
	var font = "Arial",
		fsize = 20;
	var valign = "middle",
		halign = "center";
	var alpha = 1;
	var offx = 0,
		offy = 0;
	var angle = 0;
	var scalex = 1,
		scaley = 1;
	var color = "black";
	//var centerx = width/2,
	//	centery = height/2;
	//this.setimg = function(imag){
	//	img = imag;}
	this.set = function(txt){
		text = txt;}
	this.append = function(txt){
		text+=txt;}
	this.offset = function(x,y){
		offx = x;	offy = y;}
	this.setalpha = function(a){
		alpha = a;}
	this.setcolor = function(c){
		color = c;}
	this.setfontsize = function(s){
		fsize = s;}
	this.setfont = function(f){
		font = f;}
	this.vertalign = function(align){
		if (typeof align == "string")	valign = align;}
	this.horzalign = function(align){
		if (typeof align == "string")	halign = align;}
	//this.setcenter = function(x, y){
	//	centerx = x;
	//	centery = y;}
	this.rotate = function(da){
		angle+=da;}
	this.rotateto = function(a){
		angle=a;}
	this.setscale = function(x, y){
		scalex = x; scaley = y;}
	this.scale = function(x, y){
		scalex*= x;	scaley*= y;}
	//this.setsize = function(w, h){
	//	this.setwidth(w);
	//	this.setheight(h);}
	//this.setwidth = function(w){
	//	scalex = w/width;}
	//this.setheight = function(h){
	//	scaley = h/height;}
	this.reset = function(){
		//width = img.width;
		//height = img.height;
		angle = 0;
		scalex = 1;
		scaley = 1;
		alpha = 1;
		color = "black";
		font = "Arial";
		fsize = 20;
		valign = "middle";
		halign = "center";
		//centerx = width/2;
		//centery = height/2;
	}
	this.get = function(){
		return {
			t:text,
			c:color,
			al:alpha,
			//w:width,
			//h:height,
			a:angle,
			sx:scalex,
			sy:scaley,
			f:""+fsize+"px "+font,
			//cx:centerx,
			//cy:centery
			ox:offx,
			oy:offy,
			v:valign,
			h:halign};}
	
}
function tdraw(g, dt, x, y){
	if (typeof dt == "string"){
		g.font = "20px Arial";
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(dt, x, y);
		return;
	}
	var d = dt.get();
	g.save();
	g.translate(x,y);
	g.rotate(d.a);
	g.scale(d.sx,d.sy);
	g.fillStyle = d.c;
	g.globalAlpha = d.al;
	g.font = d.f;
	g.textAlign = d.h;
	g.textBaseline = d.v;
	g.translate(d.ox,d.oy);
	g.fillText(d.t,0,0);
	g.restore();
}
//function ddraw(g, d, x, y)
function rendertransform(angle, origx, origy, scalex, scaley, color, alpha){
	
}