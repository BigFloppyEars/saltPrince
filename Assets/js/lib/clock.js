"use strict";

/* 

NOTES



 */

define("clock", function(){
	// Clock Game Object - could use some work -
	
	class Clock {
		constructor() {
			this.start;
			this.last;
			this.end;
			this.delta;
			this.fps;
			this.current;
		}

		beginTimer() {
			this.start = Date.now();
		}

		secondsElapsed() {
			this.last = this.current;
			this.end = Date.now();
			this.current = ((this.end - this.start)/1000);
			this.fps = 1/(this.current - this.last);
			return this.current;
		}

	}
	
	return Clock;
	
});