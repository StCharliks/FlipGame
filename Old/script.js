class MediaPlayer{
		audio : false;

		constructor(pathArr){
			let audio = document.createElement('audio');
			
			pathArr.forEach((item, i, pathArr, audio) => {
				let source = document.createElement('source');
				source.src = item;
				audio.appendChild(source);
			})
		}
	}