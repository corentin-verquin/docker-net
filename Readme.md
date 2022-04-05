### Usage

```bash
# build
npm i
npm run build
docker build --tag docker-net .

# run
docker run  -p '5678:5678' -v "/var/run/docker.sock:/var/run/docker.sock:ro" -l 'dockerNetIgnore' docker-net
```

> To ignore container in UI add `dockerNetIgnore` label on it
