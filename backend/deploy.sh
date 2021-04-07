#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t junhup/mini-reddit:$VERSION .
docker push junhup/mini-reddit:$VERSION
ssh root@165.232.167.134 "docker pull junhup/mini-reddit:$VERSION && docker tag junhup/mini-reddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
