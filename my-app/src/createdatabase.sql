-- Create Project table
CREATE TABLE Project (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255)
);

-- Create Sample table
CREATE TABLE Sample (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    FamilyName INT,
    ProductName VARCHAR(255),
    Name VARCHAR(255)
);


-- Create InputCondition table
CREATE TABLE InputCondition (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Parameter VARCHAR(255),
    Min FLOAT,
    Typical FLOAT,
    Max FLOAT,
    TimeBetweenPoints FLOAT
);

-- Create TestPoint table
CREATE TABLE TestPoint (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Value FLOAT,
    Unit VARCHAR(255)
);

-- Create TestPointCollections table
CREATE TABLE TestPointCollections (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    InputConditionId INT,
    FOREIGN KEY (InputConditionId) REFERENCES InputCondition (Id)
);

-- Create mapping tables for relationships with List references
CREATE TABLE SampleList (
    SampleId INT,
    TestPointCollectionId INT,
    FOREIGN KEY (SampleId) REFERENCES Sample (Id),
    FOREIGN KEY (TestPointCollectionId) REFERENCES TestPointCollections (Id)
);

CREATE TABLE TestPointList (
    TestPointId INT,
    TestPointCollectionId INT,
    FOREIGN KEY (TestPointId) REFERENCES TestPoint (Id),
    FOREIGN KEY (TestPointCollectionId) REFERENCES TestPointCollections (Id)
);
