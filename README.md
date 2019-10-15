# ms2s
"cmd line tool" to handle unix milisecond timestamps
# Installation
npm install -g ms2s
# motivation / usage
In a world of unix timestamps i missed a tool to handle timestamp conversions from unix miliseconds to unix seconds
## convert miliseconds to seconds
### pipe into ms2s
echo "1556010294140
1556011611129
1556011676909
1556012468524
1556012864512
1556013128494
1556014052720
1556014184611
1556014382759
1556014646585
1556014712679
1556014976661
1556015240959
1556015372779
1556015504692
1556015702705
1556016494927
1556016560895
1556016627231
1556016693227
1556016758816" | ms2s | while read s; do date -d "$s" "+%s"; done 
