# 迁移框架：Flask-Migrate
#
# Flask-Migrate原理：用程序追踪model与当前数据库结构的的差异，然后将变化写进数据库中。
#
# 迁移框架配置步骤：
# 0. 确保你的项目结构和web16最终不改版是一致的。
#
# 1. 安装Flask-Migrate: pip3 install flask-migrate 或pip install flask-migrate
#
# 2. 配置Flask-Migrate: 在项目根目录新建python文件migration.py，拷入下面的代码。
# 代码主要是说初始化一个manager实例并把迁移命令添加到manager，这样我们就能在命令行窗口执行迁移命令。
from app import init_app, db
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

app = init_app()
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

# 3.在/app/__init__.py 头部加上这条语句，  # -*- coding: utf-8 -*-
# 不然会出现‘未声明编码’错误。
# 把app/__init__.py里的sqlite地址改到项目根目录，必须要用绝对路径。
#
# 4. 在命令行窗口根据你的Python版本输入其中一个命令。
# python migration.py db init 或 python3 migration.py db init
# 执行后项目根目录会新增一个migrations文件夹。
#
# 5.以下命令会追踪model的变化，自动创建迁移脚本。
# python migration.py db migrate 或 python3 migration.py db migrate
#
# 6. 使用如下命令把迁移应用到数据库中。
# python migration.py db upgrade 或 python3 migration.py db upgrade
#
# 7.几点注意事项
# a.在model中新增非空字段比如需要用户添加信息的字段时，应指定默认值，否则会出错。
# b.sqlite对修改表有一些限制，比如不能删除字段。假如这对你而言是一个问题，可以用MySQL 或 Postgres。
# c.自动创建的迁移不一定总是正确的，有可能会漏掉一些细节。所以生成迁移脚本后最好检查下，有遗漏的话需要手动修正迁移脚本。
#
#
# 参考资料
# 1. 狗书第5章 http://www.ituring.com.cn/tupubarticle/1957
# 2. https://github.com/miguelgrinberg/Flask-Migrate
# 3. http://flask-migrate.readthedocs.io/en/latest/
# 4. https://realpython.com/blog/python/flask-by-example-part-2-postgres-sqlalchemy-and-alembic/
# 5. http://blog.miguelgrinberg.com/post/flask-migrate-alembic-database-migration-wrapper-for-flask
# 6. http://www.sqlite.org/lang_altertable.html
