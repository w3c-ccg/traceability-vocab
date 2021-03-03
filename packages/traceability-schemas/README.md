# Traceability Schemas

This module contains all the JSON Schema used to build the traceability vocab.

It also contains all the programatic update code for automatically generting the resources used to produce the traceability spec.

The scripts in this repo MUST be run the following order:

### 1. Build Schemas

```
npm run build:schemas
```

### 2. Build Intermediate

```
npm run build:intermediate
```

### 2. Build Context

```
npm run build:context
```

### 3. Build Test Vectors

```
npm run build:test-vectors
```

### 4. Build Vocab

```
npm run build:vocab
```

### 4. Build Open API

```
npm run build:open-api
```
