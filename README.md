# turtle
AltaML coding exercise

## Getting Started

Running either the docker based build or the local build will make the application available at http://localhost:8080

### Docker (Recommended)
```shell
$> docker build -t kevinloney https://github.com/easyas314159/turtle.git
$> docker run -p 8080:8080 kevinloney
```

### Locally
```shell
$> git clone https://github.com/easyas314159/turtle.git
$> npm install
$> npm build-prod
$> http-server build
```
