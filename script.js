const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = window.innerWidth
// edge defines thr radius of circle in which 
//the particle is created around mouse pointer
let edge = 70

let drawing = false

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
    // console.log(mouse.x, mouse.y)
})


//Root class 

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedX = 0;
        this.speedY = 0;

    }
    update() {
        //speed can be random positive or negative random numberr
        this.speedX += (Math.random() - 0.5) / 2
        this.speedY += (Math.random() - 0.5) / 2
        this.x += this.speedX
        this.y += this.speedY

        const distanceX = this.x - this.centerX
        const distanceY = this.y - this.centerY
        //if we connect these two points, we get a right angled triangle

        //as per the pythagoras theoram
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)


        const radius = (-distance / edge + 1) * edge / 10

        if (radius > 0) {
            requestAnimationFrame(this.update.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
            ctx.fillStyle = this.color
            ctx.fill()
            ctx.strokeStyle = 'black'
            ctx.stroke();
        }

    }
}
const branchOut = () => {
    if (drawing) {
        const centerX = mouse.x
        const centerY = mouse.y

        for (let i = 0; i < 4; i++) {
            const root = new Root(mouse.x, mouse.y, "red", centerX, centerY)
            root.update();

        }

    }

}
//prevent stretching when user resizes the window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

});

//the mouse trail efffect

window.addEventListener("mousemove", () => {
    // ctx.fillStyle = 'rgba(255,255,255,0.03)'
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});

window.addEventListener("mousedown", () => {
    drawing = true
})

window.addEventListener("mouseup", () => {
    drawing = false
})