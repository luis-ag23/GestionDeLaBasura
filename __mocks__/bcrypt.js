module.exports = {
  genSalt: jest.fn(async () => 'salt'),
  hash: jest.fn(async (password, salt) => 'hash')
};
