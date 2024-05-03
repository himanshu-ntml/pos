import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UserProfile() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage alt="Staff Member" src="/placeholder-avatar.jpg" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold">John Smith</h1>
          <p className="text-gray-500 dark:text-gray-400">Head Chef</p>
        </div>
      </div>
      <div className="mt-8 w-full max-w-xl space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                defaultValue="john.smith@example.com"
                id="email"
                readOnly
                type="email"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                defaultValue="+1 (555) 555-5555"
                id="phone"
                readOnly
                type="tel"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Work History</h2>
          <div className="mt-2 space-y-4">
            <div>
              <h3 className="text-base font-medium">Head Chef</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Acme Restaurant, 2018 - Present
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Responsible for managing the kitchen staff, creating and
                implementing new menu items, and ensuring the highest quality of
                food and service.
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium">Sous Chef</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Bistro Cafe, 2015 - 2018
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Assisted the Head Chef in all kitchen operations, including menu
                planning, food preparation, and staff management.
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Skills & Certifications</h2>
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                defaultValue="Culinary Arts, Menu Development, Team Management, Food Safety"
                id="skills"
                readOnly
                rows={3}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea
                defaultValue="Certified Chef de Cuisine, Food Handler Certification"
                id="certifications"
                readOnly
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
