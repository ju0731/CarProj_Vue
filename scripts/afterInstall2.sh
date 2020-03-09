#!/bin/bash
config=/home/ec2-user/front/node_modules/@vue/cli-service/webpack.config.js
hostVar="let service = process.VUE_CLI_SERVICE\nif (!service || process.env.VUE_CLI_API_MODE) {\n\tconst Service = require('./lib/Service')\n\tservice = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())\n\tservice.init(process.env.VUE_CLI_MODE || process.env.NODE_ENV)\n}\n\nmodule.exports = service.resolveWebpackConfig()\ndevServer: {\n\tcompress: true,\n\tdisableHostCheck: true,\n}"
printf "$hostVar" >> tmp_webpack
sudo mv tmp_webpack $config
