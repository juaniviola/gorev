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
				sh "docker run ${dockerImage.id} node test"
			}
		}

		stage ("delete image") {
			steps {
				sh "docker image rm --force ${dockerImage.id}"
			}
		}
	}
}