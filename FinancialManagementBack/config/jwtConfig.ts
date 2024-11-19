export const jwtConfig = {
  secret: process.env.JWT_PASS || 'your-secret-key',
  expiresIn: '168h',
};
