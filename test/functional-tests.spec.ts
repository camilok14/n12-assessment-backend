import axios from 'axios';

describe('Functional tests', () => {
  it('should GET health', async () => {
    const result = (await axios.get('http://localhost:3000/health')).data;
    expect(result).toMatchObject({ message: 'n12-assessment-backend is up and running', environment: 'local' });
  });
});
