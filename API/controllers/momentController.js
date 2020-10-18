const Moment = require("../models/momentModel");
var mongoose = require('mongoose');
class momentClass {
    constructor() {
        this.createMoment = this.createMoment.bind(this);
        this.getMoments = this.getMoments.bind(this);
        this.getMoment = this.getMoment.bind(this);
        this.deleteMoment = this.deleteMoment.bind(this);
        this.updateMoment = this.updateMoment.bind(this);
    }
    async createMoment(req, res, next) {
        try {
            let addBody = {
                title: req.body.title,
                comment: req.body.comment,
                photoUrl: req.body.photoUrl,
                tags: req.body.tags,
                createdBy: mongoose.mongo.ObjectId(req.body.createdBy)
            };
             
            const moment = new Moment(addBody);
            return moment
                .save()
                .then(result => {
                    return res.status(200).json({
                        message: "Moment created!",
                        result: result,
                        status: 200
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        message: "Error to save Moment",
                        errors: err,
                        status: 500
                    });
                });

        } catch (error) {
            return res.status(500).json({
                message: "Error to save record",
                error: error,
                status: 500
            });
        }
    }
    async getMoments(req, res, next) {
        try {
            const pageSize = +req.query.pagesize;
            const currentPage = +req.query.page;
            const MomentQuery = Moment.find().populate({ path: 'createdBy', select: 'userName' });
            let fetchedMoments;
            if (pageSize && currentPage) {
                MomentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize).sort('createdAt');
            }
            MomentQuery
                .then(documents => {
                    fetchedMoments = documents;
                    return Moment.count();
                })
                .then(count => {
                    res.status(200).json({
                        message: "Moments fetched successfully!",
                        data: fetchedMoments,
                        totalMoments: count,
                        status: 200
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Moments failed!",
                        error: error,
                        status: 500
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to get record",
                error: error,
                status: 500
            });
        }
    }
    
    async getMoment(req, res, next) {
        try {
            if (!req.query.id) {
                return res.status(404).json({
                    message: "Please enter request parameter!",
                    status: 404
                });
            }
            await Moment.findById(req.query.id)
                .then(moment => {
                    if (moment) {
                        res.status(200).json({
                            moment: moment,
                            status: 200
                        });
                    } else {
                        res.status(404).json({
                            message: "Moment not found!",
                            status: 404
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Fetching Moment failed!",
                        error: error,
                        status: 500
                    });
                });
        } catch (error) {
            return res.status(500).json({
                message: "Error to get record",
                error: error,
                status: 500
            });
        }

    }
    async deleteMoment(req, res, next) {
        try {
            await Moment.deleteOne({ _id: req.query.id })
                .then(result => {
                    if (result.n > 0) {
                        res.status(200).json({
                            message: "Deletion successful!",
                            status: 200
                        });
                    } else {
                        res.status(404).json({
                            message: "Deletion Faild!",
                            status: 404
                        });
                    }
                })
                .catch(error => {
                    res.status(500).json({
                        message: "Delete  Field failed!",
                        status: 500
                    });
                });
        } catch (error) {
            res.status(500).json({
                message: "error to delete the field",
                error: error,
                status: 500
            })
        }
    }
    async updateMoment(req, res, next) {
        if (!req.query.id) {
            return res.status(404).json({
                message: "Please enter request parameter!",
                status: 404
            });
        }

        let updateBody = {
            _id: req.query.id,
            title: req.body.title,
            comment: req.body.comment,
            tags: req.body.tags,
            photoUrl: req.body.photoUrl,
            updatedBy: mongoose.mongo.ObjectId(req.body.updatedBy)
        }
        const moment = new Moment(updateBody);
        await Moment.updateOne({ _id: req.query.id }, moment)
            .then(result => {
                if (result.n > 0) {
                    res.status(200).json({
                        message: "Moment Updated successfully!",
                        status: 200
                    });
                } else {
                    res.status(404).json({
                        message: "Record not found",
                        status: 404
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Couldn't udpate moment!",
                    error: error,
                    status: 500
                });
            });
    }

}

var momentCl = new momentClass();
module.exports = momentCl;