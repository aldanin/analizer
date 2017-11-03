#!/bin/bash
# For the build to work, on Ubuntu make sure these packages are installed:
# build-essential, debhelper

# ----------------------------
# Parameters
# ----------------------------
# Which branch to build
BRANCH=master
# Path for the files on productin machine
DEST_PATH=/opt/fiona
# Version of this package
VERSION=1.0.16

# ----------------------------
# STEP 0: prepare package dir
# ----------------------------
echo "----------------------------------------------------------"
echo " Prepare package dir /tmp/ice-fiona_$VERSION"
echo "----------------------------------------------------------"
rm -rf /tmp/ice-fiona_$VERSION
cp -r build_assets/deb_files/ /tmp/ice-fiona_$VERSION

# ----------------------------
# STEP 1: build the client app
# ----------------------------
echo "----------------------------------------------------------"
echo " Build client"
echo "----------------------------------------------------------"
cd dashboard-client
npm install
npm run build
cd ..

# ----------------------------
# STEP 2: build the server app
# ----------------------------
echo "----------------------------------------------------------"
echo " Build server"
echo "----------------------------------------------------------"
cd webservices
npm install
npm run build
cd ..

# ----------------------------
# STEP 3: prepare debian dir
# ----------------------------
echo "----------------------------------------------------------"
echo " Copy to package dir"
echo "----------------------------------------------------------"
# Copy server 
cp -r webservices/dist/ /tmp/ice-fiona_$VERSION/content/$DEST_PATH
# Copy server node_modules
cp -r webservices/node_modules /tmp/ice-fiona_$VERSION/content/$DEST_PATH
# Copy server config dir
cp -r webservices/config /tmp/ice-fiona_$VERSION/content/$DEST_PATH
# Copy server package.json
cp -r webservices/package.json.build /tmp/ice-fiona_$VERSION/content/$DEST_PATH/package.json

# Copy Client
rm -rf /tmp/ice-fiona_$VERSION/content/$DEST_PATH/public/*
mkdir -p /tmp/ice-fiona_$VERSION/content/$DEST_PATH/public
cp -r dashboard-client/build/ /tmp/ice-fiona_$VERSION/content/$DEST_PATH/public

# ----------------------------
# STEP 4: package a deb file
# ----------------------------
echo "----------------------------------------------------------"
echo " Build package"
echo "----------------------------------------------------------"
# set version
sed -i.bak "s/__VERSION__/$VERSION/g" /tmp/ice-fiona_$VERSION/debian/changelog
# run debuild if available
if hash debuild 2>/dev/null; then
    cd /tmp/ice-fiona_$VERSION
    debuild -b -uc -us
    # mv /tmp/ice-fiona_${VERSION}_amd64.deb /release/
    # echo "Ready deb file in release/ice-fiona_${VERSION}_amd64.deb"
else
    echo "debuild is required to build a deb package, but was not found"
    echo "This is a ready-to-package directory: /tmp/ice-fiona_$VERSION/"
fi
