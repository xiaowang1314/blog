---
title: Javascript中继承总结(apply,call,prototype)
---

## js中有三种继承方式

* js原型(prototype)实现继承

```bash
 function Person(name,age){  
        this.name=name;  
        this.age=age;  
    }  
    Person.prototype.sayHello=function(){  
        alert("使用原型得到Name："+this.name);  
    }  
    var per=new Person("小土豆",25);  
    per.sayHello(); //输出：使用原型得到Name:小土豆

      
    function Student(){}  
    Student.prototype=new Person("洪如彤",21);  
    var stu=new Student();  
    Student.prototype.grade=5;  
    Student.prototype.intr=function(){  
        alert(this.grade);  
    }  
    stu.sayHello();//输出：使用原型得到Name:洪如彤  
    stu.intr();//输出：5  
```

* 构造函数实现继承

```bash
function  Parent(name){  
        this.name=name;  
        this.sayParent=function(){  
            alert("Parent:"+this.name);  
        }  
    }  

    function  Child(name,age){  
        this.tempMethod=Parent;  
        this.tempMethod(name);  
        this.age=age;  
        this.sayChild=function(){  
            alert("Child:"+this.name+"age:"+this.age);  
        }  
    }  

    var parent=new Parent("江剑臣");  
    parent.sayParent(); //输出：“Parent:江剑臣”  
    var child=new Child("李鸣",24); 
    child.sayChild();  //输出：“Child:李鸣 age:24”  
```

* call , apply实现继承

```bash
function  Person(name,age,love){  
        this.name=name;  
        this.age=age;  
        this.love=love;  
        this.say=function say(){  
            alert("姓名："+name);  
        }  
    }  

    //call方式  
    function student(name,age){  
        Person.call(this,name,age);  
    }  

    //apply方式  
    function teacher(name,love){  
        Person.apply(this,[name,love]);  
        //Person.apply(this,arguments); //跟上句一样的效果，arguments  
    }  

    //call与aplly的异同：  
    //1,第一个参数this都一样,指当前对象  
    //2,第二个参数不一样：call的是一个个的参数列表；apply的是一个数组（arguments也可以）  

    var per=new Person("武凤楼",25,"魏荧屏"); //输出：“武凤楼”  
    per.say();  
    var stu=new student("曹玉",18);//输出：“曹玉”  
    stu.say();  
    var tea=new teacher("秦杰",16);//输出：“秦杰”  
    tea.say();  

```
