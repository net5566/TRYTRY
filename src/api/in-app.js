import { Router } from 'express';
import { InObj, InDir } from '../models';

const inAppRouter = new Router();

inAppRouter.get('/objs', (req, res) => {
  InObj.find().exec((err, objs) => {
    if (err) return res.status(500).send(err);
    return res.json(objs);
  });
});

inAppRouter.get('/dirs', (req, res) => {
  InDir.find().exec((err, dirs) => {
    if (err) return res.status(500).send(err);
    return res.json(dirs);
  });
});

inAppRouter.post('/obj', (req, res) => {
  const { nm, url } = req.body;
  InObj.create({ nm, url }, (err, obj) => {
    if (err) return res.status(500).send(err);
    return res.json(obj);
  });
});

inAppRouter.post('/dir', (req, res) => {
  const { nm } = req.body;
  const elementArr = new Array();
  InDir.create({ nm, elementArr }, (err, dir) => {
    if (err) return res.status(500).send(err);
    return res.json(dir);
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
