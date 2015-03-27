BIN = node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%=lib/%)
TESTS = $(wildcard src/__tests__/*-test.js)

BABEL_OPTS = \
	--experimental \
	--playground \
	--source-maps-inline \
	--optional runtime \

build: $(LIB)

clean:
	@rm -f $(LIB)

sloc:
	@$(BIN)/sloc ./src

release-patch: lint test build
	@$(call release,patch)

release-minor: lint test build
	@$(call release,minor)

release-major: lint test build
	@$(call release,major)

publish: build
	@git push --tags origin HEAD:master
	@npm publish

lib/%.js: src/%.js
	@echo "building $@"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTS) -o $@ $<
