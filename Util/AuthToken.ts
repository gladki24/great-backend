import jwt from 'jsonwebtoken';

export function authToken(token): Promise<any> {
    return new Promise<any>((resolve, reject) => {
       jwt.verify(token, process.env.JWT_SERCRET, (err, decodedToken) => {
          if (err || !decodedToken) {
              reject(err);
          } else {
              resolve(decodedToken);
          }
       });
    });
}
