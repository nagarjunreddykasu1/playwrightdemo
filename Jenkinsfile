
pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS 22.x.x', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
    }

    triggers {
        pollSCM('H/15 * * * *') // Polls every 5 minutes
        cron('42 21 * * *') // Daily at 8AM
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/nagarjunreddykasu1/playwrightdemo.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests with Allure') {
            steps {
                sh 'npx playwright test --reporter=line,allure-playwright'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate ./allure-results --clean -o ./allure-report'
            }
        }

        stage('Publish Allure Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Allure Test Report'
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline execution complete."
        }
        failure {
            echo "Build failed. Please check logs and reports."
        }
    }
}
