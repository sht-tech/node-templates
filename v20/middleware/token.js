const jwt = require("jsonwebtoken");


exports.generateToken = async (user) => {
    const token = jwt.sign({ id: user.id },
        "bezkoder-secret-key",
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
}