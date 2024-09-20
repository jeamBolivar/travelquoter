const crypto = require('crypto');


const encryptionKey = process.env.ENCRYPTION_KEY;
const initVector = process.env.INIT_VECTOR;
const keySize = parseInt(process.env.KEY_SIZE);

class Encryption {

  constructor() {

    this.encryptionKey = Buffer.from(encryptionKey);
    this.initVector = Buffer.from(initVector);
    this.keySize = keySize

  }

  rijndaelEncryptString(plainText) {

    const key = crypto.pbkdf2Sync(this.encryptionKey, this.initVector, 1000, this.keySize, 'sha256');
    const aes = crypto.createCipheriv('aes-256-cbc', key, this.initVector);
    let cipherText = aes.update(this._pad(plainText), 'utf8', 'base64');
    cipherText += aes.final('base64');
    return cipherText;

  }

  rijndael_decrypt_string(cipherText) {

    const key = crypto.pbkdf2Sync(this.encryptionKey, this.initVector, 1000, this.keySize, 'sha256');
    const aes = crypto.createDecipheriv('aes-256-cbc', key, this.initVector);
    let decryptedText = aes.update(cipherText, 'base64', 'utf8');
    decryptedText += aes.final('utf8');
    return this._unpad(decryptedText);

  }

  _pad(s) {

    const padding = 16 - (s.length % 16);
    const paddingBuffer = Buffer.alloc(padding, padding);
    const stringBuffer = typeof s === 'string' ? Buffer.from(s, 'utf8') : s;
    return Buffer.concat([stringBuffer, paddingBuffer]);

  }

  _unpad(s) {

    const paddingLength = s[s.length - 1];
    return s.slice(0, s.length - paddingLength);

  }

}

module.exports = Encryption