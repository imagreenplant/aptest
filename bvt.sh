export PATH=/usr/local/bin:$PATH
echo "Testing TRUNK on the DEV environment @ `date`"
echo "Startin casperjs smoke test of TRUNK on DEV environment @ `date`" >> log.txt
/Users/$USER/git/aptest/timeout3 -t 600 -i 5 -d 30 casperjs test /Users/$USER/git/aptest/bvt/ --no-colors --pre=/Users/$USER/git/aptest/pre.js,/Users/$USER/git/aptest/pre2.js,/Users/$USER/git/aptest/wait.js --includes=/Users/$USER/git/aptest/inc.js,/Users/$USER/git/aptest/omps.js --d
echo "Finished DEV environment smoke test @ `date`"
