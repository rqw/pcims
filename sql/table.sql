CREATE TABLE pcims_drug_supply (
  id VARCHAR(32) NOT NULL,
  drugstore VARCHAR (32) NULL,
  drug_id VARCHAR(32) NULL,
  retail_price FLOAT NULL,
  cost_price FLOAT NULL,
  position VARCHAR(100) NULL,
  unit_price FLOAT NULL,
  PRIMARY KEY (id));
