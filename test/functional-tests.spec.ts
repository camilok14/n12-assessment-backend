import axios from 'axios';

describe('Functional tests', () => {
  it('should GET health', async () => {
    const result = (await axios.get('http://localhost:3000/health')).data;
    expect(result).toMatchObject({ message: 'n12-assessment-backend is up and running', environment: 'local' });
  });
  it('should create ride not in busy period doing POST', async () => {
    const result = (
      await axios.post('http://localhost:3000/rides', {
        distance: 2,
        startTime: '2021-08-06T13:00:00.000Z',
        duration: 300
      })
    ).data;
    expect(result).toMatchObject({ distance: 2, startTime: '2021-08-06T13:00:00.000Z', duration: 300, fare: 6 });
  });
  it('should create ride starting at 15.30 hrs during une hour so it gets into the afternoon busy period', async () => {
    const result = (
      await axios.post('http://localhost:3000/rides', {
        distance: 10,
        startTime: '2021-08-06T15:30:00.000Z',
        duration: 3600
      })
    ).data;
    expect(result).toMatchObject({ distance: 10, startTime: '2021-08-06T15:30:00.000Z', duration: 3600, fare: 27 });
  });
  it('should create ride starting during night period', async () => {
    const result = (
      await axios.post('http://localhost:3000/rides', {
        distance: 3,
        startTime: '2021-08-06T21:30:00.000Z',
        duration: 400
      })
    ).data;
    expect(result).toMatchObject({ distance: 3, startTime: '2021-08-06T21:30:00.000Z', duration: 400, fare: 9 });
  });
  it('should get paginated rides on page number 1', async () => {
    const { rides, pagination } = (
      await axios.get('http://localhost:3000/rides', {
        params: { documentsPerPage: 2, pageNumber: 1 }
      })
    ).data;
    expect(pagination).toMatchObject({ pageNumber: 1, documentsPerPage: 2, numberOfDocuments: 3 });
    expect(rides).toMatchObject([
      { distance: 3, startTime: '2021-08-06T21:30:00.000Z', duration: 400, fare: 9 },
      { distance: 10, startTime: '2021-08-06T15:30:00.000Z', duration: 3600, fare: 27 }
    ]);
  });
  it('should get paginated rides on page number 2', async () => {
    const { rides, pagination } = (
      await axios.get('http://localhost:3000/rides', {
        params: { documentsPerPage: 2, pageNumber: 2 }
      })
    ).data;
    expect(pagination).toMatchObject({ pageNumber: 2, documentsPerPage: 2, numberOfDocuments: 3 });
    expect(rides).toMatchObject([{ distance: 2, startTime: '2021-08-06T13:00:00.000Z', duration: 300, fare: 6 }]);
  });
});
