/*----- constants -----*/
// Icebox: add sound, add animation
// add comments?
// change this array to duplicate some elements
// get images for each of the symbols or use emoji? + Update HTML
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
		val: '🍒',
		src: '',
		scalarP: 5,
		scalarS: 2,
	},
	{
		val: '🍎',
		src: '',
		scalarP: 0,
		scalarS: 0,
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
		val: '🌟',
		src: '',
		scalarP: 15,
		scalarS: 10,
	},
	{
		val: '🌟',
		src: '',
		scalarP: 15,
		scalarS: 10,
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
const userMsg = document.getElementById('message');
const creditAmt = document.getElementById('credits');

const oneLineBtn = document.getElementsByTagName('button')[0];
const threeLineBtn = document.getElementsByTagName('button')[1];
const oneCRBtn = document.getElementsByTagName('button')[2];
const fiveCRBtn = document.getElementsByTagName('button')[3];
const gambleBtn = document.getElementsByTagName('button')[4];
const resetBtn = document.getElementsByTagName('button')[5];


/*----- event listeners -----*/
// Set the true and false status in each (exclusively click on one or the other).
// Blue italics refers to global var?
oneLineBtn.addEventListener('click', function() {
	oneLine = true;
	threeLine = false;
	// this.style.backgroundColor = 'black';
	// this.style.color = 'white';
	// threeLineBtn.style.backgroundColor = 'white';
	// threeLineBtn.style.color = 'black';
});
threeLineBtn.addEventListener('click', function() {
	oneLine = false;
	threeLine = true;
	// this.style.backgroundColor = 'black';
	// this.style.color = 'white';
	// oneLineBtn.style.backgroundColor = 'white';
	// oneLineBtn.style.color = 'black';
});
oneCRBtn.addEventListener('click', function() {
	oneCR = true;
	fiveCR = false;
});
fiveCRBtn.addEventListener('click', function() {
	oneCR = false;
	fiveCR = true;
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

	if (totalCredits <= 0) {
		userMsg.textContent = `YOU HAVE NO MONEY LEFT!`;
	} else {
		userMsg.textContent = '';
	}
	// button active criteria
	// disable any buttons based on totalCredits status
	// disable GAMBLE till all buttons are clicked!
	// add fade in for net amount gained or loss?
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
	if (totalCredits <= 0) return;
	if ((!oneLine && !threeLine) || (!oneCR && !fiveCR)) return;

	let betAmount = calcBet();
	showReel1 = randReel();
	showReel2 = randReel();
	showReel3 = randReel();
	updateCredits(betAmount);

	// remove this block if user selection history is desired
	oneLine = false;
	threeLine = false;
	oneCR = false;
	fiveCR = false;

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

	// floor totalCredits to 0?

	return totalCredits; // return is necessary?
}

function isEq(idx) {
	if ( (showReel1[idx].val === showReel2[idx].val) && (showReel1[idx].val === showReel3[idx].val) ) {
		return true;
	} else {
		return false;
	}
}

