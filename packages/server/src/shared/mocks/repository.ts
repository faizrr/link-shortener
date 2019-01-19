export const mockSave = jest.fn();
export const mockFindOne = jest.fn();
export const mockFindOneOrFail = jest.fn();

const mock = {
  save: mockSave,
  findOne: mockFindOne,
  findOneOrFail: mockFindOneOrFail,
};

export default mock;
