# sample-app

### Guide for accessing

1.  [Link for Colombia Time](http://48.216.243.48/colombo) (http://48.216.243.48/colombo)
1.  [Link for Gandalf](http://48.216.243.48/gandalf) (http://48.216.243.48/gandalf)
1.  [Link for Prometheus Server](http://20.157.6.12:9090) (http://20.157.6.12:9090)

**NB:** VM's for this app are spot instances. Hence, they may get deallocated at any point. If it does, and someone needs to access the pages, send me an email at adrianfcmerino@gmail.com so that I can run them again, right away.

**Summary**: Web App is based on the React/FastAPI framework. React was chosen to show the required pages, FastAPI to host the static web app, and create another path for the `metrics` page for Prometheus. The app is packaged into a docker image for deployment. Minikube was used to setup a local K8s cluster. The web app cluster and the Prometheus server are deployed in Azure VM's (separately).

### Deployment Instructions

1. **Requirements for deploying**

   1. Cloud provider user account (Azure in this case)
   2. Docker hub account

1. **For deploying the web app**
   1. Create an Azure VM with at least 2 vcpu's (e.g., `Standard D2s v3`, Minikube requires at least 2). Download `.pem` key as necessary.
      1. Ensure that there is a network security rule to allow port 80 and 22 access
   1. Access VM via SSH and install the ff:
      - Docker Engine [(Link)](https://docs.docker.com/engine/install/ubuntu/)
      - Minikube [(Link)](https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download)
      - kubectl [(Link)](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
   1. Start a K8s cluster
      - `sudo minikube start`
   1. Create a `deployment.yml` file. You can copy the contents of `deployment.yml`
   1. Deploy the necessary resources, wait for them to finish deployment
      - `sudo kubectl apply -f deployment.yml`
   1. Expose the nodeport resource
      - `sudo kubectl port-forward svc/random-fastapi-np 3000:80 --address 0.0.0.0`
   1. In the VM network security rules, remove access to port 22.
1. **For deploying promethues server**

   1. Create an Azure VM (Download `.pem` key as necessary)
      1. Ensure that there is a network security rule to allow port 80 and 22 access
   1. Access VM
   1. Execute to download package (you'll probably be able to use a different version not too far off from what's indicated below):
      - `curl -L -o prometheus.tar.gz "https://github.com/prometheus/prometheus/releases/download/v3.5.0/prometheus-3.5.0.linux-amd64.tar.gz"`
   1. Extract contents:
      - `tar -xzf prometheus.tar.gz`
   1. Go to dir of the extracted package
   1. Configure `prometheus.yml` file. Copy contents of `prometheus/prometheus.yml`
   1. Execute `./prometheus --configure.file=prometheus.yml`
   1. Check VM network settings, add rule to allow access to `9090` port.
   1. Prometheus Web UI can be access via http with VM's public IP
      - `http://20.157.6.12:9090`

1. **For developing the web app**

   1. Create a Vite React project, using typescript
      - `npm create vite@latest myapp -- --template react-ts`
   1. Go to app root directory (i.e., `cd random-app`)
   1. Install dependencies with `npm install`
   1. Configure files as necessary. If you want to test, you can do `npm run dev`
   1. Run `npm run build` to generate distribution files
   1. Copy generated contents of `random-app/dist/` folder to `fastapi-app/static/`
   1. Develop an API server to host the static website and create metrics for prometheus (FastAPI in this case)

1. **For creating the docker image**
   1. Create an account in Docker Hub
   1. Create a repository that will contain the docker image of the web app
   1. Ensure that the react/fastapi apps are updated
   1. Install Docker in your local machine
   1. Create a Docker image, locally, using the `Dockerfile` on the root folder
      - `docker build -t merinoadrian/random-fastapi:latest .`
      - You can use this opportunity to check if the app is working as intended.
      - After building images, you can check with `docker images` if the image has been built correctly.
   1. Login to your docker hub accout with the CLI. Enter credientials as necessary
      - `docker login`
   1. Push the built image
      - `docker push merinoadrian/random-fastapi:latest`
   1. Verify in your account if image has been pushed correctly
