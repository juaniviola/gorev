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
        sh "docker-compose run app mongo"
      }
    }

    stage ("run test") {
      steps {
        sh "npm test"
      }
    }

		stage ("stop image") {
      steps {
        sh "docker-compose down"
      }
    }

    stage ("delete image") {
      steps {
        sh "docker image rm --force ${dockerImage.id}"
      }
    }
  }
}