const express = require('express');
const connectionPool = require('../utils/utils.db');
const {errorHandler} = require('../utils/utils.errorHandler');

const getUsers = (req, res) => {
  connectionPool.query('SELECT * FROM account', (err, result) => {
    if (err) return res.status().json(err);
    res.status(200).json(result.rows);
  });
}

const updateUser = (req, res, next) => {
  const {userId, role} = req.user;
  let exe = false;
  const id = parseInt(req.params.id);

  if(role === "ADMIN") {
    exe = true;
  } else if(id === userId) {
    exe = true;
  } else{
    return res.status(401).json({'message':'Unauthorised'});
  }

  const { first_name, last_name } = req.body;
  connectionPool.query('SELECT id FROM account WHERE id = $1', [id], (err, data) => {
    if(err) return res.status(400).json({err});
    if(data.rowCount){
      connectionPool.query(
        'UPDATE account SET first_name = $1, last_name = $2 WHERE id = $3',
        [first_name, last_name, id],
        (err, result) => {
          if (err) return res.status(400).json(err);
          res.status(200).json({'message':'User Modified'});
        }
      )
    } else{
      return next(errorHandler(404, 'User Not Exist'));
    }
  });
}

const deleteUser = (req, res, next) => {
  const {userId, role} = req.user;
  if(role !== "ADMIN") {
    return res.status(401).json('Unauthorised');
  }

  if(userId === req.body.id) {
    return res.status(401).json('Unauthorised');
  }

  connectionPool.query('SELECT id FROM account WHERE id = $1', [req.body.id], (err, data) => {
    if(err) return res.status(400).json({err});
    if(data.rowCount){
      connectionPool.query('DELETE FROM account WHERE id = $1', [req.body.id], (err, result) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json({"message": "User Removed"});
      });
    } else {
      return next(errorHandler(404, 'User Not Exist'));
    }
  });
}

module.exports = {
  getUsers,
  updateUser,
  deleteUser
};
