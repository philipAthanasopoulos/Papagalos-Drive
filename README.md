# A social school note sharing page

This is a more sophisticated rework of the [uni-drive](https://github.com/philipAthanasopoulos/uni-drive) project using

* A PostgreSQL&MongoDB database 🐘🪴
* A Java Spring-Boot REST API ☕🍃
* A React frontend :electron:

**[Try it here](https://papagalos-drive.web.app/)**  


![diagram-export-26-09-2024-10_20_46](https://github.com/user-attachments/assets/f1ca984e-ffae-4eba-a0d3-629101928270)


    

<h2>Database architecture</h2>  
<p>
  The project uses both SQL and a NoSQL database. A PostgreSQL database is used to store users, folders and files  
  relationships and metadata. The binary files (images, videos, documents) are stored in a MongoDB database. This decision was made dew to the fact   
  that file data is expected to increase way faster that the metadata of other domain objects. This brings a requirement for easy horisontal scaling  
  which is a characteristic of NoSQL databases. In order create a "relationship" between the SQL and NoSQL databases the MongoID of each blob file  
  exists as a field in the notes' table.
</p>




![diagram-export-26-08-2024-19_10_08](https://github.com/user-attachments/assets/6cf77a4e-acd6-49d7-8f19-246b21ab794d)


