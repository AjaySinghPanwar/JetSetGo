import axios, {AxiosResponse} from 'axios';

// For fetching all flights data
export const fetchAllFlights = async () => {
  try {
    let res: AxiosResponse<any, any> = await axios({
      method: 'get',
      url: 'https://api.npoint.io/378e02e8e732bb1ac55b',
      responseType: 'json',
    });

    if (res.status === 200) {
      return res.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};
