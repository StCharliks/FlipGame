	class FormReader{

	}
	//Этот класс будет описывать карточки
	class Country{

	}

	//Класс, представляющий собой поле для игры
	class Field{

	}
	//Класс, описывающий панель времени
	class Timer{
		constructor(callback, time_interval){
			this.callback = callback;
			this.interval = time_interval ? time_interval:0;
			this.currentTime = this.interval;
			//this.timer = document.createElement('span');
			//отрисовка таймера
			//this.timer.innerHTML = this.interval;
			//установка его в DOM-модель
			//var body = document.getElementById('body');
			//body.appendChild(this.timer);
		}

		start(){
			let timeID = setInterval(()=>{
				if (this.currentTime == 0)
				{
					clearInterval(timeID);
				}
				this.callback();
				console.log(this.currentTime);
				this.currentTime--;
			}, 1);
		}

		stop(){
			this.currentTime = 0;
		}

		restart(){
			this.currentTime = this.interval;
			this.start();
		}

		get_currentTime(){
			return this.currentTime;
		}

		get_interval(){
			return this.interval;
		}

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
	//класс, описывающий работу со звуком
	class MediaPlayer{
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


/*	let Images = false;

	if (Images)
	{
		var media = new MediaPlayer(['music_main_theme.ogg'], 0.1, "loop");
		var sound = new MediaPlayer(['Zvuk_-_CSHelchek (mp3cut.ru).mp3'], 1);
		let timer = new Timer(() => {sound.play()}, 2);
		//media.stop();
		//sound.play();
		media.play();
		timer.start();
	}
</script>
</body>
</html>*/