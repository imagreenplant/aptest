# Starter script for casperjs testing.
# First variable to enter is the file you want to test, or directory.  
#
# Like so:
# c.sh . 
# c.sh branding/hash.js
# c.sh branding/

# The second variable is to choose the environment to test against.
# Like so:
# c.sh . live
# c.sh . dev
# c.sh . q

echo "Testing $1 on the $2 environment"
casperjs test $1 --pre=pre.js,pre2.js --includes=inc.js,omps.js --$2 --$3
