comma=../bin/comma
csvFile=`pwd`/example/some.csv
outFile=`pwd`/out

echo
echo "Reading CSV file '${csvFile}' from stdin"
#echo "cat ${csvFile} | comma"
cat ${csvFile} | comma

echo
echo "Reading CSV from file '${csvFile}'"
#echo "comma -f ${csvFile}"
comma -f ${csvFile}

echo
echo "Reading CSV from file '${csvFile}' and outputing to file ${outFile}"
#echo "comma -f ${csvFile} -o ${outFile}"
comma -f ${csvFile} -o $outFile

echo
echo "Reading contents of file ${outFile}"
#echo "cat ${outFile}"
cat $outFile

echo
echo "\nRemoving file ${outFile}"
#echo "rm ${outFile}"
rm $outFile