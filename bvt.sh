export PATH=/usr/local/bin:$PATH
echo "Testing TRUNK on the DEV environment @ `date`"
echo "Startin casperjs smoke test of TRUNK on DEV environment @ `date`" >> log.txt
/Users/hans/git/aptest timeout3 -t 600 -i 5 -d 30 casperjs test /Users/hans/git/aptest/bvt/ --pre=/Users/hans/git/aptest/pre.js,/Users/hans/git/aptest/pre2.js --includes=/Users/hans/git/aptest/inc.js,/Users/hans/git/aptest/omps.js --d
echo "Finished DEV environment smoke test @ `date`"
