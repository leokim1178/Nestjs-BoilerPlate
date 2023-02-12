# 몽고 db auth 설정을 위한 명령어


## 몽고 도커 컨테이너 접속
docker exec -it mongodb bash

apt update

apt install vim

vi /etc/mongod.conf.orig

# by vi
net:
  maxIncomingConnections: 10

docker restart mongodb

## 몽고 db 접속
mongo

## 몽고 db 접속 후 root 계정 생성
use admin
db.createUser({user:"root",pwd:"root",roles:["root"]});
## 성공시 : Successfully added user: {"user":"root","roles":["root"]}
db.createUser({user:"leo",pwd:"pw1234",roles:[{role:"readWrite",db:"mydb"}]});

## root 계정 로그인
db.auth("root","root");
# 1

## 이후 사용자 계정 생성
use mydb # custom db name
db.createUser({user:"leo",pwd:"pw1234",roles:[{role:"readWrite",db:"mydb"}]});