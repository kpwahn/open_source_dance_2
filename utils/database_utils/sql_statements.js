module.exports = {
    select_email : 'SELECT * FROM user_table WHERE email = ?;',
    insert_email: 'INSERT INTO user_table (email, password) VALUES (?, ?);',
    insert_video: 'INSERT INTO video_table (name, url, style_id, difficulty_id) ' +
    'VALUES (?, ?, ' +
    '(SELECT style_id FROM style_table WHERE name = ?),' +
    '(SELECT difficulty_id FROM difficulty_table WHERE difficulty = ?)' +
    ');',
    select_video: 'SELECT * FROM video_table WHERE url = ?;',
    insert_user_video: 'INSERT INTO user_video_table(user_id, video_id) VALUES( (SELECT user_id FROM user_table WHERE email = ?), (SELECT video_id FROM video_table WHERE url = ?));'
};