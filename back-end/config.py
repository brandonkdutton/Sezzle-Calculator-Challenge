SECRET_KEY = "testpassword"
SQLALCHEMY_TRACK_MODIFICATIONS = False
IN_MEMORY_DB_URI = "sqlite:///db.sqlite3"
RDS_DB = "mysql://root:password@server/db"  # requires different system level mysql libraries depending on system so just stick with sqlite3
SQLALCHEMY_DATABASE_URI = IN_MEMORY_DB_URI