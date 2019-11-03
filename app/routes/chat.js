module.exports = (application) => {
    application.get('/chat', (req, res) => res.render('chat'))
    
    application.post('/chat', (req, res) => res.render('chat'))
}