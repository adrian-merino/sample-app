# sample-app

### Guide for accessing

1.  Prometheus Server: `http://20.157.6.12:9090`

### Requirements for deploying

1.  Cloud provider user account (Azure in this case)
2.  Docker hub account

### Instructions

1.  For the react
2.  For deploying promethues server
    1. Create an Azure VM (Download .pem key as necessary)
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
