const fs = require('fs')

exports.deletFile = (filePath) => {
    if (fs.existsSync(filePath)) {
        //file exists
        return fs.unlink(filePath, error => {
            if(error) {
                throw(error)
            }
        })
    } else {
        return
    }
    
}