# Deployment project on Docker

Short instruction how to deploy our full-stack project using Docker

## Getting started

### Prerequisities

In order to run container you should have docker being installed

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

* First of all, you should clone project

```shell
git clone https://nazar_eng@bitbucket.org/nazar_eng/task-project.git
```

* Set your MySQL data in `docker-compose.yml` file
* In order to build react app for production, enter the next commands:
```shell
docker-compose exec frontend sh
npm run build
```
* After that, open a terminal in directory where docker-compose.yml is located, and start a new container:

```shell
docker-compose up
```
It will start building a container by mean of DockerFiles which are in `./frontend` and `./backend` directories

When all pulls complete, the docker will run a container and you can view a website on `localhost:3000`