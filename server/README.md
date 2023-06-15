This manual contains the configuration and connection to MongoDB on Windows 10 or Windows 11.

## 1. Download MongoDB
Download the latest version of MongoDB from the official website: https://www.mongodb.com/try/download/community

## 2. Install MongoDB
Run the downloaded file and follow the instructions of the installer.

## 3. Install MongoShell
Download the latest version of MongoShell from the official website: https://www.mongodb.com/try/download/shell,
After this unzip the zip file, navigate to bin folder and copy the mongosh.exe file to the bin folder of the installed MongoDB. By default, the path to the bin folder is:
C:\Program Files\MongoDB\Server\6.0\bin

## 4. Create a folder for the database
Create a folder called for the database in the root of the system drive (C:\data\db). If you want to use another folder, then you need to specify the path to it in the configuration file.

## 4. Add MongoDB to the system environment variables
Add the path to the MongoDB bin folder to the system environment variables. To do this, go to the "Control Panel" -> "System and Security" -> "System" -> "Advanced system settings" -> "Environment variables" -> "System variables" -> "Path" -> "Edit" -> "New" and add the path to the bin folder MongoDB (C:\Program Files\MongoDB\Server\6.0\bin).

## To working on mongodb in express follow this manual:
https://mongoosejs.com/docs/index.html