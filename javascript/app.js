import Renderer from './_render'
import color from './color'

const socket = io.connect('http://localhost:5678')
const graph = new Springy.Graph()

let networks = {},
    systems = {}

//construction au demarage
socket.on('con', (data) => {
    data.networks.forEach((x, i) => (networks[x] = color[i]))
    systems = data.systems

    const edges = []
    for (let k in systems) {
        systems[k].forEach((net) => {
            edges.push([k, net, { color: networks[net] }])
        })
    }

    graph.addNodes(...Object.keys(systems))
    for (let k in networks) {
        graph.addNode(
            new Springy.Node(k, {
                label: k,
                isNet: true,
                color: networks[k],
            })
        )
    }
    graph.addEdges(...edges)

    const renderer = new Renderer(graph, '#board')
    renderer.drawer.start()
})

//connection d'un container a un reseau
socket.on('netUp', (data) => {    
    //si le reseau est nouveau on le cree
    if (networks[data.net] === undefined) {
        networks[data.net] = color[Object.keys(networks).length]
        graph.addNode(
            new Springy.Node(data.net, {
                label: data.net,
                isNet: true,
                color: networks[data.net],
            })
        )
    }

    //si le container et nouveau on le cree
    if (systems[data.sys] === undefined) {
        systems[data.sys] = []
        graph.addNodes(data.sys)
    }
    systems[data.sys].push(data.net)

    graph.addEdges([data.sys, data.net, { color: networks[data.net] }])
})

//deconnection d'un container a un reseau
socket.on('netDown', (data) => {
    if (!systems[data.sys]) return

    graph.filterEdges((e) => {
        return !(
            (e.source.id === data.net && e.target.id === data.sys) ||
            (e.source.id === data.sys && e.target.id === data.net)
        )
    })
    systems[data.sys] = systems[data.sys].filter((x) => x !== data.net)

    //si le container n'est plus connecté a au moins reseau on le supprime
    if (systems[data.sys].length === 0) {
        graph.filterNodes((e) => e.id !== data.sys)
        delete systems[data.sys]
    }

    //si le reseau n'a plus de container on le supprime
    let trv = false
    let i = 0
    while (i < Object.keys(systems).length && !trv) {
        trv = systems[Object.keys(systems)[i]].includes(data.net)
        i++
    }
    if (!trv) {
        graph.filterNodes((e) => e.id !== data.net)
        delete networks[data.net]
    }
})

const canvas = document.getElementById('board')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
