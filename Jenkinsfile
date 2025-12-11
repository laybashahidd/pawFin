pipeline {
    agent any
    
    environment {
        BASE_URL = 'http://localhost:3000'
        BACKEND_URL = 'http://localhost:4000'
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/laybashahidd/pawFin.git'
            }
        }
        
        stage('Build Test Image') {
            steps {
                echo 'Building Docker image for tests...'
                dir('tests') {
                    sh '''
                        docker build -t pawfinds-selenium-tests .
                    '''
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                echo 'Running Selenium tests in Docker container...'
                dir('tests') {
                    sh '''
                        docker run --rm \
                            --network host \
                            -e BASE_URL=${BASE_URL} \
                            -e BACKEND_URL=${BACKEND_URL} \
                            -e CI=true \
                            pawfinds-selenium-tests
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up Docker images...'
            sh 'docker system prune -f || true'
        }
        success {
            emailext (
                subject: "✅ SUCCESS: PawFinds Tests Passed - Build #${BUILD_NUMBER}",
                body: """
                    <h2>✅ All Tests Passed Successfully!</h2>
                    <p><strong>Project:</strong> PawFinds</p>
                    <p><strong>Build Number:</strong> ${BUILD_NUMBER}</p>
                    <p><strong>Build URL:</strong> <a href="${BUILD_URL}">${BUILD_URL}</a></p>
                    <p><strong>Triggered by:</strong> ${env.GIT_COMMITTER_NAME ?: 'GitHub Push'}</p>
                    <br>
                    <p>All Selenium tests have passed. Great job!</p>
                """,
                mimeType: 'text/html',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: '${GIT_COMMITTER_EMAIL}'
            )
        }
        failure {
            emailext (
                subject: "❌ FAILED: PawFinds Tests Failed - Build #${BUILD_NUMBER}",
                body: """
                    <h2>❌ Test Execution Failed</h2>
                    <p><strong>Project:</strong> PawFinds</p>
                    <p><strong>Build Number:</strong> ${BUILD_NUMBER}</p>
                    <p><strong>Build URL:</strong> <a href="${BUILD_URL}">${BUILD_URL}</a></p>
                    <p><strong>Triggered by:</strong> ${env.GIT_COMMITTER_NAME ?: 'GitHub Push'}</p>
                    <br>
                    <p>Please check the build logs for details.</p>
                """,
                mimeType: 'text/html',
                recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
                to: '${GIT_COMMITTER_EMAIL}'
            )
        }
    }
}