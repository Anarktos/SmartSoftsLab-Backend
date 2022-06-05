import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../entities/User';

const options = {
  // jwtFromRequest: ExtractJwt.fromAuthHeader(),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}

const jwtStrategy = new Strategy(options, async (payolad, done): Promise<any> => {
  const user = await User.findOneBy({ id: payolad.id });
  if (!user) return done('error', false);
  return done(null, user)
})

passport.use('jwt', jwtStrategy);

export default passport;