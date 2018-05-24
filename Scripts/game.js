var checkedCards = Array();
let images = Array();
let player = "";
let timer = null;

const FLIP_TIMEOUT = 250;
const SHOW_TIMEOUT = 800;

//compare two cards and return thue if they are the same
function isSame(){
	return checkedCards[0].src == checkedCards[1].src;
}


//Flips the card back
function flipBack(){

	checkedCards[0].style.transform = "rotateY(0deg)";
	checkedCards[1].style.transform = "rotateY(0deg)";

	let imageBufer1 = checkedCards[0].src;
	let imageBufer2 = checkedCards[1].src;

	setTimeout(FLIP_TIMEOUT, () => {
		checkedCards[0].alt = imageBufer1;
		checkedCards[1].alt = imageBufer2;	
	})
	
	checkedCards[0].src = coverPath;
	checkedCards[1].src = coverPath;

	checkedCards = Array();
}


//Checks the end of the game and stops the game if it is necessary
function checkGame(){
	if (timer.get_currentTime() <= 0){
		let playField = document.getElementById("gameField");

		for (i = 0; i < images.length; i++) {
			playField.removeChild(images[i]);
		}

		images = Array();

		document.getElementById("menu").style.display = "block";
		document.getElementById("inputField").readOnly = false;
		document.getElementById("gameField").style.display = "none";

		alert("Время истекло");
		return;
	}

	if (document.getElementById("free") == null){
		timer.stop();
		let playField = document.getElementById("gameField");

		for (i = 0; i < images.length; i++) {
			playField.removeChild(images[i]);
		}

		images = Array();

		document.getElementById("menu").style.display = "block";
		document.getElementById("inputField").readOnly = false;
		document.getElementById("gameField").style.display = "none";

		alert("Вы выиграли!");
	}
}


//checks for matches if two cards are selected
function checkMatch(){
	if (checkedCards.length == 2){
		if (isSame()){
			checkedCards[0].id = "Fixed";
			checkedCards[1].id = "Fixed";

			checkedCards = Array();
		}
		else{
			checkedCards[0].id = "free";
			checkedCards[1].id = "free";
			setTimeout(flipBack, SHOW_TIMEOUT);
		}
	}
}


//setup start parameters and start game
function StartGame(playerName, difficult, coverPath){
	//Настраиваем графические элементы
	document.getElementById("menu").style.display = "none";
	document.getElementById("inputField").readOnly = true;
	document.getElementById("gameField").style.display = "block";
	document.getElementById("gameField").addEventListener("click", onImageClick);
	document.getElementById("timer").style.display="block";

	player = playerName;
	drawImages(loadImages(coverPath, difficult), difficult, coverPath);
	timer = new Timer(()=>{
	document.getElementById("timer").style.width = (100/timer.get_interval())*timer.get_currentTime() + "%";

	if (timer.get_currentTime() < 20000){
		document.getElementById("timer").style.backgroundcolor = "red";
	}
	}, 60000);

	timer.start();;
}


//OnClick handler, allow user to click on card chose it
function onImageClick(event){
	let target = event.target;

	console.log("Обработано");
	if ((target.tagName == "IMG")&&(checkedCards.length < 2)&&(target.id == "free")){
		if (target.style.transform != "rotateY(360deg)")
			target.style.transform = "rotateY(360deg)";

		let imageBufer = target.src;
		
		
		setTimeout(FLIP_TIMEOUT, () => {
			
			target.alt = imageBufer;
		})

		target.src = target.alt;

		target.id = "Checked";
		checkedCards.push(target);
		console.log(checkedCards);
		checkMatch();
	}

	checkGame();
}


//places cards on the playing field
function drawImages(images, difficult){
	let gameField = document.getElementById("gameField");

	images.sort((a, b) => {
		return Math.random() > Math.random();
	})

	for (var i = 0; i < images.length; i++) {
		images[i].style.height = "200px";
		images[i].style.width = 100/difficult - 1 + "%";
		gameField.appendChild(images[i]);
	}
}


//return path to folder with flags
function getPath(difficult, index){
	if (difficult == 6){
		return "Flags(Easy)/easy"+i+".jpg";
	}

	if (difficult == 8){
		return "Flags(medium)/medium"+i+".jpg";
	}

	if (difficult == 10){
		return "Flags(Hard)/hard"+i+".jpg";
	}
}


//load images into array
function loadImages(coverPath, difficult){
	let count = Number(difficult)*Number(difficult)/2;

	for (j = 1; j <= 2; j++){
		for(i = 1; i <= count; i++){
			let flag = document.createElement("img");
			flag.alt = getPath(difficult, i);
			flag.src = coverPath;
			flag.style.background = "url("+getPath(difficult, i);+")";
			flag.id = "free";
			images.push(flag);
		}
	}

	console.log(images);
	return images;	
}