(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var window, module;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/infinitedg:gsap/header.js                                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
window = { console: console };                                                                                         // 1
module = {                                                                                                             // 2
	exports: {}                                                                                                           // 3
};                                                                                                                     // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/infinitedg:gsap/vendor/TweenMax_server.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * VERSION: 1.16.0                                                                                                     // 2
 * DATE: 2015-03-01                                                                                                    // 3
 * UPDATES AND DOCS AT: http://greensock.com                                                                           // 4
 *                                                                                                                     // 5
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *                                                                                                                     // 7
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.                                                   // 8
 * This work is subject to the terms at http://greensock.com/standard-license or for                                   // 9
 * Club GreenSock members, the software agreement that was issued with your membership.                                // 10
 *                                                                                                                     // 11
 * @author: Jack Doyle, jack@greensock.com                                                                             // 12
 **/                                                                                                                   // 13
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {                                                     // 15
                                                                                                                       // 16
	"use strict";                                                                                                         // 17
                                                                                                                       // 18
	_gsScope._gsDefine("TweenMax", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
                                                                                                                       // 20
		var _slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],                                                                                                        // 22
					l = a.length,                                                                                                     // 23
					i;                                                                                                                // 24
				for (i = 0; i !== l; b.push(a[i++]));                                                                              // 25
				return b;                                                                                                          // 26
			},                                                                                                                  // 27
			TweenMax = function(target, duration, vars) {                                                                       // 28
				TweenLite.call(this, target, duration, vars);                                                                      // 29
				this._cycle = 0;                                                                                                   // 30
				this._yoyo = (this.vars.yoyo === true);                                                                            // 31
				this._repeat = this.vars.repeat || 0;                                                                              // 32
				this._repeatDelay = this.vars.repeatDelay || 0;                                                                    // 33
				this._dirty = true; //ensures that if there is any repeat, the totalDuration will get recalculated to accurately report it.
				this.render = TweenMax.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)        // 35
			},                                                                                                                  // 36
			_tinyNum = 0.0000000001,                                                                                            // 37
			TweenLiteInternals = TweenLite._internals,                                                                          // 38
			_isSelector = TweenLiteInternals.isSelector,                                                                        // 39
			_isArray = TweenLiteInternals.isArray,                                                                              // 40
			p = TweenMax.prototype = TweenLite.to({}, 0.1, {}),                                                                 // 41
			_blankArray = [];                                                                                                   // 42
                                                                                                                       // 43
		TweenMax.version = "1.16.0";                                                                                         // 44
		p.constructor = TweenMax;                                                                                            // 45
		p.kill()._gc = false;                                                                                                // 46
		TweenMax.killTweensOf = TweenMax.killDelayedCallsTo = TweenLite.killTweensOf;                                        // 47
		TweenMax.getTweensOf = TweenLite.getTweensOf;                                                                        // 48
		TweenMax.lagSmoothing = TweenLite.lagSmoothing;                                                                      // 49
		TweenMax.ticker = TweenLite.ticker;                                                                                  // 50
		TweenMax.render = TweenLite.render;                                                                                  // 51
                                                                                                                       // 52
		p.invalidate = function() {                                                                                          // 53
			this._yoyo = (this.vars.yoyo === true);                                                                             // 54
			this._repeat = this.vars.repeat || 0;                                                                               // 55
			this._repeatDelay = this.vars.repeatDelay || 0;                                                                     // 56
			this._uncache(true);                                                                                                // 57
			return TweenLite.prototype.invalidate.call(this);                                                                   // 58
		};                                                                                                                   // 59
		                                                                                                                     // 60
		p.updateTo = function(vars, resetDuration) {                                                                         // 61
			var curRatio = this.ratio,                                                                                          // 62
				immediate = this.vars.immediateRender || vars.immediateRender,                                                     // 63
				p;                                                                                                                 // 64
			if (resetDuration && this._startTime < this._timeline._time) {                                                      // 65
				this._startTime = this._timeline._time;                                                                            // 66
				this._uncache(false);                                                                                              // 67
				if (this._gc) {                                                                                                    // 68
					this._enabled(true, false);                                                                                       // 69
				} else {                                                                                                           // 70
					this._timeline.insert(this, this._startTime - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}                                                                                                                  // 72
			}                                                                                                                   // 73
			for (p in vars) {                                                                                                   // 74
				this.vars[p] = vars[p];                                                                                            // 75
			}                                                                                                                   // 76
			if (this._initted || immediate) {                                                                                   // 77
				if (resetDuration) {                                                                                               // 78
					this._initted = false;                                                                                            // 79
					if (immediate) {                                                                                                  // 80
						this.render(0, true, true);                                                                                      // 81
					}                                                                                                                 // 82
				} else {                                                                                                           // 83
					if (this._gc) {                                                                                                   // 84
						this._enabled(true, false);                                                                                      // 85
					}                                                                                                                 // 86
					if (this._notifyPluginsOfEnabled && this._firstPT) {                                                              // 87
						TweenLite._onPluginEvent("_onDisable", this); //in case a plugin like MotionBlur must perform some cleanup tasks // 88
					}                                                                                                                 // 89
					if (this._time / this._duration > 0.998) { //if the tween has finished (or come extremely close to finishing), we just need to rewind it to 0 and then render it again at the end which forces it to re-initialize (parsing the new vars). We allow tweens that are close to finishing (but haven't quite finished) to work this way too because otherwise, the values are so small when determining where to project the starting values that binary math issues creep in and can make the tween appear to render incorrectly when run backwards. 
						var prevTime = this._time;                                                                                       // 91
						this.render(0, true, false);                                                                                     // 92
						this._initted = false;                                                                                           // 93
						this.render(prevTime, true, false);                                                                              // 94
					} else if (this._time > 0 || immediate) {                                                                         // 95
						this._initted = false;                                                                                           // 96
						this._init();                                                                                                    // 97
						var inv = 1 / (1 - curRatio),                                                                                    // 98
							pt = this._firstPT, endValue;                                                                                   // 99
						while (pt) {                                                                                                     // 100
							endValue = pt.s + pt.c;                                                                                         // 101
							pt.c *= inv;                                                                                                    // 102
							pt.s = endValue - pt.c;                                                                                         // 103
							pt = pt._next;                                                                                                  // 104
						}                                                                                                                // 105
					}                                                                                                                 // 106
				}                                                                                                                  // 107
			}                                                                                                                   // 108
			return this;                                                                                                        // 109
		};                                                                                                                   // 110
				                                                                                                                   // 111
		p.render = function(time, suppressEvents, force) {                                                                   // 112
			if (!this._initted) if (this._duration === 0 && this.vars.repeat) { //zero duration tweens that render immediately have render() called from TweenLite's constructor, before TweenMax's constructor has finished setting _repeat, _repeatDelay, and _yoyo which are critical in determining totalDuration() so we need to call invalidate() which is a low-kb way to get those set properly.
				this.invalidate();                                                                                                 // 114
			}                                                                                                                   // 115
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),                                         // 116
				prevTime = this._time,                                                                                             // 117
				prevTotalTime = this._totalTime,                                                                                   // 118
				prevCycle = this._cycle,                                                                                           // 119
				duration = this._duration,                                                                                         // 120
				prevRawPrevTime = this._rawPrevTime,                                                                               // 121
				isComplete, callback, pt, cycleDuration, r, type, pow, rawPrevTime, i;                                             // 122
			if (time >= totalDur) {                                                                                             // 123
				this._totalTime = totalDur;                                                                                        // 124
				this._cycle = this._repeat;                                                                                        // 125
				if (this._yoyo && (this._cycle & 1) !== 0) {                                                                       // 126
					this._time = 0;                                                                                                   // 127
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;                                                    // 128
				} else {                                                                                                           // 129
					this._time = duration;                                                                                            // 130
					this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;                                                    // 131
				}                                                                                                                  // 132
				if (!this._reversed) {                                                                                             // 133
					isComplete = true;                                                                                                // 134
					callback = "onComplete";                                                                                          // 135
				}                                                                                                                  // 136
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;                                                                                                        // 139
					}                                                                                                                 // 140
					if (time === 0 || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time) {            // 141
						force = true;                                                                                                    // 142
						if (prevRawPrevTime > _tinyNum) {                                                                                // 143
							callback = "onReverseComplete";                                                                                 // 144
						}                                                                                                                // 145
					}                                                                                                                 // 146
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}                                                                                                                  // 148
				                                                                                                                   // 149
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = this._cycle = 0;                                                                    // 151
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;                                                     // 152
				if (prevTotalTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {                                              // 153
					callback = "onReverseComplete";                                                                                   // 154
					isComplete = this._reversed;                                                                                      // 155
				}                                                                                                                  // 156
				if (time < 0) {                                                                                                    // 157
					this._active = false;                                                                                             // 158
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0) {                                                                                      // 160
							force = true;                                                                                                   // 161
						}                                                                                                                // 162
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}                                                                                                                 // 164
				}                                                                                                                  // 165
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;                                                                                                     // 167
				}                                                                                                                  // 168
			} else {                                                                                                            // 169
				this._totalTime = this._time = time;                                                                               // 170
				                                                                                                                   // 171
				if (this._repeat !== 0) {                                                                                          // 172
					cycleDuration = duration + this._repeatDelay;                                                                     // 173
					this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but Flash reports it as 0.79999999!)
					if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {                                     // 175
						this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
					}                                                                                                                 // 177
					this._time = this._totalTime - (this._cycle * cycleDuration);                                                     // 178
					if (this._yoyo) if ((this._cycle & 1) !== 0) {                                                                    // 179
						this._time = duration - this._time;                                                                              // 180
					}                                                                                                                 // 181
					if (this._time > duration) {                                                                                      // 182
						this._time = duration;                                                                                           // 183
					} else if (this._time < 0) {                                                                                      // 184
						this._time = 0;                                                                                                  // 185
					}                                                                                                                 // 186
				}                                                                                                                  // 187
                                                                                                                       // 188
				if (this._easeType) {                                                                                              // 189
					r = this._time / duration;                                                                                        // 190
					type = this._easeType;                                                                                            // 191
					pow = this._easePower;                                                                                            // 192
					if (type === 1 || (type === 3 && r >= 0.5)) {                                                                     // 193
						r = 1 - r;                                                                                                       // 194
					}                                                                                                                 // 195
					if (type === 3) {                                                                                                 // 196
						r *= 2;                                                                                                          // 197
					}                                                                                                                 // 198
					if (pow === 1) {                                                                                                  // 199
						r *= r;                                                                                                          // 200
					} else if (pow === 2) {                                                                                           // 201
						r *= r * r;                                                                                                      // 202
					} else if (pow === 3) {                                                                                           // 203
						r *= r * r * r;                                                                                                  // 204
					} else if (pow === 4) {                                                                                           // 205
						r *= r * r * r * r;                                                                                              // 206
					}                                                                                                                 // 207
                                                                                                                       // 208
					if (type === 1) {                                                                                                 // 209
						this.ratio = 1 - r;                                                                                              // 210
					} else if (type === 2) {                                                                                          // 211
						this.ratio = r;                                                                                                  // 212
					} else if (this._time / duration < 0.5) {                                                                         // 213
						this.ratio = r / 2;                                                                                              // 214
					} else {                                                                                                          // 215
						this.ratio = 1 - (r / 2);                                                                                        // 216
					}                                                                                                                 // 217
                                                                                                                       // 218
				} else {                                                                                                           // 219
					this.ratio = this._ease.getRatio(this._time / duration);                                                          // 220
				}                                                                                                                  // 221
				                                                                                                                   // 222
			}                                                                                                                   // 223
				                                                                                                                   // 224
			if (prevTime === this._time && !force && prevCycle === this._cycle) {                                               // 225
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                   // 227
				}                                                                                                                  // 228
				return;                                                                                                            // 229
			} else if (!this._initted) {                                                                                        // 230
				this._init();                                                                                                      // 231
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;                                                                                                           // 233
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) { //we stick it in the queue for rendering at the very end of the tick - this is a performance optimization because browsers invalidate styles and force a recalculation if you read, write, and then read style data (so it's better to read/read/read/write/write/write than read/write/read/write/read/write). The down side, of course, is that usually you WANT things to render immediately because you may have code running right after that which depends on the change. Like imagine running TweenLite.set(...) and then immediately after that, creating a nother tween that animates the same property to another value; the starting values of that 2nd tween wouldn't be accurate if lazy is true.
					this._time = prevTime;                                                                                            // 235
					this._totalTime = prevTotalTime;                                                                                  // 236
					this._rawPrevTime = prevRawPrevTime;                                                                              // 237
					this._cycle = prevCycle;                                                                                          // 238
					TweenLiteInternals.lazyTweens.push(this);                                                                         // 239
					this._lazy = [time, suppressEvents];                                                                              // 240
					return;                                                                                                           // 241
				}                                                                                                                  // 242
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {                                                                                   // 244
					this.ratio = this._ease.getRatio(this._time / duration);                                                          // 245
				} else if (isComplete && this._ease._calcEnd) {                                                                    // 246
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);                                                     // 247
				}                                                                                                                  // 248
			}                                                                                                                   // 249
			if (this._lazy !== false) {                                                                                         // 250
				this._lazy = false;                                                                                                // 251
			}                                                                                                                   // 252
                                                                                                                       // 253
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {                                     // 254
				this._active = true; //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}                                                                                                                   // 256
			if (prevTotalTime === 0) {                                                                                          // 257
				if (this._initted === 2 && time > 0) {                                                                             // 258
					//this.invalidate();                                                                                              // 259
					this._init(); //will just apply overwriting since _initted of (2) means it was a from() tween that had immediateRender:true
				}                                                                                                                  // 261
				if (this._startAt) {                                                                                               // 262
					if (time >= 0) {                                                                                                  // 263
						this._startAt.render(time, suppressEvents, force);                                                               // 264
					} else if (!callback) {                                                                                           // 265
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}                                                                                                                 // 267
				}                                                                                                                  // 268
				if (this.vars.onStart) if (this._totalTime !== 0 || duration === 0) if (!suppressEvents) {                         // 269
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);                  // 270
				}                                                                                                                  // 271
			}                                                                                                                   // 272
			                                                                                                                    // 273
			pt = this._firstPT;                                                                                                 // 274
			while (pt) {                                                                                                        // 275
				if (pt.f) {                                                                                                        // 276
					pt.t[pt.p](pt.c * this.ratio + pt.s);                                                                             // 277
				} else {                                                                                                           // 278
					pt.t[pt.p] = pt.c * this.ratio + pt.s;                                                                            // 279
				}                                                                                                                  // 280
				pt = pt._next;                                                                                                     // 281
			}                                                                                                                   // 282
			                                                                                                                    // 283
			if (this._onUpdate) {                                                                                               // 284
				if (time < 0) if (this._startAt && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}                                                                                                                  // 287
				if (!suppressEvents) if (this._totalTime !== prevTotalTime || isComplete) {                                        // 288
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                   // 289
				}                                                                                                                  // 290
			}                                                                                                                   // 291
			if (this._cycle !== prevCycle) if (!suppressEvents) if (!this._gc) if (this.vars.onRepeat) {                        // 292
				this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);                // 293
			}                                                                                                                   // 294
			if (callback) if (!this._gc || force) { //check gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && this._startTime) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force);                                                                // 297
				}                                                                                                                  // 298
				if (isComplete) {                                                                                                  // 299
					if (this._timeline.autoRemoveChildren) {                                                                          // 300
						this._enabled(false, false);                                                                                     // 301
					}                                                                                                                 // 302
					this._active = false;                                                                                             // 303
				}                                                                                                                  // 304
				if (!suppressEvents && this.vars[callback]) {                                                                      // 305
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);  // 306
				}                                                                                                                  // 307
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;                                                                                            // 309
				}                                                                                                                  // 310
			}                                                                                                                   // 311
		};                                                                                                                   // 312
		                                                                                                                     // 313
//---- STATIC FUNCTIONS -----------------------------------------------------------------------------------------------------------
		                                                                                                                     // 315
		TweenMax.to = function(target, duration, vars) {                                                                     // 316
			return new TweenMax(target, duration, vars);                                                                        // 317
		};                                                                                                                   // 318
		                                                                                                                     // 319
		TweenMax.from = function(target, duration, vars) {                                                                   // 320
			vars.runBackwards = true;                                                                                           // 321
			vars.immediateRender = (vars.immediateRender != false);                                                             // 322
			return new TweenMax(target, duration, vars);                                                                        // 323
		};                                                                                                                   // 324
		                                                                                                                     // 325
		TweenMax.fromTo = function(target, duration, fromVars, toVars) {                                                     // 326
			toVars.startAt = fromVars;                                                                                          // 327
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);                    // 328
			return new TweenMax(target, duration, toVars);                                                                      // 329
		};                                                                                                                   // 330
		                                                                                                                     // 331
		TweenMax.staggerTo = TweenMax.allTo = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			stagger = stagger || 0;                                                                                             // 333
			var delay = vars.delay || 0,                                                                                        // 334
				a = [],                                                                                                            // 335
				finalComplete = function() {                                                                                       // 336
					if (vars.onComplete) {                                                                                            // 337
						vars.onComplete.apply(vars.onCompleteScope || this, arguments);                                                  // 338
					}                                                                                                                 // 339
					onCompleteAll.apply(onCompleteAllScope || this, onCompleteAllParams || _blankArray);                              // 340
				},                                                                                                                 // 341
				l, copy, i, p;                                                                                                     // 342
			if (!_isArray(targets)) {                                                                                           // 343
				if (typeof(targets) === "string") {                                                                                // 344
					targets = TweenLite.selector(targets) || targets;                                                                 // 345
				}                                                                                                                  // 346
				if (_isSelector(targets)) {                                                                                        // 347
					targets = _slice(targets);                                                                                        // 348
				}                                                                                                                  // 349
			}                                                                                                                   // 350
			targets = targets || [];                                                                                            // 351
			if (stagger < 0) {                                                                                                  // 352
				targets = _slice(targets);                                                                                         // 353
				targets.reverse();                                                                                                 // 354
				stagger *= -1;                                                                                                     // 355
			}                                                                                                                   // 356
			l = targets.length - 1;                                                                                             // 357
			for (i = 0; i <= l; i++) {                                                                                          // 358
				copy = {};                                                                                                         // 359
				for (p in vars) {                                                                                                  // 360
					copy[p] = vars[p];                                                                                                // 361
				}                                                                                                                  // 362
				copy.delay = delay;                                                                                                // 363
				if (i === l && onCompleteAll) {                                                                                    // 364
					copy.onComplete = finalComplete;                                                                                  // 365
				}                                                                                                                  // 366
				a[i] = new TweenMax(targets[i], duration, copy);                                                                   // 367
				delay += stagger;                                                                                                  // 368
			}                                                                                                                   // 369
			return a;                                                                                                           // 370
		};                                                                                                                   // 371
		                                                                                                                     // 372
		TweenMax.staggerFrom = TweenMax.allFrom = function(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.runBackwards = true;                                                                                           // 374
			vars.immediateRender = (vars.immediateRender != false);                                                             // 375
			return TweenMax.staggerTo(targets, duration, vars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};                                                                                                                   // 377
		                                                                                                                     // 378
		TweenMax.staggerFromTo = TweenMax.allFromTo = function(targets, duration, fromVars, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;                                                                                          // 380
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);                    // 381
			return TweenMax.staggerTo(targets, duration, toVars, stagger, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};                                                                                                                   // 383
				                                                                                                                   // 384
		TweenMax.delayedCall = function(delay, callback, params, scope, useFrames) {                                         // 385
			return new TweenMax(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, useFrames:useFrames, overwrite:0});
		};                                                                                                                   // 387
		                                                                                                                     // 388
		TweenMax.set = function(target, vars) {                                                                              // 389
			return new TweenMax(target, 0, vars);                                                                               // 390
		};                                                                                                                   // 391
		                                                                                                                     // 392
		TweenMax.isTweening = function(target) {                                                                             // 393
			return (TweenLite.getTweensOf(target, true).length > 0);                                                            // 394
		};                                                                                                                   // 395
		                                                                                                                     // 396
		var _getChildrenOf = function(timeline, includeTimelines) {                                                          // 397
				var a = [],                                                                                                        // 398
					cnt = 0,                                                                                                          // 399
					tween = timeline._first;                                                                                          // 400
				while (tween) {                                                                                                    // 401
					if (tween instanceof TweenLite) {                                                                                 // 402
						a[cnt++] = tween;                                                                                                // 403
					} else {                                                                                                          // 404
						if (includeTimelines) {                                                                                          // 405
							a[cnt++] = tween;                                                                                               // 406
						}                                                                                                                // 407
						a = a.concat(_getChildrenOf(tween, includeTimelines));                                                           // 408
						cnt = a.length;                                                                                                  // 409
					}                                                                                                                 // 410
					tween = tween._next;                                                                                              // 411
				}                                                                                                                  // 412
				return a;                                                                                                          // 413
			},                                                                                                                  // 414
			getAllTweens = TweenMax.getAllTweens = function(includeTimelines) {                                                 // 415
				return _getChildrenOf(Animation._rootTimeline, includeTimelines).concat( _getChildrenOf(Animation._rootFramesTimeline, includeTimelines) );
			};                                                                                                                  // 417
		                                                                                                                     // 418
		TweenMax.killAll = function(complete, tweens, delayedCalls, timelines) {                                             // 419
			if (tweens == null) {                                                                                               // 420
				tweens = true;                                                                                                     // 421
			}                                                                                                                   // 422
			if (delayedCalls == null) {                                                                                         // 423
				delayedCalls = true;                                                                                               // 424
			}                                                                                                                   // 425
			var a = getAllTweens((timelines != false)),                                                                         // 426
				l = a.length,                                                                                                      // 427
				allTrue = (tweens && delayedCalls && timelines),                                                                   // 428
				isDC, tween, i;                                                                                                    // 429
			for (i = 0; i < l; i++) {                                                                                           // 430
				tween = a[i];                                                                                                      // 431
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					if (complete) {                                                                                                   // 433
						tween.totalTime(tween._reversed ? 0 : tween.totalDuration());                                                    // 434
					} else {                                                                                                          // 435
						tween._enabled(false, false);                                                                                    // 436
					}                                                                                                                 // 437
				}                                                                                                                  // 438
			}                                                                                                                   // 439
		};                                                                                                                   // 440
		                                                                                                                     // 441
		TweenMax.killChildTweensOf = function(parent, complete) {                                                            // 442
			if (parent == null) {                                                                                               // 443
				return;                                                                                                            // 444
			}                                                                                                                   // 445
			var tl = TweenLiteInternals.tweenLookup,                                                                            // 446
				a, curParent, p, i, l;                                                                                             // 447
			if (typeof(parent) === "string") {                                                                                  // 448
				parent = TweenLite.selector(parent) || parent;                                                                     // 449
			}                                                                                                                   // 450
			if (_isSelector(parent)) {                                                                                          // 451
				parent = _slice(parent);                                                                                           // 452
			}                                                                                                                   // 453
			if (_isArray(parent)) {                                                                                             // 454
				i = parent.length;                                                                                                 // 455
				while (--i > -1) {                                                                                                 // 456
					TweenMax.killChildTweensOf(parent[i], complete);                                                                  // 457
				}                                                                                                                  // 458
				return;                                                                                                            // 459
			}                                                                                                                   // 460
			a = [];                                                                                                             // 461
			for (p in tl) {                                                                                                     // 462
				curParent = tl[p].target.parentNode;                                                                               // 463
				while (curParent) {                                                                                                // 464
					if (curParent === parent) {                                                                                       // 465
						a = a.concat(tl[p].tweens);                                                                                      // 466
					}                                                                                                                 // 467
					curParent = curParent.parentNode;                                                                                 // 468
				}                                                                                                                  // 469
			}                                                                                                                   // 470
			l = a.length;                                                                                                       // 471
			for (i = 0; i < l; i++) {                                                                                           // 472
				if (complete) {                                                                                                    // 473
					a[i].totalTime(a[i].totalDuration());                                                                             // 474
				}                                                                                                                  // 475
				a[i]._enabled(false, false);                                                                                       // 476
			}                                                                                                                   // 477
		};                                                                                                                   // 478
                                                                                                                       // 479
		var _changePause = function(pause, tweens, delayedCalls, timelines) {                                                // 480
			tweens = (tweens !== false);                                                                                        // 481
			delayedCalls = (delayedCalls !== false);                                                                            // 482
			timelines = (timelines !== false);                                                                                  // 483
			var a = getAllTweens(timelines),                                                                                    // 484
				allTrue = (tweens && delayedCalls && timelines),                                                                   // 485
				i = a.length,                                                                                                      // 486
				isDC, tween;                                                                                                       // 487
			while (--i > -1) {                                                                                                  // 488
				tween = a[i];                                                                                                      // 489
				if (allTrue || (tween instanceof SimpleTimeline) || ((isDC = (tween.target === tween.vars.onComplete)) && delayedCalls) || (tweens && !isDC)) {
					tween.paused(pause);                                                                                              // 491
				}                                                                                                                  // 492
			}                                                                                                                   // 493
		};                                                                                                                   // 494
		                                                                                                                     // 495
		TweenMax.pauseAll = function(tweens, delayedCalls, timelines) {                                                      // 496
			_changePause(true, tweens, delayedCalls, timelines);                                                                // 497
		};                                                                                                                   // 498
		                                                                                                                     // 499
		TweenMax.resumeAll = function(tweens, delayedCalls, timelines) {                                                     // 500
			_changePause(false, tweens, delayedCalls, timelines);                                                               // 501
		};                                                                                                                   // 502
                                                                                                                       // 503
		TweenMax.globalTimeScale = function(value) {                                                                         // 504
			var tl = Animation._rootTimeline,                                                                                   // 505
				t = TweenLite.ticker.time;                                                                                         // 506
			if (!arguments.length) {                                                                                            // 507
				return tl._timeScale;                                                                                              // 508
			}                                                                                                                   // 509
			value = value || _tinyNum; //can't allow zero because it'll throw the math off                                      // 510
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);                                                  // 511
			tl = Animation._rootFramesTimeline;                                                                                 // 512
			t = TweenLite.ticker.frame;                                                                                         // 513
			tl._startTime = t - ((t - tl._startTime) * tl._timeScale / value);                                                  // 514
			tl._timeScale = Animation._rootTimeline._timeScale = value;                                                         // 515
			return value;                                                                                                       // 516
		};                                                                                                                   // 517
		                                                                                                                     // 518
	                                                                                                                      // 519
//---- GETTERS / SETTERS ----------------------------------------------------------------------------------------------------------
		                                                                                                                     // 521
		p.progress = function(value) {                                                                                       // 522
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), false);
		};                                                                                                                   // 524
		                                                                                                                     // 525
		p.totalProgress = function(value) {                                                                                  // 526
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, false);
		};                                                                                                                   // 528
		                                                                                                                     // 529
		p.time = function(value, suppressEvents) {                                                                           // 530
			if (!arguments.length) {                                                                                            // 531
				return this._time;                                                                                                 // 532
			}                                                                                                                   // 533
			if (this._dirty) {                                                                                                  // 534
				this.totalDuration();                                                                                              // 535
			}                                                                                                                   // 536
			if (value > this._duration) {                                                                                       // 537
				value = this._duration;                                                                                            // 538
			}                                                                                                                   // 539
			if (this._yoyo && (this._cycle & 1) !== 0) {                                                                        // 540
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));                           // 541
			} else if (this._repeat !== 0) {                                                                                    // 542
				value += this._cycle * (this._duration + this._repeatDelay);                                                       // 543
			}                                                                                                                   // 544
			return this.totalTime(value, suppressEvents);                                                                       // 545
		};                                                                                                                   // 546
                                                                                                                       // 547
		p.duration = function(value) {                                                                                       // 548
			if (!arguments.length) {                                                                                            // 549
				return this._duration; //don't set _dirty = false because there could be repeats that haven't been factored into the _totalDuration yet. Otherwise, if you create a repeated TweenMax and then immediately check its duration(), it would cache the value and the totalDuration would not be correct, thus repeats wouldn't take effect.
			}                                                                                                                   // 551
			return Animation.prototype.duration.call(this, value);                                                              // 552
		};                                                                                                                   // 553
                                                                                                                       // 554
		p.totalDuration = function(value) {                                                                                  // 555
			if (!arguments.length) {                                                                                            // 556
				if (this._dirty) {                                                                                                 // 557
					//instead of Infinity, we use 999999999999 so that we can accommodate reverses                                    // 558
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
					this._dirty = false;                                                                                              // 560
				}                                                                                                                  // 561
				return this._totalDuration;                                                                                        // 562
			}                                                                                                                   // 563
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};                                                                                                                   // 565
		                                                                                                                     // 566
		p.repeat = function(value) {                                                                                         // 567
			if (!arguments.length) {                                                                                            // 568
				return this._repeat;                                                                                               // 569
			}                                                                                                                   // 570
			this._repeat = value;                                                                                               // 571
			return this._uncache(true);                                                                                         // 572
		};                                                                                                                   // 573
		                                                                                                                     // 574
		p.repeatDelay = function(value) {                                                                                    // 575
			if (!arguments.length) {                                                                                            // 576
				return this._repeatDelay;                                                                                          // 577
			}                                                                                                                   // 578
			this._repeatDelay = value;                                                                                          // 579
			return this._uncache(true);                                                                                         // 580
		};                                                                                                                   // 581
		                                                                                                                     // 582
		p.yoyo = function(value) {                                                                                           // 583
			if (!arguments.length) {                                                                                            // 584
				return this._yoyo;                                                                                                 // 585
			}                                                                                                                   // 586
			this._yoyo = value;                                                                                                 // 587
			return this;                                                                                                        // 588
		};                                                                                                                   // 589
		                                                                                                                     // 590
		                                                                                                                     // 591
		return TweenMax;                                                                                                     // 592
		                                                                                                                     // 593
	}, true);                                                                                                             // 594
                                                                                                                       // 595
                                                                                                                       // 596
                                                                                                                       // 597
                                                                                                                       // 598
                                                                                                                       // 599
                                                                                                                       // 600
                                                                                                                       // 601
                                                                                                                       // 602
/*                                                                                                                     // 603
 * ----------------------------------------------------------------                                                    // 604
 * TimelineLite                                                                                                        // 605
 * ----------------------------------------------------------------                                                    // 606
 */                                                                                                                    // 607
	_gsScope._gsDefine("TimelineLite", ["core.Animation","core.SimpleTimeline","TweenLite"], function(Animation, SimpleTimeline, TweenLite) {
                                                                                                                       // 609
		var TimelineLite = function(vars) {                                                                                  // 610
				SimpleTimeline.call(this, vars);                                                                                   // 611
				this._labels = {};                                                                                                 // 612
				this.autoRemoveChildren = (this.vars.autoRemoveChildren === true);                                                 // 613
				this.smoothChildTiming = (this.vars.smoothChildTiming === true);                                                   // 614
				this._sortChildren = true;                                                                                         // 615
				this._onUpdate = this.vars.onUpdate;                                                                               // 616
				var v = this.vars,                                                                                                 // 617
					val, p;                                                                                                           // 618
				for (p in v) {                                                                                                     // 619
					val = v[p];                                                                                                       // 620
					if (_isArray(val)) if (val.join("").indexOf("{self}") !== -1) {                                                   // 621
						v[p] = this._swapSelfInParams(val);                                                                              // 622
					}                                                                                                                 // 623
				}                                                                                                                  // 624
				if (_isArray(v.tweens)) {                                                                                          // 625
					this.add(v.tweens, 0, v.align, v.stagger);                                                                        // 626
				}                                                                                                                  // 627
			},                                                                                                                  // 628
			_tinyNum = 0.0000000001,                                                                                            // 629
			TweenLiteInternals = TweenLite._internals,                                                                          // 630
			_internals = TimelineLite._internals = {},                                                                          // 631
			_isSelector = TweenLiteInternals.isSelector,                                                                        // 632
			_isArray = TweenLiteInternals.isArray,                                                                              // 633
			_lazyTweens = TweenLiteInternals.lazyTweens,                                                                        // 634
			_lazyRender = TweenLiteInternals.lazyRender,                                                                        // 635
			_blankArray = [],                                                                                                   // 636
			_globals = _gsScope._gsDefine.globals,                                                                              // 637
			_copy = function(vars) {                                                                                            // 638
				var copy = {}, p;                                                                                                  // 639
				for (p in vars) {                                                                                                  // 640
					copy[p] = vars[p];                                                                                                // 641
				}                                                                                                                  // 642
				return copy;                                                                                                       // 643
			},                                                                                                                  // 644
			_pauseCallback = _internals.pauseCallback = function(tween, callback, params, scope) {                              // 645
				var tl = tween._timeline,                                                                                          // 646
					time = tl._totalTime,                                                                                             // 647
					startTime = tween._startTime,                                                                                     // 648
					next = tween.ratio ? _tinyNum : 0,                                                                                // 649
					prev = tween.ratio ? 0 : _tinyNum,                                                                                // 650
					sibling;                                                                                                          // 651
				if (callback || !this._forcingPlayhead) { //if the user calls a method that moves the playhead (like progress() or time()), it should honor that and skip any pauses (although if there's a callback positioned at that pause, it must jump there and make the call to ensure the time is EXACTLY what it is supposed to be, and then proceed to where the playhead is being forced). Otherwise, imagine placing a pause in the middle of a timeline and then doing timeline.progress(0.9) - it would get stuck where the pause is.
					tl.pause(startTime);                                                                                              // 653
					//now find sibling tweens that are EXACTLY at the same spot on the timeline and adjust the _rawPrevTime so that they fire (or don't fire) correctly on the next render. This is primarily to accommodate zero-duration tweens/callbacks that are positioned right on top of a pause. For example, tl.to(...).call(...).addPause(...).call(...) - notice that there's a call() on each side of the pause, so when it's running forward it should call the first one and then pause, and then when resumed, call the other. Zero-duration tweens use _rawPrevTime to sense momentum figure out if events were suppressed when arriving directly on top of that time.
					sibling = tween._prev;                                                                                            // 655
					while (sibling && sibling._startTime === startTime) {                                                             // 656
						sibling._rawPrevTime = prev;                                                                                     // 657
						sibling = sibling._prev;                                                                                         // 658
					}                                                                                                                 // 659
					sibling = tween._next;                                                                                            // 660
					while (sibling && sibling._startTime === startTime) {                                                             // 661
						sibling._rawPrevTime = next;                                                                                     // 662
						sibling = sibling._next;                                                                                         // 663
					}                                                                                                                 // 664
					if (callback) {                                                                                                   // 665
						callback.apply(scope || tl, params || _blankArray);                                                              // 666
					}                                                                                                                 // 667
					if (this._forcingPlayhead) {                                                                                      // 668
						tl.seek(time);                                                                                                   // 669
					}                                                                                                                 // 670
				}                                                                                                                  // 671
			},                                                                                                                  // 672
			_slice = function(a) { //don't use [].slice because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],                                                                                                        // 674
					l = a.length,                                                                                                     // 675
					i;                                                                                                                // 676
				for (i = 0; i !== l; b.push(a[i++]));                                                                              // 677
				return b;                                                                                                          // 678
			},                                                                                                                  // 679
			p = TimelineLite.prototype = new SimpleTimeline();                                                                  // 680
                                                                                                                       // 681
		TimelineLite.version = "1.16.0";                                                                                     // 682
		p.constructor = TimelineLite;                                                                                        // 683
		p.kill()._gc = p._forcingPlayhead = false;                                                                           // 684
                                                                                                                       // 685
		/* might use later...                                                                                                // 686
		//translates a local time inside an animation to the corresponding time on the root/global timeline, factoring in all nesting and timeScales.
		function localToGlobal(time, animation) {                                                                            // 688
			while (animation) {                                                                                                 // 689
				time = (time / animation._timeScale) + animation._startTime;                                                       // 690
				animation = animation.timeline;                                                                                    // 691
			}                                                                                                                   // 692
			return time;                                                                                                        // 693
		}                                                                                                                    // 694
                                                                                                                       // 695
		//translates the supplied time on the root/global timeline into the corresponding local time inside a particular animation, factoring in all nesting and timeScales
		function globalToLocal(time, animation) {                                                                            // 697
			var scale = 1;                                                                                                      // 698
			time -= localToGlobal(0, animation);                                                                                // 699
			while (animation) {                                                                                                 // 700
				scale *= animation._timeScale;                                                                                     // 701
				animation = animation.timeline;                                                                                    // 702
			}                                                                                                                   // 703
			return time * scale;                                                                                                // 704
		}                                                                                                                    // 705
		*/                                                                                                                   // 706
                                                                                                                       // 707
		p.to = function(target, duration, vars, position) {                                                                  // 708
			var Engine = (vars.repeat && _globals.TweenMax) || TweenLite;                                                       // 709
			return duration ? this.add( new Engine(target, duration, vars), position) : this.set(target, vars, position);       // 710
		};                                                                                                                   // 711
                                                                                                                       // 712
		p.from = function(target, duration, vars, position) {                                                                // 713
			return this.add( ((vars.repeat && _globals.TweenMax) || TweenLite).from(target, duration, vars), position);         // 714
		};                                                                                                                   // 715
                                                                                                                       // 716
		p.fromTo = function(target, duration, fromVars, toVars, position) {                                                  // 717
			var Engine = (toVars.repeat && _globals.TweenMax) || TweenLite;                                                     // 718
			return duration ? this.add( Engine.fromTo(target, duration, fromVars, toVars), position) : this.set(target, toVars, position);
		};                                                                                                                   // 720
                                                                                                                       // 721
		p.staggerTo = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			var tl = new TimelineLite({onComplete:onCompleteAll, onCompleteParams:onCompleteAllParams, onCompleteScope:onCompleteAllScope, smoothChildTiming:this.smoothChildTiming}),
				i;                                                                                                                 // 724
			if (typeof(targets) === "string") {                                                                                 // 725
				targets = TweenLite.selector(targets) || targets;                                                                  // 726
			}                                                                                                                   // 727
			targets = targets || [];                                                                                            // 728
			if (_isSelector(targets)) { //senses if the targets object is a selector. If it is, we should translate it into an array.
				targets = _slice(targets);                                                                                         // 730
			}                                                                                                                   // 731
			stagger = stagger || 0;                                                                                             // 732
			if (stagger < 0) {                                                                                                  // 733
				targets = _slice(targets);                                                                                         // 734
				targets.reverse();                                                                                                 // 735
				stagger *= -1;                                                                                                     // 736
			}                                                                                                                   // 737
			for (i = 0; i < targets.length; i++) {                                                                              // 738
				if (vars.startAt) {                                                                                                // 739
					vars.startAt = _copy(vars.startAt);                                                                               // 740
				}                                                                                                                  // 741
				tl.to(targets[i], duration, _copy(vars), i * stagger);                                                             // 742
			}                                                                                                                   // 743
			return this.add(tl, position);                                                                                      // 744
		};                                                                                                                   // 745
                                                                                                                       // 746
		p.staggerFrom = function(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			vars.immediateRender = (vars.immediateRender != false);                                                             // 748
			vars.runBackwards = true;                                                                                           // 749
			return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};                                                                                                                   // 751
                                                                                                                       // 752
		p.staggerFromTo = function(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope) {
			toVars.startAt = fromVars;                                                                                          // 754
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);                    // 755
			return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams, onCompleteAllScope);
		};                                                                                                                   // 757
                                                                                                                       // 758
		p.call = function(callback, params, scope, position) {                                                               // 759
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);                                      // 760
		};                                                                                                                   // 761
                                                                                                                       // 762
		p.set = function(target, vars, position) {                                                                           // 763
			position = this._parseTimeOrLabel(position, 0, true);                                                               // 764
			if (vars.immediateRender == null) {                                                                                 // 765
				vars.immediateRender = (position === this._time && !this._paused);                                                 // 766
			}                                                                                                                   // 767
			return this.add( new TweenLite(target, 0, vars), position);                                                         // 768
		};                                                                                                                   // 769
                                                                                                                       // 770
		TimelineLite.exportRoot = function(vars, ignoreDelayedCalls) {                                                       // 771
			vars = vars || {};                                                                                                  // 772
			if (vars.smoothChildTiming == null) {                                                                               // 773
				vars.smoothChildTiming = true;                                                                                     // 774
			}                                                                                                                   // 775
			var tl = new TimelineLite(vars),                                                                                    // 776
				root = tl._timeline,                                                                                               // 777
				tween, next;                                                                                                       // 778
			if (ignoreDelayedCalls == null) {                                                                                   // 779
				ignoreDelayedCalls = true;                                                                                         // 780
			}                                                                                                                   // 781
			root._remove(tl, true);                                                                                             // 782
			tl._startTime = 0;                                                                                                  // 783
			tl._rawPrevTime = tl._time = tl._totalTime = root._time;                                                            // 784
			tween = root._first;                                                                                                // 785
			while (tween) {                                                                                                     // 786
				next = tween._next;                                                                                                // 787
				if (!ignoreDelayedCalls || !(tween instanceof TweenLite && tween.target === tween.vars.onComplete)) {              // 788
					tl.add(tween, tween._startTime - tween._delay);                                                                   // 789
				}                                                                                                                  // 790
				tween = next;                                                                                                      // 791
			}                                                                                                                   // 792
			root.add(tl, 0);                                                                                                    // 793
			return tl;                                                                                                          // 794
		};                                                                                                                   // 795
                                                                                                                       // 796
		p.add = function(value, position, align, stagger) {                                                                  // 797
			var curTime, l, i, child, tl, beforeRawTime;                                                                        // 798
			if (typeof(position) !== "number") {                                                                                // 799
				position = this._parseTimeOrLabel(position, 0, true, value);                                                       // 800
			}                                                                                                                   // 801
			if (!(value instanceof Animation)) {                                                                                // 802
				if ((value instanceof Array) || (value && value.push && _isArray(value))) {                                        // 803
					align = align || "normal";                                                                                        // 804
					stagger = stagger || 0;                                                                                           // 805
					curTime = position;                                                                                               // 806
					l = value.length;                                                                                                 // 807
					for (i = 0; i < l; i++) {                                                                                         // 808
						if (_isArray(child = value[i])) {                                                                                // 809
							child = new TimelineLite({tweens:child});                                                                       // 810
						}                                                                                                                // 811
						this.add(child, curTime);                                                                                        // 812
						if (typeof(child) !== "string" && typeof(child) !== "function") {                                                // 813
							if (align === "sequence") {                                                                                     // 814
								curTime = child._startTime + (child.totalDuration() / child._timeScale);                                       // 815
							} else if (align === "start") {                                                                                 // 816
								child._startTime -= child.delay();                                                                             // 817
							}                                                                                                               // 818
						}                                                                                                                // 819
						curTime += stagger;                                                                                              // 820
					}                                                                                                                 // 821
					return this._uncache(true);                                                                                       // 822
				} else if (typeof(value) === "string") {                                                                           // 823
					return this.addLabel(value, position);                                                                            // 824
				} else if (typeof(value) === "function") {                                                                         // 825
					value = TweenLite.delayedCall(0, value);                                                                          // 826
				} else {                                                                                                           // 827
					throw("Cannot add " + value + " into the timeline; it is not a tween, timeline, function, or string.");           // 828
				}                                                                                                                  // 829
			}                                                                                                                   // 830
                                                                                                                       // 831
			SimpleTimeline.prototype.add.call(this, value, position);                                                           // 832
                                                                                                                       // 833
			//if the timeline has already ended but the inserted tween/timeline extends the duration, we should enable this timeline again so that it renders properly. We should also align the playhead with the parent timeline's when appropriate.
			if (this._gc || this._time === this._duration) if (!this._paused) if (this._duration < this.duration()) {           // 835
				//in case any of the ancestors had completed but should now be enabled...                                          // 836
				tl = this;                                                                                                         // 837
				beforeRawTime = (tl.rawTime() > value._startTime); //if the tween is placed on the timeline so that it starts BEFORE the current rawTime, we should align the playhead (move the timeline). This is because sometimes users will create a timeline, let it finish, and much later append a tween and expect it to run instead of jumping to its end state. While technically one could argue that it should jump to its end state, that's not what users intuitively expect.
				while (tl._timeline) {                                                                                             // 839
					if (beforeRawTime && tl._timeline.smoothChildTiming) {                                                            // 840
						tl.totalTime(tl._totalTime, true); //moves the timeline (shifts its startTime) if necessary, and also enables it.
					} else if (tl._gc) {                                                                                              // 842
						tl._enabled(true, false);                                                                                        // 843
					}                                                                                                                 // 844
					tl = tl._timeline;                                                                                                // 845
				}                                                                                                                  // 846
			}                                                                                                                   // 847
                                                                                                                       // 848
			return this;                                                                                                        // 849
		};                                                                                                                   // 850
                                                                                                                       // 851
		p.remove = function(value) {                                                                                         // 852
			if (value instanceof Animation) {                                                                                   // 853
				return this._remove(value, false);                                                                                 // 854
			} else if (value instanceof Array || (value && value.push && _isArray(value))) {                                    // 855
				var i = value.length;                                                                                              // 856
				while (--i > -1) {                                                                                                 // 857
					this.remove(value[i]);                                                                                            // 858
				}                                                                                                                  // 859
				return this;                                                                                                       // 860
			} else if (typeof(value) === "string") {                                                                            // 861
				return this.removeLabel(value);                                                                                    // 862
			}                                                                                                                   // 863
			return this.kill(null, value);                                                                                      // 864
		};                                                                                                                   // 865
                                                                                                                       // 866
		p._remove = function(tween, skipDisable) {                                                                           // 867
			SimpleTimeline.prototype._remove.call(this, tween, skipDisable);                                                    // 868
			var last = this._last;                                                                                              // 869
			if (!last) {                                                                                                        // 870
				this._time = this._totalTime = this._duration = this._totalDuration = 0;                                           // 871
			} else if (this._time > last._startTime + last._totalDuration / last._timeScale) {                                  // 872
				this._time = this.duration();                                                                                      // 873
				this._totalTime = this._totalDuration;                                                                             // 874
			}                                                                                                                   // 875
			return this;                                                                                                        // 876
		};                                                                                                                   // 877
                                                                                                                       // 878
		p.append = function(value, offsetOrLabel) {                                                                          // 879
			return this.add(value, this._parseTimeOrLabel(null, offsetOrLabel, true, value));                                   // 880
		};                                                                                                                   // 881
                                                                                                                       // 882
		p.insert = p.insertMultiple = function(value, position, align, stagger) {                                            // 883
			return this.add(value, position || 0, align, stagger);                                                              // 884
		};                                                                                                                   // 885
                                                                                                                       // 886
		p.appendMultiple = function(tweens, offsetOrLabel, align, stagger) {                                                 // 887
			return this.add(tweens, this._parseTimeOrLabel(null, offsetOrLabel, true, tweens), align, stagger);                 // 888
		};                                                                                                                   // 889
                                                                                                                       // 890
		p.addLabel = function(label, position) {                                                                             // 891
			this._labels[label] = this._parseTimeOrLabel(position);                                                             // 892
			return this;                                                                                                        // 893
		};                                                                                                                   // 894
                                                                                                                       // 895
		p.addPause = function(position, callback, params, scope) {                                                           // 896
			var t = TweenLite.delayedCall(0, _pauseCallback, ["{self}", callback, params, scope], this);                        // 897
			t.data = "isPause"; // we use this flag in TweenLite's render() method to identify it as a special case that shouldn't be triggered when the virtual playhead is LEAVING the exact position where the pause is, otherwise timeline.addPause(1).play(1) would end up paused on the very next tick.
			return this.add(t, position);                                                                                       // 899
		};                                                                                                                   // 900
                                                                                                                       // 901
		p.removeLabel = function(label) {                                                                                    // 902
			delete this._labels[label];                                                                                         // 903
			return this;                                                                                                        // 904
		};                                                                                                                   // 905
                                                                                                                       // 906
		p.getLabelTime = function(label) {                                                                                   // 907
			return (this._labels[label] != null) ? this._labels[label] : -1;                                                    // 908
		};                                                                                                                   // 909
                                                                                                                       // 910
		p._parseTimeOrLabel = function(timeOrLabel, offsetOrLabel, appendIfAbsent, ignore) {                                 // 911
			var i;                                                                                                              // 912
			//if we're about to add a tween/timeline (or an array of them) that's already a child of this timeline, we should remove it first so that it doesn't contaminate the duration().
			if (ignore instanceof Animation && ignore.timeline === this) {                                                      // 914
				this.remove(ignore);                                                                                               // 915
			} else if (ignore && ((ignore instanceof Array) || (ignore.push && _isArray(ignore)))) {                            // 916
				i = ignore.length;                                                                                                 // 917
				while (--i > -1) {                                                                                                 // 918
					if (ignore[i] instanceof Animation && ignore[i].timeline === this) {                                              // 919
						this.remove(ignore[i]);                                                                                          // 920
					}                                                                                                                 // 921
				}                                                                                                                  // 922
			}                                                                                                                   // 923
			if (typeof(offsetOrLabel) === "string") {                                                                           // 924
				return this._parseTimeOrLabel(offsetOrLabel, (appendIfAbsent && typeof(timeOrLabel) === "number" && this._labels[offsetOrLabel] == null) ? timeOrLabel - this.duration() : 0, appendIfAbsent);
			}                                                                                                                   // 926
			offsetOrLabel = offsetOrLabel || 0;                                                                                 // 927
			if (typeof(timeOrLabel) === "string" && (isNaN(timeOrLabel) || this._labels[timeOrLabel] != null)) { //if the string is a number like "1", check to see if there's a label with that name, otherwise interpret it as a number (absolute value).
				i = timeOrLabel.indexOf("=");                                                                                      // 929
				if (i === -1) {                                                                                                    // 930
					if (this._labels[timeOrLabel] == null) {                                                                          // 931
						return appendIfAbsent ? (this._labels[timeOrLabel] = this.duration() + offsetOrLabel) : offsetOrLabel;           // 932
					}                                                                                                                 // 933
					return this._labels[timeOrLabel] + offsetOrLabel;                                                                 // 934
				}                                                                                                                  // 935
				offsetOrLabel = parseInt(timeOrLabel.charAt(i-1) + "1", 10) * Number(timeOrLabel.substr(i+1));                     // 936
				timeOrLabel = (i > 1) ? this._parseTimeOrLabel(timeOrLabel.substr(0, i-1), 0, appendIfAbsent) : this.duration();   // 937
			} else if (timeOrLabel == null) {                                                                                   // 938
				timeOrLabel = this.duration();                                                                                     // 939
			}                                                                                                                   // 940
			return Number(timeOrLabel) + offsetOrLabel;                                                                         // 941
		};                                                                                                                   // 942
                                                                                                                       // 943
		p.seek = function(position, suppressEvents) {                                                                        // 944
			return this.totalTime((typeof(position) === "number") ? position : this._parseTimeOrLabel(position), (suppressEvents !== false));
		};                                                                                                                   // 946
                                                                                                                       // 947
		p.stop = function() {                                                                                                // 948
			return this.paused(true);                                                                                           // 949
		};                                                                                                                   // 950
                                                                                                                       // 951
		p.gotoAndPlay = function(position, suppressEvents) {                                                                 // 952
			return this.play(position, suppressEvents);                                                                         // 953
		};                                                                                                                   // 954
                                                                                                                       // 955
		p.gotoAndStop = function(position, suppressEvents) {                                                                 // 956
			return this.pause(position, suppressEvents);                                                                        // 957
		};                                                                                                                   // 958
                                                                                                                       // 959
		p.render = function(time, suppressEvents, force) {                                                                   // 960
			if (this._gc) {                                                                                                     // 961
				this._enabled(true, false);                                                                                        // 962
			}                                                                                                                   // 963
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),                                         // 964
				prevTime = this._time,                                                                                             // 965
				prevStart = this._startTime,                                                                                       // 966
				prevTimeScale = this._timeScale,                                                                                   // 967
				prevPaused = this._paused,                                                                                         // 968
				tween, isComplete, next, callback, internalForce;                                                                  // 969
			if (time >= totalDur) {                                                                                             // 970
				this._totalTime = this._time = totalDur;                                                                           // 971
				if (!this._reversed) if (!this._hasPausedChild()) {                                                                // 972
					isComplete = true;                                                                                                // 973
					callback = "onComplete";                                                                                          // 974
					if (this._duration === 0) if (time === 0 || this._rawPrevTime < 0 || this._rawPrevTime === _tinyNum) if (this._rawPrevTime !== time && this._first) {
						internalForce = true;                                                                                            // 976
						if (this._rawPrevTime > _tinyNum) {                                                                              // 977
							callback = "onReverseComplete";                                                                                 // 978
						}                                                                                                                // 979
					}                                                                                                                 // 980
				}                                                                                                                  // 981
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				time = totalDur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7.
                                                                                                                       // 984
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;                                                                                  // 986
				if (prevTime !== 0 || (this._duration === 0 && this._rawPrevTime !== _tinyNum && (this._rawPrevTime > 0 || (time < 0 && this._rawPrevTime >= 0)))) {
					callback = "onReverseComplete";                                                                                   // 988
					isComplete = this._reversed;                                                                                      // 989
				}                                                                                                                  // 990
				if (time < 0) {                                                                                                    // 991
					this._active = false;                                                                                             // 992
					if (this._timeline.autoRemoveChildren && this._reversed) { //ensures proper GC if a timeline is resumed after it's finished reversing.
						internalForce = isComplete = true;                                                                               // 994
						callback = "onReverseComplete";                                                                                  // 995
					} else if (this._rawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;                                                                                            // 997
					}                                                                                                                 // 998
					this._rawPrevTime = time;                                                                                         // 999
				} else {                                                                                                           // 1000
					this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;                                                                                             // 1003
						while (tween && tween._startTime === 0) {                                                                        // 1004
							if (!tween._duration) {                                                                                         // 1005
								isComplete = false;                                                                                            // 1006
							}                                                                                                               // 1007
							tween = tween._next;                                                                                            // 1008
						}                                                                                                                // 1009
					}                                                                                                                 // 1010
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {                                                                                             // 1012
						internalForce = true;                                                                                            // 1013
					}                                                                                                                 // 1014
				}                                                                                                                  // 1015
                                                                                                                       // 1016
			} else {                                                                                                            // 1017
				this._totalTime = this._time = this._rawPrevTime = time;                                                           // 1018
			}                                                                                                                   // 1019
			if ((this._time === prevTime || !this._first) && !force && !internalForce) {                                        // 1020
				return;                                                                                                            // 1021
			} else if (!this._initted) {                                                                                        // 1022
				this._initted = true;                                                                                              // 1023
			}                                                                                                                   // 1024
                                                                                                                       // 1025
			if (!this._active) if (!this._paused && this._time !== prevTime && time > 0) {                                      // 1026
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}                                                                                                                   // 1028
                                                                                                                       // 1029
			if (prevTime === 0) if (this.vars.onStart) if (this._time !== 0) if (!suppressEvents) {                             // 1030
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);                   // 1031
			}                                                                                                                   // 1032
                                                                                                                       // 1033
			if (this._time >= prevTime) {                                                                                       // 1034
				tween = this._first;                                                                                               // 1035
				while (tween) {                                                                                                    // 1036
					next = tween._next; //record it here because the value could change after rendering...                            // 1037
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering                           // 1038
						break;                                                                                                           // 1039
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {                   // 1040
						if (!tween._reversed) {                                                                                          // 1041
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);                              // 1042
						} else {                                                                                                         // 1043
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}                                                                                                                // 1045
					}                                                                                                                 // 1046
					tween = next;                                                                                                     // 1047
				}                                                                                                                  // 1048
			} else {                                                                                                            // 1049
				tween = this._last;                                                                                                // 1050
				while (tween) {                                                                                                    // 1051
					next = tween._prev; //record it here because the value could change after rendering...                            // 1052
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering                           // 1053
						break;                                                                                                           // 1054
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {                     // 1055
						if (!tween._reversed) {                                                                                          // 1056
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);                              // 1057
						} else {                                                                                                         // 1058
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}                                                                                                                // 1060
					}                                                                                                                 // 1061
					tween = next;                                                                                                     // 1062
				}                                                                                                                  // 1063
			}                                                                                                                   // 1064
                                                                                                                       // 1065
			if (this._onUpdate) if (!suppressEvents) {                                                                          // 1066
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();                                                                                                    // 1068
				}                                                                                                                  // 1069
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                    // 1070
			}                                                                                                                   // 1071
                                                                                                                       // 1072
			if (callback) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {                                                                                                  // 1074
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();                                                                                                   // 1076
					}                                                                                                                 // 1077
					if (this._timeline.autoRemoveChildren) {                                                                          // 1078
						this._enabled(false, false);                                                                                     // 1079
					}                                                                                                                 // 1080
					this._active = false;                                                                                             // 1081
				}                                                                                                                  // 1082
				if (!suppressEvents && this.vars[callback]) {                                                                      // 1083
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);  // 1084
				}                                                                                                                  // 1085
			}                                                                                                                   // 1086
		};                                                                                                                   // 1087
                                                                                                                       // 1088
		p._hasPausedChild = function() {                                                                                     // 1089
			var tween = this._first;                                                                                            // 1090
			while (tween) {                                                                                                     // 1091
				if (tween._paused || ((tween instanceof TimelineLite) && tween._hasPausedChild())) {                               // 1092
					return true;                                                                                                      // 1093
				}                                                                                                                  // 1094
				tween = tween._next;                                                                                               // 1095
			}                                                                                                                   // 1096
			return false;                                                                                                       // 1097
		};                                                                                                                   // 1098
                                                                                                                       // 1099
		p.getChildren = function(nested, tweens, timelines, ignoreBeforeTime) {                                              // 1100
			ignoreBeforeTime = ignoreBeforeTime || -9999999999;                                                                 // 1101
			var a = [],                                                                                                         // 1102
				tween = this._first,                                                                                               // 1103
				cnt = 0;                                                                                                           // 1104
			while (tween) {                                                                                                     // 1105
				if (tween._startTime < ignoreBeforeTime) {                                                                         // 1106
					//do nothing                                                                                                      // 1107
				} else if (tween instanceof TweenLite) {                                                                           // 1108
					if (tweens !== false) {                                                                                           // 1109
						a[cnt++] = tween;                                                                                                // 1110
					}                                                                                                                 // 1111
				} else {                                                                                                           // 1112
					if (timelines !== false) {                                                                                        // 1113
						a[cnt++] = tween;                                                                                                // 1114
					}                                                                                                                 // 1115
					if (nested !== false) {                                                                                           // 1116
						a = a.concat(tween.getChildren(true, tweens, timelines));                                                        // 1117
						cnt = a.length;                                                                                                  // 1118
					}                                                                                                                 // 1119
				}                                                                                                                  // 1120
				tween = tween._next;                                                                                               // 1121
			}                                                                                                                   // 1122
			return a;                                                                                                           // 1123
		};                                                                                                                   // 1124
                                                                                                                       // 1125
		p.getTweensOf = function(target, nested) {                                                                           // 1126
			var disabled = this._gc,                                                                                            // 1127
				a = [],                                                                                                            // 1128
				cnt = 0,                                                                                                           // 1129
				tweens, i;                                                                                                         // 1130
			if (disabled) {                                                                                                     // 1131
				this._enabled(true, true); //getTweensOf() filters out disabled tweens, and we have to mark them as _gc = true when the timeline completes in order to allow clean garbage collection, so temporarily re-enable the timeline here.
			}                                                                                                                   // 1133
			tweens = TweenLite.getTweensOf(target);                                                                             // 1134
			i = tweens.length;                                                                                                  // 1135
			while (--i > -1) {                                                                                                  // 1136
				if (tweens[i].timeline === this || (nested && this._contains(tweens[i]))) {                                        // 1137
					a[cnt++] = tweens[i];                                                                                             // 1138
				}                                                                                                                  // 1139
			}                                                                                                                   // 1140
			if (disabled) {                                                                                                     // 1141
				this._enabled(false, true);                                                                                        // 1142
			}                                                                                                                   // 1143
			return a;                                                                                                           // 1144
		};                                                                                                                   // 1145
                                                                                                                       // 1146
		p.recent = function() {                                                                                              // 1147
			return this._recent;                                                                                                // 1148
		};                                                                                                                   // 1149
                                                                                                                       // 1150
		p._contains = function(tween) {                                                                                      // 1151
			var tl = tween.timeline;                                                                                            // 1152
			while (tl) {                                                                                                        // 1153
				if (tl === this) {                                                                                                 // 1154
					return true;                                                                                                      // 1155
				}                                                                                                                  // 1156
				tl = tl.timeline;                                                                                                  // 1157
			}                                                                                                                   // 1158
			return false;                                                                                                       // 1159
		};                                                                                                                   // 1160
                                                                                                                       // 1161
		p.shiftChildren = function(amount, adjustLabels, ignoreBeforeTime) {                                                 // 1162
			ignoreBeforeTime = ignoreBeforeTime || 0;                                                                           // 1163
			var tween = this._first,                                                                                            // 1164
				labels = this._labels,                                                                                             // 1165
				p;                                                                                                                 // 1166
			while (tween) {                                                                                                     // 1167
				if (tween._startTime >= ignoreBeforeTime) {                                                                        // 1168
					tween._startTime += amount;                                                                                       // 1169
				}                                                                                                                  // 1170
				tween = tween._next;                                                                                               // 1171
			}                                                                                                                   // 1172
			if (adjustLabels) {                                                                                                 // 1173
				for (p in labels) {                                                                                                // 1174
					if (labels[p] >= ignoreBeforeTime) {                                                                              // 1175
						labels[p] += amount;                                                                                             // 1176
					}                                                                                                                 // 1177
				}                                                                                                                  // 1178
			}                                                                                                                   // 1179
			return this._uncache(true);                                                                                         // 1180
		};                                                                                                                   // 1181
                                                                                                                       // 1182
		p._kill = function(vars, target) {                                                                                   // 1183
			if (!vars && !target) {                                                                                             // 1184
				return this._enabled(false, false);                                                                                // 1185
			}                                                                                                                   // 1186
			var tweens = (!target) ? this.getChildren(true, true, false) : this.getTweensOf(target),                            // 1187
				i = tweens.length,                                                                                                 // 1188
				changed = false;                                                                                                   // 1189
			while (--i > -1) {                                                                                                  // 1190
				if (tweens[i]._kill(vars, target)) {                                                                               // 1191
					changed = true;                                                                                                   // 1192
				}                                                                                                                  // 1193
			}                                                                                                                   // 1194
			return changed;                                                                                                     // 1195
		};                                                                                                                   // 1196
                                                                                                                       // 1197
		p.clear = function(labels) {                                                                                         // 1198
			var tweens = this.getChildren(false, true, true),                                                                   // 1199
				i = tweens.length;                                                                                                 // 1200
			this._time = this._totalTime = 0;                                                                                   // 1201
			while (--i > -1) {                                                                                                  // 1202
				tweens[i]._enabled(false, false);                                                                                  // 1203
			}                                                                                                                   // 1204
			if (labels !== false) {                                                                                             // 1205
				this._labels = {};                                                                                                 // 1206
			}                                                                                                                   // 1207
			return this._uncache(true);                                                                                         // 1208
		};                                                                                                                   // 1209
                                                                                                                       // 1210
		p.invalidate = function() {                                                                                          // 1211
			var tween = this._first;                                                                                            // 1212
			while (tween) {                                                                                                     // 1213
				tween.invalidate();                                                                                                // 1214
				tween = tween._next;                                                                                               // 1215
			}                                                                                                                   // 1216
			return Animation.prototype.invalidate.call(this);;                                                                  // 1217
		};                                                                                                                   // 1218
                                                                                                                       // 1219
		p._enabled = function(enabled, ignoreTimeline) {                                                                     // 1220
			if (enabled === this._gc) {                                                                                         // 1221
				var tween = this._first;                                                                                           // 1222
				while (tween) {                                                                                                    // 1223
					tween._enabled(enabled, true);                                                                                    // 1224
					tween = tween._next;                                                                                              // 1225
				}                                                                                                                  // 1226
			}                                                                                                                   // 1227
			return SimpleTimeline.prototype._enabled.call(this, enabled, ignoreTimeline);                                       // 1228
		};                                                                                                                   // 1229
                                                                                                                       // 1230
		p.totalTime = function(time, suppressEvents, uncapped) {                                                             // 1231
			this._forcingPlayhead = true;                                                                                       // 1232
			var val = Animation.prototype.totalTime.apply(this, arguments);                                                     // 1233
			this._forcingPlayhead = false;                                                                                      // 1234
			return val;                                                                                                         // 1235
		};                                                                                                                   // 1236
                                                                                                                       // 1237
		p.duration = function(value) {                                                                                       // 1238
			if (!arguments.length) {                                                                                            // 1239
				if (this._dirty) {                                                                                                 // 1240
					this.totalDuration(); //just triggers recalculation                                                               // 1241
				}                                                                                                                  // 1242
				return this._duration;                                                                                             // 1243
			}                                                                                                                   // 1244
			if (this.duration() !== 0 && value !== 0) {                                                                         // 1245
				this.timeScale(this._duration / value);                                                                            // 1246
			}                                                                                                                   // 1247
			return this;                                                                                                        // 1248
		};                                                                                                                   // 1249
                                                                                                                       // 1250
		p.totalDuration = function(value) {                                                                                  // 1251
			if (!arguments.length) {                                                                                            // 1252
				if (this._dirty) {                                                                                                 // 1253
					var max = 0,                                                                                                      // 1254
						tween = this._last,                                                                                              // 1255
						prevStart = 999999999999,                                                                                        // 1256
						prev, end;                                                                                                       // 1257
					while (tween) {                                                                                                   // 1258
						prev = tween._prev; //record it here in case the tween changes position in the sequence...                       // 1259
						if (tween._dirty) {                                                                                              // 1260
							tween.totalDuration(); //could change the tween._startTime, so make sure the tween's cache is clean before analyzing it.
						}                                                                                                                // 1262
						if (tween._startTime > prevStart && this._sortChildren && !tween._paused) { //in case one of the tweens shifted out of order, it needs to be re-inserted into the correct position in the sequence
							this.add(tween, tween._startTime - tween._delay);                                                               // 1264
						} else {                                                                                                         // 1265
							prevStart = tween._startTime;                                                                                   // 1266
						}                                                                                                                // 1267
						if (tween._startTime < 0 && !tween._paused) { //children aren't allowed to have negative startTimes unless smoothChildTiming is true, so adjust here if one is found.
							max -= tween._startTime;                                                                                        // 1269
							if (this._timeline.smoothChildTiming) {                                                                         // 1270
								this._startTime += tween._startTime / this._timeScale;                                                         // 1271
							}                                                                                                               // 1272
							this.shiftChildren(-tween._startTime, false, -9999999999);                                                      // 1273
							prevStart = 0;                                                                                                  // 1274
						}                                                                                                                // 1275
						end = tween._startTime + (tween._totalDuration / tween._timeScale);                                              // 1276
						if (end > max) {                                                                                                 // 1277
							max = end;                                                                                                      // 1278
						}                                                                                                                // 1279
						tween = prev;                                                                                                    // 1280
					}                                                                                                                 // 1281
					this._duration = this._totalDuration = max;                                                                       // 1282
					this._dirty = false;                                                                                              // 1283
				}                                                                                                                  // 1284
				return this._totalDuration;                                                                                        // 1285
			}                                                                                                                   // 1286
			if (this.totalDuration() !== 0) if (value !== 0) {                                                                  // 1287
				this.timeScale(this._totalDuration / value);                                                                       // 1288
			}                                                                                                                   // 1289
			return this;                                                                                                        // 1290
		};                                                                                                                   // 1291
                                                                                                                       // 1292
		p.paused = function(value) {                                                                                         // 1293
			if (!value) { //if there's a pause directly at the spot from where we're unpausing, skip it.                        // 1294
				var tween = this._first,                                                                                           // 1295
					time = this._time;                                                                                                // 1296
				while (tween) {                                                                                                    // 1297
					if (tween._startTime === time && tween.data === "isPause") {                                                      // 1298
						tween._rawPrevTime = time; //remember, _rawPrevTime is how zero-duration tweens/callbacks sense directionality and determine whether or not to fire. If _rawPrevTime is the same as _startTime on the next render, it won't fire.
					}                                                                                                                 // 1300
					tween = tween._next;                                                                                              // 1301
				}                                                                                                                  // 1302
			}                                                                                                                   // 1303
			return Animation.prototype.paused.apply(this, arguments);                                                           // 1304
		};                                                                                                                   // 1305
                                                                                                                       // 1306
		p.usesFrames = function() {                                                                                          // 1307
			var tl = this._timeline;                                                                                            // 1308
			while (tl._timeline) {                                                                                              // 1309
				tl = tl._timeline;                                                                                                 // 1310
			}                                                                                                                   // 1311
			return (tl === Animation._rootFramesTimeline);                                                                      // 1312
		};                                                                                                                   // 1313
                                                                                                                       // 1314
		p.rawTime = function() {                                                                                             // 1315
			return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale;             // 1316
		};                                                                                                                   // 1317
                                                                                                                       // 1318
		return TimelineLite;                                                                                                 // 1319
                                                                                                                       // 1320
	}, true);                                                                                                             // 1321
	                                                                                                                      // 1322
                                                                                                                       // 1323
                                                                                                                       // 1324
                                                                                                                       // 1325
                                                                                                                       // 1326
                                                                                                                       // 1327
                                                                                                                       // 1328
                                                                                                                       // 1329
	                                                                                                                      // 1330
	                                                                                                                      // 1331
	                                                                                                                      // 1332
	                                                                                                                      // 1333
	                                                                                                                      // 1334
/*                                                                                                                     // 1335
 * ----------------------------------------------------------------                                                    // 1336
 * TimelineMax                                                                                                         // 1337
 * ----------------------------------------------------------------                                                    // 1338
 */                                                                                                                    // 1339
	_gsScope._gsDefine("TimelineMax", ["TimelineLite","TweenLite","easing.Ease"], function(TimelineLite, TweenLite, Ease) {
                                                                                                                       // 1341
		var TimelineMax = function(vars) {                                                                                   // 1342
				TimelineLite.call(this, vars);                                                                                     // 1343
				this._repeat = this.vars.repeat || 0;                                                                              // 1344
				this._repeatDelay = this.vars.repeatDelay || 0;                                                                    // 1345
				this._cycle = 0;                                                                                                   // 1346
				this._yoyo = (this.vars.yoyo === true);                                                                            // 1347
				this._dirty = true;                                                                                                // 1348
			},                                                                                                                  // 1349
			_tinyNum = 0.0000000001,                                                                                            // 1350
			_blankArray = [],                                                                                                   // 1351
			TweenLiteInternals = TweenLite._internals,                                                                          // 1352
			_lazyTweens = TweenLiteInternals.lazyTweens,                                                                        // 1353
			_lazyRender = TweenLiteInternals.lazyRender,                                                                        // 1354
			_easeNone = new Ease(null, null, 1, 0),                                                                             // 1355
			p = TimelineMax.prototype = new TimelineLite();                                                                     // 1356
                                                                                                                       // 1357
		p.constructor = TimelineMax;                                                                                         // 1358
		p.kill()._gc = false;                                                                                                // 1359
		TimelineMax.version = "1.16.0";                                                                                      // 1360
                                                                                                                       // 1361
		p.invalidate = function() {                                                                                          // 1362
			this._yoyo = (this.vars.yoyo === true);                                                                             // 1363
			this._repeat = this.vars.repeat || 0;                                                                               // 1364
			this._repeatDelay = this.vars.repeatDelay || 0;                                                                     // 1365
			this._uncache(true);                                                                                                // 1366
			return TimelineLite.prototype.invalidate.call(this);                                                                // 1367
		};                                                                                                                   // 1368
                                                                                                                       // 1369
		p.addCallback = function(callback, position, params, scope) {                                                        // 1370
			return this.add( TweenLite.delayedCall(0, callback, params, scope), position);                                      // 1371
		};                                                                                                                   // 1372
                                                                                                                       // 1373
		p.removeCallback = function(callback, position) {                                                                    // 1374
			if (callback) {                                                                                                     // 1375
				if (position == null) {                                                                                            // 1376
					this._kill(null, callback);                                                                                       // 1377
				} else {                                                                                                           // 1378
					var a = this.getTweensOf(callback, false),                                                                        // 1379
						i = a.length,                                                                                                    // 1380
						time = this._parseTimeOrLabel(position);                                                                         // 1381
					while (--i > -1) {                                                                                                // 1382
						if (a[i]._startTime === time) {                                                                                  // 1383
							a[i]._enabled(false, false);                                                                                    // 1384
						}                                                                                                                // 1385
					}                                                                                                                 // 1386
				}                                                                                                                  // 1387
			}                                                                                                                   // 1388
			return this;                                                                                                        // 1389
		};                                                                                                                   // 1390
                                                                                                                       // 1391
		p.removePause = function(position) {                                                                                 // 1392
			return this.removeCallback(TimelineLite._internals.pauseCallback, position);                                        // 1393
		};                                                                                                                   // 1394
                                                                                                                       // 1395
		p.tweenTo = function(position, vars) {                                                                               // 1396
			vars = vars || {};                                                                                                  // 1397
			var copy = {ease:_easeNone, useFrames:this.usesFrames(), immediateRender:false},                                    // 1398
				duration, p, t;                                                                                                    // 1399
			for (p in vars) {                                                                                                   // 1400
				copy[p] = vars[p];                                                                                                 // 1401
			}                                                                                                                   // 1402
			copy.time = this._parseTimeOrLabel(position);                                                                       // 1403
			duration = (Math.abs(Number(copy.time) - this._time) / this._timeScale) || 0.001;                                   // 1404
			t = new TweenLite(this, duration, copy);                                                                            // 1405
			copy.onStart = function() {                                                                                         // 1406
				t.target.paused(true);                                                                                             // 1407
				if (t.vars.time !== t.target.time() && duration === t.duration()) { //don't make the duration zero - if it's supposed to be zero, don't worry because it's already initting the tween and will complete immediately, effectively making the duration zero anyway. If we make duration zero, the tween won't run at all.
					t.duration( Math.abs( t.vars.time - t.target.time()) / t.target._timeScale );                                     // 1409
				}                                                                                                                  // 1410
				if (vars.onStart) { //in case the user had an onStart in the vars - we don't want to overwrite it.                 // 1411
					vars.onStart.apply(vars.onStartScope || t, vars.onStartParams || _blankArray);                                    // 1412
				}                                                                                                                  // 1413
			};                                                                                                                  // 1414
			return t;                                                                                                           // 1415
		};                                                                                                                   // 1416
                                                                                                                       // 1417
		p.tweenFromTo = function(fromPosition, toPosition, vars) {                                                           // 1418
			vars = vars || {};                                                                                                  // 1419
			fromPosition = this._parseTimeOrLabel(fromPosition);                                                                // 1420
			vars.startAt = {onComplete:this.seek, onCompleteParams:[fromPosition], onCompleteScope:this};                       // 1421
			vars.immediateRender = (vars.immediateRender !== false);                                                            // 1422
			var t = this.tweenTo(toPosition, vars);                                                                             // 1423
			return t.duration((Math.abs( t.vars.time - fromPosition) / this._timeScale) || 0.001);                              // 1424
		};                                                                                                                   // 1425
                                                                                                                       // 1426
		p.render = function(time, suppressEvents, force) {                                                                   // 1427
			if (this._gc) {                                                                                                     // 1428
				this._enabled(true, false);                                                                                        // 1429
			}                                                                                                                   // 1430
			var totalDur = (!this._dirty) ? this._totalDuration : this.totalDuration(),                                         // 1431
				dur = this._duration,                                                                                              // 1432
				prevTime = this._time,                                                                                             // 1433
				prevTotalTime = this._totalTime,                                                                                   // 1434
				prevStart = this._startTime,                                                                                       // 1435
				prevTimeScale = this._timeScale,                                                                                   // 1436
				prevRawPrevTime = this._rawPrevTime,                                                                               // 1437
				prevPaused = this._paused,                                                                                         // 1438
				prevCycle = this._cycle,                                                                                           // 1439
				tween, isComplete, next, callback, internalForce, cycleDuration;                                                   // 1440
			if (time >= totalDur) {                                                                                             // 1441
				if (!this._locked) {                                                                                               // 1442
					this._totalTime = totalDur;                                                                                       // 1443
					this._cycle = this._repeat;                                                                                       // 1444
				}                                                                                                                  // 1445
				if (!this._reversed) if (!this._hasPausedChild()) {                                                                // 1446
					isComplete = true;                                                                                                // 1447
					callback = "onComplete";                                                                                          // 1448
					if (this._duration === 0) if (time === 0 || prevRawPrevTime < 0 || prevRawPrevTime === _tinyNum) if (prevRawPrevTime !== time && this._first) {
						internalForce = true;                                                                                            // 1450
						if (prevRawPrevTime > _tinyNum) {                                                                                // 1451
							callback = "onReverseComplete";                                                                                 // 1452
						}                                                                                                                // 1453
					}                                                                                                                 // 1454
				}                                                                                                                  // 1455
				this._rawPrevTime = (this._duration || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				if (this._yoyo && (this._cycle & 1) !== 0) {                                                                       // 1457
					this._time = time = 0;                                                                                            // 1458
				} else {                                                                                                           // 1459
					this._time = dur;                                                                                                 // 1460
					time = dur + 0.0001; //to avoid occasional floating point rounding errors - sometimes child tweens/timelines were not being fully completed (their progress might be 0.999999999999998 instead of 1 because when _time - tween._startTime is performed, floating point errors would return a value that was SLIGHTLY off). Try (999999999999.7 - 999999999999) * 1 = 0.699951171875 instead of 0.7. We cannot do less then 0.0001 because the same issue can occur when the duration is extremely large like 999999999999 in which case adding 0.00000001, for example, causes it to act like nothing was added.
				}                                                                                                                  // 1462
                                                                                                                       // 1463
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				if (!this._locked) {                                                                                               // 1465
					this._totalTime = this._cycle = 0;                                                                                // 1466
				}                                                                                                                  // 1467
				this._time = 0;                                                                                                    // 1468
				if (prevTime !== 0 || (dur === 0 && prevRawPrevTime !== _tinyNum && (prevRawPrevTime > 0 || (time < 0 && prevRawPrevTime >= 0)) && !this._locked)) { //edge case for checking time < 0 && prevRawPrevTime >= 0: a zero-duration fromTo() tween inside a zero-duration timeline (yeah, very rare)
					callback = "onReverseComplete";                                                                                   // 1470
					isComplete = this._reversed;                                                                                      // 1471
				}                                                                                                                  // 1472
				if (time < 0) {                                                                                                    // 1473
					this._active = false;                                                                                             // 1474
					if (this._timeline.autoRemoveChildren && this._reversed) {                                                        // 1475
						internalForce = isComplete = true;                                                                               // 1476
						callback = "onReverseComplete";                                                                                  // 1477
					} else if (prevRawPrevTime >= 0 && this._first) { //when going back beyond the start, force a render so that zero-duration tweens that sit at the very beginning render their start values properly. Otherwise, if the parent timeline's playhead lands exactly at this timeline's startTime, and then moves backwards, the zero-duration tweens at the beginning would still be at their end state.
						internalForce = true;                                                                                            // 1479
					}                                                                                                                 // 1480
					this._rawPrevTime = time;                                                                                         // 1481
				} else {                                                                                                           // 1482
					this._rawPrevTime = (dur || !suppressEvents || time || this._rawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration timeline or tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					if (time === 0 && isComplete) { //if there's a zero-duration tween at the very beginning of a timeline and the playhead lands EXACTLY at time 0, that tween will correctly render its end values, but we need to keep the timeline alive for one more render so that the beginning values render properly as the parent's playhead keeps moving beyond the begining. Imagine obj.x starts at 0 and then we do tl.set(obj, {x:100}).to(obj, 1, {x:200}) and then later we tl.reverse()...the goal is to have obj.x revert to 0. If the playhead happens to land on exactly 0, without this chunk of code, it'd complete the timeline and remove it from the rendering queue (not good).
						tween = this._first;                                                                                             // 1485
						while (tween && tween._startTime === 0) {                                                                        // 1486
							if (!tween._duration) {                                                                                         // 1487
								isComplete = false;                                                                                            // 1488
							}                                                                                                               // 1489
							tween = tween._next;                                                                                            // 1490
						}                                                                                                                // 1491
					}                                                                                                                 // 1492
					time = 0; //to avoid occasional floating point rounding errors (could cause problems especially with zero-duration tweens at the very beginning of the timeline)
					if (!this._initted) {                                                                                             // 1494
						internalForce = true;                                                                                            // 1495
					}                                                                                                                 // 1496
				}                                                                                                                  // 1497
                                                                                                                       // 1498
			} else {                                                                                                            // 1499
				if (dur === 0 && prevRawPrevTime < 0) { //without this, zero-duration repeating timelines (like with a simple callback nested at the very beginning and a repeatDelay) wouldn't render the first time through.
					internalForce = true;                                                                                             // 1501
				}                                                                                                                  // 1502
				this._time = this._rawPrevTime = time;                                                                             // 1503
				if (!this._locked) {                                                                                               // 1504
					this._totalTime = time;                                                                                           // 1505
					if (this._repeat !== 0) {                                                                                         // 1506
						cycleDuration = dur + this._repeatDelay;                                                                         // 1507
						this._cycle = (this._totalTime / cycleDuration) >> 0; //originally _totalTime % cycleDuration but floating point errors caused problems, so I normalized it. (4 % 0.8 should be 0 but it gets reported as 0.79999999!)
						if (this._cycle !== 0) if (this._cycle === this._totalTime / cycleDuration) {                                    // 1509
							this._cycle--; //otherwise when rendered exactly at the end time, it will act as though it is repeating (at the beginning)
						}                                                                                                                // 1511
						this._time = this._totalTime - (this._cycle * cycleDuration);                                                    // 1512
						if (this._yoyo) if ((this._cycle & 1) !== 0) {                                                                   // 1513
							this._time = dur - this._time;                                                                                  // 1514
						}                                                                                                                // 1515
						if (this._time > dur) {                                                                                          // 1516
							this._time = dur;                                                                                               // 1517
							time = dur + 0.0001; //to avoid occasional floating point rounding error                                        // 1518
						} else if (this._time < 0) {                                                                                     // 1519
							this._time = time = 0;                                                                                          // 1520
						} else {                                                                                                         // 1521
							time = this._time;                                                                                              // 1522
						}                                                                                                                // 1523
					}                                                                                                                 // 1524
				}                                                                                                                  // 1525
			}                                                                                                                   // 1526
                                                                                                                       // 1527
			if (this._cycle !== prevCycle) if (!this._locked) {                                                                 // 1528
				/*                                                                                                                 // 1529
				make sure children at the end/beginning of the timeline are rendered properly. If, for example,                    // 1530
				a 3-second long timeline rendered at 2.9 seconds previously, and now renders at 3.2 seconds (which                 // 1531
				would get transated to 2.8 seconds if the timeline yoyos or 0.2 seconds if it just repeats), there                 // 1532
				could be a callback or a short tween that's at 2.95 or 3 seconds in which wouldn't render. So                      // 1533
				we need to push the timeline to the end (and/or beginning depending on its yoyo value). Also we must               // 1534
				ensure that zero-duration tweens at the very beginning or end of the TimelineMax work.                             // 1535
				*/                                                                                                                 // 1536
				var backwards = (this._yoyo && (prevCycle & 1) !== 0),                                                             // 1537
					wrap = (backwards === (this._yoyo && (this._cycle & 1) !== 0)),                                                   // 1538
					recTotalTime = this._totalTime,                                                                                   // 1539
					recCycle = this._cycle,                                                                                           // 1540
					recRawPrevTime = this._rawPrevTime,                                                                               // 1541
					recTime = this._time;                                                                                             // 1542
                                                                                                                       // 1543
				this._totalTime = prevCycle * dur;                                                                                 // 1544
				if (this._cycle < prevCycle) {                                                                                     // 1545
					backwards = !backwards;                                                                                           // 1546
				} else {                                                                                                           // 1547
					this._totalTime += dur;                                                                                           // 1548
				}                                                                                                                  // 1549
				this._time = prevTime; //temporarily revert _time so that render() renders the children in the correct order. Without this, tweens won't rewind correctly. We could arhictect things in a "cleaner" way by splitting out the rendering queue into a separate method but for performance reasons, we kept it all inside this method.
                                                                                                                       // 1551
				this._rawPrevTime = (dur === 0) ? prevRawPrevTime - 0.0001 : prevRawPrevTime;                                      // 1552
				this._cycle = prevCycle;                                                                                           // 1553
				this._locked = true; //prevents changes to totalTime and skips repeat/yoyo behavior when we recursively call render()
				prevTime = (backwards) ? 0 : dur;                                                                                  // 1555
				this.render(prevTime, suppressEvents, (dur === 0));                                                                // 1556
				if (!suppressEvents) if (!this._gc) {                                                                              // 1557
					if (this.vars.onRepeat) {                                                                                         // 1558
						this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || _blankArray);              // 1559
					}                                                                                                                 // 1560
				}                                                                                                                  // 1561
				if (wrap) {                                                                                                        // 1562
					prevTime = (backwards) ? dur + 0.0001 : -0.0001;                                                                  // 1563
					this.render(prevTime, true, false);                                                                               // 1564
				}                                                                                                                  // 1565
				this._locked = false;                                                                                              // 1566
				if (this._paused && !prevPaused) { //if the render() triggered callback that paused this timeline, we should abort (very rare, but possible)
					return;                                                                                                           // 1568
				}                                                                                                                  // 1569
				this._time = recTime;                                                                                              // 1570
				this._totalTime = recTotalTime;                                                                                    // 1571
				this._cycle = recCycle;                                                                                            // 1572
				this._rawPrevTime = recRawPrevTime;                                                                                // 1573
			}                                                                                                                   // 1574
                                                                                                                       // 1575
			if ((this._time === prevTime || !this._first) && !force && !internalForce) {                                        // 1576
				if (prevTotalTime !== this._totalTime) if (this._onUpdate) if (!suppressEvents) { //so that onUpdate fires even during the repeatDelay - as long as the totalTime changed, we should trigger onUpdate.
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                   // 1578
				}                                                                                                                  // 1579
				return;                                                                                                            // 1580
			} else if (!this._initted) {                                                                                        // 1581
				this._initted = true;                                                                                              // 1582
			}                                                                                                                   // 1583
                                                                                                                       // 1584
			if (!this._active) if (!this._paused && this._totalTime !== prevTotalTime && time > 0) {                            // 1585
				this._active = true;  //so that if the user renders the timeline (as opposed to the parent timeline rendering it), it is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the timeline already finished but the user manually re-renders it as halfway done, for example.
			}                                                                                                                   // 1587
                                                                                                                       // 1588
			if (prevTotalTime === 0) if (this.vars.onStart) if (this._totalTime !== 0) if (!suppressEvents) {                   // 1589
				this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);                   // 1590
			}                                                                                                                   // 1591
                                                                                                                       // 1592
			if (this._time >= prevTime) {                                                                                       // 1593
				tween = this._first;                                                                                               // 1594
				while (tween) {                                                                                                    // 1595
					next = tween._next; //record it here because the value could change after rendering...                            // 1596
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering                           // 1597
						break;                                                                                                           // 1598
					} else if (tween._active || (tween._startTime <= this._time && !tween._paused && !tween._gc)) {                   // 1599
						if (!tween._reversed) {                                                                                          // 1600
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);                              // 1601
						} else {                                                                                                         // 1602
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}                                                                                                                // 1604
                                                                                                                       // 1605
					}                                                                                                                 // 1606
					tween = next;                                                                                                     // 1607
				}                                                                                                                  // 1608
			} else {                                                                                                            // 1609
				tween = this._last;                                                                                                // 1610
				while (tween) {                                                                                                    // 1611
					next = tween._prev; //record it here because the value could change after rendering...                            // 1612
					if (this._paused && !prevPaused) { //in case a tween pauses the timeline when rendering                           // 1613
						break;                                                                                                           // 1614
					} else if (tween._active || (tween._startTime <= prevTime && !tween._paused && !tween._gc)) {                     // 1615
						if (!tween._reversed) {                                                                                          // 1616
							tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);                              // 1617
						} else {                                                                                                         // 1618
							tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
						}                                                                                                                // 1620
					}                                                                                                                 // 1621
					tween = next;                                                                                                     // 1622
				}                                                                                                                  // 1623
			}                                                                                                                   // 1624
                                                                                                                       // 1625
			if (this._onUpdate) if (!suppressEvents) {                                                                          // 1626
				if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onUpdate on a timeline that reports/checks tweened values.
					_lazyRender();                                                                                                    // 1628
				}                                                                                                                  // 1629
				this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                    // 1630
			}                                                                                                                   // 1631
			if (callback) if (!this._locked) if (!this._gc) if (prevStart === this._startTime || prevTimeScale !== this._timeScale) if (this._time === 0 || totalDur >= this.totalDuration()) { //if one of the tweens that was rendered altered this timeline's startTime (like if an onComplete reversed the timeline), it probably isn't complete. If it is, don't worry, because whatever call altered the startTime would complete if it was necessary at the new time. The only exception is the timeScale property. Also check _gc because there's a chance that kill() could be called in an onUpdate
				if (isComplete) {                                                                                                  // 1633
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when a timeline finishes, users expect things to have rendered fully. Imagine an onComplete on a timeline that reports/checks tweened values.
						_lazyRender();                                                                                                   // 1635
					}                                                                                                                 // 1636
					if (this._timeline.autoRemoveChildren) {                                                                          // 1637
						this._enabled(false, false);                                                                                     // 1638
					}                                                                                                                 // 1639
					this._active = false;                                                                                             // 1640
				}                                                                                                                  // 1641
				if (!suppressEvents && this.vars[callback]) {                                                                      // 1642
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);  // 1643
				}                                                                                                                  // 1644
			}                                                                                                                   // 1645
		};                                                                                                                   // 1646
                                                                                                                       // 1647
		p.getActive = function(nested, tweens, timelines) {                                                                  // 1648
			if (nested == null) {                                                                                               // 1649
				nested = true;                                                                                                     // 1650
			}                                                                                                                   // 1651
			if (tweens == null) {                                                                                               // 1652
				tweens = true;                                                                                                     // 1653
			}                                                                                                                   // 1654
			if (timelines == null) {                                                                                            // 1655
				timelines = false;                                                                                                 // 1656
			}                                                                                                                   // 1657
			var a = [],                                                                                                         // 1658
				all = this.getChildren(nested, tweens, timelines),                                                                 // 1659
				cnt = 0,                                                                                                           // 1660
				l = all.length,                                                                                                    // 1661
				i, tween;                                                                                                          // 1662
			for (i = 0; i < l; i++) {                                                                                           // 1663
				tween = all[i];                                                                                                    // 1664
				if (tween.isActive()) {                                                                                            // 1665
					a[cnt++] = tween;                                                                                                 // 1666
				}                                                                                                                  // 1667
			}                                                                                                                   // 1668
			return a;                                                                                                           // 1669
		};                                                                                                                   // 1670
                                                                                                                       // 1671
                                                                                                                       // 1672
		p.getLabelAfter = function(time) {                                                                                   // 1673
			if (!time) if (time !== 0) { //faster than isNan()                                                                  // 1674
				time = this._time;                                                                                                 // 1675
			}                                                                                                                   // 1676
			var labels = this.getLabelsArray(),                                                                                 // 1677
				l = labels.length,                                                                                                 // 1678
				i;                                                                                                                 // 1679
			for (i = 0; i < l; i++) {                                                                                           // 1680
				if (labels[i].time > time) {                                                                                       // 1681
					return labels[i].name;                                                                                            // 1682
				}                                                                                                                  // 1683
			}                                                                                                                   // 1684
			return null;                                                                                                        // 1685
		};                                                                                                                   // 1686
                                                                                                                       // 1687
		p.getLabelBefore = function(time) {                                                                                  // 1688
			if (time == null) {                                                                                                 // 1689
				time = this._time;                                                                                                 // 1690
			}                                                                                                                   // 1691
			var labels = this.getLabelsArray(),                                                                                 // 1692
				i = labels.length;                                                                                                 // 1693
			while (--i > -1) {                                                                                                  // 1694
				if (labels[i].time < time) {                                                                                       // 1695
					return labels[i].name;                                                                                            // 1696
				}                                                                                                                  // 1697
			}                                                                                                                   // 1698
			return null;                                                                                                        // 1699
		};                                                                                                                   // 1700
                                                                                                                       // 1701
		p.getLabelsArray = function() {                                                                                      // 1702
			var a = [],                                                                                                         // 1703
				cnt = 0,                                                                                                           // 1704
				p;                                                                                                                 // 1705
			for (p in this._labels) {                                                                                           // 1706
				a[cnt++] = {time:this._labels[p], name:p};                                                                         // 1707
			}                                                                                                                   // 1708
			a.sort(function(a,b) {                                                                                              // 1709
				return a.time - b.time;                                                                                            // 1710
			});                                                                                                                 // 1711
			return a;                                                                                                           // 1712
		};                                                                                                                   // 1713
                                                                                                                       // 1714
                                                                                                                       // 1715
//---- GETTERS / SETTERS -------------------------------------------------------------------------------------------------------
                                                                                                                       // 1717
		p.progress = function(value, suppressEvents) {                                                                       // 1718
			return (!arguments.length) ? this._time / this.duration() : this.totalTime( this.duration() * ((this._yoyo && (this._cycle & 1) !== 0) ? 1 - value : value) + (this._cycle * (this._duration + this._repeatDelay)), suppressEvents);
		};                                                                                                                   // 1720
                                                                                                                       // 1721
		p.totalProgress = function(value, suppressEvents) {                                                                  // 1722
			return (!arguments.length) ? this._totalTime / this.totalDuration() : this.totalTime( this.totalDuration() * value, suppressEvents);
		};                                                                                                                   // 1724
                                                                                                                       // 1725
		p.totalDuration = function(value) {                                                                                  // 1726
			if (!arguments.length) {                                                                                            // 1727
				if (this._dirty) {                                                                                                 // 1728
					TimelineLite.prototype.totalDuration.call(this); //just forces refresh                                            // 1729
					//Instead of Infinity, we use 999999999999 so that we can accommodate reverses.                                   // 1730
					this._totalDuration = (this._repeat === -1) ? 999999999999 : this._duration * (this._repeat + 1) + (this._repeatDelay * this._repeat);
				}                                                                                                                  // 1732
				return this._totalDuration;                                                                                        // 1733
			}                                                                                                                   // 1734
			return (this._repeat === -1) ? this : this.duration( (value - (this._repeat * this._repeatDelay)) / (this._repeat + 1) );
		};                                                                                                                   // 1736
                                                                                                                       // 1737
		p.time = function(value, suppressEvents) {                                                                           // 1738
			if (!arguments.length) {                                                                                            // 1739
				return this._time;                                                                                                 // 1740
			}                                                                                                                   // 1741
			if (this._dirty) {                                                                                                  // 1742
				this.totalDuration();                                                                                              // 1743
			}                                                                                                                   // 1744
			if (value > this._duration) {                                                                                       // 1745
				value = this._duration;                                                                                            // 1746
			}                                                                                                                   // 1747
			if (this._yoyo && (this._cycle & 1) !== 0) {                                                                        // 1748
				value = (this._duration - value) + (this._cycle * (this._duration + this._repeatDelay));                           // 1749
			} else if (this._repeat !== 0) {                                                                                    // 1750
				value += this._cycle * (this._duration + this._repeatDelay);                                                       // 1751
			}                                                                                                                   // 1752
			return this.totalTime(value, suppressEvents);                                                                       // 1753
		};                                                                                                                   // 1754
                                                                                                                       // 1755
		p.repeat = function(value) {                                                                                         // 1756
			if (!arguments.length) {                                                                                            // 1757
				return this._repeat;                                                                                               // 1758
			}                                                                                                                   // 1759
			this._repeat = value;                                                                                               // 1760
			return this._uncache(true);                                                                                         // 1761
		};                                                                                                                   // 1762
                                                                                                                       // 1763
		p.repeatDelay = function(value) {                                                                                    // 1764
			if (!arguments.length) {                                                                                            // 1765
				return this._repeatDelay;                                                                                          // 1766
			}                                                                                                                   // 1767
			this._repeatDelay = value;                                                                                          // 1768
			return this._uncache(true);                                                                                         // 1769
		};                                                                                                                   // 1770
                                                                                                                       // 1771
		p.yoyo = function(value) {                                                                                           // 1772
			if (!arguments.length) {                                                                                            // 1773
				return this._yoyo;                                                                                                 // 1774
			}                                                                                                                   // 1775
			this._yoyo = value;                                                                                                 // 1776
			return this;                                                                                                        // 1777
		};                                                                                                                   // 1778
                                                                                                                       // 1779
		p.currentLabel = function(value) {                                                                                   // 1780
			if (!arguments.length) {                                                                                            // 1781
				return this.getLabelBefore(this._time + 0.00000001);                                                               // 1782
			}                                                                                                                   // 1783
			return this.seek(value, true);                                                                                      // 1784
		};                                                                                                                   // 1785
                                                                                                                       // 1786
		return TimelineMax;                                                                                                  // 1787
                                                                                                                       // 1788
	}, true);                                                                                                             // 1789
	                                                                                                                      // 1790
                                                                                                                       // 1791
                                                                                                                       // 1792
                                                                                                                       // 1793
                                                                                                                       // 1794
	                                                                                                                      // 1795
	                                                                                                                      // 1796
	                                                                                                                      // 1797
	                                                                                                                      // 1798
	                                                                                                                      // 1799
	                                                                                                                      // 1800
	                                                                                                                      // 1801
/*                                                                                                                     // 1802
 * ----------------------------------------------------------------                                                    // 1803
 * BezierPlugin                                                                                                        // 1804
 * ----------------------------------------------------------------                                                    // 1805
 */                                                                                                                    // 1806
	(function() {                                                                                                         // 1807
                                                                                                                       // 1808
		var _RAD2DEG = 180 / Math.PI,                                                                                        // 1809
			_r1 = [],                                                                                                           // 1810
			_r2 = [],                                                                                                           // 1811
			_r3 = [],                                                                                                           // 1812
			_corProps = {},                                                                                                     // 1813
			_globals = _gsScope._gsDefine.globals,                                                                              // 1814
			Segment = function(a, b, c, d) {                                                                                    // 1815
				this.a = a;                                                                                                        // 1816
				this.b = b;                                                                                                        // 1817
				this.c = c;                                                                                                        // 1818
				this.d = d;                                                                                                        // 1819
				this.da = d - a;                                                                                                   // 1820
				this.ca = c - a;                                                                                                   // 1821
				this.ba = b - a;                                                                                                   // 1822
			},                                                                                                                  // 1823
			_correlate = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
			cubicToQuadratic = function(a, b, c, d) {                                                                           // 1825
				var q1 = {a:a},                                                                                                    // 1826
					q2 = {},                                                                                                          // 1827
					q3 = {},                                                                                                          // 1828
					q4 = {c:d},                                                                                                       // 1829
					mab = (a + b) / 2,                                                                                                // 1830
					mbc = (b + c) / 2,                                                                                                // 1831
					mcd = (c + d) / 2,                                                                                                // 1832
					mabc = (mab + mbc) / 2,                                                                                           // 1833
					mbcd = (mbc + mcd) / 2,                                                                                           // 1834
					m8 = (mbcd - mabc) / 8;                                                                                           // 1835
				q1.b = mab + (a - mab) / 4;                                                                                        // 1836
				q2.b = mabc + m8;                                                                                                  // 1837
				q1.c = q2.a = (q1.b + q2.b) / 2;                                                                                   // 1838
				q2.c = q3.a = (mabc + mbcd) / 2;                                                                                   // 1839
				q3.b = mbcd - m8;                                                                                                  // 1840
				q4.b = mcd + (d - mcd) / 4;                                                                                        // 1841
				q3.c = q4.a = (q3.b + q4.b) / 2;                                                                                   // 1842
				return [q1, q2, q3, q4];                                                                                           // 1843
			},                                                                                                                  // 1844
			_calculateControlPoints = function(a, curviness, quad, basic, correlate) {                                          // 1845
				var l = a.length - 1,                                                                                              // 1846
					ii = 0,                                                                                                           // 1847
					cp1 = a[0].a,                                                                                                     // 1848
					i, p1, p2, p3, seg, m1, m2, mm, cp2, qb, r1, r2, tl;                                                              // 1849
				for (i = 0; i < l; i++) {                                                                                          // 1850
					seg = a[ii];                                                                                                      // 1851
					p1 = seg.a;                                                                                                       // 1852
					p2 = seg.d;                                                                                                       // 1853
					p3 = a[ii+1].d;                                                                                                   // 1854
                                                                                                                       // 1855
					if (correlate) {                                                                                                  // 1856
						r1 = _r1[i];                                                                                                     // 1857
						r2 = _r2[i];                                                                                                     // 1858
						tl = ((r2 + r1) * curviness * 0.25) / (basic ? 0.5 : _r3[i] || 0.5);                                             // 1859
						m1 = p2 - (p2 - p1) * (basic ? curviness * 0.5 : (r1 !== 0 ? tl / r1 : 0));                                      // 1860
						m2 = p2 + (p3 - p2) * (basic ? curviness * 0.5 : (r2 !== 0 ? tl / r2 : 0));                                      // 1861
						mm = p2 - (m1 + (((m2 - m1) * ((r1 * 3 / (r1 + r2)) + 0.5) / 4) || 0));                                          // 1862
					} else {                                                                                                          // 1863
						m1 = p2 - (p2 - p1) * curviness * 0.5;                                                                           // 1864
						m2 = p2 + (p3 - p2) * curviness * 0.5;                                                                           // 1865
						mm = p2 - (m1 + m2) / 2;                                                                                         // 1866
					}                                                                                                                 // 1867
					m1 += mm;                                                                                                         // 1868
					m2 += mm;                                                                                                         // 1869
                                                                                                                       // 1870
					seg.c = cp2 = m1;                                                                                                 // 1871
					if (i !== 0) {                                                                                                    // 1872
						seg.b = cp1;                                                                                                     // 1873
					} else {                                                                                                          // 1874
						seg.b = cp1 = seg.a + (seg.c - seg.a) * 0.6; //instead of placing b on a exactly, we move it inline with c so that if the user specifies an ease like Back.easeIn or Elastic.easeIn which goes BEYOND the beginning, it will do so smoothly.
					}                                                                                                                 // 1876
                                                                                                                       // 1877
					seg.da = p2 - p1;                                                                                                 // 1878
					seg.ca = cp2 - p1;                                                                                                // 1879
					seg.ba = cp1 - p1;                                                                                                // 1880
                                                                                                                       // 1881
					if (quad) {                                                                                                       // 1882
						qb = cubicToQuadratic(p1, cp1, cp2, p2);                                                                         // 1883
						a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);                                                                     // 1884
						ii += 4;                                                                                                         // 1885
					} else {                                                                                                          // 1886
						ii++;                                                                                                            // 1887
					}                                                                                                                 // 1888
                                                                                                                       // 1889
					cp1 = m2;                                                                                                         // 1890
				}                                                                                                                  // 1891
				seg = a[ii];                                                                                                       // 1892
				seg.b = cp1;                                                                                                       // 1893
				seg.c = cp1 + (seg.d - cp1) * 0.4; //instead of placing c on d exactly, we move it inline with b so that if the user specifies an ease like Back.easeOut or Elastic.easeOut which goes BEYOND the end, it will do so smoothly.
				seg.da = seg.d - seg.a;                                                                                            // 1895
				seg.ca = seg.c - seg.a;                                                                                            // 1896
				seg.ba = cp1 - seg.a;                                                                                              // 1897
				if (quad) {                                                                                                        // 1898
					qb = cubicToQuadratic(seg.a, cp1, seg.c, seg.d);                                                                  // 1899
					a.splice(ii, 1, qb[0], qb[1], qb[2], qb[3]);                                                                      // 1900
				}                                                                                                                  // 1901
			},                                                                                                                  // 1902
			_parseAnchors = function(values, p, correlate, prepend) {                                                           // 1903
				var a = [],                                                                                                        // 1904
					l, i, p1, p2, p3, tmp;                                                                                            // 1905
				if (prepend) {                                                                                                     // 1906
					values = [prepend].concat(values);                                                                                // 1907
					i = values.length;                                                                                                // 1908
					while (--i > -1) {                                                                                                // 1909
						if (typeof( (tmp = values[i][p]) ) === "string") if (tmp.charAt(1) === "=") {                                    // 1910
							values[i][p] = prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)); //accommodate relative values. Do it inline instead of breaking it out into a function for speed reasons
						}                                                                                                                // 1912
					}                                                                                                                 // 1913
				}                                                                                                                  // 1914
				l = values.length - 2;                                                                                             // 1915
				if (l < 0) {                                                                                                       // 1916
					a[0] = new Segment(values[0][p], 0, 0, values[(l < -1) ? 0 : 1][p]);                                              // 1917
					return a;                                                                                                         // 1918
				}                                                                                                                  // 1919
				for (i = 0; i < l; i++) {                                                                                          // 1920
					p1 = values[i][p];                                                                                                // 1921
					p2 = values[i+1][p];                                                                                              // 1922
					a[i] = new Segment(p1, 0, 0, p2);                                                                                 // 1923
					if (correlate) {                                                                                                  // 1924
						p3 = values[i+2][p];                                                                                             // 1925
						_r1[i] = (_r1[i] || 0) + (p2 - p1) * (p2 - p1);                                                                  // 1926
						_r2[i] = (_r2[i] || 0) + (p3 - p2) * (p3 - p2);                                                                  // 1927
					}                                                                                                                 // 1928
				}                                                                                                                  // 1929
				a[i] = new Segment(values[i][p], 0, 0, values[i+1][p]);                                                            // 1930
				return a;                                                                                                          // 1931
			},                                                                                                                  // 1932
			bezierThrough = function(values, curviness, quadratic, basic, correlate, prepend) {                                 // 1933
				var obj = {},                                                                                                      // 1934
					props = [],                                                                                                       // 1935
					first = prepend || values[0],                                                                                     // 1936
					i, p, a, j, r, l, seamless, last;                                                                                 // 1937
				correlate = (typeof(correlate) === "string") ? ","+correlate+"," : _correlate;                                     // 1938
				if (curviness == null) {                                                                                           // 1939
					curviness = 1;                                                                                                    // 1940
				}                                                                                                                  // 1941
				for (p in values[0]) {                                                                                             // 1942
					props.push(p);                                                                                                    // 1943
				}                                                                                                                  // 1944
				//check to see if the last and first values are identical (well, within 0.05). If so, make seamless by appending the second element to the very end of the values array and the 2nd-to-last element to the very beginning (we'll remove those segments later)
				if (values.length > 1) {                                                                                           // 1946
					last = values[values.length - 1];                                                                                 // 1947
					seamless = true;                                                                                                  // 1948
					i = props.length;                                                                                                 // 1949
					while (--i > -1) {                                                                                                // 1950
						p = props[i];                                                                                                    // 1951
						if (Math.abs(first[p] - last[p]) > 0.05) { //build in a tolerance of +/-0.05 to accommodate rounding errors. For example, if you set an object's position to 4.945, Flash will make it 4.9
							seamless = false;                                                                                               // 1953
							break;                                                                                                          // 1954
						}                                                                                                                // 1955
					}                                                                                                                 // 1956
					if (seamless) {                                                                                                   // 1957
						values = values.concat(); //duplicate the array to avoid contaminating the original which the user may be reusing for other tweens
						if (prepend) {                                                                                                   // 1959
							values.unshift(prepend);                                                                                        // 1960
						}                                                                                                                // 1961
						values.push(values[1]);                                                                                          // 1962
						prepend = values[values.length - 3];                                                                             // 1963
					}                                                                                                                 // 1964
				}                                                                                                                  // 1965
				_r1.length = _r2.length = _r3.length = 0;                                                                          // 1966
				i = props.length;                                                                                                  // 1967
				while (--i > -1) {                                                                                                 // 1968
					p = props[i];                                                                                                     // 1969
					_corProps[p] = (correlate.indexOf(","+p+",") !== -1);                                                             // 1970
					obj[p] = _parseAnchors(values, p, _corProps[p], prepend);                                                         // 1971
				}                                                                                                                  // 1972
				i = _r1.length;                                                                                                    // 1973
				while (--i > -1) {                                                                                                 // 1974
					_r1[i] = Math.sqrt(_r1[i]);                                                                                       // 1975
					_r2[i] = Math.sqrt(_r2[i]);                                                                                       // 1976
				}                                                                                                                  // 1977
				if (!basic) {                                                                                                      // 1978
					i = props.length;                                                                                                 // 1979
					while (--i > -1) {                                                                                                // 1980
						if (_corProps[p]) {                                                                                              // 1981
							a = obj[props[i]];                                                                                              // 1982
							l = a.length - 1;                                                                                               // 1983
							for (j = 0; j < l; j++) {                                                                                       // 1984
								r = a[j+1].da / _r2[j] + a[j].da / _r1[j];                                                                     // 1985
								_r3[j] = (_r3[j] || 0) + r * r;                                                                                // 1986
							}                                                                                                               // 1987
						}                                                                                                                // 1988
					}                                                                                                                 // 1989
					i = _r3.length;                                                                                                   // 1990
					while (--i > -1) {                                                                                                // 1991
						_r3[i] = Math.sqrt(_r3[i]);                                                                                      // 1992
					}                                                                                                                 // 1993
				}                                                                                                                  // 1994
				i = props.length;                                                                                                  // 1995
				j = quadratic ? 4 : 1;                                                                                             // 1996
				while (--i > -1) {                                                                                                 // 1997
					p = props[i];                                                                                                     // 1998
					a = obj[p];                                                                                                       // 1999
					_calculateControlPoints(a, curviness, quadratic, basic, _corProps[p]); //this method requires that _parseAnchors() and _setSegmentRatios() ran first so that _r1, _r2, and _r3 values are populated for all properties
					if (seamless) {                                                                                                   // 2001
						a.splice(0, j);                                                                                                  // 2002
						a.splice(a.length - j, j);                                                                                       // 2003
					}                                                                                                                 // 2004
				}                                                                                                                  // 2005
				return obj;                                                                                                        // 2006
			},                                                                                                                  // 2007
			_parseBezierData = function(values, type, prepend) {                                                                // 2008
				type = type || "soft";                                                                                             // 2009
				var obj = {},                                                                                                      // 2010
					inc = (type === "cubic") ? 3 : 2,                                                                                 // 2011
					soft = (type === "soft"),                                                                                         // 2012
					props = [],                                                                                                       // 2013
					a, b, c, d, cur, i, j, l, p, cnt, tmp;                                                                            // 2014
				if (soft && prepend) {                                                                                             // 2015
					values = [prepend].concat(values);                                                                                // 2016
				}                                                                                                                  // 2017
				if (values == null || values.length < inc + 1) { throw "invalid Bezier data"; }                                    // 2018
				for (p in values[0]) {                                                                                             // 2019
					props.push(p);                                                                                                    // 2020
				}                                                                                                                  // 2021
				i = props.length;                                                                                                  // 2022
				while (--i > -1) {                                                                                                 // 2023
					p = props[i];                                                                                                     // 2024
					obj[p] = cur = [];                                                                                                // 2025
					cnt = 0;                                                                                                          // 2026
					l = values.length;                                                                                                // 2027
					for (j = 0; j < l; j++) {                                                                                         // 2028
						a = (prepend == null) ? values[j][p] : (typeof( (tmp = values[j][p]) ) === "string" && tmp.charAt(1) === "=") ? prepend[p] + Number(tmp.charAt(0) + tmp.substr(2)) : Number(tmp);
						if (soft) if (j > 1) if (j < l - 1) {                                                                            // 2030
							cur[cnt++] = (a + cur[cnt-2]) / 2;                                                                              // 2031
						}                                                                                                                // 2032
						cur[cnt++] = a;                                                                                                  // 2033
					}                                                                                                                 // 2034
					l = cnt - inc + 1;                                                                                                // 2035
					cnt = 0;                                                                                                          // 2036
					for (j = 0; j < l; j += inc) {                                                                                    // 2037
						a = cur[j];                                                                                                      // 2038
						b = cur[j+1];                                                                                                    // 2039
						c = cur[j+2];                                                                                                    // 2040
						d = (inc === 2) ? 0 : cur[j+3];                                                                                  // 2041
						cur[cnt++] = tmp = (inc === 3) ? new Segment(a, b, c, d) : new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);  // 2042
					}                                                                                                                 // 2043
					cur.length = cnt;                                                                                                 // 2044
				}                                                                                                                  // 2045
				return obj;                                                                                                        // 2046
			},                                                                                                                  // 2047
			_addCubicLengths = function(a, steps, resolution) {                                                                 // 2048
				var inc = 1 / resolution,                                                                                          // 2049
					j = a.length,                                                                                                     // 2050
					d, d1, s, da, ca, ba, p, i, inv, bez, index;                                                                      // 2051
				while (--j > -1) {                                                                                                 // 2052
					bez = a[j];                                                                                                       // 2053
					s = bez.a;                                                                                                        // 2054
					da = bez.d - s;                                                                                                   // 2055
					ca = bez.c - s;                                                                                                   // 2056
					ba = bez.b - s;                                                                                                   // 2057
					d = d1 = 0;                                                                                                       // 2058
					for (i = 1; i <= resolution; i++) {                                                                               // 2059
						p = inc * i;                                                                                                     // 2060
						inv = 1 - p;                                                                                                     // 2061
						d = d1 - (d1 = (p * p * da + 3 * inv * (p * ca + inv * ba)) * p);                                                // 2062
						index = j * resolution + i - 1;                                                                                  // 2063
						steps[index] = (steps[index] || 0) + d * d;                                                                      // 2064
					}                                                                                                                 // 2065
				}                                                                                                                  // 2066
			},                                                                                                                  // 2067
			_parseLengthData = function(obj, resolution) {                                                                      // 2068
				resolution = resolution >> 0 || 6;                                                                                 // 2069
				var a = [],                                                                                                        // 2070
					lengths = [],                                                                                                     // 2071
					d = 0,                                                                                                            // 2072
					total = 0,                                                                                                        // 2073
					threshold = resolution - 1,                                                                                       // 2074
					segments = [],                                                                                                    // 2075
					curLS = [], //current length segments array                                                                       // 2076
					p, i, l, index;                                                                                                   // 2077
				for (p in obj) {                                                                                                   // 2078
					_addCubicLengths(obj[p], a, resolution);                                                                          // 2079
				}                                                                                                                  // 2080
				l = a.length;                                                                                                      // 2081
				for (i = 0; i < l; i++) {                                                                                          // 2082
					d += Math.sqrt(a[i]);                                                                                             // 2083
					index = i % resolution;                                                                                           // 2084
					curLS[index] = d;                                                                                                 // 2085
					if (index === threshold) {                                                                                        // 2086
						total += d;                                                                                                      // 2087
						index = (i / resolution) >> 0;                                                                                   // 2088
						segments[index] = curLS;                                                                                         // 2089
						lengths[index] = total;                                                                                          // 2090
						d = 0;                                                                                                           // 2091
						curLS = [];                                                                                                      // 2092
					}                                                                                                                 // 2093
				}                                                                                                                  // 2094
				return {length:total, lengths:lengths, segments:segments};                                                         // 2095
			},                                                                                                                  // 2096
                                                                                                                       // 2097
                                                                                                                       // 2098
                                                                                                                       // 2099
			BezierPlugin = _gsScope._gsDefine.plugin({                                                                          // 2100
					propName: "bezier",                                                                                               // 2101
					priority: -1,                                                                                                     // 2102
					version: "1.3.4",                                                                                                 // 2103
					API: 2,                                                                                                           // 2104
					global:true,                                                                                                      // 2105
                                                                                                                       // 2106
					//gets called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
					init: function(target, vars, tween) {                                                                             // 2108
						this._target = target;                                                                                           // 2109
						if (vars instanceof Array) {                                                                                     // 2110
							vars = {values:vars};                                                                                           // 2111
						}                                                                                                                // 2112
						this._func = {};                                                                                                 // 2113
						this._round = {};                                                                                                // 2114
						this._props = [];                                                                                                // 2115
						this._timeRes = (vars.timeResolution == null) ? 6 : parseInt(vars.timeResolution, 10);                           // 2116
						var values = vars.values || [],                                                                                  // 2117
							first = {},                                                                                                     // 2118
							second = values[0],                                                                                             // 2119
							autoRotate = vars.autoRotate || tween.vars.orientToBezier,                                                      // 2120
							p, isFunc, i, j, prepend;                                                                                       // 2121
                                                                                                                       // 2122
						this._autoRotate = autoRotate ? (autoRotate instanceof Array) ? autoRotate : [["x","y","rotation",((autoRotate === true) ? 0 : Number(autoRotate) || 0)]] : null;
						for (p in second) {                                                                                              // 2124
							this._props.push(p);                                                                                            // 2125
						}                                                                                                                // 2126
                                                                                                                       // 2127
						i = this._props.length;                                                                                          // 2128
						while (--i > -1) {                                                                                               // 2129
							p = this._props[i];                                                                                             // 2130
                                                                                                                       // 2131
							this._overwriteProps.push(p);                                                                                   // 2132
							isFunc = this._func[p] = (typeof(target[p]) === "function");                                                    // 2133
							first[p] = (!isFunc) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
							if (!prepend) if (first[p] !== values[0][p]) {                                                                  // 2135
								prepend = first;                                                                                               // 2136
							}                                                                                                               // 2137
						}                                                                                                                // 2138
						this._beziers = (vars.type !== "cubic" && vars.type !== "quadratic" && vars.type !== "soft") ? bezierThrough(values, isNaN(vars.curviness) ? 1 : vars.curviness, false, (vars.type === "thruBasic"), vars.correlate, prepend) : _parseBezierData(values, vars.type, first);
						this._segCount = this._beziers[p].length;                                                                        // 2140
                                                                                                                       // 2141
						if (this._timeRes) {                                                                                             // 2142
							var ld = _parseLengthData(this._beziers, this._timeRes);                                                        // 2143
							this._length = ld.length;                                                                                       // 2144
							this._lengths = ld.lengths;                                                                                     // 2145
							this._segments = ld.segments;                                                                                   // 2146
							this._l1 = this._li = this._s1 = this._si = 0;                                                                  // 2147
							this._l2 = this._lengths[0];                                                                                    // 2148
							this._curSeg = this._segments[0];                                                                               // 2149
							this._s2 = this._curSeg[0];                                                                                     // 2150
							this._prec = 1 / this._curSeg.length;                                                                           // 2151
						}                                                                                                                // 2152
                                                                                                                       // 2153
						if ((autoRotate = this._autoRotate)) {                                                                           // 2154
							this._initialRotations = [];                                                                                    // 2155
							if (!(autoRotate[0] instanceof Array)) {                                                                        // 2156
								this._autoRotate = autoRotate = [autoRotate];                                                                  // 2157
							}                                                                                                               // 2158
							i = autoRotate.length;                                                                                          // 2159
							while (--i > -1) {                                                                                              // 2160
								for (j = 0; j < 3; j++) {                                                                                      // 2161
									p = autoRotate[i][j];                                                                                         // 2162
									this._func[p] = (typeof(target[p]) === "function") ? target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ] : false;
								}                                                                                                              // 2164
								p = autoRotate[i][2];                                                                                          // 2165
								this._initialRotations[i] = this._func[p] ? this._func[p].call(this._target) : this._target[p];                // 2166
							}                                                                                                               // 2167
						}                                                                                                                // 2168
						this._startRatio = tween.vars.runBackwards ? 1 : 0; //we determine the starting ratio when the tween inits which is always 0 unless the tween has runBackwards:true (indicating it's a from() tween) in which case it's 1.
						return true;                                                                                                     // 2170
					},                                                                                                                // 2171
                                                                                                                       // 2172
					//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
					set: function(v) {                                                                                                // 2174
						var segments = this._segCount,                                                                                   // 2175
							func = this._func,                                                                                              // 2176
							target = this._target,                                                                                          // 2177
							notStart = (v !== this._startRatio),                                                                            // 2178
							curIndex, inv, i, p, b, t, val, l, lengths, curSeg;                                                             // 2179
						if (!this._timeRes) {                                                                                            // 2180
							curIndex = (v < 0) ? 0 : (v >= 1) ? segments - 1 : (segments * v) >> 0;                                         // 2181
							t = (v - (curIndex * (1 / segments))) * segments;                                                               // 2182
						} else {                                                                                                         // 2183
							lengths = this._lengths;                                                                                        // 2184
							curSeg = this._curSeg;                                                                                          // 2185
							v *= this._length;                                                                                              // 2186
							i = this._li;                                                                                                   // 2187
							//find the appropriate segment (if the currently cached one isn't correct)                                      // 2188
							if (v > this._l2 && i < segments - 1) {                                                                         // 2189
								l = segments - 1;                                                                                              // 2190
								while (i < l && (this._l2 = lengths[++i]) <= v) {	}                                                            // 2191
								this._l1 = lengths[i-1];                                                                                       // 2192
								this._li = i;                                                                                                  // 2193
								this._curSeg = curSeg = this._segments[i];                                                                     // 2194
								this._s2 = curSeg[(this._s1 = this._si = 0)];                                                                  // 2195
							} else if (v < this._l1 && i > 0) {                                                                             // 2196
								while (i > 0 && (this._l1 = lengths[--i]) >= v) { }                                                            // 2197
								if (i === 0 && v < this._l1) {                                                                                 // 2198
									this._l1 = 0;                                                                                                 // 2199
								} else {                                                                                                       // 2200
									i++;                                                                                                          // 2201
								}                                                                                                              // 2202
								this._l2 = lengths[i];                                                                                         // 2203
								this._li = i;                                                                                                  // 2204
								this._curSeg = curSeg = this._segments[i];                                                                     // 2205
								this._s1 = curSeg[(this._si = curSeg.length - 1) - 1] || 0;                                                    // 2206
								this._s2 = curSeg[this._si];                                                                                   // 2207
							}                                                                                                               // 2208
							curIndex = i;                                                                                                   // 2209
							//now find the appropriate sub-segment (we split it into the number of pieces that was defined by "precision" and measured each one)
							v -= this._l1;                                                                                                  // 2211
							i = this._si;                                                                                                   // 2212
							if (v > this._s2 && i < curSeg.length - 1) {                                                                    // 2213
								l = curSeg.length - 1;                                                                                         // 2214
								while (i < l && (this._s2 = curSeg[++i]) <= v) {	}                                                             // 2215
								this._s1 = curSeg[i-1];                                                                                        // 2216
								this._si = i;                                                                                                  // 2217
							} else if (v < this._s1 && i > 0) {                                                                             // 2218
								while (i > 0 && (this._s1 = curSeg[--i]) >= v) {	}                                                             // 2219
								if (i === 0 && v < this._s1) {                                                                                 // 2220
									this._s1 = 0;                                                                                                 // 2221
								} else {                                                                                                       // 2222
									i++;                                                                                                          // 2223
								}                                                                                                              // 2224
								this._s2 = curSeg[i];                                                                                          // 2225
								this._si = i;                                                                                                  // 2226
							}                                                                                                               // 2227
							t = (i + (v - this._s1) / (this._s2 - this._s1)) * this._prec;                                                  // 2228
						}                                                                                                                // 2229
						inv = 1 - t;                                                                                                     // 2230
                                                                                                                       // 2231
						i = this._props.length;                                                                                          // 2232
						while (--i > -1) {                                                                                               // 2233
							p = this._props[i];                                                                                             // 2234
							b = this._beziers[p][curIndex];                                                                                 // 2235
							val = (t * t * b.da + 3 * inv * (t * b.ca + inv * b.ba)) * t + b.a;                                             // 2236
							if (this._round[p]) {                                                                                           // 2237
								val = Math.round(val);                                                                                         // 2238
							}                                                                                                               // 2239
							if (func[p]) {                                                                                                  // 2240
								target[p](val);                                                                                                // 2241
							} else {                                                                                                        // 2242
								target[p] = val;                                                                                               // 2243
							}                                                                                                               // 2244
						}                                                                                                                // 2245
                                                                                                                       // 2246
						if (this._autoRotate) {                                                                                          // 2247
							var ar = this._autoRotate,                                                                                      // 2248
								b2, x1, y1, x2, y2, add, conv;                                                                                 // 2249
							i = ar.length;                                                                                                  // 2250
							while (--i > -1) {                                                                                              // 2251
								p = ar[i][2];                                                                                                  // 2252
								add = ar[i][3] || 0;                                                                                           // 2253
								conv = (ar[i][4] === true) ? 1 : _RAD2DEG;                                                                     // 2254
								b = this._beziers[ar[i][0]];                                                                                   // 2255
								b2 = this._beziers[ar[i][1]];                                                                                  // 2256
                                                                                                                       // 2257
								if (b && b2) { //in case one of the properties got overwritten.                                                // 2258
									b = b[curIndex];                                                                                              // 2259
									b2 = b2[curIndex];                                                                                            // 2260
                                                                                                                       // 2261
									x1 = b.a + (b.b - b.a) * t;                                                                                   // 2262
									x2 = b.b + (b.c - b.b) * t;                                                                                   // 2263
									x1 += (x2 - x1) * t;                                                                                          // 2264
									x2 += ((b.c + (b.d - b.c) * t) - x2) * t;                                                                     // 2265
                                                                                                                       // 2266
									y1 = b2.a + (b2.b - b2.a) * t;                                                                                // 2267
									y2 = b2.b + (b2.c - b2.b) * t;                                                                                // 2268
									y1 += (y2 - y1) * t;                                                                                          // 2269
									y2 += ((b2.c + (b2.d - b2.c) * t) - y2) * t;                                                                  // 2270
                                                                                                                       // 2271
									val = notStart ? Math.atan2(y2 - y1, x2 - x1) * conv + add : this._initialRotations[i];                       // 2272
                                                                                                                       // 2273
									if (func[p]) {                                                                                                // 2274
										target[p](val);                                                                                              // 2275
									} else {                                                                                                      // 2276
										target[p] = val;                                                                                             // 2277
									}                                                                                                             // 2278
								}                                                                                                              // 2279
							}                                                                                                               // 2280
						}                                                                                                                // 2281
					}                                                                                                                 // 2282
			}),                                                                                                                 // 2283
			p = BezierPlugin.prototype;                                                                                         // 2284
                                                                                                                       // 2285
                                                                                                                       // 2286
		BezierPlugin.bezierThrough = bezierThrough;                                                                          // 2287
		BezierPlugin.cubicToQuadratic = cubicToQuadratic;                                                                    // 2288
		BezierPlugin._autoCSS = true; //indicates that this plugin can be inserted into the "css" object using the autoCSS feature of TweenLite
		BezierPlugin.quadraticToCubic = function(a, b, c) {                                                                  // 2290
			return new Segment(a, (2 * b + a) / 3, (2 * b + c) / 3, c);                                                         // 2291
		};                                                                                                                   // 2292
                                                                                                                       // 2293
		BezierPlugin._cssRegister = function() {                                                                             // 2294
			var CSSPlugin = _globals.CSSPlugin;                                                                                 // 2295
			if (!CSSPlugin) {                                                                                                   // 2296
				return;                                                                                                            // 2297
			}                                                                                                                   // 2298
			var _internals = CSSPlugin._internals,                                                                              // 2299
				_parseToProxy = _internals._parseToProxy,                                                                          // 2300
				_setPluginRatio = _internals._setPluginRatio,                                                                      // 2301
				CSSPropTween = _internals.CSSPropTween;                                                                            // 2302
			_internals._registerComplexSpecialProp("bezier", {parser:function(t, e, prop, cssp, pt, plugin) {                   // 2303
				if (e instanceof Array) {                                                                                          // 2304
					e = {values:e};                                                                                                   // 2305
				}                                                                                                                  // 2306
				plugin = new BezierPlugin();                                                                                       // 2307
				var values = e.values,                                                                                             // 2308
					l = values.length - 1,                                                                                            // 2309
					pluginValues = [],                                                                                                // 2310
					v = {},                                                                                                           // 2311
					i, p, data;                                                                                                       // 2312
				if (l < 0) {                                                                                                       // 2313
					return pt;                                                                                                        // 2314
				}                                                                                                                  // 2315
				for (i = 0; i <= l; i++) {                                                                                         // 2316
					data = _parseToProxy(t, values[i], cssp, pt, plugin, (l !== i));                                                  // 2317
					pluginValues[i] = data.end;                                                                                       // 2318
				}                                                                                                                  // 2319
				for (p in e) {                                                                                                     // 2320
					v[p] = e[p]; //duplicate the vars object because we need to alter some things which would cause problems if the user plans to reuse the same vars object for another tween.
				}                                                                                                                  // 2322
				v.values = pluginValues;                                                                                           // 2323
				pt = new CSSPropTween(t, "bezier", 0, 0, data.pt, 2);                                                              // 2324
				pt.data = data;                                                                                                    // 2325
				pt.plugin = plugin;                                                                                                // 2326
				pt.setRatio = _setPluginRatio;                                                                                     // 2327
				if (v.autoRotate === 0) {                                                                                          // 2328
					v.autoRotate = true;                                                                                              // 2329
				}                                                                                                                  // 2330
				if (v.autoRotate && !(v.autoRotate instanceof Array)) {                                                            // 2331
					i = (v.autoRotate === true) ? 0 : Number(v.autoRotate);                                                           // 2332
					v.autoRotate = (data.end.left != null) ? [["left","top","rotation",i,false]] : (data.end.x != null) ? [["x","y","rotation",i,false]] : false;
				}                                                                                                                  // 2334
				if (v.autoRotate) {                                                                                                // 2335
					if (!cssp._transform) {                                                                                           // 2336
						cssp._enableTransforms(false);                                                                                   // 2337
					}                                                                                                                 // 2338
					data.autoRotate = cssp._target._gsTransform;                                                                      // 2339
				}                                                                                                                  // 2340
				plugin._onInitTween(data.proxy, v, cssp._tween);                                                                   // 2341
				return pt;                                                                                                         // 2342
			}});                                                                                                                // 2343
		};                                                                                                                   // 2344
                                                                                                                       // 2345
		p._roundProps = function(lookup, value) {                                                                            // 2346
			var op = this._overwriteProps,                                                                                      // 2347
				i = op.length;                                                                                                     // 2348
			while (--i > -1) {                                                                                                  // 2349
				if (lookup[op[i]] || lookup.bezier || lookup.bezierThrough) {                                                      // 2350
					this._round[op[i]] = value;                                                                                       // 2351
				}                                                                                                                  // 2352
			}                                                                                                                   // 2353
		};                                                                                                                   // 2354
                                                                                                                       // 2355
		p._kill = function(lookup) {                                                                                         // 2356
			var a = this._props,                                                                                                // 2357
				p, i;                                                                                                              // 2358
			for (p in this._beziers) {                                                                                          // 2359
				if (p in lookup) {                                                                                                 // 2360
					delete this._beziers[p];                                                                                          // 2361
					delete this._func[p];                                                                                             // 2362
					i = a.length;                                                                                                     // 2363
					while (--i > -1) {                                                                                                // 2364
						if (a[i] === p) {                                                                                                // 2365
							a.splice(i, 1);                                                                                                 // 2366
						}                                                                                                                // 2367
					}                                                                                                                 // 2368
				}                                                                                                                  // 2369
			}                                                                                                                   // 2370
			return this._super._kill.call(this, lookup);                                                                        // 2371
		};                                                                                                                   // 2372
                                                                                                                       // 2373
	}());                                                                                                                 // 2374
                                                                                                                       // 2375
                                                                                                                       // 2376
                                                                                                                       // 2377
                                                                                                                       // 2378
                                                                                                                       // 2379
                                                                                                                       // 2380
	                                                                                                                      // 2381
	                                                                                                                      // 2382
	                                                                                                                      // 2383
	                                                                                                                      // 2384
	                                                                                                                      // 2385
                                                                                                                       // 2386
	                                                                                                                      // 2387
	                                                                                                                      // 2388
	                                                                                                                      // 2389
	                                                                                                                      // 2390
	                                                                                                                      // 2391
	                                                                                                                      // 2392
	                                                                                                                      // 2393
/*                                                                                                                     // 2394
 * ----------------------------------------------------------------                                                    // 2395
 * RoundPropsPlugin                                                                                                    // 2396
 * ----------------------------------------------------------------                                                    // 2397
 */                                                                                                                    // 2398
	(function() {                                                                                                         // 2399
                                                                                                                       // 2400
		var RoundPropsPlugin = _gsScope._gsDefine.plugin({                                                                   // 2401
				propName: "roundProps",                                                                                            // 2402
				priority: -1,                                                                                                      // 2403
				API: 2,                                                                                                            // 2404
                                                                                                                       // 2405
				//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
				init: function(target, value, tween) {                                                                             // 2407
					this._tween = tween;                                                                                              // 2408
					return true;                                                                                                      // 2409
				}                                                                                                                  // 2410
                                                                                                                       // 2411
			}),                                                                                                                 // 2412
			p = RoundPropsPlugin.prototype;                                                                                     // 2413
                                                                                                                       // 2414
		p._onInitAllProps = function() {                                                                                     // 2415
			var tween = this._tween,                                                                                            // 2416
				rp = (tween.vars.roundProps instanceof Array) ? tween.vars.roundProps : tween.vars.roundProps.split(","),          // 2417
				i = rp.length,                                                                                                     // 2418
				lookup = {},                                                                                                       // 2419
				rpt = tween._propLookup.roundProps,                                                                                // 2420
				prop, pt, next;                                                                                                    // 2421
			while (--i > -1) {                                                                                                  // 2422
				lookup[rp[i]] = 1;                                                                                                 // 2423
			}                                                                                                                   // 2424
			i = rp.length;                                                                                                      // 2425
			while (--i > -1) {                                                                                                  // 2426
				prop = rp[i];                                                                                                      // 2427
				pt = tween._firstPT;                                                                                               // 2428
				while (pt) {                                                                                                       // 2429
					next = pt._next; //record here, because it may get removed                                                        // 2430
					if (pt.pg) {                                                                                                      // 2431
						pt.t._roundProps(lookup, true);                                                                                  // 2432
					} else if (pt.n === prop) {                                                                                       // 2433
						this._add(pt.t, prop, pt.s, pt.c);                                                                               // 2434
						//remove from linked list                                                                                        // 2435
						if (next) {                                                                                                      // 2436
							next._prev = pt._prev;                                                                                          // 2437
						}                                                                                                                // 2438
						if (pt._prev) {                                                                                                  // 2439
							pt._prev._next = next;                                                                                          // 2440
						} else if (tween._firstPT === pt) {                                                                              // 2441
							tween._firstPT = next;                                                                                          // 2442
						}                                                                                                                // 2443
						pt._next = pt._prev = null;                                                                                      // 2444
						tween._propLookup[prop] = rpt;                                                                                   // 2445
					}                                                                                                                 // 2446
					pt = next;                                                                                                        // 2447
				}                                                                                                                  // 2448
			}                                                                                                                   // 2449
			return false;                                                                                                       // 2450
		};                                                                                                                   // 2451
                                                                                                                       // 2452
		p._add = function(target, p, s, c) {                                                                                 // 2453
			this._addTween(target, p, s, s + c, p, true);                                                                       // 2454
			this._overwriteProps.push(p);                                                                                       // 2455
		};                                                                                                                   // 2456
                                                                                                                       // 2457
	}());                                                                                                                 // 2458
                                                                                                                       // 2459
                                                                                                                       // 2460
                                                                                                                       // 2461
                                                                                                                       // 2462
                                                                                                                       // 2463
                                                                                                                       // 2464
                                                                                                                       // 2465
                                                                                                                       // 2466
                                                                                                                       // 2467
                                                                                                                       // 2468
/*                                                                                                                     // 2469
 * ----------------------------------------------------------------                                                    // 2470
 * AttrPlugin                                                                                                          // 2471
 * ----------------------------------------------------------------                                                    // 2472
 */                                                                                                                    // 2473
	_gsScope._gsDefine.plugin({                                                                                           // 2474
		propName: "attr",                                                                                                    // 2475
		API: 2,                                                                                                              // 2476
		version: "0.3.3",                                                                                                    // 2477
                                                                                                                       // 2478
		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {                                                                               // 2480
			var p, start, end;                                                                                                  // 2481
			if (typeof(target.setAttribute) !== "function") {                                                                   // 2482
				return false;                                                                                                      // 2483
			}                                                                                                                   // 2484
			this._target = target;                                                                                              // 2485
			this._proxy = {};                                                                                                   // 2486
			this._start = {}; // we record start and end values exactly as they are in case they're strings (not numbers) - we need to be able to revert to them cleanly.
			this._end = {};                                                                                                     // 2488
			for (p in value) {                                                                                                  // 2489
				this._start[p] = this._proxy[p] = start = target.getAttribute(p);                                                  // 2490
				end = this._addTween(this._proxy, p, parseFloat(start), value[p], p);                                              // 2491
				this._end[p] = end ? end.s + end.c : value[p];                                                                     // 2492
				this._overwriteProps.push(p);                                                                                      // 2493
			}                                                                                                                   // 2494
			return true;                                                                                                        // 2495
		},                                                                                                                   // 2496
                                                                                                                       // 2497
		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {                                                                                               // 2499
			this._super.setRatio.call(this, ratio);                                                                             // 2500
			var props = this._overwriteProps,                                                                                   // 2501
				i = props.length,                                                                                                  // 2502
				lookup = (ratio === 1) ? this._end : ratio ? this._proxy : this._start,                                            // 2503
				p;                                                                                                                 // 2504
			while (--i > -1) {                                                                                                  // 2505
				p = props[i];                                                                                                      // 2506
				this._target.setAttribute(p, lookup[p] + "");                                                                      // 2507
			}                                                                                                                   // 2508
		}                                                                                                                    // 2509
                                                                                                                       // 2510
	});                                                                                                                   // 2511
                                                                                                                       // 2512
                                                                                                                       // 2513
                                                                                                                       // 2514
                                                                                                                       // 2515
                                                                                                                       // 2516
                                                                                                                       // 2517
                                                                                                                       // 2518
                                                                                                                       // 2519
                                                                                                                       // 2520
                                                                                                                       // 2521
/*                                                                                                                     // 2522
 * ----------------------------------------------------------------                                                    // 2523
 * DirectionalRotationPlugin                                                                                           // 2524
 * ----------------------------------------------------------------                                                    // 2525
 */                                                                                                                    // 2526
	_gsScope._gsDefine.plugin({                                                                                           // 2527
		propName: "directionalRotation",                                                                                     // 2528
		version: "0.2.1",                                                                                                    // 2529
		API: 2,                                                                                                              // 2530
                                                                                                                       // 2531
		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {                                                                               // 2533
			if (typeof(value) !== "object") {                                                                                   // 2534
				value = {rotation:value};                                                                                          // 2535
			}                                                                                                                   // 2536
			this.finals = {};                                                                                                   // 2537
			var cap = (value.useRadians === true) ? Math.PI * 2 : 360,                                                          // 2538
				min = 0.000001,                                                                                                    // 2539
				p, v, start, end, dif, split;                                                                                      // 2540
			for (p in value) {                                                                                                  // 2541
				if (p !== "useRadians") {                                                                                          // 2542
					split = (value[p] + "").split("_");                                                                               // 2543
					v = split[0];                                                                                                     // 2544
					start = parseFloat( (typeof(target[p]) !== "function") ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					end = this.finals[p] = (typeof(v) === "string" && v.charAt(1) === "=") ? start + parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : Number(v) || 0;
					dif = end - start;                                                                                                // 2547
					if (split.length) {                                                                                               // 2548
						v = split.join("_");                                                                                             // 2549
						if (v.indexOf("short") !== -1) {                                                                                 // 2550
							dif = dif % cap;                                                                                                // 2551
							if (dif !== dif % (cap / 2)) {                                                                                  // 2552
								dif = (dif < 0) ? dif + cap : dif - cap;                                                                       // 2553
							}                                                                                                               // 2554
						}                                                                                                                // 2555
						if (v.indexOf("_cw") !== -1 && dif < 0) {                                                                        // 2556
							dif = ((dif + cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;                                               // 2557
						} else if (v.indexOf("ccw") !== -1 && dif > 0) {                                                                 // 2558
							dif = ((dif - cap * 9999999999) % cap) - ((dif / cap) | 0) * cap;                                               // 2559
						}                                                                                                                // 2560
					}                                                                                                                 // 2561
					if (dif > min || dif < -min) {                                                                                    // 2562
						this._addTween(target, p, start, start + dif, p);                                                                // 2563
						this._overwriteProps.push(p);                                                                                    // 2564
					}                                                                                                                 // 2565
				}                                                                                                                  // 2566
			}                                                                                                                   // 2567
			return true;                                                                                                        // 2568
		},                                                                                                                   // 2569
                                                                                                                       // 2570
		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(ratio) {                                                                                               // 2572
			var pt;                                                                                                             // 2573
			if (ratio !== 1) {                                                                                                  // 2574
				this._super.setRatio.call(this, ratio);                                                                            // 2575
			} else {                                                                                                            // 2576
				pt = this._firstPT;                                                                                                // 2577
				while (pt) {                                                                                                       // 2578
					if (pt.f) {                                                                                                       // 2579
						pt.t[pt.p](this.finals[pt.p]);                                                                                   // 2580
					} else {                                                                                                          // 2581
						pt.t[pt.p] = this.finals[pt.p];                                                                                  // 2582
					}                                                                                                                 // 2583
					pt = pt._next;                                                                                                    // 2584
				}                                                                                                                  // 2585
			}                                                                                                                   // 2586
		}                                                                                                                    // 2587
                                                                                                                       // 2588
	})._autoCSS = true;                                                                                                   // 2589
                                                                                                                       // 2590
                                                                                                                       // 2591
                                                                                                                       // 2592
                                                                                                                       // 2593
                                                                                                                       // 2594
                                                                                                                       // 2595
                                                                                                                       // 2596
	                                                                                                                      // 2597
	                                                                                                                      // 2598
	                                                                                                                      // 2599
	                                                                                                                      // 2600
/*                                                                                                                     // 2601
 * ----------------------------------------------------------------                                                    // 2602
 * EasePack                                                                                                            // 2603
 * ----------------------------------------------------------------                                                    // 2604
 */                                                                                                                    // 2605
	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function(Ease) {                                                   // 2606
		                                                                                                                     // 2607
		var w = (_gsScope.GreenSockGlobals || _gsScope),                                                                     // 2608
			gs = w.com.greensock,                                                                                               // 2609
			_2PI = Math.PI * 2,                                                                                                 // 2610
			_HALF_PI = Math.PI / 2,                                                                                             // 2611
			_class = gs._class,                                                                                                 // 2612
			_create = function(n, f) {                                                                                          // 2613
				var C = _class("easing." + n, function(){}, true),                                                                 // 2614
					p = C.prototype = new Ease();                                                                                     // 2615
				p.constructor = C;                                                                                                 // 2616
				p.getRatio = f;                                                                                                    // 2617
				return C;                                                                                                          // 2618
			},                                                                                                                  // 2619
			_easeReg = Ease.register || function(){}, //put an empty function in place just as a safety measure in case someone loads an OLD version of TweenLite.js where Ease.register doesn't exist.
			_wrap = function(name, EaseOut, EaseIn, EaseInOut, aliases) {                                                       // 2621
				var C = _class("easing."+name, {                                                                                   // 2622
					easeOut:new EaseOut(),                                                                                            // 2623
					easeIn:new EaseIn(),                                                                                              // 2624
					easeInOut:new EaseInOut()                                                                                         // 2625
				}, true);                                                                                                          // 2626
				_easeReg(C, name);                                                                                                 // 2627
				return C;                                                                                                          // 2628
			},                                                                                                                  // 2629
			EasePoint = function(time, value, next) {                                                                           // 2630
				this.t = time;                                                                                                     // 2631
				this.v = value;                                                                                                    // 2632
				if (next) {                                                                                                        // 2633
					this.next = next;                                                                                                 // 2634
					next.prev = this;                                                                                                 // 2635
					this.c = next.v - value;                                                                                          // 2636
					this.gap = next.t - time;                                                                                         // 2637
				}                                                                                                                  // 2638
			},                                                                                                                  // 2639
                                                                                                                       // 2640
			//Back                                                                                                              // 2641
			_createBack = function(n, f) {                                                                                      // 2642
				var C = _class("easing." + n, function(overshoot) {                                                                // 2643
						this._p1 = (overshoot || overshoot === 0) ? overshoot : 1.70158;                                                 // 2644
						this._p2 = this._p1 * 1.525;                                                                                     // 2645
					}, true),                                                                                                         // 2646
					p = C.prototype = new Ease();                                                                                     // 2647
				p.constructor = C;                                                                                                 // 2648
				p.getRatio = f;                                                                                                    // 2649
				p.config = function(overshoot) {                                                                                   // 2650
					return new C(overshoot);                                                                                          // 2651
				};                                                                                                                 // 2652
				return C;                                                                                                          // 2653
			},                                                                                                                  // 2654
                                                                                                                       // 2655
			Back = _wrap("Back",                                                                                                // 2656
				_createBack("BackOut", function(p) {                                                                               // 2657
					return ((p = p - 1) * p * ((this._p1 + 1) * p + this._p1) + 1);                                                   // 2658
				}),                                                                                                                // 2659
				_createBack("BackIn", function(p) {                                                                                // 2660
					return p * p * ((this._p1 + 1) * p - this._p1);                                                                   // 2661
				}),                                                                                                                // 2662
				_createBack("BackInOut", function(p) {                                                                             // 2663
					return ((p *= 2) < 1) ? 0.5 * p * p * ((this._p2 + 1) * p - this._p2) : 0.5 * ((p -= 2) * p * ((this._p2 + 1) * p + this._p2) + 2);
				})                                                                                                                 // 2665
			),                                                                                                                  // 2666
                                                                                                                       // 2667
                                                                                                                       // 2668
			//SlowMo                                                                                                            // 2669
			SlowMo = _class("easing.SlowMo", function(linearRatio, power, yoyoMode) {                                           // 2670
				power = (power || power === 0) ? power : 0.7;                                                                      // 2671
				if (linearRatio == null) {                                                                                         // 2672
					linearRatio = 0.7;                                                                                                // 2673
				} else if (linearRatio > 1) {                                                                                      // 2674
					linearRatio = 1;                                                                                                  // 2675
				}                                                                                                                  // 2676
				this._p = (linearRatio !== 1) ? power : 0;                                                                         // 2677
				this._p1 = (1 - linearRatio) / 2;                                                                                  // 2678
				this._p2 = linearRatio;                                                                                            // 2679
				this._p3 = this._p1 + this._p2;                                                                                    // 2680
				this._calcEnd = (yoyoMode === true);                                                                               // 2681
			}, true),                                                                                                           // 2682
			p = SlowMo.prototype = new Ease(),                                                                                  // 2683
			SteppedEase, RoughEase, _createElastic;                                                                             // 2684
                                                                                                                       // 2685
		p.constructor = SlowMo;                                                                                              // 2686
		p.getRatio = function(p) {                                                                                           // 2687
			var r = p + (0.5 - p) * this._p;                                                                                    // 2688
			if (p < this._p1) {                                                                                                 // 2689
				return this._calcEnd ? 1 - ((p = 1 - (p / this._p1)) * p) : r - ((p = 1 - (p / this._p1)) * p * p * p * r);        // 2690
			} else if (p > this._p3) {                                                                                          // 2691
				return this._calcEnd ? 1 - (p = (p - this._p3) / this._p1) * p : r + ((p - r) * (p = (p - this._p3) / this._p1) * p * p * p);
			}                                                                                                                   // 2693
			return this._calcEnd ? 1 : r;                                                                                       // 2694
		};                                                                                                                   // 2695
		SlowMo.ease = new SlowMo(0.7, 0.7);                                                                                  // 2696
                                                                                                                       // 2697
		p.config = SlowMo.config = function(linearRatio, power, yoyoMode) {                                                  // 2698
			return new SlowMo(linearRatio, power, yoyoMode);                                                                    // 2699
		};                                                                                                                   // 2700
                                                                                                                       // 2701
                                                                                                                       // 2702
		//SteppedEase                                                                                                        // 2703
		SteppedEase = _class("easing.SteppedEase", function(steps) {                                                         // 2704
				steps = steps || 1;                                                                                                // 2705
				this._p1 = 1 / steps;                                                                                              // 2706
				this._p2 = steps + 1;                                                                                              // 2707
			}, true);                                                                                                           // 2708
		p = SteppedEase.prototype = new Ease();                                                                              // 2709
		p.constructor = SteppedEase;                                                                                         // 2710
		p.getRatio = function(p) {                                                                                           // 2711
			if (p < 0) {                                                                                                        // 2712
				p = 0;                                                                                                             // 2713
			} else if (p >= 1) {                                                                                                // 2714
				p = 0.999999999;                                                                                                   // 2715
			}                                                                                                                   // 2716
			return ((this._p2 * p) >> 0) * this._p1;                                                                            // 2717
		};                                                                                                                   // 2718
		p.config = SteppedEase.config = function(steps) {                                                                    // 2719
			return new SteppedEase(steps);                                                                                      // 2720
		};                                                                                                                   // 2721
                                                                                                                       // 2722
                                                                                                                       // 2723
		//RoughEase                                                                                                          // 2724
		RoughEase = _class("easing.RoughEase", function(vars) {                                                              // 2725
			vars = vars || {};                                                                                                  // 2726
			var taper = vars.taper || "none",                                                                                   // 2727
				a = [],                                                                                                            // 2728
				cnt = 0,                                                                                                           // 2729
				points = (vars.points || 20) | 0,                                                                                  // 2730
				i = points,                                                                                                        // 2731
				randomize = (vars.randomize !== false),                                                                            // 2732
				clamp = (vars.clamp === true),                                                                                     // 2733
				template = (vars.template instanceof Ease) ? vars.template : null,                                                 // 2734
				strength = (typeof(vars.strength) === "number") ? vars.strength * 0.4 : 0.4,                                       // 2735
				x, y, bump, invX, obj, pnt;                                                                                        // 2736
			while (--i > -1) {                                                                                                  // 2737
				x = randomize ? Math.random() : (1 / points) * i;                                                                  // 2738
				y = template ? template.getRatio(x) : x;                                                                           // 2739
				if (taper === "none") {                                                                                            // 2740
					bump = strength;                                                                                                  // 2741
				} else if (taper === "out") {                                                                                      // 2742
					invX = 1 - x;                                                                                                     // 2743
					bump = invX * invX * strength;                                                                                    // 2744
				} else if (taper === "in") {                                                                                       // 2745
					bump = x * x * strength;                                                                                          // 2746
				} else if (x < 0.5) {  //"both" (start)                                                                            // 2747
					invX = x * 2;                                                                                                     // 2748
					bump = invX * invX * 0.5 * strength;                                                                              // 2749
				} else {				//"both" (end)                                                                                         // 2750
					invX = (1 - x) * 2;                                                                                               // 2751
					bump = invX * invX * 0.5 * strength;                                                                              // 2752
				}                                                                                                                  // 2753
				if (randomize) {                                                                                                   // 2754
					y += (Math.random() * bump) - (bump * 0.5);                                                                       // 2755
				} else if (i % 2) {                                                                                                // 2756
					y += bump * 0.5;                                                                                                  // 2757
				} else {                                                                                                           // 2758
					y -= bump * 0.5;                                                                                                  // 2759
				}                                                                                                                  // 2760
				if (clamp) {                                                                                                       // 2761
					if (y > 1) {                                                                                                      // 2762
						y = 1;                                                                                                           // 2763
					} else if (y < 0) {                                                                                               // 2764
						y = 0;                                                                                                           // 2765
					}                                                                                                                 // 2766
				}                                                                                                                  // 2767
				a[cnt++] = {x:x, y:y};                                                                                             // 2768
			}                                                                                                                   // 2769
			a.sort(function(a, b) {                                                                                             // 2770
				return a.x - b.x;                                                                                                  // 2771
			});                                                                                                                 // 2772
                                                                                                                       // 2773
			pnt = new EasePoint(1, 1, null);                                                                                    // 2774
			i = points;                                                                                                         // 2775
			while (--i > -1) {                                                                                                  // 2776
				obj = a[i];                                                                                                        // 2777
				pnt = new EasePoint(obj.x, obj.y, pnt);                                                                            // 2778
			}                                                                                                                   // 2779
                                                                                                                       // 2780
			this._prev = new EasePoint(0, 0, (pnt.t !== 0) ? pnt : pnt.next);                                                   // 2781
		}, true);                                                                                                            // 2782
		p = RoughEase.prototype = new Ease();                                                                                // 2783
		p.constructor = RoughEase;                                                                                           // 2784
		p.getRatio = function(p) {                                                                                           // 2785
			var pnt = this._prev;                                                                                               // 2786
			if (p > pnt.t) {                                                                                                    // 2787
				while (pnt.next && p >= pnt.t) {                                                                                   // 2788
					pnt = pnt.next;                                                                                                   // 2789
				}                                                                                                                  // 2790
				pnt = pnt.prev;                                                                                                    // 2791
			} else {                                                                                                            // 2792
				while (pnt.prev && p <= pnt.t) {                                                                                   // 2793
					pnt = pnt.prev;                                                                                                   // 2794
				}                                                                                                                  // 2795
			}                                                                                                                   // 2796
			this._prev = pnt;                                                                                                   // 2797
			return (pnt.v + ((p - pnt.t) / pnt.gap) * pnt.c);                                                                   // 2798
		};                                                                                                                   // 2799
		p.config = function(vars) {                                                                                          // 2800
			return new RoughEase(vars);                                                                                         // 2801
		};                                                                                                                   // 2802
		RoughEase.ease = new RoughEase();                                                                                    // 2803
                                                                                                                       // 2804
                                                                                                                       // 2805
		//Bounce                                                                                                             // 2806
		_wrap("Bounce",                                                                                                      // 2807
			_create("BounceOut", function(p) {                                                                                  // 2808
				if (p < 1 / 2.75) {                                                                                                // 2809
					return 7.5625 * p * p;                                                                                            // 2810
				} else if (p < 2 / 2.75) {                                                                                         // 2811
					return 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;                                                                     // 2812
				} else if (p < 2.5 / 2.75) {                                                                                       // 2813
					return 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;                                                                  // 2814
				}                                                                                                                  // 2815
				return 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;                                                                // 2816
			}),                                                                                                                 // 2817
			_create("BounceIn", function(p) {                                                                                   // 2818
				if ((p = 1 - p) < 1 / 2.75) {                                                                                      // 2819
					return 1 - (7.5625 * p * p);                                                                                      // 2820
				} else if (p < 2 / 2.75) {                                                                                         // 2821
					return 1 - (7.5625 * (p -= 1.5 / 2.75) * p + 0.75);                                                               // 2822
				} else if (p < 2.5 / 2.75) {                                                                                       // 2823
					return 1 - (7.5625 * (p -= 2.25 / 2.75) * p + 0.9375);                                                            // 2824
				}                                                                                                                  // 2825
				return 1 - (7.5625 * (p -= 2.625 / 2.75) * p + 0.984375);                                                          // 2826
			}),                                                                                                                 // 2827
			_create("BounceInOut", function(p) {                                                                                // 2828
				var invert = (p < 0.5);                                                                                            // 2829
				if (invert) {                                                                                                      // 2830
					p = 1 - (p * 2);                                                                                                  // 2831
				} else {                                                                                                           // 2832
					p = (p * 2) - 1;                                                                                                  // 2833
				}                                                                                                                  // 2834
				if (p < 1 / 2.75) {                                                                                                // 2835
					p = 7.5625 * p * p;                                                                                               // 2836
				} else if (p < 2 / 2.75) {                                                                                         // 2837
					p = 7.5625 * (p -= 1.5 / 2.75) * p + 0.75;                                                                        // 2838
				} else if (p < 2.5 / 2.75) {                                                                                       // 2839
					p = 7.5625 * (p -= 2.25 / 2.75) * p + 0.9375;                                                                     // 2840
				} else {                                                                                                           // 2841
					p = 7.5625 * (p -= 2.625 / 2.75) * p + 0.984375;                                                                  // 2842
				}                                                                                                                  // 2843
				return invert ? (1 - p) * 0.5 : p * 0.5 + 0.5;                                                                     // 2844
			})                                                                                                                  // 2845
		);                                                                                                                   // 2846
                                                                                                                       // 2847
                                                                                                                       // 2848
		//CIRC                                                                                                               // 2849
		_wrap("Circ",                                                                                                        // 2850
			_create("CircOut", function(p) {                                                                                    // 2851
				return Math.sqrt(1 - (p = p - 1) * p);                                                                             // 2852
			}),                                                                                                                 // 2853
			_create("CircIn", function(p) {                                                                                     // 2854
				return -(Math.sqrt(1 - (p * p)) - 1);                                                                              // 2855
			}),                                                                                                                 // 2856
			_create("CircInOut", function(p) {                                                                                  // 2857
				return ((p*=2) < 1) ? -0.5 * (Math.sqrt(1 - p * p) - 1) : 0.5 * (Math.sqrt(1 - (p -= 2) * p) + 1);                 // 2858
			})                                                                                                                  // 2859
		);                                                                                                                   // 2860
                                                                                                                       // 2861
                                                                                                                       // 2862
		//Elastic                                                                                                            // 2863
		_createElastic = function(n, f, def) {                                                                               // 2864
			var C = _class("easing." + n, function(amplitude, period) {                                                         // 2865
					this._p1 = (amplitude >= 1) ? amplitude : 1; //note: if amplitude is < 1, we simply adjust the period for a more natural feel. Otherwise the math doesn't work right and the curve starts at 1.
					this._p2 = (period || def) / (amplitude < 1 ? amplitude : 1);                                                     // 2867
					this._p3 = this._p2 / _2PI * (Math.asin(1 / this._p1) || 0);                                                      // 2868
					this._p2 = _2PI / this._p2; //precalculate to optimize                                                            // 2869
				}, true),                                                                                                          // 2870
				p = C.prototype = new Ease();                                                                                      // 2871
			p.constructor = C;                                                                                                  // 2872
			p.getRatio = f;                                                                                                     // 2873
			p.config = function(amplitude, period) {                                                                            // 2874
				return new C(amplitude, period);                                                                                   // 2875
			};                                                                                                                  // 2876
			return C;                                                                                                           // 2877
		};                                                                                                                   // 2878
		_wrap("Elastic",                                                                                                     // 2879
			_createElastic("ElasticOut", function(p) {                                                                          // 2880
				return this._p1 * Math.pow(2, -10 * p) * Math.sin( (p - this._p3) * this._p2 ) + 1;                                // 2881
			}, 0.3),                                                                                                            // 2882
			_createElastic("ElasticIn", function(p) {                                                                           // 2883
				return -(this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2 ));                           // 2884
			}, 0.3),                                                                                                            // 2885
			_createElastic("ElasticInOut", function(p) {                                                                        // 2886
				return ((p *= 2) < 1) ? -0.5 * (this._p1 * Math.pow(2, 10 * (p -= 1)) * Math.sin( (p - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 *(p -= 1)) * Math.sin( (p - this._p3) * this._p2 ) * 0.5 + 1;
			}, 0.45)                                                                                                            // 2888
		);                                                                                                                   // 2889
                                                                                                                       // 2890
                                                                                                                       // 2891
		//Expo                                                                                                               // 2892
		_wrap("Expo",                                                                                                        // 2893
			_create("ExpoOut", function(p) {                                                                                    // 2894
				return 1 - Math.pow(2, -10 * p);                                                                                   // 2895
			}),                                                                                                                 // 2896
			_create("ExpoIn", function(p) {                                                                                     // 2897
				return Math.pow(2, 10 * (p - 1)) - 0.001;                                                                          // 2898
			}),                                                                                                                 // 2899
			_create("ExpoInOut", function(p) {                                                                                  // 2900
				return ((p *= 2) < 1) ? 0.5 * Math.pow(2, 10 * (p - 1)) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));                  // 2901
			})                                                                                                                  // 2902
		);                                                                                                                   // 2903
                                                                                                                       // 2904
                                                                                                                       // 2905
		//Sine                                                                                                               // 2906
		_wrap("Sine",                                                                                                        // 2907
			_create("SineOut", function(p) {                                                                                    // 2908
				return Math.sin(p * _HALF_PI);                                                                                     // 2909
			}),                                                                                                                 // 2910
			_create("SineIn", function(p) {                                                                                     // 2911
				return -Math.cos(p * _HALF_PI) + 1;                                                                                // 2912
			}),                                                                                                                 // 2913
			_create("SineInOut", function(p) {                                                                                  // 2914
				return -0.5 * (Math.cos(Math.PI * p) - 1);                                                                         // 2915
			})                                                                                                                  // 2916
		);                                                                                                                   // 2917
                                                                                                                       // 2918
		_class("easing.EaseLookup", {                                                                                        // 2919
				find:function(s) {                                                                                                 // 2920
					return Ease.map[s];                                                                                               // 2921
				}                                                                                                                  // 2922
			}, true);                                                                                                           // 2923
                                                                                                                       // 2924
		//register the non-standard eases                                                                                    // 2925
		_easeReg(w.SlowMo, "SlowMo", "ease,");                                                                               // 2926
		_easeReg(RoughEase, "RoughEase", "ease,");                                                                           // 2927
		_easeReg(SteppedEase, "SteppedEase", "ease,");                                                                       // 2928
                                                                                                                       // 2929
		return Back;                                                                                                         // 2930
		                                                                                                                     // 2931
	}, true);                                                                                                             // 2932
                                                                                                                       // 2933
                                                                                                                       // 2934
});                                                                                                                    // 2935
                                                                                                                       // 2936
if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); } //necessary in case TweenLite was already loaded separately.    // 2937
                                                                                                                       // 2938
                                                                                                                       // 2939
                                                                                                                       // 2940
                                                                                                                       // 2941
                                                                                                                       // 2942
                                                                                                                       // 2943
                                                                                                                       // 2944
                                                                                                                       // 2945
                                                                                                                       // 2946
                                                                                                                       // 2947
                                                                                                                       // 2948
/*                                                                                                                     // 2949
 * ----------------------------------------------------------------                                                    // 2950
 * Base classes like TweenLite, SimpleTimeline, Ease, Ticker, etc.                                                     // 2951
 * ----------------------------------------------------------------                                                    // 2952
 */                                                                                                                    // 2953
(function(window, moduleName) {                                                                                        // 2954
                                                                                                                       // 2955
		"use strict";                                                                                                        // 2956
		var _globals = window.GreenSockGlobals = window.GreenSockGlobals || window;                                          // 2957
		if (_globals.TweenLite) {                                                                                            // 2958
			return; //in case the core set of classes is already loaded, don't instantiate twice.                               // 2959
		}                                                                                                                    // 2960
		var _namespace = function(ns) {                                                                                      // 2961
				var a = ns.split("."),                                                                                             // 2962
					p = _globals, i;                                                                                                  // 2963
				for (i = 0; i < a.length; i++) {                                                                                   // 2964
					p[a[i]] = p = p[a[i]] || {};                                                                                      // 2965
				}                                                                                                                  // 2966
				return p;                                                                                                          // 2967
			},                                                                                                                  // 2968
			gs = _namespace("com.greensock"),                                                                                   // 2969
			_tinyNum = 0.0000000001,                                                                                            // 2970
			_slice = function(a) { //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
				var b = [],                                                                                                        // 2972
					l = a.length,                                                                                                     // 2973
					i;                                                                                                                // 2974
				for (i = 0; i !== l; b.push(a[i++]));                                                                              // 2975
				return b;                                                                                                          // 2976
			},                                                                                                                  // 2977
			_emptyFunc = function() {},                                                                                         // 2978
			_isArray = (function() { //works around issues in iframe environments where the Array global isn't shared, thus if the object originates in a different window/iframe, "(obj instanceof Array)" will evaluate false. We added some speed optimizations to avoid Object.prototype.toString.call() unless it's absolutely necessary because it's VERY slow (like 20x slower)
				var toString = Object.prototype.toString,                                                                          // 2980
					array = toString.call([]);                                                                                        // 2981
				return function(obj) {                                                                                             // 2982
					return obj != null && (obj instanceof Array || (typeof(obj) === "object" && !!obj.push && toString.call(obj) === array));
				};                                                                                                                 // 2984
			}()),                                                                                                               // 2985
			a, i, p, _ticker, _tickerActive,                                                                                    // 2986
			_defLookup = {},                                                                                                    // 2987
                                                                                                                       // 2988
			/**                                                                                                                 // 2989
			 * @constructor                                                                                                     // 2990
			 * Defines a GreenSock class, optionally with an array of dependencies that must be instantiated first and passed into the definition.
			 * This allows users to load GreenSock JS files in any order even if they have interdependencies (like CSSPlugin extends TweenPlugin which is
			 * inside TweenLite.js, but if CSSPlugin is loaded first, it should wait to run its code until TweenLite.js loads and instantiates TweenPlugin
			 * and then pass TweenPlugin to CSSPlugin's definition). This is all done automatically and internally.             // 2994
			 *                                                                                                                  // 2995
			 * Every definition will be added to a "com.greensock" global object (typically window, but if a window.GreenSockGlobals object is found,
			 * it will go there as of v1.7). For example, TweenLite will be found at window.com.greensock.TweenLite and since it's a global class that should be available anywhere,
			 * it is ALSO referenced at window.TweenLite. However some classes aren't considered global, like the base com.greensock.core.Animation class, so
			 * those will only be at the package like window.com.greensock.core.Animation. Again, if you define a GreenSockGlobals object on the window, everything
			 * gets tucked neatly inside there instead of on the window directly. This allows you to do advanced things like load multiple versions of GreenSock
			 * files and put them into distinct objects (imagine a banner ad uses a newer version but the main site uses an older one). In that case, you could
			 * sandbox the banner one like:                                                                                     // 3002
			 *                                                                                                                  // 3003
			 * <script>                                                                                                         // 3004
			 *     var gs = window.GreenSockGlobals = {}; //the newer version we're about to load could now be referenced in a "gs" object, like gs.TweenLite.to(...). Use whatever alias you want as long as it's unique, "gs" or "banner" or whatever.
			 * </script>                                                                                                        // 3006
			 * <script src="js/greensock/v1.7/TweenMax.js"></script>                                                            // 3007
			 * <script>                                                                                                         // 3008
			 *     window.GreenSockGlobals = window._gsQueue = window._gsDefine = null; //reset it back to null (along with the special _gsQueue variable) so that the next load of TweenMax affects the window and we can reference things directly like TweenLite.to(...)
			 * </script>                                                                                                        // 3010
			 * <script src="js/greensock/v1.6/TweenMax.js"></script>                                                            // 3011
			 * <script>                                                                                                         // 3012
			 *     gs.TweenLite.to(...); //would use v1.7                                                                       // 3013
			 *     TweenLite.to(...); //would use v1.6                                                                          // 3014
			 * </script>                                                                                                        // 3015
			 *                                                                                                                  // 3016
			 * @param {!string} ns The namespace of the class definition, leaving off "com.greensock." as that's assumed. For example, "TweenLite" or "plugins.CSSPlugin" or "easing.Back".
			 * @param {!Array.<string>} dependencies An array of dependencies (described as their namespaces minus "com.greensock." prefix). For example ["TweenLite","plugins.TweenPlugin","core.Animation"]
			 * @param {!function():Object} func The function that should be called and passed the resolved dependencies which will return the actual class for this definition.
			 * @param {boolean=} global If true, the class will be added to the global scope (typically window unless you define a window.GreenSockGlobals object)
			 */                                                                                                                 // 3021
			Definition = function(ns, dependencies, func, global) {                                                             // 3022
				this.sc = (_defLookup[ns]) ? _defLookup[ns].sc : []; //subclasses                                                  // 3023
				_defLookup[ns] = this;                                                                                             // 3024
				this.gsClass = null;                                                                                               // 3025
				this.func = func;                                                                                                  // 3026
				var _classes = [];                                                                                                 // 3027
				this.check = function(init) {                                                                                      // 3028
					var i = dependencies.length,                                                                                      // 3029
						missing = i,                                                                                                     // 3030
						cur, a, n, cl;                                                                                                   // 3031
					while (--i > -1) {                                                                                                // 3032
						if ((cur = _defLookup[dependencies[i]] || new Definition(dependencies[i], [])).gsClass) {                        // 3033
							_classes[i] = cur.gsClass;                                                                                      // 3034
							missing--;                                                                                                      // 3035
						} else if (init) {                                                                                               // 3036
							cur.sc.push(this);                                                                                              // 3037
						}                                                                                                                // 3038
					}                                                                                                                 // 3039
					if (missing === 0 && func) {                                                                                      // 3040
						a = ("com.greensock." + ns).split(".");                                                                          // 3041
						n = a.pop();                                                                                                     // 3042
						cl = _namespace(a.join("."))[n] = this.gsClass = func.apply(func, _classes);                                     // 3043
                                                                                                                       // 3044
						//exports to multiple environments                                                                               // 3045
						if (global) {                                                                                                    // 3046
							_globals[n] = cl; //provides a way to avoid global namespace pollution. By default, the main classes like TweenLite, Power1, Strong, etc. are added to window unless a GreenSockGlobals is defined. So if you want to have things added to a custom object instead, just do something like window.GreenSockGlobals = {} before loading any GreenSock files. You can even set up an alias like window.GreenSockGlobals = windows.gs = {} so that you can access everything like gs.TweenLite. Also remember that ALL classes are added to the window.com.greensock object (in their respective packages, like com.greensock.easing.Power1, com.greensock.TweenLite, etc.)
							if (typeof(define) === "function" && define.amd){ //AMD                                                         // 3048
								define((window.GreenSockAMDPath ? window.GreenSockAMDPath + "/" : "") + ns.split(".").pop(), [], function() { return cl; });
							} else if (ns === moduleName && typeof(module) !== "undefined" && module.exports){ //node                       // 3050
								module.exports = cl;                                                                                           // 3051
							}                                                                                                               // 3052
						}                                                                                                                // 3053
						for (i = 0; i < this.sc.length; i++) {                                                                           // 3054
							this.sc[i].check();                                                                                             // 3055
						}                                                                                                                // 3056
					}                                                                                                                 // 3057
				};                                                                                                                 // 3058
				this.check(true);                                                                                                  // 3059
			},                                                                                                                  // 3060
                                                                                                                       // 3061
			//used to create Definition instances (which basically registers a class that has dependencies).                    // 3062
			_gsDefine = window._gsDefine = function(ns, dependencies, func, global) {                                           // 3063
				return new Definition(ns, dependencies, func, global);                                                             // 3064
			},                                                                                                                  // 3065
                                                                                                                       // 3066
			//a quick way to create a class that doesn't have any dependencies. Returns the class, but first registers it in the GreenSock namespace so that other classes can grab it (other classes might be dependent on the class).
			_class = gs._class = function(ns, func, global) {                                                                   // 3068
				func = func || function() {};                                                                                      // 3069
				_gsDefine(ns, [], function(){ return func; }, global);                                                             // 3070
				return func;                                                                                                       // 3071
			};                                                                                                                  // 3072
                                                                                                                       // 3073
		_gsDefine.globals = _globals;                                                                                        // 3074
                                                                                                                       // 3075
                                                                                                                       // 3076
                                                                                                                       // 3077
/*                                                                                                                     // 3078
 * ----------------------------------------------------------------                                                    // 3079
 * Ease                                                                                                                // 3080
 * ----------------------------------------------------------------                                                    // 3081
 */                                                                                                                    // 3082
		var _baseParams = [0, 0, 1, 1],                                                                                      // 3083
			_blankArray = [],                                                                                                   // 3084
			Ease = _class("easing.Ease", function(func, extraParams, type, power) {                                             // 3085
				this._func = func;                                                                                                 // 3086
				this._type = type || 0;                                                                                            // 3087
				this._power = power || 0;                                                                                          // 3088
				this._params = extraParams ? _baseParams.concat(extraParams) : _baseParams;                                        // 3089
			}, true),                                                                                                           // 3090
			_easeMap = Ease.map = {},                                                                                           // 3091
			_easeReg = Ease.register = function(ease, names, types, create) {                                                   // 3092
				var na = names.split(","),                                                                                         // 3093
					i = na.length,                                                                                                    // 3094
					ta = (types || "easeIn,easeOut,easeInOut").split(","),                                                            // 3095
					e, name, j, type;                                                                                                 // 3096
				while (--i > -1) {                                                                                                 // 3097
					name = na[i];                                                                                                     // 3098
					e = create ? _class("easing."+name, null, true) : gs.easing[name] || {};                                          // 3099
					j = ta.length;                                                                                                    // 3100
					while (--j > -1) {                                                                                                // 3101
						type = ta[j];                                                                                                    // 3102
						_easeMap[name + "." + type] = _easeMap[type + name] = e[type] = ease.getRatio ? ease : ease[type] || new ease(); // 3103
					}                                                                                                                 // 3104
				}                                                                                                                  // 3105
			};                                                                                                                  // 3106
                                                                                                                       // 3107
		p = Ease.prototype;                                                                                                  // 3108
		p._calcEnd = false;                                                                                                  // 3109
		p.getRatio = function(p) {                                                                                           // 3110
			if (this._func) {                                                                                                   // 3111
				this._params[0] = p;                                                                                               // 3112
				return this._func.apply(null, this._params);                                                                       // 3113
			}                                                                                                                   // 3114
			var t = this._type,                                                                                                 // 3115
				pw = this._power,                                                                                                  // 3116
				r = (t === 1) ? 1 - p : (t === 2) ? p : (p < 0.5) ? p * 2 : (1 - p) * 2;                                           // 3117
			if (pw === 1) {                                                                                                     // 3118
				r *= r;                                                                                                            // 3119
			} else if (pw === 2) {                                                                                              // 3120
				r *= r * r;                                                                                                        // 3121
			} else if (pw === 3) {                                                                                              // 3122
				r *= r * r * r;                                                                                                    // 3123
			} else if (pw === 4) {                                                                                              // 3124
				r *= r * r * r * r;                                                                                                // 3125
			}                                                                                                                   // 3126
			return (t === 1) ? 1 - r : (t === 2) ? r : (p < 0.5) ? r / 2 : 1 - (r / 2);                                         // 3127
		};                                                                                                                   // 3128
                                                                                                                       // 3129
		//create all the standard eases like Linear, Quad, Cubic, Quart, Quint, Strong, Power0, Power1, Power2, Power3, and Power4 (each with easeIn, easeOut, and easeInOut)
		a = ["Linear","Quad","Cubic","Quart","Quint,Strong"];                                                                // 3131
		i = a.length;                                                                                                        // 3132
		while (--i > -1) {                                                                                                   // 3133
			p = a[i]+",Power"+i;                                                                                                // 3134
			_easeReg(new Ease(null,null,1,i), p, "easeOut", true);                                                              // 3135
			_easeReg(new Ease(null,null,2,i), p, "easeIn" + ((i === 0) ? ",easeNone" : ""));                                    // 3136
			_easeReg(new Ease(null,null,3,i), p, "easeInOut");                                                                  // 3137
		}                                                                                                                    // 3138
		_easeMap.linear = gs.easing.Linear.easeIn;                                                                           // 3139
		_easeMap.swing = gs.easing.Quad.easeInOut; //for jQuery folks                                                        // 3140
                                                                                                                       // 3141
                                                                                                                       // 3142
/*                                                                                                                     // 3143
 * ----------------------------------------------------------------                                                    // 3144
 * EventDispatcher                                                                                                     // 3145
 * ----------------------------------------------------------------                                                    // 3146
 */                                                                                                                    // 3147
		var EventDispatcher = _class("events.EventDispatcher", function(target) {                                            // 3148
			this._listeners = {};                                                                                               // 3149
			this._eventTarget = target || this;                                                                                 // 3150
		});                                                                                                                  // 3151
		p = EventDispatcher.prototype;                                                                                       // 3152
                                                                                                                       // 3153
		p.addEventListener = function(type, callback, scope, useParam, priority) {                                           // 3154
			priority = priority || 0;                                                                                           // 3155
			var list = this._listeners[type],                                                                                   // 3156
				index = 0,                                                                                                         // 3157
				listener, i;                                                                                                       // 3158
			if (list == null) {                                                                                                 // 3159
				this._listeners[type] = list = [];                                                                                 // 3160
			}                                                                                                                   // 3161
			i = list.length;                                                                                                    // 3162
			while (--i > -1) {                                                                                                  // 3163
				listener = list[i];                                                                                                // 3164
				if (listener.c === callback && listener.s === scope) {                                                             // 3165
					list.splice(i, 1);                                                                                                // 3166
				} else if (index === 0 && listener.pr < priority) {                                                                // 3167
					index = i + 1;                                                                                                    // 3168
				}                                                                                                                  // 3169
			}                                                                                                                   // 3170
			list.splice(index, 0, {c:callback, s:scope, up:useParam, pr:priority});                                             // 3171
			if (this === _ticker && !_tickerActive) {                                                                           // 3172
				_ticker.wake();                                                                                                    // 3173
			}                                                                                                                   // 3174
		};                                                                                                                   // 3175
                                                                                                                       // 3176
		p.removeEventListener = function(type, callback) {                                                                   // 3177
			var list = this._listeners[type], i;                                                                                // 3178
			if (list) {                                                                                                         // 3179
				i = list.length;                                                                                                   // 3180
				while (--i > -1) {                                                                                                 // 3181
					if (list[i].c === callback) {                                                                                     // 3182
						list.splice(i, 1);                                                                                               // 3183
						return;                                                                                                          // 3184
					}                                                                                                                 // 3185
				}                                                                                                                  // 3186
			}                                                                                                                   // 3187
		};                                                                                                                   // 3188
                                                                                                                       // 3189
		p.dispatchEvent = function(type) {                                                                                   // 3190
			var list = this._listeners[type],                                                                                   // 3191
				i, t, listener;                                                                                                    // 3192
			if (list) {                                                                                                         // 3193
				i = list.length;                                                                                                   // 3194
				t = this._eventTarget;                                                                                             // 3195
				while (--i > -1) {                                                                                                 // 3196
					listener = list[i];                                                                                               // 3197
					if (listener) {                                                                                                   // 3198
						if (listener.up) {                                                                                               // 3199
							listener.c.call(listener.s || t, {type:type, target:t});                                                        // 3200
						} else {                                                                                                         // 3201
							listener.c.call(listener.s || t);                                                                               // 3202
						}                                                                                                                // 3203
					}                                                                                                                 // 3204
				}                                                                                                                  // 3205
			}                                                                                                                   // 3206
		};                                                                                                                   // 3207
                                                                                                                       // 3208
                                                                                                                       // 3209
/*                                                                                                                     // 3210
 * ----------------------------------------------------------------                                                    // 3211
 * Ticker                                                                                                              // 3212
 * ----------------------------------------------------------------                                                    // 3213
 */                                                                                                                    // 3214
 		var _reqAnimFrame = window.requestAnimationFrame,                                                                   // 3215
			_cancelAnimFrame = window.cancelAnimationFrame,                                                                     // 3216
			_getTime = Date.now || function() {return new Date().getTime();},                                                   // 3217
			_lastUpdate = _getTime();                                                                                           // 3218
                                                                                                                       // 3219
		//now try to determine the requestAnimationFrame and cancelAnimationFrame functions and if none are found, we'll use a setTimeout()/clearTimeout() polyfill.
		a = ["ms","moz","webkit","o"];                                                                                       // 3221
		i = a.length;                                                                                                        // 3222
		while (--i > -1 && !_reqAnimFrame) {                                                                                 // 3223
			_reqAnimFrame = window[a[i] + "RequestAnimationFrame"];                                                             // 3224
			_cancelAnimFrame = window[a[i] + "CancelAnimationFrame"] || window[a[i] + "CancelRequestAnimationFrame"];           // 3225
		}                                                                                                                    // 3226
                                                                                                                       // 3227
		_class("Ticker", function(fps, useRAF) {                                                                             // 3228
			var _self = this,                                                                                                   // 3229
				_startTime = _getTime(),                                                                                           // 3230
				_useRAF = (useRAF !== false && _reqAnimFrame),                                                                     // 3231
				_lagThreshold = 500,                                                                                               // 3232
				_adjustedLag = 33,                                                                                                 // 3233
				_tickWord = "tick", //helps reduce gc burden                                                                       // 3234
				_fps, _req, _id, _gap, _nextTime,                                                                                  // 3235
				_tick = function(manual) {                                                                                         // 3236
					var elapsed = _getTime() - _lastUpdate,                                                                           // 3237
						overlap, dispatch;                                                                                               // 3238
					if (elapsed > _lagThreshold) {                                                                                    // 3239
						_startTime += elapsed - _adjustedLag;                                                                            // 3240
					}                                                                                                                 // 3241
					_lastUpdate += elapsed;                                                                                           // 3242
					_self.time = (_lastUpdate - _startTime) / 1000;                                                                   // 3243
					overlap = _self.time - _nextTime;                                                                                 // 3244
					if (!_fps || overlap > 0 || manual === true) {                                                                    // 3245
						_self.frame++;                                                                                                   // 3246
						_nextTime += overlap + (overlap >= _gap ? 0.004 : _gap - overlap);                                               // 3247
						dispatch = true;                                                                                                 // 3248
					}                                                                                                                 // 3249
					if (manual !== true) { //make sure the request is made before we dispatch the "tick" event so that timing is maintained. Otherwise, if processing the "tick" requires a bunch of time (like 15ms) and we're using a setTimeout() that's based on 16.7ms, it'd technically take 31.7ms between frames otherwise.
						_id = _req(_tick);                                                                                               // 3251
					}                                                                                                                 // 3252
					if (dispatch) {                                                                                                   // 3253
						_self.dispatchEvent(_tickWord);                                                                                  // 3254
					}                                                                                                                 // 3255
				};                                                                                                                 // 3256
                                                                                                                       // 3257
			EventDispatcher.call(_self);                                                                                        // 3258
			_self.time = _self.frame = 0;                                                                                       // 3259
			_self.tick = function() {                                                                                           // 3260
				_tick(true);                                                                                                       // 3261
			};                                                                                                                  // 3262
                                                                                                                       // 3263
			_self.lagSmoothing = function(threshold, adjustedLag) {                                                             // 3264
				_lagThreshold = threshold || (1 / _tinyNum); //zero should be interpreted as basically unlimited                   // 3265
				_adjustedLag = Math.min(adjustedLag, _lagThreshold, 0);                                                            // 3266
			};                                                                                                                  // 3267
                                                                                                                       // 3268
			_self.sleep = function() {                                                                                          // 3269
				if (_id == null) {                                                                                                 // 3270
					return;                                                                                                           // 3271
				}                                                                                                                  // 3272
				if (!_useRAF || !_cancelAnimFrame) {                                                                               // 3273
					clearTimeout(_id);                                                                                                // 3274
				} else {                                                                                                           // 3275
					_cancelAnimFrame(_id);                                                                                            // 3276
				}                                                                                                                  // 3277
				_req = _emptyFunc;                                                                                                 // 3278
				_id = null;                                                                                                        // 3279
				if (_self === _ticker) {                                                                                           // 3280
					_tickerActive = false;                                                                                            // 3281
				}                                                                                                                  // 3282
			};                                                                                                                  // 3283
                                                                                                                       // 3284
			_self.wake = function() {                                                                                           // 3285
				if (_id !== null) {                                                                                                // 3286
					_self.sleep();                                                                                                    // 3287
				} else if (_self.frame > 10) { //don't trigger lagSmoothing if we're just waking up, and make sure that at least 10 frames have elapsed because of the iOS bug that we work around below with the 1.5-second setTimout().
					_lastUpdate = _getTime() - _lagThreshold + 5;                                                                     // 3289
				}                                                                                                                  // 3290
				_req = (_fps === 0) ? _emptyFunc : (!_useRAF || !_reqAnimFrame) ? function(f) { return setTimeout(f, ((_nextTime - _self.time) * 1000 + 1) | 0); } : _reqAnimFrame;
				if (_self === _ticker) {                                                                                           // 3292
					_tickerActive = true;                                                                                             // 3293
				}                                                                                                                  // 3294
				_tick(2);                                                                                                          // 3295
			};                                                                                                                  // 3296
                                                                                                                       // 3297
			_self.fps = function(value) {                                                                                       // 3298
				if (!arguments.length) {                                                                                           // 3299
					return _fps;                                                                                                      // 3300
				}                                                                                                                  // 3301
				_fps = value;                                                                                                      // 3302
				_gap = 1 / (_fps || 60);                                                                                           // 3303
				_nextTime = this.time + _gap;                                                                                      // 3304
				_self.wake();                                                                                                      // 3305
			};                                                                                                                  // 3306
                                                                                                                       // 3307
			_self.useRAF = function(value) {                                                                                    // 3308
				if (!arguments.length) {                                                                                           // 3309
					return _useRAF;                                                                                                   // 3310
				}                                                                                                                  // 3311
				_self.sleep();                                                                                                     // 3312
				_useRAF = value;                                                                                                   // 3313
				_self.fps(_fps);                                                                                                   // 3314
			};                                                                                                                  // 3315
			_self.fps(fps);                                                                                                     // 3316
                                                                                                                       // 3317
			//a bug in iOS 6 Safari occasionally prevents the requestAnimationFrame from working initially, so we use a 1.5-second timeout that automatically falls back to setTimeout() if it senses this condition.
			setTimeout(function() {                                                                                             // 3319
				if (_useRAF && (!_id || _self.frame < 5)) {                                                                        // 3320
					_self.useRAF(false);                                                                                              // 3321
				}                                                                                                                  // 3322
			}, 1500);                                                                                                           // 3323
		});                                                                                                                  // 3324
                                                                                                                       // 3325
		p = gs.Ticker.prototype = new gs.events.EventDispatcher();                                                           // 3326
		p.constructor = gs.Ticker;                                                                                           // 3327
                                                                                                                       // 3328
                                                                                                                       // 3329
/*                                                                                                                     // 3330
 * ----------------------------------------------------------------                                                    // 3331
 * Animation                                                                                                           // 3332
 * ----------------------------------------------------------------                                                    // 3333
 */                                                                                                                    // 3334
		var Animation = _class("core.Animation", function(duration, vars) {                                                  // 3335
				this.vars = vars = vars || {};                                                                                     // 3336
				this._duration = this._totalDuration = duration || 0;                                                              // 3337
				this._delay = Number(vars.delay) || 0;                                                                             // 3338
				this._timeScale = 1;                                                                                               // 3339
				this._active = (vars.immediateRender === true);                                                                    // 3340
				this.data = vars.data;                                                                                             // 3341
				this._reversed = (vars.reversed === true);                                                                         // 3342
                                                                                                                       // 3343
				if (!_rootTimeline) {                                                                                              // 3344
					return;                                                                                                           // 3345
				}                                                                                                                  // 3346
				if (!_tickerActive) { //some browsers (like iOS 6 Safari) shut down JavaScript execution when the tab is disabled and they [occasionally] neglect to start up requestAnimationFrame again when returning - this code ensures that the engine starts up again properly.
					_ticker.wake();                                                                                                   // 3348
				}                                                                                                                  // 3349
                                                                                                                       // 3350
				var tl = this.vars.useFrames ? _rootFramesTimeline : _rootTimeline;                                                // 3351
				tl.add(this, tl._time);                                                                                            // 3352
                                                                                                                       // 3353
				if (this.vars.paused) {                                                                                            // 3354
					this.paused(true);                                                                                                // 3355
				}                                                                                                                  // 3356
			});                                                                                                                 // 3357
                                                                                                                       // 3358
		_ticker = Animation.ticker = new gs.Ticker();                                                                        // 3359
		p = Animation.prototype;                                                                                             // 3360
		p._dirty = p._gc = p._initted = p._paused = false;                                                                   // 3361
		p._totalTime = p._time = 0;                                                                                          // 3362
		p._rawPrevTime = -1;                                                                                                 // 3363
		p._next = p._last = p._onUpdate = p._timeline = p.timeline = null;                                                   // 3364
		p._paused = false;                                                                                                   // 3365
                                                                                                                       // 3366
                                                                                                                       // 3367
		//some browsers (like iOS) occasionally drop the requestAnimationFrame event when the user switches to a different tab and then comes back again, so we use a 2-second setTimeout() to sense if/when that condition occurs and then wake() the ticker.
		var _checkTimeout = function() {                                                                                     // 3369
				if (_tickerActive && _getTime() - _lastUpdate > 2000) {                                                            // 3370
					_ticker.wake();                                                                                                   // 3371
				}                                                                                                                  // 3372
				setTimeout(_checkTimeout, 2000);                                                                                   // 3373
			};                                                                                                                  // 3374
		_checkTimeout();                                                                                                     // 3375
                                                                                                                       // 3376
                                                                                                                       // 3377
		p.play = function(from, suppressEvents) {                                                                            // 3378
			if (from != null) {                                                                                                 // 3379
				this.seek(from, suppressEvents);                                                                                   // 3380
			}                                                                                                                   // 3381
			return this.reversed(false).paused(false);                                                                          // 3382
		};                                                                                                                   // 3383
                                                                                                                       // 3384
		p.pause = function(atTime, suppressEvents) {                                                                         // 3385
			if (atTime != null) {                                                                                               // 3386
				this.seek(atTime, suppressEvents);                                                                                 // 3387
			}                                                                                                                   // 3388
			return this.paused(true);                                                                                           // 3389
		};                                                                                                                   // 3390
                                                                                                                       // 3391
		p.resume = function(from, suppressEvents) {                                                                          // 3392
			if (from != null) {                                                                                                 // 3393
				this.seek(from, suppressEvents);                                                                                   // 3394
			}                                                                                                                   // 3395
			return this.paused(false);                                                                                          // 3396
		};                                                                                                                   // 3397
                                                                                                                       // 3398
		p.seek = function(time, suppressEvents) {                                                                            // 3399
			return this.totalTime(Number(time), suppressEvents !== false);                                                      // 3400
		};                                                                                                                   // 3401
                                                                                                                       // 3402
		p.restart = function(includeDelay, suppressEvents) {                                                                 // 3403
			return this.reversed(false).paused(false).totalTime(includeDelay ? -this._delay : 0, (suppressEvents !== false), true);
		};                                                                                                                   // 3405
                                                                                                                       // 3406
		p.reverse = function(from, suppressEvents) {                                                                         // 3407
			if (from != null) {                                                                                                 // 3408
				this.seek((from || this.totalDuration()), suppressEvents);                                                         // 3409
			}                                                                                                                   // 3410
			return this.reversed(true).paused(false);                                                                           // 3411
		};                                                                                                                   // 3412
                                                                                                                       // 3413
		p.render = function(time, suppressEvents, force) {                                                                   // 3414
			//stub - we override this method in subclasses.                                                                     // 3415
		};                                                                                                                   // 3416
                                                                                                                       // 3417
		p.invalidate = function() {                                                                                          // 3418
			this._time = this._totalTime = 0;                                                                                   // 3419
			this._initted = this._gc = false;                                                                                   // 3420
			this._rawPrevTime = -1;                                                                                             // 3421
			if (this._gc || !this.timeline) {                                                                                   // 3422
				this._enabled(true);                                                                                               // 3423
			}                                                                                                                   // 3424
			return this;                                                                                                        // 3425
		};                                                                                                                   // 3426
                                                                                                                       // 3427
		p.isActive = function() {                                                                                            // 3428
			var tl = this._timeline, //the 2 root timelines won't have a _timeline; they're always active.                      // 3429
				startTime = this._startTime,                                                                                       // 3430
				rawTime;                                                                                                           // 3431
			return (!tl || (!this._gc && !this._paused && tl.isActive() && (rawTime = tl.rawTime()) >= startTime && rawTime < startTime + this.totalDuration() / this._timeScale));
		};                                                                                                                   // 3433
                                                                                                                       // 3434
		p._enabled = function (enabled, ignoreTimeline) {                                                                    // 3435
			if (!_tickerActive) {                                                                                               // 3436
				_ticker.wake();                                                                                                    // 3437
			}                                                                                                                   // 3438
			this._gc = !enabled;                                                                                                // 3439
			this._active = this.isActive();                                                                                     // 3440
			if (ignoreTimeline !== true) {                                                                                      // 3441
				if (enabled && !this.timeline) {                                                                                   // 3442
					this._timeline.add(this, this._startTime - this._delay);                                                          // 3443
				} else if (!enabled && this.timeline) {                                                                            // 3444
					this._timeline._remove(this, true);                                                                               // 3445
				}                                                                                                                  // 3446
			}                                                                                                                   // 3447
			return false;                                                                                                       // 3448
		};                                                                                                                   // 3449
                                                                                                                       // 3450
                                                                                                                       // 3451
		p._kill = function(vars, target) {                                                                                   // 3452
			return this._enabled(false, false);                                                                                 // 3453
		};                                                                                                                   // 3454
                                                                                                                       // 3455
		p.kill = function(vars, target) {                                                                                    // 3456
			this._kill(vars, target);                                                                                           // 3457
			return this;                                                                                                        // 3458
		};                                                                                                                   // 3459
                                                                                                                       // 3460
		p._uncache = function(includeSelf) {                                                                                 // 3461
			var tween = includeSelf ? this : this.timeline;                                                                     // 3462
			while (tween) {                                                                                                     // 3463
				tween._dirty = true;                                                                                               // 3464
				tween = tween.timeline;                                                                                            // 3465
			}                                                                                                                   // 3466
			return this;                                                                                                        // 3467
		};                                                                                                                   // 3468
                                                                                                                       // 3469
		p._swapSelfInParams = function(params) {                                                                             // 3470
			var i = params.length,                                                                                              // 3471
				copy = params.concat();                                                                                            // 3472
			while (--i > -1) {                                                                                                  // 3473
				if (params[i] === "{self}") {                                                                                      // 3474
					copy[i] = this;                                                                                                   // 3475
				}                                                                                                                  // 3476
			}                                                                                                                   // 3477
			return copy;                                                                                                        // 3478
		};                                                                                                                   // 3479
                                                                                                                       // 3480
//----Animation getters/setters --------------------------------------------------------                               // 3481
                                                                                                                       // 3482
		p.eventCallback = function(type, callback, params, scope) {                                                          // 3483
			if ((type || "").substr(0,2) === "on") {                                                                            // 3484
				var v = this.vars;                                                                                                 // 3485
				if (arguments.length === 1) {                                                                                      // 3486
					return v[type];                                                                                                   // 3487
				}                                                                                                                  // 3488
				if (callback == null) {                                                                                            // 3489
					delete v[type];                                                                                                   // 3490
				} else {                                                                                                           // 3491
					v[type] = callback;                                                                                               // 3492
					v[type + "Params"] = (_isArray(params) && params.join("").indexOf("{self}") !== -1) ? this._swapSelfInParams(params) : params;
					v[type + "Scope"] = scope;                                                                                        // 3494
				}                                                                                                                  // 3495
				if (type === "onUpdate") {                                                                                         // 3496
					this._onUpdate = callback;                                                                                        // 3497
				}                                                                                                                  // 3498
			}                                                                                                                   // 3499
			return this;                                                                                                        // 3500
		};                                                                                                                   // 3501
                                                                                                                       // 3502
		p.delay = function(value) {                                                                                          // 3503
			if (!arguments.length) {                                                                                            // 3504
				return this._delay;                                                                                                // 3505
			}                                                                                                                   // 3506
			if (this._timeline.smoothChildTiming) {                                                                             // 3507
				this.startTime( this._startTime + value - this._delay );                                                           // 3508
			}                                                                                                                   // 3509
			this._delay = value;                                                                                                // 3510
			return this;                                                                                                        // 3511
		};                                                                                                                   // 3512
                                                                                                                       // 3513
		p.duration = function(value) {                                                                                       // 3514
			if (!arguments.length) {                                                                                            // 3515
				this._dirty = false;                                                                                               // 3516
				return this._duration;                                                                                             // 3517
			}                                                                                                                   // 3518
			this._duration = this._totalDuration = value;                                                                       // 3519
			this._uncache(true); //true in case it's a TweenMax or TimelineMax that has a repeat - we'll need to refresh the totalDuration.
			if (this._timeline.smoothChildTiming) if (this._time > 0) if (this._time < this._duration) if (value !== 0) {       // 3521
				this.totalTime(this._totalTime * (value / this._duration), true);                                                  // 3522
			}                                                                                                                   // 3523
			return this;                                                                                                        // 3524
		};                                                                                                                   // 3525
                                                                                                                       // 3526
		p.totalDuration = function(value) {                                                                                  // 3527
			this._dirty = false;                                                                                                // 3528
			return (!arguments.length) ? this._totalDuration : this.duration(value);                                            // 3529
		};                                                                                                                   // 3530
                                                                                                                       // 3531
		p.time = function(value, suppressEvents) {                                                                           // 3532
			if (!arguments.length) {                                                                                            // 3533
				return this._time;                                                                                                 // 3534
			}                                                                                                                   // 3535
			if (this._dirty) {                                                                                                  // 3536
				this.totalDuration();                                                                                              // 3537
			}                                                                                                                   // 3538
			return this.totalTime((value > this._duration) ? this._duration : value, suppressEvents);                           // 3539
		};                                                                                                                   // 3540
                                                                                                                       // 3541
		p.totalTime = function(time, suppressEvents, uncapped) {                                                             // 3542
			if (!_tickerActive) {                                                                                               // 3543
				_ticker.wake();                                                                                                    // 3544
			}                                                                                                                   // 3545
			if (!arguments.length) {                                                                                            // 3546
				return this._totalTime;                                                                                            // 3547
			}                                                                                                                   // 3548
			if (this._timeline) {                                                                                               // 3549
				if (time < 0 && !uncapped) {                                                                                       // 3550
					time += this.totalDuration();                                                                                     // 3551
				}                                                                                                                  // 3552
				if (this._timeline.smoothChildTiming) {                                                                            // 3553
					if (this._dirty) {                                                                                                // 3554
						this.totalDuration();                                                                                            // 3555
					}                                                                                                                 // 3556
					var totalDuration = this._totalDuration,                                                                          // 3557
						tl = this._timeline;                                                                                             // 3558
					if (time > totalDuration && !uncapped) {                                                                          // 3559
						time = totalDuration;                                                                                            // 3560
					}                                                                                                                 // 3561
					this._startTime = (this._paused ? this._pauseTime : tl._time) - ((!this._reversed ? time : totalDuration - time) / this._timeScale);
					if (!tl._dirty) { //for performance improvement. If the parent's cache is already dirty, it already took care of marking the ancestors as dirty too, so skip the function call here.
						this._uncache(false);                                                                                            // 3564
					}                                                                                                                 // 3565
					//in case any of the ancestor timelines had completed but should now be enabled, we should reset their totalTime() which will also ensure that they're lined up properly and enabled. Skip for animations that are on the root (wasteful). Example: a TimelineLite.exportRoot() is performed when there's a paused tween on the root, the export will not complete until that tween is unpaused, but imagine a child gets restarted later, after all [unpaused] tweens have completed. The startTime of that child would get pushed out, but one of the ancestors may have completed.
					if (tl._timeline) {                                                                                               // 3567
						while (tl._timeline) {                                                                                           // 3568
							if (tl._timeline._time !== (tl._startTime + tl._totalTime) / tl._timeScale) {                                   // 3569
								tl.totalTime(tl._totalTime, true);                                                                             // 3570
							}                                                                                                               // 3571
							tl = tl._timeline;                                                                                              // 3572
						}                                                                                                                // 3573
					}                                                                                                                 // 3574
				}                                                                                                                  // 3575
				if (this._gc) {                                                                                                    // 3576
					this._enabled(true, false);                                                                                       // 3577
				}                                                                                                                  // 3578
				if (this._totalTime !== time || this._duration === 0) {                                                            // 3579
					this.render(time, suppressEvents, false);                                                                         // 3580
					if (_lazyTweens.length) { //in case rendering caused any tweens to lazy-init, we should render them because typically when someone calls seek() or time() or progress(), they expect an immediate render.
						_lazyRender();                                                                                                   // 3582
					}                                                                                                                 // 3583
				}                                                                                                                  // 3584
			}                                                                                                                   // 3585
			return this;                                                                                                        // 3586
		};                                                                                                                   // 3587
                                                                                                                       // 3588
		p.progress = p.totalProgress = function(value, suppressEvents) {                                                     // 3589
			return (!arguments.length) ? this._time / this.duration() : this.totalTime(this.duration() * value, suppressEvents);
		};                                                                                                                   // 3591
                                                                                                                       // 3592
		p.startTime = function(value) {                                                                                      // 3593
			if (!arguments.length) {                                                                                            // 3594
				return this._startTime;                                                                                            // 3595
			}                                                                                                                   // 3596
			if (value !== this._startTime) {                                                                                    // 3597
				this._startTime = value;                                                                                           // 3598
				if (this.timeline) if (this.timeline._sortChildren) {                                                              // 3599
					this.timeline.add(this, value - this._delay); //ensures that any necessary re-sequencing of Animations in the timeline occurs to make sure the rendering order is correct.
				}                                                                                                                  // 3601
			}                                                                                                                   // 3602
			return this;                                                                                                        // 3603
		};                                                                                                                   // 3604
                                                                                                                       // 3605
		p.endTime = function(includeRepeats) {                                                                               // 3606
			return this._startTime + ((includeRepeats != false) ? this.totalDuration() : this.duration()) / this._timeScale;    // 3607
		};                                                                                                                   // 3608
                                                                                                                       // 3609
		p.timeScale = function(value) {                                                                                      // 3610
			if (!arguments.length) {                                                                                            // 3611
				return this._timeScale;                                                                                            // 3612
			}                                                                                                                   // 3613
			value = value || _tinyNum; //can't allow zero because it'll throw the math off                                      // 3614
			if (this._timeline && this._timeline.smoothChildTiming) {                                                           // 3615
				var pauseTime = this._pauseTime,                                                                                   // 3616
					t = (pauseTime || pauseTime === 0) ? pauseTime : this._timeline.totalTime();                                      // 3617
				this._startTime = t - ((t - this._startTime) * this._timeScale / value);                                           // 3618
			}                                                                                                                   // 3619
			this._timeScale = value;                                                                                            // 3620
			return this._uncache(false);                                                                                        // 3621
		};                                                                                                                   // 3622
                                                                                                                       // 3623
		p.reversed = function(value) {                                                                                       // 3624
			if (!arguments.length) {                                                                                            // 3625
				return this._reversed;                                                                                             // 3626
			}                                                                                                                   // 3627
			if (value != this._reversed) {                                                                                      // 3628
				this._reversed = value;                                                                                            // 3629
				this.totalTime(((this._timeline && !this._timeline.smoothChildTiming) ? this.totalDuration() - this._totalTime : this._totalTime), true);
			}                                                                                                                   // 3631
			return this;                                                                                                        // 3632
		};                                                                                                                   // 3633
                                                                                                                       // 3634
		p.paused = function(value) {                                                                                         // 3635
			if (!arguments.length) {                                                                                            // 3636
				return this._paused;                                                                                               // 3637
			}                                                                                                                   // 3638
			var tl = this._timeline,                                                                                            // 3639
				raw, elapsed;                                                                                                      // 3640
			if (value != this._paused) if (tl) {                                                                                // 3641
				if (!_tickerActive && !value) {                                                                                    // 3642
					_ticker.wake();                                                                                                   // 3643
				}                                                                                                                  // 3644
				raw = tl.rawTime();                                                                                                // 3645
				elapsed = raw - this._pauseTime;                                                                                   // 3646
				if (!value && tl.smoothChildTiming) {                                                                              // 3647
					this._startTime += elapsed;                                                                                       // 3648
					this._uncache(false);                                                                                             // 3649
				}                                                                                                                  // 3650
				this._pauseTime = value ? raw : null;                                                                              // 3651
				this._paused = value;                                                                                              // 3652
				this._active = this.isActive();                                                                                    // 3653
				if (!value && elapsed !== 0 && this._initted && this.duration()) {                                                 // 3654
					this.render((tl.smoothChildTiming ? this._totalTime : (raw - this._startTime) / this._timeScale), true, true); //in case the target's properties changed via some other tween or manual update by the user, we should force a render.
				}                                                                                                                  // 3656
			}                                                                                                                   // 3657
			if (this._gc && !value) {                                                                                           // 3658
				this._enabled(true, false);                                                                                        // 3659
			}                                                                                                                   // 3660
			return this;                                                                                                        // 3661
		};                                                                                                                   // 3662
                                                                                                                       // 3663
                                                                                                                       // 3664
/*                                                                                                                     // 3665
 * ----------------------------------------------------------------                                                    // 3666
 * SimpleTimeline                                                                                                      // 3667
 * ----------------------------------------------------------------                                                    // 3668
 */                                                                                                                    // 3669
		var SimpleTimeline = _class("core.SimpleTimeline", function(vars) {                                                  // 3670
			Animation.call(this, 0, vars);                                                                                      // 3671
			this.autoRemoveChildren = this.smoothChildTiming = true;                                                            // 3672
		});                                                                                                                  // 3673
                                                                                                                       // 3674
		p = SimpleTimeline.prototype = new Animation();                                                                      // 3675
		p.constructor = SimpleTimeline;                                                                                      // 3676
		p.kill()._gc = false;                                                                                                // 3677
		p._first = p._last = p._recent = null;                                                                               // 3678
		p._sortChildren = false;                                                                                             // 3679
                                                                                                                       // 3680
		p.add = p.insert = function(child, position, align, stagger) {                                                       // 3681
			var prevTween, st;                                                                                                  // 3682
			child._startTime = Number(position || 0) + child._delay;                                                            // 3683
			if (child._paused) if (this !== child._timeline) { //we only adjust the _pauseTime if it wasn't in this timeline already. Remember, sometimes a tween will be inserted again into the same timeline when its startTime is changed so that the tweens in the TimelineLite/Max are re-ordered properly in the linked list (so everything renders in the proper order).
				child._pauseTime = child._startTime + ((this.rawTime() - child._startTime) / child._timeScale);                    // 3685
			}                                                                                                                   // 3686
			if (child.timeline) {                                                                                               // 3687
				child.timeline._remove(child, true); //removes from existing timeline so that it can be properly added to this one.
			}                                                                                                                   // 3689
			child.timeline = child._timeline = this;                                                                            // 3690
			if (child._gc) {                                                                                                    // 3691
				child._enabled(true, true);                                                                                        // 3692
			}                                                                                                                   // 3693
			prevTween = this._last;                                                                                             // 3694
			if (this._sortChildren) {                                                                                           // 3695
				st = child._startTime;                                                                                             // 3696
				while (prevTween && prevTween._startTime > st) {                                                                   // 3697
					prevTween = prevTween._prev;                                                                                      // 3698
				}                                                                                                                  // 3699
			}                                                                                                                   // 3700
			if (prevTween) {                                                                                                    // 3701
				child._next = prevTween._next;                                                                                     // 3702
				prevTween._next = child;                                                                                           // 3703
			} else {                                                                                                            // 3704
				child._next = this._first;                                                                                         // 3705
				this._first = child;                                                                                               // 3706
			}                                                                                                                   // 3707
			if (child._next) {                                                                                                  // 3708
				child._next._prev = child;                                                                                         // 3709
			} else {                                                                                                            // 3710
				this._last = child;                                                                                                // 3711
			}                                                                                                                   // 3712
			child._prev = prevTween;                                                                                            // 3713
			this._recent = child;                                                                                               // 3714
			if (this._timeline) {                                                                                               // 3715
				this._uncache(true);                                                                                               // 3716
			}                                                                                                                   // 3717
			return this;                                                                                                        // 3718
		};                                                                                                                   // 3719
                                                                                                                       // 3720
		p._remove = function(tween, skipDisable) {                                                                           // 3721
			if (tween.timeline === this) {                                                                                      // 3722
				if (!skipDisable) {                                                                                                // 3723
					tween._enabled(false, true);                                                                                      // 3724
				}                                                                                                                  // 3725
                                                                                                                       // 3726
				if (tween._prev) {                                                                                                 // 3727
					tween._prev._next = tween._next;                                                                                  // 3728
				} else if (this._first === tween) {                                                                                // 3729
					this._first = tween._next;                                                                                        // 3730
				}                                                                                                                  // 3731
				if (tween._next) {                                                                                                 // 3732
					tween._next._prev = tween._prev;                                                                                  // 3733
				} else if (this._last === tween) {                                                                                 // 3734
					this._last = tween._prev;                                                                                         // 3735
				}                                                                                                                  // 3736
				tween._next = tween._prev = tween.timeline = null;                                                                 // 3737
				if (tween === this._recent) {                                                                                      // 3738
					this._recent = this._last;                                                                                        // 3739
				}                                                                                                                  // 3740
                                                                                                                       // 3741
				if (this._timeline) {                                                                                              // 3742
					this._uncache(true);                                                                                              // 3743
				}                                                                                                                  // 3744
			}                                                                                                                   // 3745
			return this;                                                                                                        // 3746
		};                                                                                                                   // 3747
                                                                                                                       // 3748
		p.render = function(time, suppressEvents, force) {                                                                   // 3749
			var tween = this._first,                                                                                            // 3750
				next;                                                                                                              // 3751
			this._totalTime = this._time = this._rawPrevTime = time;                                                            // 3752
			while (tween) {                                                                                                     // 3753
				next = tween._next; //record it here because the value could change after rendering...                             // 3754
				if (tween._active || (time >= tween._startTime && !tween._paused)) {                                               // 3755
					if (!tween._reversed) {                                                                                           // 3756
						tween.render((time - tween._startTime) * tween._timeScale, suppressEvents, force);                               // 3757
					} else {                                                                                                          // 3758
						tween.render(((!tween._dirty) ? tween._totalDuration : tween.totalDuration()) - ((time - tween._startTime) * tween._timeScale), suppressEvents, force);
					}                                                                                                                 // 3760
				}                                                                                                                  // 3761
				tween = next;                                                                                                      // 3762
			}                                                                                                                   // 3763
		};                                                                                                                   // 3764
                                                                                                                       // 3765
		p.rawTime = function() {                                                                                             // 3766
			if (!_tickerActive) {                                                                                               // 3767
				_ticker.wake();                                                                                                    // 3768
			}                                                                                                                   // 3769
			return this._totalTime;                                                                                             // 3770
		};                                                                                                                   // 3771
                                                                                                                       // 3772
/*                                                                                                                     // 3773
 * ----------------------------------------------------------------                                                    // 3774
 * TweenLite                                                                                                           // 3775
 * ----------------------------------------------------------------                                                    // 3776
 */                                                                                                                    // 3777
		var TweenLite = _class("TweenLite", function(target, duration, vars) {                                               // 3778
				Animation.call(this, duration, vars);                                                                              // 3779
				this.render = TweenLite.prototype.render; //speed optimization (avoid prototype lookup on this "hot" method)       // 3780
                                                                                                                       // 3781
				if (target == null) {                                                                                              // 3782
					throw "Cannot tween a null target.";                                                                              // 3783
				}                                                                                                                  // 3784
                                                                                                                       // 3785
				this.target = target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;              // 3786
                                                                                                                       // 3787
				var isSelector = (target.jquery || (target.length && target !== window && target[0] && (target[0] === window || (target[0].nodeType && target[0].style && !target.nodeType)))),
					overwrite = this.vars.overwrite,                                                                                  // 3789
					i, targ, targets;                                                                                                 // 3790
                                                                                                                       // 3791
				this._overwrite = overwrite = (overwrite == null) ? _overwriteLookup[TweenLite.defaultOverwrite] : (typeof(overwrite) === "number") ? overwrite >> 0 : _overwriteLookup[overwrite];
                                                                                                                       // 3793
				if ((isSelector || target instanceof Array || (target.push && _isArray(target))) && typeof(target[0]) !== "number") {
					this._targets = targets = _slice(target);  //don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
					this._propLookup = [];                                                                                            // 3796
					this._siblings = [];                                                                                              // 3797
					for (i = 0; i < targets.length; i++) {                                                                            // 3798
						targ = targets[i];                                                                                               // 3799
						if (!targ) {                                                                                                     // 3800
							targets.splice(i--, 1);                                                                                         // 3801
							continue;                                                                                                       // 3802
						} else if (typeof(targ) === "string") {                                                                          // 3803
							targ = targets[i--] = TweenLite.selector(targ); //in case it's an array of strings                              // 3804
							if (typeof(targ) === "string") {                                                                                // 3805
								targets.splice(i+1, 1); //to avoid an endless loop (can't imagine why the selector would return a string, but just in case)
							}                                                                                                               // 3807
							continue;                                                                                                       // 3808
						} else if (targ.length && targ !== window && targ[0] && (targ[0] === window || (targ[0].nodeType && targ[0].style && !targ.nodeType))) { //in case the user is passing in an array of selector objects (like jQuery objects), we need to check one more level and pull things out if necessary. Also note that <select> elements pass all the criteria regarding length and the first child having style, so we must also check to ensure the target isn't an HTML node itself.
							targets.splice(i--, 1);                                                                                         // 3810
							this._targets = targets = targets.concat(_slice(targ));                                                         // 3811
							continue;                                                                                                       // 3812
						}                                                                                                                // 3813
						this._siblings[i] = _register(targ, this, false);                                                                // 3814
						if (overwrite === 1) if (this._siblings[i].length > 1) {                                                         // 3815
							_applyOverwrite(targ, this, null, 1, this._siblings[i]);                                                        // 3816
						}                                                                                                                // 3817
					}                                                                                                                 // 3818
                                                                                                                       // 3819
				} else {                                                                                                           // 3820
					this._propLookup = {};                                                                                            // 3821
					this._siblings = _register(target, this, false);                                                                  // 3822
					if (overwrite === 1) if (this._siblings.length > 1) {                                                             // 3823
						_applyOverwrite(target, this, null, 1, this._siblings);                                                          // 3824
					}                                                                                                                 // 3825
				}                                                                                                                  // 3826
				if (this.vars.immediateRender || (duration === 0 && this._delay === 0 && this.vars.immediateRender !== false)) {   // 3827
					this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
					this.render(-this._delay);                                                                                        // 3829
				}                                                                                                                  // 3830
			}, true),                                                                                                           // 3831
			_isSelector = function(v) {                                                                                         // 3832
				return (v && v.length && v !== window && v[0] && (v[0] === window || (v[0].nodeType && v[0].style && !v.nodeType))); //we cannot check "nodeType" if the target is window from within an iframe, otherwise it will trigger a security error in some browsers like Firefox.
			},                                                                                                                  // 3834
			_autoCSS = function(vars, target) {                                                                                 // 3835
				var css = {},                                                                                                      // 3836
					p;                                                                                                                // 3837
				for (p in vars) {                                                                                                  // 3838
					if (!_reservedProps[p] && (!(p in target) || p === "transform" || p === "x" || p === "y" || p === "width" || p === "height" || p === "className" || p === "border") && (!_plugins[p] || (_plugins[p] && _plugins[p]._autoCSS))) { //note: <img> elements contain read-only "x" and "y" properties. We should also prioritize editing css width/height rather than the element's properties.
						css[p] = vars[p];                                                                                                // 3840
						delete vars[p];                                                                                                  // 3841
					}                                                                                                                 // 3842
				}                                                                                                                  // 3843
				vars.css = css;                                                                                                    // 3844
			};                                                                                                                  // 3845
                                                                                                                       // 3846
		p = TweenLite.prototype = new Animation();                                                                           // 3847
		p.constructor = TweenLite;                                                                                           // 3848
		p.kill()._gc = false;                                                                                                // 3849
                                                                                                                       // 3850
//----TweenLite defaults, overwrite management, and root updates ----------------------------------------------------  // 3851
                                                                                                                       // 3852
		p.ratio = 0;                                                                                                         // 3853
		p._firstPT = p._targets = p._overwrittenProps = p._startAt = null;                                                   // 3854
		p._notifyPluginsOfEnabled = p._lazy = false;                                                                         // 3855
                                                                                                                       // 3856
		TweenLite.version = "1.16.0";                                                                                        // 3857
		TweenLite.defaultEase = p._ease = new Ease(null, null, 1, 1);                                                        // 3858
		TweenLite.defaultOverwrite = "auto";                                                                                 // 3859
		TweenLite.ticker = _ticker;                                                                                          // 3860
		TweenLite.autoSleep = 120;                                                                                           // 3861
		TweenLite.lagSmoothing = function(threshold, adjustedLag) {                                                          // 3862
			_ticker.lagSmoothing(threshold, adjustedLag);                                                                       // 3863
		};                                                                                                                   // 3864
                                                                                                                       // 3865
		TweenLite.selector = window.$ || window.jQuery || function(e) {                                                      // 3866
			var selector = window.$ || window.jQuery;                                                                           // 3867
			if (selector) {                                                                                                     // 3868
				TweenLite.selector = selector;                                                                                     // 3869
				return selector(e);                                                                                                // 3870
			}                                                                                                                   // 3871
			return (typeof(document) === "undefined") ? e : (document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById((e.charAt(0) === "#") ? e.substr(1) : e));
		};                                                                                                                   // 3873
                                                                                                                       // 3874
		var _lazyTweens = [],                                                                                                // 3875
			_lazyLookup = {},                                                                                                   // 3876
			_internals = TweenLite._internals = {isArray:_isArray, isSelector:_isSelector, lazyTweens:_lazyTweens}, //gives us a way to expose certain private values to other GreenSock classes without contaminating tha main TweenLite object.
			_plugins = TweenLite._plugins = {},                                                                                 // 3878
			_tweenLookup = _internals.tweenLookup = {},                                                                         // 3879
			_tweenLookupNum = 0,                                                                                                // 3880
			_reservedProps = _internals.reservedProps = {ease:1, delay:1, overwrite:1, onComplete:1, onCompleteParams:1, onCompleteScope:1, useFrames:1, runBackwards:1, startAt:1, onUpdate:1, onUpdateParams:1, onUpdateScope:1, onStart:1, onStartParams:1, onStartScope:1, onReverseComplete:1, onReverseCompleteParams:1, onReverseCompleteScope:1, onRepeat:1, onRepeatParams:1, onRepeatScope:1, easeParams:1, yoyo:1, immediateRender:1, repeat:1, repeatDelay:1, data:1, paused:1, reversed:1, autoCSS:1, lazy:1, onOverwrite:1},
			_overwriteLookup = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0},         // 3882
			_rootFramesTimeline = Animation._rootFramesTimeline = new SimpleTimeline(),                                         // 3883
			_rootTimeline = Animation._rootTimeline = new SimpleTimeline(),                                                     // 3884
			_nextGCFrame = 30,                                                                                                  // 3885
			_lazyRender = _internals.lazyRender = function() {                                                                  // 3886
				var i = _lazyTweens.length,                                                                                        // 3887
					tween;                                                                                                            // 3888
				_lazyLookup = {};                                                                                                  // 3889
				while (--i > -1) {                                                                                                 // 3890
					tween = _lazyTweens[i];                                                                                           // 3891
					if (tween && tween._lazy !== false) {                                                                             // 3892
						tween.render(tween._lazy[0], tween._lazy[1], true);                                                              // 3893
						tween._lazy = false;                                                                                             // 3894
					}                                                                                                                 // 3895
				}                                                                                                                  // 3896
				_lazyTweens.length = 0;                                                                                            // 3897
			};                                                                                                                  // 3898
                                                                                                                       // 3899
		_rootTimeline._startTime = _ticker.time;                                                                             // 3900
		_rootFramesTimeline._startTime = _ticker.frame;                                                                      // 3901
		_rootTimeline._active = _rootFramesTimeline._active = true;                                                          // 3902
		setTimeout(_lazyRender, 1); //on some mobile devices, there isn't a "tick" before code runs which means any lazy renders wouldn't run before the next official "tick".
                                                                                                                       // 3904
		Animation._updateRoot = TweenLite.render = function() {                                                              // 3905
				var i, a, p;                                                                                                       // 3906
				if (_lazyTweens.length) { //if code is run outside of the requestAnimationFrame loop, there may be tweens queued AFTER the engine refreshed, so we need to ensure any pending renders occur before we refresh again.
					_lazyRender();                                                                                                    // 3908
				}                                                                                                                  // 3909
				_rootTimeline.render((_ticker.time - _rootTimeline._startTime) * _rootTimeline._timeScale, false, false);          // 3910
				_rootFramesTimeline.render((_ticker.frame - _rootFramesTimeline._startTime) * _rootFramesTimeline._timeScale, false, false);
				if (_lazyTweens.length) {                                                                                          // 3912
					_lazyRender();                                                                                                    // 3913
				}                                                                                                                  // 3914
				if (_ticker.frame >= _nextGCFrame) { //dump garbage every 120 frames or whatever the user sets TweenLite.autoSleep to
					_nextGCFrame = _ticker.frame + (parseInt(TweenLite.autoSleep, 10) || 120);                                        // 3916
					for (p in _tweenLookup) {                                                                                         // 3917
						a = _tweenLookup[p].tweens;                                                                                      // 3918
						i = a.length;                                                                                                    // 3919
						while (--i > -1) {                                                                                               // 3920
							if (a[i]._gc) {                                                                                                 // 3921
								a.splice(i, 1);                                                                                                // 3922
							}                                                                                                               // 3923
						}                                                                                                                // 3924
						if (a.length === 0) {                                                                                            // 3925
							delete _tweenLookup[p];                                                                                         // 3926
						}                                                                                                                // 3927
					}                                                                                                                 // 3928
					//if there are no more tweens in the root timelines, or if they're all paused, make the _timer sleep to reduce load on the CPU slightly
					p = _rootTimeline._first;                                                                                         // 3930
					if (!p || p._paused) if (TweenLite.autoSleep && !_rootFramesTimeline._first && _ticker._listeners.tick.length === 1) {
						while (p && p._paused) {                                                                                         // 3932
							p = p._next;                                                                                                    // 3933
						}                                                                                                                // 3934
						if (!p) {                                                                                                        // 3935
							_ticker.sleep();                                                                                                // 3936
						}                                                                                                                // 3937
					}                                                                                                                 // 3938
				}                                                                                                                  // 3939
			};                                                                                                                  // 3940
                                                                                                                       // 3941
		_ticker.addEventListener("tick", Animation._updateRoot);                                                             // 3942
                                                                                                                       // 3943
		var _register = function(target, tween, scrub) {                                                                     // 3944
				var id = target._gsTweenID, a, i;                                                                                  // 3945
				if (!_tweenLookup[id || (target._gsTweenID = id = "t" + (_tweenLookupNum++))]) {                                   // 3946
					_tweenLookup[id] = {target:target, tweens:[]};                                                                    // 3947
				}                                                                                                                  // 3948
				if (tween) {                                                                                                       // 3949
					a = _tweenLookup[id].tweens;                                                                                      // 3950
					a[(i = a.length)] = tween;                                                                                        // 3951
					if (scrub) {                                                                                                      // 3952
						while (--i > -1) {                                                                                               // 3953
							if (a[i] === tween) {                                                                                           // 3954
								a.splice(i, 1);                                                                                                // 3955
							}                                                                                                               // 3956
						}                                                                                                                // 3957
					}                                                                                                                 // 3958
				}                                                                                                                  // 3959
				return _tweenLookup[id].tweens;                                                                                    // 3960
			},                                                                                                                  // 3961
                                                                                                                       // 3962
			_onOverwrite = function(overwrittenTween, overwritingTween, target, killedProps) {                                  // 3963
				var func = overwrittenTween.vars.onOverwrite, r1, r2;                                                              // 3964
				if (func) {                                                                                                        // 3965
					r1 = func(overwrittenTween, overwritingTween, target, killedProps);                                               // 3966
				}                                                                                                                  // 3967
				func = TweenLite.onOverwrite;                                                                                      // 3968
				if (func) {                                                                                                        // 3969
					r2 = func(overwrittenTween, overwritingTween, target, killedProps);                                               // 3970
				}                                                                                                                  // 3971
				return (r1 !== false && r2 !== false);                                                                             // 3972
			},                                                                                                                  // 3973
			_applyOverwrite = function(target, tween, props, mode, siblings) {                                                  // 3974
				var i, changed, curTween, l;                                                                                       // 3975
				if (mode === 1 || mode >= 4) {                                                                                     // 3976
					l = siblings.length;                                                                                              // 3977
					for (i = 0; i < l; i++) {                                                                                         // 3978
						if ((curTween = siblings[i]) !== tween) {                                                                        // 3979
							if (!curTween._gc) {                                                                                            // 3980
								if (_onOverwrite(curTween, tween) && curTween._enabled(false, false)) {                                        // 3981
									changed = true;                                                                                               // 3982
								}                                                                                                              // 3983
							}                                                                                                               // 3984
						} else if (mode === 5) {                                                                                         // 3985
							break;                                                                                                          // 3986
						}                                                                                                                // 3987
					}                                                                                                                 // 3988
					return changed;                                                                                                   // 3989
				}                                                                                                                  // 3990
				//NOTE: Add 0.0000000001 to overcome floating point errors that can cause the startTime to be VERY slightly off (when a tween's time() is set for example)
				var startTime = tween._startTime + _tinyNum,                                                                       // 3992
					overlaps = [],                                                                                                    // 3993
					oCount = 0,                                                                                                       // 3994
					zeroDur = (tween._duration === 0),                                                                                // 3995
					globalStart;                                                                                                      // 3996
				i = siblings.length;                                                                                               // 3997
				while (--i > -1) {                                                                                                 // 3998
					if ((curTween = siblings[i]) === tween || curTween._gc || curTween._paused) {                                     // 3999
						//ignore                                                                                                         // 4000
					} else if (curTween._timeline !== tween._timeline) {                                                              // 4001
						globalStart = globalStart || _checkOverlap(tween, 0, zeroDur);                                                   // 4002
						if (_checkOverlap(curTween, globalStart, zeroDur) === 0) {                                                       // 4003
							overlaps[oCount++] = curTween;                                                                                  // 4004
						}                                                                                                                // 4005
					} else if (curTween._startTime <= startTime) if (curTween._startTime + curTween.totalDuration() / curTween._timeScale > startTime) if (!((zeroDur || !curTween._initted) && startTime - curTween._startTime <= 0.0000000002)) {
						overlaps[oCount++] = curTween;                                                                                   // 4007
					}                                                                                                                 // 4008
				}                                                                                                                  // 4009
                                                                                                                       // 4010
				i = oCount;                                                                                                        // 4011
				while (--i > -1) {                                                                                                 // 4012
					curTween = overlaps[i];                                                                                           // 4013
					if (mode === 2) if (curTween._kill(props, target, tween)) {                                                       // 4014
						changed = true;                                                                                                  // 4015
					}                                                                                                                 // 4016
					if (mode !== 2 || (!curTween._firstPT && curTween._initted)) {                                                    // 4017
						if (mode !== 2 && !_onOverwrite(curTween, tween)) {                                                              // 4018
							continue;                                                                                                       // 4019
						}                                                                                                                // 4020
						if (curTween._enabled(false, false)) { //if all property tweens have been overwritten, kill the tween.           // 4021
							changed = true;                                                                                                 // 4022
						}                                                                                                                // 4023
					}                                                                                                                 // 4024
				}                                                                                                                  // 4025
				return changed;                                                                                                    // 4026
			},                                                                                                                  // 4027
                                                                                                                       // 4028
			_checkOverlap = function(tween, reference, zeroDur) {                                                               // 4029
				var tl = tween._timeline,                                                                                          // 4030
					ts = tl._timeScale,                                                                                               // 4031
					t = tween._startTime;                                                                                             // 4032
				while (tl._timeline) {                                                                                             // 4033
					t += tl._startTime;                                                                                               // 4034
					ts *= tl._timeScale;                                                                                              // 4035
					if (tl._paused) {                                                                                                 // 4036
						return -100;                                                                                                     // 4037
					}                                                                                                                 // 4038
					tl = tl._timeline;                                                                                                // 4039
				}                                                                                                                  // 4040
				t /= ts;                                                                                                           // 4041
				return (t > reference) ? t - reference : ((zeroDur && t === reference) || (!tween._initted && t - reference < 2 * _tinyNum)) ? _tinyNum : ((t += tween.totalDuration() / tween._timeScale / ts) > reference + _tinyNum) ? 0 : t - reference - _tinyNum;
			};                                                                                                                  // 4043
                                                                                                                       // 4044
                                                                                                                       // 4045
//---- TweenLite instance methods -----------------------------------------------------------------------------        // 4046
                                                                                                                       // 4047
		p._init = function() {                                                                                               // 4048
			var v = this.vars,                                                                                                  // 4049
				op = this._overwrittenProps,                                                                                       // 4050
				dur = this._duration,                                                                                              // 4051
				immediate = !!v.immediateRender,                                                                                   // 4052
				ease = v.ease,                                                                                                     // 4053
				i, initPlugins, pt, p, startVars;                                                                                  // 4054
			if (v.startAt) {                                                                                                    // 4055
				if (this._startAt) {                                                                                               // 4056
					this._startAt.render(-1, true); //if we've run a startAt previously (when the tween instantiated), we should revert it so that the values re-instantiate correctly particularly for relative tweens. Without this, a TweenLite.fromTo(obj, 1, {x:"+=100"}, {x:"-=100"}), for example, would actually jump to +=200 because the startAt would run twice, doubling the relative change.
					this._startAt.kill();                                                                                             // 4058
				}                                                                                                                  // 4059
				startVars = {};                                                                                                    // 4060
				for (p in v.startAt) { //copy the properties/values into a new object to avoid collisions, like var to = {x:0}, from = {x:500}; timeline.fromTo(e, 1, from, to).fromTo(e, 1, to, from);
					startVars[p] = v.startAt[p];                                                                                      // 4062
				}                                                                                                                  // 4063
				startVars.overwrite = false;                                                                                       // 4064
				startVars.immediateRender = true;                                                                                  // 4065
				startVars.lazy = (immediate && v.lazy !== false);                                                                  // 4066
				startVars.startAt = startVars.delay = null; //no nesting of startAt objects allowed (otherwise it could cause an infinite loop).
				this._startAt = TweenLite.to(this.target, 0, startVars);                                                           // 4068
				if (immediate) {                                                                                                   // 4069
					if (this._time > 0) {                                                                                             // 4070
						this._startAt = null; //tweens that render immediately (like most from() and fromTo() tweens) shouldn't revert when their parent timeline's playhead goes backward past the startTime because the initial render could have happened anytime and it shouldn't be directly correlated to this tween's startTime. Imagine setting up a complex animation where the beginning states of various objects are rendered immediately but the tween doesn't happen for quite some time - if we revert to the starting values as soon as the playhead goes backward past the tween's startTime, it will throw things off visually. Reversion should only happen in TimelineLite/Max instances where immediateRender was false (which is the default in the convenience methods like from()).
					} else if (dur !== 0) {                                                                                           // 4072
						return; //we skip initialization here so that overwriting doesn't occur until the tween actually begins. Otherwise, if you create several immediateRender:true tweens of the same target/properties to drop into a TimelineLite or TimelineMax, the last one created would overwrite the first ones because they didn't get placed into the timeline yet before the first render occurs and kicks in overwriting.
					}                                                                                                                 // 4074
				}                                                                                                                  // 4075
			} else if (v.runBackwards && dur !== 0) {                                                                           // 4076
				//from() tweens must be handled uniquely: their beginning values must be rendered but we don't want overwriting to occur yet (when time is still 0). Wait until the tween actually begins before doing all the routines like overwriting. At that time, we should render at the END of the tween to ensure that things initialize correctly (remember, from() tweens go backwards)
				if (this._startAt) {                                                                                               // 4078
					this._startAt.render(-1, true);                                                                                   // 4079
					this._startAt.kill();                                                                                             // 4080
					this._startAt = null;                                                                                             // 4081
				} else {                                                                                                           // 4082
					if (this._time !== 0) { //in rare cases (like if a from() tween runs and then is invalidate()-ed), immediateRender could be true but the initial forced-render gets skipped, so there's no need to force the render in this context when the _time is greater than 0
						immediate = false;                                                                                               // 4084
					}                                                                                                                 // 4085
					pt = {};                                                                                                          // 4086
					for (p in v) { //copy props into a new object and skip any reserved props, otherwise onComplete or onUpdate or onStart could fire. We should, however, permit autoCSS to go through.
						if (!_reservedProps[p] || p === "autoCSS") {                                                                     // 4088
							pt[p] = v[p];                                                                                                   // 4089
						}                                                                                                                // 4090
					}                                                                                                                 // 4091
					pt.overwrite = 0;                                                                                                 // 4092
					pt.data = "isFromStart"; //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
					pt.lazy = (immediate && v.lazy !== false);                                                                        // 4094
					pt.immediateRender = immediate; //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
					this._startAt = TweenLite.to(this.target, 0, pt);                                                                 // 4096
					if (!immediate) {                                                                                                 // 4097
						this._startAt._init(); //ensures that the initial values are recorded                                            // 4098
						this._startAt._enabled(false); //no need to have the tween render on the next cycle. Disable it because we'll always manually control the renders of the _startAt tween.
						if (this.vars.immediateRender) {                                                                                 // 4100
							this._startAt = null;                                                                                           // 4101
						}                                                                                                                // 4102
					} else if (this._time === 0) {                                                                                    // 4103
						return;                                                                                                          // 4104
					}                                                                                                                 // 4105
				}                                                                                                                  // 4106
			}                                                                                                                   // 4107
			this._ease = ease = (!ease) ? TweenLite.defaultEase : (ease instanceof Ease) ? ease : (typeof(ease) === "function") ? new Ease(ease, v.easeParams) : _easeMap[ease] || TweenLite.defaultEase;
			if (v.easeParams instanceof Array && ease.config) {                                                                 // 4109
				this._ease = ease.config.apply(ease, v.easeParams);                                                                // 4110
			}                                                                                                                   // 4111
			this._easeType = this._ease._type;                                                                                  // 4112
			this._easePower = this._ease._power;                                                                                // 4113
			this._firstPT = null;                                                                                               // 4114
                                                                                                                       // 4115
			if (this._targets) {                                                                                                // 4116
				i = this._targets.length;                                                                                          // 4117
				while (--i > -1) {                                                                                                 // 4118
					if ( this._initProps( this._targets[i], (this._propLookup[i] = {}), this._siblings[i], (op ? op[i] : null)) ) {   // 4119
						initPlugins = true;                                                                                              // 4120
					}                                                                                                                 // 4121
				}                                                                                                                  // 4122
			} else {                                                                                                            // 4123
				initPlugins = this._initProps(this.target, this._propLookup, this._siblings, op);                                  // 4124
			}                                                                                                                   // 4125
                                                                                                                       // 4126
			if (initPlugins) {                                                                                                  // 4127
				TweenLite._onPluginEvent("_onInitAllProps", this); //reorders the array in order of priority. Uses a static TweenPlugin method in order to minimize file size in TweenLite
			}                                                                                                                   // 4129
			if (op) if (!this._firstPT) if (typeof(this.target) !== "function") { //if all tweening properties have been overwritten, kill the tween. If the target is a function, it's probably a delayedCall so let it live.
				this._enabled(false, false);                                                                                       // 4131
			}                                                                                                                   // 4132
			if (v.runBackwards) {                                                                                               // 4133
				pt = this._firstPT;                                                                                                // 4134
				while (pt) {                                                                                                       // 4135
					pt.s += pt.c;                                                                                                     // 4136
					pt.c = -pt.c;                                                                                                     // 4137
					pt = pt._next;                                                                                                    // 4138
				}                                                                                                                  // 4139
			}                                                                                                                   // 4140
			this._onUpdate = v.onUpdate;                                                                                        // 4141
			this._initted = true;                                                                                               // 4142
		};                                                                                                                   // 4143
                                                                                                                       // 4144
		p._initProps = function(target, propLookup, siblings, overwrittenProps) {                                            // 4145
			var p, i, initPlugins, plugin, pt, v;                                                                               // 4146
			if (target == null) {                                                                                               // 4147
				return false;                                                                                                      // 4148
			}                                                                                                                   // 4149
                                                                                                                       // 4150
			if (_lazyLookup[target._gsTweenID]) {                                                                               // 4151
				_lazyRender(); //if other tweens of the same target have recently initted but haven't rendered yet, we've got to force the render so that the starting values are correct (imagine populating a timeline with a bunch of sequential tweens and then jumping to the end)
			}                                                                                                                   // 4153
                                                                                                                       // 4154
			if (!this.vars.css) if (target.style) if (target !== window && target.nodeType) if (_plugins.css) if (this.vars.autoCSS !== false) { //it's so common to use TweenLite/Max to animate the css of DOM elements, we assume that if the target is a DOM element, that's what is intended (a convenience so that users don't have to wrap things in css:{}, although we still recommend it for a slight performance boost and better specificity). Note: we cannot check "nodeType" on the window inside an iframe.
				_autoCSS(this.vars, target);                                                                                       // 4156
			}                                                                                                                   // 4157
			for (p in this.vars) {                                                                                              // 4158
				v = this.vars[p];                                                                                                  // 4159
				if (_reservedProps[p]) {                                                                                           // 4160
					if (v) if ((v instanceof Array) || (v.push && _isArray(v))) if (v.join("").indexOf("{self}") !== -1) {            // 4161
						this.vars[p] = v = this._swapSelfInParams(v, this);                                                              // 4162
					}                                                                                                                 // 4163
                                                                                                                       // 4164
				} else if (_plugins[p] && (plugin = new _plugins[p]())._onInitTween(target, this.vars[p], this)) {                 // 4165
                                                                                                                       // 4166
					//t - target 		[object]                                                                                           // 4167
					//p - property 		[string]                                                                                         // 4168
					//s - start			[number]                                                                                            // 4169
					//c - change		[number]                                                                                            // 4170
					//f - isFunction	[boolean]                                                                                        // 4171
					//n - name			[string]                                                                                             // 4172
					//pg - isPlugin 	[boolean]                                                                                        // 4173
					//pr - priority		[number]                                                                                         // 4174
					this._firstPT = pt = {_next:this._firstPT, t:plugin, p:"setRatio", s:0, c:1, f:true, n:p, pg:true, pr:plugin._priority};
					i = plugin._overwriteProps.length;                                                                                // 4176
					while (--i > -1) {                                                                                                // 4177
						propLookup[plugin._overwriteProps[i]] = this._firstPT;                                                           // 4178
					}                                                                                                                 // 4179
					if (plugin._priority || plugin._onInitAllProps) {                                                                 // 4180
						initPlugins = true;                                                                                              // 4181
					}                                                                                                                 // 4182
					if (plugin._onDisable || plugin._onEnable) {                                                                      // 4183
						this._notifyPluginsOfEnabled = true;                                                                             // 4184
					}                                                                                                                 // 4185
                                                                                                                       // 4186
				} else {                                                                                                           // 4187
					this._firstPT = propLookup[p] = pt = {_next:this._firstPT, t:target, p:p, f:(typeof(target[p]) === "function"), n:p, pg:false, pr:0};
					pt.s = (!pt.f) ? parseFloat(target[p]) : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]();
					pt.c = (typeof(v) === "string" && v.charAt(1) === "=") ? parseInt(v.charAt(0) + "1", 10) * Number(v.substr(2)) : (Number(v) - pt.s) || 0;
				}                                                                                                                  // 4191
				if (pt) if (pt._next) {                                                                                            // 4192
					pt._next._prev = pt;                                                                                              // 4193
				}                                                                                                                  // 4194
			}                                                                                                                   // 4195
                                                                                                                       // 4196
			if (overwrittenProps) if (this._kill(overwrittenProps, target)) { //another tween may have tried to overwrite properties of this tween before init() was called (like if two tweens start at the same time, the one created second will run first)
				return this._initProps(target, propLookup, siblings, overwrittenProps);                                            // 4198
			}                                                                                                                   // 4199
			if (this._overwrite > 1) if (this._firstPT) if (siblings.length > 1) if (_applyOverwrite(target, this, propLookup, this._overwrite, siblings)) {
				this._kill(propLookup, target);                                                                                    // 4201
				return this._initProps(target, propLookup, siblings, overwrittenProps);                                            // 4202
			}                                                                                                                   // 4203
			if (this._firstPT) if ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration)) { //zero duration tweens don't lazy render by default; everything else does.
				_lazyLookup[target._gsTweenID] = true;                                                                             // 4205
			}                                                                                                                   // 4206
			return initPlugins;                                                                                                 // 4207
		};                                                                                                                   // 4208
                                                                                                                       // 4209
		p.render = function(time, suppressEvents, force) {                                                                   // 4210
			var prevTime = this._time,                                                                                          // 4211
				duration = this._duration,                                                                                         // 4212
				prevRawPrevTime = this._rawPrevTime,                                                                               // 4213
				isComplete, callback, pt, rawPrevTime;                                                                             // 4214
			if (time >= duration) {                                                                                             // 4215
				this._totalTime = this._time = duration;                                                                           // 4216
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1;                                                     // 4217
				if (!this._reversed ) {                                                                                            // 4218
					isComplete = true;                                                                                                // 4219
					callback = "onComplete";                                                                                          // 4220
				}                                                                                                                  // 4221
				if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
					if (this._startTime === this._timeline._duration) { //if a zero-duration tween is at the VERY end of a timeline and that timeline renders at its end, it will typically add a tiny bit of cushion to the render time to prevent rounding errors from getting in the way of tweens rendering their VERY end. If we then reverse() that timeline, the zero-duration tween will trigger its onReverseComplete even though technically the playhead didn't pass over it again. It's a very specific edge case we must accommodate.
						time = 0;                                                                                                        // 4224
					}                                                                                                                 // 4225
					if (time === 0 || prevRawPrevTime < 0 || (prevRawPrevTime === _tinyNum && this.data !== "isPause")) if (prevRawPrevTime !== time) { //note: when this.data is "isPause", it's a callback added by addPause() on a timeline that we should not be triggered when LEAVING its exact start time. In other words, tl.addPause(1).play(1) shouldn't pause.
						force = true;                                                                                                    // 4227
						if (prevRawPrevTime > _tinyNum) {                                                                                // 4228
							callback = "onReverseComplete";                                                                                 // 4229
						}                                                                                                                // 4230
					}                                                                                                                 // 4231
					this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
				}                                                                                                                  // 4233
                                                                                                                       // 4234
			} else if (time < 0.0000001) { //to work around occasional floating point math artifacts, round super small values to 0.
				this._totalTime = this._time = 0;                                                                                  // 4236
				this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;                                                     // 4237
				if (prevTime !== 0 || (duration === 0 && prevRawPrevTime > 0)) {                                                   // 4238
					callback = "onReverseComplete";                                                                                   // 4239
					isComplete = this._reversed;                                                                                      // 4240
				}                                                                                                                  // 4241
				if (time < 0) {                                                                                                    // 4242
					this._active = false;                                                                                             // 4243
					if (duration === 0) if (this._initted || !this.vars.lazy || force) { //zero-duration tweens are tricky because we must discern the momentum/direction of time in order to determine whether the starting values should be rendered or the ending values. If the "playhead" of its timeline goes past the zero-duration tween in the forward direction or lands directly on it, the end values should be rendered, but if the timeline's "playhead" moves past it in the backward direction (from a postitive time to a negative time), the starting values must be rendered.
						if (prevRawPrevTime >= 0 && !(prevRawPrevTime === _tinyNum && this.data === "isPause")) {                        // 4245
							force = true;                                                                                                   // 4246
						}                                                                                                                // 4247
						this._rawPrevTime = rawPrevTime = (!suppressEvents || time || prevRawPrevTime === time) ? time : _tinyNum; //when the playhead arrives at EXACTLY time 0 (right on top) of a zero-duration tween, we need to discern if events are suppressed so that when the playhead moves again (next time), it'll trigger the callback. If events are NOT suppressed, obviously the callback would be triggered in this render. Basically, the callback should fire either when the playhead ARRIVES or LEAVES this exact spot, not both. Imagine doing a timeline.seek(0) and there's a callback that sits at 0. Since events are suppressed on that seek() by default, nothing will fire, but when the playhead moves off of that position, the callback should fire. This behavior is what people intuitively expect. We set the _rawPrevTime to be a precise tiny number to indicate this scenario rather than using another property/variable which would increase memory usage. This technique is less readable, but more efficient.
					}                                                                                                                 // 4249
				}                                                                                                                  // 4250
				if (!this._initted) { //if we render the very beginning (time == 0) of a fromTo(), we must force the render (normal tweens wouldn't need to render at a time of 0 when the prevTime was also 0). This is also mandatory to make sure overwriting kicks in immediately.
					force = true;                                                                                                     // 4252
				}                                                                                                                  // 4253
			} else {                                                                                                            // 4254
				this._totalTime = this._time = time;                                                                               // 4255
                                                                                                                       // 4256
				if (this._easeType) {                                                                                              // 4257
					var r = time / duration, type = this._easeType, pow = this._easePower;                                            // 4258
					if (type === 1 || (type === 3 && r >= 0.5)) {                                                                     // 4259
						r = 1 - r;                                                                                                       // 4260
					}                                                                                                                 // 4261
					if (type === 3) {                                                                                                 // 4262
						r *= 2;                                                                                                          // 4263
					}                                                                                                                 // 4264
					if (pow === 1) {                                                                                                  // 4265
						r *= r;                                                                                                          // 4266
					} else if (pow === 2) {                                                                                           // 4267
						r *= r * r;                                                                                                      // 4268
					} else if (pow === 3) {                                                                                           // 4269
						r *= r * r * r;                                                                                                  // 4270
					} else if (pow === 4) {                                                                                           // 4271
						r *= r * r * r * r;                                                                                              // 4272
					}                                                                                                                 // 4273
                                                                                                                       // 4274
					if (type === 1) {                                                                                                 // 4275
						this.ratio = 1 - r;                                                                                              // 4276
					} else if (type === 2) {                                                                                          // 4277
						this.ratio = r;                                                                                                  // 4278
					} else if (time / duration < 0.5) {                                                                               // 4279
						this.ratio = r / 2;                                                                                              // 4280
					} else {                                                                                                          // 4281
						this.ratio = 1 - (r / 2);                                                                                        // 4282
					}                                                                                                                 // 4283
                                                                                                                       // 4284
				} else {                                                                                                           // 4285
					this.ratio = this._ease.getRatio(time / duration);                                                                // 4286
				}                                                                                                                  // 4287
			}                                                                                                                   // 4288
                                                                                                                       // 4289
			if (this._time === prevTime && !force) {                                                                            // 4290
				return;                                                                                                            // 4291
			} else if (!this._initted) {                                                                                        // 4292
				this._init();                                                                                                      // 4293
				if (!this._initted || this._gc) { //immediateRender tweens typically won't initialize until the playhead advances (_time is greater than 0) in order to ensure that overwriting occurs properly. Also, if all of the tweening properties have been overwritten (which would cause _gc to be true, as set in _init()), we shouldn't continue otherwise an onStart callback could be called for example.
					return;                                                                                                           // 4295
				} else if (!force && this._firstPT && ((this.vars.lazy !== false && this._duration) || (this.vars.lazy && !this._duration))) {
					this._time = this._totalTime = prevTime;                                                                          // 4297
					this._rawPrevTime = prevRawPrevTime;                                                                              // 4298
					_lazyTweens.push(this);                                                                                           // 4299
					this._lazy = [time, suppressEvents];                                                                              // 4300
					return;                                                                                                           // 4301
				}                                                                                                                  // 4302
				//_ease is initially set to defaultEase, so now that init() has run, _ease is set properly and we need to recalculate the ratio. Overall this is faster than using conditional logic earlier in the method to avoid having to set ratio twice because we only init() once but renderTime() gets called VERY frequently.
				if (this._time && !isComplete) {                                                                                   // 4304
					this.ratio = this._ease.getRatio(this._time / duration);                                                          // 4305
				} else if (isComplete && this._ease._calcEnd) {                                                                    // 4306
					this.ratio = this._ease.getRatio((this._time === 0) ? 0 : 1);                                                     // 4307
				}                                                                                                                  // 4308
			}                                                                                                                   // 4309
			if (this._lazy !== false) { //in case a lazy render is pending, we should flush it because the new render is occurring now (imagine a lazy tween instantiating and then immediately the user calls tween.seek(tween.duration()), skipping to the end - the end render would be forced, and then if we didn't flush the lazy render, it'd fire AFTER the seek(), rendering it at the wrong time.
				this._lazy = false;                                                                                                // 4311
			}                                                                                                                   // 4312
			if (!this._active) if (!this._paused && this._time !== prevTime && time >= 0) {                                     // 4313
				this._active = true;  //so that if the user renders a tween (as opposed to the timeline rendering it), the timeline is forced to re-render and align it with the proper time/frame on the next rendering cycle. Maybe the tween already finished but the user manually re-renders it as halfway done.
			}                                                                                                                   // 4315
			if (prevTime === 0) {                                                                                               // 4316
				if (this._startAt) {                                                                                               // 4317
					if (time >= 0) {                                                                                                  // 4318
						this._startAt.render(time, suppressEvents, force);                                                               // 4319
					} else if (!callback) {                                                                                           // 4320
						callback = "_dummyGS"; //if no callback is defined, use a dummy value just so that the condition at the end evaluates as true because _startAt should render AFTER the normal render loop when the time is negative. We could handle this in a more intuitive way, of course, but the render loop is the MOST important thing to optimize, so this technique allows us to avoid adding extra conditional logic in a high-frequency area.
					}                                                                                                                 // 4322
				}                                                                                                                  // 4323
				if (this.vars.onStart) if (this._time !== 0 || duration === 0) if (!suppressEvents) {                              // 4324
					this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _blankArray);                  // 4325
				}                                                                                                                  // 4326
			}                                                                                                                   // 4327
			pt = this._firstPT;                                                                                                 // 4328
			while (pt) {                                                                                                        // 4329
				if (pt.f) {                                                                                                        // 4330
					pt.t[pt.p](pt.c * this.ratio + pt.s);                                                                             // 4331
				} else {                                                                                                           // 4332
					pt.t[pt.p] = pt.c * this.ratio + pt.s;                                                                            // 4333
				}                                                                                                                  // 4334
				pt = pt._next;                                                                                                     // 4335
			}                                                                                                                   // 4336
                                                                                                                       // 4337
			if (this._onUpdate) {                                                                                               // 4338
				if (time < 0) if (this._startAt && time !== -0.0001) { //if the tween is positioned at the VERY beginning (_startTime 0) of its parent timeline, it's illegal for the playhead to go back further, so we should not render the recorded startAt values.
					this._startAt.render(time, suppressEvents, force); //note: for performance reasons, we tuck this conditional logic inside less traveled areas (most tweens don't have an onUpdate). We'd just have it at the end before the onComplete, but the values should be updated before any onUpdate is called, so we ALSO put it here and then if it's not called, we do so later near the onComplete.
				}                                                                                                                  // 4341
				if (!suppressEvents) if (this._time !== prevTime || isComplete) {                                                  // 4342
					this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _blankArray);                   // 4343
				}                                                                                                                  // 4344
			}                                                                                                                   // 4345
			if (callback) if (!this._gc || force) { //check _gc because there's a chance that kill() could be called in an onUpdate
				if (time < 0 && this._startAt && !this._onUpdate && time !== -0.0001) { //-0.0001 is a special value that we use when looping back to the beginning of a repeated TimelineMax, in which case we shouldn't render the _startAt values.
					this._startAt.render(time, suppressEvents, force);                                                                // 4348
				}                                                                                                                  // 4349
				if (isComplete) {                                                                                                  // 4350
					if (this._timeline.autoRemoveChildren) {                                                                          // 4351
						this._enabled(false, false);                                                                                     // 4352
					}                                                                                                                 // 4353
					this._active = false;                                                                                             // 4354
				}                                                                                                                  // 4355
				if (!suppressEvents && this.vars[callback]) {                                                                      // 4356
					this.vars[callback].apply(this.vars[callback + "Scope"] || this, this.vars[callback + "Params"] || _blankArray);  // 4357
				}                                                                                                                  // 4358
				if (duration === 0 && this._rawPrevTime === _tinyNum && rawPrevTime !== _tinyNum) { //the onComplete or onReverseComplete could trigger movement of the playhead and for zero-duration tweens (which must discern direction) that land directly back on their start time, we don't want to fire again on the next render. Think of several addPause()'s in a timeline that forces the playhead to a certain spot, but what if it's already paused and another tween is tweening the "time" of the timeline? Each time it moves [forward] past that spot, it would move back, and since suppressEvents is true, it'd reset _rawPrevTime to _tinyNum so that when it begins again, the callback would fire (so ultimately it could bounce back and forth during that tween). Again, this is a very uncommon scenario, but possible nonetheless.
					this._rawPrevTime = 0;                                                                                            // 4360
				}                                                                                                                  // 4361
			}                                                                                                                   // 4362
		};                                                                                                                   // 4363
                                                                                                                       // 4364
		p._kill = function(vars, target, overwritingTween) {                                                                 // 4365
			if (vars === "all") {                                                                                               // 4366
				vars = null;                                                                                                       // 4367
			}                                                                                                                   // 4368
			if (vars == null) if (target == null || target === this.target) {                                                   // 4369
				this._lazy = false;                                                                                                // 4370
				return this._enabled(false, false);                                                                                // 4371
			}                                                                                                                   // 4372
			target = (typeof(target) !== "string") ? (target || this._targets || this.target) : TweenLite.selector(target) || target;
			var i, overwrittenProps, p, pt, propLookup, changed, killProps, record, killed;                                     // 4374
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {                                  // 4375
				i = target.length;                                                                                                 // 4376
				while (--i > -1) {                                                                                                 // 4377
					if (this._kill(vars, target[i])) {                                                                                // 4378
						changed = true;                                                                                                  // 4379
					}                                                                                                                 // 4380
				}                                                                                                                  // 4381
			} else {                                                                                                            // 4382
				if (this._targets) {                                                                                               // 4383
					i = this._targets.length;                                                                                         // 4384
					while (--i > -1) {                                                                                                // 4385
						if (target === this._targets[i]) {                                                                               // 4386
							propLookup = this._propLookup[i] || {};                                                                         // 4387
							this._overwrittenProps = this._overwrittenProps || [];                                                          // 4388
							overwrittenProps = this._overwrittenProps[i] = vars ? this._overwrittenProps[i] || {} : "all";                  // 4389
							break;                                                                                                          // 4390
						}                                                                                                                // 4391
					}                                                                                                                 // 4392
				} else if (target !== this.target) {                                                                               // 4393
					return false;                                                                                                     // 4394
				} else {                                                                                                           // 4395
					propLookup = this._propLookup;                                                                                    // 4396
					overwrittenProps = this._overwrittenProps = vars ? this._overwrittenProps || {} : "all";                          // 4397
				}                                                                                                                  // 4398
                                                                                                                       // 4399
				if (propLookup) {                                                                                                  // 4400
					killProps = vars || propLookup;                                                                                   // 4401
					record = (vars !== overwrittenProps && overwrittenProps !== "all" && vars !== propLookup && (typeof(vars) !== "object" || !vars._tempKill)); //_tempKill is a super-secret way to delete a particular tweening property but NOT have it remembered as an official overwritten property (like in BezierPlugin)
					if (overwritingTween && (TweenLite.onOverwrite || this.vars.onOverwrite)) {                                       // 4403
						for (p in killProps) {                                                                                           // 4404
							if (propLookup[p]) {                                                                                            // 4405
								if (!killed) {                                                                                                 // 4406
									killed = [];                                                                                                  // 4407
								}                                                                                                              // 4408
								killed.push(p);                                                                                                // 4409
							}                                                                                                               // 4410
						}                                                                                                                // 4411
						if (!_onOverwrite(this, overwritingTween, target, killed)) { //if the onOverwrite returned false, that means the user wants to override the overwriting (cancel it).
							return false;                                                                                                   // 4413
						}                                                                                                                // 4414
					}                                                                                                                 // 4415
                                                                                                                       // 4416
					for (p in killProps) {                                                                                            // 4417
						if ((pt = propLookup[p])) {                                                                                      // 4418
							if (pt.pg && pt.t._kill(killProps)) {                                                                           // 4419
								changed = true; //some plugins need to be notified so they can perform cleanup tasks first                     // 4420
							}                                                                                                               // 4421
							if (!pt.pg || pt.t._overwriteProps.length === 0) {                                                              // 4422
								if (pt._prev) {                                                                                                // 4423
									pt._prev._next = pt._next;                                                                                    // 4424
								} else if (pt === this._firstPT) {                                                                             // 4425
									this._firstPT = pt._next;                                                                                     // 4426
								}                                                                                                              // 4427
								if (pt._next) {                                                                                                // 4428
									pt._next._prev = pt._prev;                                                                                    // 4429
								}                                                                                                              // 4430
								pt._next = pt._prev = null;                                                                                    // 4431
							}                                                                                                               // 4432
							delete propLookup[p];                                                                                           // 4433
						}                                                                                                                // 4434
						if (record) {                                                                                                    // 4435
							overwrittenProps[p] = 1;                                                                                        // 4436
						}                                                                                                                // 4437
					}                                                                                                                 // 4438
					if (!this._firstPT && this._initted) { //if all tweening properties are killed, kill the tween. Without this line, if there's a tween with multiple targets and then you killTweensOf() each target individually, the tween would technically still remain active and fire its onComplete even though there aren't any more properties tweening.
						this._enabled(false, false);                                                                                     // 4440
					}                                                                                                                 // 4441
				}                                                                                                                  // 4442
			}                                                                                                                   // 4443
			return changed;                                                                                                     // 4444
		};                                                                                                                   // 4445
                                                                                                                       // 4446
		p.invalidate = function() {                                                                                          // 4447
			if (this._notifyPluginsOfEnabled) {                                                                                 // 4448
				TweenLite._onPluginEvent("_onDisable", this);                                                                      // 4449
			}                                                                                                                   // 4450
			this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null;                                     // 4451
			this._notifyPluginsOfEnabled = this._active = this._lazy = false;                                                   // 4452
			this._propLookup = (this._targets) ? {} : [];                                                                       // 4453
			Animation.prototype.invalidate.call(this);                                                                          // 4454
			if (this.vars.immediateRender) {                                                                                    // 4455
				this._time = -_tinyNum; //forces a render without having to set the render() "force" parameter to true because we want to allow lazying by default (using the "force" parameter always forces an immediate full render)
				this.render(-this._delay);                                                                                         // 4457
			}                                                                                                                   // 4458
			return this;                                                                                                        // 4459
		};                                                                                                                   // 4460
                                                                                                                       // 4461
		p._enabled = function(enabled, ignoreTimeline) {                                                                     // 4462
			if (!_tickerActive) {                                                                                               // 4463
				_ticker.wake();                                                                                                    // 4464
			}                                                                                                                   // 4465
			if (enabled && this._gc) {                                                                                          // 4466
				var targets = this._targets,                                                                                       // 4467
					i;                                                                                                                // 4468
				if (targets) {                                                                                                     // 4469
					i = targets.length;                                                                                               // 4470
					while (--i > -1) {                                                                                                // 4471
						this._siblings[i] = _register(targets[i], this, true);                                                           // 4472
					}                                                                                                                 // 4473
				} else {                                                                                                           // 4474
					this._siblings = _register(this.target, this, true);                                                              // 4475
				}                                                                                                                  // 4476
			}                                                                                                                   // 4477
			Animation.prototype._enabled.call(this, enabled, ignoreTimeline);                                                   // 4478
			if (this._notifyPluginsOfEnabled) if (this._firstPT) {                                                              // 4479
				return TweenLite._onPluginEvent((enabled ? "_onEnable" : "_onDisable"), this);                                     // 4480
			}                                                                                                                   // 4481
			return false;                                                                                                       // 4482
		};                                                                                                                   // 4483
                                                                                                                       // 4484
                                                                                                                       // 4485
//----TweenLite static methods -----------------------------------------------------                                   // 4486
                                                                                                                       // 4487
		TweenLite.to = function(target, duration, vars) {                                                                    // 4488
			return new TweenLite(target, duration, vars);                                                                       // 4489
		};                                                                                                                   // 4490
                                                                                                                       // 4491
		TweenLite.from = function(target, duration, vars) {                                                                  // 4492
			vars.runBackwards = true;                                                                                           // 4493
			vars.immediateRender = (vars.immediateRender != false);                                                             // 4494
			return new TweenLite(target, duration, vars);                                                                       // 4495
		};                                                                                                                   // 4496
                                                                                                                       // 4497
		TweenLite.fromTo = function(target, duration, fromVars, toVars) {                                                    // 4498
			toVars.startAt = fromVars;                                                                                          // 4499
			toVars.immediateRender = (toVars.immediateRender != false && fromVars.immediateRender != false);                    // 4500
			return new TweenLite(target, duration, toVars);                                                                     // 4501
		};                                                                                                                   // 4502
                                                                                                                       // 4503
		TweenLite.delayedCall = function(delay, callback, params, scope, useFrames) {                                        // 4504
			return new TweenLite(callback, 0, {delay:delay, onComplete:callback, onCompleteParams:params, onCompleteScope:scope, onReverseComplete:callback, onReverseCompleteParams:params, onReverseCompleteScope:scope, immediateRender:false, lazy:false, useFrames:useFrames, overwrite:0});
		};                                                                                                                   // 4506
                                                                                                                       // 4507
		TweenLite.set = function(target, vars) {                                                                             // 4508
			return new TweenLite(target, 0, vars);                                                                              // 4509
		};                                                                                                                   // 4510
                                                                                                                       // 4511
		TweenLite.getTweensOf = function(target, onlyActive) {                                                               // 4512
			if (target == null) { return []; }                                                                                  // 4513
			target = (typeof(target) !== "string") ? target : TweenLite.selector(target) || target;                             // 4514
			var i, a, j, t;                                                                                                     // 4515
			if ((_isArray(target) || _isSelector(target)) && typeof(target[0]) !== "number") {                                  // 4516
				i = target.length;                                                                                                 // 4517
				a = [];                                                                                                            // 4518
				while (--i > -1) {                                                                                                 // 4519
					a = a.concat(TweenLite.getTweensOf(target[i], onlyActive));                                                       // 4520
				}                                                                                                                  // 4521
				i = a.length;                                                                                                      // 4522
				//now get rid of any duplicates (tweens of arrays of objects could cause duplicates)                               // 4523
				while (--i > -1) {                                                                                                 // 4524
					t = a[i];                                                                                                         // 4525
					j = i;                                                                                                            // 4526
					while (--j > -1) {                                                                                                // 4527
						if (t === a[j]) {                                                                                                // 4528
							a.splice(i, 1);                                                                                                 // 4529
						}                                                                                                                // 4530
					}                                                                                                                 // 4531
				}                                                                                                                  // 4532
			} else {                                                                                                            // 4533
				a = _register(target).concat();                                                                                    // 4534
				i = a.length;                                                                                                      // 4535
				while (--i > -1) {                                                                                                 // 4536
					if (a[i]._gc || (onlyActive && !a[i].isActive())) {                                                               // 4537
						a.splice(i, 1);                                                                                                  // 4538
					}                                                                                                                 // 4539
				}                                                                                                                  // 4540
			}                                                                                                                   // 4541
			return a;                                                                                                           // 4542
		};                                                                                                                   // 4543
                                                                                                                       // 4544
		TweenLite.killTweensOf = TweenLite.killDelayedCallsTo = function(target, onlyActive, vars) {                         // 4545
			if (typeof(onlyActive) === "object") {                                                                              // 4546
				vars = onlyActive; //for backwards compatibility (before "onlyActive" parameter was inserted)                      // 4547
				onlyActive = false;                                                                                                // 4548
			}                                                                                                                   // 4549
			var a = TweenLite.getTweensOf(target, onlyActive),                                                                  // 4550
				i = a.length;                                                                                                      // 4551
			while (--i > -1) {                                                                                                  // 4552
				a[i]._kill(vars, target);                                                                                          // 4553
			}                                                                                                                   // 4554
		};                                                                                                                   // 4555
                                                                                                                       // 4556
                                                                                                                       // 4557
                                                                                                                       // 4558
/*                                                                                                                     // 4559
 * ----------------------------------------------------------------                                                    // 4560
 * TweenPlugin   (could easily be split out as a separate file/class, but included for ease of use (so that people don't need to include another script call before loading plugins which is easy to forget)
 * ----------------------------------------------------------------                                                    // 4562
 */                                                                                                                    // 4563
		var TweenPlugin = _class("plugins.TweenPlugin", function(props, priority) {                                          // 4564
					this._overwriteProps = (props || "").split(",");                                                                  // 4565
					this._propName = this._overwriteProps[0];                                                                         // 4566
					this._priority = priority || 0;                                                                                   // 4567
					this._super = TweenPlugin.prototype;                                                                              // 4568
				}, true);                                                                                                          // 4569
                                                                                                                       // 4570
		p = TweenPlugin.prototype;                                                                                           // 4571
		TweenPlugin.version = "1.10.1";                                                                                      // 4572
		TweenPlugin.API = 2;                                                                                                 // 4573
		p._firstPT = null;                                                                                                   // 4574
                                                                                                                       // 4575
		p._addTween = function(target, prop, start, end, overwriteProp, round) {                                             // 4576
			var c, pt;                                                                                                          // 4577
			if (end != null && (c = (typeof(end) === "number" || end.charAt(1) !== "=") ? Number(end) - start : parseInt(end.charAt(0) + "1", 10) * Number(end.substr(2)))) {
				this._firstPT = pt = {_next:this._firstPT, t:target, p:prop, s:start, c:c, f:(typeof(target[prop]) === "function"), n:overwriteProp || prop, r:round};
				if (pt._next) {                                                                                                    // 4580
					pt._next._prev = pt;                                                                                              // 4581
				}                                                                                                                  // 4582
				return pt;                                                                                                         // 4583
			}                                                                                                                   // 4584
		};                                                                                                                   // 4585
                                                                                                                       // 4586
		p.setRatio = function(v) {                                                                                           // 4587
			var pt = this._firstPT,                                                                                             // 4588
				min = 0.000001,                                                                                                    // 4589
				val;                                                                                                               // 4590
			while (pt) {                                                                                                        // 4591
				val = pt.c * v + pt.s;                                                                                             // 4592
				if (pt.r) {                                                                                                        // 4593
					val = Math.round(val);                                                                                            // 4594
				} else if (val < min) if (val > -min) { //prevents issues with converting very small numbers to strings in the browser
					val = 0;                                                                                                          // 4596
				}                                                                                                                  // 4597
				if (pt.f) {                                                                                                        // 4598
					pt.t[pt.p](val);                                                                                                  // 4599
				} else {                                                                                                           // 4600
					pt.t[pt.p] = val;                                                                                                 // 4601
				}                                                                                                                  // 4602
				pt = pt._next;                                                                                                     // 4603
			}                                                                                                                   // 4604
		};                                                                                                                   // 4605
                                                                                                                       // 4606
		p._kill = function(lookup) {                                                                                         // 4607
			var a = this._overwriteProps,                                                                                       // 4608
				pt = this._firstPT,                                                                                                // 4609
				i;                                                                                                                 // 4610
			if (lookup[this._propName] != null) {                                                                               // 4611
				this._overwriteProps = [];                                                                                         // 4612
			} else {                                                                                                            // 4613
				i = a.length;                                                                                                      // 4614
				while (--i > -1) {                                                                                                 // 4615
					if (lookup[a[i]] != null) {                                                                                       // 4616
						a.splice(i, 1);                                                                                                  // 4617
					}                                                                                                                 // 4618
				}                                                                                                                  // 4619
			}                                                                                                                   // 4620
			while (pt) {                                                                                                        // 4621
				if (lookup[pt.n] != null) {                                                                                        // 4622
					if (pt._next) {                                                                                                   // 4623
						pt._next._prev = pt._prev;                                                                                       // 4624
					}                                                                                                                 // 4625
					if (pt._prev) {                                                                                                   // 4626
						pt._prev._next = pt._next;                                                                                       // 4627
						pt._prev = null;                                                                                                 // 4628
					} else if (this._firstPT === pt) {                                                                                // 4629
						this._firstPT = pt._next;                                                                                        // 4630
					}                                                                                                                 // 4631
				}                                                                                                                  // 4632
				pt = pt._next;                                                                                                     // 4633
			}                                                                                                                   // 4634
			return false;                                                                                                       // 4635
		};                                                                                                                   // 4636
                                                                                                                       // 4637
		p._roundProps = function(lookup, value) {                                                                            // 4638
			var pt = this._firstPT;                                                                                             // 4639
			while (pt) {                                                                                                        // 4640
				if (lookup[this._propName] || (pt.n != null && lookup[ pt.n.split(this._propName + "_").join("") ])) { //some properties that are very plugin-specific add a prefix named after the _propName plus an underscore, so we need to ignore that extra stuff here.
					pt.r = value;                                                                                                     // 4642
				}                                                                                                                  // 4643
				pt = pt._next;                                                                                                     // 4644
			}                                                                                                                   // 4645
		};                                                                                                                   // 4646
                                                                                                                       // 4647
		TweenLite._onPluginEvent = function(type, tween) {                                                                   // 4648
			var pt = tween._firstPT,                                                                                            // 4649
				changed, pt2, first, last, next;                                                                                   // 4650
			if (type === "_onInitAllProps") {                                                                                   // 4651
				//sorts the PropTween linked list in order of priority because some plugins need to render earlier/later than others, like MotionBlurPlugin applies its effects after all x/y/alpha tweens have rendered on each frame.
				while (pt) {                                                                                                       // 4653
					next = pt._next;                                                                                                  // 4654
					pt2 = first;                                                                                                      // 4655
					while (pt2 && pt2.pr > pt.pr) {                                                                                   // 4656
						pt2 = pt2._next;                                                                                                 // 4657
					}                                                                                                                 // 4658
					if ((pt._prev = pt2 ? pt2._prev : last)) {                                                                        // 4659
						pt._prev._next = pt;                                                                                             // 4660
					} else {                                                                                                          // 4661
						first = pt;                                                                                                      // 4662
					}                                                                                                                 // 4663
					if ((pt._next = pt2)) {                                                                                           // 4664
						pt2._prev = pt;                                                                                                  // 4665
					} else {                                                                                                          // 4666
						last = pt;                                                                                                       // 4667
					}                                                                                                                 // 4668
					pt = next;                                                                                                        // 4669
				}                                                                                                                  // 4670
				pt = tween._firstPT = first;                                                                                       // 4671
			}                                                                                                                   // 4672
			while (pt) {                                                                                                        // 4673
				if (pt.pg) if (typeof(pt.t[type]) === "function") if (pt.t[type]()) {                                              // 4674
					changed = true;                                                                                                   // 4675
				}                                                                                                                  // 4676
				pt = pt._next;                                                                                                     // 4677
			}                                                                                                                   // 4678
			return changed;                                                                                                     // 4679
		};                                                                                                                   // 4680
                                                                                                                       // 4681
		TweenPlugin.activate = function(plugins) {                                                                           // 4682
			var i = plugins.length;                                                                                             // 4683
			while (--i > -1) {                                                                                                  // 4684
				if (plugins[i].API === TweenPlugin.API) {                                                                          // 4685
					_plugins[(new plugins[i]())._propName] = plugins[i];                                                              // 4686
				}                                                                                                                  // 4687
			}                                                                                                                   // 4688
			return true;                                                                                                        // 4689
		};                                                                                                                   // 4690
                                                                                                                       // 4691
		//provides a more concise way to define plugins that have no dependencies besides TweenPlugin and TweenLite, wrapping common boilerplate stuff into one function (added in 1.9.0). You don't NEED to use this to define a plugin - the old way still works and can be useful in certain (rare) situations.
		_gsDefine.plugin = function(config) {                                                                                // 4693
			if (!config || !config.propName || !config.init || !config.API) { throw "illegal plugin definition."; }             // 4694
			var propName = config.propName,                                                                                     // 4695
				priority = config.priority || 0,                                                                                   // 4696
				overwriteProps = config.overwriteProps,                                                                            // 4697
				map = {init:"_onInitTween", set:"setRatio", kill:"_kill", round:"_roundProps", initAll:"_onInitAllProps"},         // 4698
				Plugin = _class("plugins." + propName.charAt(0).toUpperCase() + propName.substr(1) + "Plugin",                     // 4699
					function() {                                                                                                      // 4700
						TweenPlugin.call(this, propName, priority);                                                                      // 4701
						this._overwriteProps = overwriteProps || [];                                                                     // 4702
					}, (config.global === true)),                                                                                     // 4703
				p = Plugin.prototype = new TweenPlugin(propName),                                                                  // 4704
				prop;                                                                                                              // 4705
			p.constructor = Plugin;                                                                                             // 4706
			Plugin.API = config.API;                                                                                            // 4707
			for (prop in map) {                                                                                                 // 4708
				if (typeof(config[prop]) === "function") {                                                                         // 4709
					p[map[prop]] = config[prop];                                                                                      // 4710
				}                                                                                                                  // 4711
			}                                                                                                                   // 4712
			Plugin.version = config.version;                                                                                    // 4713
			TweenPlugin.activate([Plugin]);                                                                                     // 4714
			return Plugin;                                                                                                      // 4715
		};                                                                                                                   // 4716
                                                                                                                       // 4717
                                                                                                                       // 4718
		//now run through all the dependencies discovered and if any are missing, log that to the console as a warning. This is why it's best to have TweenLite load last - it can check all the dependencies for you.
		a = window._gsQueue;                                                                                                 // 4720
		if (a) {                                                                                                             // 4721
			for (i = 0; i < a.length; i++) {                                                                                    // 4722
				a[i]();                                                                                                            // 4723
			}                                                                                                                   // 4724
			for (p in _defLookup) {                                                                                             // 4725
				if (!_defLookup[p].func) {                                                                                         // 4726
					window.console.log("GSAP encountered missing dependency: com.greensock." + p);                                    // 4727
				}                                                                                                                  // 4728
			}                                                                                                                   // 4729
		}                                                                                                                    // 4730
                                                                                                                       // 4731
		_tickerActive = false; //ensures that the first official animation forces a ticker.tick() to update the time when it is instantiated
                                                                                                                       // 4733
})((typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window, "TweenMax");
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/infinitedg:gsap/vendor/GreenSock-JS/src/uncompressed/plugins/ColorPropsPlugin.js                           //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/*!                                                                                                                    // 1
 * VERSION: beta 1.3.0                                                                                                 // 2
 * DATE: 2015-02-06                                                                                                    // 3
 * UPDATES AND DOCS AT: http://greensock.com                                                                           // 4
 *                                                                                                                     // 5
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.                                                   // 6
 * This work is subject to the terms at http://greensock.com/standard-license or for                                   // 7
 * Club GreenSock members, the software agreement that was issued with your membership.                                // 8
 *                                                                                                                     // 9
 * @author: Jack Doyle, jack@greensock.com                                                                             // 10
 **/                                                                                                                   // 11
var _gsScope = (typeof(module) !== "undefined" && module.exports && typeof(global) !== "undefined") ? global : this || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push( function() {                                                     // 13
                                                                                                                       // 14
	"use strict";                                                                                                         // 15
                                                                                                                       // 16
	var _numExp = /(\d|\.)+/g,                                                                                            // 17
		_colorLookup = {aqua:[0,255,255],                                                                                    // 18
			lime:[0,255,0],                                                                                                     // 19
			silver:[192,192,192],                                                                                               // 20
			black:[0,0,0],                                                                                                      // 21
			maroon:[128,0,0],                                                                                                   // 22
			teal:[0,128,128],                                                                                                   // 23
			blue:[0,0,255],                                                                                                     // 24
			navy:[0,0,128],                                                                                                     // 25
			white:[255,255,255],                                                                                                // 26
			fuchsia:[255,0,255],                                                                                                // 27
			olive:[128,128,0],                                                                                                  // 28
			yellow:[255,255,0],                                                                                                 // 29
			orange:[255,165,0],                                                                                                 // 30
			gray:[128,128,128],                                                                                                 // 31
			purple:[128,0,128],                                                                                                 // 32
			green:[0,128,0],                                                                                                    // 33
			red:[255,0,0],                                                                                                      // 34
			pink:[255,192,203],                                                                                                 // 35
			cyan:[0,255,255],                                                                                                   // 36
			transparent:[255,255,255,0]},                                                                                       // 37
		_hue = function(h, m1, m2) {                                                                                         // 38
			h = (h < 0) ? h + 1 : (h > 1) ? h - 1 : h;                                                                          // 39
			return ((((h * 6 < 1) ? m1 + (m2 - m1) * h * 6 : (h < 0.5) ? m2 : (h * 3 < 2) ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * 255) + 0.5) | 0;
		},                                                                                                                   // 41
		_parseColor = function(color) {                                                                                      // 42
			if (color === "" || color == null || color === "none") {                                                            // 43
				return _colorLookup.transparent;                                                                                   // 44
			}                                                                                                                   // 45
			if (_colorLookup[color]) {                                                                                          // 46
				return _colorLookup[color];                                                                                        // 47
			}                                                                                                                   // 48
			if (typeof(color) === "number") {                                                                                   // 49
				return [color >> 16, (color >> 8) & 255, color & 255];                                                             // 50
			}                                                                                                                   // 51
			if (color.charAt(0) === "#") {                                                                                      // 52
				if (color.length === 4) { //for shorthand like #9F0                                                                // 53
					color = "#" + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2) + color.charAt(3) + color.charAt(3);
				}                                                                                                                  // 55
				color = parseInt(color.substr(1), 16);                                                                             // 56
				return [color >> 16, (color >> 8) & 255, color & 255];                                                             // 57
			}                                                                                                                   // 58
			if (color.substr(0, 3) === "hsl") {                                                                                 // 59
				color = color.match(_numExp);                                                                                      // 60
				var h = (Number(color[0]) % 360) / 360,                                                                            // 61
					s = Number(color[1]) / 100,                                                                                       // 62
					l = Number(color[2]) / 100,                                                                                       // 63
					m2 = (l <= 0.5) ? l * (s + 1) : l + s - l * s,                                                                    // 64
					m1 = l * 2 - m2;                                                                                                  // 65
				if (color.length > 3) {                                                                                            // 66
					color[3] = Number(color[3]);                                                                                      // 67
				}                                                                                                                  // 68
				color[0] = _hue(h + 1 / 3, m1, m2);                                                                                // 69
				color[1] = _hue(h, m1, m2);                                                                                        // 70
				color[2] = _hue(h - 1 / 3, m1, m2);                                                                                // 71
				return color;                                                                                                      // 72
			}                                                                                                                   // 73
			return color.match(_numExp) || _colorLookup.transparent;                                                            // 74
		};                                                                                                                   // 75
                                                                                                                       // 76
	_gsScope._gsDefine.plugin({                                                                                           // 77
		propName: "colorProps",                                                                                              // 78
		version: "1.3.0",                                                                                                    // 79
		priority: -1,                                                                                                        // 80
		API: 2,                                                                                                              // 81
                                                                                                                       // 82
		//called when the tween renders for the first time. This is where initial values should be recorded and any setup routines should run.
		init: function(target, value, tween) {                                                                               // 84
			this._target = target;                                                                                              // 85
			var p, s, c, pt;                                                                                                    // 86
			this.numFormat = (value.format === "number");                                                                       // 87
			for (p in value) {                                                                                                  // 88
				if (p !== "format") {                                                                                              // 89
					c = _parseColor(value[p]);                                                                                        // 90
					this._firstPT = pt = {_next:this._firstPT, p:p, f:(typeof(target[p]) === "function"), n:p, r:false};              // 91
					s = _parseColor( (!pt.f) ? target[p] : target[ ((p.indexOf("set") || typeof(target["get" + p.substr(3)]) !== "function") ? p : "get" + p.substr(3)) ]() );
					pt.s = Number(s[0]);                                                                                              // 93
					pt.c = Number(c[0]) - pt.s;                                                                                       // 94
					pt.gs = Number(s[1]);                                                                                             // 95
					pt.gc = Number(c[1]) - pt.gs;                                                                                     // 96
					pt.bs = Number(s[2]);                                                                                             // 97
					pt.bc = Number(c[2]) - pt.bs;                                                                                     // 98
					if ((pt.rgba = (s.length > 3 || c.length > 3))) { //detect an rgba() value                                        // 99
						pt.as = (s.length < 4) ? 1 : Number(s[3]);                                                                       // 100
						pt.ac = ((c.length < 4) ? 1 : Number(c[3])) - pt.as;                                                             // 101
					}                                                                                                                 // 102
					if (pt._next) {                                                                                                   // 103
						pt._next._prev = pt;                                                                                             // 104
					}                                                                                                                 // 105
				}                                                                                                                  // 106
			}                                                                                                                   // 107
			return true;                                                                                                        // 108
		},                                                                                                                   // 109
                                                                                                                       // 110
		//called each time the values should be updated, and the ratio gets passed as the only parameter (typically it's a value between 0 and 1, but it can exceed those when using an ease like Elastic.easeOut or Back.easeOut, etc.)
		set: function(v) {                                                                                                   // 112
			var pt = this._firstPT, val;                                                                                        // 113
			while (pt) {                                                                                                        // 114
				val = this.numFormat ? (pt.s + (v * pt.c)) << 16 | (pt.gs + (v * pt.gc)) << 8 | (pt.bs + (v * pt.bc)) : (pt.rgba ? "rgba(" : "rgb(") + ((pt.s + (v * pt.c)) >> 0) + ", " + ((pt.gs + (v * pt.gc)) >> 0) + ", " + ((pt.bs + (v * pt.bc)) >> 0) + (pt.rgba ? ", " + (pt.as + (v * pt.ac)) : "") + ")";
				if (pt.f) {                                                                                                        // 116
					this._target[pt.p](val);                                                                                          // 117
				} else {                                                                                                           // 118
					this._target[pt.p] = val;                                                                                         // 119
				}                                                                                                                  // 120
				pt = pt._next;                                                                                                     // 121
			}                                                                                                                   // 122
		}                                                                                                                    // 123
	});                                                                                                                   // 124
                                                                                                                       // 125
}); if (_gsScope._gsDefine) { _gsScope._gsQueue.pop()(); }                                                             // 126
                                                                                                                       // 127
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['infinitedg:gsap'] = {};

})();

//# sourceMappingURL=infinitedg_gsap.js.map
