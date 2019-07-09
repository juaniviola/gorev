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
        steps {
        	sh "docker-compose build"
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
        sh "docker image rm --force gorev_app"
      }
    }
  }
}