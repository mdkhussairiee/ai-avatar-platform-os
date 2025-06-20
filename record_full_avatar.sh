#!/bin/bash
# record_full_avatar.sh

TIMESTAMP=$(date +%s)
FILENAME="avatar_full_recording_$TIMESTAMP.mp4"

ffmpeg -y \
  -f x11grab -s 1280x720 -i :0.0+100,100 \
  -f pulse -ac 2 -i default \
  -vcodec libx264 -preset ultrafast -acodec aac \
  recordings/$FILENAME
