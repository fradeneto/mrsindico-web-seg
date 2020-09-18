#!/bin/bash
if [ -z $1 ]
then
  echo "Você precisa digitar a mensagem de commit"
  exit
fi

npm version patch
git add .
git commit -m "$1"
git push
