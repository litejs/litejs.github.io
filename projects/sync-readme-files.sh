
update_file() {
	name=$(sed -n '/^title: /s///p' $1)
	sed '1b;/^---/q' $1
	curl -sS "https://raw.github.com/litejs/$name/master/README.md" |
	sed 's/```\([a-z][a-z]*\)/{% highlight \1 %}\n{% raw %}/' |
	sed 's/```/{% endraw %}\n{% endhighlight %}/'
}

for file in _posts/*.md; do
	update_file $file > $file.tmp
	mv $file.tmp $file
	echo "$file updated"
done


