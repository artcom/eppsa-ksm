class Win extends Phaser.Scene {
	constructor () {
		super({
			key: 'WinScene'
		});
	}

	preload () {

	}

	create (data) {
		console.log("I am the WinScene!");
		var x = window.innerWidth/2-(window.innerWidth/2*0.4);
		var y = window.innerHeight/2;

		var x2 = window.innerWidth/2-(window.innerWidth/2*0.4);
		var y2 = window.innerHeight/1.8;

		var fontSize = Math.floor(window.innerHeight*window.innerWidth/x/y)*5;

		var fontSize2 = Math.floor(window.innerHeight*window.innerWidth/x/y)*3;

		var text1 = this.add.text(x, y, 'You win^^', { font: fontSize + 'px Arial', fill: 'green'});

		var text2 = this.add.text(x2, y2, 'It took you ' + data.t + ' seconds', {font: fontSize2 + 'px Arial', fill: 'green'});

		this.sys.game.completeChallenge(400)
	}
}

export default Win;
