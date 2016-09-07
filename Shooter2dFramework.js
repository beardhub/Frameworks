//document.getElementsByTagName("head").append("<script type='text/javascript' src='..\\Libraries\\Box2D.js'></script>");
var Shooter = new ShooterFramework();
Framework.registerframework(Shooter);
function ShooterFramework(){
	this.init = function(){
		b2Vec2 = Box2D.Common.Math.b2Vec2;
		b2BodyDef = Box2D.Dynamics.b2BodyDef;
		b2Body = Box2D.Dynamics.b2Body;
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
		b2Fixture = Box2D.Dynamics.b2Fixture;
		b2World = Box2D.Dynamics.b2World;
		b2MassData = Box2D.Collision.Shapes.b2MassData;
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		b2ContactListener = Box2D.Dynamics.b2ContactListener;
	}
}
function WorldObject(fps, scl, dbug){
	var delta = 1/fps;
	var world;
	var debugDraw;
	var debug = dbug;
	if (typeof debug !== "boolean")
		debug = false;
	var scale = scl;
	if (typeof scale !== "number")
		scale = 30;
	this.init = function(){
		world = new b2World(new b2Vec2(0,0),false);
		//this.debug = false;
		prepdebug();
		this.rl = 5;
	}
	this.setscale = function(scl){
		scale = scl;
		debugDraw.SetDrawScale(scale);
	}
	this.getscale = function(){
		return scale;}
	this.setdebug = function(dbug){
		if (typeof dbug == "boolean")
			debug = dbug;
	}
	function prepdebug(){
		debugDraw = new b2DebugDraw();
		//debugDraw.SetSprite(canvas.getContext("2d"));
		debugDraw.SetDrawScale(scale);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
	}
	this.update = function(){
		world.Step(delta, 6, 2);
	}
	this.render = function(g){
		if (debug)	{
		//debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(g);
		//debugDraw.SetDrawScale(this.scale);
		//debugDraw.SetFillAlpha(0.3);
		//debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		//world.SetDebugDraw(debugDraw);
			world.DrawDebugData();
		}
		
	}
	this.rectbody = function(x, y, w, h, sensor, fixed){
		//alert("new body");
		if (typeof sensor !== "boolean")
			sensor = true;
		if (typeof fixed !== "boolean")
			fixed = true;
		var fixDef = new b2FixtureDef;
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;	
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(w, h);
		fixDef.isSensor = sensor;
		bodyDef.position.Set(x, y);
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		body.SetFixedRotation(fixed);
		return body;
	}
}
/*
function WorldSys(){
	var world;
	var debugDraw;
	this.init = function(){
		world = new b2World(new b2Vec2(0,0),false);
		this.scale = 30;
		activatedebug();
		this.debug = false;
		this.rl = 1;
	}
	function activatedebug(){
		debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(canvas.getContext("2d"));
		debugDraw.SetDrawScale(this.scale);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
	}
	this.setscale = function(scale){
		this.scale = scale;
		debugDraw.SetDrawScale(scale);
	}
	this.rectbody = function(x, y, w, h, sensor, fixed){
		//alert("new body");
		if (typeof sensor !== "boolean")
			sensor = true;
		if (typeof fixed !== "boolean")
			fixed = true;
		var fixDef = new b2FixtureDef;
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;	
		fixDef.shape = new b2PolygonShape;
		fixDef.shape.SetAsBox(w, h);
		fixDef.isSensor = sensor;
		bodyDef.position.Set(x, y);
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		body.SetFixedRotation(fixed);
		return body;
	}
	this.circbody = function(x, y, r, sensor, fixed){
		if (typeof sensor !== "boolean")
			sensor = true;
		if (typeof fixed !== "boolean")
			fixed = true;
		var fixDef = new b2FixtureDef;
		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_dynamicBody;
		fixDef.shape = new b2CircleShape(r);
		fixDef.isSensor = sensor;
		bodyDef.position.Set(x, y);
		var body = world.CreateBody(bodyDef);
		body.CreateFixture(fixDef);
		body.SetFixedRotation(fixed);
		return body;
	}
	this.update = function(){
		world.Step(1/60,6,2);
	}
	this.render = function(g){
		if (this.debug)	{
		debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(g);
		debugDraw.SetDrawScale(this.scale);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
			world.DrawDebugData();
		}
	}
}*/