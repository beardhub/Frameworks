function loadCardAssets(){
	loadImage("back",	"../assets/cards/cardBack_blue4.png");
	loadImage("c2",		"../assets/cards/cardClubs2.png");
	loadImage("c3",		"../assets/cards/cardClubs3.png");
	loadImage("c4",		"../assets/cards/cardClubs4.png");
	loadImage("c5",		"../assets/cards/cardClubs5.png");
	loadImage("c6",		"../assets/cards/cardClubs6.png");
	loadImage("c7",		"../assets/cards/cardClubs7.png");
	loadImage("c8",		"../assets/cards/cardClubs8.png");
	loadImage("c9",		"../assets/cards/cardClubs9.png");
	loadImage("c10",	"../assets/cards/cardClubs10.png");
	loadImage("cJ",		"../assets/cards/cardClubsJ.png");
	loadImage("cQ",		"../assets/cards/cardClubsQ.png");
	loadImage("cK",		"../assets/cards/cardClubsK.png");
	loadImage("cA",		"../assets/cards/cardClubsA.png");
	
	loadImage("d2",		"../assets/cards/cardDiamonds2.png");
	loadImage("d3",		"../assets/cards/cardDiamonds3.png");
	loadImage("d4",		"../assets/cards/cardDiamonds4.png");
	loadImage("d5",		"../assets/cards/cardDiamonds5.png");
	loadImage("d6",		"../assets/cards/cardDiamonds6.png");
	loadImage("d7",		"../assets/cards/cardDiamonds7.png");
	loadImage("d8",		"../assets/cards/cardDiamonds8.png");
	loadImage("d9",		"../assets/cards/cardDiamonds9.png");
	loadImage("d10",	"../assets/cards/cardDiamonds10.png");
	loadImage("dJ",		"../assets/cards/cardDiamondsJ.png");
	loadImage("dQ",		"../assets/cards/cardDiamondsQ.png");
	loadImage("dK",		"../assets/cards/cardDiamondsK.png");
	loadImage("dA",		"../assets/cards/cardDiamondsA.png");
	
	loadImage("h2",		"../assets/cards/cardHearts2.png");
	loadImage("h3",		"../assets/cards/cardHearts3.png");
	loadImage("h4",		"../assets/cards/cardHearts4.png");
	loadImage("h5",		"../assets/cards/cardHearts5.png");
	loadImage("h6",		"../assets/cards/cardHearts6.png");
	loadImage("h7",		"../assets/cards/cardHearts7.png");
	loadImage("h8",		"../assets/cards/cardHearts8.png");
	loadImage("h9",		"../assets/cards/cardHearts9.png");
	loadImage("h10",	"../assets/cards/cardHearts10.png");
	loadImage("hJ",		"../assets/cards/cardHeartsJ.png");
	loadImage("hQ",		"../assets/cards/cardHeartsQ.png");
	loadImage("hK",		"../assets/cards/cardHeartsK.png");
	loadImage("hA",		"../assets/cards/cardHeartsA.png");
	
	loadImage("s2",		"../assets/cards/cardSpades2.png");
	loadImage("s3",		"../assets/cards/cardSpades3.png");
	loadImage("s4",		"../assets/cards/cardSpades4.png");
	loadImage("s5",		"../assets/cards/cardSpades5.png");
	loadImage("s6",		"../assets/cards/cardSpades6.png");
	loadImage("s7",		"../assets/cards/cardSpades7.png");
	loadImage("s8",		"../assets/cards/cardSpades8.png");
	loadImage("s9",		"../assets/cards/cardSpades9.png");
	loadImage("s10",	"../assets/cards/cardSpades10.png");
	loadImage("sJ",		"../assets/cards/cardSpadesJ.png");
	loadImage("sQ",		"../assets/cards/cardSpadesQ.png");
	loadImage("sK",		"../assets/cards/cardSpadesK.png");
	loadImage("sA",		"../assets/cards/cardSpadesA.png");
}
function Card(n){
	var name = n;
	var img = new dynimage(Assets.i(name));
	img.setscale(.65,.75);
	var back = new dynimage(Assets.i("back"));
	back.setscale(.65,.75);
	var faceup = false;
	var x = 0,	y = 0;
	var visible = false;
	this.getname = function(){
		return name;}
	this.place = function(px, py){
		x = px;	y = py;	visible = true;}
	this.flip = function(dir){
		if (dir !== "up" && dir !== "down"){
			faceup = !faceup;
			return;}
		if (dir == "up")
			faceup = true;
		else faceup = false;
	}
	this.render = function(g){
		if (!visible)	return;
		if (faceup)	idraw(g, img, x, y);
		else 		idraw(g, back, x, y);
	}
}
function Deck(vary){
	var variant = "default";
	if (typeof vary == "string")
		variant = vary;
	var deck = [];
	switch(variant){
		case "default":
			var suits = "cdhs";
			for (var i = 0; i < 4; i++){
				var suit = suits.charAt(i);
				deck.push(new Card(suit+"K"));
				deck.push(new Card(suit+"Q"));
				deck.push(new Card(suit+"J"));
				for (var j = 10; j > 1; j--)
					deck.push(new Card(suit+""+j));
				deck.push(new Card(suit+"A"));
			}
			break;
	}
	this.shuffle = function(){
		var after = [];
		while(deck.length > 0){
			var ind = Math.floor(Math.random()*(deck.length));
			after.push(deck[ind]);
			deck.splice(ind,1);
		}
		deck = after;
	}
	this.log = function(){
		console.log("length "+deck.length);
		for (var i = 0; i < deck.length; i++)
			console.log(deck[i].getname());
	}
	var x = 0,	y = 0;
	this.place = function(px, py){
		x = px;	y = py;}
}