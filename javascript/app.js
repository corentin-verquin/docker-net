import Renderer from './_render'
import color from './color'

const socket = io.connect('http://localhost:5678')

socket.on('con', (data) => {
    const netColor = {}
    const graph = new Springy.Graph()

    graph.addNodes(...Object.keys(data.networks))
    graph.addNodes(...Object.keys(data.systems))

    for (let i = 0; i < Object.keys(data.networks).length; i++) {
        const k = Object.keys(data.networks)[i] 
        
        netColor[k] = color[i]
        data.networks[k].color = color[i]
    }

    const edges = []
    for (let k in data.systems) {
        data.systems[k].forEach((system) => {
            edges.push([
                k,
                system.net,
                { color: netColor[system.net], label: system.ip },
            ])
        })
    }
    graph.addEdges(...edges)

    const renderer = new Renderer(graph,data.networks, '#board')

    renderer.drawer.start()
})

const canvas = document.getElementById('board')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
