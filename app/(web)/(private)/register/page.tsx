"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import z from "zod";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  districts,
  municipalities,
  pollingCenters,
  provinces,
  wards,
} from "@/data/static_data/location";

type RegisterFormValues = {
  full_name: string;
  email?: string;
  phone?: string;
  password: string;
  role: "employ" | "admin";
  location?: {
    province?: string;
    district?: string;
    municipality?: string;
    wardNumber?: string;
    pollingCenter?: string;
  };
};

const registerUser = async (data: RegisterFormValues) => {
  const response = await axios.post("/api/auth/register", data);
  return response.data;
};

export default function RegisterPage() {
  const [selectedProvince, setSelectedProvince] = React.useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] =
    React.useState<string>("");
  const [selectedWard, setSelectedWard] = React.useState<string>("");
  const [selectedPolling, setSelectedPolling] = React.useState<string>("");

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      role: "employ",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("User registered successfully");
      form.reset();
      setSelectedProvince("");
      setSelectedDistrict("");
      setSelectedMunicipality("");
      setSelectedWard("");
      setSelectedPolling("");
    },
    onError: (err: unknown) => {
      const axiosError = err as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError?.response?.data?.message ||
        (err as Error).message ||
        "Registration failed";
      toast.error(errorMessage);
      console.error("Registration error:", err);
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    const locationData: RegisterFormValues["location"] = {};

    if (selectedProvince) locationData.province = selectedProvince;
    if (selectedDistrict) locationData.district = selectedDistrict;
    if (selectedMunicipality) locationData.municipality = selectedMunicipality;
    if (selectedWard) locationData.wardNumber = selectedWard;
    if (selectedPolling) locationData.pollingCenter = selectedPolling;

    const submitData: RegisterFormValues = {
      ...values,
      ...(Object.keys(locationData).length > 0 && { location: locationData }),
    };

    mutate(submitData);
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");
  };
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");
  };
  const handleMunicipalityChange = (value: string) => {
    setSelectedMunicipality(value);
    setSelectedWard("");
    setSelectedPolling("");
  };
  const handleWardChange = (value: string) => {
    setSelectedWard(value);
  };
  const handlePollingChange = (value: string) => {
    setSelectedPolling(value);
  };
  const clearLocation = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedMunicipality("");
    setSelectedWard("");
    setSelectedPolling("");
  };

  const hasLocation =
    selectedProvince ||
    selectedDistrict ||
    selectedMunicipality ||
    selectedWard ||
    selectedPolling;

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Register New User</CardTitle>
          <CardDescription>
            Create a new staff or admin account. Location information is
            optional.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="user@example.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="98XXXXXXXX"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="At least 6 characters"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="employ">Staff</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Location Information (Optional)
                  </h3>
                  {hasLocation && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={clearLocation}
                      disabled={isPending}
                    >
                      Clear Location
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Province */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Province</label>
                    <Select
                      value={selectedProvince}
                      onValueChange={handleProvinceChange}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">District</label>
                    <Select
                      value={selectedDistrict}
                      onValueChange={handleDistrictChange}
                      disabled={!selectedProvince || isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {(selectedProvince
                          ? districts[selectedProvince] || []
                          : []
                        ).map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Municipality */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Municipality</label>
                    <Select
                      value={selectedMunicipality}
                      onValueChange={handleMunicipalityChange}
                      disabled={!selectedDistrict || isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        {(selectedDistrict
                          ? municipalities[selectedDistrict] || []
                          : []
                        ).map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Ward Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ward Number</label>
                    <Select
                      value={selectedWard}
                      onValueChange={handleWardChange}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Ward" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((w) => (
                          <SelectItem key={w} value={w}>
                            {w}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Polling Center */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Polling Center
                    </label>
                    <Select
                      value={selectedPolling}
                      onValueChange={handlePollingChange}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Polling Center" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {(selectedDistrict
                          ? pollingCenters[selectedDistrict] || []
                          : []
                        ).map((center) => (
                          <SelectItem key={center} value={center}>
                            {center}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {hasLocation && (
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      Selected Location:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProvince && (
                        <Badge variant="secondary" className="px-3 py-1">
                          Province: {selectedProvince}
                        </Badge>
                      )}
                      {selectedDistrict && (
                        <Badge variant="secondary" className="px-3 py-1">
                          District: {selectedDistrict}
                        </Badge>
                      )}
                      {selectedMunicipality && (
                        <Badge variant="secondary" className="px-3 py-1">
                          Municipality: {selectedMunicipality}
                        </Badge>
                      )}
                      {selectedWard && (
                        <Badge variant="secondary" className="px-3 py-1">
                          Ward: {selectedWard}
                        </Badge>
                      )}
                      {selectedPolling && (
                        <Badge variant="secondary" className="px-3 py-1">
                          Polling: {selectedPolling}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>* Required fields</p>
                <p className="text-red-600">
                  Note: Either email or phone must be provided (at least one)
                </p>
                <p>Location information is optional</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="w-full md:w-auto px-8"
                >
                  {isPending ? (
                    <>
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Registering...
                    </>
                  ) : (
                    "Register User"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
