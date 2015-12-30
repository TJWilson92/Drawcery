var express = require('express');
var router = express.Router();
var Group = require('../models/group');
var User = require('../models/user');

router.get('/show/:id', function (req, res, next) {
  if (req.user) {
    Group.findById(req.params.id).exec(function (err, group) {
      if (err) {
        res.redirect('/', 301);
        throw err;
      } else {
        if (group.ownedBy._id.equals(req.user._id)) {
          res.render('Group/showOwner', {
            title: "Drawcerty | Group",
            group: group,
            user: {_id: req.user._id}
          });
        } else if (groups.members.length > 0) {
          var userIsMember = Group.members.any(function (curr, ind, arr) {
            return curr._id.equals(req.user._id);
          });
          if (userIsMember) {
            res.render('Group/show', {
              group: group,
              title: "Drawcery | Group"
            });
          }
        } else {
          res.render('Group/showNonMember', {
            group: group,
            user: {_id: req.user._id}
          });
        }
      }
    });
  } else {
    res.render('Group/notloggedin', {
      title: "Drawcery | Please log in"
    });
  }
});

router.post('/new', function (req, res, next) {
  safeOwner = new User({
    firstname: req.user.firstname,
    surname: req.user.surname,
    email: req.user.email,
    _id: req.user._id
  });

  var newGroup = new Group({
    name: req.body.groupName,
    ownedBy: safeOwner
  });

  newGroup.save(function (err, g) {
    if (err) {
      res.redirect('/', 301);
      throw(err);
    } else {
      res.redirect('/groups/show/' + g._id);
    }
  });
});

router.post('/joingroup', function (req, res, next) {
  console.log(req.body);
  User.findById(req.body.user_id).exec(function (err, user) {
    if (err) {
      res.redirect('/', 301);
      throw(err);
    } else {
      Group.findById(req.body.group_id).exec(function (err, group) {
        if (err) {
          throw err;
        }
        var safeMember = new User({
          firstname: req.user.firstname,
          surname: req.user.surname,
          email: req.user.email,
          _id: req.user._id
        });
        console.log(safeMember);
        group.members.push(safeMember);
        group.save(function (err, g) {
          res.redirect('/groups/show/' + group._id, 301);
        });
      });
    }
  });
});

module.exports = router;