module.exports = {
    select_email : 'SELECT * FROM user_table WHERE email = ?;',
    insert_email: 'INSERT INTO user_table (email, password) VALUES (?, ?);',
    insert_video: 'INSERT INTO video_table (name, url) VALUES (?, ?);',
    select_video: 'SELECT * FROM video_table WHERE url = ?;',
    insert_user_video: 'INSERT INTO user_video_table(user_id, video_id) VALUES( (SELECT user_id FROM user_table WHERE email = ?), (SELECT video_id FROM video_table WHERE url = ?));'
};

