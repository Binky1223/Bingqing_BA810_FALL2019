var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
    Gadget = mongoose.model('gadgets');



module.exports = function (app, config) {
    app.use('/api', router);

    //Get all gadgets
    router.route('/gadgets').get((req, res, next) => {
        logger.log('info', 'Get all gadgets');
        var query = Gadget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Gadgets" });
                }
            })
            .catch(err => {
                return next(err);
            });
    }); 

    //Get a gadget based on its id
    router.route('/gadgets/:id').get((req, res, next) => {
        logger.log('info', 'Get gadget %s', req.params.id);

        Gadget.findById(req.params.id)
            .then(gadget => {
                if (gadget) {
                    res.status(200).json(gadget);
                } else {
                    res.status(404).json({ message: "No gadget found" });
                }
            })
            .catch(error => {
                return next(error);
            });
        });
        
    //Create gadget
    router.route('/gadgets').post((req, res, next) => {
        logger.log('info', 'Create a Gadget');
        
        var gadget = new Gadget(req.body);
        gadget.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });
          
        });
       
    //	Update a gadget
    router.route('/gadgets/:id').put((req, res, next) => {
        logger.log('info', 'Get gadget %s', req.params.id);

        Gadget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(gadget => {
                res.status(200).json(gadget);
            })
            .catch(error => {
                return next(error);
            });
    });

    //Delete a gadget
    router.route('/gadgets/:id').delete((req, res, next) => {
        logger.log('info', 'Delete a gadget', req.params.id);

        Gadget.remove({ _id: req.params.id })
            .then(gadget => {
                res.status(200).json({ msg: "A Gadget Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });
};
