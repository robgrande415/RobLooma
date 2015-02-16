import os

from sugar.activity import activity
from sugar import env

class Epaath(activity.Activity):
    def __init__(self, handle):
        activity.Activity.__init__(self, handle)
        os.execl('./launch.sh')
