const message = require('./model/message');
const recipient = require('./model/recipient');

module.exports = (req, res, next) => {
    let msg = req.body;

    let messageDetails = message.find({ deleted_status: false });
    let recipientList = recipient.find().sort({ priority: -1 });
    Promise.all([messageDetails, recipientList])
        .then(([messageDetails, rList]) => {

            let msgqueued = msg.length;
            let totalmsg = (messageDetails.length == 0) ? msg.length : messageDetails.length + msg.length;

            // add current priority
            rList = rList.map(({ recipient, priority, totalMessageReceived }) => (

                { recipient, priority, totalMessageReceived, cPriority: ((totalMessageReceived / totalmsg) * 100) }

            ));
                // sort array by priority if priority same check with current prioirty low one first
            rList.sort((a, b) => (b.priority > a.priority) ? 1 : (b.priority === a.priority) ? ((a.cPriority > b.cPriority) ? 1 : -1) : -1)

            for (i = 0; i <= rList.length; i++) {

                let rTP = (((rList[i].totalMessageReceived) / totalmsg) * 100);
                let rPriority = rList[i].priority;
                if (rTP <= rPriority) {

                    let total = rList[i].totalMessageReceived += msgqueued;
                    rList[i].cPriority = (rList[i].totalMessageReceived / totalmsg) * 100;
                    
                    recipient.findOneAndUpdate({ recipient: rList[i].recipient },
                        { $set: { totalMessageReceived: total } }, { new: true }
                    ).then(res => {
                        console.log('working');
                    })

                    break;
                }
            }

            console.log(totalmsg);

            // let rList = recipientList.map(({ recipient, priority, totalMessageReceived }) => (

            //     { recipient, priority, totalpe: ((totalMessageReceived / totalmsg) * 100) }

            // ));

            // let rList = recipientList.map(result => {

            //     if (((totalMessageReceived / totalmsg) * 100) < priority) {
            //         return totalMessageReceived + msg.length
            //     }

            //     console.log(result.priority);

            // });
            // console.log(rList);




            // let crmessage
            let crmessage = message.create(msg);

            return Promise.all([crmessage, rList]);
        })
        .then(([crmessage, rList]) => {

            req.success = true;
            req.result = rList;
            next();
        })
        .catch(err => {
            next(err);
        });
};