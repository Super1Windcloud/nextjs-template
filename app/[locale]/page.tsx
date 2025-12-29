import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("HomePage");
  const navT = useTranslations("Navigation");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-between py-16 px-4 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-3xl mx-auto">
          <div className="flex justify-center mb-10">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
              suppressHydrationWarning
            />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-black dark:text-zinc-50">
              {t("title")}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/integration-demo" className="block">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Integration Demo
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Overview of all integrated technologies working together
                </p>
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </Card>
            </Link>

            <Link href="/dashboard" className="block">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  {navT("dashboard")}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Multiple components, charts with Recharts, and Zustand state
                  management
                </p>
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </Card>
            </Link>

            <Link href="/profile" className="block">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  {navT("profile")}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  Authentication features with Next-Auth
                </p>
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </Card>
            </Link>

            <Link href="/data-fetching" className="block">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Data Fetching
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  TanStack Query features like queries, mutations, and caching
                </p>
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </Card>
            </Link>

            <Link href="/form-handling" className="block">
              <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary">
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  Form Handling
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  React Hook Form with Zod validation
                </p>
                <Button variant="outline" className="w-full">
                  View Demo
                </Button>
              </Card>
            </Link>

            <div className="md:col-span-2 lg:col-span-3">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-2">Language & Theme</h2>
                <div className="flex gap-4 mt-4">
                  <Link href="/" locale="en">
                    <Button variant="secondary">English</Button>
                  </Link>
                  <Link href="/" locale="zh">
                    <Button variant="secondary">中文</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}