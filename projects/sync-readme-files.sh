
update_file() {
	name=$(sed -n '/^title: /s///p' $1)
	sed '1b;/^---/q' $1
	curl -sS "https://raw.github.com/litejs/$name/master/README.md" |
	sed 's/```\(..*\)/{% highlight \1 %}{% raw %}/' |
	sed 's/```/{% endraw %}{% endhighlight %}/'
}

for file in _posts/*.md; do
	update_file $file > $file.tmp
	mv $file.tmp $file
	echo "$file updated"
done


