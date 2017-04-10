define("Clock", function() {
	
	const Clock = () => {
		let start;
		let last = 0;
		let delta = 0;
		let end;
		let fps;
		let current = 0;
		return {
			FPS : function() { return fps; },
			DELTA : function() { return delta; },
			beginTimer : function() {
				start = start || Date.now();
				return start;
			},
			secondsElapsed : function(frame) {
				last = current || frame;
				end = Date.now();
				current = frame/1000;
				delta = current - last;
				fps = 1/(current - last);
				return current;
			}
		};
	};
	
	return Clock;
	
});