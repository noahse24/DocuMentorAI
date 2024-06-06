const authService = require('./services/authService')

exports.register = async (req, res) => {
    try {
        const result = await authService.register(req.body.username, req.body.email, req.body.password);
        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Unable to register user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await authService.login(email, password);
        res.json(response);
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message });
    }
};
