pipeline {
  agent any
  stages {
    stage('Git clone') {
      steps {
        git(url: 'https://github.com/bsp-incubation/booking-ui.git', branch: 'master', credentialsId: 'woodchuckchoi')
      }
    }

    stage('Compress') {
      steps {
        sh '''if [ -f front.tar ]
then
    rm front.tar
fi
tar -cvf front.tar ./*'''
      }
    }

    stage('S3 Upload') {
      steps {
        sh 'aws s3 cp ./front.tar s3://landingproject/front.tar'
      }
    }

    stage('Create Deployment') {
      steps {
        sh '''aws deploy create-deployment \\
    --application-name CRBS-codedeploy-app \\
    --deployment-config-name CodeDeployDefault.AllAtOnce \\
    --deployment-group-name $DG_NAME \\
    --s3-location bundleType="tar",bucket="landingproject",key=front.tar \\
    --file-exists-behavior "OVERWRITE"
'''
      }
    }

  }
  environment {
    DG_NAME = 'CRBS-UI-deployment-group'
  }
}