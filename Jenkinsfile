pipeline {
  agent any
  
  environment {
    NODE_ENV = "production"
  }
  
  triggers {
    pollSCM '* * * * *'
  }     
  
  tools {nodejs "NodeJS"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/DanielCok17/Diploma-thesis'
      }
    }
     
    stage('Backend build') {
      steps {
        sh '''
            pwd
            cd backend
            pwd
            npm install
        '''
        echo "Node_modules instlled successfully in backend!"
      }
    }  
            
    stage('Frontend build') {
      steps {
         sh '''
            cd frontend
            npm install -g pnpm
            rm -fr node_moduls
            rm -rf package-lock.json
            pnpm install
        '''
        echo "Node_modules instlled successfully in frontend!"
      }
    }
    
    // TODO fix this
    // stage('Frontend Test') {
    //   steps {
    //      sh '''
    //         cd frontend
    //         cat package.json
    //         pnpm run build
    //     '''
    //     echo "Fronted build successfully done!"
    //   }
    // }
  }
  
  post {
    success {
        echo "Processing succeeded"
    }
    failure {
        echo "Processing failed"
    }
    always {
        echo "We are done..."
    }
  }
}