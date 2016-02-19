var express = require('express');
var router = express.Router();
var Group = require('../models/group');
var User = require('../models/user');
var Question = require('../models/question');

router.get('/show/:id', function (req, res, next) {
  if (req.user) {
    Group.findById(req.params.id).exec(function (err, group) {
      if (err) {
        res.redirect('/', 301);
        throw err;
      } else {
        if (group.ownedBy._id.equals(req.user._id)) {
          Question.find({"askedBy._id": req.user._id}).exec(function (err, questions) {
            res.render('Group/showOwner', {
              title: "Drawcerty | Group",
              group: group,
              questions: questions,
              user: {_id: req.user._id},
              base_protocol: req.protocol,
              base_host: req.get('host')
            });
          });
        } else {

          var isMember = function(user, group){
            return(group.members.some(function(curr, ind, arr){
              return curr._id.equals(user._id);
            }));
          };

          var userIsMember = isMember(req.user, group) || false ;

          if (userIsMember) {
            res.render('Group/show', {
              group: group,
              title: "Drawcery | Group"
            });
          } else {
            res.render('Group/showNonMember', {
              group: group,
              user: {
                _id: req.user._id,
                title: "Drawcery | Join Group"
              }
            });
          }
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
    about: req.body.about,
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
        group.members.push(safeMember);
        group.save(function (err, g) {
          res.redirect('/groups/show/' + group._id, 301);
        });
      });
    }
  });
});

router.post('/newNotification', function (req, res, next) {
  var d = Date.now();
  var not = { //
    title: req.body.title,
    text: req.body.text,
    date: d
  };
  Group.findById(req.body.group_id).exec(function (err, group) {
    if (err) throw err;
    group.notifications.push(not);
    group.save(function (err, g) {
      if (err) throw err;
      res.redirect('/groups/show/' + g._id);
    });
  });
});

module.exports = router;
