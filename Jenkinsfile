pipeline {
  agent any
  tools {
    nodejs 'node-10.16.0'
  }

  options {
    timeout(time: 4, unit: 'MINUTES')
  }

  stages {
    stage ("build") {
      steps {
        script {
          dockerImage = docker.build "juaniviola/gorev:latest"
        }
      }
    }

    stage ("run image") {
      steps {
        sh "docker run ${dockerImage.id} --env-file /usr/src/app/.env"
      }
    }

    stage ("run test") {
      steps {
        sh "npm test"
      }
    }

    stage ("delete image") {
      steps {
        sh "docker image rm --force ${dockerImage.id}"
      }
    }
  }
}