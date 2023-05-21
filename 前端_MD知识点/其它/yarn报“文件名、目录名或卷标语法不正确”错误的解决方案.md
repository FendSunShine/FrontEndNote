### yarn报“文件名、目录名或卷标语法不正确”错误的解决方案

yarn create vite 系统找不到指定路径

#### 报错图：

![Snipaste_2022-12-02_17-50-58](E:\Users\desktop\Snipaste_2022-12-02_17-50-58.png)

#### 后来查了几篇解决方案原来是因为：

##### 	yarn 的全局安装位置与bin的位置并不一致，于是去修改 yarn的全局安装位置和缓存位置

查看yarn命令位置： 

```
yarn global bin
```
查看yarn全局安装位置：

```
yarn global dir
```

![image-20221202181118878](C:\Users\lx020\AppData\Roaming\Typora\typora-user-images\image-20221202181118878.png)

修改 yarn的全局安装位置：

```
yarn config set global-folder C:\Users\lx020\AppData\Local\Yarn\lxYarn\golbal
```

修改 yarn的缓存位置：

```
yarn config set cache-folder  C:\Users\lx020\AppData\Local\Yarn\lxYarn\cache
```

![image-20221202181555345](C:\Users\lx020\AppData\Roaming\Typora\typora-user-images\image-20221202181555345.png)