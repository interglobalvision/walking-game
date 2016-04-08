Compass={$blackout:$("#blackout"),$radar:$("#radar"),$angle:$("#angle"),$mapStage:$(".map-stage"),$compass:$("#compass"),$mapFloor:$(".map-floor"),$compassContainer:$("#compass-container"),$mapGoal:$("#map-goal"),$mapSky:$(".map-sky"),$mapGoalContainer:$("#map-goal-container"),$mapOrientation:$(".map-orientation"),watchId:{orientation:null,position:null},origin:{lat:null,lng:null},destiny:{lat:null,lng:null},position:{lat:null,lng:null},/*
    minDistance: 0.0025, // in radians
    maxDistance: 0.006, // in radians
  */
minDistance:.0025,// in radians
maxDistance:.0028,// in radians
destinyThresholdRadius:.3,// in Km
totalDistance:0,/*
   * Return distance between two geographical points in Kilometers
   *
   */
getDistanceInKm:function(pointA,pointB){var _this=this,R=6371,dLat=_this.deg2rad(pointB.lat-pointA.lat),dLon=_this.deg2rad(pointB.lng-pointA.lng),a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(_this.deg2rad(pointA.lat))*Math.cos(_this.deg2rad(pointB.lat))*Math.sin(dLon/2)*Math.sin(dLon/2),c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)),d=R*c;// Distance in km
return d},/*
   * Convert radians to degrees
   *
   */
rad2deg:function(rad){return 57.29577951308232*rad},/*
   * Convert degrees to radians
   *
   */
deg2rad:function(deg){return deg*(Math.PI/180)},/*
   * Return a random number in the range of:
   * -max < x <  -min
   *  min < x < max
   *
   */
getRandomDistance:function(min,max){
// Positive or negative?
var way=Math.random()>=.5,distance=Math.random()*(max-min)+min;return way&&(distance=-1*distance),distance},/*
   * Calculates the angle ABC (in radians)
   *
   * A first point
   * C second point
   * B center point
   *
   * It always return the smallest angle, so angle is always < 180deg
   *
   */
getAngle:function(pointA,pointB,pointC){var _this=this,AB=Math.sqrt(Math.pow(pointB.lng-pointA.lng,2)+Math.pow(pointB.lat-pointA.lat,2)),BC=Math.sqrt(Math.pow(pointB.lng-pointC.lng,2)+Math.pow(pointB.lat-pointC.lat,2)),AC=Math.sqrt(Math.pow(pointC.lng-pointA.lng,2)+Math.pow(pointC.lat-pointA.lat,2));return _this.rad2deg(Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB)))},/*
   * Update players geographical position
   *
   */
updatePosition:function(position){var _this=this;
// Update players position
_this.position=position,
// Update north reference
_this.reference={lat:position.lat+_this.minDistance,lng:position.lng};
// Check distance in Km between position and destiny
var distanceToDestiny=_this.getDistanceInKm(_this.position,_this.destiny),distanceFromGoal=100*(distanceToDestiny-_this.destinyThresholdRadius)/_this.totalDistance,progressToGoal=100-distanceFromGoal,mapFloorPos=.75*progressToGoal,mapGoalScale=.01*progressToGoal;
// if mapFloorPos is less than 0, we set it to 0
// this keeps the floor from sliding off screen
0>mapFloorPos&&(mapFloorPos=0),
// if mapGoalScale is less than 0.01, we set it to 0.01
// goal object from disappearing entirely or going negative scale
.01>mapGoalScale&&(mapGoalScale=.01),_this.$mapFloor.css({"-webkit-transform":"translateY("+mapFloorPos+"%)",transform:"translateY("+mapFloorPos+"%)"}),_this.$mapGoal.css({"-webkit-transform":"scale("+mapGoalScale+")",transform:"scale("+mapGoalScale+")"}),distanceToDestiny<_this.destinyThresholdRadius&&_this.stop()},updateOrientation:function(orientation){var _this=this,northOrientation=-1*orientation,compensationAngle=_this.getAngle(_this.reference,_this.position,_this.destiny);
// If destiny is at West of origin
_this.position.lng>_this.destiny.lng&&(compensationAngle=360-compensationAngle);var angle=compensationAngle+northOrientation;
// All the following alculations are based on a
// the angle from 0 - 360, so we add 360 if the angle
// is negative.
0>angle&&(angle+=360);
// Here we save the angle in a new variable to use for
// the goal positioning.
var goalAngle=angle;
// We make that new angle from -180 - 180, because CSS
// translateX transform will need a pos or neg value
// to move the element left and right of center.
angle>180&&(goalAngle=angle-360);
// When the compass is pointed 70deg (+ or -) from 0 (top),
// the arrow points offscreen.  So we get a percent of 70
// to position the goal object with the arrow
var goalPos=goalAngle/.7;
// If the flag is offscreen, we don't move it
goalPos>75?goalPos=75:-75>goalPos&&(goalPos=-75);
// for the scene we want a value from -25% - 25% to translate
// left or right of center.  180 / 25 = 7.2
var scenePos=angle/7.2;angle>180&&(scenePos=(angle-180)/7.2-25),_this.$mapGoalContainer.css({"-webkit-transform":"translateX("+goalPos+"%)",transform:"translateX("+goalPos+"%)"}),_this.$mapOrientation.css({"-webkit-transform":"translateX("+scenePos+"%)",transform:"translateX("+scenePos+"%)"}),_this.$compass.css({"-webkit-transform":"rotate("+angle+"deg)",transform:"rotate("+angle+"deg)"})},skyColor:function(){var _this=this,now=new Date;if(now){var skyColor,hour=now.getHours();skyColor=hour>4&&10>hour?"rgb(100, 160, 255)":hour>9&&17>hour?"rgb(0, 120, 255)":hour>16&&22>hour?"rgb(10, 40, 95)":"rgb(0, 20, 60)",_this.$mapSky.css("background-color",skyColor)}},/*
   * Sets map theme graphics
   *
   */
mapTheme:function(){var _this=this;_this.$mapStage.addClass("world-"+Game.getWorld())},/*
   * Bind navigator.gelocation and deviceorientation events
   *
   */
startGeoWatchers:function(){var _this=this;
// Start geolocation watch
_this.watchId.position=navigator.geolocation.watchPosition(function(position){_this.updatePosition({lat:position.coords.latitude,lng:position.coords.longitude})},function(error){alert(error)},{enableHighAccuracy:!0}),
// Start orientation compass
// if cordova
navigator.userAgent.match(/(iPhone|iPod|Android)/)?_this.watchId.orientation=navigator.compass.watchHeading(function(heading){_this.updateOrientation(heading.magneticHeading)}):$(window).bind("deviceorientation.compassOrientation",function(){
// dont parse event as function variable as breaks scope
_this.updateOrientation(event.alpha)})},/*
   * Ubind navigator.gelocation and deviceorientation events
   *
   */
stopGeoWatchers:function(){var _this=this;navigator.geolocation.clearWatch(_this.watchId.position),navigator.compass.clearWatch(_this.watchId.orientation)},stop:function(){var _this=this;_this.stopGeoWatchers(),$(window).unbind(".compassOrientation"),Game.nextMinigame()},init:function(){var _this=this;
// Check for geolocation and orientation availability
navigator.geolocation&&window.DeviceOrientationEvent?
// Set initial positions: origin, destiny, position
navigator.geolocation.getCurrentPosition(function(position){var pos=position.coords;
// Set Origin location
_this.origin.lat=pos.latitude,_this.origin.lng=pos.longitude,
// Generate random destiny
_this.destiny.lat=pos.latitude+_this.getRandomDistance(_this.minDistance,_this.maxDistance),_this.destiny.lng=pos.longitude+_this.getRandomDistance(_this.minDistance,_this.maxDistance),
// Set total distance
_this.totalDistance=_this.getDistanceInKm({lat:pos.latitude,lng:pos.longitude},_this.destiny)-_this.destinyThresholdRadius,
// Set current position
_this.updatePosition({lat:pos.latitude,lng:pos.longitude}),
// Set sky color
_this.skyColor(),
// Set map theme graphics
_this.mapTheme(),
// Start orientation and position watchers
_this.startGeoWatchers(),
// Fade in map
_this.$blackout.animate({opacity:0},1e3,"linear")}):WalkingError.unsupportedGPS()}},WalkingError={unsupportedCompensation:1e3,
// most basic not sure if useful
"throw":function(log,message){console.log(log),alert(message)},
// most likely usecase
unsupported:function(tech){var _this=this;tech||(tech="the required technology"),console.log(tech+" is unsupported on this device"),alert("Sorry "+Game.getUsername()+", but your device does not support "+tech+"!! But I will give you a consolation prize... Here's "+_this.unsupportedCompensation+" points. Now get outta here!"),Game.gameComplete(_this.unsupportedCompensation)},
// perhaps this is only likely to happen if a user says no to GPS
unsupportedGPS:function(){console.log("Fuck. No GPS"),alert("Sorry "+Game.getUsername()+", but your device does not support GPS or you have denied the app access to your location. You can't go walking if I don't know where you are. Open the Walking Game settings on your device and allow location access!!")}},Game={minigames:["tippyswitch","math","supertap","reset","colorsnap","vibeystopper","jankenpon","wordltraveler"],worlds:["Desert","City","Arctic","Jungle"],gameAttempts:2,shareTitle:function(score){return"WOOAAAAHH! U HAVE AN AWESOME SCORe 0F "+score+" POIIINTSSS BRAAAHHH"},shareSubject:"Subject: I did this on Walking Game. The most tiring phone game ever made",shareUrl:"http://interglobal.vision/",
// USER
createUser:function(username,callback){var _this=this;window.localStorage.setItem("username",username),window.localStorage.setItem("points",0),window.localStorage.setItem("gems",0),window.localStorage.setItem("progress",0),window.localStorage.setItem("loops",0),window.localStorage.setItem("world",0),window.localStorage.setItem("rank",_this.setRank()),_this.setupLoop(),callback()},getUsername:function(){return window.localStorage.getItem("username")},
// GAME STATE
setupLoop:function(){var _this=this;console.log("Setting up loop"),_this.setProgress(0),_this.setLoopOrder(Utilities.Misc.shuffleArray(_this.minigames))},getProgress:function(){var progress=parseInt(window.localStorage.getItem("progress"));return(null===progress||isNaN(progress))&&(progress=0),progress},setProgress:function(progress){window.localStorage.setItem("progress",progress)},getProgressPercent:function(){var _this=this,currentProgress=_this.getProgress();return currentProgress/this.minigames.length},getLoops:function(){var loops=parseInt(window.localStorage.getItem("loops"));return(null===loops||isNaN(loops))&&(loops=0),loops},setLoops:function(loops){window.localStorage.setItem("loops",loops)},setLoopOrder:function(loopOrder){window.localStorage.setItem("loopOrder",loopOrder)},getLoopOrder:function(){var loopOrder=window.localStorage.getItem("loopOrder");return loopOrder?loopOrder.split(","):[]},nextMinigame:function(){var _this=this,currentProgress=_this.getProgress(),gameOrder=_this.getLoopOrder();console.log("Loading next minigame"),console.log("Current progress index",currentProgress),console.log("Game to load",gameOrder[currentProgress]),Router.go("/games/"+gameOrder[currentProgress]+"/")},finishLoop:function(){var _this=this,currentLoops=_this.getLoops();_this.getWorld();console.log("Finished loop"),
// perhaps a lot more needs to happen here. This is probably where the narrative should happen. But this could be a different route just for animation. Would then need to if/else in gameComplete when checking if last game in loop
_this.setLoops(currentLoops+1),_this.nextWorld(),console.log("Loops so far",currentLoops),_this.setupLoop()},
// WORLD
nextWorld:function(){var _this=this,current=_this.getWorld(),next=current+1;next===_this.worlds.length?window.localStorage.setItem("world",0):window.localStorage.setItem("world",next)},getWorld:function(){return parseInt(window.localStorage.getItem("world"))},getWorldName:function(){var _this=this,worldNum=_this.getWorld();return _this.worlds[worldNum]},
// RANK
setRank:function(){return Utilities.Word.getAdj(!0,!0)+" "+Utilities.Word.getNoun(!1,!0)},getRank:function(){return window.localStorage.getItem("rank")},
// MINI GAME
gameFail:function(tryAgainCallback,failCallback){var _this=this;_this.gameAttempts>1?(_this.gameAttempts--,tryAgainCallback()):failCallback()},gameComplete:function(points){var _this=this,currentProgress=_this.getProgress();_this.setProgress(currentProgress+1),points&&_this.setNewPoints(points),currentProgress+1===_this.minigames.length&&_this.finishLoop(),Router.go("/pages/compass/")},
// POINTS
getPoints:function(){var points=parseInt(window.localStorage.getItem("points"));return(null===points||isNaN(points))&&(points=0),points},setPoints:function(points){window.localStorage.setItem("points",points)},setNewPoints:function(points){var _this=this,points=parseInt(points),currentPoints=_this.getPoints(),currentGems=_this.getGems();if(points>0){var modifier=Math.log(currentGems+1)+1,modifiedPoints=Math.round(points*modifier);_this.setPoints(currentPoints+modifiedPoints)}else _this.setPoints(currentPoints+points)},resetPoints:function(){var _this=this;_this.setPoints(0)},
// GEMS
getGems:function(){var gems=parseInt(window.localStorage.getItem("gems"));return(null===gems||isNaN(gems))&&(gems=0),gems},setGems:function(gems){window.localStorage.setItem("gems",gems)},setNewGems:function(gems){var _this=this,gems=parseInt(gems),currentGems=_this.getGems();_this.setGems(currentGems+gems)},
// SOCIAL SHARING
shareWithOptions:function(){var _this=this,score=_this.getPoints();window.plugins.socialsharing.share(_this.shareTitle(score),_this.shareSubject,"http://puu.sh/mTFtM/242a0fa967.png",_this.shareUrl,function(){console.log("share ok")},function(errorMessage){console.log("share failed"),console.log(errorMessage),alert("something went wrong")})}};/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app={
// Application Constructor
initialize:function(){this.bindEvents()},
// Bind Event Listeners
//
// Bind any events that are required on startup. Common events are:
// 'load', 'deviceready', 'offline', and 'online'.
bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1),document.addEventListener("DOMContentLoaded",this.onContentLoaded,!1),document.addEventListener("backbutton",this.onBackKeyDown,!1)},
// deviceready Event Handler
//
// The scope of 'this' is the event. In order to call the 'receivedEvent'
// function, we must explicitly call 'app.receivedEvent(...);'
onDeviceReady:function(){app.receivedEvent("deviceready")},onContentLoaded:function(){FastClick.attach(document.body)},onBackKeyDown:function(){return!0},
// Update DOM on a Received Event
receivedEvent:function(id){console.log("Received Event: "+id),$("#game-username").html(Game.getUsername()),$("#game-points").html(Game.getPoints()),$("#game-gems").html(Game.getGems()),$("#game-progress").html(Game.getProgressPercent())}};app.initialize(),Utilities={},Menu={$blackout:$("#blackout"),$menuBubble:$("#map-menu-bubble"),$menuButton:$("#map-menu-button"),$menuPoints:$("#menu-points"),$menuRank:$("#menu-rank"),$menuWorld:$("#menu-world"),$buttonShare:$('[data-ref="menu-share"]'),$buttonSub:$(".toggle-sub"),$buttonBack:$(".menu-back"),howtoGreeting:"<p>dear "+Game.getUsername()+",</p>",
// Dev controls
$devMenu:$('[data-ref="dev-menu"]'),$devEnd:$('[data-ref="dev-end-map"]'),toggleMenu:function(){var _this=this;_this.closeSubMenu(),_this.$menuBubble.toggle("fast")},init:function(){var _this=this;_this.$menuPoints.html(Game.getPoints()),_this.$menuWorld.html(Game.getWorldName()),_this.$menuRank.html(Game.getRank()),$(".howto-text").prepend(_this.howtoGreeting),_this.$menuButton.on("click",function(){_this.toggleMenu()}),_this.$buttonShare.on("click",function(event){event.preventDefault(),Game.shareWithOptions()}),_this.$buttonSub.on("click",function(event){event.preventDefault(),_this.openSubMenu($(this).attr("data-ref"))}),_this.$buttonBack.on("click",function(event){event.preventDefault(),_this.closeSubMenu()}),
// Dev control click events
_this.$devMenu.on("click",function(event){event.preventDefault(),Router.go("/pages/dev/")}),_this.$devEnd.on("click",function(event){event.preventDefault(),Compass.stop()})},openSubMenu:function(menu){$("#menu-main").addClass("show-sub-menu"),$("#"+menu).addClass("show-sub-menu")},closeSubMenu:function(){$("#menu-main").removeClass("show-sub-menu"),$(".sub-menu").removeClass("show-sub-menu")}},Router={init:function(){var _this=this,regex=/(.+?(?:www))/;_this.basePath=regex.exec(window.location.href),"browser"===window.cordova.platformId?_this.isBrowser=!0:_this.isBrowser=!1},go:function(url){var _this=this;_this.isBrowser?window.location=url:window.location=_this.basePath[0]+url+"index.html"}},Router.init(),Utilities.Color={isNeighborColor:function(color1,color2,tolerance){return void 0==tolerance&&(tolerance=32),Math.abs(color1[0]-color2[0])<=tolerance&&Math.abs(color1[1]-color2[1])<=tolerance&&Math.abs(color1[2]-color2[2])<=tolerance},hslToRgb:function(h,s,l){var r,g,b;if(0==s)r=g=b=l;else{var hue2rgb=function(p,q,t){return 0>t&&(t+=1),t>1&&(t-=1),1/6>t?p+6*(q-p)*t:.5>t?q:2/3>t?p+(q-p)*(2/3-t)*6:p},q=.5>l?l*(1+s):l+s-l*s,p=2*l-q;r=hue2rgb(p,q,h+1/3),g=hue2rgb(p,q,h),b=hue2rgb(p,q,h-1/3)}return[Math.round(255*r),Math.round(255*g),Math.round(255*b)]}},Utilities.Dialog={$target:$(".text-box-dialog"),$parent:$("#dialog"),$skip:void 0,interval:33,arrayIndex:0,lineIndex:0,lineTimer:0,outputText:"",read:function(dialogArray,callback){var _this=this;_this.$parent=$("#dialog"),_this.$target=$(".text-box-dialog"),_this.dialogArray=dialogArray,_this.arrayIndex=0,_this.callback=callback,_this.$parent.show(),_this.$parent.append('<div id="dialog-skip"></div>'),_this.$skip=$("#dialog-skip"),_this.$skip.off("click.dialogRead").on({"click.dialogRead":function(){_this.lineTimer>0?_this.skipLine():_this.arrayIndex===_this.dialogArray.length-1?_this.finish():(_this.arrayIndex++,_this.readLine())}}),_this.readLine()},readLine:function(){var _this=this,dialogLine=_this.dialogArray[_this.arrayIndex];_this.lineIndex=0,_this.$target.html(""),_this.outputText="",_this.lineTimer=setInterval(function(){_this.lineIndex<dialogLine.length?(_this.outputText+=dialogLine[_this.lineIndex],_this.$target[0].innerHTML=_this.outputText,_this.lineIndex++):(_this.clearLineInterval(),_this.$target.append('<a class="text-box-next">&rarr;</a>'))},_this.interval)},clearLineInterval:function(){var _this=this;clearInterval(_this.lineTimer),_this.lineTimer=0},skipLine:function(){var _this=this;_this.clearLineInterval(),_this.$target.html(_this.dialogArray[_this.arrayIndex]),_this.$target.append('<a class="text-box-next">&rarr;</a>')},finish:function(){var _this=this;_this.$parent.hide(),_this.$target.html(""),_this.$skip.remove(),_this.callback()}},Utilities.Misc={shuffleArray:function(array){
// While there are elements in the array
for(var temp,index,counter=array.length;counter>0;)index=Math.floor(Math.random()*counter),counter--,temp=array[counter],array[counter]=array[index],array[index]=temp;return array}},Utilities.Number={getRandomInt:function(min,max){return Math.floor(Math.random()*(max-min+1))+min},roundFloat:function(number){
// this is how to round to 3 decimal places in js lmao
return number=1e3*(number+1e-5),number=Math.floor(number),number/=1e3}},Utilities.Word={adjs:[],nouns:[],init:function(adjsList,nounList){var _this=this;_this.adjs=adjsList,_this.nouns=nounList},/**
   * Returns a word from the lists
   * @param {string} kind Defines what kind of word return (adj|noun)
   * @param {bool} indefinite Defines if it should append an indefinite article
   */
getWord:function(kind,indefinite,capitalize){var _this=this,list="adj"==kind?_this.adjs:_this.nouns,word=list[Math.floor(Math.random()*list.length)];return capitalize&&(word=word.charAt(0).toUpperCase()+word.slice(1)),indefinite&&(word=_this.isVowel(word[0])?"an "+word:"a "+word),word},getAdj:function(indefinite,capitalize){var _this=this;return _this.getWord("adj",indefinite,capitalize)},getNoun:function(indefinite,capitalize){var _this=this;return _this.getWord("noun",indefinite,capitalize)},isVowel:function(character){return/[aeiouAEIOU]/.test(character)}},Utilities.Word.init(Adjs,Nouns);
//# sourceMappingURL=index.js.map
