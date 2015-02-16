#!/bin/bash
DUMMYFILE="248"
#shebang and DUMMYFILE will be added to this file by the build script
EPAATHPATH="$SUGAR_ACTIVITY_ROOT/data/"

if [ ! -e $EPAATHPATH$DUMMYFILE ] ; then
	cp -rvf ./firefox/.adobe ./firefox/.mozilla ./firefox/.macromedia ./firefox/.fonts ./firefox/.karma $DUMMYFILE $EPAATHPATH
    echo "files copied"
fi

cd firefox
exec ./firefox-activity.py -u ../epaath/index.html
