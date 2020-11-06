import { UserCreationRequest } from './user-creation-request';

describe('UserCreationRequest', () => {
  it('should create an instance', () => {
    expect(new UserCreationRequest('Harry', 'POTTER')).toBeTruthy();
  });
});
