"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldTypes } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GenderOption } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setisLoading(true);

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex-1"
        >
          <section className="space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">Let me know more about yourself.</p>
          </section>
          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Personal information</h2>
            </div>
          </section>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.INPUT}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
          />
          {/* Email and Phone number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="email"
              label="Email"
              placeholder="Johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
            <CustomFormField
              fieldType={FormFieldTypes.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone number"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Date and Gender */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              fieldType={FormFieldTypes.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth"
            />

            <CustomFormField
              fieldType={FormFieldTypes.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOption.map((option, i) => (
                      <div key={option + i} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>
          {/* Occupation and Address */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="address"
              label="Address"
              placeholder="14th Street, New York"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
          {/* Emergency contact place */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="emergencyContactName"
              label="Emergency Contact Name"
              placeholder="Guardian's name"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="emergencyContactNumber"
              label="Emergency Contact Number"
              placeholder="(555) 123-4567"
            />
          </div>

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
              <h2 className="sub-header">Medical information</h2>
            </div>
          </section>

          <CustomFormField
            control={form.control}
            fieldType={FormFieldTypes.SELECT}
            name="primaryphysician"
            label="Primary Physician"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor) => (
              <SelectItem key={doctor.name} value={doctor.name}>
                <div className="flex cursor-pointer items-center  gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt={doctor.image}
                    className="rounded-full border border-dark-500 "
                  />
                  <div>{doctor.name}</div>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          {/* Insurances of provider and policy number */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.INPUT}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.PHONE_INPUT}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC12356789"
            />
          </div>
          {/* Allergies and current medicatino */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="allergies"
              label="Allergies"
              placeholder="Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="currentMedication"
              label="Current Medication(if any)"
              placeholder="Ibuprofen 200mg, Paracetamol 500mg"
            />
          </div>
          {/* Medical history of family and past */}
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Mother had headache, Father had leg problem"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldTypes.TEXTAREA}
              name="pastMedicalhistory"
              label="Past Medical History"
              placeholder="Hilariousdosuy"
            />
          </div>
          <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
