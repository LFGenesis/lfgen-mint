const crypto = require('crypto');

// Güvenli şifre hash'i (bunu environment variable olarak saklayacağız)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);
    
    // Gelen şifreyi hash'le
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');

    // Kullanıcı adı ve şifre kontrolü
    if (username === ADMIN_USERNAME && hashedPassword === ADMIN_PASSWORD_HASH) {
      // Başarılı giriş için token oluştur
      const token = crypto.randomBytes(32).toString('hex');
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          success: true,
          token: token
        })
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ 
        success: false, 
        error: 'Invalid credentials' 
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 