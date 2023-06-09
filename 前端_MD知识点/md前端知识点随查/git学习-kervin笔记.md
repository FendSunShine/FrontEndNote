[toc]



### Git

​			作者：kerwin

​			版本：QF1.0

​			版权：千锋HTML5大前端教研院

​			公众号: 大前端私房菜

​       

#### 一. 走入Git

##### 1.Git介绍

> Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。
>
> Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。



- 版本控制

  版本控制（Revision control）是一种在开发的过程中用于管理我们对文件、目录或工程等内容的修改历史，方便查看更改历史记录，备份以便恢复以前的版本的软件工程技术。

- 团队协作

  从单兵作战转换为团队开发。

##### 2.Git对比SVN

<img src="%E7%AC%94%E8%AE%B0.assets/image-20220907110331660.png" alt="image-20220907110331660" style="zoom:67%;" />



1. SVN是集中式版本控制系统，版本库是集中放在中央服务器的，而工作的时候，用的都是自己的电脑，所以首先要从中央服务器得到最新的版本，然后工作，完成工作后，需要把自己的代码推送到中央服务器。集中式版本控制系统是必须联网才能工作。

2. Git是分布式版本控制系统，没有中央服务器，每个人的电脑就是一个完整的版本库，工作的时候不需要联网了，因为版本都在自己电脑上，可以离线工作。




##### 3.Git安装

> https://git-scm.com/

<img src="%E7%AC%94%E8%AE%B0.assets/image-20220907110802124.png" alt="image-20220907110802124" style="zoom:50%;float:left" />

- 下载好以后，直接双击进行安装就行

- 一直下一步就可以，安装再默认路径就行

- 安装完毕后检测一下安装是否成功

  1. 方法一： 打开 `cmd` 窗口，输入指令检查

     ```shell
     # 检测 git 是否安装
     $ git --version
     ```

     - 出现版本号，说明安装成功

  2. 方法二： 随便找个地方单机 **鼠标右键**，出现下图内容，说明安装成功

- 安装完毕，接下来我们就可以开始使用了



#### 二.Git常用命令

##### 1.设置用户签名

> 签名的作用就是用来标识用户，以区分不同的开发人员。

```shell
  git config --global user.email "2635607847@qq.com"
  git config --global user.name "lixin"
  
  ssh-keygen -t rsa -C "2635607847@qq.com"
```



##### 2.初始化本地库

- 我们希望一个文件夹被 `git` 管理的话，那么就要在一个文件夹下进行 **git 初始化**

- 找到一个希望被 `git` 管理的文件夹

- 在文件夹内单击鼠标右键，点开 `Git Bash Here`

- 输入指令

  ```shell
  # git 初始化的指令
  $ git init
  ```

- 然后文件夹内会多一个 `.git` 的文件夹（这个文件夹是一个隐藏文件夹）

- 这个时候，我的这个 `git_demo` 文件夹就被 `git` 管理了

  - `git` 不光管理这一个文件夹，包括所有的子文件夹和子文件都会被管理

- 注意： **只有当一个文件夹被 git 管理以后，我们才可以使用 git 的功能去做版本管理**

  - 也就是说，我们必须要把我们电脑中的某一个文件夹授权给 `git`
  - `git` 才能对这个文件夹里面的内容进行各种操作
  - 而 `git init` 就是在进行这个授权的操作



##### 3.Git工作区、暂存区和版本库

![image-20220907112424167](%E7%AC%94%E8%AE%B0.assets/image-20220907112424167.png)

**托管平台**

- 局域网(内网)
  - gitlab
- 公网（外网）
  - gitlab
  - github
  - gitee 码云

##### 4.git add

- 我们要放入暂存区，要使用 `git add` 指令

- 把单独一个文件放在暂存区

  ```shell
  # 把文件夹下的 index.txt 文本放在暂存区
  $ git add index.txt
  ```

- 把单独一个文件夹放在暂存区（暂存区不能存放空文件夹）

  ```shell
  # 把文件夹下的 ceshi文件夹 放在暂存区
  $ git add ceshi/
  ```

- 把所有文件都放在暂存区

  ```shell
  # 把文件夹下所有的内容都放在暂存区
  $ git add --all
  
  # git add --all 有一个简单的写法
  $ git add .
  ```

  - 全部存放的时候使用上面两个指令哪个都行

##### 5.git commit

```shell
# 把暂存区的内容放到历史区
$ git commit -m "我是第一个版本"
```

我们使用 `git log` 这个指令查看版本信息

```shell
# 查看当前历史区版本信息
$ git log
```




- 我们使用 `git reset --hard 版本编号` 进行历史回退

  ```shell
  # 回退到上一次提交的版本
  $ git reset --hard HEAD^
  
  # 回退到上上次提交的版本
  $ git reset --hard HEAD^^
  $ git reset --hard HEAD~2
  ```

<img src="%E7%AC%94%E8%AE%B0.assets/image-20220908074740564.png" alt="image-20220908074740564" style="zoom:67%;float:left" />

##### 6.git revert 与 git reset

![image-20220908075826032](%E7%AC%94%E8%AE%B0.assets/image-20220908075826032.png)


- git reset 是回滚到对应的commit-id，相当于是删除了commit-id以后的所有的提交，并且不会产生新的commit-id记录，如果要推送到远程服务器的话，需要强制推送-f
- git revert 是反做撤销其中的commit-id，然后重新生成一个commit-id。本身不会对其他的提交commit-id产生影响，如果要推送到远程服务器的话，就是普通的操作git push就好了

#### 三. Git 分支

##### 1.初识分支

- `git` 分支，就是我们自己把我们的整个文件夹分成一个一个独立的区域
- 比如我在开发 **登录** 功能的时候，可以放在 `login` 分支下进行开发

  - 开发 **列表** 功能的时候，可以放在 `list` 分支下进行开发
  - 大家互不干扰，每一个功能都是一个独立的功能分支
- 这样开发就会好很多
- `git` 在初始化的时候，会自动生成一个分支，叫做 `master` 
- 是表示主要分支的意思
- 我们就可以自己开辟出很多独立分支

##### 2.创建分支

- 开辟一个分支使用 `git branch 分支名称` 指令

  ```shell
  # 开辟一个 login 分支
  $ git branch login
  ```

- 查看一下当前分支情况

  ```shell
  # 查看当前分支情况
  $ git branch
  ```

  - 会看到，当前有两个分支了
  - 一个是 `master`，一个是 `login`
  - 前面有个 `*` 号，并且有高亮显示的，表示你当前所处的分支

##### 3.切换分支

- 我们对 **登录** 功能的开发要移动到 `login` 分支去完成

- 我们切换所处分支使用 `git checkout 分支名称`

  ```shell
  # 切换到 login 分支
  $ git checkout login
  ```

- 然后我们在整个分支上进行 **登录** 功能的开发

- 开发完毕以后，我们就在当前分支上进行提交

- 提交以后我们进行分支切换

  - 发现 `master` 上面还是最初始的状态
  - 而 `login` 分支上有我们新写的 **登录** 功能的代码

- 我们按照分支把所有功能都开发完毕了以后

  - 只要把所有代码都合并到 `master` 主分支上就行了

##### 4.合并分支

- `git` 的合并分支，只能是把别的分支的内容合并到自己的分支上

- 使用的指令是 `git merge`

  ```shell
  # 切换到 master 分支
  $ git checkout master
  
  # 把 login 的内容合并到自己的分支
  $ git merge login
  ```

- 这个时候，我们刚才在 `login` 上开发的东西就都来到了 `master` 主分支上

- 如果是有多个分支的话，那么所有的最后都合并到 `master` 分支上的时候

- 我们的主分支上就有完整网站的所有页面

  - 各个分支上都是单独的页面和功能

##### 5.删除分支

- 这个时候我们开辟的分支就没有什么用了，就可以删除分支了

  1. 先切换到别的分支

  2. 使用指令 `git branch -d 分支名称` 来删除

     ```shell
     # 先切换到别的分支
     $ git checkout master
     
     # 删除 login 分支
     $ git branch -d login
     ```



#### 四.远程仓库

- 我们的所有内容已经全部保留在了本地历史区
- 理论上是不会丢失了
  - 但是如果把文件夹删除了，还是没有了
- 所以我们要使用 `git` 把我们所有的内容推送到 `github` 上面保存起来
- 那么就本地文件夹就算删除了，那么远程上面还有一份，还可以拿回来使用
- 所以我们现在就要把本地内容推送到远程
- 这个时候我们接需要一个 `github` 的账号了
- 先去 [github官网](https://github.com/) 注册一个账号



##### 1.创建一个远程仓库

- 有了 `github`  账号以后

- 我们就登录 `github` 网站，开辟一个远程仓库

- `github` 的远程也是以一个仓库一个仓库的形式来保存代码

  - 我们可以在一个 `github` 上保存很多的项目
  - 只要一个项目一个仓库就可以了

- 按照下面步骤开辟仓库

  1. 先点击新建仓库

     ![](%E7%AC%94%E8%AE%B0.assets/github%E5%BC%80%E8%BE%9F%E4%BB%93%E5%BA%931.png)




##### 2.添加仓库地址

- 接下来，要使用 `git` 上传代码了

- 我们先要告诉 `git` 上传到哪里

- 也就是给 `git` 添加一个上传的地址

- 我们还是来到我们的项目文件夹

- 使用 `git remote add origin 仓库地址` 来添加

  ```shell
  # 在项目文件夹下打开 git base
  # 添加仓库地址
  $ git remote add origin *********************
  # 已经存在的话，就用set
git remote set-url origin <new-url>
  ```
  
  - remote：远程的意思
  - add：添加的意思
  - origin：是一个变量名（就是指代后面一长串的地址）



##### 3.git push

- 上传到哪里的地址我们已经添加好了

- 接下来就是上传内容了

  - 上传要保证 **历史区** 里面有内容
  - 上传的过程会把 **历史区** 里面所有的内容上传到远端

- 我们使用 `git push` 指令来上传

  ```shell
  # 上传内容
  $ git push -u origin master
  # 表示把内容上传到 origin 这个地址
  # master 是上传到远程的 master 分支
  ```

  - 如果当前分支与多个主机存在追踪关系，则可以使用-u选项指定一个默认主机，这样后面就可以不加任何参数使用git push。

    

- 第二次上传

  - 第二次上传的时候，因为有刚才的记录，就不需要再写 `origin` 和 `master` 了

  - 会默认传递到 `origin` 这个地址的 `master` 分支上

  - 除非你要传递到别的分支上的时候再进行书写

    ```shell
    # 第二次上传
    $ git push
    ```

- 到这里，就完成了一次 `git` 推送

- 这个时候本地的文件夹就真的可以删除了

- 因为远程有一份我们的内容，本地的删除了，可以直接把远程的拉回来就行



##### 4.git clone

- `git` 克隆是指把远程仓库里面的内容克隆一份到本地

- 可以克隆别人的 **公开** 的仓库，也可以克隆自己的仓库

- 克隆别人的仓库，我们只能拿下来用，修改后不能从新上传

- 克隆自己的仓库，我们修改后还可以再次上传更新

  

- 输入克隆指令 `git clone 仓库地址`

  ```shell
  # 直接克隆仓库
  $ git clone *************
  ```

  


##### 5.git pull

- 当人家的代码更新以后，你想获得最新的代码

- 我们不需要从新克隆

- 只要拉取一次代码就可以了

- 直接在项目文件夹里面使用指令下拉

  ```shell
  # 拉取远程最新代码
  $ git pull
  ```

- 这样一来，你本地的仓库就可远程的仓库同步了

#### 五.VScode集成Git

VSCode内置版本控制机制，并自带对Git和Github的支持，你也可以安装插件以支持其他控制软件，如SVN(需要先安装 SVN )等。

1. 初始化

   <img src="%E7%AC%94%E8%AE%B0.assets/image-20220910091354495.png" alt="image-20220910091354495" style="zoom:50%;float:left;" />

2. 可视化界面管理项目
    <img src="%E7%AC%94%E8%AE%B0.assets/image-20220910091438534.png" alt="image-20220910091438534" style="zoom:67%;float:left;" />

  

#### 六. gitignore

> 在一些项目中，我们不想让本地仓库的所有文件都上传到远程仓库中，而是有选择的上传，比如：一些依赖文件（node_modules下的依赖）、bin 目录下的文件、测试文件等。一方面将一些依赖、测试文件都上传到远程传输量很大，另一方面，一些文件对于你这边是可用的，在另一个人那可能就不可用了，比如：本地配置文件。



- 空行不匹配任何文件；

- 如果本地仓库文件已被跟踪，那么即使在 .gitignore 中设置了忽略，也不起作用。

- .gitignore 文件也会被上传的到远程仓库，所以，同一个仓库的人可以使用同一个.gitignore 文件。

```js
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.
# dependencies
# #开头的便是注释

# 忽略文件和目录
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# 使用通配符
npm-debug.log*
yarn-debug.log*
yarn-error.log*   

```

