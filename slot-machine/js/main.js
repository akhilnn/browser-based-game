/*----- constants -----*/
// Icebox: add sound, add animation & timeout, add net value indicator & fade, win confetti
// Icebox: add button disable logic based on credits remaining[x], disable GAMBLE button[x], fix styling
// add code comments?
// add more to array? BAR symbol?
// Update HTML to reflect symbols[x]
const SYMBOLS = [
	{
		val: '🌟🌟',
		src: '',
		scalarP: 20,
		scalarS: 10,
	},
	{
		val: '🌟',
		src: '',
		scalarP: 15,
		scalarS: 10,
	},
	{
		val: '🍒🍒',
		src: '',
		scalarP: 10,
		scalarS: 5,
	},
	{
		val: '🍒🍒',
		src: '',
		scalarP: 10,
		scalarS: 5,
	},
	{
		val: '🍒',
		src: '',
		scalarP: 5,
		scalarS: 2,
	},
	{
		val: '🍇',
		src: '',
		scalarP: 0,
		scalarS: 0,
	},
	{
		val: '🎉',
		src: '',
		scalarP: 0,
		scalarS: 0,
	},
	{
		val: '🍎',
		src: '',
		scalarP: 0,
		scalarS: 0,
	},
	{
		val: '💩',
		src: '',
		scalarP: 0,
		scalarS: 0,
	}
	];

/*----- app's state (variables) -----*/
var showReel1;
var showReel2;
var showReel3;
var totalCredits;

var oneLine;
var threeLine;
var oneCR;
var fiveCR;


/*----- cached element references -----*/
const creditAmt = document.getElementById('credits');
const userMsg = document.getElementById('message');

const oneLineBtn = document.getElementsByTagName('button')[0];
const threeLineBtn = document.getElementsByTagName('button')[1];
const gambleBtn = document.getElementsByTagName('button')[2];
const oneCRBtn = document.getElementsByTagName('button')[3];
const fiveCRBtn = document.getElementsByTagName('button')[4];
const resetBtn = document.getElementsByTagName('button')[5];


/*----- event listeners -----*/
// Blue italics refers to global var?
// add mouseover event listeners to fix the hover characteristic specificity or use ClassList [x]
// strong tags specificity?
oneLineBtn.addEventListener('click', function() {
	oneLine = true;
	threeLine = false;
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
	threeLineBtn.style.backgroundColor = 'white';
	threeLineBtn.style.color = 'black';
});
threeLineBtn.addEventListener('click', function() {
	oneLine = false;
	threeLine = true;
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
	oneLineBtn.style.backgroundColor = 'white';
	oneLineBtn.style.color = 'black';
});
oneCRBtn.addEventListener('click', function() {
	oneCR = true;
	fiveCR = false;
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
	fiveCRBtn.style.backgroundColor = 'white';
	fiveCRBtn.style.color = 'black';
});
fiveCRBtn.addEventListener('click', function() {
	oneCR = false;
	fiveCR = true;
	this.style.backgroundColor = 'black';
	this.style.color = 'white';
	oneCRBtn.style.backgroundColor = 'white';
	oneCRBtn.style.color = 'black';
});
gambleBtn.addEventListener('click', play);
resetBtn.addEventListener('click', init);


/*----- functions -----*/
// check function order
init();

function init() { 
	showReel1 = [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]];
	showReel2 = [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]];
	showReel3 = [SYMBOLS[0], SYMBOLS[1], SYMBOLS[2]];
	totalCredits = 100;
	oneLine = false;
	threeLine = false;
	oneCR = false;
	fiveCR = false;
	render();
}

function render() {
	// why does const work here?
	// inefficient to store objects? [x]
	// added setTimeout() - does not work
	showReel1.forEach( function(ele, idx) {
		const div1 = document.getElementById(`one${idx}`);
		div1.textContent = ele.val;
	} );

	showReel2.forEach( function(ele, idx) {
		const div2 = document.getElementById(`two${idx}`);
		div2.textContent = ele.val;
	} );

	showReel3.forEach( function(ele, idx) {
		const div3 = document.getElementById(`three${idx}`);
		div3.textContent = ele.val;
	} );


	creditAmt.textContent = `CREDITS REMAINING: ${totalCredits}`;


	// this runs only after init() or play()
	if (totalCredits <= 0) {
		userMsg.textContent = `YOU HAVE NO MONEY LEFT!`;
		userMsg.style.border = `2px solid red`;
		userMsg.style.color = `red`;
	} else if ((!oneLine && !threeLine) || (!oneCR && !fiveCR)) {
		userMsg.textContent = `PLEASE MAKE A SELECTION`;
		userMsg.style.border = '2px solid orange';
		userMsg.style.color = `orange`;
	} else {
		userMsg.textContent = '';
		userMsg.style.border = `2px solid white`;
	}

	// removed code


	// hover stops working [x] - make this a separate function
	if (!oneLine) {
		oneLineBtn.style.backgroundColor = 'white';
		oneLineBtn.style.color = 'black';
	}
	if (!threeLine) {
		threeLineBtn.style.backgroundColor = 'white';
		threeLineBtn.style.color = 'black';
	}
	if (!oneCR) {
		oneCRBtn.style.backgroundColor = 'white';
		oneCRBtn.style.color = 'black';
	}
	if (!fiveCR) {
		fiveCRBtn.style.backgroundColor = 'white';
		fiveCRBtn.style.color = 'black';
	}
}

function randReel() {
	// SYMBOLS needs to be of length 3 or greater
	let randIndex = Math.floor(Math.random() * SYMBOLS.length);
	let reel = [null, null, null];

	if (randIndex <= SYMBOLS.length - 3) {
		reel[0] = SYMBOLS[randIndex];
		reel[1] = SYMBOLS[randIndex + 1];
		reel[2] = SYMBOLS[randIndex + 2];
	} else if (randIndex === SYMBOLS.length - 2) {
		reel[0] = SYMBOLS[randIndex];
		reel[1] = SYMBOLS[randIndex + 1];
		reel[2] = SYMBOLS[0];
	} else if (randIndex === SYMBOLS.length - 1) {
		reel[0] = SYMBOLS[randIndex];
		reel[1] = SYMBOLS[0];
		reel[2] = SYMBOLS[1];
	}

	return reel;
}

function play() {
	// modify less than 0?
	if (totalCredits <= 0) return;
	if ((!oneLine && !threeLine) || (!oneCR && !fiveCR)) return;

	let betAmount = calcBet();

	// cannot outsource this function
	if (oneLine) {
		if (betAmount > totalCredits) return;
	} else if (threeLine) {
		if (betAmount * 3 > totalCredits) return;
	}
	
	// set timeout on below?
	showReel1 = randReel();
	showReel2 = randReel();
	showReel3 = randReel();
	updateCredits(betAmount);

	// use this block if user selection is to be reset after each gamble
	// oneLine = false;
	// threeLine = false;
	// oneCR = false;
	// fiveCR = false;

	render();
}

function calcBet() {
	let bet = 0;

	if (oneCR) {
		bet = 1;
	} else if (fiveCR) {
		bet = 5;
	}
	return bet;
}

function updateCredits(amount) {
	if (oneLine && isEq(1)) {
		totalCredits = totalCredits - amount + (amount * showReel1[1].scalarP);
	} else if (oneLine) {
		totalCredits -= amount;
	}

	if (threeLine && isEq(0)) {
		totalCredits = totalCredits - amount + (amount * showReel1[0].scalarS);
	} else if (threeLine) {
		totalCredits -= amount;
	}

	if (threeLine && isEq(1)) {
		totalCredits = totalCredits - amount + (amount * showReel1[1].scalarP);
	} else if (threeLine) {
		totalCredits -= amount;
	}

	if (threeLine && isEq(2)) {
		totalCredits = totalCredits - amount + (amount * showReel1[2].scalarS);
	} else if (threeLine) {
		totalCredits -= amount;
	}

	return totalCredits; // return is necessary?
}

function isEq(idx) {
	if ( (showReel1[idx].val === showReel2[idx].val) && (showReel1[idx].val === showReel3[idx].val) ) {
		return true;
	} else {
		return false;
	}
}

