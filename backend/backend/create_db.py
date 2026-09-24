import pymysql

# Commonly used passwords list
PASSWORDS_TO_TRY = ["root", "admin", "1234", "root1234", "123456", "mysql", ""]

success = False

for pwd in PASSWORDS_TO_TRY:
    try:
        conn = pymysql.connect(host="localhost", user="root", password=pwd)
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS riyadvi_db;")
        print(f"\nSUCCESS! Correct password found: '{pwd}'")
        print("Database 'riyadvi_db' successfully ban gaya hai!\n")
        
        if pwd == "":
            print("Set your .env DATABASE_URL to:")
            print("DATABASE_URL=mysql+pymysql://root:@localhost:3306/riyadvi_db")
        else:
            print("Set your .env DATABASE_URL to:")
            print(f"DATABASE_URL=mysql+pymysql://root:{pwd}@localhost:3306/riyadvi_db")
            
        conn.close()
        success = True
        break
    except Exception as e:
        continue

if not success:
    print("\nNone of the common passwords worked.")
    print("Please reset your password using MySQL Installer or MySQL Command Line Client.")