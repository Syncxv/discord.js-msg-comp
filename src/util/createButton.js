const { MESSAGE_COMPONENT_TYPE, MESSAGE_BUTTON_STYLES } = require('../constant')
module.exports = (custom_id, label, style = MESSAGE_BUTTON_STYLES.PRIMARY) => {
    return {
        type: MESSAGE_COMPONENT_TYPE.BUTTON,
        label,
        style,
        custom_id,
    }
}