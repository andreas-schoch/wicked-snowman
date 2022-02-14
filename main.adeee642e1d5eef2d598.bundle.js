(()=>{var e,t={7153:(e,t,s)=>{var i={"./gamestats-pixi.module.js":[6913,216]};function a(e){if(!s.o(i,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=i[e],a=t[0];return s.e(t[1]).then((()=>s(a)))}a.keys=()=>Object.keys(i),a.id=7153,e.exports=a},410:(e,t,s)=>{"use strict";s.d(t,{R$:()=>S,$7:()=>w,ot:()=>R});var i=s(2260);class a extends Phaser.Scene{constructor(){super({key:"PreloadScene"})}preload(){this.load.audio("theme",["assets/audio/theme/theme.ogg","assets/audio/theme/theme.mp3","assets/audio/theme/theme.aac"]);const e=this.game.canvas.height===S?"960x540":"480x270";this.load.image("space-back",`assets/img/bgSpace/bg-space-back-${e}.png`),this.load.image("space-mid",`assets/img/bgSpace/bg-space-mid-${e}.png`),this.load.image("mountain-back",`assets/img/bgLandscape/mountain-back-${e}.png`),this.load.image("mountain-mid",`assets/img/bgLandscape/mountain-mid-${e}.png`),this.load.image("tree-dead-01","assets/img/svgsilh/dead-tree-01.png"),this.load.image("boulder-01","assets/img/andi/boulder-01.png"),this.load.bitmapFont("atari-classic","assets/fonts/bitmap/atari-classic.png","assets/fonts/bitmap/atari-classic.xml")}create(){this.scene.start("GameScene")}}var n=s(2511);const o=[{x:2,y:82},{x:7,y:14},{x:20,y:6},{x:41,y:2},{x:89,y:11},{x:137,y:52},{x:147,y:82}],r={startTerrainHeight:.5,slopeAmplitude:200,slopeLengthRange:[448,896],gridDensity:64,layers:[{color:13165035,width:5},{color:6065609,width:22},{color:2243451,width:10},{color:2960428,width:5},{color:3813938,width:250}]};class h{constructor(e,t,s=r){this.yOffset=0,this.lastRockSpawnX=0,this.scene=e,this.b2Physics=t,this.config=s;const i=Math.floor(1.5*s.slopeLengthRange[1]);this.pointsPool=[];for(let e=0;e<i;e++)this.pointsPool.push({x:0,y:0});this.vec2Pool=[];for(let e=0;e<i;e++)this.vec2Pool.push(new n.b2Vec2(0,0));this.chunks=[this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10),this.scene.add.graphics().setDepth(10)],this.poolBoulderBodies=[this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11),this.scene.add.image(-1e3,0,"boulder-01").setVisible(!1).setDepth(11)];const a=this.scene.add.graphics();a.fillStyle(16777215),a.fillCircle(25,25,25),a.generateTexture("coin",50,50);const o={color:6065609,type:n.b2BodyType.b2_staticBody,texture:"coin",enabled:!1,isSensor:!0};this.poolCoinBodies=[this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o),this.b2Physics.createBox(0,-1e3,0,20,20,o)],this.poolTreeImages=[this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1),this.scene.add.image(-1e3,0,"tree-dead-01").setVisible(!1).setDepth(1)],this.terrainBody=this.b2Physics.world.CreateBody(),this.slopeStart=new Phaser.Math.Vector2(0,0),this.registerCollectCoinListener(),this.update()}update(){R.begin("terrain");const{zoom:e,width:t,worldView:s}=this.scene.cameras.main;for(;this.slopeStart.x<s.x+t+1/e*500;)this.cleanupFixtures(),this.updateChunk();R.end("terrain")}updateChunk(){const[e,t]=this.generatePoints();this.createTerrainColliders(t),this.drawTerrain(e),this.drawDecoration(e),this.drawCoins(e),this.drawObstacles(e)}createTerrainColliders(e,t="surface"){const s=new n.b2ChainShape;"surface"===t?s.CreateChain(e,e.length,e[0],e[e.length-1]):s.CreateLoop(e,e.length);const i={shape:s,density:0,friction:.01};return this.terrainBody.CreateFixture(i)}drawTerrain(e){const t=this.chunks.shift();if(!t)return;this.chunks.push(t),t.clear();const s=e.length-1,i=Math.max(e[0].y,e[s].y)+2*this.scene.cameras.main.height;let a=0;e.push({x:e[s].x,y:i},{x:e[0].x,y:i});for(const{color:s,width:i}of this.config.layers)t.translateCanvas(0,a),t.fillStyle(s),t.fillPoints(e,!0,!0),t.translateCanvas(0,0),a=i;e.length-=2}drawDecoration(e){const t=e[Math.floor(Math.random()*(e.length-1))],s=this.poolTreeImages.shift();s&&(this.poolTreeImages.push(s),s.setPosition(t.x,t.y-s.height/2.25).setVisible(!0))}drawCoins(e){const t=e[Math.floor(Math.random()*(e.length-1))],s=this.poolCoinBodies.shift();if(!s)return;this.poolCoinBodies.push(s);const i=this.vec2Pool[0];s.SetTransformVec(i.Set(t.x/this.b2Physics.worldScale,(t.y-25)/this.b2Physics.worldScale),0),s.SetEnabled(!0)}drawObstacles(e){const t=e[0],s=e[e.length-1],i=this.scene.cameras.main.scrollX/(2*this.b2Physics.worldScale),a=i<750?2500:1500,n=i<3e3?.7:.4,r=s.x-t.x,h=Math.abs(t.y-s.y),c=s.x-this.lastRockSpawnX;if(h<=50&&r>=this.config.slopeLengthRange[1]*n&&Math.random()<.7&&c>a){this.lastRockSpawnX=s.x;const e=this.poolBoulderBodies.shift();null==e||e.setPosition(s.x,s.y+35).setVisible(!0),this.createTerrainColliders(o.map((e=>({x:(e.x-75+s.x)/this.b2Physics.worldScale,y:(e.y-40+s.y)/this.b2Physics.worldScale}))),"obstacle").SetUserData(e)}}generatePoints(){this.slopeEnd=this.getNextSlopeEnd();const e=[],t=[],s=this.b2Physics.worldScale;let i=this.slopeStart.x,a=0;const{startTerrainHeight:n,slopeAmplitude:o}=this.config,r=this.scene.cameras.main.height*n,h=this.slopeEnd.x-this.slopeStart.x,c=this.slopeStart.x,l=this.slopeStart.y,d=this.slopeEnd.y;let g,p;for(;i<=this.slopeEnd.x;){let n=r+this.interpolate(l,d,(i-c)/h)*o;g=this.pointsPool[a],g.x=i,g.y=n,e.push(g),p=this.vec2Pool[a],p.x=g.x/s,p.y=g.y/s,t.push(p),i+=this.config.gridDensity,a++}return this.slopeStart.x=this.slopeEnd.x,this.slopeStart.y=this.slopeEnd.y,[e,t]}getNextSlopeEnd(){const{gridDensity:e,slopeLengthRange:t}=this.config;let s=Phaser.Math.Between(t[0],t[1]);s=Math.round(s/e)*e,this.yOffset+=s>.8*this.config.slopeLengthRange[1]?.4:.1,this.yOffset+=s<1.1*this.config.slopeLengthRange[0]&&Math.random()<.85?.4:0;const i=(this.config.slopeLengthRange[1],.75);return 0===this.slopeStart.x?{x:Math.round(1.5*r.slopeLengthRange[1]/e)*e,y:0}:{x:this.slopeStart.x+s,y:Math.random()*i+this.yOffset}}interpolate(e,t,s){let i=.5*(1-Math.cos(s*Math.PI));return e*(1-i)+t*i}cleanupFixtures(){const e=this.b2Physics.worldScale,t=this.scene.cameras.main.scrollX-1/this.scene.cameras.main.zoom*500;for(let s=this.terrainBody.GetFixtureList();s;s=s.GetNext()){const i=s.GetShape();if(this.b2Physics.isChain(i)&&i.m_vertices[i.m_vertices.length-1].x*e<t){const e=s.GetUserData();e&&this.poolBoulderBodies.push(e),this.terrainBody.DestroyFixture(s)}}}registerCollectCoinListener(){}}class c{constructor(e){this.BASE_BOOST_FLOW=1350,this.BASE_TRICK_POINTS=200,this.maxBoost=15*this.BASE_BOOST_FLOW,this.availableBoost=this.maxBoost/1.5,this.landedFrontFlips=0,this.landedBackFlips=0,this.timeGrounded=0,this.totalTrickScore=0,this.protoTrickScore=0,this.comboAccumulatedScore=0,this.anglePreviousUpdate=0,this.totalRotation=0,this.currentFlipRotation=0,this.pendingFrontFlips=0,this.pendingBackFlips=0,this.ignoredSensorBodies=new Set,this.comboMultiplier=0,this.alreadyCollectedCoins=new Set,this.snowman=e,this.parts=e.parts,this.b2Physics=e.b2Physics,this.crashIgnoredParts=[this.parts.armLowerLeft,this.parts.armLowerRight,this.parts.body],this.state=e.isInAir()?"in-air":"grounded",this.registerCollisionListeners(),this.snowman.scene.observer.on("enter-in-air",(()=>this.state="in-air")),this.snowman.scene.observer.on("enter-grounded",(()=>{this.state="grounded",this.timeGrounded=this.snowman.scene.game.getTime(),this.landedFrontFlips+=this.pendingFrontFlips,this.landedBackFlips+=this.pendingBackFlips;const e=this.pendingBackFlips+this.pendingFrontFlips;if(e>=1){const t=e*e*this.BASE_TRICK_POINTS;this.totalTrickScore+=t,this.comboAccumulatedScore+=.1*t,this.comboMultiplier++,this.gainBoost(1,5*e),this.snowman.scene.observer.emit("combo-change",this.comboAccumulatedScore,this.comboMultiplier),this.snowman.scene.observer.emit("score-change",this.totalTrickScore),this.snowman.scene.observer.emit("boost-change",this.availableBoost,this.maxBoost),this.comboLeewayTween.resetTweenData(!0),this.comboLeewayTween.play()}this.totalRotation=0,this.currentFlipRotation=0,this.pendingBackFlips=0,this.pendingFrontFlips=0})),this.snowman.scene.observer.on("enter-crashed",(()=>{this.state="crashed",(this.comboLeewayTween.isPlaying()||this.comboLeewayTween.isPaused())&&this.comboLeewayTween.stop()})),this.comboLeewayTween=this.snowman.scene.tweens.addCounter({paused:!0,from:-.5*Math.PI,to:1.5*Math.PI,duration:1e3,onUpdate:e=>this.snowman.scene.observer.emit("combo-leeway-update",e.getValue()),onComplete:e=>{this.totalTrickScore+=this.comboAccumulatedScore*this.comboMultiplier,this.snowman.scene.observer.emit("score-change",this.totalTrickScore),this.snowman.scene.observer.emit("combo-change",0,0),this.protoTrickScore=0,this.comboAccumulatedScore=0,this.comboMultiplier=0}})}getState(){return this.state}getTravelDistanceMeters(){const e=this.parts.body.GetPosition().Length()/2;return 50*Math.floor(e/50)}gainBoost(e,t){const s=Math.min(this.maxBoost,this.BASE_BOOST_FLOW*t*e+this.availableBoost);return this.availableBoost=s,this.snowman.scene.observer.emit("boost-change",this.availableBoost,this.maxBoost),s}consumeBoost(e,t){if(this.availableBoost<=0)return 0;const s=Math.min(this.availableBoost,this.BASE_BOOST_FLOW*t*e);return this.availableBoost-=s*(t>1?1.5:1),this.snowman.scene.observer.emit("boost-change",this.availableBoost,this.maxBoost),s}registerCollisionListeners(){this.snowman.b2Physics.on("post-solve",((e,t)=>{var s;if(this.isCrashed&&this.lostHead)return;const i=e.GetFixtureA().GetBody(),a=e.GetFixtureB().GetBody();if(this.crashIgnoredParts.includes(i)||this.crashIgnoredParts.includes(a))return;const n=this.snowman.board.nose;i===this.parts.head||a===this.parts.head?Math.max(...t.normalImpulses)>8&&(this.lostHead=!0,this.isCrashed=!0):!n||i!==n.body&&a!==n.body||Math.max(...t.normalImpulses)>10&&(null===(s=n.crashRayResult)||void 0===s?void 0:s.hit)&&(this.isCrashed=!0)})),this.snowman.b2Physics.on("begin-contact",(e=>{const t=e.GetFixtureA(),s=e.GetFixtureB(),i=t.GetBody(),a=s.GetBody();t.IsSensor()&&i.IsEnabled()&&!this.ignoredSensorBodies.has(i)?(this.ignoredSensorBodies.add(i),this.gainBoost(1,.25),this.totalTrickScore+=100,this.snowman.scene.observer.emit("collected-coin",i),this.snowman.scene.observer.emit("score-change",this.totalTrickScore),setTimeout((()=>i.SetEnabled(!1)))):s.IsSensor()&&a.IsEnabled()&&!this.ignoredSensorBodies.has(a)&&(this.ignoredSensorBodies.add(a),this.gainBoost(1,.25),this.totalTrickScore+=100,this.snowman.scene.observer.emit("collected-coin",a),this.snowman.scene.observer.emit("score-change",this.totalTrickScore),setTimeout((()=>a.SetEnabled(!1))))}))}update(e){this.ignoredSensorBodies.clear();const t=this.snowman.isInAir();"crashed"!==this.state&&this.isCrashed&&this.snowman.scene.observer.emit("enter-crashed"),"grounded"===this.state&&t&&!this.isCrashed?this.snowman.scene.observer.emit("enter-in-air"):"in-air"!==this.state||t||this.isCrashed||this.snowman.scene.observer.emit("enter-grounded"),this.updateTrickCounter(),this.updateComboLeeway(),this.updateDistance()}updateTrickCounter(){if("in-air"===this.state){const e=i.Math.Angle.Normalize(this.parts.body.GetAngle()),t=this.calculateDifferenceBetweenAngles(this.anglePreviousUpdate,e);this.totalRotation+=t,this.currentFlipRotation+=t,this.anglePreviousUpdate=e,this.currentFlipRotation>=Math.PI*(0===this.pendingFrontFlips?1.25:2)?(this.pendingFrontFlips++,this.currentFlipRotation=0):this.currentFlipRotation<=Math.PI*-(0===this.pendingBackFlips?1.25:2)&&(this.pendingBackFlips++,this.currentFlipRotation=0)}}updateComboLeeway(){(this.comboLeewayTween.isPlaying()||this.comboLeewayTween.isPaused())&&("in-air"!==this.state&&this.snowman.board.isCenterGrounded?this.comboLeewayTween.resume():this.comboLeewayTween.pause())}calculateDifferenceBetweenAngles(e,t){let s=t-e;return s<-Math.PI?s+=2*Math.PI:s>Math.PI&&(s-=2*Math.PI),s}updateDistance(){const e=this.getTravelDistanceMeters();e!==this.lastDistance&&(this.snowman.scene.observer.emit("distance-change",e),this.lastDistance=e)}}class l{constructor(e,t=250,s=50){this.numSegments=10,this.segmentLength=8.4,this.segmentThickness=3.375,this.segments=[],this.pointStart=new n.b2Vec2(0,0),this.pointEnd=new n.b2Vec2(0,0),this.player=e,this.scene=e.scene,this.b2Physics=e.b2Physics,this.debugGraphics=this.scene.add.graphics();const[i,a]=this.generateSegments(t,s,this.b2Physics.worldScale/2);this.leftBinding=i,this.rightBinding=a}update(){this.player.debug&&this.debugGraphics.clear();const e=this.segments;for(const e of this.segments)this.resetSegment(e),e.body.GetWorldPoint(n.b2Vec2.ZERO,this.pointStart),e.body.GetWorldPoint(e.groundRayDirection,this.pointEnd),this.b2Physics.world.RayCast(this.pointStart,this.pointEnd,e.groundRayCallback),this.player.debug&&this.drawDebug(e.groundRayResult.hit?255:65280),e.crashRayResult&&e.crashRayCallback&&e.crashRayDirection&&(e.body.GetWorldPoint(n.b2Vec2.ZERO,this.pointStart),e.body.GetWorldPoint(e.crashRayDirection,this.pointEnd),this.b2Physics.world.RayCast(this.pointStart,this.pointEnd,e.crashRayCallback),this.player.debug&&this.drawDebug(e.crashRayResult.hit?255:65280));this.isTailGrounded=e[0].groundRayResult.hit,this.isNoseGrounded=e[e.length-1].groundRayResult.hit,this.isCenterGrounded=e[4].groundRayResult.hit||e[5].groundRayResult.hit||e[6].groundRayResult.hit}getTimeInAir(){if(this.segments.some((e=>e.groundRayResult.hit)))return-1;const e=Math.max(...this.segments.map((e=>e.groundRayResult.lastHitTime)));return this.scene.game.getTime()-e}isInAir(){return-1!==this.getTimeInAir()}rayCallbackFactory(e){return(t,s,i,a)=>(e.hit=!0,e.point=s,e.normal=i,e.fraction=a,e.lastHitTime=this.scene.game.getTime(),a)}resetSegment(e){e.groundRayResult.hit=!1,e.groundRayResult.point=null,e.groundRayResult.normal=null,e.groundRayResult.fraction=-1,e.crashRayResult&&(e.crashRayResult.hit=!1,e.crashRayResult.point=null,e.crashRayResult.normal=null,e.crashRayResult.fraction=-1)}drawDebug(e){this.debugGraphics.lineStyle(2,e,1);const t=this.b2Physics.worldScale;this.debugGraphics.lineBetween(this.pointStart.x*t,this.pointStart.y*t,this.pointEnd.x*t,this.pointEnd.y*t)}generateSegments(e,t,s){const{numSegments:i,segmentLength:a,segmentThickness:o}=this,r={hit:!1,point:null,normal:null,fraction:-1,lastHitTime:-1};for(let i=1;i<=this.numSegments;i++){const h=this.b2Physics.createBox(e+a*i,t,0,a,o,{color:13973086,type:n.b2BodyType.b2_dynamicBody}),c=i===this.numSegments,l=Object.assign({},r),d=Object.assign({},r);this.segments.push({body:h,groundRayDirection:new n.b2Vec2(0,s/this.b2Physics.worldScale),groundRayResult:l,groundRayCallback:this.rayCallbackFactory(l),crashRayDirection:c?new n.b2Vec2(s/this.b2Physics.worldScale,0):void 0,crashRayResult:c?d:void 0,crashRayCallback:c?this.rayCallbackFactory(d):void 0})}this.nose=this.segments[this.segments.length-1];const h=[{dampingRatio:.5,frequencyHz:6,referenceAngle:-.35},{dampingRatio:.5,frequencyHz:6,referenceAngle:-.25},{dampingRatio:.5,frequencyHz:7,referenceAngle:-.05},{dampingRatio:.5,frequencyHz:8,referenceAngle:-.025},{dampingRatio:.5,frequencyHz:10,referenceAngle:0},{dampingRatio:.5,frequencyHz:8,referenceAngle:-.025},{dampingRatio:.5,frequencyHz:7,referenceAngle:-.05},{dampingRatio:.5,frequencyHz:6,referenceAngle:-.25},{dampingRatio:.5,frequencyHz:6,referenceAngle:-.35}];for(let s=0;s<i-1;s++){const[i,o]=this.segments.slice(s,s+2),r=new n.b2Vec2((e+a/2+a*(s+1))/this.b2Physics.worldScale,t/this.b2Physics.worldScale),{dampingRatio:c,frequencyHz:l,referenceAngle:d}=h[s],g=new n.b2WeldJointDef;g.Initialize(i.body,o.body,r),g.referenceAngle=d,n.b2AngularStiffness(g,l,c,g.bodyA,g.bodyB),this.b2Physics.world.CreateJoint(g)}return[this.segments[3].body,this.segments[6].body]}}class d{constructor(e,t){this.debug=!1,this.jumpForce=18e3,this.leanForce=300,this.boostVector=new n.b2Vec2(0,0),this.jumpVector=new n.b2Vec2(0,0),this.boostFlowMultiplier=1,this.scene=e,this.b2Physics=t,this.bodyRadius=t.worldScale,this.legMinLength=this.bodyRadius,this.legMaxLength=1.6*this.legMinLength,this.cursors=this.scene.input.keyboard.createCursorKeys(),this.board=new l(this,250,50),this.parts=this.generateBodyParts(250,50),this.stateComponent=new c(this)}update(e){var t;if(R.begin("snowman"),this.boostFlowMultiplier=1,this.stateComponent.update(e),this.stateComponent.isCrashed&&this.detachBoard(),this.stateComponent.lostHead&&this.detachHead(),this.getTimeInAir()>100&&this.resetLegs(),!this.stateComponent.isCrashed){if(this.board.update(),null===(t=this.scene.input.activePointer)||void 0===t?void 0:t.isDown){const t=this.scene.input.activePointer;t.motionFactor=.2,this.scene.input.activePointer.x<this.scene.cameras.main.width/2?this.leanBackward(e):this.leanForward(e),t.velocity.y<-30&&this.scene.game.getTime()-t.moveTime<=300&&this.jump(e)}else this.scene.input.activePointer.motionFactor=.8;this.cursors.up.isDown&&this.scene.game.getTime()-this.cursors.up.timeDown<=300&&this.jump(e),this.cursors.left.isDown&&this.leanBackward(e),this.cursors.right.isDown&&this.leanForward(e),this.cursors.down.isDown&&this.leanCenter(),this.boost(e)}R.end("snowman")}getTimeInAir(){return this.board.getTimeInAir()}isInAir(){return this.board.isInAir()}detachBoard(){this.parts.jointBindingLeft&&this.b2Physics.world.DestroyJoint(this.parts.jointBindingLeft),this.parts.jointBindingRight&&this.b2Physics.world.DestroyJoint(this.parts.jointBindingRight),this.parts.jointDistanceLeft&&this.b2Physics.world.DestroyJoint(this.parts.jointDistanceLeft),this.parts.jointDistanceRight&&this.b2Physics.world.DestroyJoint(this.parts.jointDistanceRight),this.parts.jointDistanceRight&&this.board.segments[this.board.segments.length-1].body.SetLinearVelocity(n.b2Vec2.ZERO)}detachHead(){this.parts.jointNeck&&this.b2Physics.world.DestroyJoint(this.parts.jointNeck),this.parts.jointNeck=null}boost(e){const t=this.isInAir()?.6:1,s=this.boostVector.Set(this.stateComponent.consumeBoost(e,this.boostFlowMultiplier)*t,0);this.board.segments&&this.board.segments[4].body.ApplyForceToCenter(s,!0),this.parts.body.ApplyForceToCenter(s,!0)}resetLegs(){this.setDistanceLegs(this.legMinLength,this.legMinLength)}leanBackward(e){this.isInAir(),this.parts.body.ApplyAngularImpulse(-this.leanForce*e),this.setDistanceLegs(this.legMinLength,this.legMaxLength)}leanForward(e){this.isInAir(),this.parts.body.ApplyAngularImpulse(this.leanForce*e),this.setDistanceLegs(this.legMaxLength,this.legMinLength)}leanCenter(){this.boostFlowMultiplier=2,"in-air"===this.stateComponent.getState()&&this.parts.body.ApplyForceToCenter(new n.b2Vec2(0,10)),this.setDistanceLegs(this.legMinLength-5,this.legMinLength-5)}jump(e){if(this.scene.game.getTime()-this.stateComponent.timeGrounded<200)return;this.setDistanceLegs(this.legMaxLength,this.legMaxLength);const t=this.jumpForce*e,s=this.jumpVector.Set(0,0),{isTailGrounded:i,isCenterGrounded:a,isNoseGrounded:n}=this.board;i&&!n?s.y=-t:n&&!i?this.parts.body.GetWorldVector({x:0,y:.6*-t},s).Add({x:0,y:.4*-t}):a&&(s.y=2*-t),this.parts.body.ApplyForceToCenter(s,!0)}setDistanceLegs(e,t){this.parts.jointDistanceLeft&&this.b2Physics.setDistanceJointLength(this.parts.jointDistanceLeft,e,this.legMinLength,this.legMaxLength),this.parts.jointDistanceRight&&this.b2Physics.setDistanceJointLength(this.parts.jointDistanceRight,t,this.legMinLength,this.legMaxLength)}generateBodyParts(e,t){const s={},a=.7*this.bodyRadius,o=.7*this.bodyRadius,r=.3*this.bodyRadius,h=.5,c=o,l=r,d=new n.b2Vec2(e+this.board.segmentLength*(this.board.numSegments/2+h),t-2*this.bodyRadius-this.bodyRadius/2),g=new i.Math.Vector2(0,-1).multiply({x:0,y:this.bodyRadius}).add(d);s.head=this.b2Physics.createCircle(d.x,d.y-this.bodyRadius-a,0,a,{color:13165035,type:n.b2BodyType.b2_dynamicBody,linearDamping:.15,angularDamping:.15}),s.body=this.b2Physics.createCircle(d.x,d.y,0,this.bodyRadius,{color:13165035,type:n.b2BodyType.b2_dynamicBody,linearDamping:.15,angularDamping:.15}),s.jointNeck=this.b2Physics.createRevoluteJoint({bodyA:s.body,bodyB:s.head,anchor:g,lowerAngle:-.25,upperAngle:.25,enableLimit:!0});const p=this.bodyRadius+o/1.75,m=new i.Math.Vector2(0,1).rotate(h).multiply({x:p,y:p}).add(d),y=new i.Math.Vector2(0,1).rotate(h).multiply({x:this.bodyRadius,y:this.bodyRadius}).add(d),b=new i.Math.Vector2(0,1).rotate(.25).multiply({x:o,y:o}).add(m),u=new i.Math.Vector2(b.x,b.y).add({x:0,y:-o/2}),w=new i.Math.Vector2(b).add({x:0,y:o/2});s.legUpperLeft=this.b2Physics.createBox(m.x,m.y,h,r,o),s.legLowerLeft=this.b2Physics.createBox(b.x,b.y,0,r,o),s.jointHipLeft=this.b2Physics.createRevoluteJoint({bodyA:s.body,bodyB:s.legUpperLeft,anchor:y,lowerAngle:-.2,upperAngle:1,enableLimit:!0}),s.jointKneeLeft=this.b2Physics.createRevoluteJoint({bodyA:s.legUpperLeft,bodyB:s.legLowerLeft,anchor:u,lowerAngle:-1.5,upperAngle:.375,enableLimit:!0}),s.jointBindingLeft=this.b2Physics.createRevoluteJoint({bodyA:s.legLowerLeft,bodyB:this.board.leftBinding,anchor:w});const S=this.bodyRadius+o/1.75,x=new i.Math.Vector2(0,1).rotate(-.5).multiply({x:S,y:S}).add(d),f=new i.Math.Vector2(0,1).rotate(-.5).multiply({x:this.bodyRadius,y:this.bodyRadius}).add(d),R=new i.Math.Vector2(0,1).rotate(-.25).multiply({x:o,y:o}).add(x),B=new i.Math.Vector2(R.x,R.y).add({x:0,y:-o/2}),L=new i.Math.Vector2(R).add({x:0,y:o/2});s.legUpperRight=this.b2Physics.createBox(x.x,x.y,-.5,r,o),s.legLowerRight=this.b2Physics.createBox(R.x,R.y,0,r,o),s.jointHipRight=this.b2Physics.createRevoluteJoint({bodyA:s.body,bodyB:s.legUpperRight,anchor:f,lowerAngle:-1,upperAngle:.2,enableLimit:!0}),s.jointKneeRight=this.b2Physics.createRevoluteJoint({bodyA:s.legUpperRight,bodyB:s.legLowerRight,anchor:B,lowerAngle:-.375,upperAngle:1.5,enableLimit:!0}),s.jointBindingRight=this.b2Physics.createRevoluteJoint({bodyA:s.legLowerRight,bodyB:this.board.rightBinding,anchor:L});const P={length:this.legMinLength,minLength:this.legMinLength,maxLength:this.legMaxLength,frequencyHz:8,dampingRatio:5};s.jointDistanceLeft=this.b2Physics.createDistanceJoint(s.body,this.board.rightBinding,y,w,P),s.jointDistanceRight=this.b2Physics.createDistanceJoint(s.body,this.board.leftBinding,f,L,P);const T=Math.PI/180*90,v=.5,C=this.bodyRadius+c/1.75,D=new i.Math.Vector2(-1,0).rotate(v).multiply({x:C,y:C}).add(d),A=new i.Math.Vector2(-1,0).rotate(v).multiply({x:this.bodyRadius,y:this.bodyRadius}).add(d),M=new i.Math.Vector2(-1,0).rotate(v).multiply({x:c,y:c}).add(D),F=new i.Math.Vector2(M).add(new i.Math.Vector2(c/2,0).rotate(v));s.armUpperLeft=this.b2Physics.createBox(D.x,D.y,T+v,l,c),s.armLowerLeft=this.b2Physics.createBox(M.x,M.y,T+v,l,c),s.jointShoulderLeft=this.b2Physics.createRevoluteJoint({bodyA:s.body,bodyB:s.armUpperLeft,anchor:A,lowerAngle:-1.25,upperAngle:.75,enableLimit:!0}),s.jointElbowLeft=this.b2Physics.createRevoluteJoint({bodyA:s.armUpperLeft,bodyB:s.armLowerLeft,anchor:F,lowerAngle:-.75,upperAngle:.75,enableLimit:!0});const k=-T,V=-.5,O=C,I=new i.Math.Vector2(1,0).rotate(V).multiply({x:O,y:O}).add(d),E=new i.Math.Vector2(1,0).rotate(V).multiply({x:this.bodyRadius,y:this.bodyRadius}).add(d),G=new i.Math.Vector2(1,0).rotate(V).multiply({x:c,y:c}).add(I),_=new i.Math.Vector2(G).add(new i.Math.Vector2(-c/2,0).rotate(V));return s.armUpperRight=this.b2Physics.createBox(I.x,I.y,k+V,l,c),s.jointShoulderRight=this.b2Physics.createRevoluteJoint({bodyA:s.body,bodyB:s.armUpperRight,anchor:E,lowerAngle:-.75,upperAngle:1.25,enableLimit:!0}),s.armLowerRight=this.b2Physics.createBox(G.x,G.y,k+V,l,c),s.jointElbowRight=this.b2Physics.createRevoluteJoint({bodyA:s.armUpperRight,bodyB:s.armLowerRight,anchor:_,lowerAngle:-.75,upperAngle:.75,enableLimit:!0}),s}}class g extends Phaser.Events.EventEmitter{constructor(e,t,s){super(),this.textureKeys=new Set,this.ZERO=new n.b2Vec2(0,0),this.bulletTime={rate:1},this.scene=e,this.worldScale=t,this.world=n.b2World.Create(s),this.world.SetContactListener({BeginContact:e=>this.emit("begin-contact",e),EndContact:()=>null,PreSolve:()=>null,PostSolve:(e,t)=>this.emit("post-solve",e,t)}),this.world.SetAllowSleeping(!1),this.world.SetWarmStarting(!0),this.userDataGraphics=e.add.graphics()}update(){R.begin("physics");let e=Math.round(this.scene.game.loop.delta)/640*this.bulletTime.rate;const t=Math.floor(Math.max(this.scene.game.loop.actualFps/3,6));this.world.Step(e,{positionIterations:t,velocityIterations:t}),this.world.ClearForces();const s=this.worldScale;for(let e=this.world.GetBodyList();e;e=e.GetNext()){if(!e)continue;let t=e.GetUserData();if(t)if(e.IsEnabled()){let{x:i,y:a}=e.GetPosition();!t.visible&&t.setVisible(!0),t.x=i*s,t.y=a*s,t.rotation=e.GetAngle()}else t.setVisible(!1)}R.end("physics")}enterBulletTime(e,t){this.bulletTime.rate=t,this.scene.tweens.add({delay:e,targets:[this.bulletTime],rate:.9,duration:500})}createBox(e,t,s,i,a,o={type:n.b2BodyType.b2_dynamicBody}){const r=new n.b2PolygonShape;r.SetAsBox(i/2/this.worldScale,a/2/this.worldScale);const h={shape:r,isSensor:o.isSensor||!1,density:o.density||.1,friction:o.friction||.001,restitution:o.restitution||.005},c=this.world.CreateBody({enabled:o.enabled||!0,fixedRotation:o.fixedRotation,awake:!0,position:{x:e/this.worldScale,y:t/this.worldScale},angle:s,linearDamping:o.linearDamping||.15,angularDamping:o.angularDamping||.1,type:o.type});let l;if(c.CreateFixture(h),c.SetMassData({mass:.5,center:new n.b2Vec2,I:1}),o.texture)l=this.scene.add.image(e,t,o.texture),l.displayHeight=a,l.displayWidth=i;else{const s=o.color||11962192;let n=this.scene.add.graphics().setDepth(o.depth||10);n.fillStyle(s),n.fillRect(-i/2,-a/2,2*i,2*a);const r=`box-${i}-${a}-${s}`;this.textureKeys.has(r)||(this.textureKeys.add(r),n.generateTexture(r,i,a)),l=this.scene.add.image(e,t,r).setDepth(o.depth||10)}return c.SetUserData(l),c}createCircle(e,t,s,i,a={type:n.b2BodyType.b2_dynamicBody,fixedRotation:!1}){const o=new n.b2CircleShape;o.m_radius=i/this.worldScale;const r={shape:o,density:a.density||1,friction:a.friction||.001,restitution:a.restitution||.005},h=this.world.CreateBody({enabled:a.enabled||!0,position:{x:e/this.worldScale,y:t/this.worldScale},angle:s,fixedRotation:a.fixedRotation,linearDamping:a.linearDamping,angularDamping:a.angularDamping,type:a.type});h.CreateFixture(r),h.SetMassData({mass:1,center:this.ZERO,I:1});const c=`circle-${i}-${a.color||3355443}`;this.textureKeys.has(c)||(this.userDataGraphics.clear().fillStyle(a.color||3355443).fillCircle(i,i,i).generateTexture(c,2*i,2*i),this.textureKeys.add(c));const l=this.scene.add.image(e,t,c).setDepth(a.depth||10);return h.SetUserData(l),h}createRevoluteJoint(e){const t=new n.b2RevoluteJointDef,s=new n.b2Vec2(e.anchor.x/this.worldScale,e.anchor.y/this.worldScale);return t.Initialize(e.bodyA,e.bodyB,s),t.collideConnected=!1,e.lowerAngle&&(t.lowerAngle=e.lowerAngle),e.upperAngle&&(t.upperAngle=e.upperAngle),e.enableLimit&&(t.enableLimit=e.enableLimit),this.world.CreateJoint(t)}createDistanceJoint(e,t,s,i,a={}){const o=new n.b2DistanceJointDef,r=this.worldScale;o.Initialize(e,t,{x:s.x/r,y:s.y/r},{x:i.x/r,y:i.y/r}),o.collideConnected=!0;const h=a.length?a.length/this.worldScale:0;return o.length=h,o.minLength=h,o.maxLength=h,n.b2AngularStiffness(o,a.frequencyHz||15,a.dampingRatio||10,o.bodyA,o.bodyB),this.world.CreateJoint(o)}setDistanceJointLength(e,t,s,i){e&&(e.SetMinLength(s?s/this.worldScale:e.GetMinLength()),e.SetMaxLength(i?i/this.worldScale:e.GetMaxLength()),e.SetLength(t/this.worldScale))}isEdge(e){return e.GetType()===n.b2ShapeType.e_edge}isChain(e){return e.GetType()===n.b2ShapeType.e_chain}isPolygon(e){return e.GetType()===n.b2ShapeType.e_polygon}isCircle(e){return e.GetType()===n.b2ShapeType.e_circle}}class p{constructor(e){this.scene=e,this.bgSpaceBack=this.registerLayer("space-back"),this.bgSpaceMid=this.registerLayer("space-mid"),this.bgLandscapeMountains=this.registerLayer("mountain-back").setTint(30,30,30,30),this.bgLandscapeHills=this.registerLayer("mountain-mid").setTint(50,50,50,50)}update(){R.begin("backdrop");const{scrollX:e,scrollY:t}=this.scene.cameras.main;this.bgSpaceBack.setTilePosition(.001*e,.001*t),this.bgSpaceMid.setTilePosition(.0025*e,.0025*t),this.bgLandscapeMountains.setTilePosition(.025*e,0),this.bgLandscapeHills.setTilePosition(.035*e,0),R.end("backdrop")}registerLayer(e,t=1,s=1){const{width:i,height:a,zoomX:n,zoomY:o,worldView:r}=this.scene.cameras.main;return this.scene.add.tileSprite(r.x+i/2,r.y+a/2,i,a,e).setOrigin(.5,.5).setScrollFactor(0,0).setScale(t*(1/n),s*(1/o))}}class m extends i.Scene{constructor(){super({key:"GameScene"}),this.observer=new i.Events.EventEmitter}create(){this.cameras.main.setDeadzone(50,125),this.cameras.main.setBackgroundColor(0);const e=this.game.canvas.width===w?1:.5;this.cameras.main.setZoom(.8*e,.8*e),this.b2Physics=new g(this,15,new n.b2Vec2(0,10)),this.backdrop=new p(this),this.wickedSnowman=new d(this,this.b2Physics),this.terrainSimple=new h(this,this.b2Physics),this.cameras.main.startFollow(this.wickedSnowman.parts.body.GetUserData(),!1,.8,.25),this.cameras.main.followOffset.set(-375,0);const t=this.cameras.main.worldView.x+this.cameras.main.width/2,s=this.cameras.main.worldView.y+this.cameras.main.height/2;this.add.bitmapText(t+50,s-200,"atari-classic","WICKED SNOWMAN").setScrollFactor(.35).setFontSize(40).setOrigin(.5),this.add.bitmapText(t+50,s-100,"atari-classic","Don't lose your head").setScrollFactor(.35).setFontSize(25).setOrigin(.5),this.scene.launch("UIScene",[this.observer,this.restartGame.bind(this)]),this.observer.on("enter-crashed",(()=>{this.cameras.main.shake(200,.01),this.b2Physics.enterBulletTime(-1,.4)}));const i=new n.b2AreaJointDef;for(let e=0;e<20;++e){const t=2*e*Math.PI/20,s=this.b2Physics.createCircle(180*Math.cos(t)-200,180*Math.sin(t)-200,t,45,{density:1,linearDamping:.3,fixedRotation:!1,friction:1,type:n.b2BodyType.b2_dynamicBody});i.AddBody(s)}n.b2LinearStiffness(i,1,.1,i.bodyA,i.bodyB);const a=this.b2Physics.world.CreateJoint(i);setInterval((()=>{a.m_bodies.forEach((e=>e.ApplyForceToCenter({x:9,y:0})))}),20)}restartGame(){this.scene.restart()}update(){R.begin();const e=this.game.loop.delta/1e3;this.b2Physics.update(),this.backdrop.update(),this.wickedSnowman.update(e),this.terrainSimple.update(),R.end()}}class y{constructor(e,t,s=10,i=100){this.scene=e,this.observer=t,this.currentBoost=s,this.maxBoost=i;const a=this.scene.game.canvas.width===w?1:.5,n=32*a,o=4*a,r=this.scene.cameras.main.worldView.x+this.scene.cameras.main.width/2,h=this.scene.cameras.main.worldView.y+this.scene.cameras.main.height/2,c=this.scene.add.graphics();c.lineStyle(o,16777215),c.strokeRect(2*r-n-15-o,150*a,15*a,h);const l=this.scene.add.graphics();this.observer.on("boost-change",((e,t)=>{const s=h*(e/t);l.clear(),l.fillStyle(6710886,1),l.fillRect(2*r-n-15-o/2,150*a,15*a-o,s)}))}}class b extends i.Scene{constructor(){super({key:"UIScene"})}init([e,t]){this.observer=e,this.restartGame=t}create(){this.cameras.main.setRoundPixels(!0);const e=this.game.canvas.width===w?1:.5,t=20*e,s=18*e,i=24*e,a=4*e;this.music=this.sound.add("theme"),this.music.play({loop:!0,volume:.2,rate:.9,delay:1.25});const n=this.cameras.main.worldView.x+this.cameras.main.width/2,o=this.cameras.main.worldView.y+this.cameras.main.height/2;this.boostBar=new y(this,this.observer,10,100),this.playAgainButton=this.add.bitmapText(n,1.5*o,"atari-classic","PLAY AGAIN?").setScrollFactor(0).setFontSize(i).setOrigin(.5).setDropShadow(1,2,2236962).setAlpha(0).setInteractive({useHandCursor:!0}).on("pointerdown",(()=>this.playAgain())).on("pointerover",(()=>this.playAgainButton.setCharacterTint(0,-1,!0,10,10,10,10))).on("pointerout",(()=>this.playAgainButton.setCharacterTint(0,-1,!1,-10,-10,-10,-10))),this.add.bitmapText(4,4,"atari-classic","DISTANCE").setScrollFactor(0,0).setFontSize(t),this.textDistance=this.add.bitmapText(1.5*a,t+2*a,"atari-classic","Distance: 0m").setScrollFactor(0,0).setFontSize(s),this.add.bitmapText(n,a,"atari-classic","COMBO").setScrollFactor(0,0).setOrigin(.5,0).setFontSize(t),this.textCombo=this.add.bitmapText(n,t+2*a,"atari-classic","-").setScrollFactor(0,0).setFontSize(s).setOrigin(.5,0),this.add.bitmapText(2*n-a,a,"atari-classic","SCORE").setScrollFactor(0,0).setOrigin(1,0).setFontSize(t),this.textScore=this.add.bitmapText(2*n-a,t+2*a,"atari-classic","0").setScrollFactor(0,0).setFontSize(s).setOrigin(1,0),this.observer.on("combo-change",((e,t)=>this.textCombo.setText(e?e+"x"+t:"-"))),this.observer.on("score-change",(e=>this.textScore.setText(e))),this.observer.on("distance-change",(e=>this.textDistance.setText(String(e)+"m"))),this.comboLeewayChart=this.add.graphics(),this.observer.on("combo-leeway-update",(t=>{this.comboLeewayChart.clear().fillStyle(16777215).slice(n,72*e,12*e,t,1.5*Math.PI).fillPath()})),this.observer.on("enter-crashed",(()=>{this.playAgainButton.setAlpha(1),this.tweens.add({targets:this.music,volume:0,detune:-500,rate:.5,duration:3e3,onComplete:e=>this.music.stop()})}))}update(){}playAgain(){this.music.stop(),this.restartGame()}}var u=s(260);const w=960,S=540,x={title:"Wicked Snowman",version:"0.4.2",type:i.WEBGL,backgroundColor:"#ffffff",disableContextMenu:!0,fps:{min:50,target:60},scale:{parent:"phaser-wrapper",mode:i.Scale.FIT,autoCenter:i.Scale.CENTER_BOTH,width:w,height:S},scene:[a,m,b]},f={autoPlace:!0,targetFPS:60,redrawInterval:200,maximumHistory:200,scale:1,memoryUpdateInterval:100,memoryMaxHistory:600,FONT_FAMILY:"Arial",COLOR_FPS_BAR:"#34cfa2",COLOR_FPS_AVG:"#FFF",COLOR_TEXT_LABEL:"#FFF",COLOR_TEXT_TO_LOW:"#eee207",COLOR_TEXT_BAD:"#d34646",COLOR_TEXT_TARGET:"#d249dd",COLOR_BG:"#333333"};let R;window.addEventListener("load",(()=>{new i.Game(x),R=new u.Z(f),document.body.appendChild(R.dom)}))}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var n=s[e]={exports:{}};return t[e].call(n.exports,n,n.exports,i),n.exports}i.m=t,e=[],i.O=(t,s,a,n)=>{if(!s){var o=1/0;for(l=0;l<e.length;l++){for(var[s,a,n]=e[l],r=!0,h=0;h<s.length;h++)(!1&n||o>=n)&&Object.keys(i.O).every((e=>i.O[e](s[h])))?s.splice(h--,1):(r=!1,n<o&&(o=n));if(r){e.splice(l--,1);var c=a();void 0!==c&&(t=c)}}return t}n=n||0;for(var l=e.length;l>0&&e[l-1][2]>n;l--)e[l]=e[l-1];e[l]=[s,a,n]},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.e=()=>Promise.resolve(),i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,n,[o,r,h]=s,c=0;if(o.some((t=>0!==e[t]))){for(a in r)i.o(r,a)&&(i.m[a]=r[a]);if(h)var l=h(i)}for(t&&t(s);c<o.length;c++)n=o[c],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(l)},s=self.webpackChunkwicked_snowman=self.webpackChunkwicked_snowman||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[216],(()=>i(410)));a=i.O(a)})();