import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const excludedRoutes = ['/auth/login', '/auth/register'];

    if (excludedRoutes.includes(req.path)) {
      return next();
    }

    // Vérifier la présence du token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou invalide');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Vérifier et décoder le token
      const decoded = jwt.verify(token, 'secretKey');
      req.user = decoded;
      next(); // Passer à la suite
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
