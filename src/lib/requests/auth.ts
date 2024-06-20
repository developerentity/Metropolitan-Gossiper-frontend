import { postDataByUrl } from ".";

type SignUpDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const base_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/auth`;

async function signUp(data: SignUpDataType) {
  return postDataByUrl(`${base_url}/signup`, data, null);
}

export default {
  signUp,
};
