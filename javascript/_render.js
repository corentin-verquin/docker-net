import cloud from './cloud'

class Renderer {
    constructor(graph, canvas) {
        this.layout = new Springy.Layout.ForceDirected(graph, 400.0, 400.0, 0.5)
        this.currentBB = this.layout.getBoundingBox()
        this.targetBB = {
            bottomleft: new Springy.Vector(-2, -2),
            topright: new Springy.Vector(2, 2),
        }
        this.canvas = document.querySelector(canvas)        
        this.img = new Image()
        this.img.src = cloud

        this.configure()
    }

    configure() {
        const that = this

        Springy.requestAnimationFrame(function adjust() {
            that.targetBB = that.layout.getBoundingBox()
            // current gets 20% closer to target every iteration
            that.currentBB = {
                bottomleft: that.currentBB.bottomleft.add(
                    that.targetBB.bottomleft
                        .subtract(that.currentBB.bottomleft)
                        .divide(10)
                ),
                topright: that.currentBB.topright.add(
                    that.targetBB.topright
                        .subtract(that.currentBB.topright)
                        .divide(10)
                ),
            }

            Springy.requestAnimationFrame(adjust)
        })
    }

    toScreen(p) {
        const size = this.currentBB.topright.subtract(this.currentBB.bottomleft)
        const sx =
            p.subtract(this.currentBB.bottomleft).divide(size.x).x *
            this.canvas.width
        const sy =
            p.subtract(this.currentBB.bottomleft).divide(size.y).y *
            this.canvas.height

        return new Springy.Vector(sx, sy)
    }

    drawSystem(ctx, s, node) {
        const size = 20
        const textWidth = this.getTextWidth(node, ctx)
        const police = 16

        const pathing = (revert = false) => {
            const padding = revert ? size * -1 : size
            ctx.lineTo(s.x - padding, s.y + padding)
            ctx.lineTo(s.x, s.y + padding + padding / 2)
            ctx.lineTo(s.x + padding, s.y + padding)
        }

        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(s.x - size, s.y - size)
        pathing()
        pathing(true)
        ctx.stroke()
        ctx.fillStyle = 'white'
        ctx.fill()

        ctx.clearRect(
            s.x - textWidth / 2,
            s.y + size + size / 2 + 1,
            textWidth,
            police + 1
        )

        ctx.fillStyle = 'black'
        ctx.font = `${police}px Verdana, sans-serif`
        ctx.fillText(
            node.data.label,
            s.x - textWidth / 2,
            s.y + size + size / 2 + police + 1
        )
    }

    getTextWidth(node, ctx) {
        const text = node.data.label
        if (node._width && node._width[text]) return node._width[text]

        ctx.save()
        ctx.font = '16px Verdana, sans-serif'
        var width = ctx.measureText(text).width
        ctx.restore()

        node._width || (node._width = {})
        node._width[text] = width

        return width
    }

    drawNetwork(ctx, s, node) {
        const textWidth = this.getTextWidth(node, ctx)

        ctx.fillStyle = node.data.color        

        ctx.save()
        if (node.data.label === 'Internet') {
            ctx.clearRect(s.x - 35, s.y - 10, 70, 40)
            ctx.drawImage(this.img, s.x - 35, s.y - 30, 70, 60)
        } else {
            ctx.beginPath()
            ctx.arc(s.x, s.y, 15, 0, 2 * Math.PI)            
            ctx.fill()
        }

        ctx.fillStyle = 'black'
        ctx.font = `16px Verdana, sans-serif`

        ctx.clearRect(s.x - textWidth / 2, s.y + 16, textWidth, 17)
        ctx.fillText(node.data.label, s.x - textWidth / 2, s.y + 32)

        ctx.restore()
    }

    get drawer() {
        const ctx = this.canvas.getContext('2d')

        const clear = () => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        }

        const drawEdge = (edge, p1, p2) => {
            const s1 = this.toScreen(p1)
            const s2 = this.toScreen(p2)

            ctx.save()

            ctx.strokeStyle = edge.data.color
            ctx.beginPath()
            ctx.moveTo(s1.x, s1.y)
            ctx.lineTo(s2.x, s2.y)
            ctx.stroke()

            ctx.restore()
        }

        const drawNode = (node, p) => {
            const s = this.toScreen(p)

            ctx.save()

            if (node.data.isNet) {
                this.drawNetwork(ctx, s, node)
            } else {
                this.drawSystem(ctx, s, node)
            }

            ctx.restore()
        }

        return new Springy.Renderer(this.layout, clear, drawEdge, drawNode)
    }
}

export default Renderer
