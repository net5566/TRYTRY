import { Router } from 'express';
import { InObj, InDir } from '../models';

const inAppRouter = new Router();

<<<<<<< HEAD
inAppRouter.get('/objs', (req, res) => {
  InObj.find().exec((err, objs) => {
=======
inAppRouter.get('/objs/:user', (req, res) => {
  const { user } = req.params;
  InObj.find({ user: user }).exec((err, objs) => {
>>>>>>> c354a6210b05b97bcd4a18c953ca5588218abb22
    if (err) return res.status(500).send(err);
    return res.json(objs);
  });
});

<<<<<<< HEAD
inAppRouter.get('/dirs', (req, res) => {
  InDir.find().exec((err, dirs) => {
=======
inAppRouter.get('/dirs/:user', (req, res) => {
  const { user } = req.params;
  InDir.find({ user: user }).exec((err, dirs) => {
>>>>>>> c354a6210b05b97bcd4a18c953ca5588218abb22
    if (err) return res.status(500).send(err);
    return res.json(dirs);
  });
});

inAppRouter.post('/obj', (req, res) => {
<<<<<<< HEAD
  const { nm, url } = req.body;
  InObj.create({ nm, url }, (err, obj) => {
    if (err) return res.status(500).send(err);
    return res.json(obj);
=======
  const { user, nm, url } = req.body;
  InObj.create({ user, nm, url }, (err, obj) => {
    if (err) return res.status(500).send(err);
    return res.json({ _id: obj._id });
>>>>>>> c354a6210b05b97bcd4a18c953ca5588218abb22
  });
});

inAppRouter.post('/dir', (req, res) => {
<<<<<<< HEAD
  const { nm } = req.body;
  const elementArr = new Array();
  InDir.create({ nm, elementArr }, (err, dir) => {
    if (err) return res.status(500).send(err);
    return res.json(dir);
=======
  const { user, nm } = req.body;
  const elementArr = new Array();
  InDir.create({ user, nm, elementArr }, (err, dir) => {
    if (err) return res.status(500).send(err);
    return res.json({ _id: dir._id });
>>>>>>> c354a6210b05b97bcd4a18c953ca5588218abb22
  });
});

inAppRouter.put('/dir/:id', (req, res) => {
  const { id } = req.params;
  const { action, nm, url } = req.body;
  const callbackFtn = (err, rslt) => {
    if (err) return res.status(500).send(err);
    return res.json({
      action: action,
      nm: nm,
      url: url,
    });
  };
  if (action === 'push') InDir.update(
    { _id: id },
    { $push: { elementArr: { nm, url } } },
    callbackFtn
  ); else if (action === 'pull') InDir.update(
    { _id: id },
    { $pull: { elementArr: { nm: nm } } },
    callbackFtn
  );
});

inAppRouter.delete('/obj/:id', (req, res) => {
  const { id } = req.params;
  InObj.findByIdAndRemove(id, err => {
    if (err) return res.status(500).send(err);
    return res.json({
      msgBack: `Object ${id} has been successfully removed.`,
    });
  });
});

inAppRouter.delete('/dir/:id', (req, res) => {
  const { id } = req.params;
  InDir.findByIdAndRemove(id, err => {
    if (err) return res.status(500).send(err);
    return res.json({
      msgBack: `Directory ${id} has been successfully removed.`,
    });
  });
});

export default inAppRouter;
