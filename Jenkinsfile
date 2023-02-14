pipeline {
  agent any
  
  triggers {
    pollSCM '* * * * *'
  }     
  
  tools {nodejs "NodeJS"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/DanielCok17/Diploma-thesis'
        echo "Repository cloned successfully!"
      }
    }
     
    stage('Backend build') {
      steps {
        sh '''
            cd backend
            npm install
        '''
        echo "NodeModules instlled successfully in backend!"
      }
    }  
    
            
    stage('Frontend build') {
      steps {
         sh '''
            cd frontend
            npm install
        '''
        echo "NodeModules instlled successfully in frontend!"
      }
    }
    
    stage('Frontend Test') {
      steps {
         sh '''
            cd frontend
            npm run build
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