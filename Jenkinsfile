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
mkdir ../booking-ui
mv ./* ../booking-ui
mv ../booking-ui ./
tar -cvf front.tar ./booking-ui'''
      }
    }

    stage('S3 Upload') {
      steps {
        sh 'aws s3 cp ./front.tar s3://landingproject/front.tar'
      }
    }

    stage('Create DG') {
      steps {
        sh '''aws deploy delete-deployment-group \\
    --application-name Devops_front \\
    --deployment-group-name $DG_NAME
aws deploy create-deployment-group \\
    --application-name Devops_front \\
    --deployment-group-name $DG_NAME \\
    --service-role-arn arn:aws:iam::144149479695:role/landingproject_codeDeploy_codeDeploy \\
    --auto-scaling-groups $ASG \\
    --deployment-style deploymentType="BLUE_GREEN",deploymentOption="WITH_TRAFFIC_CONTROL" \\
    --blue-green-deployment-configuration terminateBlueInstancesOnDeploymentSuccess={action="TERMINATE"},deploymentReadyOption={actionOnTimeout=CONTINUE_DEPLOYMENT},greenFleetProvisioningOption={action=COPY_AUTO_SCALING_GROUP} \\
    --load-balancer-info targetGroupInfoList={name=$TARGET_GROUP} \\
    --deployment-config-name CodeDeployDefault.AllAtOnce'''
      }
    }

    stage('Create Deployment') {
      steps {
        sh '''aws deploy create-deployment \\
    --application-name Devops_front \\
    --deployment-config-name CodeDeployDefault.AllAtOnce \\
    --deployment-group-name $DG_NAME \\
    --s3-location bundleType="tar",bucket="landingproject",key=front.tar \\
    --file-exists-behavior "OVERWRITE"
'''
      }
    }

  }
  environment {
    DG_NAME = 'something'
    ASG = 'something'
    TARGET_GROUP = 'something'
  }
}