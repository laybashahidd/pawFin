pipeline {
    agent any
    
    environment {
        APP_URL = 'http://13.60.49.1:4000'
    }
    
    stages {
        stage('Clone Test Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/laybashahidd/pawfin-tests.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t pawfin-selenium-tests .'
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                sh '''
                    docker run --rm \
                        -e APP_URL=${APP_URL} \
                        -v $(pwd):/results \
                        pawfin-selenium-tests \
                        sh -c "python -m pytest test_pawfinds.py -v --tb=short --junitxml=/results/test-results.xml || true"
                '''
            }
        }
    }
    
    post {
        always {
            script {
                try {
                    env.GIT_COMMIT_SHORT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.GIT_AUTHOR_NAME = sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()
                    env.GIT_AUTHOR_EMAIL = sh(script: 'git log -1 --pretty=%ae', returnStdout: true).trim()
                } catch (Exception e) {
                    env.GIT_AUTHOR_EMAIL = 'laybaashahidd@gmail.com'
                }
            }
            
            junit allowEmptyResults: true, testResults: 'test-results.xml'
            
            sh 'docker rmi pawfin-selenium-tests || true'
            
            emailext (
                subject: "Jenkins Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <html>
                    <body style="font-family: Arial, sans-serif;">
                        <h2 style="color: ${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'}">
                            Build ${currentBuild.currentResult}
                        </h2>
                        
                        <h3>Build Information</h3>
                        <table border="1" cellpadding="10" style="border-collapse: collapse;">
                            <tr><td><b>Project</b></td><td>${env.JOB_NAME}</td></tr>
                            <tr><td><b>Build Number</b></td><td>#${env.BUILD_NUMBER}</td></tr>
                            <tr><td><b>Status</b></td><td>${currentBuild.currentResult}</td></tr>
                            <tr><td><b>Deployment URL</b></td><td><a href="${APP_URL}">${APP_URL}</a></td></tr>
                        </table>
                        
                        <h3>Commit Details</h3>
                        <table border="1" cellpadding="10" style="border-collapse: collapse;">
                            <tr><td><b>Commit ID</b></td><td>${env.GIT_COMMIT_SHORT}</td></tr>
                            <tr><td><b>Author</b></td><td>${env.GIT_AUTHOR_NAME}</td></tr>
                            <tr><td><b>Email</b></td><td>${env.GIT_AUTHOR_EMAIL}</td></tr>
                            <tr><td><b>Message</b></td><td>${env.GIT_COMMIT_MSG}</td></tr>
                        </table>
                        
                        <h3>Test Results</h3>
                        <p>Total Tests: 10 Selenium Tests | Status: ${currentBuild.currentResult}</p>
                        
                        <h3>Quick Links</h3>
                        <p>
                            <a href="${env.BUILD_URL}">View Build</a> | 
                            <a href="${env.BUILD_URL}console">Console Output</a> |
                            <a href="${APP_URL}">Live Deployment</a>
                        </p>
                        
                        <p style="color: #666; font-size: 12px;">
                            <i>Automated email from Jenkins CI/CD Pipeline - PawFinds</i>
                        </p>
                    </body>
                    </html>
                """,
                to: "${env.GIT_AUTHOR_EMAIL}",
                mimeType: 'text/html'
            )
            
            echo "Email sent to: ${env.GIT_AUTHOR_EMAIL}"
        }
        
        success {
            echo "Build succeeded! App running at ${APP_URL}"
        }
        
        failure {
            echo 'Build failed! Check logs for details.'
        }
    }
}
