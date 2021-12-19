build:
	kustomize build kustomize > .cache/kustomize.yaml
up: build
	kubectl apply -f .cache/kustomize.yaml
down:
	kubectl delete -f .cache/kustomize.yaml

tag:
	yarn standard-version
