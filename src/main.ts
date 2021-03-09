let width: number, height: number

let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D

function createCanvas(
	root: HTMLDivElement
): [HTMLCanvasElement, CanvasRenderingContext2D] {
	// Create canvas
	const canvas: HTMLCanvasElement = document.createElement('canvas')
	// Configure canvas
	canvas.width = window.screen.width
	canvas.height = window.screen.height
	// Append canvas to root
	root.appendChild(canvas)
	// Get canvas context
	const context = canvas.getContext('2d') as CanvasRenderingContext2D

	return [canvas, context]
}

interface Coordinates {
	x: number
	y: number
}

interface Size {
	width: number
	height: number
}

enum Direction {
	Left = 'left',
	Right = 'right',
	Up = 'up',
	Down = 'down',
}

let sound: HTMLAudioElement | undefined

class Mice {
	position: Coordinates = { x: 0, y: 0 }
	size: Size = { width: 128, height: 128 }

	moveUp = false
	moveDown = false
	moveLeft = false
	moveRight = false

	image: HTMLImageElement | undefined

	render() {
		this.image = new Image()
		this.image.src = '/mice.png'

		for (let i = 0; i < 16; i++) {
			if (this.moveRight) {
				if (this.position.x === canvas.width - this.size.width) {
					this.moveRight = false
				} else {
					this.position.x++
				}
			}
			if (this.moveLeft) {
				if (this.position.x === 0) {
					this.moveLeft = false
				} else {
					this.position.x--
				}
			}
			if (this.moveUp) {
				if (this.position.y === 0) {
					this.moveUp = false
				} else {
					this.position.y--
				}
			}
			if (this.moveDown) {
				if (this.position.y === canvas.height - this.size.height) {
					this.moveDown = false
				} else {
					this.position.y++
				}
			}
		}

		context.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.size.width,
			this.size.height
		)
		/*
		context.fillStyle = 'black'
		context.fillRect(this.position.x, this.position.y, 64, 64)
        */
	}
}

/*
const mice = new Mice()
const mice2 = new Mice()
*/

function moveRandom(mice: Mice) {
	mice.moveUp = Boolean(Math.round(Math.random()))
	mice.moveDown = Boolean(Math.round(Math.random()))
	mice.moveLeft = Boolean(Math.round(Math.random()))
	mice.moveRight = Boolean(Math.round(Math.random()))
}

let mices: Array<Mice> = []

for (let i = 0; i < 4; i++) {
	mices.push(new Mice())
}

function draw(): void {
	requestAnimationFrame(draw)

	context.clearRect(0, 0, width, height)

	mices.forEach((mice) => {
		mice.render()
	})
}

function setup() {
	const root = document.getElementById('root') as HTMLDivElement
	;[canvas, context] = createCanvas(root)

	width = canvas.width
	height = canvas.height

	sound = document.createElement('audio')
	sound.src = '/mouse-squeaking-noise.mp3'
	sound.loop = true

	setInterval(() => {
		mices.forEach((mice) => {
			moveRandom(mice)
		})
	}, 500)

	root.onclick = (event) => {
		if (sound) {
			sound.play()
		}
		mices.forEach((mice) => {
			if (
				event.offsetX > mice.position.x &&
				event.offsetX < mice.position.x + mice.size.width &&
				event.offsetY > mice.position.y &&
				event.offsetY < mice.position.y + mice.size.height
			) {
				document.body.style.background = 'green'
				setTimeout(() => {
					document.body.style.background = 'white'
				}, 1000)
			}
		})
	}

	draw()
}

export default setup
