import Renderer from './_render'
import color from './color'

const graph = new Springy.Graph()

let networks = {},
    systems = {}

const socket = {}
socket.on = (action, clbk) => {
    switch (action) {
        case 'con': {
            clbk({
                networks: ['gateway', 'app_net', 'db_net', 'Internet'],
                systems: {
                    reverse_proxy: ['gateway', 'Internet'],
                    db_gateway: ['app_net', 'db_net'],
                    psql_1: ['db_net'],
                    psql_2: ['db_net'],
                    psql_3: ['db_net'],
                    psql_4: ['db_net'],
                    back_office_1: ['app_net', 'gateway'],
                    back_office_2: ['app_net', 'gateway'],
                    back_office_3: ['app_net', 'gateway'],
                    front_office_1: ['gateway'],
                    front_office_2: ['gateway'],
                    portainer: ['gateway'],
                    netdata: ['gateway'],
                }
            })
        }
    }
}

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

const canvas = document.getElementById('board')
canvas.width = window.innerWidth
canvas.height = window.innerHeight