

define TAG
---
layout: tags
title: %s
---

endef


#ALL_TAGS = $(shell grep -Irh '^tags:' . | tr -s ' [],:' '\n' | sort -u | xargs -I@ sh -c 'echo "tags/@.md"')

export TAG

.PHONY: tags

all: tags


hello:
	# hello

#bla: $(ALL_TAGS)

tags:
	@grep -Irh '^tags:' . | \
		tr -s ' [],:' '\n' | sort -u | \
		xargs -I@ sh -c 'if [ ! -e tags/@.md ]; then echo "New tag: @"; printf -- "$$TAG" "@" > tags/@.md; fi'


tags/*.md:
	echo $@

