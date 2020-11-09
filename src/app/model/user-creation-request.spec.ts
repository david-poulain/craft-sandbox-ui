import {UserCreationRequest} from './user-creation-request';

describe('UserCreationRequest', () => {
  it('is created', () => {
    expect(new UserCreationRequest('Harry', 'POTTER')).toBeTruthy();
  });
});
