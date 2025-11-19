export default function Page() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back 👋</h1>
        <p className="text-sm text-muted-foreground">
          Here’s an overview of your activity.
        </p>
      </div>

      {/* Example Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-5">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-3xl font-bold mt-2">2,145</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-5">
          <h3 className="text-sm font-medium text-gray-500">New Signups</h3>
          <p className="text-3xl font-bold mt-2">356</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border p-5">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">₹1.2M</p>
        </div>
      </div>
    </div>
  );
}
