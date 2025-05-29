# Deployment Guide

This guide provides instructions for deploying the Xped8 Angular application in different environments.

## Prerequisites

- Node.js (v18.12.1)
- npm (v8.19.2)
- Angular CLI (v14.x)
- Docker (optional, for containerized deployment)

## Local Development Deployment

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run development server:
```bash
ng serve
```
The application will be available at `http://localhost:4200`

## Production Build

1. Create production build:
```bash
ng build --prod
```
Build artifacts will be stored in the `dist/xped8` directory.

## Docker Deployment

1. Build Docker image:
```bash
docker build -t xped8 .
```

2. Run Docker container:
```bash
docker run -p 8080:8080 xped8
```
The application will be available at `http://localhost:8080`

## Environment Configuration

The application uses environment files located in `src/environments/`:
- `environment.ts` - Development environment
- `environment.prod.ts` - Production environment

Update these files with appropriate API endpoints and configuration values.

## Nginx Configuration

The application includes an nginx configuration file (`nginx.conf`) for production deployment:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    
    server {
        listen 8080;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
            expires 1y;
            add_header Cache-Control "public, no-transform";
        }
    }
}
```

## CI/CD Pipeline

The repository includes configuration for automated deployment:

1. GitHub Actions workflow for automated testing and building
2. Docker container build and push to registry
3. Deployment to cloud platforms

## Cloud Platform Deployment

### AWS Deployment
1. Build the production version
2. Upload the contents of `dist/xped8` to an S3 bucket
3. Configure CloudFront distribution for CDN
4. Set up Route53 for custom domain (if required)

### Azure Deployment
1. Create an Azure Web App
2. Configure deployment settings
3. Deploy using Azure CLI or GitHub Actions

### Google Cloud Platform
1. Create a Google Cloud project
2. Enable required APIs:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   ```

3. Create a Cloud Storage bucket for build logs:
   ```bash
   gsutil mb gs://YOUR_PROJECT_ID-cloudbuild-logs
   ```

4. Create a cloudbuild.yaml file in your project root:
   ```yaml
   steps:
     # Build the container image
     - name: 'gcr.io/cloud-builders/docker'
       args: ['build', '-t', 'gcr.io/$PROJECT_ID/xped8', '.']
     
     # Push the container image to Container Registry
     - name: 'gcr.io/cloud-builders/docker'
       args: ['push', 'gcr.io/$PROJECT_ID/xped8']
     
     # Deploy container image to Cloud Run
     - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
       entrypoint: gcloud
       args:
         - 'run'
         - 'deploy'
         - 'xped8'
         - '--image'
         - 'gcr.io/$PROJECT_ID/xped8'
         - '--region'
         - 'us-central1'
         - '--platform'
         - 'managed'
         - '--allow-unauthenticated'

   options:
     logging: CLOUD_LOGGING_ONLY
   ```

5. Deploy to Cloud Run:
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

6. Configure service account permissions:
   ```bash
   # Get your project number
   PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
   
   # Grant the Cloud Run Admin role
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
     --role=roles/run.admin

   # Grant the IAM Service Account User role
   gcloud projects add-iam-policy-binding $PROJECT_ID \
     --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
     --role=roles/iam.serviceAccountUser
   ```

7. Environment Variables (optional):
   ```bash
   gcloud run services update xped8 \
     --update-env-vars KEY1=VALUE1,KEY2=VALUE2
   ```

8. Monitoring and Logs:
   - View logs in Cloud Console under Cloud Run > Services > xped8 > Logs
   - Set up Cloud Monitoring for metrics and alerts

Common Cloud Run Issues:
- If build fails with service account errors, verify steps 3 and 6
- For memory issues, adjust resources in deployment command
- For timeout issues, configure appropriate timeouts in nginx.conf

## SSL Configuration

For production deployment, ensure SSL certificates are properly configured:
1. Obtain SSL certificate (e.g., Let's Encrypt)
2. Configure SSL in nginx or cloud platform
3. Force HTTPS redirection

## Monitoring and Logging

1. Set up application monitoring:
   - Configure error tracking
   - Set up performance monitoring
   - Enable logging

2. Configure health checks:
   - API endpoint health
   - Server status
   - Database connectivity

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install --legacy-peer-deps`

2. **Runtime Errors**
   - Check browser console for errors
   - Verify API endpoints and environment configuration
   - Check server logs

3. **Docker Issues**
   - Verify Docker daemon is running
   - Check container logs: `docker logs [container_id]`
   - Ensure ports are properly mapped

## Support

For deployment issues or questions:
1. Check the [GitHub Issues](https://github.com/aghosby/xped8/issues)
2. Review Angular deployment documentation
3. Contact the development team

## Security Considerations

1. Enable security headers in nginx/server configuration
2. Implement rate limiting
3. Configure CORS properly
4. Keep dependencies updated
5. Follow security best practices for the deployment platform 