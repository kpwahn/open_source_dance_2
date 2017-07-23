let sql_statements = require('../../../utils/database_utils/sql_statements');
let connection = require('../../../utils/database_utils/database_connection');
let post_request_util = require('../../../utils/request_utils/post_request_util');
let status_codes = require('../../../utils/request_utils/status_codes');
let constants = require('../../../utils/constants');

module.exports = function (req, res) {
    let request_check = post_request_util.checkReqBody(req, constants.expected_bodies.create_new_video);

    if (!request_check.has_correct_keys) {
        res.status(status_codes.bad_request);
        res.json({missing_keys: request_check.missing_keys});
    } else {
        connection.getConnection(function (err, connection) {
            if (err) {
                res.status(status_codes.internal_server_error);
                res.json({message: constants.error_messages.db_connect, err: err});
            } else {
                // 1. MAKE SURE THAT YOUTUBE VIDEO (URL) DOESN'T EXIST
                connection.query(sql_statements.select_video, [req.body.url], function (err, rows) {
                    if (err) {
                        res.status(status_codes.internal_server_error);
                        res.json({message: constants.error_messages.db_query, err: err});
                    } else {
                        if (rows.length === 0) {
                            // 2. INSERT THE VIDEO INTO THE VIDEO_TABLE
                            connection.query(sql_statements.insert_video, [req.body.name, req.body.url], function (err, rows) {
                                if (err) {
                                    res.status(status_codes.internal_server_error);
                                    res.json({message: constants.error_messages.db_query, err: err});
                                } else {
                                    // 3. CONNECT THE VIDEO TO THE USER
                                    if (rows.affectedRows === 1) {
                                        connection.query(sql_statements.insert_user_video, [req.decoded.email, req.body.url], function (err, rows) {
                                            if (err) {
                                                res.status(status_codes.internal_server_error);
                                                res.json({message: constants.error_messages.db_query, err: err});
                                            } else {
                                                res.status(status_codes.ok);
                                                res.json({message: constants.success_messages.insert_video, err: err});
                                            }
                                            connection.release();
                                        });
                                    } else {
                                        res.status(status_codes.ok);
                                        res.json({message: constants.error_messages.insertion_error, err: err});
                                    }
                                }
                            });
                        } else {
                            res.status(status_codes.conflict);
                            res.json({ message: constants.error_messages.duplicate_video, err: err});
                        }
                    }
                });
            }
        });
    }
}