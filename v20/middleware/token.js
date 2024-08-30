const jwt = require("jsonwebtoken");


exports.generateToken = async (user) => {
    const token = await jwt.sign({ id: user.id },
        "bezkoder-secret-key",
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
        console.log(token)
        return {token: token, createdAt: new Date()}
}