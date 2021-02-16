const {google} = require('googleapis')
const { OAuth2 } = google.auth
const oAuth2Client = new OAuth2(
    '503743076427-mpo7jp1srh6dt3dnqj6220sjv3cnvvap.apps.googleusercontent.com',
    'GIEjCfxxfypXnTgOxpsVzqqU'
    )

oAuth2Client.setCredentials({refresh_token: '1//04Y_voK7GVbBPCgYIARAAGAQSNwF-L9IrwOIt0k5VSXCfAnEktnUzoCYiJTwbOhLKVe6hC-mRB9J7vkjeFDqoArS6DdcDiAJ1ymI',})

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })