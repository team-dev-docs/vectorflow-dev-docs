---
sidebar_position: 4
---

````markdown

## Using VectorFlow

To use VectorFlow in a live system, make an HTTP request to your API's URL at port 8000 - for example, `localhost:8000` from your development machine, or `vectorflow_api:8000` from within another docker container.

### Request & Response Payload

All requests require an HTTP Header with `Authorization` key which is the same as your `INTERNAL_API_KEY` env var that you defined before (see above). You must pass your vector database api key with the HTTP Header `X-VectorDB-Key` and the embedding api key with `X-EmbeddingAPI-Key`.

VectorFlow currently supports OpenAI ADA embeddings and Pinecone, Qdrant, Weaviate, and Milvus vector databases. 

To check the status of a `job`, make a `GET` request to this endpoint: `/jobs/<int:job_id>/status`. The response will be in the form:

```
{
    'JobStatus': job_status.value
}
```

To submit a `job` for embedding, make a `POST` request to this endpoint: `/embed` with the following payload and the `'Content-Type: multipart/form-data'` header:

```
{
    'SourceData=path_to_txt_file'
    'LinesPerBatch=4096'
    'EmbeddingsMetadata={
        "embeddings_type": "OPEN_AI | HUGGING_FACE",
        "chunk_size": 512,
        "chunk_overlap": 128,
        "chunk_strategy": "EXACT | PARAGRAPH | SENTENCE",
        "hugging_face_model_name": "model-name-here"
    }'
    'VectorDBMetadata={
        "vector_db_type": "PINECONE | QDRANT | WEAVIATE | MILVUS",
        "index_name": "index_name",
        "environment": "env_name"
    }'
}
```

You will get the following payload back:

```
{
    message': f"Successfully added {batch_count} batches to the queue",
    'JobID': job_id
}
```

### Sample Curl Request

The following request will embed a TXT document with OpenAI's ADA model and upload the results to a Pinecone index called `test`. Make sure that your Pinecone index is called `test`. If you run the curl command from the root directory the path to the test_text.txt is `./src/api/tests/fixtures/test_text.txt`, changes this if you want to use another TXT document to embed.

```
curl -X POST -H 'Content-Type: multipart/form-data' -H "Authorization: INTERNAL_API_KEY" -H "X-EmbeddingAPI-Key: your-key-here" -H "X-VectorDB-Key: your-key-here" -F 'EmbeddingsMetadata={"embeddings_type": "open_ai", "chunk_size": 256, "chunk_overlap": 128}' -F 'SourceData=@./src/api/tests/fixtures/test_text.txt' -F 'VectorDBMetadata={"vector_db_type": "pinecone", "index_name": "test", "environment": "us-east-1-aws"}'  http://localhost:8000/embed
```

To check the status of the job,

```
curl -X GET -H "Authorization: INTERNAL_API_KEY" http://localhost:8000/jobs/<job_id>/status
```

### Vector Database Schema Standard
VectorFlow enforces a standardized schema for uploading data to a vector store:
```
id: int
source_data: string
embeddings: float array
```

The id can be used for deduplication and idempotency. Please note for Weaviate, the id is called `vectorflow_id`. We plan to support dynamically detect and/or configurable schemas down the road. 

### S3 Endpoint
VectorFlow is integrated with AWS s3. You can pass a pre-signed s3 URL in the body of the HTTP instead of a file. Use the form field `PreSignedURL` and hit the endpoint `/s3`. This endpoint has the same configuration and restrictions as the `/embed` endpoint. 

````

<Parser />