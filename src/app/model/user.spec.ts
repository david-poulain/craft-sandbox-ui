import {User} from './user';

describe('User', () => {
  it('is created', () => {
    expect(new User(0, 'Jean-Claude', 'VANDAMME')).toBeTruthy();
  });
});
