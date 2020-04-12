const Docker = require('dockerode')
const DockerEvent = require('docker-event-emitter')
const EventEmitter = require('events')

module.exports = class {
    constructor() {
        this.docker = new Docker({ socketPath: '/var/run/docker.sock' })
        this.dockerEvent = new DockerEvent(this.docker)
        this.dockerEvent.start()
        this.emiter = new EventEmitter()

        this.listen()
    }

    get event() {
        return this.emiter
    }

    /**
     * Listen event from docker
     */
    listen() {
        this.dockerEvent.on('network.connect', (ev) => {
            this.getInfoForNetwork(ev)
                .then((x) => this.emiter.emit('netUp', x))
                .catch((ex) => console.log(ex))
        })

        this.dockerEvent.on('network.disconnect', (ev) => {
            this.getInfoForNetwork(ev)
                .then((x) => this.emiter.emit('netDown', x))
                .catch((ex) => console.log(ex))
        })

        this.dockerEvent.on('container.start', (ev) => {
            this.getRSX(ev)
                .then((x) => {
                    if (x) this.emiter.emit('netUp', x)
                })
                .catch((ex) => console.log(ex))
        })

        this.dockerEvent.on('container.stop', (ev) => {
            this.getRSX(ev)
                .then((x) => {
                    if (x) this.emiter.emit('netDown', x)
                })
                .catch((ex) => console.log(ex))
        })


        this.dockerEvent.on('container.die', (ev) => {
            this.getRSX(ev)
                .then((x) => {
                    if (x) this.emiter.emit('netDown', x)
                })
                .catch((ex) => console.log(ex))
        })
    }

    /**
     * Helper for network event
     * @param {DockerEvent} ev 
     */
    getInfoForNetwork(ev) {
        return new Promise((res, rej) => {
            this.docker
                .getContainer(ev.Actor.Attributes.container)
                .inspect()
                .then((data) => {
                    res({ net: ev.Actor.Attributes.name, sys: data.Name })
                })
                .catch((ex) => rej(ex))
        })
    }

    /**
     * Helper for lifeCycle container
     * @param {DockerEvent} ev      
     */
    getRSX(ev) {
        return new Promise((res, rej) => {
            this.docker
                .getContainer(ev.id)
                .inspect()
                .then((data) => {                    
                    if (Object.keys(data.HostConfig.PortBindings).length > 0) {
                        res({ sys: data.Name, net: 'Internet' })
                    } else {
                        res(false)
                    }
                })
                .catch((ex) => rej(ex))
        })
    }

    /**
     * @returns {Promise} list of Container
     */
    getContainers() {
        return new Promise((res, rej) => {
            this.docker
                .listContainers()
                .then((list) => {
                    Promise.all(list.map((x) => this.docker.getContainer(x.Id)))
                        .then((c) => res(c))
                        .catch((ex) => rej(ex))
                })
                .catch((ex) => rej(ex))
        })
    }

    /**
     * @param {Array} containers
     * @returns {Promise} list of information of all container
     */
    getInfo(containers) {
        return new Promise((res, rej) => {
            Promise.all(containers.map((x) => x.inspect()))
                .then((info) => res(info))
                .catch((ex) => rej(ex))
        })
    }

    /**
     * @returns {Promise} networks and systems
     */
    get() {
        return new Promise(async (res, rej) => {
            const systems = {}
            const networks = []

            try {
                const list = await this.getContainers()
                const infos = await this.getInfo(list)

                for (let info of infos) {
                    const net = info.NetworkSettings.Networks

                    if (Object.keys(info.HostConfig.PortBindings).length > 0) {
                        info.NetworkSettings.Networks['Internet'] = true
                    }

                    systems[info.Name] = new Array()
                    for (let k of Object.keys(net)) {
                        if (networks.includes(k) === false) networks.push(k)
                        systems[info.Name].push(k)
                    }
                }
                res({ networks, systems })
            } catch (ex) {
                rej(ex)
            }
        })
    }
}
