#!/bin/bash
# Run the generic build script inside a docker container

cd /src
/src/build_assets/build_generic.sh
mv /tmp/ice-fiona_*_amd64.deb /release/
echo "----------------------------------------------------------"
echo " Done! deb file ready in ./release/"
echo "----------------------------------------------------------"

# ls -a /tmp > /release/result.txt
# echo '---' >> /release/result.txt
# ls /tmp/ice-fiona_$VERSION >> /release/result.txt