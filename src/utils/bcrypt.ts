import bcrypt from "bcrypt";

export const hash = {
  hashPwd: async (password: string): Promise<string> => {
    const result = await bcrypt.hash(password, 10);
    return result;
  },

  comparePassword: async (password: string, pwd: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, pwd);
    return result;
  },
};
