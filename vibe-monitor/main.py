
import logging
import time
from fastapi import FastAPI, Request
from prometheus_fastapi_instrumentator import Instrumentator
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure OpenTelemetry Tracer
resource = Resource(attributes={
    "service.name": "fastapi-app"
})

trace.set_tracer_provider(TracerProvider(resource=resource))
tracer = trace.get_tracer(__name__)

otlp_exporter = OTLPSpanExporter(endpoint="otel-collector:4317", insecure=True)
span_processor = BatchSpanProcessor(otlp_exporter)
trace.get_tracer_provider().add_span_processor(span_processor)

# Instrument FastAPI for OpenTelemetry
FastAPIInstrumentor.instrument_app(app)

# Instrument FastAPI for Prometheus
Instrumentator().instrument(app).expose(app)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(f"Handled request {request.method} {request.url.path} in {duration:.4f} seconds. Status code: {response.status_code}")
    return response

@app.get("/hello")
def read_root():
    message = "Hello, World!"
    logger.info("This is a log message.")
    return {"message": message}

