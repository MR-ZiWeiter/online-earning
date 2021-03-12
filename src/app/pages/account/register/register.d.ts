interface RegisterForm {
  username: string;
  phone: number;
  code: string|number;
  password: string;
  check_password: string;
  phone_code?: string;
  [x: string]: any;
}
