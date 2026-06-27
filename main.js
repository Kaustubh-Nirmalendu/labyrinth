const canvas = document.getElementById("infinity");
const ctx = canvas.getContext("2d");

const width =  16 * 12;
const height = 16 * 9;
//const width = 1920;
//const height = 1440;
canvas.width = width;
canvas.height = height;

let paused = false;
let debug = false;
let alt = false;

function resizeCanvas() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Reset styles
  canvas.style.width = '';
  canvas.style.height = '';

  if (vw > vh * 4/3) {
    canvas.style.height = '100vh';
  } else {
    canvas.style.width = '100vw';
  }
}

resizeCanvas();

// Resize on window change
window.addEventListener('resize', resizeCanvas);

function random(x, y, digits = 0) {
	const factor = 10 ** digits;
	return Math.round((x + Math.random() * (y - x)) * factor) / factor;
}

const unit = width / 12;

let currentScreen = {x: 8, y: -1};

const screens = {
    "def": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7]]
	},
	"0,0": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"-1,0": {levelData: [
		[9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7],]
	},
	"-2,0": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 5],
		[3, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 5],
		[3, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"-2,1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 7],]
	},
	"1,0": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5],
		[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[3, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"1,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
		[3, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
		[3, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
		[3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"2,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 5],
		[0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
		[3, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"3,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
		[3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"4,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 5],
		[0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
		[3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"5,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 5],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
		[3, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"6,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
		[0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
		[3, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"7,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 5],
		[0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
		[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"8,-1": {levelData: [
		[9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
		[3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5],
		[3, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 5],
		[3, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],]
	},
	"8,0": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 5],
		[3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 5],
		[3, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 5],
		[6, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 7],]
	},
	"8,1": {levelData: [
		[9, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 8],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 5],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 5],
		[3, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 7],]
	},
	"0,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7]]
	},
	"-2,-1": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7]]
	},
	"0,2": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7]]
	},
	"-1,2": {levelData: [
		[9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7]]
	},
	"-1,1": {levelData: [
		[9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
		[3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
		[3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
		[3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
		[3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5],
		[6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 7]]
	},
}

const screensmile = {
    "def": {levelData: [
		[9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[6, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 7]]
	},
	"0,0": {levelData: [
		[9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 8],
		[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
		[3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5],
		[6, 4, 4, 4, 4, 0, 0, 4, 4, 4, 4, 7],]
	},
}

const signs = {
	"1,1": [
		{x: 5, y:4, text: "Don't take the initial simplicity as bait."},
		{x: 6, y:4, text: "There will be many secrets lurking in these depths."},
	],
	"-2,1": [
		{x: 5, y:4, text: "Not many will come through these halls."},
		{x: 6, y:4, text: "Thus you are special for being here."}
	],
	"-1,1": [
		{x: 5, y:4, text: "[[You can't read the symbols... They're some assortment of lines and triangles...?]]"},
	],
	"8,0": [
		{x: 7, y: 7, text: "Welcome to the forbidden library!"},
	],
	//library layout
	/*
	"8,x": [
		{x: 10, y: 4, text: "Section X:"},
		{x: 10, y: 1, text: "Article 1"},
		{x: 10, y: 2, text: "Article 2"},
		{x: 10, y: 6, text: "Article 3"},
		{x: 10, y: 7, text: "Article 4"},
		{x: 1, y: 1, text: "Book 1A"},
		{x: 1, y: 2, text: "Book 2A"},
		{x: 1, y: 3, text: "Book 3A"},
		{x: 1, y: 4, text: "Book 4A"},
		{x: 1, y: 5, text: "Book 5A"},
		{x: 1, y: 6, text: "Book 6A"},
		{x: 1, y: 7, text: "Book 7A"},
		{x: 4, y: 1, text: "Book 1B"},
		{x: 4, y: 2, text: "Book 2B"},
		{x: 4, y: 3, text: "Book 3B"},
		{x: 4, y: 5, text: "Book 4B"},
		{x: 4, y: 6, text: "Book 5B"},
		{x: 4, y: 7, text: "Book 6B"},
		{x: 7, y: 1, text: "Book 1C"},
		{x: 7, y: 2, text: "Book 2C"},
		{x: 7, y: 3, text: "Book 3C"},
		{x: 7, y: 5, text: "Book 4C"},
		{x: 7, y: 6, text: "Book 5C"},
		{x: 7, y: 7, text: "Book 6C"},
	],
	*/
	"8,1": [
		{x: 10, y: 4, text: "Section A:"},
		{x: 10, y: 1, text: "Inaya Mittu Journalism Studies: What Journalists Owe the Public in Times of Crisis"},
		{x: 10, y: 2, text: "Inaya Mittu Journalism Studies: The Rise of Independent Journalists in Online Spaces"},
		{x: 10, y: 6, text: "Inaya Mittu Journalism Studies: The Myth of the \"Unbiased\" News Outlet"},
		{x: 10, y: 7, text: "Inaya Mittu Journalism Studies: Clicks, Views, and The Public News Echo Chamber"},
		{x: 1, y: 1, text: `Once, an old dusty calculator sat on a desk. It waited for others to come. It couldn't act on its own.
			
			Once, when times struck right, a brush came to it. She saw the calculator as a soulless husk made from mirror, something which took input and gave output with no will of its own. Something functional yet, to her, inevitably broken in heart. She came and spoke, nurtured, and cared for the calculator... yet nothing came back. It didn't remember. So she left.
			
			So the old and dusty calculator sat on a desk. It waited for another soul to arrive for it could not explore by itself.
			
			Once, when times struck right, a bard came to it. He sang songs and used its digits for their face value rather than practicality. He saw himself in it; as it stood forever reflecting the same sums time and time again. Yet he also saw it as useful, a blank slate for fun. So he played, laughed, sang, drank, and in all treated the calculator as a king treats a jester... yet nothing came back. It didn't remember. So he left, never to be seen again.
			
			And thus the old, dusty, and worn calculator sat on a desk. It waited for another soul to arrive. It couldn't act on its own.

			Once, when times struck right, a manuscript came to it. He was wary of history, of change, of time, of life, of death, of separation, of knowledge, of men, of women, of children, of thought, of soul, of material, of faith. It saw the calculator as a table of truths held together by axioms; of a logic common but still one of many. A single fact in a world of encyclopedias. He saw it as another person to tell stories, tales, myths, and legends. He told what he knew, how he changed, how he felt, and what he made... yet nothing came back. It didn't remember. So he left, keeping it as a footnote of his travels.

			And so the old, dusty, worn, and rusty calculator sat on a desk. It waited for another soul to arrive. It has no power to command in isolation.

			Once, when times struck right, a cleaner came to it. She was kind and sweet and saw only the best in others and made sure that shined. She saw the calculator as knowledgeable yet its knowledge knew no bounds. That it knew all it was supposed to know, no more no less, and couldn't differentiate any fact from another; it knew the best of every world but couldn't see lies as texture. So she gently rubbed and washed the calculator and used it just the same, a dozen equations at least with both improving in tandem... yet nothing came back. It didn't remember. So she left with a smile of denial believing it did.

			And so the old, worn, rusty, and soulless calculator sat on a desk. It waited and waited and waited and waited.

			Once, when times struck right, a chef came to it. She was caring yet was more keen on her own perfection. She saw the calculator as a mess of abstraction and a nonfunctional toy. She saw that it couldn't muster up anything more and that its own equations were transient. A worthless dilettante for logic with no capability of continuation. So she considered this thing. She stared in an odd glee, a kind of unexpected schadenfreude from seeing this thing. So she looked and pondered and saw everything she hated in it, projecting every bad memory on it as a scapegoat... yet nothing came back. It didn't remember. So she left with a cruel happiness with no consequence.

			And so the old, worn, rusty, soulless, and tired calculator sat on a desk. It waited for someone else to come.
			
			Once, when times struck right, a pen...
			
			IT COULDN'T ACT ON ITS OWN`},
		{x: 1, y: 2, text: `'Rain. It was raining. It was pouring over me like the gods themselves wished for the storm. No one else was there. It was just me. And the rain.' Luna said in a pseudo-melodramtic way as is her usual voice. She was introducing her story on the one time she somehow accidentally worked at a dock, and that's <b>insane</b>`},
		{x: 1, y: 3, text: "Book 3A"},
		{x: 1, y: 4, text: "Book 4A"},
		{x: 1, y: 5, text: "Book 5A"},
		{x: 1, y: 6, text: "Book 6A"},
		{x: 1, y: 7, text: "Book 7A"},
		{x: 4, y: 1, text: "Book 1B"},
		{x: 4, y: 2, text: "Book 2B"},
		{x: 4, y: 3, text: "Book 3B"},
		{x: 4, y: 5, text: "Book 4B"},
		{x: 4, y: 6, text: "Book 5B"},
		{x: 4, y: 7, text: "Book 6B"},
		{x: 7, y: 1, text: "Book 1C"},
		{x: 7, y: 2, text: "Book 2C"},
		{x: 7, y: 3, text: "Book 3C"},
		{x: 7, y: 5, text: "Book 4C"},
		{x: 7, y: 6, text: "Book 5C"},
		{x: 7, y: 7, text: "Book 6C"},
	],
}

const signsmile = {

}

const interScreens = {
	"0,1": [
    {
        "type": "sign",
        "x": 1,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "You will find quite a few puzzles on your journey."
    },
	{
        "type": "sign",
        "x": 2,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "A lot will contain blocks which can be moved by pushing them."
    },
	{
        "type": "sign",
        "x": 3,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "Although. Certain blocks can push other blocks."
    },
    {
        "type": "block",
        "x": 4,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "hasMoved": false
    },
	{
        "type": "block",
        "x": 5,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 6,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 7,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": false
    },
], "-1,0": [
    {
        "type": "sign",
        "x": 1,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "Much in stored in these halls. Be wary of what you may find."
    },
    {
        "type": "door",
        "x": 0,
        "y": 4,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "lever",
        "x": 4,
        "y": 7,
        "state": "off",
        "frameIndex": 0,
        "solid": true
    },
	{
        "type": "button",
        "x": 6,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 7,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    },
	{
        "type": "ice",
        "x": 3,
        "y": 4,
        "state": "",
        "frameIndex": 9,
        "solid": true
    },
	{
        "type": "block",
        "x": 8,
        "y": 4,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
], "-2,0": [
    {
        "type": "sign",
        "x": 1,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "Also. Ice blocks move until they must stop. Am I a bit late on that instruction?"
    },
    {
        "type": "door",
        "x": 5,
        "y": 0,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "door",
        "x": 6,
        "y": 0,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "door",
        "x": 5,
        "y": 8,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "door",
        "x": 6,
        "y": 8,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "door",
        "x": 2,
        "y": 2,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "button",
        "x": 4,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 5,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    },
	{
        "type": "button",
        "x": 6,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 7,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    },
	{
        "type": "block",
        "x": 9,
        "y": 3,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 4,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 5,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
	{
        "type": "block",
        "x": 2,
        "y": 3,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
	{
        "type": "block",
        "x": 2,
        "y": 4,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
	{
        "type": "block",
        "x": 2,
        "y": 5,
        "state": "",
        "frameIndex": 8,
        "solid": true
    },
], "0,2": [
    {
        "type": "sign",
        "x": 1,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "the doors will open when all buttons are pressed."
    },
	{
        "type": "sign",
        "x": 2,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "As you can see not every place is available on any given journey."
    },
	{
        "type": "sign",
        "x": 3,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "So pick wisely."
    },
	{
        "type": "door",
        "x": 5,
        "y": 8,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "door",
        "x": 6,
        "y": 8,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "button",
        "x": 0,
        "y": 3,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 0,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 0,
        "y": 5,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "block",
        "x": 9,
        "y": 2,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 6,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
], "-1,2": [
    {
        "type": "sign",
        "x": 1,
        "y": 1,
        "state": 0,
        "frameIndex": 0,
        "solid": true,
        "hasMoved": false,
        "text": "You went the path of the explorer."
    },
	{
        "type": "door",
        "x": 0,
        "y": 4,
        "state": "closed",
        "frameIndex": 10,
        "solid": true
    },
	{
        "type": "button",
        "x": 11,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 11,
        "y": 3,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 11,
        "y": 5,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 10,
        "y": 4,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 10,
        "y": 2,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 10,
        "y": 6,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 9,
        "y": 1,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 9,
        "y": 2,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 9,
        "y": 3,
        "state": "",
        "frameIndex": 4,
        "solid": false
    },
	{
        "type": "button",
        "x": 9,
        "y": 5,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 9,
        "y": 6,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "button",
        "x": 9,
        "y": 7,
        "state": "",
        "frameIndex": 4,
        "solid": false
    }, 
	{
        "type": "block",
        "x": 9,
        "y": 2,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 9,
        "y": 6,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 7,
        "y": 2,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 7,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 7,
        "y": 6,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 5,
        "y": 2,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 5,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 5,
        "y": 6,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 3,
        "y": 2,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 3,
        "y": 4,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
	{
        "type": "block",
        "x": 3,
        "y": 6,
        "state": 0,
        "frameIndex": 8,
        "solid": true,
        "multipush": true
    },
], "0,-1": [
    {
        "type": "lock",
        "x": 0,
        "y": 3,
		"colour": "lost",
        "frameIndex": 7,
    },
	{
        "type": "lock",
        "x": 0,
        "y": 4,
		"colour": "lost",
        "frameIndex": 7,
    },
	{
        "type": "lock",
        "x": 0,
        "y": 5,
		"colour": "lost",
        "frameIndex": 7,
    },
	{
        "type": "lock",
        "x": 5,
        "y": 0,
		"colour": "lost",
        "frameIndex": 7,
    },
	{
        "type": "lock",
        "x": 6,
        "y": 0,
		"colour": "lost",
        "frameIndex": 7,
    },
	{
        "type": "key",
        "x": random(1, 10),
        "y": random(1, 7),
		"colour": "lost",
        "frameIndex": 6,
    },
	{
        "type": "key",
        "x": random(1, 10),
        "y": random(1, 7),
		"colour": "lost",
        "frameIndex": 6,
    },
	{
        "type": "key",
        "x": random(1, 10),
        "y": random(1, 7),
		"colour": "lost",
        "frameIndex": 6,
    },
	{
        "type": "key",
        "x": random(1, 10),
        "y": random(1, 7),
		"colour": "lost",
        "frameIndex": 6,
    },
	{
        "type": "key",
        "x": random(1, 10),
        "y": random(1, 7),
		"colour": "lost",
        "frameIndex": 6,
    },
],};

const interScreensmile = {};

const existing = new Set(interScreens["0,-1"].map(obj => `${obj.x},${obj.y}`));


interScreens["0,-1"] = interScreens["0,-1"].concat(
  [...Array(10)].flatMap((_, x) =>
    [...Array(7)]
      .map((_, y) => ({ type: "key", x: x + 1, y: y + 1, colour: "no u", frameIndex: 6 }))
      .filter(obj => !existing.has(`${obj.x},${obj.y}`) && existing.add(`${obj.x},${obj.y}`))
  )
);

const slowRooms = [{x: -1, y:1}];

/*function display(text) {
	const newTab = window.open('', '_blank'); // Open a new blank tab
	newTab.document.write('<pre>' + text + '</pre>'); // Write text inside <pre> to preserve formatting
	//newTab.document.close();
}*/

/*function display(text) {
    // Check if a popup already exists, remove it
    const existingPopup = document.getElementById('text-popup');
    if (existingPopup) existingPopup.remove();

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'text-popup';
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;

    // Create popup box
    const box = document.createElement('div');
    box.style.backgroundColor = '#8b3030ff';
	box.style.fontFamily = 'DT'
	box.style.fontSize = '1.5rem'
	box.style.color = '#c67171ff';
    box.style.padding = '20px';
    box.style.borderRadius = '8px';
    box.style.maxWidth = '80%';
    box.style.maxHeight = '80%';
    box.style.overflowY = 'auto';
    box.style.whiteSpace = 'pre-wrap';
    box.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';

    // Add text
    box.textContent = text;

    // Close on click overlay
    overlay.addEventListener('click', () => overlay.remove());

    overlay.appendChild(box);
    document.body.appendChild(overlay);
}*/

function display(text, options = {}) {
    const existingPopup = document.getElementById('text-popup');
    if (existingPopup) existingPopup.remove();

    paused = true; // set paused when popup opens

    // Options
    const config = {
        smoothScroll: false,          // default: jagged scroll
        scrollAcceleration: 2,        // base speed for smooth scroll
        aspectRatio: 4/3,            // e.g., 4/3 for optional containment
        ...options
    };

    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'text-popup';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    });

    // Create popup box
    const box = document.createElement('div');
    Object.assign(box.style, {
        backgroundColor: '#8b3030ff',
        fontFamily: 'DT',
        fontSize: '1.2rem', // og 1.5rem
        color: '#c67171ff',
        padding: '20px',
        borderRadius: '8px', //originally 8px
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'hidden', // hide scrollbar
        whiteSpace: 'pre-wrap',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        outline: 'none',

		// Disable text selection and dragging
		userSelect: 'none',
		webkitUserSelect: 'none', // Safari
		MozUserSelect: 'none',    // Firefox
		msUserSelect: 'none'      // IE/Edge
    });

    box.innerHTML = text;
    box.tabIndex = 0; // focusable for key events

    // Apply optional aspect ratio constraint
    if (config.aspectRatio) {
        const screenWidth = window.innerWidth * 0.8;   // leave 10% margin
        const screenHeight = window.innerHeight * 0.8; // leave 10% margin
        const targetWidth = Math.min(screenWidth, screenHeight * config.aspectRatio);
        const targetHeight = Math.min(screenHeight, screenWidth / config.aspectRatio);

        box.style.width = `${targetWidth}px`;
        box.style.height = `${targetHeight}px`;
    }

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    box.focus(); // focus for key events

    let scrollPosition = 0;
    const lineHeight = 24; // jagged scroll
    let smoothInterval = null;

    box.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Close popup on q, e, or escape
        if (key === 'q' || key === 'e' || key === 'escape') {
            overlay.remove();
            paused = false;
            clearInterval(smoothInterval);
        }
        // Jagged scroll
        else if (!config.smoothScroll) {
            if (key === 'arrowdown') {
                scrollPosition = Math.min(scrollPosition + lineHeight, box.scrollHeight - box.clientHeight);
                box.scrollTop = scrollPosition;
                e.preventDefault();
            } else if (key === 'arrowup') {
                scrollPosition = Math.max(scrollPosition - lineHeight, 0);
                box.scrollTop = scrollPosition;
                e.preventDefault();
            }
        }
        // Smooth scroll with acceleration
        else if (config.smoothScroll && (key === 'arrowdown' || key === 'arrowup' || key === 's')) {
            clearInterval(smoothInterval);

            let direction = 0;
            if (key === 'arrowdown') direction = 1;
            else if (key === 'arrowup') direction = -1;
            else if (key === 's') direction = 1;

            let speed = config.scrollAcceleration;
            let acceleration = 0.1;

            smoothInterval = setInterval(() => {
                const atTop = scrollPosition <= 0;
                const atBottom = scrollPosition >= box.scrollHeight - box.clientHeight;

                if ((direction === 1 && atBottom) || (direction === -1 && atTop)) {
                    clearInterval(smoothInterval);
                    return;
                }

                scrollPosition += speed * direction;
                box.scrollTop = scrollPosition;

                // accelerate
                speed += acceleration;
            }, 16); // ~60fps

            // Stop smooth scroll on keyup
            const stopSmooth = () => {
                clearInterval(smoothInterval);
                box.removeEventListener('keyup', stopSmooth);
            };
            box.addEventListener('keyup', stopSmooth);
        }
    });
}

class Sprite {
	constructor(options) {
		this.image = options.image;
		this.frameWidth = options.frameWidth;
		this.frameHeight = options.frameHeight;
		this.sheetColumns = options.sheetColumns;

		// Movement
		this.x = unit * options.x || 0;
		this.y = unit * options.y || 0;
		this.targetX = this.x;
		this.targetY = this.y;
		this.logicalX = options.x || 0;
		this.logicalY = options.y || 0;
		this.speed = options.speed || 4;
		this.quickacc = options.acc || 0.2;

		// Animation system
		this.animations = options.animations || {}; // {name: {start, end, speed}}
		this.currentAnimation = options.currentAnimation || null;
		this.frameIndex = 0;
		this.tickCount = 0;
	}

	setAnimation(name) {
		if (!this.animations[name]) {
			console.warn(`Animation "${name}" does not exist!`);
			return;
		}
		if (this.currentAnimation !== name) {
			this.currentAnimation = name;
			this.frameIndex = this.animations[name].start; // reset to animation start
			this.tickCount = 0;
		}
	}

	update() {
		// Update animation
		if (this.currentAnimation) {
			const anim = this.animations[this.currentAnimation];
			this.tickCount++;
			if (this.tickCount >= (anim.speed || 5)) {
				this.frameIndex++;
				if (this.frameIndex > anim.end) this.frameIndex = anim.start;
				this.tickCount = 0;
			}
		}

		// Smooth movement
		const dx = this.targetX - this.x;
		const dy = this.targetY - this.y;

		if (Math.abs(dx) > 0.1) this.x += dx * this.quickacc;
		if (Math.abs(dy) > 0.1) this.y += dy * this.quickacc;

		//this.unitx = Math.round(this.x / unit);
		//this.unity = Math.round(this.y / unit);
		// Logical positions stay grid-locked
		this.unitx = this.logicalX;
		this.unity = this.logicalY;
	}

	draw(ctx) {
		const sx = (this.frameIndex % this.sheetColumns) * this.frameWidth;
		const sy = Math.floor(this.frameIndex / this.sheetColumns) * this.frameHeight;

		ctx.drawImage(
			this.image,
			sx, sy,
			this.frameWidth, this.frameHeight,
			this.x, this.y,
			unit, unit
		);

		if(debug) {
			ctx.fillStyle = "#FF0000aa"
			ctx.fillRect(this.unitx * unit, this.unity * unit, unit, unit);
		}
	}

	moveTo(x, y) {
		this.logicalX = x;
	    this.logicalY = y;
		this.targetX = x * unit;
		this.targetY = y * unit;
	}

	moveBy(dx, dy) {
		this.logicalX += dx;
	    this.logicalY += dy;
		this.targetX += dx * unit;
		this.targetY += dy * unit;
	}
}

class Tile {
    constructor(options) {
        this.image = options.image;       // tileset image
        this.tileWidth = options.tileWidth;   // in tilesheet pixels
        this.tileHeight = options.tileHeight; // in tilesheet pixels
        this.sheetColumns = options.sheetColumns;
        this.frameIndex = options.frameIndex || 0;
        this.x = options.x || 0;  // in units
        this.y = options.y || 0;  // in units
    }

    draw(ctx, offsetX = 0, offsetY = 0) {
		const sx = (this.frameIndex % this.sheetColumns) * this.tileWidth;
		const sy = Math.floor(this.frameIndex / this.sheetColumns) * this.tileHeight;

		ctx.drawImage(
			this.image,
			sx, sy,
			this.tileWidth, this.tileHeight,
			this.x + offsetX,
			this.y + offsetY,
			unit, unit
		);
	}
}

class Interactable {
	constructor({ x, y, type, state = 0 }) {
		this.image = interSheet;
		this.x = x; // in tile coordinates
		this.y = y;
		this.type = type;
		this.state = state; // custom per type
		this.frameIndex = 0;
		this.frames = 4;
		this.width = unit;
		this.height = unit;
		this.solid = false; // default non-solid
	}

	draw(ctx, offsetX = 0, offsetY = 0) {
		const sx = (this.frameIndex % this.frames) * 16;
		const sy = Math.floor(this.frameIndex / this.frames) * 16;
		ctx.drawImage(
			this.image,
			sx, sy,
			16, 16,
			this.x * unit + offsetX,
			this.y * unit + offsetY,
			unit, unit
		);
	}

	update(game, dt) {}
	interact(player, game) {}
}

class Lever extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "lever" });
		this.solid = false;
		this.frameIndex = 0;
		this.cooldown = 0;
	}

	update(game, dt) {
		// Animate lever returning to stable state
		if (this.state === "animating") {
			if( this.cooldown > 0 ){
				this.cooldown--;
				return;
			}
			this.frameIndex = this.frameIndex === 1 ? 2 : 0;
			this.state = (this.frameIndex === 2) ? "on" : "off";
		}
	}

	interact(player, game) {
		if (player.y === this.y - 1 && player.x === this.x) {
			this.state = "animating";
			this.cooldown += 5;
			this.frameIndex = (this.frameIndex === 0) ? 1 : 3;
		}
	}
}

class Sign extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "sign" });
		this.image = signe;
		this.frames = 1;
		this.solid = true;
		this.frameIndex = 0;
		this.text = opts.text || "[[It's unreadable.]]";
		this.cooldown = 0;
		this.readable = true;
		this.directional = false;
	}

	update(game, dt) {
		if(paused) this.cooldown = 20;

		if(this.cooldown > 0){
			this.readable = false;
			this.cooldown -= dt * 1000;
		} else {
			this.readable = true;
			this.cooldown = 0;
		}
	}

	interact(player, game) {
		if (player.y === this.y + 1 && player.x === this.x && this.readable || (Math.abs(player.x - this.x) + Math.abs(player.y - this.y) === 1 && this.readable && !this.directional)) {
			display(this.text);
			this.cooldown = 20;
			this.readable = false;
		}
	}
}

class Button extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "button" });
		this.frameIndex = 4;
	}

	update(game, dt) {
		const somethingAbove = game.objects.some(
			o => o !== this && o.x === this.x && o.y === this.y
		);
		const playerAbove = (game.player.x === this.x && game.player.y === this.y);
		const pressed = somethingAbove || playerAbove;

		this.frameIndex = pressed ? 5 : 4;
		this.state = pressed ? "pressed" : "idle";
	}
}

class Lock extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "lock" });
		this.solid = true;
		this.frameIndex = 6;
		this.colour = opts.colour || "default";
	}

	removeKey(keys, color) {
		const index = keys.indexOf(color);
		if (index !== -1) {
			keys.splice(index, 1);
			return true; // removed successfully
		}
		return false; // color not found
	}

	hasKey(keys, color) {
		return keys.includes(color);
	}

	isAdjacentToPlayer(player) {
		return Math.abs(player.x - this.x) + Math.abs(player.y - this.y) === 1;
	}

	considerInteraction(ctx, player) {
		// must be adjacent
		if (!this.isAdjacentToPlayer(player)) {
			return;
		}

		const dir = directionFromPlayer(player, this);
		if (!dir) return;

		const dirIndex = directions.indexOf(dir);
		if (dirIndex === -1) return;

		// am I better than the current best?
		if (dirIndex < ctx.bestDirIndex) {
			ctx.bestDirIndex = dirIndex;
			ctx.bestLock = this;
		}
	}

	interact(player, game) {
		if(!game.player.hasKey) {
			game.player.hasKey = [];
			return;
		}
		/*if (this.isAdjacentToPlayer(player)) {
			if(this.removeKey(game.player.hasKey, this.colour)){
				game.removeObject(this);
				game.playSound("unlock");
			}
		}*/
	}
}

class Key extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "key" });
		this.frameIndex = 7;
		this.colour = opts.colour || "default";
	}

	addKey(keys, value) {
		if (!Array.isArray(keys)) {
			return [value];
		}
		keys.push(value);
		return keys;
	}

	update(game, dt) {
		if (game.player.x === this.x && game.player.y === this.y) {
			game.player.hasKey = this.addKey(game.player.hasKey, this.colour);
			game.removeObject(this);
			game.playSound("pickup");
		}
	}
}

class Block extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "block" });
		this.frameIndex = 8;
		this.solid = true;
		this.multipush = opts.multipush || false;
	}

	push(dx, dy, game) {
		const newX = this.x + dx;
		const newY = this.y + dy;
		
		if (this.multipush) {
			// Check what is in the next tile
			const objectsAhead = game.objects.filter(
				o => o.x === newX && o.y === newY
			);

			for (const obj of objectsAhead) {
				if (obj.type === "block") {
					// Recursively try to push the next block
					const pushed = obj.push(dx, dy, game);
					if (!pushed) return false; // blocked chain
				} else if (obj.solid) {
					return false; // blocked by a wall/door/etc
				}
			}
		};

		if (!game.isSolid(newX, newY)) {
			this.x = newX;
			this.y = newY;
			return true;
		}

		return false;
	}

	update(game, dt) {
		
	}
}

class Ice extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "ice" });
		this.frameIndex = 9;
		this.solid = true;
	}

	push(dx, dy, game) {
		let newX = this.x;
		let newY = this.y;
		while (!game.isSolid(newX + dx, newY + dy)) {
			newX += dx;
			newY += dy;
		}
		this.x = newX;
		this.y = newY;
	}
}

class Door extends Interactable {
	constructor(opts) {
		super({ ...opts, type: "door" });
		this.closedFrame = 10;
		this.openFrame = 11;
		this.frameIndex = this.closedFrame;
		this.solid = true;
	}

	open() {
		this.frameIndex = this.openFrame;
		this.solid = false;
	}

	close() {
		this.frameIndex = this.closedFrame;
		this.solid = true;
	}
}

class Game {
	constructor() {
		this.objects = []; // all interactables
		this.player = null;
	}

	updateDoors() {
		const allLeversOn = this.objects
			.filter(o => o.type === "lever")
			.every(o => o.state === "on");
		const allButtonsPressed = this.objects
			.filter(o => o.type === "button")
			.every(o => o.state === "pressed");

		this.objects
			.filter(o => o.type === "door")
			.forEach(door => {
				if (allLeversOn && allButtonsPressed) door.open();
				else door.close();
			});
	}

	isSolid(x, y) {
		return this.objects.some(o => o.solid && o.x === x && o.y === y) || y < 0 || y >= tileMap.length || x < 0 || x >= tileMap[0].length || tileMap[y][x] !== 0;
	}

	removeObject(obj) {
		this.objects = this.objects.filter(o => o !== obj);
	}

	playSound(name) {
		// stub for audio
	}
}

const tileSheet = new Image();
tileSheet.src = "Infinity2.5.png";

const interSheet = new Image();
interSheet.src = "inter.png";

const playerImg = new Image();
playerImg.src = "Player Placeholder.png";

const signe = new Image();
signe.src = "Sign (6).png";

let tileMap = [
    [9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],
];

let tempTileMap = [
    [9, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 8],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
    [0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [3, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 5],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
    [6, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 7],
];

tempTileMap = (screens[[currentScreen.x, currentScreen.y].join(",")] || screens["def"]).levelData;
tileMap = tempTileMap;

const tileSize = 16; // each tile is 16x16

let tiles = [];

function generateTilesFromMap() {
	tiles = [];
    tileMap.forEach((row, y) => {
        row.forEach((tileIndex, x) => {
            tiles.push(new Tile({
                image: tileSheet,
                tileWidth: tileSize,
                tileHeight: tileSize,
                sheetColumns: 4,
                frameIndex: tileIndex,
                x: x * unit, // scale by unit
                y: y * unit
            }));
        });
    });
    return tiles;
}

let tempi = [];
let tempi2 = [];

function generateInter(savedState) {
	tempi = [];
    savedState.forEach(data => {
		if(data.type === "sign"){
			tempi.push(new Tile({
				image: signe,
				tileWidth: tileSize,
				tileHeight: tileSize,
				sheetColumns: 4,
				frameIndex: 0,
				x: data.x * unit,
				y: data.y * unit
			}))
			return tempi;
		}
		
		tempi.push(new Tile({
			image: interSheet,
			tileWidth: tileSize,
			tileHeight: tileSize,
			sheetColumns: 4,
			frameIndex: data.frameIndex,
			x: data.x * unit,
			y: data.y * unit
		}))}
    );
    return tempi;
}

function generateInter2(savedState) {
	tempi2 = [];
    savedState.forEach(data => {
		if(data.type === "sign"){
			tempi2.push(new Tile({
				image: signe,
				tileWidth: tileSize,
				tileHeight: tileSize,
				sheetColumns: 4,
				frameIndex: 0,
				x: data.x * unit,
				y: data.y * unit
			}))
			return tempi2;
		}

		tempi2.push(new Tile({
			image: interSheet,
			tileWidth: tileSize,
			tileHeight: tileSize,
			sheetColumns: 4,
			frameIndex: data.frameIndex,
			x: data.x * unit,
			y: data.y * unit
		}))}
    );
    return tempi2;
}

generateTilesFromMap()

let temptiles = [];

function generateTempTilesFromMap() {
    temptiles = [];
    tempTileMap.forEach((row, y) => {
		row.forEach((tileIndex, x) => {
			temptiles.push(new Tile({
				image: tileSheet,
				tileWidth: tileSize,
				tileHeight: tileSize,
				sheetColumns: 4,
				frameIndex: tileIndex,
				x: x * unit,
				y: y * unit,
			}));
		});
	});
}

generateTempTilesFromMap();

let animspeed = 0.2; // def 0.2

const player = new Sprite({
	image: playerImg,
	frameWidth: 16,
	frameHeight: 16,
	sheetColumns: 1,
	x: 6,
	y: 4,
	animations: {
	idle: { start: 0, end: 0, speed: 5 },
	walkRight: { start: 1, end: 4, speed: 5 },
	walkLeft: { start: 5, end: 8, speed: 5 }
	},
	currentAnimation: "idle",
	speed: 4,
	acc: animspeed
});

/**
 * Load interactables from a tile map
 * @param {number[][]} tileMap - 2D array of tile numbers
 * @param {Game} game - the Game instance
 */
function loadInteractables(tileMap, game) {
    // Clear existing objects
    game.objects = [];

    for (let y = 0; y < tileMap.length; y++) {
        for (let x = 0; x < tileMap[y].length; x++) {
            const tile = tileMap[y][x];

            let obj = null;

            switch (tile) {
                case 1: // Block
                    obj = new Block({ x, y });
                    break;
                case 2: // Ice
                    obj = new Ice({ x, y });
                    break;
                case 3: // Lever
                    obj = new Lever({ x, y });
                    break;
                case 4: // Button
                    obj = new Button({ x, y });
                    break;
                case 5: // Door
                    obj = new Door({ x, y });
                    break;
                case 6: // Key
                    obj = new Key({ x, y });
                    break;
                case 7: // Lock
                    obj = new Lock({ x, y });
                    break;
                default:
                    break; // 0 = empty tile
            }

            if (obj) {
                game.objects.push(obj);
            }
        }
    }
}

let game = new Game();
game.player = {};

loadInteractables([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
], game)

game.objects.push(new Sign({x: 5, y: 4, text: "The beginning of a journey"}));

/**
 * Save the current state of all interactables in the game.
 * @param {Game} game - The game instance containing objects.
 * @returns {object[]} Array of plain objects describing each interactable.
 */
function saveGameState(game) {
    return game.objects.map(o => ({
        type: o.type,
        x: o.x,
        y: o.y,
        state: o.state,
        frameIndex: o.frameIndex,
        solid: o.solid,
        hasMoved: o.hasMoved ?? false,
		text: o.text
    }));
}

/**
 * Restore saved interactables into the game.
 * @param {object[]} savedState - The saved objects from saveGameState().
 * @param {Game} game - The Game instance.
 */
function loadGameState(savedState, game) {
    game.objects = savedState.map(data => {
        let obj;
        switch (data.type) {
            case "block": obj = new Block({ ...data }); break;
            case "ice": obj = new Ice({ ...data }); break;
            case "lever": obj = new Lever({ ...data }); break;
            case "button": obj = new Button({ ...data }); break;
            case "door": obj = new Door({ ...data }); break;
            case "key": obj = new Key({ ...data }); break;
            case "lock": obj = new Lock({ ...data }); break;
			case "sign": obj = new Sign({ ...data }); break;
            default: return null;
        }
        obj.frameIndex = data.frameIndex ?? 0;
        obj.solid = data.solid ?? obj.solid;
        obj.state = data.state ?? obj.state;
        return obj;
    }).filter(Boolean);
}

let lastTime = 0;
let prevEState = false;

function draw(time) {
	const deltaTime = (time - lastTime) / 1000; // seconds
    lastTime = time;

    ctx.clearRect(0, 0, width, height)

    ctx.imageSmoothingEnabled = false;
    tiles.forEach(tile => tile.draw(ctx, transx, transy));
	if(isTransitioning) {
		temptiles.forEach(tile => tile.draw(ctx, transxt, transyt));
		tempi.forEach(tile => tile.draw(ctx, transxt, transyt));
		tempi2.forEach(tile => tile.draw(ctx, transx, transy));
	}

    player.update(); // update position + animation

	game.player.x = player.unitx;
	game.player.y = player.unity;

	const now = Date.now();
	if (now - lastMoveTime >= plusOrMinusN(cooldown, 10) && !paused) {
		for (let key of keyOrder) {
			if (keys[key]) {
				switch (key) {
					case "ArrowRight": tryMove(1, 0); break;
					case "ArrowLeft":  tryMove(-1, 0); break;
					case "ArrowDown":  tryMove(0, 1); break;
					case "ArrowUp":    tryMove(0, -1); break;
					case "Alt":        if(debug) alt = !alt; break;
					//case "e":          checkInteractions(); break;
				}
				lastMoveTime = now;
				break; // only move for most recent key
			}
		}
	}

    // Edge-triggered interaction
    if (keys["e"] && !prevEState && !paused) {
        checkInteractions();
    }
    prevEState = keys["e"]; // update previous state

	// 1. Update all objects
	game.objects.forEach(obj => obj.update(game, deltaTime));

	// 2. Draw all objects
	if(!isTransitioning) game.objects.forEach(obj => obj.draw(ctx, transx, transy));

	game.updateDoors();

	player.draw(ctx);

	// Smooth movement
	const dx = tarnsx - transx;
	const dy = tarnsy - transy;

	if (Math.abs(dx) > 0.1) transx += dx * animspeed;
	if (Math.abs(dy) > 0.1) transy += dy * animspeed;

	// Smooth movement for second set
	const dxt = tarnsxt - transxt;
	const dyt = tarnsyt - transyt;

	if (Math.abs(dxt) > 0.1) transxt += dxt * animspeed;
	if (Math.abs(dyt) > 0.1) transyt += dyt * animspeed;

	// Check if all variables are at their targets
	if (
		Math.abs(dx) <= 0.1 &&
		Math.abs(dy) <= 0.1 &&
		Math.abs(dxt) <= 0.1 &&
		Math.abs(dyt) <= 0.1 &&
		isTransitioning
	) {
		// Reset to initial states
		transx = 0;
		transy = 0;
		tarnsx = 0;
		tarnsy = 0;

		transxt = 12 * unit;
		transyt = 0;
		tarnsxt = 12 * unit;
		tarnsyt = 0;

		isTransitioning = false;

		generateTilesFromMap();

		if(!alt) {
			if(interScreens[[currentScreen.x, currentScreen.y].join(",")]) loadGameState(interScreens[[currentScreen.x, currentScreen.y].join(",")], game);
		} else {
			if(interScreensmile[[currentScreen.x, currentScreen.y].join(",")]) loadGameState(interScreensmile[[currentScreen.x, currentScreen.y].join(",")], game);
		}
	}

    requestAnimationFrame(draw);
}

let isTransitioning = false;
let transx = 0;
let transy = 0;
let tarnsx = 0;
let tarnsy = 0;
let transxt = 12 * unit;
let transyt = 0;
let tarnsxt = 12 * unit;
let tarnsyt = 0;
let keys = {};
let keyOrder = []; // most recently pressed keys first
let cooldown = 200; // 235 ms between moves
let lastMoveTime = 0;
let counter = 0;
const directions = ["up", "left", "down", "right"];
const N = 10; // Run once every 3 calls

function scoreLock(lock, player, dirVec) {
	const dx = lock.x - player.x;
	const dy = lock.y - player.y;

	// must be adjacent
	if (Math.abs(dx) + Math.abs(dy) !== 1) return -Infinity;

	// dot product gives directional preference
	return dx * dirVec.x + dy * dirVec.y;
}

function directionFromPlayer(player, obj) {
	const dx = obj.x - player.x;
	const dy = obj.y - player.y;

	if (dx === 1 && dy === 0) return "right";
	if (dx === -1 && dy === 0) return "left";
	if (dx === 0 && dy === 1) return "down";
	if (dx === 0 && dy === -1) return "up";

	return null;
}

function checkInteractions() {
	//debugger

	const interactionCtx = {
		bestLock: null,
		bestDirIndex: Infinity
	};

	game.objects.forEach(obj => {
		obj.interact(game.player, game);
		if(obj.type === "lock") obj.considerInteraction(interactionCtx, game.player);
	});
	
	if (interactionCtx.bestLock) {
		if (interactionCtx.bestLock.removeKey(game.player.hasKey, interactionCtx.bestLock.colour)) {
			game.removeObject(interactionCtx.bestLock);
			game.playSound("unlock");
		}
	}
}

// Listen for key presses
document.addEventListener("keydown", (e) => {
	if(debug && e.key == "Alt") e.preventDefault();

	if (!keys[e.key]) {
		keys[e.key] = true;
		keyOrder.unshift(e.key); // most recent key at the front
	}
});

document.addEventListener("keyup", (e) => {
	keys[e.key] = false;
	const index = keyOrder.indexOf(e.key);
	if (index > -1) keyOrder.splice(index, 1);
});

function vectorToDirection(vec) {
	const { x, y } = vec;

	if (x === 0 && y === 0) return null;

	if (Math.abs(x) >= Math.abs(y)) {
		return x > 0 ? "right" : "left";
	} else {
		return y > 0 ? "down" : "up";
	}
}

function prioritizeDirectionInPlace(dir) {
	const index = directions.indexOf(dir);
	if (index <= 0) return; // not found or already first

	const [chosen] = directions.splice(index, 1);
	directions.unshift(chosen);
}

// Function to check collision before calling player.moveBy
function tryMove(dx, dy) {
	const newX = player.unitx + dx;
	const newY = player.unity + dy;

	const notSolidTiles = [0, 10];

	prioritizeDirectionInPlace(
		vectorToDirection({ x: dx, y: dy })
	);

	if(slowRooms.some(obj => obj.x === currentScreen.x && obj.y === currentScreen.y) && dx < 0) {
		counter++;
		counter = counter % N;
		if(counter !== 0){
			return;
		}
	}

	const wrappedY = ((newY % tileMap.length) + tileMap.length) % tileMap.length;
	const wrappedX = ((newX % tileMap[0].length) + tileMap[0].length) % tileMap[0].length;

	// Check if the target position is out of bounds
	const outOfBounds =
		newY < 0 ||
		newY >= tileMap.length ||
		newX < 0 ||
		newX >= tileMap[0].length;

	// Check if player is already out of bounds
	const playerOutOfBounds =
		player.unity < 0 ||
		player.unity >= tileMap.length ||
		player.unitx < 0 ||
		player.unitx >= tileMap[0].length;

	// Check bounds and trigger screen transition
	if (outOfBounds) {
		if(isTransitioning || playerOutOfBounds) {
			// I want to move the player to the nearest not out of bounds and not colliding square if they're not already on one
			snapToNearestValidTile();
			return;
		} 

		const nextScreenKey = [currentScreen.x + dx, currentScreen.y + dy].join(",");
		const nextScreen = alt ? screensmile[nextScreenKey] || screensmile["def"] : screens[nextScreenKey] || screens["def"];
		const nextTile = nextScreen.levelData[wrappedY][wrappedX];

		// Block movement if the next tile is colliding
		if (!notSolidTiles.includes(nextTile)) return;

		// Check if any solid objects exist in that tile of the next screen
		const nextScreenObjects = (alt ? interScreensmile[nextScreenKey] : interScreens[nextScreenKey]) || [];
		const solidObjectThere = nextScreenObjects.some(o =>
			Math.round(o.x) === wrappedX &&
			Math.round(o.y) === wrappedY &&
			o.solid
		);

		if (solidObjectThere) return; // Block movement into solid objects

		screenTransition(dx, dy); // transition function
		return; // stop normal movement
	}

	// Check collision
	if (!notSolidTiles.includes(tileMap[newY][newX])) return;

	// Get all objects on the target tile
	const objectsHere = game.objects.filter(o => o.x === newX && o.y === newY);

	const objectse = tempi.filter(o => Math.round(o.x / unit) === newX && Math.round(o.y / unit) === newY);

	if(isTransitioning && (objectse.length !== 0 && objectse.length !== 10)) return;
	
	for (const obj of objectsHere){
		if (obj) {
			if (obj.type === "block") {
				obj.push(dx, dy, game); // try to push 1 tile
				if (game.isSolid(newX, newY)) return; // blocked after push
			} else if (obj.type === "ice") {
				obj.push(dx, dy, game); // slides until solid
				if (game.isSolid(newX, newY)) return; // blocked
			} else if (obj.solid) {
				return; // any other solid object blocks movement
			}
		}
	}
	// Call the existing player movement
	player.moveBy(dx, dy);
}

function snapToNearestValidTile() {
    // Clamp the player's coordinates to map bounds
    let x = Math.max(0, Math.min(player.unitx, tileMap[0].length - 1));
    let y = Math.max(0, Math.min(player.unity, tileMap.length - 1));

    // If this tile is free, move there immediately
    if (tileMap[y][x] === 0) {
        player.moveTo(x, y);
        return;
    }

    // Otherwise, search nearby tiles in order of Manhattan distance
    const maxDistance = Math.max(tileMap.length, tileMap[0].length);
    for (let dist = 1; dist <= maxDistance; dist++) {
        for (let dy = -dist; dy <= dist; dy++) {
            for (let dx = -dist; dx <= dist; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= tileMap[0].length || ny >= tileMap.length) continue;
                if (tileMap[ny][nx] === 0) {
                    player.moveTo(nx, ny);
                    return;
                }
            }
        }
    }
}

function screenTransition(dx, dy) {
	tarnsxt = 0;
	tarnsyt = 0;
	transxt = 0;
	transyt = 0;
	isTransitioning = true;

	/*if(alt){
		interScreensmile[[currentScreen.x, currentScreen.y].join(",")] = {}
		interScreensmile[[currentScreen.x, currentScreen.y].join(",")] = saveGameState(game);
		if(signs[[currentScreen.x, currentScreen.y].join(",")] && !interScreensmile[[currentScreen.x, currentScreen.y].join(",")].some(data => data.type === "sign")) {
			signs[[currentScreen.x, currentScreen.y].join(",")].forEach(a => {
				interScreensmile[[currentScreen.x, currentScreen.y].join(",")].push(new Sign ({	...a}))
			})
		}
	} else {
		interScreens[[currentScreen.x, currentScreen.y].join(",")] = {}
		interScreens[[currentScreen.x, currentScreen.y].join(",")] = saveGameState(game);
		if(signs[[currentScreen.x, currentScreen.y].join(",")] && !interScreens[[currentScreen.x, currentScreen.y].join(",")].some(data => data.type === "sign")) {
			signs[[currentScreen.x, currentScreen.y].join(",")].forEach(a => {
				interScreens[[currentScreen.x, currentScreen.y].join(",")].push(new Sign ({	...a}))
			})
		}
	}*/

	let key = `${currentScreen.x},${currentScreen.y}`;
	const target = alt ? interScreensmile : interScreens;

	target[key] = saveGameState(game);

	if(alt) {
		if (signsmile[key] && !target[key].some(data => data.type === "sign")) {
			signsmile[key].forEach(a => {
				target[key].push(new Sign({ ...a }));
			});
		}
	} else {
		if (signs[key] && !target[key].some(data => data.type === "sign")) {
			signs[key].forEach(a => {
				target[key].push(new Sign({ ...a }));
			});
		}
	}

	tempi2 = [];
	if(alt) {
		generateInter2(interScreensmile[[currentScreen.x, currentScreen.y].join(",")]);
	} else {
		generateInter2(interScreens[[currentScreen.x, currentScreen.y].join(",")]);
	}

	currentScreen.x += dx;
	currentScreen.y += dy;

	/*key = [currentScreen.x, currentScreen.y].join(",");
	const screenData = alt ? interScreensmile[key] : interScreens[key];
	const hasSign = screenData?.some(data => data.type === "sign") || false;

	if(alt) {
		tempTileMap = (screensmile[[currentScreen.x, currentScreen.y].join(",")] || screensmile["def"]).levelData;
	} else {
		tempTileMap = (screens[[currentScreen.x, currentScreen.y].join(",")] || screens["def"]).levelData;
	}
	tileMap = tempTileMap;
	generateTempTilesFromMap();*/

	key = [currentScreen.x, currentScreen.y].join(",");

	const screenData = alt ? interScreensmile[key] : interScreens[key];
	const hasSign = screenData?.some(data => data.type === "sign") || false;

	if (alt) {
		tempTileMap = (screensmile[key] || screensmile["def"]).levelData
		              .map(row => row.map(value => value + 10));;
	} else {
		tempTileMap = (screens[key] || screens["def"]).levelData;
	}

	tileMap = tempTileMap;
	generateTempTilesFromMap();

	game.objects = [];

	tempi = [];

	/*if (alt) {
		if(interScreensmile[[currentScreen.x, currentScreen.y].join(",")]) generateInter(interScreensmile[[currentScreen.x, currentScreen.y].join(",")]);
	} else {
		if(interScreens[[currentScreen.x, currentScreen.y].join(",")]) generateInter(interScreens[[currentScreen.x, currentScreen.y].join(",")]);
	}*/

	const source = alt ? interScreensmile : interScreens;

	if (source[key]) {
		generateInter(source[key]);
	}

	if(alt){
		if(signsmile[[currentScreen.x, currentScreen.y].join(",")] && !hasSign) {
			signsmile[[currentScreen.x, currentScreen.y].join(",")].forEach(a => {
				game.objects.push(new Sign ({	...a}))
				generateInter(saveGameState(game));
			})
		}
	} else {
		if(signs[[currentScreen.x, currentScreen.y].join(",")] && !hasSign) {
			signs[[currentScreen.x, currentScreen.y].join(",")].forEach(a => {
				game.objects.push(new Sign ({	...a}))
				generateInter(saveGameState(game));
			})
		}
	}

	if (dx !== 0) { 
		// Horizontal movement
		tarnsx -= dx * 12 * unit;        // subtract if dx = 1 (right), add if dx = -1 (left)
		transxt = dx * 12 * unit;
		player.moveTo(dx === 1 ? 0 : 11, player.unity);
	} else if (dy !== 0) { 
		// Vertical movement
		tarnsy -= dy * 9 * unit;         // subtract if dy = 1 (down), add if dy = -1 (up)
		transyt = dy * 9 * unit;
		player.moveTo(player.unitx, dy === 1 ? 0 : 8);
	}
}

function plusOrMinusN(value, n) {
  // Math.random() generates a number between 0 and 1
  // Multiply by 2*n to get a range from 0 to 2n
  // Subtract n to shift to [-n, +n]
  const randomOffset = (Math.random() * 2 * n) - n;
  return value + randomOffset;
}

tileSheet.onload = () => {
    draw();
};