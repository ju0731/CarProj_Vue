#!/bin/bash
URL=$(jq '.url' /home/ec2-user/front/src/assets/url.json -r)
MYIP=$(dig +short myip.opendns.com @resolver1.opendns.com)
jq -n --arg URL $URL --arg MYIP $MYIP '{url: $URL, myip: $MYIP}' > /home/ec2-user/front/src/assets/url.json
