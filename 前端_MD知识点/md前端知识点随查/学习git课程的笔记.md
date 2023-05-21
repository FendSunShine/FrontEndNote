# 学习git课程的笔记

------



## 基本操作

-----

### 初始化 Git 仓库

```sh
git init
```

###  以精简的方式显示文件状态

```shell
git status -s
git status --short
```

### git的几种状态

```
Untracked 未跟踪

Unmodified 未修改

Modified 已修改

Staged 已暂存
```

### 暂存文件

```shell
git add .
git add a.txt
git add a/
```

### 提交文件

```shell
git commit -m '提交说明' ## 必须单引号
```

-----

## 版本穿梭

### 硬穿梭，会改变工作区数据

``` sh
## 用于改变修改错误时回退到以前版本
git reset --hard^
git reset --hard^^
git reset --hard ~3
```

## 出现 443

```
git config --global http.sslVerify false
```

使用 "git config --global http.sslVerify false" 命令可以禁用 https 访问时的 ssl 验证，可能解决了你在连接 GitHub 服务器时遇到的问题。这种方法在一些情况下有效，但同时也存在着一定的风险，因为它会取消 SSL 证书校验机制，可能会导致安全漏洞，降低了数据传输过程的安全性。如果没有必要，建议不要一直使用这种方式访问 GitHub 和其他网站，以保障信息安全和资产安全。

