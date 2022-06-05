import jwtDecode from 'jwt-decode';


export const decode = (token: any): any => {
  const decoded: any = jwtDecode(token);
  return decoded.id;
}

