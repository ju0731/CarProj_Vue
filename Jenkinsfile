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
        sh '''cd ..
if [ -f front.tar ]
then
    rm front.tar
fi
tar -cvf front.tar ./booking-ui
mv front.tar ./booking-ui'''
      }
    }

    stage('S3 Upload') {
      steps {
        sh 'aws s3 cp ./front.tar s3://landingproject/front.tar'
      }
    }

  }
}