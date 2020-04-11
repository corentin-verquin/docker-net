const Docker = require('dockerode')

const Network = class {
    constructor(ip, mask) {
        this.ip = ip
        this.mask = mask
    }
}

const NetInterface = class {
    constructor(net, ip) {
        this.net = net
        this.ip = ip
    }
}

module.exports = class {
    constructor() {
        this.docker = new Docker({ socketPath: '/var/run/docker.sock' })
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
            const networks = {}

            try {
                const list = await this.getContainers()
                const infos = await this.getInfo(list)

                for (let info of infos) {
                    const net = info.NetworkSettings.Networks

                    systems[info.Name] = new Array()
                    for (let k of Object.keys(net)) {
                        networks[k] = new Network(
                            net[k].Gateway,
                            net[k].IPPrefixLen
                        )
                        systems[info.Name].push(
                            new NetInterface(k, net[k].IPAddress)
                        )
                    }
                }

                res({ networks, systems })
            } catch (ex) {
                rej(ex)
            }
        })
    }
}
