# sample-app

### Guide for accessing

1.  Web App: `http://48.216.243.48`
    - Colombo path: `http://48.216.243.48/colombo`
    - Gandalf path: `http://48.216.243.48/gandalf`
1.  Prometheus Server: `http://20.157.6.12:9090`

### Requirements for deploying

1.  Cloud provider user account (Azure in this case)
2.  Docker hub account

### Instructions

1.  For deploying the web app
    1. Create an Azure VM with at least 2 vcpu's (e.g., `Standard D2s v3`, Minikube requires at least 2). Download `.pem` key as necessary.
       1. Ensure that there is a network security rule to allow port 80 and 22 access
    1. Access VM via SSH and install the ff:
       - Docker Engine
       - Minikube
       - kubectl
    1. Start a kubernetes cluster
       - `sudo minikube start`
    1. Create a `deployment.yml` file. You can copy the contents of `deployment.yml`
    1. Deploy the necessary resources, wait for them to finish deployment
       - `sudo kubectl apply -f deployment.yml`
    1. Expose the nodeport resource
       - `kubectl port-forward svc/random-fastapi-np 3000:80 --address 0.0.0.0`
2.  For deploying promethues server
    1. Create an Azure VM (Download `.pem` key as necessary)
       1. Ensure that there is a network security rule to allow port 80 and 22 access
    1. Access VM
    1. Execute to download package:
       - `curl -L -o prometheus.tar.gz "https://github.com/prometheus/prometheus/releases/download/v3.5.0/prometheus-3.5.0.linux-amd64.tar.gz"`
    1. Extract contents:
       - `tar -xzf prometheus.tar.gz`
    1. Go to dir of the extracted package
    1. Configure `prometheus.yml` file. Copy contents of `prometheus/prometheus.yml`
    1. Execute `./prometheus --configure.file=prometheus.yml`
    1. Check VM network settings, add rule to allow access to `9090` port.
    1. Prometheus Web UI can be access via http with VM's public IP
       - `http://20.157.6.12:9090`
