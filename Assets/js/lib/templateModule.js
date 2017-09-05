define("clock", function(){
	// Clock Game Object - could use some work -
	function Clock() {
		this.start;
		this.last;
		this.end;
		this.fps;
		this.current;
	this.beginTimer = function() {
			this.start = Date.now();
		}
	this.secondsElapsed = function() {
			this.last = this.current;
			this.end = Date.now();
			this.current = ((this.end - this.start)/1000);
			this.fps = 1/(this.current - this.last);
			return this.current;
		}
	}
	
	return Clock;
	
});