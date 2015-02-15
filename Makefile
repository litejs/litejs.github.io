# sed '/"token":/!d;s,,,;'
#
json-get = $(info json-get $(1) $(2))$(shell sed '/"$(1)":/!d;s///;s/^[    ,"]*\|[",]*$$//g' $(2))

null  :=
space := $(null) $(null)

USER = $(shell echo $$USER)
HOST = $(shell uname -n)
DATE = $(shell date +%F)



define TAG
---
layout: tags
title: %s
---

endef


#ALL_TAGS = $(shell grep -Irh '^tags:' . | tr -s ' [],:' '\n' | sort -u | xargs -I@ sh -c 'echo "tags/@.md"')

export TAG

.PHONY: tags projects

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


projects: $(wildcard projects/_posts/*.md)


projects/_posts/%.md: Makefile
	sed -i '1b;/^---/q' $@
	curl -sS "https://raw.githubusercontent.com/litejs/`sed -n '/^title: /s///p' $@`/master/README.md" |\
	sed 's/```\(..*\)/\0\n{% raw %}/;t;s/```/{% endraw %}\n\0/' >> $@
	TAGS=$$(curl -sS "https://raw.githubusercontent.com/litejs/`sed -n '/^title: /s///p' $@`/master/package.json" | \
		jq -c '.keywords');\
		sed -i "1,/---/s/tags:.*/tags: $$TAGS/" $@


test:
	jekyll build

#update_file() {
#	name=
#	sed '1b;/^---/q' $1
#	curl -sS "https://raw.github.com/litejs/$(sed -n '/^title: /s///p' $1)/master/README.md" |
#	sed 's/```\(..*\)/{% highlight \1 %}{% raw %}/' |
#	sed 's/```/{% endraw %}{% endhighlight %}/'
#}
#
#for file in _posts/*.md; do
#	update_file $file > $file.tmp
#	mv $file.tmp $file
#	echo "$file updated"
#done
