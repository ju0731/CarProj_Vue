#!/bin/bash
sudo mv /home/ec2-user/front/url.json /home/ec2-user/front/src/asset/url.json
sudo mv /home/ec2-user/front/scripts/devops_front.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start devops_front.service
sudo systemctl enable devops_front.service
