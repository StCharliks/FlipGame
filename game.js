

function isSame(){
	return checkedCards[0].src == checkedCards[1].src;
}

function flipBack(){
	let imageBufer = checkedCards[0].src;
	checkedCards[0].src = checkedCards[0].alt;
	checkedCards[0].alt = imageBufer;

	imageBufer = checkedCards[1].src;
	checkedCards[1].src = checkedCards[1].alt;
	checkedCards[1].alt = imageBufer;

	checkedCards = Array();
}

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
		let records = document.getElementById("recordList");
		newRecord = document.createElement("li");
		newRecord.innerHTML = player;
		records.appendChild(newRecord);
	}


}

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
			setTimeout(flipBack, 500);
		}
	}
}

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

	if (timer.get_currentTime() < 20){
		document.getElementById("timer").style.backgroundcolor = "red";
	}
	}, 60000);

	timer.start();
	//document.getElementById("menu").style.display = "block";
}

function onImageClick(event){
	let target = event.target;

	console.log("Обработано");
	if ((target.tagName == "IMG")&&(checkedCards.length < 2)&&(target.id == "free")){
		let imageBufer = target.src;
		target.src = target.alt;
		target.alt = imageBufer;

		target.id = "Checked";
		checkedCards.push(target);
		console.log(checkedCards);
		checkMatch();
	}

	checkGame();
}

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

function getPath(difficult, index){
	if (difficult == 4){
		return "Flags(Easy)/easy"+i+".jpg";
	}

	if (difficult == 8){
		return "Flags(Normal)/normal"+i+".jpg";
	}

	if (difficult == 10){
		return "Flags(Hard)/hard"+i+".jpg";
	}
}

function loadImages(coverPath, difficult){
	//let gameField = document.getElementById("gameField");
	//let images = Array();
	let count = Number(difficult)*Number(difficult)/2;

	for (j = 1; j <= 2; j++){
		for(i = 1; i <= count; i++){
			let flag = document.createElement("img");
			flag.alt = getPath(difficult, i);
			flag.src = coverPath;
			flag.id = "free";
			images.push(flag);
		}
	}

	console.log(images);
	return images;	
}

var checkedCards = Array();
let images = Array();
let player = "";
let timer = null;