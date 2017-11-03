# Adapted from: https://xan-manning.co.uk/making-deb-packages-using-docker/
#
# Step 1: build image 
# docker build -t fiona_builder .
#
# Step 2: build
# docker run \
#    -v $(pwd):/src \
#    -v $(pwd)/release:/release \
#    --name fiona_build_$(date "+%s") \
#    fiona_builder

FROM ubuntu:14.04

# Volumes
VOLUME /src
VOLUME /release

# Install build dependencies
RUN apt-get update && apt-get -y install \ 
    curl\
    build-essential \
    devscripts \
    fakeroot \
    debhelper \
    automake \
    autotools-dev \
    pkg-config \
    git \
    ca-certificates \
    --no-install-recommends
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash
RUN apt-get install -y nodejs


# TODO: get the code
WORKDIR /src
# maybe: 
# copy dashboard-client
# copy webservices
# copy deb_files

# Import resources
#COPY ./resources /src/resources
#COPY ./build.sh /entrypoint.sh

# Make Executable
# RUN chmod +x /src/build_assets/build.sh

ENTRYPOINT ["/src/build_assets/build_docker.sh"]