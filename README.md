#Hexo命令
1. hexo g  代码生成器
2. hexo s   启动nodejs服务器
3. hexo d  部署代码到github上


#git命令
1. git init 生成新git仓库
2. git add . 添加所有文件
3. git commit -m "提交添加修改的文件"
4. git push -u origin master 第一次提交代码到github
4. git push origin master 提交代码到github
5. git rm file_name 删除文件
6. 关联远程库，使用命令git remote add origin https://github.com/xiaowang1314/blog
7. git clone https://github.com/xiaowang1314/blog 克隆
8. git checkout -- test.txt 恢复原版本文件


硬盘删除文件后，执行$ git status

会提示你仍然需要$ git rm <文件>

此时如果是要删除大批量文件，这么一个一个命令下去不得累死人啊

其实可以这样（不管之前有没有已经本地物理删除）

执行 $ git rm * -r（记得，cd 到你要删除的目录下。当然 * 可以换成指定目录）

这时删除文件已经进入本地缓存区，

接下来就是正常的提交操作了
$ git add .
$ git commit -m "clear"
$ git push origin master