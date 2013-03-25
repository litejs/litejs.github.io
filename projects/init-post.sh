
JSON=$1


FILE=$(sed '/"main":/!d;s///;s/[ ,"]//g' $JSON)
NAME=$(sed '/"name":/!d;s///;s/[ ,"]//g' $JSON)
DESC=$(sed '/"description":/!d;s///;s/^[ ,"]*\|[ ,"]*$//g' $JSON)

cat > _posts/$(date +"%Y-%m-%d")-$NAME.md <<EOF
---                                                                             
layout: project                                                                 
title: $NAME
summary: $DESC
tags: [litejs]                                                                    
fork: https://github.com/litejs/$NAME
css:                                                                            
- css/pygments.css                                                              
---                                                                             
                                                                                
[1]: https://raw.github.com/litejs/$NAME/master/min.js            
[2]: https://raw.github.com/litejs/$NAME/master/$NAME.js

EOF



