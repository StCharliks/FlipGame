	//Class timer - intended for countdown time
	class Timer{
		//parameters:
		//@callback - function that call at each tick of the timer 
		//@time_interval - start timer value
		constructor(callback, time_interval){
			this.callback = callback;
			this.interval = time_interval ? time_interval:0;
			this.currentTime = this.interval;
		}

		//Start timer
		start(){
			let timeID = setInterval(()=>{
				if (this.currentTime == 0)
				{
					clearInterval(timeID);
				}
				this.callback();
				this.currentTime--;
			}, 1);
		}

		//stops timer
		stop(){
			this.currentTime = 0;
		}

		//restart timer
		restart(){
			this.currentTime = this.interval;
			this.start();
		}

		//return currentTime
		get_currentTime(){
			return this.currentTime;
		}

		//return timer time interval
		get_interval(){
			return this.interval;
		}

		//set interval function
		set_interval(time){
			this.interval = time;
		}

		get_callback(){
			return this.callback;
		}

		set_callback(callback){
			this.callback = callback;
		}
	}

	//Class that realize media playr functions
	class MediaPlayer{
		//@params
		//@pathArr - path to array with sounds
		//@volume - value of volume(0 <= volume <=1)
		//@loop - setup timer for loop or not
		constructor(pathArr, volume, loop){

			console.log("I'm here");
			this.audio = document.createElement('audio');
			this.state = 'stop';

			for (var i = 0; i < pathArr.length; i++)
			{
				var source = document.createElement('source');
				source.src = pathArr[i];
				this.audio.appendChild(source);
			}

			this.audio.volume = volume ? volume : 1;
			this.audio.loop = loop ? loop : "";
		}

		play(){
			this.audio.play();
			this.state = "play";
		}

		pause(){
			this.audio.pause();
		}

		stop(){
			this.audio.pause();
			this.audio.currentTime = 0;
		}

		replay(){
			this.stop();
			this.play();
		}

		get volume(){
			return this.audio.volume;
		}

		set volume(volume){
			this.audio.volume = (volume <= 1)? volume:1;
		}
	}