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
        sh "docker network create -d bridge red"
      	sh "docker run --network=red -d mongo"
        sh "docker run --network=red --env-file dev.env -d ${dockerImage.id}"
      }
    }

    stage ("run test") {
      steps {
        sh "docker exec -it ${dockerImage.id} sh -c \\\"npm test\\\""
      }
    }

		stage ("stop image") {
      steps {
        sh "docker-compose down"
      }
    }

    stage ("delete image") {
      steps {
        sh "docker kill mongo"
        sh "docker image rm --force ${dockerImage.id}"
        sh "docker network rm red"
      }
    }
  }
}