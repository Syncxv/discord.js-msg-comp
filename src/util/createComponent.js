const { MESSAGE_COMPONENT_TYPE, } = require('../constant')
module.exports = (_components, ) => {
    return [
                {
                    "type": MESSAGE_COMPONENT_TYPE.ACTION_ROW,
                    components: [_components]
                }
        ]
    
}