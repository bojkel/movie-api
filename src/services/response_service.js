exports.getAllMessage = (obj, response) => {
    return ({
        ServerMessage: 'Successfully fetched all ' + obj + 's',
        Response: response
    })
}

exports.getByProperty = (obj, property, response) => {
    return ({
        ServerMessage: 'Successfully fetched ' + obj + ' by ' + property ,
        Response: response
    })
}

exports.getErrorMessage = (obj, isGetAll, error) => {

    if(isGetAll){
        return ({
            ServerMessage: 'Could not fetch ' + obj + 's' ,
            Error: error
        })
    }

    else{
       return ({
            ServerMessage: 'Could not fetch ' + obj ,
            Error: error
        })
    }
}

exports.deleteByPropertyMessage = (obj, property, response) => {
    return ({
        ServerMessage: 'Successfully deleted ' + obj + ' by ' + property + '. Goodbye.',
        Response: response
    })
}

exports.deleteErrorMessage = (obj, error) => {
    return ({
        ServerMessage: 'Could not delete ' + obj,
        Error: error
    })
}

exports.postMessage = (obj, response) => {
    return ({
        ServerMessage: obj + ' created.',
        Response: response
    })
}

exports.postErrorMessage = (obj, error) => {
    return({
        ServerMessage: 'Could not create ' + obj,
        Error: error
    })
}

exports.registerMessage = (name, response, token) => {
    return({
        ServerMessage: 'Successfully registered. Hello, ' + name + '!',
        Response: response,
        Token: token
    })
}

exports.registerErrorMessage = ( error ) => {
    return({
        ServerMessage: 'Could not register',
        Error: error
    })
}

exports.loginMessage = (user, token) => {
    return({
        ServerMessage: 'Logged in! The movie-api greets you again, ' + user.username + '!',
        User_ID: user._id,
        Username: user.username,
        Name: user.name,
        Token: token
    })
}

exports.loginErrorMessage = () => {
    return({
        Error: 'Could not login.'
    })
}

exports.alreadyExistsMessage = ( obj ) => {
    return({
        ServerMessage: obj +  ' already exists.'
    })
}

exports.doesntExistMessage = ( obj ) => {
    return({
        ServerMessage: obj + ' doesnt exist.'
    })
}

exports.noDataMessage = (obj) => {
    return({
        ServerMessage: 'No data for ' + obj
    })
}

exports.updateMessage = (obj) => {
    return({
        ServerMessage: 'Updated the ' + obj
    })
}

exports.notUpdatedMessage = (obj) => {
    return({
        ServerMessage: 'Could not update the ' + obj
    })
}

exports.updateProfilePictureMessage = (username) => {
    return({
        ServerMessage: 'Updated the profile picture for ' + username + '. Lookin good!'
    })
}

exports.updatePasswordMessage = (username) => {
    return({
        ServerMessage: 'Updated the password for ' + username
    })
}

exports.notAuthorizedMessage = (authError) => {
    return({
        ServerMessage: 'You are not authorized. Login first. Error: ', authError
    })
}

exports.greetingsMessage = () => {
    return{
        MovieAPi: "Greetings, to the movie api! Happy hacking!"
    }
}

exports.notLongEnoughPasswordMessage = (characters) => {
    return {
        ServerMessage: `Password is not long enough. It should be at least ${characters} characters long`
    }
}

exports.notValidEmailMessage = (email) => {
    return {
        ServerMessage: `${email} is not a valid email. Use a real one.`
    }
}

exports.addedToFavouritesMessage = (response) => {
    return {
        ServerMessage: `Series added to your favourites!`,
        Response: response
    }
}

exports.removedFromFavouritesMesasage = () => {
    return {
        ServerMessage: `Series removed from your favourites!`,
    }
}

exports.alreadyIsInFavouritesMessage = () => {
    return {
        ServerMessage: `You already have that series in your favourites`
    }
}