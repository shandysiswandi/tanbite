.PHONY: help install run build preview lint format translate doctor clean test docker-build docker-run
PORT ?= 4333
PM ?= pnpm
RUN = $(PM) run

help: ## List available targets.
	@awk -F ':.*## ' '/^[a-zA-Z0-9_-]+:.*## / { printf "%-18s %s\n", $$1, $$2 }' Makefile
	@printf "\n"

install: ## Install dependencies (PM=bun|pnpm|npm|yarn), remove other lockfiles.
	@if [ "$(PM)" = "bun" ]; then \
		rm -f pnpm-lock.yaml package-lock.json yarn.lock; \
	elif [ "$(PM)" = "pnpm" ]; then \
		rm -f bun.lock bun.lockb package-lock.json yarn.lock; \
	elif [ "$(PM)" = "npm" ]; then \
		rm -f bun.lock bun.lockb pnpm-lock.yaml yarn.lock; \
	elif [ "$(PM)" = "yarn" ]; then \
		rm -f bun.lock bun.lockb pnpm-lock.yaml package-lock.json; \
	else \
		echo "Unsupported PM: $(PM)"; \
		exit 1; \
	fi
	@$(PM) install

run: ## Start Vite dev server.
	@rm -rf .next
	@PORT=$(PORT) $(RUN) dev

build: ## Build for production.
	@$(RUN) build

lint: ## Run linter.
	@$(RUN) lint

format: ## Run formatter.
	@$(RUN) format

translate: ## Run translator.
	@$(RUN) translate

doctor: ## Run all checks: lint + format + type check
	@$(RUN) doctor

clean: ## Cleaning the app
	@rm -rf .output
	@rm -rf .tanstack
	@rm -rf .playwright
	@rm -rf node_modules

test: ## Run Playwright tests.
	@$(RUN) test

docker-build: ## Build production Docker image.
	@if docker image inspect tunbite:slim >/dev/null 2>&1; then docker rmi -f tunbite:slim; fi
	@if docker image inspect tunbite:full >/dev/null 2>&1; then docker rmi -f tunbite:full; fi
	@docker build -t tunbite:slim --target runtime-slim .
	@docker build -t tunbite:full --target runtime-full .

docker-run: ## Run production Docker image.
	@docker run --rm -p 4334:3000 tunbite:slim
