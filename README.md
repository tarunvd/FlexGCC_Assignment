Setup Instructions:

1. Run the `SQL Schema\InitializeDatabase.sql` query in local SQL Server to create the database and table.
2. In `appsettings.json` update the `Server` configuration to match SQL Server instance name.
3. Open and run the `WorkRequestTracker.slnx` solution to start the API application.
4. The UI application runs well on node version `v24.13.1`. Run the UI application by first running `yarn` in the folder `UI` to restore modules, then run `yarn dev` in the same folder.
