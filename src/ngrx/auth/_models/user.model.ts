import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  roles: number[];
  pic: string;
  fullname: string;
  occupation: string;
  companyName: string;
  phone: string;
  address: Address;
  socialNetworks: SocialNetworks;
}
