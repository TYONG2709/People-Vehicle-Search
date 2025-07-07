## Adding database into supabase
Supabase have a more efficient way to add data into the database by importing the csv files into it's respective table (People & Vehicles). But before that, we have to create tables with correct attributes first.

#### People table
In order to add this into supabase:
```
CREATE TABLE "People" (
	"PersonID"	INTEGER,
	"Name"	TEXT,
	"Address"	TEXT,
	"DOB"	TEXT,
	"LicenseNumber"	TEXT,
	"ExpiryDate"	TEXT,
	PRIMARY KEY("PersonID" AUTOINCREMENT)
);
```
I created the table in the project by this way: <br /> 
<image src="../Images/People_table_supabase.png" alt="how I add the attributes into 'People' table" height="275"></image><br />
All the attributes are with datatype `text` and accept `null` default value except for `PersonID`. `PersonID` have `integer` as datatype and it is the <strong>Primary Key</strong> of this table, therefore it can't have `null` default value. Besides that to make it have the property of `AUTOINCREMENT`, I added `nextval('"People_PersonID_seq"'::regclass)` so that there will be a distinct value for `PersonID` if no input for it when inserting a data.

#### Vehicles table
In order to add this into supabase:
```
CREATE TABLE "Vehicles" (
	"VehicleID"	TEXT,
	"Make"	TEXT,
	"Model"	TEXT,
	"Colour"	TEXT,
	"OwnerID"	INTEGER,
	FOREIGN KEY("OwnerID") REFERENCES "People"("PersonID"),
	PRIMARY KEY("VehicleID")
);
```
I created the table in the same project by this way: <br />
<image src="../Images/Vehicles_table_supabase.png" alt="how I add the attributes into 'Vehicles' table" height="250"></image><br />
The attribute `VehicleID` is the <strong>Primary Key</strong> of the table. 

The attribute `OwnerID` is a <strong>Foreign Key</strong>, with a reference to attribute `PersonID` in another table `People`. This is how I references them: <br />
<image src="../Images/Vehicles_table_supabase_foreignKey.png" alt="how I references the foreign key 'OwnerID'" height="275"></image><br />
Foreign key must have some constraints to follow. This is the constraints I added into this foreign key: <br />
<image src="../Images/Vehicles_table_supabase_referenceRestrictions.png" alt="how I add integrity constraints to a foreign key" height="250"></image><br />
I added `Cascade` to it so that if `PeopleID` get updated the `OwnerID` will also follow the value changed. I also added `Nullity` to it so that if a data `PeopleID` get deleted and it referenced to it, `OwnerID` will set to `NULL` so the entire row still exists and the operations can be performed.

The rest of the attributes have `text` datatype and they can accept a `null` default value. 

##### [back to main page](../README.md)