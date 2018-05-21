import * as jwt from 'jsonwebtoken';

export function signToken(data: any): string | boolean {
    if (data) {
        return jwt.sign(JSON.stringify(data), 'secretTokenGreat');
    } else {
        return false;
    }
}
