import { Dashboard } from "@/components/dashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-option";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = async () => {
  const session = await getServerSession(authOptions);

  // Agar sessiya yoki currentUser._id mavjud bo‘lsa, Dashboard ko‘rsatiladi
  if (session && session.currentUser?._id) {
    return <Dashboard />;
  }
  

  // Aks holda, Login tugmasi ko‘rsatiladi
  return (
   <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex gap-4">
        <Link href="/login">
          <Button className="flex items-center gap-2 bg-[#1E2A44] text-white hover:bg-[#1E2A44]/80 rounded-lg px-4 py-2">
           
            Kirish
          </Button>
        </Link>
        
      </div>
    </div>
  );
};

export default Home;