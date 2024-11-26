#!/bin/bash
echo "hi guys , i'm hacker:)"
(cd Frontend && sudo npm i && sudo npm start) & (cd Backend && sudo npm i && sudo npm start)

