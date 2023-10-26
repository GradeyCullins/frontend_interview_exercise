export const handleApiError = (error: any): any | XMLHttpRequest => {
  if (error.response) {
    // * The request was made and the server responded with a status code
    // * that fails out of the range of 2xx
    return {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    };
  }
  if (error.message) {
    return {
      data: error.message,
      status: 408,
    };
  }
  if (error.request) {
    // * The request was made but no response was received
    // * `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // * http.ClientRequest in node.js
    return error.request;
  }
  // * Something happened in setting up the request that triggered an Error
  return error;
};

export const getClubType = (clubTypeKey: string): string => {
  switch (clubTypeKey) {
    case '1Wood':
      return 'Driver';
    case '3Wood':
      return '3 Wood';
    case '5Wood':
      return '5 Wood';
    case '7Wood':
      return '7 Wood';
    case '9Wood':
      return '9 Wood';
    case '2Iron':
      return '2 Iron';
    case '3Iron':
      return '3 Iron';
    case '4Iron':
      return '4 Iron';
    case '5Iron':
      return '5 Iron';
    case '6Iron':
      return '6 Iron';
    case '7Iron':
      return '7 Iron';
    case '8Iron':
      return '8 Iron';
    case '9Iron':
      return '9 Iron';
    case 'PitchingWedge':
      return 'Pitching Wedge';
    case 'GapWedge':
      return 'Gap Wedge';
    case 'SandWedge':
      return 'Sand Wedge';
    case 'LobWedge':
      return 'Lob Wedge';
    case 'Putter':
      return clubTypeKey;
    case '4Hybrid':
      return '4 Hybrid'
    default:
      console.log(clubTypeKey)
      return 'Not found'
  }
}

