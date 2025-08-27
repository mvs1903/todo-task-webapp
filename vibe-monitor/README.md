# Vibe Monitor

## Project Overview

The Vibe Monitor is a comprehensive monitoring solution for a FastAPI application. It provides a single pane of glass for observing metrics, logs, and traces, enabling developers to gain deep insights into the application's performance and behavior.

This project uses a combination of powerful open-source tools:

- **FastAPI:** A modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **Prometheus:** A systems monitoring and alerting toolkit.
- **Grafana:** A multi-platform open source analytics and interactive visualization web application.
- **Loki:** A horizontally-scalable, highly-available, multi-tenant log aggregation system inspired by Prometheus.
- **Jaeger:** An open source, end-to-end distributed tracing system.
- **OpenTelemetry:** A collection of tools, APIs, and SDKs for instrumenting, generating, collecting, and exporting telemetry data (metrics, logs, and traces).

## Directory Structure

```
.
├── dashboard2.json
├── docker-compose.yml
├── Dockerfile
├── grafana-dashboards2.yml
├── grafana-datasources.yml
├── main.py
├── prometheus.yml
├── promtail-config.yml
├── README.md
├── requirements.txt
└── traffic_generator.py
```

## File Descriptions

- **`main.py`**: The main FastAPI application. It's instrumented with OpenTelemetry for tracing and Prometheus for metrics.
- **`requirements.txt`**: Lists the Python dependencies for the FastAPI application.
- **`Dockerfile`**: A script to build the Docker image for the FastAPI application.
- **`docker-compose.yml`**: The central configuration file that orchestrates all the services (FastAPI, Prometheus, Grafana, Loki, Jaeger, and the OpenTelemetry Collector).
- **`prometheus.yml`**: The configuration file for Prometheus, instructing it to scrape metrics from the FastAPI application.
- **`grafana-datasources.yml`**: Configures the data sources for Grafana, including Prometheus, Loki, and Jaeger.
- **`grafana-dashboards2.yml`**: Informs Grafana about the location of the dashboard definitions.
- **`dashboard2.json`**: The Grafana dashboard's JSON model. It includes panels for visualizing metrics, logs, and traces.
- **`otel-collector-config.yml`**: Configures the OpenTelemetry Collector to receive traces and export them to Jaeger.
- **`traffic_generator.py`**: A simple Python script to generate traffic to the FastAPI application for demonstration purposes.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### How to Run

1.  **Start the services and monitoring stack:**

    ```bash
    docker-compose up -d --build
    ```

2.  **Run the traffic simulation:**

    Open a new terminal and run:
    ```bash
    python traffic_generator.py
    ```

3.  **Open Grafana and view the dashboard:**

    - Open your browser and go to [http://localhost:3000](http://localhost:3000)
    - Log in with the default credentials (admin/admin).
    - Navigate to the "Vibe Monitor 2" dashboard.

## How It Works

The Vibe Monitor works by collecting and visualizing telemetry data from the FastAPI application.

- **Metrics:** The FastAPI application is instrumented with the `prometheus-fastapi-instrumentator` library, which exposes a `/metrics` endpoint. Prometheus scrapes this endpoint to collect metrics like request counts and latencies.
- **Logs:** The `promtail` service tails the Docker logs of the FastAPI container and sends them to Loki for aggregation.
- **Traces:** The FastAPI application is instrumented with the OpenTelemetry SDK. Traces are sent to the OpenTelemetry Collector, which then exports them to Jaeger for storage and analysis.

## The Vibe Monitor Dashboard

The Grafana dashboard provides a unified view of the application's health:

- **Request Rate & Latency:** Time-series graphs showing the rate of requests and the 99th percentile latency, powered by Prometheus.
- **Logs:** A panel displaying the logs from the FastAPI application, sourced from Loki.
- **Traces:** A panel showing the traces from the FastAPI application, sourced from Jaeger. You can click on a trace to view its details in the Jaeger UI.
