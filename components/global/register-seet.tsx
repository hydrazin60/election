"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { MapPin } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import LocationFilterCard, {
  LocationFilters,
} from "../dashbord/location-filter-card";

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

interface RegisterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const registerUser = async (data: RegisterFormValues) => {
  const res = await axios.post("/api/auth/register", data);
  return res.data;
};

export default function RegisterSheet({
  open,
  onOpenChange,
}: RegisterSheetProps) {
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    province: "",
    district: "",
    municipality: "",
    wardNumber: "",
    pollingCenter: "",
  });

  const [showLocationFilters, setShowLocationFilters] = useState(false);

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
      toast.success("Employee registered");
      form.reset();
      setLocationFilters({
        province: "",
        district: "",
        municipality: "",
        wardNumber: "",
        pollingCenter: "",
      });
      onOpenChange(false);
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleFilterChange = (filters: LocationFilters) => {
    setLocationFilters(filters);
  };

  const hasLocationFilters = Object.values(locationFilters).some(Boolean);

  const onSubmit = (values: RegisterFormValues) => {
    const location: Record<string, string> = {};

    if (locationFilters.province) location.province = locationFilters.province;
    if (locationFilters.district) location.district = locationFilters.district;
    if (locationFilters.municipality)
      location.municipality = locationFilters.municipality;
    if (locationFilters.wardNumber)
      location.wardNumber = locationFilters.wardNumber;
    if (locationFilters.pollingCenter)
      location.pollingCenter = locationFilters.pollingCenter;

    mutate({
      ...values,
      ...(Object.keys(location).length && { location }),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[500px] p-6">
        <SheetHeader className="mb-2">
          <SheetTitle className="text-xl">Add New Employee</SheetTitle>
          <SheetDescription>
            Fill in the details below to register a new employee
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Basic Information
              </h3>

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
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="98XXXXXXXX" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password *</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
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
                  </FormItem>
                )}
              />
            </div>

            {/* Location Section - Simple Toggle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Location Restrictions (Optional)
                </h3>
                <Button
                  type="button"
                  variant={hasLocationFilters ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setShowLocationFilters(!showLocationFilters)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {hasLocationFilters ? "Edit Location" : "Add Location"}
                </Button>
              </div>

              {hasLocationFilters && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {locationFilters.province && (
                      <Badge variant="secondary">
                        {locationFilters.province}
                      </Badge>
                    )}
                    {locationFilters.district && (
                      <Badge variant="secondary">
                        {locationFilters.district}
                      </Badge>
                    )}
                    {locationFilters.municipality && (
                      <Badge variant="secondary">
                        {locationFilters.municipality}
                      </Badge>
                    )}
                    {locationFilters.wardNumber && (
                      <Badge variant="secondary">
                        Ward {locationFilters.wardNumber}
                      </Badge>
                    )}
                    {locationFilters.pollingCenter && (
                      <Badge variant="secondary">
                        {locationFilters.pollingCenter}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Employee will only access these locations
                  </p>
                </div>
              )}
            </div>

            {showLocationFilters && (
              <div>
                <LocationFilterCard
                  onFilterChange={handleFilterChange}
                  isLoading={isPending}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLocationFilters(false)}
                >
                  Done
                </Button>
              </div>
            )}
            <div className="pt-4 border-t">
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isPending}>
                  {isPending ? "Registering..." : "Register"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
