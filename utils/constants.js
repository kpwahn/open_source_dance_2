module.exports = {
    port: 3000,
    secret: 'secret',
    jwt_expires_in: '5h',
    error_messages: {
        encrypt: "Could not encrypt password",
        db_connect: "Could not establish connection to the database",
        db_query: "Could not query the database",
        duplicate: "Email address already exists",
        invalid_email_or_password: "Invalid email or password",
        insertion_error: "Could not insert into the database",
        duplicate_video: "URL already exists"
    },
    success_messages: {
        new_user: "New user successfully created",
        authenticated: "Authenticated",
        insert_video: "Video successfully added"
    },
    expected_bodies: {
        create_new_user: ['email', 'password'],
        create_new_video: ['name', 'url']
    }
}
