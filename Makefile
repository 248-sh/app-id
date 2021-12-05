apply:
	kustomize build kustomize | kubectl apply -f -

tag:
	yarn standard-version
