pipeline {
  agent any
  
  environment {
    NODE_ENV = "production"
  }
  
//  triggers {
//    pollSCM '* * * * *'
//  }     
  
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
            pnpm install
        '''
        echo "Node_modules instlled successfully in frontend!"
      }
    }
    
    stage('Frontend Test') {
      steps {
         sh '''
            cd frontend
            pnpm run build
        '''
        echo "Fronted build successfully done!"
      }
    }
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