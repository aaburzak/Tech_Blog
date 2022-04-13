const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const { User, Post, Comment } = require('../../models');


router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password']}
  })
    .then(userData => res.json(userData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes:['id', 'title', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(userData => {
      if (!userData) {
        res.status(404).json({message: 'User Id Not Found'});
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req,res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => {
      req.session.save (() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req,res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(userData => {
    if (!userData) {
      res.status(400).json({ message: 'No user found with that username'});
      return;
    }
    const pwCheck = userData.checkPassword(req.body.password);

    if (!pwCheck) {
      res.status(400).json({ message: 'Incorrect Username or Password'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json ({ user: userData, message: 'You are now logged in'});
    });
  });
});

router.post('/signup', async (req, res) => {
  var newUser = new User ({
    username:req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  await User.findOne({
    where: {
      username: req.body.username,
      email: req.body.email
    }
  }).then(async profile => {
    if (!profile) {
      await newUser.save()
        .then(() => {
          res.status(200).send(newUser);
        })
        .catch(err => {
          console.log("Error:", err.message);
        });
    }else {
      res.send("User already exists");
    }
  }).catch (err => {
    console.log ("Error:", err.message);
  });
});

router.post('/logout', (req,res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put('/:id', (req,res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(userData => {
      if (!userData){
        res.status(404).json({ message:'User Id Not Found'});
        return;
      }
      res.json(userData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(userData => {
    if (!userData) {
      res.status(404).json({message: 'User Id Not Found'});
      return
    }
    res.json(userData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.post('/', async (req, res) => {
//   try {
//     const userData = await User.create(req.body);

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.status(200).json(userData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;
      
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
