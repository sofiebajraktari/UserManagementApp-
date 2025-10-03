import userReducer, { addUser, updateUser, deleteUser } from '../userSlice';

describe('userSlice reducers', () => {
  const initialState = { list: [], loading: false, error: null, searchQuery: '' };

  it('should add a user at the front', () => {
    const action = addUser({ id: 1, name: 'Alice', email: 'a@a.com', company: { name: 'C1' } });
    const next = userReducer(initialState, action);
    expect(next.list.length).toBe(1);
    expect(next.list[0].name).toBe('Alice');
  });

  it('should update a user', () => {
    const state = { ...initialState, list: [{ id: 2, name: 'Bob', email: 'b@b.com', company: { name: 'C2' } }] };
    const action = updateUser({ id: 2, updatedData: { name: 'Bobby' } });
    const next = userReducer(state, action);
    expect(next.list[0].name).toBe('Bobby');
  });

  it('should delete a user by id', () => {
    const state = { ...initialState, list: [{ id: 3, name: 'Eve' }] };
    const action = deleteUser(3);
    const next = userReducer(state, action);
    expect(next.list.length).toBe(0);
  });
});
