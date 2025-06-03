import { useState } from 'react';
import MUI from 'mui/mui'; // Ensure MUI is installed as a dev dependency

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroupNames = async () => {
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return ['Adults', 'Kids'];
    } catch (error) {
      console.error('Error fetching group names:', error);
    }
  };

  const groups = await fetchGroupNames();

  return (
    <div className="container mx-auto p-4">
      <div className="mx-auto max-w-4xl mx-auto-lg mx-4xl">
        <h1 className="text-3xl font-bold mb-8">Gift Groups</h1>
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">{group}</h2>
                  <p className="mb-2">List of names for this group</p>
                  <code>Currently empty, coming soon!</code>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
