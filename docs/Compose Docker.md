---
title: "Run Docker-Compose"
sidebar_position: 4
---

````markdown

## Run Docker-Compose

Make sure you pull Rabbit MQ and Postgres into your local docker repo. We also recommend running a vector DB in locally, so make sure to pull the image of the one you are using:

++{tabs}++

++{tab-item value="qdrant"}++
```
docker pull rabbitmq
docker pull postgres
docker pull qdrant/qdrant 
```
--{tab-item}--

++{tab-item value="milvus"}++
```
docker pull rabbitmq
docker pull postgres
docker pull docker pull milvusdb/milvus
```
--{tab-item}--

++{tab-item value="weaviate"}++
```
docker pull rabbitmq
docker pull postgres
docker pull semitechnologies/weaviate
```
--{tab-item}--

--{tabs}--


Then run:

```
docker-compose build --no-cache
docker-compose up -d
```

Note that the `db-init` container is running a script that sets up the database schema and will stop after the script completes.

## (optional) Configure Sentence Transformer open face models. 
VectorFlow can run any Sentence Transformer model but the `docker-compose` file will not spin it up automatically. Either run `app.py --model_name your-sentence-transformer-model`, or build and run the docker image in `src/hugging_face` with:

```
docker build --file hugging_face/Dockerfile -t vectorflow_hf:latest .
docker run --network=vectorflow --name=vectorflow_hf -d --env-file=/path/to/.env vectorflow_hf:latest --model_name "your_model_name_here"
```

Note that the Sentence Transformer models can be large and take several minutes to download from Hugging Face. VectorFlow does not provision hardware, so you must ensure your hardware has enough RAM/VRAM for the model. By default, VectorFlow will run models on GPU with CUDA if available. 

````

<Parser />