import axios from 'axios';

export default axios.create({
  baseUrl: '',
  headers: {
    'X-Requested-Width': 'axios',
  },
});
