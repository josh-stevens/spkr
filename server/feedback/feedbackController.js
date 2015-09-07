var Presentation = require('../presentations/presentationModel.js'),
    Feedback  = require('./feedbackModel.js'),
    Q    = require('q'),
    mongoose = require('mongoose');

    //jwt  = require('jwt-simple');

var presentationId;

module.exports = {

  add: function(req, res, next){
    var presentationId = mongoose.Types.ObjectId(req.params.id),
        feedbackId,
        findPresentation = Q.nbind(Presentation.findOne, Presentation);

    var create = Q.nbind(Feedback.create, Feedback);

    
    findPresentation({_id: presentationId})
    .then(function(presentation){
      if(!presentation){
        next(new Error('Cannot find presentation'))
      }else {
        var newFeedback = {
        _presentation: presentationId,
        organization: req.body.organization,
        clarity: req.body.clarity,
        volume: req.body.volume,
        posture: req.body.posture,
        prepared: req.body.prepared,
        visualAids: req.body.visualAids,
        connect: req.body.connect,
        question: req.body.question,
        overall: req.body.overall
      }

    create(newFeedback).then(function(feedback){
     feedbackId = feedback.id;
    })
      presentation.feedbacks.push(feedbackId)
      presentation.save();
      console.log(presentation);
      res.send("Thanks for providing feedback!");
    }
    })
  },
};