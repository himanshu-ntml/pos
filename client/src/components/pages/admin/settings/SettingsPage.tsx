import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">POS System Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>
          <div className="grid gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="restaurant-name"
              >
                Restaurant Name
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                defaultValue="Acme Diner"
                id="restaurant-name"
                type="text"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="restaurant-address"
              >
                Address
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                defaultValue="123 Main St, Anytown USA"
                id="restaurant-address"
                rows={3}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="restaurant-phone"
              >
                Phone Number
              </label>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                defaultValue="(555) 555-5555"
                id="restaurant-phone"
                type="tel"
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Accept Cash
              </span>
              <Switch defaultChecked id="accept-cash" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Accept Credit Cards
              </span>
              <Switch defaultChecked id="accept-credit-cards" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Accept Mobile Payments
              </span>
              <Switch id="accept-mobile-payments" />
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">User Permissions</h2>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Allow Managers to Edit Menu
              </span>
              <Switch defaultChecked id="allow-managers-edit-menu" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Allow Cashiers to Process Refunds
              </span>
              <Switch id="allow-cashiers-process-refunds" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Allow Servers to Modify Orders
              </span>
              <Switch defaultChecked id="allow-servers-modify-orders" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
