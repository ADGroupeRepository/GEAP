import Image from "next/image";
import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Column - Image */}
      <div className="hidden lg:block relative h-full w-full">
        {/* Placeholder for the cover image */}
        <Image
          src="/police-image.png" // Placeholder, user should replace with police-image.png
          alt="Police Nationale Côte d'Ivoire"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <LoginForm />
      </div>
    </div>
  );
}
