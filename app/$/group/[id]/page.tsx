import SingleGroupComponent from '@/components/SingleGroupComponent';
import { NextPage } from 'next';
import { cookies, headers } from 'next/headers';

async function getgroupData() {
  const headersList = headers();  // Correct: headers() without parentheses
  const fullUrl = headersList.get("x-url") || "";
  const regex = /\/group\/([^\/]+)$/;
  const match = fullUrl.match(regex);
  const extractedValue: string = match ? match[1] || "" : "";
  const url = `https://splitwise-lvh3.onrender.com/api/group/${extractedValue}`;
  const cookieStore = cookies();  // Correct: cookies() without parentheses
  const cook = cookieStore.get('accessToken');
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      cookie: `accessToken=${cook?.value}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const GroupDetails: NextPage = async () => {
  const data = await getgroupData();
  const group = data.group;
  return (
    <div>
      {group && (
        <SingleGroupComponent {...data} />
      )}
    </div>
  );
};

export default GroupDetails;
