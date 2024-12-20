import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen text-white">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-13-regular mt-20 flex justify-between text-gray-600">
            <p> © 2024 Nature</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="Patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
