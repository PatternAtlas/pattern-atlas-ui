#!/bin/sh
echo "starting config-init script..."

if [ ! -f "/opt/configComplete" ]; then
  for topic in $(jq -r 'keys[]' /opt/init-config.d/*.json); do
    for key in $(jq .$topic /opt/init-config.d/*.json | jq -r 'keys[]'); do
      myVal=$(jq -r [".$topic | .$key"] /opt/init-config.d/*.json | jq -r .[])
      # echo "saving: $topic/$key: $myVal"
      /usr/bin/wait-for-it $CONFIG_SERVER:$CONFIG_SERVER_PORT -s -t 10 -- curl http://$CONFIG_SERVER:$CONFIG_SERVER_PORT/v2/keys/$topic/$key -XPUT -d value="$myVal" > /dev/null 2>&1
      done
  done
  touch /opt/configComplete
  echo "executed config-init script..."
fi
