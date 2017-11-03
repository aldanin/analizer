# TRAINOLOGIC | ACE #

## How to build a deb package
We use a docker container for the build environment, so in order for the build to work Docker must be installed on the system.  
For the first time, a docker image must be built using this command:  
`docker build -t fiona_builder [PATH_TO_DOCKERFILE]`  

The build itself runs the build shell script `build.sh` inside the docker container. Once the build is finished the debian package file will be available in `release` directory under the project root.  

The build command is as follows:  
`docker run -v $(pwd):/src -v $(pwd)/release:/release --name fiona_build_$(date "+%s") fiona_builder`

### What is this repository for? ###

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

### Who do I talk to? ###