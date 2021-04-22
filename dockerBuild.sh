#!/usr/bin/env bash

rm -rf ./www
npm run build-server
docker build -t registry.cn-shenzhen.aliyuncs.com/xmzt_docker/iot-mana-ui:1.0.0 .
docker push registry.cn-shenzhen.aliyuncs.com/xmzt_docker/iot-mana-ui:1.0.0
