---
title: Linux升级安装GCC
categories: linux
tags: ['linux']
---

由于我的CentOS 6系统中，gcc版本只有4.4.7，安装nodejs时遇到gcc版本4.8以上，所以需要升级


## 下载最新版本gcc

```
wget http://gcc.parentingamerica.com/releases/gcc-5.2.0/gcc-6.3.0.tar.bz2
// 或
wget http://ftp.tsukuba.wide.ad.jp/software/gcc/releases/gcc-5.2.0/gcc-6.3.0.tar.bz2

```

由于gcc文件较大，下载太慢了，我用迅雷下载了此文件['官网下载'](http://gcc.skazkaforyou.com/releases/),然后用SecureCRT 8.0等工具上传到linux

## 解压下载文件

```
tar -xf gcc-5.2.0.tar.bz2
```

tar命令详解

-x：解压


-r：向压缩归档文件末尾追加文件

## 下载gcc依赖文件和库

解压完成后，进入工作目录：

```
cd gcc-6.3.0
```

执行download_prerequisites脚本，下载gcc依赖文件和库：(download_prerequisites脚本，会下载安装gcc所需的mpfr、gmp和mpc文件)

```
./contrib/download_prerequisites
```


## 配置安装gcc

建立一个输出目录，编译时所有生成的中间文件都放到该目录下：

```
mkdir gcc-temp-6.3.0
```

工作目录切换至输出目录

```
cd gcc-temp-6.3.0
```

执行configure配置安装文件：

```
../configure --enable-checking=release --enable-languages=c,c++ --disable-multilib
```

配置完成后，执行以下命令，编译gcc：

```
make
```

注意：编译gcc时间较长，我用了近一个小时左右才编译完成(有些可能更长看电脑配置)。


编译完成后，安装gcc：

```
make install
```

查看gcc版本

```
gcc -v
```




#### 遇到的坑

1. make的时候出现 C++ preprocessor “/lib/cpp” fails sanity check

解决方法:
['yum install gcc-c++'](https://askubuntu.com/questions/509663/c-preprocessor-lib-cpp-fails-sanity-check)



