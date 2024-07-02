First Clone the project.

Step 1. Run npm install && npm start

Step 2. Add .env file
PORT=3000
PASSWORD=Hnwxn7SqV5nW5aj3
USERNAME=tyagivishal3210
SALT=dhifbfowibfwibiwe3129842ewb
JWT_SECRET=efiofgeroifbwifbwei

PG_PASSWORD=12345
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=node-crud-app
PG_USER=postgres

//used for google Oauth2
GOOGLE_CLIENT_ID=    
GOOGLE_CLIENT_SECRET=

Step 3.  create account table in postgres

Step 4. For authorisation purpose I consider vishal@gmail.com email as a admin email So you have to create this user with same email.

Step 5. Auth Routes => A. api/auth/login
                       B. api/auth/register for proper validation (password Encryption)

Step 6.  User Routes => A. api/v1/getUsers
                        B. api/v1/deleteUser     => with auth (Only admin can delete)
                        C. api/v1/updateUser/id  and paylaod { first_name : "" , last_name : "" }  => with auth (Only admin and Same user can update name )


Step 7. Google Auth => "/"
                        



                        
                       

