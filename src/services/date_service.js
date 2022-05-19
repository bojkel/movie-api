exports.createDateTimeNow = () => {
    return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
}