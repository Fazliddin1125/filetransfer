"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, MapPin, Globe, Calendar, Briefcase, GraduationCap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export function AboutMe() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Sessiya yuklanayotgan bo‘lsa
  if (status === "loading") {
    return <div>Yuklanmoqda...</div>;
  }

  // Agar foydalanuvchi login qilmagan bo‘lsa, login sahifasiga yo‘naltirish
  if (status !== "authenticated" || !session?.currentUser?._id) {
    router.push("/login");
    return null;
  }

  // Foydalanuvchi ma’lumotlari
  const user = session.currentUser;
  return (
    <main className="container p-4 md:p-6 overflow-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Profil</h1>
{/* grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 */}
      <div className="flex justify-center ">
        <Card className="border-2 w-[560px] border-green-500/20 dark:border-green-500/30 ">
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle>Profil</CardTitle>
            <CardDescription>Shaxsiy malumotlarim</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-2">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                <AvatarFallback className="text-3xl md:text-4xl bg-green-500/20 text-green-500">JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl md:text-2xl font-bold">{user.fullname}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Ism Familiya</p>
                  <p className="font-medium">{user.fullname}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">New York, USA</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-medium">www.johndoe.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Birthday</p>
                  <p className="font-medium">January 15, 1990</p>
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>

        {/* <Card className="border-2 border-green-500/20 dark:border-green-500/30 lg:col-span-2">
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle>Biography</CardTitle>
            <CardDescription>About myself</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-2 space-y-4 md:space-y-6">
            <p>
              I am a passionate software developer with over 8 years of experience in building web and mobile
              applications. My expertise includes front-end development with React, back-end development with Node.js,
              and database management.
            </p>

            <p>
              I enjoy solving complex problems and creating intuitive, efficient solutions that enhance user experience.
              My approach to development is centered around clean code, performance optimization, and staying up-to-date
              with the latest technologies.
            </p>

            <div className="pt-2 md:pt-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-500" />
                Work Experience
              </h3>

              <div className="space-y-4">
                <div className="border-l-2 border-green-500/50 pl-4 py-1">
                  <h4 className="font-medium">Senior Developer</h4>
                  <p className="text-sm text-muted-foreground">Tech Solutions Inc. | 2020 - Present</p>
                  <p className="text-sm mt-1">
                    Leading development of enterprise web applications and mentoring junior developers.
                  </p>
                </div>

                <div className="border-l-2 border-green-500/50 pl-4 py-1">
                  <h4 className="font-medium">Full Stack Developer</h4>
                  <p className="text-sm text-muted-foreground">Digital Innovations | 2017 - 2020</p>
                  <p className="text-sm mt-1">
                    Developed and maintained multiple client projects using React, Node.js, and MongoDB.
                  </p>
                </div>

                <div className="border-l-2 border-green-500/50 pl-4 py-1">
                  <h4 className="font-medium">Junior Developer</h4>
                  <p className="text-sm text-muted-foreground">WebCraft Studios | 2015 - 2017</p>
                  <p className="text-sm mt-1">
                    Started career building responsive websites and implementing UI designs.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-500" />
                Education
              </h3>

              <div className="space-y-4">
                <div className="border-l-2 border-green-500/50 pl-4 py-1">
                  <h4 className="font-medium">Master's in Computer Science</h4>
                  <p className="text-sm text-muted-foreground">Tech University | 2013 - 2015</p>
                </div>

                <div className="border-l-2 border-green-500/50 pl-4 py-1">
                  <h4 className="font-medium">Bachelor's in Software Engineering</h4>
                  <p className="text-sm text-muted-foreground">State University | 2009 - 2013</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-500/20 dark:border-green-500/30 lg:col-span-3">
          <CardHeader className="p-4 md:p-6 pb-2">
            <CardTitle>Skills</CardTitle>
            <CardDescription>Technical expertise</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div>
                <h3 className="font-semibold mb-3">Frontend Development</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>React</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>JavaScript</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>HTML/CSS</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>TypeScript</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Backend Development</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Node.js</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Express</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>MongoDB</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>SQL</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Other Skills</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Git</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Docker</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>AWS</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>UI/UX Design</span>
                    <div className="w-24 md:w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </main>
  )
}

