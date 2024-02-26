import NextAuth from "next-auth";

import { authOptions } from "Y/server/auth";

export default NextAuth(authOptions);
