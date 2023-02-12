# chmod +x https.sh

docker exec -it load-balancer /bin/bash

# chmod 400 ~/.ssh/id_rsa
# chmod 400 ~/leo-test.pem
# passwd

apt update
apt install certbot vim
vim /etc/nginx/conf.d/default.conf




apt install python3-certbot-nginx

certbot --nginx -d leo-boiler.store --email leo3179@naver.com

service nginx restart