## nginx 反向代理配置

```conf

    server {
        listen       80;
        server_name  localhost;

    
        location / {
            root   dist;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    
        location /apiTest/ {
            proxy_pass http://api.vikingship.xyz/api/;
        }

    
    }

```

```
nginx -s stop 关闭服务

nginx -s reload 刷新配置

nginx -c ./conf/nginx.conf 开启服务并加载该目录文件

tasklist /fi "imagename eq nginx.exe" windos中查看nginx开的服务
```

