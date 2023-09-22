---
sidebar_position: 3
---



Before we run the docker compose, we have set the necessary environment variables to run Vectorflow and addtional services such as our embedding database, rabbitmq, and postgres.

First create a folder in the root for all the environment variables:

```
mkdir env_scripts
cd env_scripts
touch env_vars.env
```

This creates a file called `env_vars.env` in the `env_scripts` folder to add all the environment variables mentioned below.

```
INTERNAL_API_KEY=your-choice
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=your-choice
POSTGRES_DB=vectorflow
POSTGRES_HOST=postgres
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_HOST=rabbitmq
EMBEDDING_QUEUE=embeddings
VDB_UPLOAD_QUEUE=vdb-upload
LOCAL_VECTOR_DB=qdrant | milvus | weaviate
```

You can choose a variable for `INTERNAL_API_KEY`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`, but they must be set.



