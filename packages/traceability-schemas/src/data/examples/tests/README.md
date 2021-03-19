# Test Examples

This folder contains a newman/postman collection and sample input data required to test issuance of credentials from the traceability vocab against implementations of the VC-HTTP-API

to execute:

```shell
newman run vc-http-api-supply-chain.json -d vc-http-api-supply-chain-credentials.json 
```

A variation of this test set will be generalized and extended out to be incorporated into CI / CD for the overal traceability specification objects
 
