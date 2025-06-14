'use server';

import { getUsers } from "@/action/admin.action";
import RegisterPage from "@/components/register";
import { authOptions } from "@/lib/auth-option";
import { getServerSession } from "next-auth/next";

const AdminRegister = async () => {
	const session = await getServerSession(authOptions);
	const res = await getUsers()
	const users = res?.data?.users
	// Agar sessiya yoki currentUser._id mavjud bo‘lsa, Dashboard ko‘rsatiladi
	if (session && session.currentUser?.role == "admin") {

		return (
			<>
				<RegisterPage users={users} />
			</>
		)
	}
	return (
		<div className=" flex justify-center items-center text-2xl mt-4 text-yellow-500" >Bu amal faqat admin tomonidan amalga oshiriladi!</div>
	)
}

export default AdminRegister