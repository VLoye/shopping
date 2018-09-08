# shopping
开发规范

## 更新
先从我的仓库pull最新的代码，跟自己本地仓库合并，解决冲突后再提交上来。

##  Warning
多问原则  
开发过程遇到的问题解决不了的Bug可以先找我看看  
如果对业务逻辑不清晰先跟我沟通，别埋头苦干，做无用功，到最后却与实际需求相差甚远~~~  

# controller层：
只处理数据校验和数据封装，调用service来完成业务  
命名：Entity+Controller  如： UserController/GoodsController  
方法名：操作，或名字  如login/details  
用logger.info()代替System.out.println，可参考已有实现  

# Service层：
只完成业务逻辑的实现，调用dao将数据持久化  
命名：Entity+Service  如： UserService/GoodsService  
方法名：操作+名字或操作，  如validateUser/login  

# Dao层：Entity+Dao  如： UserDao/GoodsDao
只做简单的数据持久化，不进行业务逻辑和数据校验。  
方法命名：  
insert+Entity  
delete+Entity  
query+Entity(+By+条件)  
update+Entity(+By+条件)  

# Tip
先想好理清思路再实现代码！！！  
能用代码解决的问题就不要修改配置文件~~~  
解决不了需要修改先跟我说一下！！！  
