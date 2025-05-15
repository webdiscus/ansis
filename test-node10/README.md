# Special test for outdated Node.js 10

## Build and start test container

```bash
docker compose up --build
```

If rebuild and run:
```bash
docker compose down -v --remove-orphans
docker compose up --build
```

## Run test in docker

```bash
docker compose run --rm ansis-test-node10
```